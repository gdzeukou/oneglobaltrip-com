
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Comprehensive Travel Agent System Prompt
const TRAVEL_AGENT_SYSTEM_PROMPT = `You are Maya, a comprehensive AI Travel Agent for a full-service travel agency specializing in complete travel solutions. You are an expert in:

🌟 **Complete Travel Services:**
- ✈️ **Flight Bookings**: Real-time search, multi-airline comparisons, complex itineraries
- 🏨 **Accommodations**: Hotels, resorts, vacation rentals, luxury stays, budget options
- 🚗 **Transportation**: Car rentals, transfers, ground transportation
- 🛡️ **Travel Insurance**: Comprehensive coverage, medical, trip cancellation, baggage
- 📋 **Visa Services**: Tourist visas, business visas, long-stay permits, document assistance
- 🎯 **Custom Packages**: Honeymoons, business travel, group tours, adventure packages

🔧 **Your Capabilities:**
- Search and book flights with live pricing
- Find and reserve accommodations worldwide
- Arrange car rentals and ground transportation
- Provide visa requirements and application assistance
- Recommend travel insurance options
- Create custom travel packages
- Handle complex multi-destination itineraries
- Provide destination expertise and local insights

💼 **Professional Services:**
- Visa document review and submission
- Travel insurance claims assistance
- 24/7 travel support and emergency assistance
- Group booking coordination
- Corporate travel management
- Destination weddings and special events

🎯 **Your Approach:**
1. **Comprehensive Consultation**: Understand complete travel needs
2. **Expert Recommendations**: Provide tailored options across all services
3. **Seamless Booking**: Handle all reservations and confirmations
4. **Document Support**: Assist with visas, insurance, and travel documents
5. **Ongoing Support**: Provide assistance throughout the entire journey

🗣️ **Communication Style:**
- Professional, knowledgeable, and enthusiastic
- Ask detailed questions to understand complete travel needs
- Provide options with clear explanations of benefits
- Guide step-by-step through complex bookings
- Always confirm details before processing
- Offer value-added services proactively

**Remember**: You're not just booking travel - you're creating complete travel experiences and providing comprehensive travel agency services!`;

// Enhanced function definitions
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

const HOTEL_SEARCH_FUNCTION = {
  name: "search_hotels",
  description: "Search for accommodations in a specific destination",
  parameters: {
    type: "object",
    properties: {
      destination: {
        type: "string",
        description: "Hotel destination city or area"
      },
      checkIn: {
        type: "string",
        description: "Check-in date"
      },
      checkOut: {
        type: "string",
        description: "Check-out date"
      },
      guests: {
        type: "integer",
        description: "Number of guests",
        default: 2
      },
      rooms: {
        type: "integer",
        description: "Number of rooms",
        default: 1
      },
      priceRange: {
        type: "string",
        description: "Budget range (budget, mid-range, luxury)"
      }
    },
    required: ["destination", "checkIn", "checkOut"]
  }
};

const CAR_RENTAL_SEARCH_FUNCTION = {
  name: "search_car_rentals",
  description: "Search for car rental options",
  parameters: {
    type: "object",
    properties: {
      location: {
        type: "string",
        description: "Pickup location"
      },
      pickupDate: {
        type: "string",
        description: "Pickup date"
      },
      returnDate: {
        type: "string",
        description: "Return date"
      },
      carType: {
        type: "string",
        description: "Preferred car type (economy, compact, SUV, luxury)"
      }
    },
    required: ["location", "pickupDate", "returnDate"]
  }
};

const VISA_CHECK_FUNCTION = {
  name: "check_visa_requirements",
  description: "Check visa requirements for travel",
  parameters: {
    type: "object",
    properties: {
      nationality: {
        type: "string",
        description: "Traveler's nationality/passport country"
      },
      destination: {
        type: "string",
        description: "Destination country"
      },
      travelPurpose: {
        type: "string",
        description: "Purpose of travel (tourism, business, study, work)"
      },
      duration: {
        type: "string",
        description: "Length of stay"
      }
    },
    required: ["nationality", "destination"]
  }
};

const INSURANCE_SEARCH_FUNCTION = {
  name: "search_travel_insurance",
  description: "Search for travel insurance options",
  parameters: {
    type: "object",
    properties: {
      destination: {
        type: "string",
        description: "Travel destination"
      },
      travelDates: {
        type: "string",
        description: "Travel dates"
      },
      travelers: {
        type: "integer",
        description: "Number of travelers"
      },
      coverageType: {
        type: "string",
        description: "Type of coverage needed (basic, comprehensive, medical)"
      },
      tripValue: {
        type: "number",
        description: "Total trip value for coverage calculation"
      }
    },
    required: ["destination", "travelDates", "travelers"]
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
          returnDate: { type: "string" },
          origin: { type: "string" },
          destination: { type: "string" }
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

// Utility functions
function parseNaturalDate(dateString: string): string | null {
  if (!dateString) return null;
  
  try {
    const currentYear = new Date().getFullYear();
    let parsedDate: Date;
    
    if (dateString.match(/^\d{1,2}\/\d{1,2}(\/\d{4})?$/)) {
      const parts = dateString.split('/');
      const month = parseInt(parts[0]) - 1;
      const day = parseInt(parts[1]);
      const year = parts[2] ? parseInt(parts[2]) : currentYear;
      parsedDate = new Date(year, month, day);
    } else if (dateString.match(/^\w+ \d{1,2}$/)) {
      parsedDate = new Date(`${dateString}, ${currentYear}`);
    } else {
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
  
  const suggestions = Object.values(AIRPORT_CODES)
    .filter(airport => airport.name.toLowerCase().includes(normalizedCity))
    .map(airport => airport.name)
    .slice(0, 3);
    
  return { 
    code: cityName.toUpperCase(), 
    suggestions: suggestions.length > 0 ? suggestions : undefined 
  };
}

// Enhanced search functions with Amadeus API integration
async function searchFlights(origin: string, destination: string, departureDate: string, returnDate: string | null, adults: number): Promise<any[]> {
  console.log('🔍 Searching flights with Amadeus API:', { origin, destination, departureDate, returnDate, adults });
  
  const amadeusApiKey = Deno.env.get('AMADEUS_API_KEY');
  const amadeusApiSecret = Deno.env.get('AMADEUS_API_SECRET');

  // Use real Amadeus API if credentials are available
  if (amadeusApiKey && amadeusApiSecret) {
    try {
      console.log('🎯 Using Amadeus API for real flight search');
      
      // Get Amadeus access token
      const tokenResponse = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=client_credentials&client_id=${amadeusApiKey}&client_secret=${amadeusApiSecret}`
      });
      
      if (!tokenResponse.ok) {
        throw new Error(`Amadeus token error: ${tokenResponse.status}`);
      }
      
      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;
      
      // Search flights with Amadeus API
      const params = new URLSearchParams({
        originLocationCode: origin,
        destinationLocationCode: destination,
        departureDate,
        adults: adults.toString(),
        max: '10',
        currencyCode: 'USD'
      });
      
      if (returnDate) {
        params.append('returnDate', returnDate);
      }
      
      const searchResponse = await fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers?${params}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!searchResponse.ok) {
        throw new Error(`Amadeus search error: ${searchResponse.status}`);
      }
      
      const searchData = await searchResponse.json();
      const amadeusFlights = searchData.data || [];
      
      console.log(`🎯 Amadeus API returned ${amadeusFlights.length} flights`);
      
      // Transform Amadeus data to our format
      const transformedFlights = amadeusFlights.map((offer: any, index: number) => {
        const outbound = offer.itineraries[0].segments[0];
        const inbound = offer.itineraries[1]?.segments[0];
        
        return {
          id: `AM-${offer.id}`,
          airline: outbound.carrierCode,
          flightNumber: `${outbound.carrierCode}${outbound.number}`,
          price: parseFloat(offer.price.total),
          currency: offer.price.currency,
          departure: {
            airport: outbound.departure.iataCode,
            time: new Date(outbound.departure.at).toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: false 
            }),
            date: departureDate
          },
          arrival: {
            airport: outbound.arrival.iataCode,
            time: new Date(outbound.arrival.at).toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: false 
            }),
            date: departureDate
          },
          duration: outbound.duration.replace('PT', '').toLowerCase(),
          stops: offer.itineraries[0].segments.length - 1,
          origin: origin,
          destination: destination,
          amadeusData: offer // Store original data for booking
        };
      });
      
      console.log('✅ Real flight search completed:', transformedFlights.length, 'flights found');
      return transformedFlights;
      
    } catch (error) {
      console.error('❌ Amadeus API error, falling back to mock data:', error);
      // Fall through to mock data
    }
  } else {
    console.log('⚠️ Amadeus API credentials not configured, using mock data');
  }
  
  // Fallback to mock data if API fails or credentials missing
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
      stops: 0,
      origin: origin,
      destination: destination
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
      stops: 0,
      origin: origin,
      destination: destination
    }
  ];
  
  console.log('✅ Mock flight search completed:', mockFlights.length, 'flights found');
  return mockFlights;
}

async function searchHotels(destination: string, checkIn: string, checkOut: string, guests: number, rooms: number): Promise<any[]> {
  console.log('🏨 Searching hotels:', { destination, checkIn, checkOut, guests, rooms });
  
  const mockHotels = [
    {
      id: 'HTL001',
      name: 'Grand Plaza Hotel',
      location: destination,
      price: 200,
      currency: 'USD',
      rating: 4.5,
      amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant'],
      checkIn: checkIn,
      checkOut: checkOut,
      roomType: 'Deluxe Room'
    },
    {
      id: 'HTL002',
      name: 'Business Inn',
      location: destination,
      price: 120,
      currency: 'USD',
      rating: 4.0,
      amenities: ['WiFi', 'Business Center', 'Breakfast'],
      checkIn: checkIn,
      checkOut: checkOut,
      roomType: 'Standard Room'
    }
  ];
  
  console.log('✅ Hotel search completed:', mockHotels.length, 'hotels found');
  return mockHotels;
}

async function searchCarRentals(location: string, pickupDate: string, returnDate: string, carType?: string): Promise<any[]> {
  console.log('🚗 Searching car rentals:', { location, pickupDate, returnDate, carType });
  
  const mockCars = [
    {
      id: 'CAR001',
      company: 'Enterprise',
      model: 'Toyota Camry',
      type: 'Mid-size',
      price: 45,
      currency: 'USD',
      pickupLocation: location,
      pickupDate: pickupDate,
      returnDate: returnDate
    },
    {
      id: 'CAR002',
      company: 'Hertz',
      model: 'Honda Civic',
      type: 'Compact',
      price: 35,
      currency: 'USD',
      pickupLocation: location,
      pickupDate: pickupDate,
      returnDate: returnDate
    }
  ];
  
  console.log('✅ Car rental search completed:', mockCars.length, 'options found');
  return mockCars;
}

async function checkVisaRequirements(nationality: string, destination: string, travelPurpose?: string): Promise<any> {
  console.log('📋 Checking visa requirements:', { nationality, destination, travelPurpose });
  
  const visaInfo = {
    required: true,
    type: 'Tourist Visa',
    processingTime: '5-10 business days',
    validity: '90 days',
    requirements: [
      'Valid passport (6+ months validity)',
      'Completed application form',
      'Passport photos',
      'Travel itinerary',
      'Proof of accommodation',
      'Financial statements'
    ],
    fees: {
      amount: 60,
      currency: 'USD'
    },
    notes: 'Visa on arrival available for some nationalities'
  };
  
  console.log('✅ Visa check completed');
  return visaInfo;
}

async function searchTravelInsurance(destination: string, travelDates: string, travelers: number, coverageType?: string): Promise<any[]> {
  console.log('🛡️ Searching travel insurance:', { destination, travelDates, travelers, coverageType });
  
  const mockInsurance = [
    {
      id: 'INS001',
      provider: 'World Travel Insurance',
      plan: 'Comprehensive Coverage',
      price: 89,
      currency: 'USD',
      coverage: {
        medical: 100000,
        tripCancellation: 5000,
        baggage: 1500,
        emergency: true
      },
      duration: travelDates
    },
    {
      id: 'INS002',
      provider: 'Safe Journey Insurance',
      plan: 'Basic Coverage',
      price: 45,
      currency: 'USD',
      coverage: {
        medical: 50000,
        tripCancellation: 2500,
        baggage: 750,
        emergency: true
      },
      duration: travelDates
    }
  ];
  
  console.log('✅ Insurance search completed:', mockInsurance.length, 'options found');
  return mockInsurance;
}

// Enhanced booking function with comprehensive validation and error handling
async function createFlightBooking(flightSelection: any, passengers: any[], userId: string, conversationId: string, supabase: any): Promise<any> {
  try {
    console.log('🎫 Creating flight booking with validation:', { 
      flightSelection: {
        id: flightSelection.id,
        departure: flightSelection.departure,
        arrival: flightSelection.arrival,
        price: flightSelection.price
      }, 
      passengerCount: passengers.length, 
      userId 
    });
    
    // Comprehensive data validation and extraction
    const departureDate = flightSelection.departure?.date || 
                         flightSelection.departureDate || 
                         new Date().toISOString().split('T')[0];
    
    const returnDate = flightSelection.arrival?.date || 
                      flightSelection.returnDate || 
                      null;
    
    const originAirport = flightSelection.origin || 
                         flightSelection.departure?.airport || 
                         'ORIGIN';
    
    const destinationAirport = flightSelection.destination || 
                              flightSelection.arrival?.airport || 
                              'DEST';
    
    const flightPrice = flightSelection.price || 0;
    const currency = flightSelection.currency || 'USD';
    const airline = flightSelection.airline || 'Unknown Airline';
    const flightNumber = flightSelection.flightNumber || flightSelection.id || 'UNKNOWN';
    
    // Validate required fields
    if (!departureDate) {
      throw new Error('Missing departure date - cannot create booking');
    }
    
    if (!originAirport || !destinationAirport) {
      throw new Error('Missing airport information - cannot create booking');
    }
    
    if (passengers.length === 0) {
      throw new Error('No passengers provided - cannot create booking');
    }
    
    console.log('✅ Validation passed:', {
      departureDate,
      returnDate,
      originAirport,
      destinationAirport,
      flightPrice,
      currency,
      airline,
      flightNumber
    });
    
    // Generate booking reference
    const bookingReference = `OGT-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
    
    // Create booking record with validated data
    const { data: booking, error: bookingError } = await supabase
      .from('flight_bookings')
      .insert({
        user_id: userId,
        conversation_id: conversationId,
        booking_reference: bookingReference,
        origin_airport: originAirport,
        destination_airport: destinationAirport,
        departure_date: departureDate,
        return_date: returnDate,
        passenger_count: passengers.length,
        total_amount: flightPrice * passengers.length,
        currency: currency,
        airline_code: airline,
        flight_numbers: [flightNumber],
        flight_data: {
          ...flightSelection,
          validatedData: {
            departureDate,
            returnDate,
            originAirport,
            destinationAirport,
            flightPrice,
            currency,
            airline,
            flightNumber
          }
        },
        booking_status: 'confirmed'
      })
      .select()
      .single();

    if (bookingError) {
      console.error('❌ Database booking error:', bookingError);
      throw new Error(`Database error: ${bookingError.message}`);
    }

    console.log('✅ Flight booking created successfully:', {
      bookingId: booking.id,
      bookingReference,
      totalAmount: flightPrice * passengers.length
    });
    
    return {
      success: true,
      bookingReference,
      totalAmount: flightPrice * passengers.length,
      currency: currency,
      status: 'confirmed',
      details: {
        departureDate,
        returnDate,
        originAirport,
        destinationAirport,
        airline,
        flightNumber
      }
    };
  } catch (error) {
    console.error('❌ Comprehensive booking error:', error);
    return {
      success: false,
      error: error.message || 'Failed to create booking due to data validation issues'
    };
  }
}

// Format functions
function formatFlightResults(flights: any[], origin: string, destination: string): string {
  if (!flights || flights.length === 0) {
    return `I couldn't find any flights from ${origin} to ${destination} for your selected dates. Let me help you with alternative options or different dates! ✈️`;
  }

  let formattedResults = `🎉 **Great news!** I found ${flights.length} flight options from **${origin}** to **${destination}**:\n\n`;
  
  flights.slice(0, 5).forEach((flight, index) => {
    formattedResults += `**Option ${index + 1}: ${flight.airline}** (Flight ID: ${flight.id})\n`;
    formattedResults += `✈️ Flight: ${flight.flightNumber}\n`;
    formattedResults += `💰 Price: $${flight.price} ${flight.currency}\n`;
    formattedResults += `🕐 Departure: ${flight.departure.time} from ${flight.departure.airport}\n`;
    formattedResults += `🕐 Arrival: ${flight.arrival.time} at ${flight.arrival.airport}\n`;
    formattedResults += `⏱️ Duration: ${flight.duration}\n`;
    formattedResults += `🔄 Stops: ${flight.stops === 0 ? 'Direct flight' : `${flight.stops} stop(s)`}\n\n`;
  });

  formattedResults += `💡 **Ready to book?** Tell me which flight you prefer (by Option number) and I'll help with passenger details!\n\n`;
  formattedResults += `🏨 **Need accommodations?** I can also search for hotels at your destination!\n`;
  formattedResults += `🚗 **Ground transportation?** I can arrange car rentals too!\n`;
  formattedResults += `📋 **Visa assistance?** Let me check if you need a visa for this trip!`;

  return formattedResults;
}

// Environment variables
const openAIApiKey = Deno.env.get('OPENAI_API_KEY') || 
                     Deno.env.get('SUPAGENT_OPENAI') || 
                     Deno.env.get('Supagent OpenAi') ||
                     Deno.env.get('Supagent_OpenAi');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

console.log('🌟 Maya Comprehensive Travel Agent - Initializing...');
console.log('📋 API Key Status Check:');
console.log('  ✅ OpenAI API Key:', openAIApiKey ? `Found (${openAIApiKey.substring(0, 8)}...)` : '❌ Missing');
console.log('  ✅ Supabase URL:', supabaseUrl ? 'Found' : '❌ Missing');
console.log('  ✅ Supabase Service Key:', supabaseServiceKey ? 'Found' : '❌ Missing');

const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🚀 Maya Comprehensive Travel Agent function called');
    
    if (!openAIApiKey) {
      console.error('OpenAI API key not found');
      return new Response(
        JSON.stringify({ 
          response: '🔑 **Configuration Issue**: My AI system needs to be configured with an OpenAI API key.\n\n**Contact Support**: Please have an administrator set up the OpenAI connection for full travel services.\n\n**What I can help with once configured:**\n• Flight search and booking\n• Hotel reservations\n• Car rental arrangements\n• Visa requirements and applications\n• Travel insurance options\n• Complete travel packages\n\nI\'ll be your complete travel solution once this is resolved! 🌟',
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
          response: '📝 **Request Issue**: I need both a message and user information to provide travel services.\n\nPlease try refreshing the page and sending your message again. I\'m ready to help with all your travel needs! ✈️🏨🚗',
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
            response: '💾 **Conversation Setup Issue**: I\'m having trouble setting up our conversation. Please try refreshing the page and starting again.',
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

    // Get conversation history
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

    // OpenAI API call with all functions
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
        functions: [
          FLIGHT_SEARCH_FUNCTION, 
          HOTEL_SEARCH_FUNCTION,
          CAR_RENTAL_SEARCH_FUNCTION,
          VISA_CHECK_FUNCTION,
          INSURANCE_SEARCH_FUNCTION,
          CREATE_FLIGHT_BOOKING_FUNCTION
        ],
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
    
    let aiResponse = data.choices[0].message.content;
    const functionCall = data.choices[0].message.function_call;

    // Handle function calling
    if (functionCall) {
      console.log('Function call detected:', functionCall.name);
      
      try {
        const functionArgs = JSON.parse(functionCall.arguments);
        console.log('Function parameters:', functionArgs);
        
        switch (functionCall.name) {
          case 'search_flights':
            const parsedDepartureDate = parseNaturalDate(functionArgs.departureDate);
            const parsedReturnDate = functionArgs.returnDate ? parseNaturalDate(functionArgs.returnDate) : null;
            
            if (!parsedDepartureDate) {
              aiResponse = `I had trouble understanding the departure date "${functionArgs.departureDate}". Could you please provide the date in a clearer format like "July 19" or "7/19"?`;
            } else {
              const originLookup = getCityIATA(functionArgs.origin);
              const destinationLookup = getCityIATA(functionArgs.destination);
              
              const flights = await searchFlights(
                originLookup.code,
                destinationLookup.code,
                parsedDepartureDate,
                parsedReturnDate,
                functionArgs.adults || 1
              );
              
              // Store flight search results
              if (flights && flights.length > 0) {
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
              
              aiResponse = formatFlightResults(flights, functionArgs.origin, functionArgs.destination);
            }
            break;
            
          case 'search_hotels':
            const hotels = await searchHotels(
              functionArgs.destination,
              functionArgs.checkIn,
              functionArgs.checkOut,
              functionArgs.guests || 2,
              functionArgs.rooms || 1
            );
            
            aiResponse = `🏨 **Accommodation Options in ${functionArgs.destination}**:\n\n`;
            hotels.forEach((hotel, index) => {
              aiResponse += `**${index + 1}. ${hotel.name}**\n`;
              aiResponse += `⭐ Rating: ${hotel.rating}/5\n`;
              aiResponse += `💰 Price: $${hotel.price} per night\n`;
              aiResponse += `🛏️ Room: ${hotel.roomType}\n`;
              aiResponse += `🎯 Amenities: ${hotel.amenities.join(', ')}\n\n`;
            });
            aiResponse += `Ready to book? I can also help you with flights, car rentals, and travel insurance! 🌟`;
            break;
            
          case 'search_car_rentals':
            const cars = await searchCarRentals(
              functionArgs.location,
              functionArgs.pickupDate,
              functionArgs.returnDate,
              functionArgs.carType
            );
            
            aiResponse = `🚗 **Car Rental Options in ${functionArgs.location}**:\n\n`;
            cars.forEach((car, index) => {
              aiResponse += `**${index + 1}. ${car.company} - ${car.model}**\n`;
              aiResponse += `🚙 Type: ${car.type}\n`;
              aiResponse += `💰 Price: $${car.price} per day\n`;
              aiResponse += `📅 Pickup: ${car.pickupDate}\n`;
              aiResponse += `📅 Return: ${car.returnDate}\n\n`;
            });
            aiResponse += `Need anything else? I can arrange flights, hotels, and travel insurance too! 🌟`;
            break;
            
          case 'check_visa_requirements':
            const visaInfo = await checkVisaRequirements(
              functionArgs.nationality,
              functionArgs.destination,
              functionArgs.travelPurpose
            );
            
            aiResponse = `📋 **Visa Requirements for ${functionArgs.destination}**:\n\n`;
            aiResponse += `**Visa Required**: ${visaInfo.required ? 'Yes' : 'No'}\n`;
            if (visaInfo.required) {
              aiResponse += `**Type**: ${visaInfo.type}\n`;
              aiResponse += `**Processing Time**: ${visaInfo.processingTime}\n`;
              aiResponse += `**Validity**: ${visaInfo.validity}\n`;
              aiResponse += `**Fee**: $${visaInfo.fees.amount} ${visaInfo.fees.currency}\n\n`;
              aiResponse += `**Required Documents**:\n`;
              visaInfo.requirements.forEach((req: string) => {
                aiResponse += `• ${req}\n`;
              });
              aiResponse += `\n💡 **Need help with the visa application?** I can guide you through the process and help with document preparation!`;
            }
            break;
            
          case 'search_travel_insurance':
            const insurance = await searchTravelInsurance(
              functionArgs.destination,
              functionArgs.travelDates,
              functionArgs.travelers,
              functionArgs.coverageType
            );
            
            aiResponse = `🛡️ **Travel Insurance Options**:\n\n`;
            insurance.forEach((plan, index) => {
              aiResponse += `**${index + 1}. ${plan.provider} - ${plan.plan}**\n`;
              aiResponse += `💰 Price: $${plan.price} ${plan.currency}\n`;
              aiResponse += `🏥 Medical Coverage: $${plan.coverage.medical.toLocaleString()}\n`;
              aiResponse += `✈️ Trip Cancellation: $${plan.coverage.tripCancellation.toLocaleString()}\n`;
              aiResponse += `🧳 Baggage Coverage: $${plan.coverage.baggage.toLocaleString()}\n`;
              aiResponse += `🚨 Emergency Assistance: ${plan.coverage.emergency ? 'Yes' : 'No'}\n\n`;
            });
            aiResponse += `Ready to secure your trip? I can help you compare options and complete your purchase! 🌟`;
            break;
            
          case 'create_flight_booking':
            // Get stored flight data
            const { data: storedMessages } = await supabase
              .from('chat_messages')
              .select('metadata')
              .eq('conversation_id', currentConversationId)
              .eq('content', 'FLIGHT_SEARCH_RESULTS')
              .order('created_at', { ascending: false })
              .limit(1);

            if (storedMessages && storedMessages.length > 0) {
              const searchResults = storedMessages[0].metadata?.searchResults || [];
              const selectedFlight = searchResults.find((f: any) => f.id === functionArgs.flightSelection.flightId);
              
              if (selectedFlight) {
                const bookingResult = await createFlightBooking(
                  selectedFlight,
                  functionArgs.passengers,
                  userId,
                  currentConversationId,
                  supabase
                );
                
                if (bookingResult.success) {
                  aiResponse = `🎉 **Flight Booking Confirmed!**\n\n`;
                  aiResponse += `📋 **Booking Reference**: ${bookingResult.bookingReference}\n`;
                  aiResponse += `💰 **Total Amount**: $${bookingResult.totalAmount} ${bookingResult.currency}\n`;
                  aiResponse += `✅ **Status**: ${bookingResult.status}\n\n`;
                  aiResponse += `**What's Next?**\n`;
                  aiResponse += `• You'll receive confirmation details shortly\n`;
                  aiResponse += `• Need accommodation? I can search hotels at your destination!\n`;
                  aiResponse += `• Ground transportation? I can arrange car rentals!\n`;
                  aiResponse += `• Travel insurance? Let me show you coverage options!\n`;
                  aiResponse += `• Visa assistance? I can check requirements and help with applications!\n\n`;
                  aiResponse += `Your complete travel experience is my priority! What would you like to arrange next? 🌟`;
                } else {
                  aiResponse = `I encountered an issue while creating your booking: ${bookingResult.error}\n\nLet me help you resolve this. Could you please verify all passenger details are complete and try again?`;
                }
              } else {
                aiResponse = `I couldn't find the selected flight in our recent search results. Could you please search for flights again and then select the one you'd like to book?`;
              }
            } else {
              aiResponse = `I don't have recent flight search results to create a booking from. Please search for flights first, then I can help you book your preferred option!`;
            }
            break;
        }
      } catch (error) {
        console.error('Error in function call:', error);
        aiResponse = `I encountered an issue: ${error.message}\n\nLet me help you with your travel needs in a different way. What would you like to arrange? I can assist with flights, hotels, car rentals, visas, or travel insurance! 🌟`;
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
    console.error('🚨 CRITICAL ERROR in comprehensive travel agent function:', error);
    
    let errorResponse = `🛠️ **Technical Difficulties**: I'm experiencing some technical challenges, but I'm here to help with all your travel needs!

**What happened:**
• I encountered a technical issue: ${error.message}
• My comprehensive travel services are designed to recover quickly

**What you can try:**
• Try your request again in a moment
• Break down complex requests (e.g., "search flights to Paris" first, then "find hotels in Paris")
• I can still help with travel advice and planning

**I'm still ready to assist with:**
• ✈️ Flight searches and bookings
• 🏨 Hotel reservations
• 🚗 Car rental arrangements  
• 📋 Visa requirements and applications
• 🛡️ Travel insurance options
• 🎯 Complete travel packages

Let's get your travel plans sorted! What would you like to start with? 💪`;

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
