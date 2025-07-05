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

// API keys from environment with enhanced debugging - Maya Recovery Plan Step 1
const openAIApiKey = Deno.env.get('OPENAI_API_KEY') || 
                     Deno.env.get('SUPAGENT_OPENAI') || 
                     Deno.env.get('Supagent OpenAi') ||
                     Deno.env.get('Supagent_OpenAi');
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

    // Store user message with retry logic
    console.log('📝 Storing user message in conversation:', currentConversationId);
    let userMessageStored = false;
    let messageRetryCount = 0;
    const maxMessageRetries = 3;

    while (!userMessageStored && messageRetryCount < maxMessageRetries) {
      messageRetryCount++;
      console.log(`💾 Attempting to store user message - Attempt ${messageRetryCount}/${maxMessageRetries}`);
      
      const { error: messageError } = await supabase
        .from('chat_messages')
        .insert({
          conversation_id: currentConversationId,
          role: 'user',
          content: message
        });

      if (!messageError) {
        userMessageStored = true;
        console.log('✅ User message stored successfully');
      } else {
        console.error(`❌ Error storing user message (attempt ${messageRetryCount}):`, messageError);
        if (messageRetryCount < maxMessageRetries) {
          const delay = 1000 * messageRetryCount; // 1s, 2s, 3s delays
          console.log(`⏳ Retrying user message storage in ${delay}ms`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    if (!userMessageStored) {
      console.error('🚨 Failed to store user message after all retries - Continuing without storage');
      // Continue processing even if message storage fails
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

    console.log('🚀 Starting OpenAI API call with enhanced function calling support');

    // Enhanced OpenAI API call with retry logic and comprehensive error handling
    let response: Response;
    let attemptCount = 0;
    const maxRetries = 3;
    const baseDelay = 1000; // 1 second

    while (attemptCount < maxRetries) {
      attemptCount++;
      console.log(`📡 OpenAI API attempt ${attemptCount}/${maxRetries}`);
      
      try {
        response = await fetch('https://api.openai.com/v1/chat/completions', {
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

        console.log(`✅ OpenAI API response received - Status: ${response.status}, Attempt: ${attemptCount}`);

        if (response.ok) {
          break; // Success, exit retry loop
        }

        // Handle specific error codes
        if (response.status === 401) {
          console.error('❌ OpenAI API Authentication Error - Invalid API key');
          return new Response(
            JSON.stringify({ 
              response: '🔑 **Authentication Issue**: My OpenAI API configuration has an authentication problem.\n\n**What this means:**\n• The API key may be invalid or expired\n• This requires administrator attention\n\n**What you can do:**\n• Contact support immediately to report this authentication issue\n• This is a critical configuration problem\n• I cannot process AI requests until this is resolved\n\nI apologize for this technical issue! 🛠️',
              error: true,
              errorType: 'openai_auth_error'
            }),
            { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        if (response.status === 429) {
          // Rate limit - implement exponential backoff
          const retryAfter = response.headers.get('retry-after');
          const delay = retryAfter ? parseInt(retryAfter) * 1000 : baseDelay * Math.pow(2, attemptCount - 1);
          console.log(`⏳ Rate limited. Waiting ${delay}ms before retry ${attemptCount}/${maxRetries}`);
          
          if (attemptCount < maxRetries) {
            await new Promise(resolve => setTimeout(resolve, delay));
            continue;
          } else {
            console.error('❌ OpenAI API Rate limit exceeded - Max retries reached');
            return new Response(
              JSON.stringify({ 
                response: '⏱️ **High Demand**: My AI system is experiencing very high demand right now.\n\n**What this means:**\n• OpenAI\'s servers are temporarily overloaded\n• This is a temporary issue that usually resolves quickly\n\n**What you can do:**\n• Please wait 30-60 seconds and try your request again\n• Your request is important and will be processed once traffic decreases\n• Contact support if this persists for more than 5 minutes\n\nThank you for your patience! I\'ll be back to full speed soon! 🚀',
                error: true,
                errorType: 'openai_rate_limit'
              }),
              { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }
        }

        if (response.status >= 500) {
          // Server error - retry with exponential backoff
          const delay = baseDelay * Math.pow(2, attemptCount - 1);
          console.log(`🔄 Server error ${response.status}. Retrying in ${delay}ms. Attempt ${attemptCount}/${maxRetries}`);
          
          if (attemptCount < maxRetries) {
            await new Promise(resolve => setTimeout(resolve, delay));
            continue;
          }
        }

        // For other errors, don't retry
        const errorData = await response.text();
        console.error(`❌ OpenAI API Error - Status: ${response.status}, Response: ${errorData}`);
        break;

      } catch (fetchError) {
        console.error(`🌐 Network error on attempt ${attemptCount}:`, fetchError);
        
        if (attemptCount < maxRetries) {
          const delay = baseDelay * Math.pow(2, attemptCount - 1);
          console.log(`⏳ Network error. Retrying in ${delay}ms`);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        } else {
          console.error('❌ Network error - Max retries reached');
          return new Response(
            JSON.stringify({ 
              response: '🌐 **Connection Issue**: I\'m having trouble connecting to my AI processing service.\n\n**What this means:**\n• There might be a temporary network connectivity issue\n• My AI servers might be temporarily unreachable\n\n**What you can do:**\n• Check your internet connection\n• Try your request again in a moment\n• Contact support if this continues\n\nI\'m working to restore full connectivity! 📡',
              error: true,
              errorType: 'network_error'
            }),
            { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
      }
    }

    // If we've exhausted retries and still don't have a successful response
    if (!response || !response.ok) {
      const errorData = response ? await response.text() : 'No response received';
      console.error('❌ OpenAI API failed after all retries:', {
        status: response?.status,
        statusText: response?.statusText,
        errorData: errorData,
        attempts: attemptCount
      });
      
      return new Response(
        JSON.stringify({ 
          response: '🔧 **AI Processing Unavailable**: I\'ve tried multiple times but can\'t reach my AI processing service.\n\n**What this means:**\n• My AI system is temporarily having technical difficulties\n• I\'ve attempted several retries but the issue persists\n• This might be a broader service outage\n\n**What you can do:**\n• Please try again in a few minutes\n• Check if there are any known service outages\n• Contact support if this continues for more than 10 minutes\n\nI really want to help you, and I\'m working hard to get back online! 💪',
          error: true,
          errorType: 'ai_service_unavailable'
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

    // Store AI response with retry logic
    console.log('💾 Storing AI response in conversation:', currentConversationId);
    let aiResponseStored = false;
    let aiRetryCount = 0;
    const maxAiRetries = 3;

    while (!aiResponseStored && aiRetryCount < maxAiRetries) {
      aiRetryCount++;
      console.log(`📝 Attempting to store AI response - Attempt ${aiRetryCount}/${maxAiRetries}`);
      
      const { error: aiMessageError } = await supabase
        .from('chat_messages')
        .insert({
          conversation_id: currentConversationId,
          role: 'assistant',
          content: aiResponse
        });

      if (!aiMessageError) {
        aiResponseStored = true;
        console.log('✅ AI response stored successfully');
      } else {
        console.error(`❌ Error storing AI response (attempt ${aiRetryCount}):`, aiMessageError);
        if (aiRetryCount < maxAiRetries) {
          const delay = 1000 * aiRetryCount; // 1s, 2s, 3s delays
          console.log(`⏳ Retrying AI response storage in ${delay}ms`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    if (!aiResponseStored) {
      console.error('🚨 Failed to store AI response after all retries - Returning response anyway');
      // Still return the response to user even if storage fails
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
      timestamp: new Date().toISOString(),
      userId: userId || 'unknown',
      conversationId: currentConversationId || 'none'
    });
    
    // Enhanced error categorization and user-friendly responses
    let errorResponse = {
      error: 'Service temporarily unavailable',
      userMessage: '🛠️ **Technical Difficulties**: I\'m experiencing some technical challenges right now, but I\'m here to help!',
      details: error.message,
      suggestions: [
        'Try your request again in a moment',
        'Make sure your message is clear and complete',
        'Contact support if the issue persists'
      ],
      errorType: 'general_system_error'
    };
    
    // Categorize and customize error messages based on error type
    if (error.message?.toLowerCase().includes('openai') || error.message?.toLowerCase().includes('gpt')) {
      errorResponse.userMessage = '🤖 **AI Processing Issue**: My AI brain is having a temporary hiccup!';
      errorResponse.errorType = 'openai_error';
      errorResponse.suggestions = [
        'This is usually a temporary issue with my AI processing',
        'Please try your request again in 30-60 seconds',
        'Contact support if this continues for more than 5 minutes'
      ];
    } else if (error.message?.toLowerCase().includes('rapidapi') || error.message?.toLowerCase().includes('flight') || error.message?.toLowerCase().includes('hotel')) {
      errorResponse.userMessage = '✈️ **Travel Search Unavailable**: My flight and hotel search services are temporarily offline.';
      errorResponse.errorType = 'travel_api_error';
      errorResponse.suggestions = [
        'I can still help with travel advice and planning questions',
        'Try flight searches again in a few minutes',
        'Contact support if travel searches remain unavailable'
      ];
    } else if (error.message?.toLowerCase().includes('supabase') || error.message?.toLowerCase().includes('database') || error.message?.toLowerCase().includes('conversation')) {
      errorResponse.userMessage = '💾 **Memory Issue**: I\'m having trouble with my conversation memory right now.';
      errorType = 'database_error';
      errorResponse.suggestions = [
        'Your messages are still being processed, just not saved',
        'Try refreshing the page and starting a new conversation',
        'Your previous conversations should still be available'
      ];
    } else if (error.message?.toLowerCase().includes('network') || error.message?.toLowerCase().includes('fetch') || error.message?.toLowerCase().includes('connection')) {
      errorResponse.userMessage = '🌐 **Connection Problem**: I\'m having trouble connecting to my services right now.';
      errorResponse.errorType = 'network_error';
      errorResponse.suggestions = [
        'Check your internet connection',
        'Try again in a moment - this is usually temporary',
        'Refresh the page if needed'
      ];
    } else if (error.message?.toLowerCase().includes('timeout')) {
      errorResponse.userMessage = '⏱️ **Response Timeout**: Your request is taking longer than expected to process.';
      errorResponse.errorType = 'timeout_error';
      errorResponse.suggestions = [
        'This usually happens during high traffic periods',
        'Try a simpler request first to test connectivity',
        'Wait 30 seconds and try again'
      ];
    } else if (error.message?.toLowerCase().includes('rate') || error.message?.toLowerCase().includes('limit')) {
      errorResponse.userMessage = '🚦 **High Traffic**: I\'m experiencing very high demand right now.';
      errorResponse.errorType = 'rate_limit_error';
      errorResponse.suggestions = [
        'Please wait 1-2 minutes before trying again',
        'This helps ensure quality service for everyone',
        'Your request is important and will be processed soon'
      ];
    }
    
    // Create a comprehensive, helpful response that always provides value
    const finalResponse = `${errorResponse.userMessage}

**What happened:**
• I encountered a technical issue while processing your request
• My systems are designed to recover quickly from these situations
• Your request was received and I\'m working to resolve this

**What you can try:**
${errorResponse.suggestions.map(s => `• ${s}`).join('\n')}

**I\'m still here to help:**
• Ask me travel questions and I\'ll do my best to answer
• Try breaking complex requests into smaller parts
• I can provide travel advice even when some services are offline

**Need immediate assistance?**
• Contact our support team if this continues
• Report this error with timestamp: ${new Date().toISOString()}
• Reference error type: ${errorResponse.errorType}

Don\'t worry - I\'m working hard to get back to full functionality! Let\'s try something else while I recover. 💪`;

    // Attempt to store error information in conversation (with fallback handling)
    if (currentConversationId) {
      try {
        console.log('💾 Attempting to store error response in conversation');
        await supabase
          .from('chat_messages')
          .insert({
            conversation_id: currentConversationId,
            role: 'assistant',
            content: finalResponse,
            metadata: {
              error: true,
              errorType: errorResponse.errorType,
              errorDetails: error.message,
              timestamp: new Date().toISOString()
            }
          });
        console.log('✅ Error response stored in conversation');
      } catch (storageError) {
        console.error('⚠️ Could not store error response in conversation:', storageError);
        // Continue anyway - don't let storage failures prevent user response
      }
    }
    
    // ALWAYS return a response - this is our ultimate fallback
    return new Response(JSON.stringify({
      response: finalResponse,
      error: true,
      errorType: errorResponse.errorType,
      conversationId: currentConversationId,
      timestamp: new Date().toISOString(),
      canRetry: true
    }), {
      status: 200, // Always return 200 so the frontend can display the message
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});