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
    const { latitude, longitude, radius = 20 } = await req.json();
    if (!latitude || !longitude) throw new Error("latitude and longitude are required");
    const token = await getAmadeusToken();
    const url = new URL("https://test.api.amadeus.com/v1/shopping/activities");
    url.searchParams.set("latitude", String(latitude));
    url.searchParams.set("longitude", String(longitude));
    url.searchParams.set("radius", String(radius));
    const resp = await fetch(url.toString(), { headers: { Authorization: `Bearer ${token}` } });
    if (!resp.ok) throw new Error(`Amadeus activities error: ${await resp.text()}`);
    const data = await resp.json();
    const options = (data.data || []).map((a: any) => ({
      id: a.id,
      name: a.name,
      description: a.shortDescription,
      price: a.price?.amount ? Number(a.price.amount) : undefined,
      currency: a.price?.currencyCode || "USD",
      rating: a.rating,
      pictures: a.pictures,
    }));
    return new Response(JSON.stringify({ options }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error) {
    console.error("ogt-activities-search error", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
