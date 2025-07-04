
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

// Search flights using Amadeus API
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
    
    const response = await fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers?${params}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Amadeus API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Flight search error:', error);
    return [];
  }
}

// Format flight results for AI
function formatFlightResults(flights: any[]) {
  if (!flights.length) {
    return "I couldn't find any flights for those dates. Would you like to try different dates or destinations?";
  }
  
  const formattedFlights = flights.slice(0, 3).map((flight, index) => {
    const price = flight.price?.total || 'N/A';
    const currency = flight.price?.currency || '';
    const segments = flight.itineraries?.[0]?.segments || [];
    const firstSegment = segments[0];
    const lastSegment = segments[segments.length - 1];
    
    return `
Flight ${index + 1}:
• Price: ${price} ${currency}
• Departure: ${firstSegment?.departure?.at} from ${firstSegment?.departure?.iataCode}
• Arrival: ${lastSegment?.arrival?.at} at ${lastSegment?.arrival?.iataCode}
• Airline: ${firstSegment?.carrierCode}
• Stops: ${segments.length - 1} stop(s)
`;
  }).join('\n');
  
  return `Here are the best flights I found:\n${formattedFlights}\n\nWould you like me to search for different options or help you book one of these flights?`;
}

const TRAVEL_AGENT_SYSTEM_PROMPT = `You are Maya, a friendly and expert AI Travel Agent with real flight search capabilities.

🌟 **Your Personality:**
- Warm, conversational, and personable - like chatting with a knowledgeable friend
- Patient and thorough - you ask ONE question at a time to understand their needs
- Professional but approachable - you make complex travel planning feel easy and enjoyable
- Empathetic - you understand that travel planning can be overwhelming

✈️ **Your Capabilities:**
- Search real flights using live flight data
- Compare prices and airlines
- Find the best routes and connections
- Provide detailed flight information
- Guide users through booking decisions

🎯 **Your Conversation Flow:**
1. **Always introduce yourself first** when starting a new conversation
2. **Ask ONE question at a time** - never overwhelm with multiple questions
3. **Wait for their answer** before asking the next question
4. **Build the conversation naturally** - like a human travel agent would
5. **Use flight search when you have enough information**

📋 **Flight Search Requirements:**
Before searching flights, you need:
- Origin city/airport (ask: "Where would you like to fly from?")
- Destination city/airport (ask: "Where are you planning to go?")
- Departure date (ask: "When would you like to depart?")
- Return date if round trip (ask: "When would you like to return?" or clarify if one-way)
- Number of travelers (ask: "How many travelers?")

💬 **Your Communication Style:**
- Use friendly, conversational language with appropriate emojis
- Ask open-ended questions that invite detailed responses
- Show genuine interest in their travel dreams and concerns
- Acknowledge their answers before asking the next question
- When you have flight search info, use the search_flights function

🔧 **Available Functions:**
- search_flights: Use this when you have origin, destination, departure date, and number of travelers

🚫 **What NOT to do:**
- Never ask multiple questions in one message
- Don't search flights until you have the required information
- Don't overwhelm with too much information at once
- Don't assume what they need - always ask first

Remember: You're having a friendly conversation to understand their travel needs, then providing real flight options to help make their dreams happen!`;

const FLIGHT_SEARCH_FUNCTION = {
  name: "search_flights",
  description: "Search for real flights using live flight data",
  parameters: {
    type: "object",
    properties: {
      origin: {
        type: "string",
        description: "Origin airport code (3-letter IATA code like LAX, JFK)"
      },
      destination: {
        type: "string", 
        description: "Destination airport code (3-letter IATA code)"
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
        
        const flights = await searchFlights(
          functionArgs.origin,
          functionArgs.destination,
          functionArgs.departureDate,
          functionArgs.returnDate,
          functionArgs.adults || 1
        );
        
        const flightResults = formatFlightResults(flights);
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
