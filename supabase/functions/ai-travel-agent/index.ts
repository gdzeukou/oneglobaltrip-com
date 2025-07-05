import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

// Import refactored modules
import { corsHeaders } from './lib/constants.ts';
import { parseNaturalDate } from './lib/date-utils.ts';
import { getCityIATA } from './lib/city-utils.ts';
import { searchFlights, searchHotels } from './lib/rapidapi-client.ts';
import { formatFlightResults, transformFlightDataForBooking } from './lib/flight-formatter.ts';
import { getStoredFlightData, createFlightBooking } from './lib/booking-service.ts';
import { 
  TRAVEL_AGENT_SYSTEM_PROMPT, 
  FLIGHT_SEARCH_FUNCTION, 
  CREATE_FLIGHT_BOOKING_FUNCTION 
} from './lib/openai-config.ts';

// API keys from environment with enhanced debugging
const openAIApiKey = Deno.env.get('OPENAI_API_KEY') || Deno.env.get('SUPAGENT_OPENAI') || Deno.env.get('Supagent Openai');
const rapidApiKey = Deno.env.get('RAPIDAPI_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

// Enhanced API key validation and logging
console.log('🔧 Maya AI Travel Agent - Initializing...');
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
    console.log('AI Travel Agent function called');
    
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

    if (!rapidApiKey) {
      console.error('RapidAPI key not found');
      return new Response(
        JSON.stringify({ 
          response: '✈️ **Flight & Travel Search Unavailable**: My travel booking service isn\'t configured properly.\n\n**What this means:**\n• I can\'t search for flights, hotels, or make bookings right now\n• My RapidAPI connection needs admin setup\n\n**What you can do:**\n• Contact support to report this configuration issue\n• I can still help with travel advice and planning\n• Try searches again once this is resolved\n\nI\'m sorry I can\'t search travel options right now, but I\'m here for any other travel questions! 🗺️',
          error: true,
          errorType: 'travel_api_configuration'
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

    console.log('Calling OpenAI API with enhanced function calling support');

    // Get AI response from OpenAI with function calling
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
          response: '🔑 **AI Processing Issue**: My AI system is having trouble right now.\n\n**What this means:**\n• There might be an API connectivity problem\n• My AI processing service could be temporarily overloaded\n• This could be a temporary authentication issue\n\n**What you can do:**\n• Try your request again in a moment\n• Make sure your message is clear and complete\n• Contact support if this continues happening\n\nI\'m working to get back online as quickly as possible! 🚀',
          error: true,
          errorType: 'ai_processing_error',
          details: `${errorMessage}: ${errorData}`
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log('OpenAI API response received successfully');
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Invalid OpenAI response format:', data);
      return new Response(
        JSON.stringify({ 
          response: '🤖 **AI Response Issue**: I received an unexpected response from my AI system.\n\n**What this means:**\n• My AI processing returned incomplete data\n• This could be a temporary system issue\n• The response format was not as expected\n\n**What you can do:**\n• Try sending your message again\n• Rephrase your request if needed\n• Contact support if this keeps happening\n\nI\'m working to resolve this right away! 🔧',
          error: true,
          errorType: 'ai_response_format_error'
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let aiResponse = data.choices[0].message.content;
    const functionCall = data.choices[0].message.function_call;

    // Handle function calling with enhanced error handling
    if (functionCall) {
      console.log('Function call detected:', functionCall.name);
      
      if (functionCall.name === 'search_flights') {
        try {
          const functionArgs = JSON.parse(functionCall.arguments);
          console.log('Flight search parameters:', functionArgs);
          
          // Enhanced date parsing
          const parsedDepartureDate = parseNaturalDate(functionArgs.departureDate);
          const parsedReturnDate = functionArgs.returnDate ? parseNaturalDate(functionArgs.returnDate) : null;
          
          if (!parsedDepartureDate) {
            aiResponse = `I had trouble understanding the departure date "${functionArgs.departureDate}". Could you please provide the date in one of these formats:\n\n• Month Day (e.g., "July 19", "Dec 25")\n• MM/DD format (e.g., "7/19", "12/25")\n• Full date (e.g., "2024-07-19")\n\nWhat date would you like to travel?`;
          } else {
            // Enhanced city lookup with suggestions
            const originLookup = getCityIATA(functionArgs.origin);
            const destinationLookup = getCityIATA(functionArgs.destination);
            
            console.log('City lookups:', { 
              origin: originLookup, 
              destination: destinationLookup 
            });
            
            // Check if we need to suggest alternatives
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
              // Proceed with flight search
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
                rapidApiKey
              );
              
              // Store flight search results in conversation context for booking
              const searchContext = {
                searchParams: functionArgs,
                searchResults: flights,
                origin: originLookup.code,
                destination: destinationLookup.code,
                departureDate: parsedDepartureDate,
                returnDate: parsedReturnDate
              };
              
              // Store flight data in conversation for later booking use
              if (flights && flights.length > 0) {
                console.log('Storing flight search results for conversation:', currentConversationId);
                const { error: storageError } = await supabase
                  .from('chat_messages')
                  .insert({
                    conversation_id: currentConversationId,
                    role: 'system',
                    content: 'FLIGHT_SEARCH_RESULTS',
                    metadata: {
                      searchResults: flights.slice(0, 10), // Store up to 10 flights
                      searchContext: searchContext,
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
                searchContext
              );
              console.log('Flight search completed, results formatted');
              
              // Get AI's response to the flight results
              const followUpResponse = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${openAIApiKey}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  model: 'gpt-4o-mini',
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
          
          // If flight selection is incomplete, try to retrieve stored flight data
          if (flightSelectionData && flightSelectionData.flightId && (!flightSelectionData.departureDate || !flightSelectionData.price)) {
            console.log('Flight selection incomplete, retrieving stored data for:', flightSelectionData.flightId);
            const storedData = await getStoredFlightData(supabase, currentConversationId, flightSelectionData.flightId);
            
            if (storedData) {
              console.log('Enhancing flight selection with stored data');
              flightSelectionData = transformFlightDataForBooking(storedData.flight, storedData.searchContext);
              
              // Merge with any additional data provided by the user
              flightSelectionData = {
                ...flightSelectionData,
                ...functionArgs.flightSelection // Override with user-provided data
              };
            } else {
              console.error('Could not retrieve stored flight data for booking');
              aiResponse = `I couldn't find the flight data for booking. This might happen if:\n\n• The flight search was done in a different conversation\n• Too much time has passed since the search\n• There was an issue storing the flight data\n\nCould you please search for flights again and then select the one you'd like to book? I'll make sure to preserve all the flight details for booking this time! ✈️`;
              
              // Store AI response and return early
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
    console.error('🚨 CRITICAL ERROR in ai-travel-agent function:', error);
    console.error('📊 Error Details:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      timestamp: new Date().toISOString()
    });
    
    // Provide specific error responses based on error type
    let errorResponse = {
      error: 'Service temporarily unavailable',
      userMessage: 'I apologize, but I\'m experiencing some technical difficulties right now.',
      details: error.message,
      suggestions: [
        'Try your request again in a moment',
        'Make sure your message is clear and complete',
        'Contact support if the issue persists'
      ]
    };
    
    // Customize error message based on error type
    if (error.message?.includes('OpenAI')) {
      errorResponse.userMessage = '🔑 My AI processing system is temporarily unavailable. This appears to be an API configuration issue.';
      errorResponse.suggestions = [
        'This is a technical issue that needs admin attention',
        'Please contact support to report this problem',
        'Try again in a few minutes'
      ];
    } else if (error.message?.includes('Amadeus')) {
      errorResponse.userMessage = '✈️ My flight search service is temporarily offline. I cannot search for flights right now.';
      errorResponse.suggestions = [
        'Try again in a few minutes',
        'Double-check your city names and travel dates',
        'Contact support if this continues'
      ];
    } else if (error.message?.includes('supabase') || error.message?.includes('database')) {
      errorResponse.userMessage = '💾 I\'m having trouble accessing my conversation memory. Your messages might not be saved.';
      errorResponse.suggestions = [
        'Try refreshing the page',
        'Your conversation data should be preserved',
        'Contact support if problems persist'
      ];
    } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
      errorResponse.userMessage = '🌐 I\'m experiencing network connectivity issues right now.';
      errorResponse.suggestions = [
        'Check your internet connection',
        'Try again in a moment',
        'Refresh the page if needed'
      ];
    }
    
    return new Response(JSON.stringify({
      response: errorResponse.userMessage + '\n\n**What you can try:**\n' + errorResponse.suggestions.map(s => `• ${s}`).join('\n') + '\n\nI\'m here to help once this issue is resolved! 🛠️',
      error: true,
      errorType: 'system_error',
      details: errorResponse.details
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});