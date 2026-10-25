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
    const { cityCode, checkInDate, checkOutDate, adults = 2 } = await req.json();
    if (!cityCode) throw new Error("cityCode is required, e.g. PAR for Paris");
    const token = await getAmadeusToken();
    const listUrl = new URL("https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city");
    listUrl.searchParams.set("cityCode", cityCode);
    const listResp = await fetch(listUrl.toString(), { headers: { Authorization: `Bearer ${token}` } });
    if (!listResp.ok) throw new Error(`Amadeus hotel list error: ${await listResp.text()}`);
    const listData = await listResp.json();
    const hotelIds = (listData.data || []).slice(0, 10).map((h: any) => h.hotelId).join(",");
    if (!hotelIds) return new Response(JSON.stringify({ options: [] }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    const offersUrl = new URL("https://test.api.amadeus.com/v3/shopping/hotel-offers");
    offersUrl.searchParams.set("hotelIds", hotelIds);
    if (checkInDate) offersUrl.searchParams.set("checkInDate", checkInDate);
    if (checkOutDate) offersUrl.searchParams.set("checkOutDate", checkOutDate);
    offersUrl.searchParams.set("adults", String(adults));
    offersUrl.searchParams.set("currency", "USD");
    const offersResp = await fetch(offersUrl.toString(), { headers: { Authorization: `Bearer ${token}` } });
    if (!offersResp.ok) throw new Error(`Amadeus hotel offers error: ${await offersResp.text()}`);
    const offersData = await offersResp.json();
    const options = (offersData.data || []).map((h: any) => ({
      hotelId: h.hotel?.hotelId,
      name: h.hotel?.name,
      cityCode: h.hotel?.cityCode,
      offers: (h.offers || []).slice(0, 2).map((o: any) => ({
        price: o.price?.total ? Number(o.price.total) : undefined,
        currency: o.price?.currency || "USD",
        room: o.room?.typeEstimated?.category,
        boardType: o.boardType,
      })),
    }));
    return new Response(JSON.stringify({ options }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error) {
    console.error("ogt-hotel-search error", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
