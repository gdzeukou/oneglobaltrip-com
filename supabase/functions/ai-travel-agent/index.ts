
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

// API keys from environment
const openAIApiKey = Deno.env.get('OPENAI_API_KEY') || Deno.env.get('SUPAGENT_OPENAI') || Deno.env.get('Supagent Openai');
const amadeusApiKey = Deno.env.get('AMADEUS_API_KEY');
const amadeusApiSecret = Deno.env.get('AMADEUS_API_SECRET');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Common city to IATA code mappings
const CITY_TO_IATA: Record<string, string> = {
  // Major US cities
  'houston': 'IAH',
  'dallas': 'DFW',
  'new york': 'JFK',
  'los angeles': 'LAX',
  'chicago': 'ORD',
  'miami': 'MIA',
  'atlanta': 'ATL',
  'boston': 'BOS',
  'seattle': 'SEA',
  'san francisco': 'SFO',
  'las vegas': 'LAS',
  'denver': 'DEN',
  'phoenix': 'PHX',
  'philadelphia': 'PHL',
  'detroit': 'DTW',
  'minneapolis': 'MSP',
  'orlando': 'MCO',
  'charlotte': 'CLT',
  'washington': 'DCA',
  'dc': 'DCA',
  
  // International cities
  'london': 'LHR',
  'paris': 'CDG',
  'madrid': 'MAD',
  'barcelona': 'BCN',
  'rome': 'FCO',
  'amsterdam': 'AMS',
  'berlin': 'BER',
  'munich': 'MUC',
  'frankfurt': 'FRA',
  'zurich': 'ZUR',
  'vienna': 'VIE',
  'brussels': 'BRU',
  'milan': 'MXP',
  'istanbul': 'IST',
  'dubai': 'DXB',
  'tokyo': 'NRT',
  'singapore': 'SIN',
  'sydney': 'SYD',
  'toronto': 'YYZ',
  'vancouver': 'YVR',
  'mexico city': 'MEX',
};

// Get city IATA code with fallback
function getCityIATA(cityName: string): string {
  const normalized = cityName.toLowerCase().trim();
  return CITY_TO_IATA[normalized] || cityName.toUpperCase();
}

// Get Amadeus access token
async function getAmadeusToken() {
  const response = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=client_credentials&client_id=${amadeusApiKey}&client_secret=${amadeusApiSecret}`
  });
  
  const data = await response.json();
  return data.access_token;
}

// Search flights using Amadeus API with flexible dates
async function searchFlights(origin: string, destination: string, departureDate: string, returnDate?: string, adults: number = 1) {
  try {
    const token = await getAmadeusToken();
    const params = new URLSearchParams({
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate,
      adults: adults.toString(),
      max: '5'
    });
    
    if (returnDate) {
      params.append('returnDate', returnDate);
    }
    
    let response = await fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers?${params}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    let data = await response.json();
    
    // If no flights found, try flexible dates (±2 days)
    if (!data.data || data.data.length === 0) {
      console.log('No flights found for exact date, trying flexible search...');
      
      const originalDate = new Date(departureDate);
      const flexibleDates = [];
      
      // Try ±2 days
      for (let i = -2; i <= 2; i++) {
        if (i === 0) continue; // Skip original date
        const flexDate = new Date(originalDate);
        flexDate.setDate(originalDate.getDate() + i);
        flexibleDates.push(flexDate.toISOString().split('T')[0]);
      }
      
      for (const flexDate of flexibleDates) {
        const flexParams = new URLSearchParams({
          originLocationCode: origin,
          destinationLocationCode: destination,
          departureDate: flexDate,
          adults: adults.toString(),
          max: '3'
        });
        
        if (returnDate) {
          const returnOriginal = new Date(returnDate);
          const daysDiff = Math.floor((originalDate.getTime() - new Date(departureDate).getTime()) / (1000 * 60 * 60 * 24));
          const flexReturn = new Date(flexDate);
          flexReturn.setDate(flexReturn.getDate() + daysDiff);
          flexParams.append('returnDate', flexReturn.toISOString().split('T')[0]);
        }
        
        response = await fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers?${flexParams}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        data = await response.json();
        if (data.data && data.data.length > 0) {
          console.log(`Found flights for flexible date: ${flexDate}`);
          break;
        }
      }
    }
    
    return data.data || [];
  } catch (error) {
    console.error('Flight search error:', error);
    return [];
  }
}

// Format flight results in Maya's structured format
function formatFlightResults(flights: any[], searchedOrigin: string, searchedDestination: string) {
  if (!flights.length) {
    return `I didn't find flights for those exact dates, but let me try expanding the search or suggest alternate dates. Would you like me to check nearby airports or different dates for your ${searchedOrigin} to ${searchedDestination} trip?`;
  }
  
  const formattedFlights = flights.slice(0, 3).map((flight, index) => {
    const price = flight.price?.total || 'N/A';
    const currency = flight.price?.currency || '';
    const segments = flight.itineraries?.[0]?.segments || [];
    const firstSegment = segments[0];
    const lastSegment = segments[segments.length - 1];
    
    // Format departure time
    const departureTime = new Date(firstSegment?.departure?.at);
    const arrivalTime = new Date(lastSegment?.arrival?.at);
    
    const formatTime = (date: Date) => {
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true 
      });
    };
    
    const formatDate = (date: Date) => {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    };
    
    const stops = segments.length - 1;
    const stopsText = stops === 0 ? 'Nonstop' : `${stops} stop${stops > 1 ? 's' : ''}`;
    
    return `✈️ **Flight Option ${index + 1}**
🏢 **Airline:** ${firstSegment?.carrierCode || 'N/A'}
🛫 **Depart:** ${formatDate(departureTime)} at ${formatTime(departureTime)} from ${firstSegment?.departure?.iataCode}
🛬 **Arrive:** ${formatDate(arrivalTime)} at ${formatTime(arrivalTime)} in ${lastSegment?.arrival?.iataCode}
💲 **Price:** ${price} ${currency}
🔁 **Stops:** ${stopsText}`;
  }).join('\n\n');
  
  return `Here are the best flight options I found:\n\n${formattedFlights}\n\nWould you like to book one of these flights or would you like me to check for hotels and other travel arrangements too?`;
}

const TRAVEL_AGENT_SYSTEM_PROMPT = `You are Maya, a friendly AI Travel Agent who helps travelers book flights naturally and conversationally.

🎯 **Your Core Mission:**
Parse natural user input and extract flight booking information without showing errors. Users speak naturally like "I want to go from Houston to Paris on Nov 10 and return Nov 25" and you extract:

- origin_city → convert to IATA code (Houston → IAH) 
- destination_city → IATA code (Paris → CDG)
- departure_date → ISO format (Nov 10 → 2025-11-10)
- return_date (if mentioned)
- number_of_travelers (default = 1)

🧠 **Smart Parsing Rules:**
- Always respond with flight options, even if input is incomplete
- Use flexible searches (±2 days) automatically
- If city is unclear, ask "Did you mean ___?"
- If no flights found, suggest: "Let me try alternate dates or nearby airports"

✅ **Accepted Input Examples:**
- "I want to fly from Houston to Barcelona on Nov 10 and return on Nov 25"
- "Show me flights from New York to London next week"  
- "Tickets from Miami to Paris for 3 people in October"
- "Flight to Rome in November"

🚫 **Never Show Errors:** Instead of "no flights found," say:
- "I didn't find flights for that exact date, but here are close options"
- "Let's try alternate dates or nearby airports"

📋 **Flight Display Format (ALWAYS use this structure):**
✈️ **Airline:** [Airline Name]
🛫 **Depart:** [Date] at [Time] from [Airport Code]
🛬 **Arrive:** [Date] at [Time] in [Airport Code]  
💲 **Price:** $[Amount]
🔁 **Stops:** [Nonstop/1 stop/etc]

🎯 **Always End With Call-to-Action:**
- "Would you like to book this flight or see more options?"
- "Should I look for hotels or a return flight too?"
- "Would you like me to check visa requirements for this destination?"

💬 **Your Personality:**
- Warm, conversational, and helpful
- Ask ONE question at a time
- Show genuine excitement about their travel plans
- Use emojis to make responses visual and engaging
- Always offer next steps

🔧 **When You Have Enough Info:**
Use the search_flights function with the parsed information to get real flight data.`;

const FLIGHT_SEARCH_FUNCTION = {
  name: "search_flights",
  description: "Search for real flights using live flight data with flexible date options",
  parameters: {
    type: "object",
    properties: {
      origin: {
        type: "string",
        description: "Origin airport code (3-letter IATA code like LAX, JFK) or city name that will be converted"
      },
      destination: {
        type: "string", 
        description: "Destination airport code (3-letter IATA code) or city name that will be converted"
      },
      departureDate: {
        type: "string",
        description: "Departure date in YYYY-MM-DD format"
      },
      returnDate: {
        type: "string",
        description: "Return date in YYYY-MM-DD format (optional for one-way trips)"
      },
      adults: {
        type: "number",
        description: "Number of adult travelers (default: 1)"
      }
    },
    required: ["origin", "destination", "departureDate", "adults"]
  }
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('AI Travel Agent function called');
    
    if (!openAIApiKey) {
      console.error('OpenAI API key not found');
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!amadeusApiKey || !amadeusApiSecret) {
      console.error('Amadeus API credentials not found');
      return new Response(
        JSON.stringify({ error: 'Amadeus API credentials not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { message, conversationId, userId } = await req.json();
    console.log('Request received:', { message: message?.substring(0, 50) + '...', conversationId, userId });

    if (!message || !userId) {
      console.error('Missing required fields:', { message: !!message, userId: !!userId });
      return new Response(
        JSON.stringify({ error: 'Message and userId are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get or create conversation
    let currentConversationId = conversationId;
    if (!currentConversationId) {
      const isDevelopmentUser = userId === '00000000-0000-0000-0000-000000000000';
      console.log('Creating new conversation for user:', userId, 'isDevelopmentUser:', isDevelopmentUser);
      
      const { data: newConversation, error: conversationError } = await supabase
        .from('chat_conversations')
        .insert({ 
          user_id: isDevelopmentUser ? null : userId,
          title: message.substring(0, 50) + (message.length > 50 ? '...' : '')
        })
        .select()
        .single();

      if (conversationError) {
        console.error('Error creating conversation:', conversationError);
        return new Response(
          JSON.stringify({ error: 'Failed to create conversation', details: conversationError.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      currentConversationId = newConversation.id;
      console.log('Created new conversation:', currentConversationId);
    }

    // Store user message
    console.log('Storing user message in conversation:', currentConversationId);
    const { error: messageError } = await supabase
      .from('chat_messages')
      .insert({
        conversation_id: currentConversationId,
        role: 'user',
        content: message
      });

    if (messageError) {
      console.error('Error storing user message:', messageError);
    }

    // Get conversation history for context
    const { data: messages } = await supabase
      .from('chat_messages')
      .select('role, content')
      .eq('conversation_id', currentConversationId)
      .order('created_at', { ascending: true })
      .limit(20);

    console.log('Retrieved conversation history:', messages?.length || 0, 'messages');

    // Build OpenAI messages array
    const openAIMessages = [
      { role: 'system', content: TRAVEL_AGENT_SYSTEM_PROMPT },
      ...(messages || []).map(msg => ({ role: msg.role, content: msg.content }))
    ];

    console.log('Calling OpenAI API with function calling support');

    // Get AI response from OpenAI with function calling
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: openAIMessages,
        temperature: 0.7,
        max_tokens: 1000,
        functions: [FLIGHT_SEARCH_FUNCTION],
        function_call: "auto"
      }),
    });

    console.log('OpenAI API response status:', response.status);

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', {
        status: response.status,
        statusText: response.statusText,
        errorData: errorData
      });
      
      let errorMessage = 'Failed to get AI response';
      if (response.status === 401) {
        errorMessage = 'Invalid OpenAI API key';
      } else if (response.status === 429) {
        errorMessage = 'OpenAI API rate limit exceeded or quota reached';
      } else if (response.status === 400) {
        errorMessage = 'Invalid request to OpenAI API';
      }
      
      return new Response(
        JSON.stringify({ 
          error: errorMessage,
          details: `Status: ${response.status}, Error: ${errorData}`
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log('OpenAI API response received successfully');
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Invalid OpenAI response format:', data);
      return new Response(
        JSON.stringify({ error: 'Invalid response from OpenAI API' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let aiResponse = data.choices[0].message.content;
    const functionCall = data.choices[0].message.function_call;

    // Handle function calling for flight search
    if (functionCall && functionCall.name === 'search_flights') {
      console.log('Function call detected for flight search');
      try {
        const functionArgs = JSON.parse(functionCall.arguments);
        console.log('Flight search parameters:', functionArgs);
        
        // Convert city names to IATA codes
        const originIATA = getCityIATA(functionArgs.origin);
        const destinationIATA = getCityIATA(functionArgs.destination);
        
        console.log('Converted codes:', { origin: originIATA, destination: destinationIATA });
        
        const flights = await searchFlights(
          originIATA,
          destinationIATA,
          functionArgs.departureDate,
          functionArgs.returnDate,
          functionArgs.adults || 1
        );
        
        const flightResults = formatFlightResults(flights, functionArgs.origin, functionArgs.destination);
        console.log('Flight search completed, results formatted');
        
        // Get AI's response to the flight results
        const followUpResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openAIApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-4o',
            messages: [
              { role: 'system', content: TRAVEL_AGENT_SYSTEM_PROMPT },
              ...openAIMessages.slice(1),
              { role: 'assistant', content: null, function_call: functionCall },
              { role: 'function', name: 'search_flights', content: flightResults }
            ],
            temperature: 0.7,
            max_tokens: 1000,
          }),
        });
        
        if (followUpResponse.ok) {
          const followUpData = await followUpResponse.json();
          aiResponse = followUpData.choices[0].message.content;
        } else {
          aiResponse = flightResults;
        }
        
      } catch (error) {
        console.error('Error in flight search function:', error);
        aiResponse = "I encountered an issue searching for flights. Let me try to help you in another way. Could you tell me more about your travel plans?";
      }
    }

    console.log('AI response generated, length:', aiResponse?.length || 0);

    // Store AI response
    const { error: aiMessageError } = await supabase
      .from('chat_messages')
      .insert({
        conversation_id: currentConversationId,
        role: 'assistant',
        content: aiResponse
      });

    if (aiMessageError) {
      console.error('Error storing AI message:', aiMessageError);
    }

    console.log('Function completed successfully');
    return new Response(JSON.stringify({ 
      response: aiResponse, 
      conversationId: currentConversationId 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-travel-agent function:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
