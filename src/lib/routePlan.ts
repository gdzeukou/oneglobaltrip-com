/**
 * Reads a route the way a border officer would.
 *
 * Given a passport and a list of stops, it works out which visas the trip
 * needs, which consulate takes the Schengen application, and the dates the
 * paperwork has to hit. Everything here is a published rule, not a guess:
 *
 *   - Schengen: apply to the country where you spend the most nights, or the
 *     first one you enter if it is a tie. Applications open 6 months before
 *     departure and close 15 days before. A decision takes 15 days, up to 45.
 *   - UK: applications open 3 months before travel, and a decision usually
 *     takes 3 weeks.
 *
 * Whether a passport needs a visa at all comes from `visaVerdict`, which
 * stays silent rather than guess.
 */

import { SCHENGEN, visaVerdict, type Verdict } from '@/lib/travelResolve';
import { serviceFor, type VisaService } from '@/data/visaCatalog';

export interface Stop {
  id: string;
  city: string;
  country: string;
  nights: number;
}

export type Need = 'visa' | 'none' | 'check';

export interface Border {
  /** "Schengen area" or a country name. */
  zone: string;
  countries: string[];
  nights: number;
  need: Need;
  verdict: Verdict;
  service?: VisaService;
  /** Schengen only: the consulate that takes the application, and why. */
  applyTo?: { country: string; reason: string };
  /** Schengen only: the stay is longer than a short-stay visa allows. */
  overstay?: boolean;
}

export interface Window {
  /** Days before departure. */
  opens: number;
  safe: number;
  last: number;
  rule: string;
}

const WINDOWS: Record<string, Window> = {
  schengen: {
    opens: 180,
    safe: 45,
    last: 15,
    rule: 'Schengen applications open 6 months before departure and close 15 days before. A decision takes 15 days and can take up to 45.',
  },
  uk: {
    opens: 90,
    safe: 42,
    last: 21,
    rule: 'UK visitor applications open 3 months before travel. A decision usually takes 3 weeks after biometrics.',
  },
};

export type Timing = 'early' | 'on-time' | 'tight' | 'late';

export interface Calendar {
  window: Window;
  opensOn: Date;
  safeBy: Date;
  lastDay: Date;
  timing: Timing;
  /** When the date is too close: the first departure date that leaves enough time. */
  earliestDeparture?: Date;
}

const DAY = 86_400_000;
export const addDays = (d: Date, n: number) => new Date(d.getTime() + n * DAY);
const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

function needOf(v: Verdict): Need {
  if (v.hunt) return 'visa';
  return v.badge === 'We check it for you' ? 'check' : 'none';
}

/** One entry per border the route crosses, in the order it crosses them. */
export function bordersOf(passport: string, stops: Stop[]): Border[] {
  const zones: { zone: string; stops: Stop[] }[] = [];
  for (const s of stops) {
    if (s.country === passport) continue;
    const zone = SCHENGEN.has(s.country) ? 'Schengen area' : s.country;
    const held = zones.find((z) => z.zone === zone);
    if (held) held.stops.push(s);
    else zones.push({ zone, stops: [s] });
  }

  return zones.map(({ zone, stops: inZone }) => {
    const countries = Array.from(new Set(inZone.map((s) => s.country)));
    const nights = inZone.reduce((n, s) => n + s.nights, 0);
    const verdict = visaVerdict(countries[0], passport);
    const border: Border = { zone, countries, nights, need: needOf(verdict), verdict, service: serviceFor(countries[0]) };

    if (zone === 'Schengen area') {
      const byCountry = countries.map((c) => ({ c, n: inZone.filter((s) => s.country === c).reduce((n, s) => n + s.nights, 0) }));
      const most = Math.max(...byCountry.map((x) => x.n));
      const leaders = byCountry.filter((x) => x.n === most);
      border.applyTo = countries.length === 1
        ? { country: countries[0], reason: 'It is the only Schengen country on the route.' }
        : leaders.length === 1
          ? { country: leaders[0].c, reason: `You spend the most nights there: ${byCountry.map((x) => `${x.c} ${x.n}`).join(', ')}.` }
          : { country: leaders[0].c, reason: `${leaders.map((x) => x.c).join(' and ')} tie on nights, so the first one you enter takes the application.` };
      border.overstay = nights > 90;
    }
    return border;
  });
}

/** The paperwork dates for one border, counted back from departure. */
export function calendarFor(border: Border, departure: Date, today = new Date()): Calendar | null {
  const window = border.service && border.need === 'visa' ? WINDOWS[border.service.slug] : undefined;
  if (!window) return null;
  const now = startOfDay(today);
  const dep = startOfDay(departure);
  const left = Math.round((dep.getTime() - now.getTime()) / DAY);
  const timing: Timing = left < window.last ? 'late' : left < window.safe ? 'tight' : left > window.opens ? 'early' : 'on-time';
  return {
    window,
    opensOn: addDays(dep, -window.opens),
    safeBy: addDays(dep, -window.safe),
    lastDay: addDays(dep, -window.last),
    timing,
    earliestDeparture: timing === 'late' || timing === 'tight' ? addDays(now, window.safe) : undefined,
  };
}

/** The route in plain text, to attach to a visa request. */
export function routeText(stops: Stop[], departure: Date | null): string {
  const line = stops.map((s) => `${s.city}, ${s.country} (${s.nights} night${s.nights === 1 ? '' : 's'})`).join(' > ');
  return `${departure ? `Departure ${departure.toISOString().slice(0, 10)}. ` : ''}Route: ${line}`;
}

/* ---------- dates along the route ---------- */

export interface Leg {
  stop: Stop;
  arrive: Date;
  leave: Date;
}

/** Each stop with the day you arrive and the day you leave. */
export function legsOf(stops: Stop[], departure: Date): Leg[] {
  let cursor = startOfDay(departure);
  return stops.map((s) => {
    const arrive = cursor;
    cursor = addDays(cursor, s.nights);
    return { stop: s, arrive, leave: cursor };
  });
}

export interface Stay {
  countries: string[];
  entry: Date;
  exit: Date;
  /** Days counted the Schengen way: the day you enter and the day you leave both count. */
  days: number;
  firstCountry: string;
}

/**
 * Each unbroken stay inside the Schengen area. A route that leaves the area
 * and comes back has two stays, which means two entries on the visa.
 */
export function schengenStays(stops: Stop[], departure: Date): Stay[] {
  const stays: Stay[] = [];
  let open: Leg[] = [];
  const close = () => {
    if (!open.length) return;
    const entry = open[0].arrive;
    const exit = open[open.length - 1].leave;
    stays.push({
      countries: Array.from(new Set(open.map((l) => l.stop.country))),
      entry,
      exit,
      days: Math.round((exit.getTime() - entry.getTime()) / DAY) + 1,
      firstCountry: open[0].stop.country,
    });
    open = [];
  };
  for (const leg of legsOf(stops, departure)) {
    if (SCHENGEN.has(leg.stop.country)) open.push(leg);
    else close();
  }
  close();
  return stays;
}
