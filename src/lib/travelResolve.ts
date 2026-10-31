/**
 * Small, deterministic helpers shared by the homepage globe app: which
 * destination a sentence is about, which passport the traveler holds, and a
 * first-pass read on whether that pairing needs a visa.
 *
 * Every country OGT has a destination in can be a passport here — the list is
 * derived from the destination data, not hand-picked. The AI agent gives the
 * real per-case answer; these keep the globe and the boarding pass honest
 * while it thinks, and when it cannot be reached.
 *
 * On visas this deliberately says less than it could. Claiming "no visa
 * needed" wrongly costs someone a trip, so it only says so where free
 * movement or a long-standing waiver makes it certain, and otherwise says we
 * check it.
 */

import { globeDestinations, type GlobeDestination } from '@/data/globeDestinations';
import type { LatLng } from '@/components/earth/globe';

export const SCHENGEN = new Set([
  'Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Czech Republic', 'Denmark', 'Estonia',
  'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Italy', 'Latvia',
  'Liechtenstein', 'Lithuania', 'Luxembourg', 'Malta', 'Netherlands', 'Norway', 'Poland',
  'Portugal', 'Romania', 'Slovakia', 'Slovenia', 'Spain', 'Sweden', 'Switzerland',
]);

/** Free movement: a Schengen passport plus the rest of the EU and the EEA. */
const FREE_MOVEMENT = new Set([...SCHENGEN, 'Ireland', 'Cyprus']);

/**
 * Passports with long-standing 90-day visa-free access to the Schengen area.
 * Kept deliberately short: a country only belongs here if the waiver has been
 * stable for years. Everyone else gets "we check it", not a guess.
 */
const SCHENGEN_WAIVER = new Set([
  'United States', 'Canada', 'United Kingdom', 'Japan', 'South Korea', 'Singapore',
  'Australia', 'New Zealand', 'Israel', 'Brazil', 'Mexico', 'Chile', 'Argentina',
  'Uruguay', 'Costa Rica', 'Panama', 'Malaysia', 'Taiwan', 'UAE',
]);

/** Passports that do not need a UK visitor visa (an ETA may still apply). */
const UK_WAIVER = new Set([
  ...FREE_MOVEMENT, 'United States', 'Canada', 'Japan', 'South Korea', 'Singapore',
  'Australia', 'New Zealand', 'Israel', 'Brazil', 'Mexico', 'Chile', 'Argentina',
  'Malaysia', 'Taiwan', 'UAE', 'Hong Kong',
]);

export type Passport = string;
export type Origin = LatLng & { label: string; country: string };

/** Every country OGT knows a destination in, alphabetically. */
export const PASSPORT_COUNTRIES: string[] = Array.from(
  new Set(globeDestinations.map((d) => d.country)),
)
  .filter((c) => !c.includes('/'))
  .sort((a, b) => a.localeCompare(b));

export const DEFAULT_PASSPORT = 'United States';

/** The best-known city in a country, used as the departure point. */
const ORIGIN_BY_COUNTRY = new Map<string, GlobeDestination>();
for (const d of globeDestinations) {
  const held = ORIGIN_BY_COUNTRY.get(d.country);
  if (!held || d.tier < held.tier) ORIGIN_BY_COUNTRY.set(d.country, d);
}

export function originFor(passport: Passport): Origin {
  const city = ORIGIN_BY_COUNTRY.get(passport);
  if (city) return { lat: city.lat, lng: city.lng, label: city.name, country: passport };
  // Houston: where One Global Trip is.
  return { lat: 29.7604, lng: -95.3698, label: 'Houston', country: 'United States' };
}

export type Verdict = {
  badge: string;
  detail: string;
  /** A visa is likely needed, so the appointment hunt is the next step. */
  hunt: boolean;
};

export function visaVerdict(destCountry: string, passport: Passport): Verdict {
  if (destCountry === passport) {
    return {
      badge: 'Home turf',
      detail: 'Same country as your passport, so there is no border to clear. We can still book the whole trip.',
      hunt: false,
    };
  }
  if (FREE_MOVEMENT.has(destCountry) && FREE_MOVEMENT.has(passport)) {
    return {
      badge: 'No visa needed',
      detail: 'Free movement inside the EU and the EEA. Bring the passport, book the trip.',
      hunt: false,
    };
  }
  if (SCHENGEN.has(destCountry)) {
    if (SCHENGEN_WAIVER.has(passport)) {
      return {
        badge: 'No visa for stays under 90 days',
        detail: `A ${passport} passport is normally visa-free in the Schengen area for a short stay. We still check your file so nothing stops you at the border.`,
        hunt: false,
      };
    }
    return {
      badge: 'Schengen visa likely needed',
      detail: 'Most passports need a Schengen short-stay visa, and the appointment at VFS Global, TLScontact or BLS is the hard part. We hunt it for you.',
      hunt: true,
    };
  }
  if (destCountry === 'United Kingdom') {
    if (UK_WAIVER.has(passport)) {
      return {
        badge: 'ETA to check, no visa',
        detail: 'Short UK visits are normally straightforward on your passport, though an ETA may apply. We confirm it before you book anything.',
        hunt: false,
      };
    }
    return {
      badge: 'UK visitor visa likely needed',
      detail: 'Most passports need a UK visitor visa first. We review your file and walk you through the appointment.',
      hunt: true,
    };
  }
  return {
    badge: 'We check it for you',
    detail: `Entry rules for ${destCountry} depend on your passport and how long you stay. We confirm the exact rule for your dates before you pay for anything.`,
    hunt: false,
  };
}

export function visaLink(country: string): string {
  if (SCHENGEN.has(country)) return '/schengen-visa';
  if (country === 'United Kingdom') return '/visas/short-stay/uk';
  return '/visas';
}

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Longest names first, so "New Delhi" wins over "Delhi" and "Cape Town" over "Cape".
const BY_NAME = [...globeDestinations].sort((a, b) => b.name.length - a.name.length || a.tier - b.tier);
const COUNTRY_ALIASES: Record<string, string> = {
  usa: 'United States', 'united states': 'United States', america: 'United States',
  uk: 'United Kingdom', england: 'United Kingdom', britain: 'United Kingdom',
  emirates: 'UAE', 'united arab emirates': 'UAE', holland: 'Netherlands',
};

function cityIn(country: string): GlobeDestination | null {
  return ORIGIN_BY_COUNTRY.get(country) ?? null;
}

/** The destination a sentence is about: a city name first, then a country. */
export function findDestination(text: string): GlobeDestination | null {
  const t = ` ${text.toLowerCase()} `;
  for (const d of BY_NAME) {
    if (new RegExp(`[^a-z]${escape(d.name.toLowerCase())}[^a-z]`).test(t)) return d;
  }
  for (const [alias, country] of Object.entries(COUNTRY_ALIASES)) {
    if (new RegExp(`[^a-z]${escape(alias)}[^a-z]`).test(t)) return cityIn(country);
  }
  const countries = PASSPORT_COUNTRIES.slice().sort((a, b) => b.length - a.length);
  for (const c of countries) {
    if (new RegExp(`[^a-z]${escape(c.toLowerCase())}[^a-z]`).test(t)) return cityIn(c);
  }
  return null;
}

/**
 * "I have a Brazilian passport" → Brazil. Built from the country list, with
 * the handful of demonyms that are not just the country name plus a suffix.
 */
const DEMONYMS: Record<string, string> = {
  american: 'United States', british: 'United Kingdom', english: 'United Kingdom',
  scottish: 'United Kingdom', welsh: 'United Kingdom', irish: 'Ireland', dutch: 'Netherlands',
  french: 'France', german: 'Germany', spanish: 'Spain', portuguese: 'Portugal',
  swiss: 'Switzerland', greek: 'Greece', polish: 'Poland', danish: 'Denmark',
  swedish: 'Sweden', finnish: 'Finland', norwegian: 'Norway', icelandic: 'Iceland',
  turkish: 'Turkey', japanese: 'Japan', chinese: 'China', thai: 'Thailand',
  vietnamese: 'Vietnam', filipino: 'Philippines', emirati: 'UAE', saudi: 'Saudi Arabia',
  moroccan: 'Morocco', egyptian: 'Egypt', ivorian: 'Ivory Coast', congolese: 'DR Congo',
  'south african': 'South Africa', 'new zealander': 'New Zealand', kiwi: 'New Zealand',
  'south korean': 'South Korea', korean: 'South Korea', czech: 'Czech Republic',
};

export function detectPassport(text: string): Passport | null {
  const t = ` ${text.toLowerCase()} `;
  for (const [word, country] of Object.entries(DEMONYMS)) {
    if (new RegExp(`[^a-z]${escape(word)}[^a-z]`).test(t)) return country;
  }
  // "<Country> passport", and the regular -ian / -ese / -ish demonyms.
  for (const c of PASSPORT_COUNTRIES) {
    const base = c.toLowerCase();
    const stem = base.replace(/a$|e$|y$/, '');
    const forms = [`${base} passport`, `${stem}ian`, `${stem}ean`, `${base}n`, `${stem}ese`, `${stem}ish`];
    for (const f of forms) {
      if (new RegExp(`[^a-z]${escape(f)}[^a-z]`).test(t)) return c;
    }
  }
  return null;
}

/** Angle between two points on the globe, in degrees. */
export function arcDeg(a: LatLng, b: LatLng): number {
  const r = Math.PI / 180;
  const h =
    Math.sin(((b.lat - a.lat) * r) / 2) ** 2 +
    Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(((b.lng - a.lng) * r) / 2) ** 2;
  return (2 * Math.asin(Math.min(1, Math.sqrt(h)))) / r;
}
