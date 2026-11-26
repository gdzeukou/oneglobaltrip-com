/** Places a traveler can type into the trip bar: every city OGT knows. */

import { globeDestinations, type GlobeDestination } from '@/data/globeDestinations';
import { findDestination } from '@/lib/travelResolve';

export const placeLabel = (d: GlobeDestination) => `${d.name}, ${d.country}`;

const BY_LABEL = new Map(globeDestinations.map((d) => [placeLabel(d).toLowerCase(), d]));

/** Best-known cities first, so the suggestions open on places people look for. */
export const PLACE_LABELS: string[] = Array.from(new Set(
  globeDestinations.slice().sort((a, b) => a.tier - b.tier || a.name.localeCompare(b.name)).map(placeLabel),
));

/** "Lagos, Nigeria", "lagos" or "Nigeria" → the city. Null when we do not know it. */
export function resolvePlace(text: string): GlobeDestination | null {
  const t = text.trim();
  if (!t) return null;
  return BY_LABEL.get(t.toLowerCase()) ?? findDestination(t);
}
