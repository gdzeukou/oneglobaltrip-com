/**
 * Live travel prices, through the `ogt-search` edge function.
 *
 * Every call comes back as one of three things, and the page shows which:
 *   live     real offers from the provider
 *   offline  the provider has no key yet, or the function is not deployed
 *   error    the provider answered with a problem (a bad date, no airport)
 *
 * Nothing here invents a price. When a search is offline the page falls back
 * to the estimate catalogue and labels it as an estimate.
 */

import { supabase } from '@/integrations/supabase/client';

export type FlightLeg = { from?: string; to?: string; depart?: string; arrive?: string; duration?: string; stops: number; flights: string[] };
export type FlightOffer = { id: string; airline?: string; airlineCode?: string; total: number; currency: string; expiresAt?: string; legs: FlightLeg[] };
export type StayOffer = { id: string; name?: string; stars: number | null; reviewScore: number | null; photo: string | null; address: string | null; total: number; currency: string };
export type ActivityOffer = { id: string; name?: string; description: string | null; photo: string | null; rating: number | null; reviews: number | null; total: number | null; currency: string; url: string | null };

export type SearchResult<T> =
  | { state: 'live'; options: T[]; /** Duffel test token: schedules and prices are made up. */ test: boolean }
  | { state: 'offline' }
  | { state: 'error'; message: string };

async function search<T>(body: Record<string, unknown>): Promise<SearchResult<T>> {
  try {
    const { data, error } = await supabase.functions.invoke('ogt-search', { body });
    if (error) {
      // A 4xx/5xx from the function carries its message in the response body.
      const context = (error as { context?: Response }).context;
      const detail = context && typeof context.json === 'function' ? await context.json().catch(() => null) : null;
      if (detail?.error) return { state: 'error', message: String(detail.error) };
      return { state: 'offline' };
    }
    if (data?.error) return { state: 'error', message: String(data.error) };
    if (!data?.live) return { state: 'offline' };
    return { state: 'live', options: (data.options ?? []) as T[], test: !!data.test };
  } catch {
    return { state: 'offline' };
  }
}

export const searchFlights = (q: { from: string; to: string; depart: string; return?: string; adults: number }) =>
  search<FlightOffer>({ kind: 'flights', ...q });

export const searchStays = (q: { lat: number; lng: number; checkIn: string; checkOut: string; adults: number }) =>
  search<StayOffer>({ kind: 'stays', ...q });

export const searchActivities = (q: { query: string }) => search<ActivityOffer>({ kind: 'activities', ...q });

export function money(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);
  } catch {
    return `${currency} ${Math.round(amount).toLocaleString('en-US')}`;
  }
}

/** "PT11H25M" → "11h 25m". */
export function duration(iso?: string): string {
  const m = iso?.match(/P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?/);
  if (!m) return '';
  const hours = Number(m[1] ?? 0) * 24 + Number(m[2] ?? 0);
  return `${hours}h ${String(Number(m[3] ?? 0)).padStart(2, '0')}m`;
}

/** "2026-12-26T09:40:00" → "09:40". Times are local to the airport. */
export const clock = (at?: string) => at?.slice(11, 16) ?? '';

export function isoDate(daysFromNow: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().slice(0, 10);
}
