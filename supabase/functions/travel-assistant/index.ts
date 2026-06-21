import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY');

const SERVICE_CONTEXT: Record<string, string> = {
  flights: `Help the user find flights to their destination. Collect: origin city, travel dates (outbound + return), number of passengers (adults/children), class preference (economy/business/first), flexible dates preference. Once collected, give an estimated price range based on typical routes and offer to guide them through booking steps or redirect them to search engines (Google Flights, Skyscanner, Kayak). Be specific with airport codes when known.`,
  hotels: `Help the user find accommodation. Collect: check-in/check-out dates, number of guests, room type preference, budget range per night, amenity preferences (pool, gym, breakfast, etc.), neighborhood preference. Give 3 types of options: budget, mid-range, luxury with estimated prices for that city. Guide them to booking platforms.`,
  rentals: `Help the user rent a car. Collect: pick-up location (airport or city), drop-off location (same or different), dates, car type preference (economy/SUV/luxury), driver age, any special requirements. Give estimated daily rates and recommend reputable rental companies operating in that destination.`,
  activities: `Help the user discover and book activities and experiences. Ask about their interests (culture, adventure, food, nightlife, family-friendly, etc.), how many days they'll be there, and budget per activity. Suggest top experiences for the destination with estimated costs and how to book them.`,
  visa: `Guide the user through visa requirements and the application process. First confirm their nationality and passport countries held. Then explain: (1) whether they need a visa, (2) what type of visa, (3) required documents, (4) processing time, (5) fees, (6) where to apply (embassy, online portal, visa on arrival). Ask about travel purpose (tourism/business/study/family). Mention any important notes like passport validity requirements, return ticket requirements, or proof of funds.`,
  immigration: `Provide information about long-term immigration options for the destination country. Ask about their goal: work permit, student visa, digital nomad visa, retirement visa, family reunification, or permanent residency. Collect: their current nationality, education level, years of work experience, field of work, whether they have a job offer. Outline the main pathway options, eligibility criteria, required documents, processing times, and fees.`,
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!ANTHROPIC_API_KEY) {
      return new Response(
        JSON.stringify({ reply: 'AI assistant is currently unavailable. Please try again later.' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { service, destination, userProfile, tripStops, messages } = await req.json();

    const tripContext = tripStops?.length > 0
      ? `The user's current trip itinerary: ${tripStops.map((s: { name: string; country: string }) => `${s.name} (${s.country})`).join(' → ')}.`
      : 'The user has not built a trip itinerary yet.';

    const profileContext = userProfile?.nationality
      ? `User nationality: ${userProfile.nationality}. Passport countries: ${(userProfile.passportCountries ?? []).join(', ') || userProfile.nationality}. Home city: ${userProfile.homeCity || 'not specified'}.`
      : 'User has not specified their nationality yet — ask for it early as it affects requirements.';

    const systemPrompt = `You are a friendly, knowledgeable travel assistant for OneGlobalTrip. The user needs help with ${SERVICE_LABELS[service] ?? service} for ${destination.name}, ${destination.country}.

${profileContext}
${tripContext}

Your task: ${SERVICE_CONTEXT[service] ?? 'Help the user with their travel needs for this destination.'}

Guidelines:
- Be conversational, warm, and concise. Keep responses under 150 words unless listing items.
- Ask one or two questions at a time — don't overwhelm.
- Use bullet points or numbered lists when presenting options or requirements.
- Be factual about requirements but note that regulations change and they should verify official sources.
- Never invent specific prices or guarantees — use ranges and estimates.
- If the user seems ready to proceed, encourage them to use the service links on the app or contact support.`;

    const anthropicMessages = (messages ?? []).map((m: { role: string; content: string }) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    }));

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 512,
        system: systemPrompt,
        messages: anthropicMessages,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Anthropic error:', err);
      return new Response(
        JSON.stringify({ reply: 'I\'m having trouble right now. Please try again in a moment.' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const result = await response.json();
    const reply = result.content?.[0]?.text ?? 'Sorry, I couldn\'t generate a response. Please try again.';

    return new Response(
      JSON.stringify({ reply }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Travel assistant error:', err);
    return new Response(
      JSON.stringify({ reply: 'Something went wrong. Please try again.' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

const SERVICE_LABELS: Record<string, string> = {
  flights: 'Flights',
  hotels: 'Hotels',
  rentals: 'Car Rentals',
  activities: 'Activities & Things To Do',
  visa: 'Visa & Statement of Purpose',
  immigration: 'Immigration',
};
