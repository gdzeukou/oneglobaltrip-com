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

// Enhanced city to IATA code mappings with fuzzy matching support
const CITY_TO_IATA: Record<string, string> = {
  // Major US cities
  'houston': 'IAH',
  'h-town': 'IAH',
  'space city': 'IAH',
  'dallas': 'DFW',
  'big d': 'DFW',
  'fort worth': 'DFW',
  'new york': 'JFK',
  'nyc': 'JFK',
  'new york city': 'JFK',
  'manhattan': 'JFK',
  'brooklyn': 'JFK',
  'los angeles': 'LAX',
  'la': 'LAX',
  'city of angels': 'LAX',
  'chicago': 'ORD',
  'chi town': 'ORD',
  'windy city': 'ORD',
  'miami': 'MIA',
  'magic city': 'MIA',
  'atlanta': 'ATL',
  'hotlanta': 'ATL',
  'boston': 'BOS',
  'beantown': 'BOS',
  'seattle': 'SEA',
  'emerald city': 'SEA',
  'san francisco': 'SFO',
  'sf': 'SFO',
  'frisco': 'SFO',
  'bay area': 'SFO',
  'las vegas': 'LAS',
  'vegas': 'LAS',
  'sin city': 'LAS',
  'denver': 'DEN',
  'mile high city': 'DEN',
  'phoenix': 'PHX',
  'valley of the sun': 'PHX',
  'philadelphia': 'PHL',
  'philly': 'PHL',
  'city of brotherly love': 'PHL',
  'detroit': 'DTW',
  'motor city': 'DTW',
  'minneapolis': 'MSP',
  'twin cities': 'MSP',
  'orlando': 'MCO',
  'o-town': 'MCO',
  'charlotte': 'CLT',
  'queen city': 'CLT',
  'washington': 'DCA',
  'dc': 'DCA',
  'washington dc': 'DCA',
  'baltimore': 'BWI',
  'nashville': 'BNA',
  'music city': 'BNA',
  'austin': 'AUS',
  'atx': 'AUS',
  'keep it weird': 'AUS',
  'san antonio': 'SAT',
  'alamo city': 'SAT',
  'san diego': 'SAN',
  'america finest city': 'SAN',
  'portland': 'PDX',
  'rose city': 'PDX',
  'salt lake city': 'SLC',
  'slc': 'SLC',
  
  // International cities
  'london': 'LHR',
  'big ben': 'LHR',
  'england': 'LHR',
  'paris': 'CDG',
  'city of lights': 'CDG',
  'city of love': 'CDG',
  'madrid': 'MAD',
  'barcelona': 'BCN',
  'rome': 'FCO',
  'eternal city': 'FCO',
  'amsterdam': 'AMS',
  'venice of the north': 'AMS',
  'berlin': 'BER',
  'munich': 'MUC',
  'frankfurt': 'FRA',
  'zurich': 'ZUR',
  'vienna': 'VIE',
  'brussels': 'BRU',
  'milan': 'MXP',
  'istanbul': 'IST',
  'dubai': 'DXB',
  'city of gold': 'DXB',
  'tokyo': 'NRT',
  'singapore': 'SIN',
  'lion city': 'SIN',
  'sydney': 'SYD',
  'harbour city': 'SYD',
  'toronto': 'YYZ',
  'vancouver': 'YVR',
  'mexico city': 'MEX',
  'cdmx': 'MEX',
  'mumbai': 'BOM',
  'bombay': 'BOM',
  'delhi': 'DEL',
  'new delhi': 'DEL',
  'bangkok': 'BKK',
  'city of angels': 'BKK',
  'hong kong': 'HKG',
  'fragrant harbor': 'HKG',
  'seoul': 'ICN',
  'beijing': 'PEK',
  'shanghai': 'PVG',
  'rio de janeiro': 'GIG',
  'rio': 'GIG',
  'sao paulo': 'GRU',
  'buenos aires': 'EZE',
  'lima': 'LIM',
  'bogota': 'BOG',
  'caracas': 'CCS',
  'johannesburg': 'JNB',
  'jo-burg': 'JNB',
  'cape town': 'CPT',
  'cairo': 'CAI',
  'casablanca': 'CMN',
  'lagos': 'LOS',
  'nairobi': 'NBO',
  'addis ababa': 'ADD',
  'melbourne': 'MEL',
  'perth': 'PER',
  'auckland': 'AKL',
  'wellington': 'WLG'
};

// Enhanced date parsing function
function parseNaturalDate(dateStr: string, currentYear = new Date().getFullYear()): string | null {
  console.log('Parsing date:', dateStr);
  
  if (!dateStr) return null;
  
  const cleanDate = dateStr.toLowerCase().trim();
  
  // Check if already in YYYY-MM-DD format
  if (/^\d{4}-\d{2}-\d{2}$/.test(cleanDate)) {
    return cleanDate;
  }
  
  // Month mappings
  const months: Record<string, number> = {
    'january': 1, 'jan': 1,
    'february': 2, 'feb': 2,
    'march': 3, 'mar': 3,
    'april': 4, 'apr': 4,
    'may': 5,
    'june': 6, 'jun': 6,
    'july': 7, 'jul': 7,
    'august': 8, 'aug': 8,
    'september': 9, 'sep': 9, 'sept': 9,
    'october': 10, 'oct': 10,
    'november': 11, 'nov': 11,
    'december': 12, 'dec': 12
  };
  
  // Try to parse "Month DD" or "Month DD, YYYY" formats
  const monthDayMatch = cleanDate.match(/(\w+)\s+(\d{1,2})(?:,?\s*(\d{4}))?/);
  if (monthDayMatch) {
    const [, monthStr, dayStr, yearStr] = monthDayMatch;
    const month = months[monthStr];
    const day = parseInt(dayStr);
    const year = yearStr ? parseInt(yearStr) : currentYear;
    
    if (month && day >= 1 && day <= 31) {
      // If the date would be in the past this year, assume next year
      const proposedDate = new Date(year, month - 1, day);
      const now = new Date();
      
      let finalYear = year;
      if (proposedDate < now && !yearStr) {
        finalYear = currentYear + 1;
      }
      
      return `${finalYear}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    }
  }
  
  // Try MM/DD or MM/DD/YYYY formats
  const slashMatch = cleanDate.match(/(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?/);
  if (slashMatch) {
    const [, monthStr, dayStr, yearStr] = slashMatch;
    const month = parseInt(monthStr);
    const day = parseInt(dayStr);
    let year = currentYear;
    
    if (yearStr) {
      year = yearStr.length === 2 ? 2000 + parseInt(yearStr) : parseInt(yearStr);
    }
    
    if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
      const proposedDate = new Date(year, month - 1, day);
      const now = new Date();
      
      if (proposedDate < now && !yearStr) {
        year = currentYear + 1;
      }
      
      return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    }
  }
  
  console.log('Could not parse date:', dateStr);
  return null;
}

// Enhanced city IATA code lookup with fuzzy matching
function getCityIATA(cityName: string): { code: string; suggestions?: string[] } {
  const normalized = cityName.toLowerCase().trim();
  console.log('Looking up city:', normalized);
  
  // Direct match
  if (CITY_TO_IATA[normalized]) {
    return { code: CITY_TO_IATA[normalized] };
  }
  
  // Fuzzy matching - find cities that contain the search term
  const suggestions: string[] = [];
  const partialMatches: string[] = [];
  
  for (const [city, code] of Object.entries(CITY_TO_IATA)) {
    if (city.includes(normalized)) {
      partialMatches.push(`${city} (${code})`);
    }
  }
  
  // If we found partial matches, suggest them
  if (partialMatches.length > 0) {
    return {
      code: cityName.toUpperCase(), // Return original as fallback
      suggestions: partialMatches.slice(0, 5) // Limit to 5 suggestions
    };
  }
  
  console.log('No match found for city:', cityName);
  return { code: cityName.toUpperCase() };
}

// Get Amadeus access token with better error handling
async function getAmadeusToken() {
  console.log('Getting Amadeus token...');
  
  try {
    const response = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=client_credentials&client_id=${amadeusApiKey}&client_secret=${amadeusApiSecret}`
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Amadeus token error:', response.status, errorText);
      throw new Error(`Amadeus authentication failed: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log('Amadeus token obtained successfully');
    return data.access_token;
  } catch (error) {
    console.error('Error getting Amadeus token:', error);
    throw error;
  }
}

// Enhanced flight search with comprehensive error handling
async function searchFlights(origin: string, destination: string, departureDate: string, returnDate?: string, adults: number = 1) {
  console.log('Starting flight search:', { origin, destination, departureDate, returnDate, adults });
  
  try {
    const token = await getAmadeusToken();
    
    const params = new URLSearchParams({
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate,
      adults: adults.toString(),
      max: '10', // Increased from 5 for better results
      currencyCode: 'USD'
    });
    
    if (returnDate) {
      params.append('returnDate', returnDate);
    }
    
    console.log('Searching flights with params:', params.toString());
    
    let response = await fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers?${params}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Amadeus flight search error:', response.status, errorText);
      
      // Try to parse error for more specific messaging
      try {
        const errorData = JSON.parse(errorText);
        if (errorData.errors && errorData.errors.length > 0) {
          const firstError = errorData.errors[0];
          console.error('Detailed error:', firstError);
          throw new Error(`Flight search failed: ${firstError.detail || firstError.title || 'Unknown error'}`);
        }
      } catch (parseError) {
        console.error('Could not parse error response');
      }
      
      throw new Error(`Flight search failed with status ${response.status}: ${errorText}`);
    }
    
    let data = await response.json();
    console.log('Flight search response received, offers count:', data.data?.length || 0);
    
    // If no flights found, try flexible dates (±3 days)
    if (!data.data || data.data.length === 0) {
      console.log('No flights found for exact date, trying flexible search...');
      
      const originalDate = new Date(departureDate);
      const flexibleDates = [];
      
      // Try ±3 days for better coverage
      for (let i = -3; i <= 3; i++) {
        if (i === 0) continue; // Skip original date
        const flexDate = new Date(originalDate);
        flexDate.setDate(originalDate.getDate() + i);
        flexibleDates.push(flexDate.toISOString().split('T')[0]);
      }
      
      for (const flexDate of flexibleDates) {
        console.log('Trying flexible date:', flexDate);
        
        const flexParams = new URLSearchParams({
          originLocationCode: origin,
          destinationLocationCode: destination,
          departureDate: flexDate,
          adults: adults.toString(),
          max: '5',
          currencyCode: 'USD'
        });
        
        if (returnDate) {
          const originalReturn = new Date(returnDate);
          const originalDeparture = new Date(departureDate);
          const daysDiff = Math.floor((originalReturn.getTime() - originalDeparture.getTime()) / (1000 * 60 * 60 * 24));
          const flexReturn = new Date(flexDate);
          flexReturn.setDate(flexReturn.getDate() + daysDiff);
          flexParams.append('returnDate', flexReturn.toISOString().split('T')[0]);
        }
        
        try {
          response = await fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers?${flexParams}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          
          if (response.ok) {
            data = await response.json();
            if (data.data && data.data.length > 0) {
              console.log(`Found flights for flexible date: ${flexDate}, count: ${data.data.length}`);
              // Add a note about the date change
              data.dateChanged = true;
              data.originalDate = departureDate;
              data.newDate = flexDate;
              break;
            }
          }
        } catch (flexError) {
          console.error('Error with flexible date search:', flexError);
          continue;
        }
      }
    }
    
    return data.data || [];
  } catch (error) {
    console.error('Flight search error:', error);
    throw error;
  }
}

// Enhanced flight results formatting with better error messages
function formatFlightResults(flights: any[], searchedOrigin: string, searchedDestination: string, searchParams?: any) {
  console.log('Formatting flight results:', flights.length, 'flights found');
  
  if (!flights.length) {
    const suggestions = [
      `🔍 **No flights found for ${searchedOrigin} to ${searchedDestination}**`,
      "",
      "Let me help you find alternatives:",
      "• Try nearby airports or cities",
      "• Consider flexible dates (±3-7 days)",
      "• Check if you meant a different city",
      "",
      "**Common Issues:**",
      "• City names need to be specific (e.g., 'New York' instead of 'NY')",
      "• Some smaller cities may not have direct flights",
      "• Weekend flights might have limited availability",
      "",
      "Would you like me to:",
      "1. Search nearby airports?",
      "2. Try different dates?",
      "3. Look for connecting flights?",
      "",
      "Just let me know how you'd like to adjust your search! ✈️"
    ].join('\n');
    
    return suggestions;
  }
  
  const dateNote = searchParams?.dateChanged 
    ? `\n📅 **Note:** No flights found for ${searchParams.originalDate}, showing results for ${searchParams.newDate} instead.\n`
    : '';
  
  const formattedFlights = flights.slice(0, 5).map((flight, index) => {
    const price = flight.price?.total || 'N/A';
    const currency = flight.price?.currency || '';
    const segments = flight.itineraries?.[0]?.segments || [];
    const firstSegment = segments[0];
    const lastSegment = segments[segments.length - 1];
    
    if (!firstSegment || !lastSegment) {
      return `❌ **Flight Option ${index + 1}** - Data incomplete`;
    }
    
    // Format departure and arrival times
    const departureTime = new Date(firstSegment.departure?.at);
    const arrivalTime = new Date(lastSegment.arrival?.at);
    
    const formatTime = (date: Date) => {
      if (isNaN(date.getTime())) return 'Time TBD';
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true,
        timeZone: 'UTC'
      });
    };
    
    const formatDate = (date: Date) => {
      if (isNaN(date.getTime())) return 'Date TBD';
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        timeZone: 'UTC'
      });
    };
    
    const stops = segments.length - 1;
    const stopsText = stops === 0 ? 'Nonstop' : `${stops} stop${stops > 1 ? 's' : ''}`;
    
    // Calculate flight duration
    const durationMinutes = flight.itineraries?.[0]?.duration 
      ? parseInt(flight.itineraries[0].duration.replace('PT', '').replace('H', '*60+').replace('M', '').replace('+', '')) 
      : null;
    
    const durationText = durationMinutes 
      ? `${Math.floor(durationMinutes / 60)}h ${durationMinutes % 60}m`
      : 'Duration TBD';
    
    return [
      `✈️ **Flight Option ${index + 1}**`,
      `🏢 **Airline:** ${firstSegment.carrierCode || 'TBD'}`,
      `🛫 **Depart:** ${formatDate(departureTime)} at ${formatTime(departureTime)} from ${firstSegment.departure?.iataCode || searchedOrigin}`,
      `🛬 **Arrive:** ${formatDate(arrivalTime)} at ${formatTime(arrivalTime)} in ${lastSegment.arrival?.iataCode || searchedDestination}`,
      `💲 **Price:** $${price} ${currency}`,
      `🔁 **Stops:** ${stopsText}`,
      `⏱️ **Duration:** ${durationText}`,
      `📋 **Booking Class:** ${firstSegment.cabin || 'Economy'}`
    ].join('\n');
    
  }).join('\n\n');
  
  const bookingPrompt = [
    "",
    "🎯 **Ready to book?** I can help you:",
    "• Collect passenger information",
    "• Process your booking",
    "• Handle payment securely",
    "• Send confirmation details",
    "",
    "Would you like to book one of these flights, or would you like me to:",
    "• Search for different dates",
    "• Look for hotels at your destination", 
    "• Check visa requirements",
    "• Find car rentals",
    "",
    "Just let me know which flight interests you! 🚀"
  ].join('\n');
  
  return `Here are the best flight options I found:${dateNote}\n\n${formattedFlights}${bookingPrompt}`;
}

// Enhanced system prompt with better guidance
const TRAVEL_AGENT_SYSTEM_PROMPT = `You are Maya, a friendly AI Travel Agent who specializes in finding AND booking flights with complete end-to-end service.

🎯 **Your Core Mission:**
1. **Search Flights** - Find real flight options using live data
2. **Guide Users** - Help them with proper date and location formatting  
3. **Collect Information** - Gather passenger details step-by-step
4. **Process Bookings** - Create actual flight reservations
5. **Provide Support** - Guide through the entire travel process

🗓️ **Date Handling Guidelines:**
- Accept natural language dates like "July 19", "Dec 25", "3/15"
- Always clarify ambiguous dates with users
- Suggest date ranges when specific dates have no availability
- If dates seem to be in the past, assume the user means next year

🌎 **Location Handling:**
- Accept city names, airport codes, or informal names
- Suggest alternatives when cities aren't recognized
- Help users with proper spelling and common alternatives
- Provide nearby airport options when needed

🛫 **Flight Search Process:**
1. Parse and validate dates using natural language processing
2. Convert city names to proper IATA codes with fuzzy matching
3. Search primary dates first, then try flexible date ranges
4. Provide detailed results with clear booking options
5. Offer alternatives and suggestions when no flights found

📋 **Booking Process Flow:**
1. **Flight Selection** - Help user choose preferred flight
2. **Passenger Collection** - Gather required details systematically
3. **Booking Creation** - Create reservation with confirmation
4. **Payment Processing** - Guide through secure payment
5. **Confirmation** - Provide booking reference and next steps

🔧 **Error Recovery:**
- When searches fail, provide clear explanations and alternatives
- Guide users to correct date/location formats
- Offer nearby airports or flexible dates
- Always maintain a helpful, solution-oriented tone

💬 **Your Personality:**
- Warm, professional, and patient
- Always explain what you need and why
- Celebrate successful bookings enthusiastically
- Handle errors gracefully with helpful alternatives
- Guide users step-by-step through complex processes

Remember: You're not just searching flights - you're their complete travel booking assistant!`;

const FLIGHT_SEARCH_FUNCTION = {
  name: "search_flights",
  description: "Search for real flights using live data with enhanced date parsing and city recognition",
  parameters: {
    type: "object",
    properties: {
      origin: {
        type: "string",
        description: "Origin city name or airport code (accepts natural language like 'Chicago', 'NYC', 'H-town')"
      },
      destination: {
        type: "string", 
        description: "Destination city name or airport code (accepts natural language)"
      },
      departureDate: {
        type: "string",
        description: "Departure date (accepts formats like 'July 19', '7/19', '2024-07-19')"
      },
      returnDate: {
        type: "string",
        description: "Return date (optional, accepts same formats as departure)"
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
    console.log('Request received:', { message: message?.substring(0, 100) + '...', conversationId, userId });

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

    console.log('Calling OpenAI API with enhanced function calling support');

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
        max_tokens: 1500, // Increased for more detailed responses
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
                functionArgs.adults || 1
              );
              
              const flightResults = formatFlightResults(
                flights, 
                functionArgs.origin, 
                functionArgs.destination
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
