/**
 * Small, deterministic helpers shared by the homepage globe app:
 * which destination a sentence is about, which passport the traveler holds,
 * and a first-pass visa verdict. The AI agent gives the real answer; these
 * steer the globe and cover for it when it is unreachable.
 */

import { globeDestinations, type GlobeDestination } from '@/data/globeDestinations';
import type { LatLng } from '@/components/earth/globe';

export const SCHENGEN = new Set([
  'France', 'Germany', 'Italy', 'Spain', 'Netherlands', 'Belgium', 'Austria',
  'Switzerland', 'Portugal', 'Greece', 'Czech Republic', 'Poland', 'Denmark',
  'Sweden', 'Norway', 'Finland', 'Hungary', 'Croatia', 'Slovenia', 'Slovakia',
  'Luxembourg', 'Malta', 'Estonia', 'Latvia', 'Lithuania', 'Iceland',
]);

export const PASSPORTS = ['United States', 'Cameroon', 'France', 'Canada', 'Other'] as const;
export type Passport = (typeof PASSPORTS)[number];

/** Where the flight path starts, by passport. "Other" flies from Houston, our base. */
export const ORIGINS: Record<Passport, LatLng & { label: string }> = {
  'United States': { lat: 29.7604, lng: -95.3698, label: 'Houston' },
  Cameroon: { lat: 4.0511, lng: 9.7679, label: 'Douala' },
  France: { lat: 48.8566, lng: 2.3522, label: 'Paris' },
  Canada: { lat: 43.6532, lng: -79.3832, label: 'Toronto' },
  Other: { lat: 29.7604, lng: -95.3698, label: 'Houston' },
};

export type Verdict = { badge: string; detail: string; hunt: boolean };

export function visaVerdict(country: string, passport: Passport): Verdict {
  if (SCHENGEN.has(country)) {
    if (passport === 'France') return { badge: 'No visa needed', detail: 'EU passport. Schengen travel is open to you, no appointment needed for a short stay.', hunt: false };
    if (passport === 'United States' || passport === 'Canada') return { badge: 'No visa for under 90 days', detail: 'US and Canadian passports are normally visa-free for a short Schengen stay. We still check your file so nothing blocks you at the border.', hunt: false };
    return { badge: 'Schengen visa likely needed', detail: 'Most non-EU passports need a Schengen short-stay visa, with an appointment at VFS Global, TLScontact or BLS. That appointment is the hard part. We hunt it for you.', hunt: true };
  }
  if (country === 'United Kingdom') {
    if (passport === 'France') return { badge: 'No visa needed', detail: 'EU passport. Short UK visits are normally straightforward.', hunt: false };
    if (passport === 'United States' || passport === 'Canada') return { badge: 'ETA to check', detail: 'US and Canadian travelers usually do not need a visitor visa, but an ETA may apply. We confirm it before you book anything.', hunt: false };
    return { badge: 'UK visitor visa likely needed', detail: 'Most other passports need a UK visitor visa first. We review your file and walk you through the appointment.', hunt: true };
  }
  if (country === 'UAE') {
    if (passport === 'United States' || passport === 'Canada' || passport === 'France') return { badge: 'Visa on arrival in most cases', detail: 'US, Canadian and EU passports normally get a visa on arrival in the UAE. We confirm the exact rule for your trip dates.', hunt: false };
    return { badge: 'Visa to check', detail: 'UAE rules depend on your passport. We check them for you before you pay for anything.', hunt: false };
  }
  return { badge: 'We check it for you', detail: 'Visa rules depend on your passport and your trip. Tell us where you are going and we give you the exact next step, no guessing.', hunt: false };
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
  emirates: 'UAE', 'united arab emirates': 'UAE',
};

/** The destination a sentence is about: a city name first, then a country. */
export function findDestination(text: string): GlobeDestination | null {
  const t = ` ${text.toLowerCase()} `;
  for (const d of BY_NAME) {
    if (new RegExp(`[^a-z]${escape(d.name.toLowerCase())}[^a-z]`).test(t)) return d;
  }
  const countryOf = (name: string) =>
    globeDestinations.filter((d) => d.country === name).sort((a, b) => a.tier - b.tier)[0] ?? null;
  for (const [alias, country] of Object.entries(COUNTRY_ALIASES)) {
    if (new RegExp(`[^a-z]${escape(alias)}[^a-z]`).test(t)) return countryOf(country);
  }
  const countries = Array.from(new Set(globeDestinations.map((d) => d.country))).sort((a, b) => b.length - a.length);
  for (const c of countries) {
    if (new RegExp(`[^a-z]${escape(c.toLowerCase())}[^a-z]`).test(t)) return countryOf(c);
  }
  return null;
}

/** "I have a Cameroonian passport" → Cameroon. Only explicit nationality words count. */
export function detectPassport(text: string): Passport | null {
  const t = text.toLowerCase();
  if (/\bcameroon(ian)?\b|\bcamerounais/.test(t)) return 'Cameroon';
  if (/\bcanadian\b|\bcanada passport\b/.test(t)) return 'Canada';
  if (/\bfrench\b|\bfrançais|\bfrancais|\bfrance passport\b/.test(t)) return 'France';
  if (/\bamerican\b|\bus passport\b|\bu\.s\. passport\b|\busa passport\b/.test(t)) return 'United States';
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
