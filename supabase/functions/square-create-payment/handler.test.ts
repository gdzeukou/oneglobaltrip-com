// Run with: deno test --allow-read supabase/functions/
import { assert, assertEquals, assertNotEquals } from 'jsr:@std/assert@1';
import { Deps, FlightBookingRow, handleCreatePayment, OgtOrderRow, PaymentRecord, squareEnvironment } from './handler.ts';

const USER = '11111111-1111-4111-8111-111111111111';
const OTHER_USER = '22222222-2222-4222-8222-222222222222';
const ORDER_ID = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
const FLIGHT_ID = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';

interface SquareCall {
  path: string;
  body: any;
}

function setup(opts: {
  order?: Partial<OgtOrderRow>;
  flight?: Partial<FlightBookingRow>;
  flightPaid?: boolean;
  recordFails?: boolean;
} = {}) {
  const order: OgtOrderRow = {
    id: ORDER_ID,
    user_id: USER,
    plan_type: 'global_explorer',
    // Stored prices are what a tampering client would write. They must be ignored.
    addons: [{ id: 'expedited_booking', name: 'x', price: 0.01, quantity: 2 }],
    payment_status: 'pending',
    ...opts.order,
  };
  const flight: FlightBookingRow = {
    id: FLIGHT_ID,
    user_id: USER,
    total_amount: '412.50',
    currency: 'usd',
    origin_airport: 'IAH',
    destination_airport: 'CDG',
    booking_reference: 'OGT-2026-000123',
    ...opts.flight,
  };

  const squareCalls: SquareCall[] = [];
  const recorded: { table: string; id: string; payment: PaymentRecord }[] = [];

  const deps: Deps = {
    getUserId: (token) => Promise.resolve(token === 'good-token' ? USER : null),
    store: {
      getOgtOrder: (id) => Promise.resolve(id === ORDER_ID ? order : null),
      getFlightBooking: (id) => Promise.resolve(id === FLIGHT_ID ? flight : null),
      flightBookingIsPaid: () => Promise.resolve(opts.flightPaid ?? false),
      recordOgtPayment: (id, payment) => {
        if (opts.recordFails) return Promise.reject(new Error('db down'));
        recorded.push({ table: 'ogt_orders', id, payment });
        return Promise.resolve();
      },
      recordFlightPayment: (id, payment) => {
        recorded.push({ table: 'flight_bookings', id, payment });
        return Promise.resolve();
      },
    },
    fetch: ((url: string, init: RequestInit) => {
      const path = new URL(url).pathname;
      const body = JSON.parse(String(init.body));
      squareCalls.push({ path, body });
      const payload = path === '/v2/orders'
        ? { order: { id: 'sq-order-1' } }
        : { payment: { id: 'sq-pay-1', status: 'COMPLETED', amount_money: body.amount_money } };
      return Promise.resolve(new Response(JSON.stringify(payload), { status: 200 }));
    }) as typeof fetch,
    square: { accessToken: 'test', locationId: 'LOC', baseUrl: 'https://square.test', environment: 'sandbox' },
  };

  const call = (body: Record<string, unknown>, auth: string | null = 'Bearer good-token') =>
    handleCreatePayment(auth, { sourceId: 'cnon:card', idempotencyKey: 'key-1', ...body }, deps);

  return { call, squareCalls, recorded };
}

// global_explorer $189 + 2 x expedited_booking $10 = $209.00
const ORDER_TOTAL_CENTS = 20900;

Deno.test('normal checkout charges the catalogue price and records the payment', async () => {
  const { call, squareCalls, recorded } = setup();
  const result = await call({ bookingId: ORDER_ID, amount: 209, currency: 'USD' });

  assertEquals(result.status, 200);
  assertEquals(result.body.success, true);
  assertEquals(result.body.amount, 209);

  const [orderCall, paymentCall] = squareCalls;
  assertEquals(orderCall.path, '/v2/orders');
  assertEquals(orderCall.body.order.line_items, [
    { name: 'Global Explorer', quantity: '1', base_price_money: { amount: 18900, currency: 'USD' } },
    { name: 'Expedited Booking Support', quantity: '2', base_price_money: { amount: 1000, currency: 'USD' } },
  ]);
  assertEquals(paymentCall.path, '/v2/payments');
  assertEquals(paymentCall.body.amount_money, { amount: ORDER_TOTAL_CENTS, currency: 'USD' });
  assertEquals(paymentCall.body.order_id, 'sq-order-1');

  assertEquals(recorded.length, 1);
  assertEquals(recorded[0].table, 'ogt_orders');
  assertEquals(recorded[0].payment.amountCents, ORDER_TOTAL_CENTS);
  assertEquals(recorded[0].payment.lineItems.map((item) => item.unitCents * item.quantity), [18900, 2000]);
});

Deno.test('a browser on the other Square environment is refused before any charge', async () => {
  const { call, squareCalls } = setup();
  const wrong = await call({ bookingId: ORDER_ID, amount: 209, environment: 'production' });
  assertEquals(wrong.status, 400);
  assertEquals(squareCalls.length, 0);

  const right = await call({ bookingId: ORDER_ID, amount: 209, environment: 'sandbox' });
  assertEquals(right.status, 200);
});

Deno.test('SQUARE_ENVIRONMENT picks the API host and rejects typos', () => {
  assertEquals(squareEnvironment(undefined).baseUrl, 'https://connect.squareup.com');
  assertEquals(squareEnvironment('production').environment, 'production');
  assertEquals(squareEnvironment(' Sandbox ').baseUrl, 'https://connect.squareupsandbox.com');
  let threw = false;
  try {
    squareEnvironment('prod');
  } catch {
    threw = true;
  }
  assert(threw);
});

Deno.test('a tampered amount is refused and Square is never called', async () => {
  const { call, squareCalls, recorded } = setup();
  for (const amount of [1, 0.01, 208.99, 0, -209, '209', NaN]) {
    const result = await call({ bookingId: ORDER_ID, amount, currency: 'USD' });
    assertEquals(result.status, 400, `amount ${amount}`);
    assertEquals(result.body.success, false);
  }
  assertEquals(squareCalls.length, 0);
  assertEquals(recorded.length, 0);
});

Deno.test('a mismatched currency is refused', async () => {
  const { call, squareCalls } = setup();
  const result = await call({ bookingId: ORDER_ID, amount: 209, currency: 'JPY' });
  assertEquals(result.status, 400);
  assertEquals(squareCalls.length, 0);
});

Deno.test('with no client amount the server price is still what gets charged', async () => {
  const { call, squareCalls } = setup();
  const result = await call({ bookingId: ORDER_ID });
  assertEquals(result.status, 200);
  assertEquals(squareCalls[1].body.amount_money.amount, ORDER_TOTAL_CENTS);
});

Deno.test('prices written on the order row are ignored', async () => {
  const { call, squareCalls } = setup({
    order: { addons: [{ id: 'niche_guide', price: 0, quantity: 1 }] },
  });
  const result = await call({ bookingId: ORDER_ID });
  assertEquals(result.status, 200);
  assertEquals(squareCalls[1].body.amount_money.amount, 18900 + 700);
});

Deno.test('orders that cannot be priced are refused', async () => {
  const bad: Partial<OgtOrderRow>[] = [
    { plan_type: 'free_ai_agent' },
    { plan_type: 'enterprise_global_mobility' },
    { plan_type: 'constructor' },
    { addons: [{ id: 'made_up', quantity: 1 }] },
    { plan_type: 'visa_assist', addons: [{ id: 'partner_discounts', quantity: 1 }] },
    { addons: [{ id: 'niche_guide', quantity: -5 }] },
    { addons: [{ id: 'niche_guide', quantity: 0.5 }] },
    { addons: [{ id: 'niche_guide', quantity: 11 }] },
    { addons: [{ id: 'niche_guide', quantity: 1 }, { id: 'niche_guide', quantity: 1 }] },
    { addons: 'nope' },
  ];
  for (const order of bad) {
    const { call, squareCalls } = setup({ order });
    const result = await call({ bookingId: ORDER_ID });
    assertEquals(result.status, 422, JSON.stringify(order));
    assertEquals(squareCalls.length, 0);
  }
});

Deno.test("someone else's order looks the same as a missing one", async () => {
  const mine = setup({ order: { user_id: OTHER_USER } });
  const theirs = await mine.call({ bookingId: ORDER_ID, amount: 209 });
  const missing = await mine.call({ bookingId: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc', amount: 209 });
  assertEquals(theirs.status, 404);
  assertEquals(theirs.body, missing.body);
  assertEquals(mine.squareCalls.length, 0);

  const guest = setup({ order: { user_id: null } });
  assertEquals((await guest.call({ bookingId: ORDER_ID })).status, 404);

  const flight = setup({ flight: { user_id: OTHER_USER } });
  assertEquals((await flight.call({ bookingId: FLIGHT_ID })).status, 404);
  assertEquals(flight.squareCalls.length, 0);
});

Deno.test('an order that is not pending cannot be paid again', async () => {
  for (const payment_status of ['completed', 'refunded', 'failed']) {
    const { call, squareCalls } = setup({ order: { payment_status } });
    assertEquals((await call({ bookingId: ORDER_ID, amount: 209 })).status, 409);
    assertEquals(squareCalls.length, 0);
  }
});

Deno.test('missing or invalid credentials and input are refused', async () => {
  const { call, squareCalls } = setup();
  assertEquals((await call({ bookingId: ORDER_ID }, null)).status, 401);
  assertEquals((await call({ bookingId: ORDER_ID }, 'Bearer bad-token')).status, 401);
  assertEquals((await call({ bookingId: 'not-a-uuid' })).status, 400);
  assertEquals((await call({ bookingId: ORDER_ID, sourceId: '' })).status, 400);
  assertEquals((await call({ bookingId: ORDER_ID, idempotencyKey: '' })).status, 400);
  assertEquals(squareCalls.length, 0);
});

Deno.test('flight bookings are charged the stored total with a real line item name', async () => {
  const { call, squareCalls, recorded } = setup();
  const tampered = await call({ bookingId: FLIGHT_ID, amount: 1, currency: 'USD' });
  assertEquals(tampered.status, 400);
  assertEquals(squareCalls.length, 0);

  const ok = await call({ bookingId: FLIGHT_ID, amount: 412.5, currency: 'usd' });
  assertEquals(ok.status, 200);
  assertEquals(squareCalls[0].body.order.line_items, [{
    name: 'Flight IAH to CDG (OGT-2026-000123)',
    quantity: '1',
    base_price_money: { amount: 41250, currency: 'USD' },
  }]);
  assertEquals(squareCalls[1].body.amount_money, { amount: 41250, currency: 'USD' });
  assertEquals(recorded[0].table, 'flight_bookings');
});

Deno.test('paid or zero-priced flight bookings are refused', async () => {
  const paid = setup({ flightPaid: true });
  assertEquals((await paid.call({ bookingId: FLIGHT_ID })).status, 409);
  const free = setup({ flight: { total_amount: 0 } });
  assertEquals((await free.call({ bookingId: FLIGHT_ID })).status, 422);
  assertEquals(paid.squareCalls.length + free.squareCalls.length, 0);
});

Deno.test('idempotency keys: short ones pass through, long ones map stably under 45 chars', async () => {
  const short = setup();
  await short.call({ bookingId: ORDER_ID, idempotencyKey: 'key-1' });
  assertEquals(short.squareCalls[0].body.idempotency_key, 'order_key-1');
  assertEquals(short.squareCalls[1].body.idempotency_key, 'key-1');

  // The key the browser sends today: `${bookingId}_${Date.now()}` is 50 chars.
  const browserKey = `${ORDER_ID}_1795300000000`;
  const first = setup();
  await first.call({ bookingId: ORDER_ID, idempotencyKey: browserKey });
  const retry = setup();
  await retry.call({ bookingId: ORDER_ID, idempotencyKey: browserKey });
  const other = setup();
  await other.call({ bookingId: ORDER_ID, idempotencyKey: `${ORDER_ID}_1795300000001` });

  const key = first.squareCalls[1].body.idempotency_key;
  assert(key.length <= 45);
  assertEquals(retry.squareCalls[1].body.idempotency_key, key);
  assertNotEquals(other.squareCalls[1].body.idempotency_key, key);
  assertEquals(first.squareCalls[0].body.idempotency_key, `order_${key}`);
});

Deno.test('a charge that succeeds is still reported as success if recording it fails', async () => {
  const { call } = setup({ recordFails: true });
  const result = await call({ bookingId: ORDER_ID, amount: 209 });
  assertEquals(result.status, 200);
  assertEquals(result.body.success, true);
});
