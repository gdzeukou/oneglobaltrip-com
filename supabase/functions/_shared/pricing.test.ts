// Fails when the server price list drifts from what the site displays.
// Run with: deno test --allow-read supabase/functions/
import { assert, assertEquals } from 'jsr:@std/assert@1';
import { ADDON_PRICES, PLAN_ADDONS, PLAN_PRICES } from './pricing.ts';

const source = await Deno.readTextFile(new URL('../../../src/data/bookingPlans.ts', import.meta.url));
const [plansSource, addonsSource] = source.split('export const BOOKING_ADDONS');

function entries(text: string) {
  const found = new Map<string, { name: string; price: number | null }>();
  for (const match of text.matchAll(/id: '([^']+)',\s*name: '([^']+)',\s*price: (null|[\d.]+)/g)) {
    found.set(match[1], { name: match[2], price: match[3] === 'null' ? null : Number(match[3]) });
  }
  return found;
}

Deno.test('server plan prices match src/data/bookingPlans.ts', () => {
  const plans = entries(plansSource);
  assert(plans.size >= 2, 'could not parse plans from bookingPlans.ts');

  const payable = [...plans].filter(([, plan]) => plan.price !== null && plan.price > 0);
  assertEquals(payable.map(([id]) => id).sort(), Object.keys(PLAN_PRICES).sort());
  for (const [id, plan] of payable) {
    assertEquals(PLAN_PRICES[id].unitCents, Math.round(plan.price! * 100), id);
    assertEquals(PLAN_PRICES[id].name, plan.name, id);
  }
});

Deno.test('server add-on prices match src/data/bookingPlans.ts', () => {
  const addons = entries(addonsSource);
  assertEquals([...addons.keys()].sort(), Object.keys(ADDON_PRICES).sort());
  for (const [id, addon] of addons) {
    assertEquals(ADDON_PRICES[id].unitCents, Math.round(addon.price! * 100), id);
    assertEquals(ADDON_PRICES[id].name, addon.name, id);
  }
  for (const ids of Object.values(PLAN_ADDONS)) {
    for (const id of ids) assert(id in ADDON_PRICES, id);
  }
});
