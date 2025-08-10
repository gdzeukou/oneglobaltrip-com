import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const { itineraryId, passengerDetails, paymentMethod, holdOnly = true } = await req.json();
    if (!itineraryId) throw new Error("itineraryId is required");

    // NOTE: This is a placeholder. Implement actual hold/booking with Amadeus Orders or Duffel.
    const bookingId = `PNR-${crypto.randomUUID?.() ?? Math.floor(Math.random() * 1e9)}`;
    const status = holdOnly ? 'on_hold' : 'booked';

    return new Response(
      JSON.stringify({ bookingId, status, provider: 'simulated', holdExpiresAt: holdOnly ? new Date(Date.now() + 24*3600*1000).toISOString() : null }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("agent-hold-or-book error", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
