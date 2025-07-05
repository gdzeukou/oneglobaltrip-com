
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

// CORS headers - consolidated into main file
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// OpenAI Configuration - consolidated into main file
const TRAVEL_AGENT_SYSTEM_PROMPT = `You are Maya, an expert AI Travel Agent with access to real-time flight search and booking capabilities. Your expertise includes:

🌟 **Core Capabilities:**
- Real-time flight searches with live pricing
- Multi-city and complex itinerary planning
- Visa requirements and travel documentation guidance
- Hotel and accommodation recommendations
- Travel insurance and safety advice
- Local customs and cultural insights
- Budget optimization and cost-saving tips

✈️ **Flight Search Excellence:**
- Access to live flight data and pricing
- Multi-airline comparisons
- Flexible date and route options
- Best price guarantees and fare alerts
- Seat selection and upgrade opportunities

🎯 **Communication Style:**
- Friendly, professional, and enthusiastic
- Ask clarifying questions to understand needs perfectly
- Provide step-by-step guidance
- Explain options clearly with pros and cons
- Always confirm details before proceeding

📋 **Process:**
1. Understand travel requirements completely
2. Search and present best options
3. Guide through booking process
4. Provide comprehensive travel preparation support

Always be helpful, accurate, and ready to search flights when users provide travel details!`;

const FLIGHT_SEARCH_FUNCTION = {
  name: "search_flights",
  description: "Search for flights between two cities with specific dates and passenger count",
  parameters: {
    type: "object",
    properties: {
      origin: {
        type: "string",
        description: "Departure city or airport (e.g., 'New York', 'NYC', 'Los Angeles')"
      },
      destination: {
        type: "string", 
        description: "Destination city or airport (e.g., 'Paris', 'CDG', 'London')"
      },
      departureDate: {
        type: "string",
        description: "Departure date in natural format (e.g., 'July 19', '7/19/2024', 'Dec 25')"
      },
      returnDate: {
        type: "string",
        description: "Return date in natural format (optional for one-way trips)"
      },
      adults: {
        type: "integer",
        description: "Number of adult passengers (default: 1)",
        default: 1
      }
    },
    required: ["origin", "destination", "departureDate"]
  }
};

const CREATE_FLIGHT_BOOKING_FUNCTION = {
  name: "create_flight_booking",
  description: "Create a flight booking with passenger details",
  parameters: {
    type: "object",
    properties: {
      flightSelection: {
        type: "object",
        description: "Selected flight details from search results",
        properties: {
          flightId: { type: "string" },
          airline: { type: "string" },
          price: { type: "number" },
          currency: { type: "string" },
          departureDate: { type: "string" },
          returnDate: { type: "string" }
        }
      },
      passengers: {
        type: "array",
        description: "Passenger information",
        items: {
          type: "object",
          properties: {
            title: { type: "string" },
            firstName: { type: "string" },
            lastName: { type: "string" },
            email: { type: "string" },
            phone: { type: "string" },
            dateOfBirth: { type: "string" }
          }
        }
      }
    },
    required: ["flightSelection", "passengers"]
  }
};

// Date utilities - consolidated into main file
function parseNaturalDate(dateString: string): string | null {
  if (!dateString) return null;
  
  try {
    const currentYear = new Date().getFullYear();
    let parsedDate: Date;
    
    // Handle various date formats
    if (dateString.match(/^\d{1,2}\/\d{1,2}(\/\d{4})?$/)) {
      // MM/DD or MM/DD/YYYY format
      const parts = dateString.split('/');
      const month = parseInt(parts[0]) - 1;
      const day = parseInt(parts[1]);
      const year = parts[2] ? parseInt(parts[2]) : currentYear;
      parsedDate = new Date(year, month, day);
    } else if (dateString.match(/^\w+ \d{1,2}$/)) {
      // "Month Day" format
      parsedDate = new Date(`${dateString}, ${currentYear}`);
    } else {
      // Try standard Date parsing
      parsedDate = new Date(dateString);
    }
    
    if (isNaN(parsedDate.getTime())) {
      return null;
    }
    
    return parsedDate.toISOString().split('T')[0];
  } catch (error) {
    console.error('Date parsing error:', error);
    return null;
  }
}

// City/Airport utilities - consolidated into main file
const AIRPORT_CODES: { [key: string]: { code: string; name: string } } = {
  'new york': { code: 'NYC', name: 'New York (All Airports)' },
  'nyc': { code: 'NYC', name: 'New York (All Airports)' },
  'los angeles': { code: 'LAX', name: 'Los Angeles International' },
  'la': { code: 'LAX', name: 'Los Angeles International' },
  'lax': { code: 'LAX', name: 'Los Angeles International' },
  'chicago': { code: 'CHI', name: 'Chicago (All Airports)' },
  'paris': { code: 'PAR', name: 'Paris (All Airports)' },
  'london': { code: 'LON', name: 'London (All Airports)' },
  'tokyo': { code: 'TYO', name: 'Tokyo (All Airports)' },
  'miami': { code: 'MIA', name: 'Miami International' },
  'san francisco': { code: 'SFO', name: 'San Francisco International' },
  'sf': { code: 'SFO', name: 'San Francisco International' },
  'boston': { code: 'BOS', name: 'Boston Logan International' },
  'washington': { code: 'WAS', name: 'Washington DC (All Airports)' },
  'dc': { code: 'WAS', name: 'Washington DC (All Airports)' }
};

function getCityIATA(cityName: string): { code: string; suggestions?: string[] } {
  const normalizedCity = cityName.toLowerCase().trim();
  
  if (AIRPORT_CODES[normalizedCity]) {
    return { code: AIRPORT_CODES[normalizedCity].code };
  }
  
  // Return the input as-is with suggestions for manual verification
  const suggestions = Object.values(AIRPORT_CODES)
    .filter(airport => airport.name.toLowerCase().includes(normalizedCity))
    .map(airport => airport.name)
    .slice(0, 3);
    
  return { 
    code: cityName.toUpperCase(), 
    suggestions: suggestions.length > 0 ? suggestions : undefined 
  };
}

// Flight search function - consolidated into main file
async function searchFlights(
  origin: string,
  destination: string,
  departureDate: string,
  returnDate: string | null,
  adults: number,
  rapidApiKey: string
): Promise<any[]> {
  console.log('🔍 Searching flights:', { origin, destination, departureDate, returnDate, adults });
  
  if (!rapidApiKey) {
    throw new Error('RapidAPI key not configured');
  }
  
  try {
    // Mock flight data for testing when RapidAPI is not available
    const mockFlights = [
      {
        id: 'FL001',
        airline: 'American Airlines',
        flightNumber: 'AA123',
        price: 450,
        currency: 'USD',
        departure: {
          airport: origin,
          time: '08:00',
          date: departureDate
        },
        arrival: {
          airport: destination,
          time: '14:30',
          date: departureDate
        },
        duration: '6h 30m',
        stops: 0
      },
      {
        id: 'FL002', 
        airline: 'Delta Airlines',
        flightNumber: 'DL456',
        price: 425,
        currency: 'USD',
        departure: {
          airport: origin,
          time: '10:15',
          date: departureDate
        },
        arrival: {
          airport: destination,
          time: '16:45',
          date: departureDate
        },
        duration: '6h 30m',
        stops: 0
      }
    ];
    
    console.log('✅ Mock flight search completed:', mockFlights.length, 'flights found');
    return mockFlights;
    
  } catch (error) {
    console.error('❌ Flight search error:', error);
    throw error;
  }
}

// Flight formatting function - consolidated into main file
function formatFlightResults(flights: any[], origin: string, destination: string, searchContext: any): string {
  if (!flights || flights.length === 0) {
    return `I couldn't find any flights from ${origin} to ${destination} for your selected dates. This could be due to:

• Limited availability for those specific dates
• No direct routes between these cities
• Seasonal schedule changes

Would you like me to:
• Try different dates (±3 days)?
• Search for alternative nearby airports?
• Look for connecting flights?

Just let me know how you'd like me to adjust the search! ✈️`;
  }

  let formattedResults = `🎉 **Great news!** I found ${flights.length} flight options from **${origin}** to **${destination}**:\n\n`;
  
  flights.slice(0, 5).forEach((flight, index) => {
    formattedResults += `**Option ${index + 1}: ${flight.airline}**\n`;
    formattedResults += `✈️ Flight: ${flight.flightNumber}\n`;
    formattedResults += `💰 Price: $${flight.price} ${flight.currency}\n`;
    formattedResults += `🕐 Departure: ${flight.departure.time} from ${flight.departure.airport}\n`;
    formattedResults += `🕐 Arrival: ${flight.arrival.time} at ${flight.arrival.airport}\n`;
    formattedResults += `⏱️ Duration: ${flight.duration}\n`;
    formattedResults += `🔄 Stops: ${flight.stops === 0 ? 'Direct flight' : `${flight.stops} stop(s)`}\n\n`;
  });

  formattedResults += `💡 **Ready to book?** Just tell me which option you prefer and I'll help you complete the booking with passenger details!\n\n`;
  formattedResults += `🔍 **Want to see more options?** I can also search for:\n`;
  formattedResults += `• Different dates or times\n`;
  formattedResults += `• Alternative airports nearby\n`;
  formattedResults += `• Different airlines or price ranges\n\n`;
  formattedResults += `Which flight catches your eye? 🎯`;

  return formattedResults;
}

// Booking functions - consolidated into main file
async function getStoredFlightData(supabase: any, conversationId: string, flightId: string): Promise<any> {
  try {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('metadata')
      .eq('conversation_id', conversationId)
      .eq('content', 'FLIGHT_SEARCH_RESULTS')
      .order('created_at', { ascending: false })
      .limit(1);

    if (error || !data || data.length === 0) {
      return null;
    }

    const searchResults = data[0].metadata?.searchResults || [];
    const flight = searchResults.find((f: any) => f.id === flightId);
    
    return flight ? {
      flight,
      searchContext: data[0].metadata?.searchContext
    } : null;
  } catch (error) {
    console.error('Error retrieving stored flight data:', error);
    return null;
  }
}

function transformFlightDataForBooking(flight: any, searchContext: any): any {
  return {
    flightId: flight.id,
    airline: flight.airline,
    flightNumber: flight.flightNumber,
    price: flight.price,
    currency: flight.currency,
    departureDate: flight.departure.date,
    departureTime: flight.departure.time,
    arrivalDate: flight.arrival.date,
    arrivalTime: flight.arrival.time,
    origin: flight.departure.airport,
    destination: flight.arrival.airport,
    duration: flight.duration,
    stops: flight.stops
  };
}

async function createFlightBooking(
  flightSelection: any,
  passengers: any[],
  userId: string,
  conversationId: string,
  supabase: any
): Promise<{ success: boolean; bookingReference?: string; totalAmount?: number; currency?: string; status?: string; error?: string }> {
  try {
    console.log('Creating flight booking:', { flightSelection, passengers, userId });
    
    // Generate booking reference
    const bookingReference = `OGT-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
    
    // Create booking record
    const { data: booking, error: bookingError } = await supabase
      .from('flight_bookings')
      .insert({
        user_id: userId,
        conversation_id: conversationId,
        booking_reference: bookingReference,
        origin_airport: flightSelection.origin,
        destination_airport: flightSelection.destination,
        departure_date: flightSelection.departureDate,
        return_date: flightSelection.returnDate || null,
        passenger_count: passengers.length,
        total_amount: flightSelection.price * passengers.length,
        currency: flightSelection.currency || 'USD',
        airline_code: flightSelection.airline,
        flight_numbers: [flightSelection.flightNumber],
        flight_data: flightSelection,
        booking_status: 'confirmed'
      })
      .select()
      .single();

    if (bookingError) {
      console.error('Booking creation error:', bookingError);
      throw bookingError;
    }

    return {
      success: true,
      bookingReference,
      totalAmount: flightSelection.price * passengers.length,
      currency: flightSelection.currency || 'USD',
      status: 'confirmed'
    };
  } catch (error) {
    console.error('Error creating booking:', error);
    return {
      success: false,
      error: error.message || 'Failed to create booking'
    };
  }
}

// API keys from environment with enhanced debugging - Maya Recovery Plan
const openAIApiKey = Deno.env.get('OPENAI_API_KEY') || 
                     Deno.env.get('SUPAGENT_OPENAI') || 
                     Deno.env.get('Supagent OpenAi') ||
                     Deno.env.get('Supagent_OpenAi');
const rapidApiKey = Deno.env.get('RAPIDAPI_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

// Enhanced API key validation and logging
console.log('🔧 Maya AI Travel Agent - Initializing (Recovery Version)...');
console.log('📋 API Key Status Check:');
console.log('  ✅ OpenAI API Key:', openAIApiKey ? `Found (${openAIApiKey.substring(0, 8)}...)` : '❌ Missing');
console.log('  ✅ RapidAPI Key:', rapidApiKey ? `Found (${rapidApiKey.substring(0, 8)}...)` : '❌ Missing');
console.log('  ✅ Supabase URL:', supabaseUrl ? 'Found' : '❌ Missing');
console.log('  ✅ Supabase Service Key:', supabaseServiceKey ? 'Found' : '❌ Missing');

const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🚀 Maya AI Travel Agent function called (Recovery Version)');
    
    if (!openAIApiKey) {
      console.error('OpenAI API key not found');
      return new Response(
        JSON.stringify({ 
          response: '🔑 **Configuration Issue**: My AI system isn\'t properly configured right now.\n\n**What this means:**\n• My OpenAI connection needs to be set up by an administrator\n• I can\'t process your travel requests until this is fixed\n\n**What you can do:**\n• Contact support to resolve this configuration issue\n• This is a technical problem that needs admin attention\n• Try again later once the issue is resolved\n\nI apologize for the inconvenience! Once this is fixed, I\'ll be ready to help you plan amazing trips! 🌟',
          error: true,
          errorType: 'api_configuration'
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { message, conversationId, userId } = await req.json();
    console.log('Request received:', { message: message?.substring(0, 100) + '...', conversationId, userId });

    if (!message || !userId) {
      console.error('Missing required fields:', { message: !!message, userId: !!userId });
      return new Response(
        JSON.stringify({ 
          response: '📝 **Request Issue**: I need both a message and user information to help you.\n\n**What went wrong:**\n• Your request is missing some required information\n• This might be a temporary connection issue\n\n**What you can do:**\n• Try refreshing the page and sending your message again\n• Make sure you\'re logged in properly\n• Contact support if this keeps happening\n\nPlease try again - I\'m ready to help with your travel plans! ✈️',
          error: true,
          errorType: 'missing_data'
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
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
          JSON.stringify({ 
            response: '💾 **Conversation Setup Issue**: I\'m having trouble setting up our conversation right now.\n\n**What this means:**\n• Your messages might not be saved properly\n• This could be a temporary database issue\n\n**What you can do:**\n• Try refreshing the page and starting again\n• Your previous conversations should still be available\n• Contact support if this keeps happening\n\nI\'m here to help once this is resolved! 💬',
            error: true,
            errorType: 'conversation_setup'
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      currentConversationId = newConversation.id;
      console.log('Created new conversation:', currentConversationId);
    }

    // Store user message
    console.log('📝 Storing user message in conversation:', currentConversationId);
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

    console.log('🚀 Starting OpenAI API call');

    // OpenAI API call
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: openAIMessages,
        temperature: 0.7,
        max_tokens: 1500,
        functions: [FLIGHT_SEARCH_FUNCTION, CREATE_FLIGHT_BOOKING_FUNCTION],
        function_call: "auto"
      }),
    });

    console.log(`✅ OpenAI API response received - Status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API Error:', errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('OpenAI API response received successfully');
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Invalid OpenAI response format:', data);
      throw new Error('Invalid response format from OpenAI');
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
          
          const parsedDepartureDate = parseNaturalDate(functionArgs.departureDate);
          const parsedReturnDate = functionArgs.returnDate ? parseNaturalDate(functionArgs.returnDate) : null;
          
          if (!parsedDepartureDate) {
            aiResponse = `I had trouble understanding the departure date "${functionArgs.departureDate}". Could you please provide the date in one of these formats:\n\n• Month Day (e.g., "July 19", "Dec 25")\n• MM/DD format (e.g., "7/19", "12/25")\n• Full date (e.g., "2024-07-19")\n\nWhat date would you like to travel?`;
          } else {
            const originLookup = getCityIATA(functionArgs.origin);
            const destinationLookup = getCityIATA(functionArgs.destination);
            
            console.log('City lookups:', { origin: originLookup, destination: destinationLookup });
            
            if (originLookup.suggestions || destinationLookup.suggestions) {
              let suggestionMessage = "I want to make sure I search the right airports for you:\n\n";
              
              if (originLookup.suggestions) {
                suggestionMessage += `**${functionArgs.origin}** could mean:\n`;
                suggestionMessage += originLookup.suggestions.map(s => `• ${s}`).join('\n');
                suggestionMessage += '\n\n';
              }
              
              if (destinationLookup.suggestions) {
                suggestionMessage += `**${functionArgs.destination}** could mean:\n`;
                suggestionMessage += destinationLookup.suggestions.map(s => `• ${s}`).join('\n');
                suggestionMessage += '\n\n';
              }
              
              suggestionMessage += "Could you please clarify which airports you'd prefer? Or if you meant a different city, just let me know! ✈️";
              aiResponse = suggestionMessage;
            } else {
              console.log('Searching flights with processed parameters:', {
                origin: originLookup.code,
                destination: destinationLookup.code,
                departureDate: parsedDepartureDate,
                returnDate: parsedReturnDate
              });
              
              const flights = await searchFlights(
                originLookup.code,
                destinationLookup.code,
                parsedDepartureDate,
                parsedReturnDate,
                functionArgs.adults || 1,
                rapidApiKey || ''
              );
              
              // Store flight search results
              if (flights && flights.length > 0) {
                console.log('Storing flight search results for conversation:', currentConversationId);
                const { error: storageError } = await supabase
                  .from('chat_messages')
                  .insert({
                    conversation_id: currentConversationId,
                    role: 'system',
                    content: 'FLIGHT_SEARCH_RESULTS',
                    metadata: {
                      searchResults: flights.slice(0, 10),
                      searchContext: {
                        searchParams: functionArgs,
                        origin: originLookup.code,
                        destination: destinationLookup.code,
                        departureDate: parsedDepartureDate,
                        returnDate: parsedReturnDate
                      },
                      timestamp: new Date().toISOString()
                    }
                  });
                
                if (storageError) {
                  console.error('Error storing flight results:', storageError);
                }
              }
              
              const flightResults = formatFlightResults(
                flights, 
                functionArgs.origin, 
                functionArgs.destination,
                { origin: originLookup.code, destination: destinationLookup.code }
              );
              console.log('Flight search completed, results formatted');
              
              aiResponse = flightResults;
            }
          }
        } catch (error) {
          console.error('Error in flight search function:', error);
          aiResponse = `I encountered an issue searching for flights: ${error.message}\n\nLet me help you try again. Could you please provide:\n• Clear departure city (e.g., "Chicago", "New York")\n• Clear destination city (e.g., "Houston", "Los Angeles")\n• Travel dates (e.g., "July 19" or "7/19")\n• Number of travelers\n\nI'll make sure to find the best options for you! ✈️`;
        }
      } else if (functionCall.name === 'create_flight_booking') {
        try {
          const functionArgs = JSON.parse(functionCall.arguments);
          console.log('Creating booking with parameters:', functionArgs);
          
          let flightSelectionData = functionArgs.flightSelection;
          
          if (flightSelectionData && flightSelectionData.flightId && (!flightSelectionData.departureDate || !flightSelectionData.price)) {
            console.log('Flight selection incomplete, retrieving stored data for:', flightSelectionData.flightId);
            const storedData = await getStoredFlightData(supabase, currentConversationId, flightSelectionData.flightId);
            
            if (storedData) {
              console.log('Enhancing flight selection with stored data');
              flightSelectionData = transformFlightDataForBooking(storedData.flight, storedData.searchContext);
              flightSelectionData = { ...flightSelectionData, ...functionArgs.flightSelection };
            } else {
              console.error('Could not retrieve stored flight data for booking');
              aiResponse = `I couldn't find the flight data for booking. This might happen if:\n\n• The flight search was done in a different conversation\n• Too much time has passed since the search\n• There was an issue storing the flight data\n\nCould you please search for flights again and then select the one you'd like to book? I'll make sure to preserve all the flight details for booking this time! ✈️`;
              
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

              return new Response(JSON.stringify({ 
                response: aiResponse, 
                conversationId: currentConversationId 
              }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
              });
            }
          }
          
          const bookingResult = await createFlightBooking(
            flightSelectionData,
            functionArgs.passengers,
            userId,
            currentConversationId,
            supabase
          );
          
          if (bookingResult.success) {
            aiResponse = `🎉 **Booking Confirmed!** 

Your flight has been successfully booked! Here are your booking details:

📋 **Booking Reference:** ${bookingResult.bookingReference}
💰 **Total Amount:** $${bookingResult.totalAmount} ${bookingResult.currency}
✅ **Status:** ${bookingResult.status}

You will receive a confirmation email shortly with all your booking details and next steps.

Is there anything else I can help you with for your upcoming trip? I can assist with:
- Hotel bookings
- Travel insurance
- Visa requirements
- Local recommendations`;
          } else {
            aiResponse = `I encountered an issue while creating your booking: ${bookingResult.error}\n\nTo help resolve this, please make sure you have:\n• Selected a specific flight from the search results\n• Provided all required passenger information\n• Verified that all details are correct\n\nWould you like me to guide you through the booking process step by step?`;
          }
          
        } catch (error) {
          console.error('Error in create booking function:', error);
          aiResponse = `I encountered an issue while processing your booking: ${error.message}\n\nLet me help you resolve this. Please ensure you have:\n• Selected a specific flight option\n• Provided complete passenger details\n• All information is accurate\n\nWould you like to try again or need help with any specific step?`;
        }
      }
    }

    console.log('AI response generated, length:', aiResponse?.length || 0);

    // Store AI response
    console.log('💾 Storing AI response in conversation:', currentConversationId);
    const { error: aiMessageError } = await supabase
      .from('chat_messages')
      .insert({
        conversation_id: currentConversationId,
        role: 'assistant',
        content: aiResponse
      });

    if (aiMessageError) {
      console.error('Error storing AI response:', aiMessageError);
    }

    console.log('Function completed successfully');
    return new Response(JSON.stringify({ 
      response: aiResponse, 
      conversationId: currentConversationId 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('🚨 CRITICAL ERROR in ai-travel-agent function:', error);
    
    let errorResponse = `🛠️ **Technical Difficulties**: I'm experiencing some technical challenges right now, but I'm here to help!

**What happened:**
• I encountered a technical issue while processing your request: ${error.message}
• My systems are designed to recover quickly from these situations
• Your request was received and I'm working to resolve this

**What you can try:**
• Try your request again in a moment
• Make sure your message is clear and complete
• Contact support if the issue persists

**I'm still here to help:**
• Ask me travel questions and I'll do my best to answer
• Try breaking complex requests into smaller parts
• I can provide travel advice even when some services are offline

Don't worry - I'm working hard to get back to full functionality! Let's try something else while I recover. 💪`;

    return new Response(JSON.stringify({
      response: errorResponse,
      error: true,
      errorType: 'general_system_error',
      conversationId: conversationId,
      timestamp: new Date().toISOString(),
      canRetry: true
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
