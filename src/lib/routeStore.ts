/**
 * The route the traveler is building, kept in the browser so the planner
 * and the visa file work on the same trip.
 */

import type { Stop } from '@/lib/routePlan';

export interface SavedRoute {
  passport: string;
  /** yyyy-mm-dd */
  departure: string;
  travelers: number;
  stops: Stop[];
}

const KEY = 'ogt-route';

export function loadRoute(): SavedRoute | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const r = JSON.parse(raw) as SavedRoute;
    return typeof r.passport === 'string' && typeof r.departure === 'string' && Array.isArray(r.stops) ? r : null;
  } catch {
    return null;
  }
}

export function saveRoute(route: SavedRoute) {
  try {
    localStorage.setItem(KEY, JSON.stringify(route));
  } catch {
    // Private browsing or a full disk: the route simply is not remembered.
  }
}

export const toIso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
export const fromIso = (s: string) => {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
};
