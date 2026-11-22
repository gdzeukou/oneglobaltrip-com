// Server-side price list. This is the source of truth for what gets charged.
//
// Edge functions cannot import from src/, so the payable plans and add-ons
// from src/data/bookingPlans.ts are repeated here. pricing.test.ts fails if
// the two files disagree, so change both together.

export interface PricedItem {
  name: string;
  /** Price in cents. */
  unitCents: number;
}

// Plans a customer can pay for online. The free plan and the contact-sales
// enterprise plan are deliberately absent: neither has a checkout price.
export const PLAN_PRICES: Record<string, PricedItem> = {
  visa_assist: { name: 'Visa Assistance', unitCents: 6900 },
  global_explorer: { name: 'Global Explorer', unitCents: 18900 },
};

export const ADDON_PRICES: Record<string, PricedItem> = {
  expedited_booking: { name: 'Expedited Booking Support', unitCents: 1000 },
  niche_guide: { name: 'Niche Travel Guides', unitCents: 700 },
  partner_discounts: { name: 'Exclusive Discounts', unitCents: 300 },
};

// Mirrors getRelevantAddons() in src/data/bookingPlans.ts.
export const PLAN_ADDONS: Record<string, string[]> = {
  visa_assist: ['expedited_booking', 'niche_guide'],
  global_explorer: ['expedited_booking', 'niche_guide', 'partner_discounts'],
};

// Same cap the add-on step applies in the UI.
export const MAX_ADDON_QUANTITY = 10;

export const PLAN_CURRENCY = 'USD';

export interface LineItem {
  name: string;
  quantity: number;
  unitCents: number;
}

export class PricingError extends Error {}

/**
 * Price an ogt_orders row from the catalogue. Only the plan id, add-on ids
 * and quantities are read from the row; any prices stored on it are ignored
 * because the browser wrote them.
 */
export function priceOrder(planType: unknown, addons: unknown): { lineItems: LineItem[]; totalCents: number } {
  const plan = typeof planType === 'string' && Object.hasOwn(PLAN_PRICES, planType) ? PLAN_PRICES[planType] : null;
  if (!plan) {
    throw new PricingError('This plan cannot be purchased online');
  }

  const lineItems: LineItem[] = [{ name: plan.name, quantity: 1, unitCents: plan.unitCents }];

  if (addons != null && !Array.isArray(addons)) {
    throw new PricingError('Order add-ons are malformed');
  }

  const allowed = PLAN_ADDONS[planType as string] ?? [];
  const seen = new Set<string>();
  for (const entry of (addons as unknown[] | null) ?? []) {
    const id = (entry as { id?: unknown } | null)?.id;
    const quantity = (entry as { quantity?: unknown } | null)?.quantity;
    if (typeof id !== 'string' || !Object.hasOwn(ADDON_PRICES, id) || !allowed.includes(id)) {
      throw new PricingError('Order contains an add-on that is not available for this plan');
    }
    if (seen.has(id)) {
      throw new PricingError('Order lists the same add-on twice');
    }
    seen.add(id);
    if (typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity < 1 || quantity > MAX_ADDON_QUANTITY) {
      throw new PricingError('Order contains an invalid add-on quantity');
    }
    lineItems.push({ name: ADDON_PRICES[id].name, quantity, unitCents: ADDON_PRICES[id].unitCents });
  }

  const totalCents = lineItems.reduce((sum, item) => sum + item.unitCents * item.quantity, 0);
  return { lineItems, totalCents };
}
