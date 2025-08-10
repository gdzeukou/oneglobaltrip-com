import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function getAmadeusToken() {
  const key = Deno.env.get("AMADEUS_API_KEY");
  const secret = Deno.env.get("AMADEUS_API_SECRET");
  if (!key || !secret) throw new Error("Amadeus credentials missing");
  const resp = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "client_credentials", client_id: key, client_secret: secret }),
  });
  if (!resp.ok) throw new Error(`Amadeus token error: ${await resp.text()}`);
  const json = await resp.json();
  return json.access_token as string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const { origin, destination, departDate, returnDate, pax = 1, cabin, nonstopOnly, maxPriceUSD } = await req.json();
    if (!origin || !destination || !departDate) {
      throw new Error("origin, destination, and departDate are required");
    }

    const token = await getAmadeusToken();
    const url = new URL("https://test.api.amadeus.com/v2/shopping/flight-offers");
    url.searchParams.set("originLocationCode", origin);
    url.searchParams.set("destinationLocationCode", destination);
    url.searchParams.set("departureDate", departDate);
    if (returnDate) url.searchParams.set("returnDate", returnDate);
    url.searchParams.set("adults", String(pax || 1));
    url.searchParams.set("nonStop", String(Boolean(nonstopOnly)));
    url.searchParams.set("currencyCode", "USD");
    url.searchParams.set("max", "10");
    if (maxPriceUSD) url.searchParams.set("maxPrice", String(maxPriceUSD));
    if (cabin) url.searchParams.set("travelClass", cabin);

    const resp = await fetch(url.toString(), { headers: { Authorization: `Bearer ${token}` } });
    if (!resp.ok) throw new Error(`Amadeus flight search error: ${await resp.text()}`);
    const data = await resp.json();

    const results = (data.data || []).map((offer: any) => {
      // Basic mapping for top itinerary only
      const itinerary = offer.itineraries?.[0];
      const segments = itinerary?.segments || [];
      const first = segments[0];
      const last = segments[segments.length - 1];
      const carriers = Array.from(new Set(segments.map((s: any) => s.carrierCode)));
      const flightNumbers = segments.map((s: any) => `${s.carrierCode}${s.number}`);
      const price = offer.price || {};
      return {
        itineraryId: offer.id,
        carrierCodes: carriers,
        flightNumbers,
        depart: first?.departure?.at,
        arrive: last?.arrival?.at,
        duration: itinerary?.duration,
        stops: Math.max(0, segments.length - 1),
        fareBrand: offer.travelerPricings?.[0]?.fareDetailsBySegment?.[0]?.fareBasis || undefined,
        baseFare: price.base ? Number(price.base) : undefined,
        taxes: price.fees ? price.fees.reduce((a: number, f: any) => a + Number(f.amount || 0), 0) : undefined,
        total: price.total ? Number(price.total) : undefined,
        currency: price.currency || 'USD',
        refundable: offer.oneWay ? false : true,
        baggage: undefined,
        fareRulesUrl: undefined,
      };
    });

    return new Response(JSON.stringify({ options: results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("agent-search-flights error", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
