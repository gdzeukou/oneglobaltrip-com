// Payment logic for square-create-payment, kept free of Deno and network
// imports so it can be tested with a fake store and a fake fetch.
//
// The rule this file enforces: the amount charged comes from the server.
// The browser says which order it wants to pay for; it does not say how much.

import { LineItem, PLAN_CURRENCY, priceOrder, PricingError } from '../_shared/pricing.ts';

export interface OgtOrderRow {
  id: string;
  user_id: string | null;
  plan_type: string;
  addons: unknown;
  payment_status: string;
}

export interface FlightBookingRow {
  id: string;
  user_id: string | null;
  total_amount: number | string;
  currency: string;
  origin_airport: string | null;
  destination_airport: string | null;
  booking_reference: string | null;
}

export interface PaymentRecord {
  squarePaymentId: string;
  squareOrderId: string;
  squareLocationId: string;
  /** Square payment status, e.g. COMPLETED. */
  status: string;
  amountCents: number;
  currency: string;
}

/** Database access. Implemented with the service-role client in index.ts. */
export interface Store {
  getOgtOrder(id: string): Promise<OgtOrderRow | null>;
  getFlightBooking(id: string): Promise<FlightBookingRow | null>;
  flightBookingIsPaid(bookingId: string): Promise<boolean>;
  recordOgtPayment(orderId: string, payment: PaymentRecord): Promise<void>;
  recordFlightPayment(bookingId: string, payment: PaymentRecord): Promise<void>;
}

export interface Deps {
  /** Resolves the bearer token to a user id, or null if it is not valid. */
  getUserId(token: string): Promise<string | null>;
  store: Store;
  fetch: typeof fetch;
  square: { accessToken: string; locationId: string; baseUrl: string };
}

export interface HandlerResult {
  status: number;
  body: Record<string, unknown>;
}

class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

interface Charge {
  kind: 'ogt_order' | 'flight_booking';
  lineItems: LineItem[];
  totalCents: number;
  currency: string;
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const SQUARE_VERSION = '2023-10-18';
// Square rejects a CreatePayment idempotency_key longer than 45 characters.
const SQUARE_PAYMENT_KEY_MAX = 45;

/** Work out what to charge for bookingId, from server-side data only. */
export async function resolveCharge(store: Store, userId: string, bookingId: string): Promise<Charge> {
  // "Not found" is also the answer for someone else's order, so the response
  // does not confirm which ids exist.
  const notFound = new HttpError(404, 'Booking not found');

  const order = await store.getOgtOrder(bookingId);
  if (order) {
    if (order.user_id !== userId) throw notFound;
    if (order.payment_status !== 'pending') {
      throw new HttpError(409, 'This order has already been paid or is no longer payable');
    }
    try {
      const { lineItems, totalCents } = priceOrder(order.plan_type, order.addons);
      return { kind: 'ogt_order', lineItems, totalCents, currency: PLAN_CURRENCY };
    } catch (error) {
      if (error instanceof PricingError) throw new HttpError(422, error.message);
      throw error;
    }
  }

  const booking = await store.getFlightBooking(bookingId);
  if (!booking || booking.user_id !== userId) throw notFound;
  if (await store.flightBookingIsPaid(bookingId)) {
    throw new HttpError(409, 'This booking has already been paid');
  }

  const totalCents = Math.round(Number(booking.total_amount) * 100);
  const currency = String(booking.currency || '').toUpperCase();
  if (!Number.isSafeInteger(totalCents) || totalCents <= 0 || !/^[A-Z]{3}$/.test(currency)) {
    throw new HttpError(422, 'This booking has no payable amount');
  }

  const route = booking.origin_airport && booking.destination_airport
    ? `Flight ${booking.origin_airport} to ${booking.destination_airport}`
    : 'Flight booking';
  const name = booking.booking_reference ? `${route} (${booking.booking_reference})` : route;
  return { kind: 'flight_booking', lineItems: [{ name, quantity: 1, unitCents: totalCents }], totalCents, currency };
}

/**
 * The client's idempotency key is used as before. Keys too long for Square
 * are replaced by a hash of themselves, so the same client key still always
 * maps to the same Square key and a retry is still deduplicated.
 */
export async function squarePaymentKey(clientKey: string): Promise<string> {
  if (clientKey.length <= SQUARE_PAYMENT_KEY_MAX) return clientKey;
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(clientKey));
  const hex = Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, '0')).join('');
  return hex.slice(0, SQUARE_PAYMENT_KEY_MAX);
}

async function squarePost(deps: Deps, path: string, payload: unknown, label: string) {
  const response = await deps.fetch(`${deps.square.baseUrl}${path}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${deps.square.accessToken}`,
      'Content-Type': 'application/json',
      'Square-Version': SQUARE_VERSION,
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const detail = await response.text();
    console.error(`Square ${label} failed:`, detail);
    throw new HttpError(400, `${label} failed: ${detail}`);
  }
  return await response.json();
}

export async function handleCreatePayment(
  authHeader: string | null,
  rawBody: unknown,
  deps: Deps,
): Promise<HandlerResult> {
  try {
    const token = authHeader?.replace(/^Bearer\s+/i, '').trim();
    const userId = token ? await deps.getUserId(token) : null;
    if (!userId) throw new HttpError(401, 'Unauthorized');

    const body = (rawBody && typeof rawBody === 'object' ? rawBody : {}) as Record<string, unknown>;
    const { sourceId, bookingId, idempotencyKey } = body;
    if (typeof sourceId !== 'string' || !sourceId) throw new HttpError(400, 'sourceId is required');
    if (typeof bookingId !== 'string' || !UUID_RE.test(bookingId)) throw new HttpError(400, 'bookingId is invalid');
    if (typeof idempotencyKey !== 'string' || !idempotencyKey || idempotencyKey.length > 128) {
      throw new HttpError(400, 'idempotencyKey is invalid');
    }

    const charge = await resolveCharge(deps.store, userId, bookingId);

    // The client still sends the amount it showed the customer. It is never
    // charged; it is only compared, so a stale or tampered page is refused
    // instead of charging something different from what was on screen.
    if (body.amount !== undefined && body.amount !== null) {
      const clientCents = typeof body.amount === 'number' ? Math.round(body.amount * 100) : NaN;
      if (clientCents !== charge.totalCents) {
        throw new HttpError(400, 'Amount does not match the order total. Refresh and try again.');
      }
    }
    if (body.currency !== undefined && body.currency !== null) {
      if (typeof body.currency !== 'string' || body.currency.toUpperCase() !== charge.currency) {
        throw new HttpError(400, 'Currency does not match the order. Refresh and try again.');
      }
    }

    const paymentKey = await squarePaymentKey(idempotencyKey);

    const orderData = await squarePost(deps, '/v2/orders', {
      idempotency_key: `order_${paymentKey}`,
      order: {
        location_id: deps.square.locationId,
        reference_id: bookingId,
        line_items: charge.lineItems.map((item) => ({
          name: item.name,
          quantity: String(item.quantity),
          base_price_money: { amount: item.unitCents, currency: charge.currency },
        })),
      },
    }, 'Order creation');
    const squareOrderId: string = orderData.order.id;

    const paymentData = await squarePost(deps, '/v2/payments', {
      source_id: sourceId,
      idempotency_key: paymentKey,
      amount_money: { amount: charge.totalCents, currency: charge.currency },
      order_id: squareOrderId,
      location_id: deps.square.locationId,
      reference_id: bookingId,
    }, 'Payment creation');
    const payment = paymentData.payment;
    console.log('Square payment created:', payment.id, payment.status);

    // The card has been charged at this point, so a bookkeeping failure must
    // not turn into an error response that invites the customer to pay again.
    const record: PaymentRecord = {
      squarePaymentId: payment.id,
      squareOrderId,
      squareLocationId: deps.square.locationId,
      status: payment.status,
      amountCents: charge.totalCents,
      currency: charge.currency,
    };
    try {
      if (charge.kind === 'ogt_order') {
        await deps.store.recordOgtPayment(bookingId, record);
      } else {
        await deps.store.recordFlightPayment(bookingId, record);
      }
    } catch (error) {
      console.error(`Payment ${payment.id} succeeded but was not recorded for ${bookingId}:`, error);
    }

    return {
      status: 200,
      body: {
        success: true,
        payment,
        orderId: squareOrderId,
        amount: charge.totalCents / 100,
        currency: charge.currency,
      },
    };
  } catch (error) {
    if (error instanceof HttpError) {
      return { status: error.status, body: { success: false, error: error.message } };
    }
    console.error('Error in square-create-payment:', error);
    return { status: 500, body: { success: false, error: 'Payment could not be processed' } };
  }
}
