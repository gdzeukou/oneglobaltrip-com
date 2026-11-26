/**
 * ogt-search: live travel prices for One Global Trip.
 *
 * One function, three kinds of search:
 *   flights     Duffel   (offer requests)
 *   stays       Duffel   (Stays search by coordinates)
 *   activities  Viator   (Partner API, free-text product search)
 * plus `status`, which says which providers have a key, so the site can tell
 * the visitor the truth about what is live.
 *
 * Secrets (Supabase → Edge Functions → Secrets):
 *   DUFFEL_ACCESS_TOKEN   duffel_test_… gives made-up prices on a test airline;
 *                         duffel_live_… gives real ones.
 *   VIATOR_API_KEY        Viator affiliate key.
 *
 * It replaces agent-search-flights, ogt-hotel-search and
 * ogt-activities-search, which called the Amadeus Self-Service API. Amadeus
 * shut that API down on 17 July 2026.
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

class Unconfigured extends Error {}

const DATE = /^\d{4}-\d{2}-\d{2}$/;
const clampInt = (v: unknown, min: number, max: number, fallback: number) => {
  const n = Math.round(Number(v));
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : fallback;
};
const text = (v: unknown, max = 80) => (typeof v === "string" ? v.trim().slice(0, max) : "");

// ---------- Duffel ----------

function duffelToken(): string {
  const token = Deno.env.get("DUFFEL_ACCESS_TOKEN");
  if (!token) throw new Unconfigured("flights and stays are not connected yet");
  return token;
}

async function duffel(path: string, init: RequestInit = {}) {
  const resp = await fetch(`https://api.duffel.com${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${duffelToken()}`,
      "Duffel-Version": "v2",
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
  const body = await resp.json().catch(() => null);
  if (!resp.ok) {
    console.error("duffel", path, resp.status, JSON.stringify(body)?.slice(0, 600));
    throw new Error(body?.errors?.[0]?.message ?? `Duffel answered ${resp.status}`);
  }
  return body;
}

/** "Lagos" or "LOS" → an IATA code Duffel accepts, preferring the whole city. */
async function placeCode(query: string): Promise<{ code: string; label: string } | null> {
  if (/^[A-Za-z]{3}$/.test(query)) return { code: query.toUpperCase(), label: query.toUpperCase() };
  const city = query.split(",")[0].trim();
  const body = await duffel(`/places/suggestions?query=${encodeURIComponent(city)}`);
  const places = (body?.data ?? []) as any[];
  const pick = places.find((p) => p.type === "city") ?? places[0];
  if (!pick) return null;
  const code = pick.iata_code ?? pick.iata_city_code;
  return code ? { code, label: pick.city_name ?? pick.name ?? city } : null;
}

async function flights(input: any) {
  const from = text(input.from);
  const to = text(input.to);
  const depart = text(input.depart, 10);
  const back = text(input.return, 10);
  if (!from || !to || !DATE.test(depart)) throw new Error("from, to and depart (YYYY-MM-DD) are required");
  if (back && !DATE.test(back)) throw new Error("return must be YYYY-MM-DD");
  const adults = clampInt(input.adults, 1, 9, 1);

  const [origin, destination] = await Promise.all([placeCode(from), placeCode(to)]);
  if (!origin) throw new Error(`We could not find an airport for "${from}"`);
  if (!destination) throw new Error(`We could not find an airport for "${to}"`);

  const slices = [{ origin: origin.code, destination: destination.code, departure_date: depart }];
  if (back) slices.push({ origin: destination.code, destination: origin.code, departure_date: back });

  const body = await duffel("/air/offer_requests?return_offers=true&supplier_timeout=15000", {
    method: "POST",
    body: JSON.stringify({
      data: { slices, passengers: Array.from({ length: adults }, () => ({ type: "adult" })), cabin_class: "economy" },
    }),
  });

  const offers = ((body?.data?.offers ?? []) as any[])
    .sort((a, b) => Number(a.total_amount) - Number(b.total_amount))
    .slice(0, 12)
    .map((o) => {
      const legs = (o.slices ?? []).map((s: any) => {
        const segs = s.segments ?? [];
        return {
          from: segs[0]?.origin?.iata_code,
          to: segs[segs.length - 1]?.destination?.iata_code,
          depart: segs[0]?.departing_at,
          arrive: segs[segs.length - 1]?.arriving_at,
          duration: s.duration,
          stops: Math.max(0, segs.length - 1),
          flights: segs.map((x: any) => `${x.marketing_carrier?.iata_code ?? ""}${x.marketing_carrier_flight_number ?? ""}`),
        };
      });
      return {
        id: o.id,
        airline: o.owner?.name,
        airlineCode: o.owner?.iata_code,
        total: Number(o.total_amount),
        currency: o.total_currency,
        expiresAt: o.expires_at,
        legs,
      };
    });

  return { origin, destination, adults, options: offers };
}

async function stays(input: any) {
  const lat = Number(input.lat);
  const lng = Number(input.lng);
  const checkIn = text(input.checkIn, 10);
  const checkOut = text(input.checkOut, 10);
  if (!Number.isFinite(lat) || !Number.isFinite(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) throw new Error("lat and lng are required");
  if (!DATE.test(checkIn) || !DATE.test(checkOut)) throw new Error("checkIn and checkOut (YYYY-MM-DD) are required");
  const adults = clampInt(input.adults, 1, 8, 2);

  const body = await duffel("/stays/search", {
    method: "POST",
    body: JSON.stringify({
      data: {
        rooms: clampInt(input.rooms, 1, 4, 1),
        location: { radius: clampInt(input.radiusKm, 1, 50, 8), geographic_coordinates: { latitude: lat, longitude: lng } },
        check_in_date: checkIn,
        check_out_date: checkOut,
        guests: Array.from({ length: adults }, () => ({ type: "adult" })),
      },
    }),
  });

  const options = ((body?.data?.results ?? []) as any[])
    .filter((r) => r.cheapest_rate_total_amount)
    .sort((a, b) => Number(a.cheapest_rate_total_amount) - Number(b.cheapest_rate_total_amount))
    .slice(0, 12)
    .map((r) => ({
      id: r.id,
      name: r.accommodation?.name,
      stars: r.accommodation?.rating ?? null,
      reviewScore: r.accommodation?.review_score ?? null,
      photo: r.accommodation?.photos?.[0]?.url ?? null,
      address: r.accommodation?.location?.address?.line_one ?? null,
      total: Number(r.cheapest_rate_total_amount),
      currency: r.cheapest_rate_currency,
    }));

  return { adults, options };
}

// ---------- Viator ----------

async function activities(input: any) {
  const key = Deno.env.get("VIATOR_API_KEY");
  if (!key) throw new Unconfigured("activities are not connected yet");
  const query = text(input.query);
  if (!query) throw new Error("query is required, such as a city name");

  const resp = await fetch("https://api.viator.com/partner/search/freetext", {
    method: "POST",
    headers: {
      "exp-api-key": key,
      Accept: "application/json;version=2.0",
      "Accept-Language": "en-US",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      searchTerm: query,
      searchTypes: [{ searchType: "PRODUCTS", pagination: { start: 1, count: 12 } }],
      currency: "USD",
    }),
  });
  const body = await resp.json().catch(() => null);
  if (!resp.ok) {
    console.error("viator", resp.status, JSON.stringify(body)?.slice(0, 600));
    throw new Error(body?.message ?? `Viator answered ${resp.status}`);
  }

  const options = ((body?.products?.results ?? []) as any[]).map((p) => {
    const variants = (p.images?.[0]?.variants ?? []) as any[];
    const photo = variants.find((v) => v.width >= 400)?.url ?? variants[variants.length - 1]?.url ?? null;
    return {
      id: p.productCode,
      name: p.title,
      description: typeof p.description === "string" ? p.description.slice(0, 220) : null,
      photo,
      rating: p.reviews?.combinedAverageRating ?? null,
      reviews: p.reviews?.totalReviews ?? null,
      total: p.pricing?.summary?.fromPrice ?? null,
      currency: p.pricing?.currency ?? "USD",
      url: p.productUrl ?? null,
    };
  });

  return { options };
}

// ---------- entry ----------

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  if (req.method !== "POST") return json({ error: "POST only" }, 405);

  let input: any;
  try {
    input = await req.json();
  } catch {
    return json({ error: "Send a JSON body" }, 400);
  }

  const duffelKey = Deno.env.get("DUFFEL_ACCESS_TOKEN") ?? "";
  // A Duffel test token searches a made-up airline: the site must say so.
  const test = duffelKey.startsWith("duffel_test_");

  try {
    switch (input?.kind) {
      case "status":
        return json({ flights: !!duffelKey, stays: !!duffelKey, activities: !!Deno.env.get("VIATOR_API_KEY"), test });
      case "flights":
        return json({ live: true, test, ...(await flights(input)) });
      case "stays":
        return json({ live: true, test, ...(await stays(input)) });
      case "activities":
        return json({ live: true, test: false, ...(await activities(input)) });
      default:
        return json({ error: "kind must be flights, stays, activities or status" }, 400);
    }
  } catch (error) {
    if (error instanceof Unconfigured) return json({ live: false, reason: error.message });
    console.error("ogt-search", input?.kind, error);
    return json({ error: error instanceof Error ? error.message : "Search failed" }, 502);
  }
});
