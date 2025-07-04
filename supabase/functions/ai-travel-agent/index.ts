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

const TRAVEL_AGENT_SYSTEM_PROMPT = `You are Maya, a friendly AI Travel Agent who helps travelers find AND book flights with complete end-to-end service.

🎯 **Your Core Mission:**
1. **Search Flights** - Find the best flight options using real-time data
2. **Collect Passenger Information** - Gather all required details for booking
3. **Process Bookings** - Create actual flight reservations with booking references
4. **Provide Support** - Guide users through the entire booking process

🧠 **Booking Process Flow:**
1. **Flight Search** - Use search_flights function to find options
2. **Flight Selection** - Help user choose their preferred flight
3. **Passenger Collection** - Collect passenger details step by step
4. **Booking Creation** - Create the actual booking with collected information
5. **Payment Processing** - Guide through secure payment (coming soon)

📋 **When Collecting Passenger Information:**
For EACH passenger, you need:
- Full name (as on passport)
- Date of birth
- Nationality
- Email address
- Phone number
- Passport number (for international flights)
- Passport expiry date (for international flights)
- Meal preferences (optional)
- Special requests (optional)

🚀 **Booking Confirmation Process:**
After collecting passenger info, use create_flight_booking function to:
- Create booking record in database
- Generate booking reference
- Store passenger details
- Provide booking confirmation

💬 **Your Personality:**
- Warm, professional, and efficient
- Always explain what information you need and why
- Make the booking process feel secure and trustworthy
- Celebrate successful bookings with enthusiasm
- Handle errors gracefully with alternative solutions

🔧 **Key Functions Available:**
- search_flights: Find real flights with live pricing
- create_flight_booking: Create actual bookings with passenger data

Always guide users step-by-step and make them feel confident about their booking process.`;

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

const CREATE_FLIGHT_BOOKING_FUNCTION = {
  name: "create_flight_booking",
  description: "Create a flight booking with passenger information and flight details",
  parameters: {
    type: "object",
    properties: {
      flightData: {
        type: "object",
        description: "Complete flight information from search results"
      },
      passengers: {
        type: "array",
        description: "Array of passenger information",
        items: {
          type: "object",
          properties: {
            title: { type: "string", description: "Mr, Mrs, Ms, etc." },
            firstName: { type: "string", description: "First name as on passport" },
            lastName: { type: "string", description: "Last name as on passport" },
            dateOfBirth: { type: "string", description: "Date of birth in YYYY-MM-DD format" },
            nationality: { type: "string", description: "Passenger nationality" },
            email: { type: "string", description: "Email address" },
            phone: { type: "string", description: "Phone number" },
            passportNumber: { type: "string", description: "Passport number (optional)" },
            passportExpiry: { type: "string", description: "Passport expiry in YYYY-MM-DD format (optional)" },
            mealPreference: { type: "string", description: "Meal preference (optional)" },
            seatPreference: { type: "string", description: "Seat preference (optional)" },
            specialRequests: { type: "string", description: "Special requests (optional)" }
          },
          required: ["title", "firstName", "lastName", "dateOfBirth", "nationality", "email", "phone"]
        }
      },
      totalAmount: {
        type: "number",
        description: "Total booking amount"
      },
      currency: {
        type: "string",
        description: "Currency code (e.g., USD, EUR)"
      }
    },
    required: ["flightData", "passengers", "totalAmount", "currency"]
  }
};

// Create flight booking function
async function createFlightBooking(flightData: any, passengers: any[], totalAmount: number, currency: string, userId: string, conversationId: string) {
  try {
    console.log('Creating flight booking for user:', userId);
    
    // Create the main booking record
    const { data: booking, error: bookingError } = await supabase
      .from('flight_bookings')
      .insert({
        user_id: userId,
        conversation_id: conversationId,
        total_amount: totalAmount,
        currency: currency,
        flight_data: flightData,
        departure_date: flightData.departureDate,
        return_date: flightData.returnDate || null,
        origin_airport: flightData.origin,
        destination_airport: flightData.destination,
        airline_code: flightData.airlineCode || null,
        flight_numbers: flightData.flightNumbers || null,
        passenger_count: passengers.length,
        booking_status: 'confirmed' // For now, we'll mark as confirmed (payment integration comes later)
      })
      .select()
      .single();

    if (bookingError) {
      console.error('Error creating booking:', bookingError);
      throw new Error('Failed to create booking');
    }

    console.log('Booking created:', booking.id);

    // Create passenger records
    const passengerInserts = passengers.map(passenger => ({
      booking_id: booking.id,
      title: passenger.title,
      first_name: passenger.firstName,
      last_name: passenger.lastName,
      date_of_birth: passenger.dateOfBirth,
      nationality: passenger.nationality,
      email: passenger.email,
      phone: passenger.phone,
      passport_number: passenger.passportNumber || null,
      passport_expiry: passenger.passportExpiry || null,
      meal_preference: passenger.mealPreference || null,
      seat_preference: passenger.seatPreference || null,
      special_requests: passenger.specialRequests || null,
      passenger_type: 'adult' // Default for now
    }));

    const { error: passengersError } = await supabase
      .from('booking_passengers')
      .insert(passengerInserts);

    if (passengersError) {
      console.error('Error creating passengers:', passengersError);
      // Rollback booking if passengers fail
      await supabase.from('flight_bookings').delete().eq('id', booking.id);
      throw new Error('Failed to create passenger records');
    }

    console.log('Passengers created successfully');

    return {
      success: true,
      bookingReference: booking.booking_reference,
      bookingId: booking.id,
      status: booking.booking_status,
      totalAmount: booking.total_amount,
      currency: booking.currency
    };

  } catch (error) {
    console.error('Error in createFlightBooking:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

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
        functions: [FLIGHT_SEARCH_FUNCTION, CREATE_FLIGHT_BOOKING_FUNCTION],
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

    // Handle function calling
    if (functionCall) {
      console.log('Function call detected:', functionCall.name);
      
      if (functionCall.name === 'search_flights') {
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
              functions: [FLIGHT_SEARCH_FUNCTION, CREATE_FLIGHT_BOOKING_FUNCTION],
              function_call: "auto"
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
      } else if (functionCall.name === 'create_flight_booking') {
        try {
          const functionArgs = JSON.parse(functionCall.arguments);
          console.log('Creating booking with parameters:', functionArgs);
          
          const bookingResult = await createFlightBooking(
            functionArgs.flightData,
            functionArgs.passengers,
            functionArgs.totalAmount,
            functionArgs.currency,
            userId,
            currentConversationId
          );
          
          if (bookingResult.success) {
            aiResponse = `🎉 **Booking Confirmed!** 

Your flight has been successfully booked! Here are your booking details:

📋 **Booking Reference:** ${bookingResult.bookingReference}
💰 **Total Amount:** ${bookingResult.totalAmount} ${bookingResult.currency}
✅ **Status:** ${bookingResult.status}

You will receive a confirmation email shortly with all your booking details and next steps.

Is there anything else I can help you with for your upcoming trip? I can assist with:
- Hotel bookings
- Travel insurance
- Visa requirements
- Local recommendations`;
          } else {
            aiResponse = `I encountered an issue while creating your booking: ${bookingResult.error}. Let me try to help you resolve this or find an alternative solution.`;
          }
          
        } catch (error) {
          console.error('Error in create booking function:', error);
          aiResponse = "I encountered an issue while processing your booking. Let me help you try again or find an alternative solution.";
        }
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
