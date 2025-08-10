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
    const url = new URL(req.url);
    const q = url.searchParams.get("q") || (await req.json().catch(() => ({}))).q;
    if (!q || q.length < 2) {
      return new Response(JSON.stringify({ results: [] }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const token = await getAmadeusToken();
    const apiUrl = new URL("https://test.api.amadeus.com/v1/reference-data/locations");
    apiUrl.searchParams.set("subType", "AIRPORT");
    apiUrl.searchParams.set("keyword", q);
    apiUrl.searchParams.set("page[limit]", "10");

    const resp = await fetch(apiUrl.toString(), {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!resp.ok) throw new Error(`Amadeus airports error: ${await resp.text()}`);
    const json = await resp.json();

    const results = (json.data || []).map((a: any) => ({
      iata: a.iataCode,
      name: a.name,
      city: a.address?.cityName || a.address?.cityCode,
      country: a.address?.countryName || a.address?.countryCode,
    }));

    return new Response(JSON.stringify({ results }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error) {
    console.error("agent-list-airports error", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
