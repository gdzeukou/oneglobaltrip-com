import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

// API keys from environment with enhanced debugging
const openAIApiKey = Deno.env.get('OPENAI_API_KEY') || Deno.env.get('SUPAGENT_OPENAI') || Deno.env.get('Supagent Openai');
const amadeusApiKey = Deno.env.get('AMADEUS_API_KEY');
const amadeusApiSecret = Deno.env.get('AMADEUS_API_SECRET');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

// Enhanced API key validation and logging
console.log('🔧 Maya AI Travel Agent - Initializing...');
console.log('📋 API Key Status Check:');
console.log('  ✅ OpenAI API Key:', openAIApiKey ? `Found (${openAIApiKey.substring(0, 8)}...)` : '❌ Missing');
console.log('  ✅ Amadeus API Key:', amadeusApiKey ? `Found (${amadeusApiKey.substring(0, 8)}...)` : '❌ Missing');
console.log('  ✅ Amadeus Secret:', amadeusApiSecret ? `Found (${amadeusApiSecret.substring(0, 8)}...)` : '❌ Missing');
console.log('  ✅ Supabase URL:', supabaseUrl ? 'Found' : '❌ Missing');
console.log('  ✅ Supabase Service Key:', supabaseServiceKey ? 'Found' : '❌ Missing');

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
      `📋 **Booking Class:** ${firstSegment.cabin || 'Economy'}`,
      `🎫 **Flight ID:** ${flight.id || `FLIGHT_${index + 1}`}` // Add unique identifier for booking
    ].join('\n');
    
  }).join('\n\n');

  const bookingPrompt = [
    "",
    "🎯 **Ready to book?** To proceed with booking, please tell me:",
    "• Which flight option you'd like (e.g., 'Flight Option 1')",
    "• Passenger details (name, email, phone, date of birth, nationality)",
    "• Any special requests or preferences",
    "",
    "I'll guide you through the booking process step by step! 🚀"
  ].join('\n');
  
  return `Here are the best flight options I found:${dateNote}\n\n${formattedFlights}${bookingPrompt}`;
}

// Transform Amadeus flight data to booking format
function transformFlightDataForBooking(flight: any, searchParams: any) {
  console.log('Transforming flight data for booking:', { flightId: flight.id, searchParams });
  
  if (!flight || !flight.itineraries || !flight.itineraries[0]) {
    console.error('Invalid flight data structure:', flight);
    return null;
  }

  const firstItinerary = flight.itineraries[0];
  const segments = firstItinerary.segments || [];
  const firstSegment = segments[0];
  const lastSegment = segments[segments.length - 1];

  if (!firstSegment || !lastSegment) {
    console.error('Missing flight segments:', { firstSegment, lastSegment });
    return null;
  }

  const transformedData = {
    flightId: flight.id,
    origin: firstSegment.departure?.iataCode || searchParams.origin,
    destination: lastSegment.arrival?.iataCode || searchParams.destination,
    departureDate: firstSegment.departure?.at ? firstSegment.departure.at.split('T')[0] : searchParams.departureDate,
    returnDate: searchParams.returnDate || null,
    airline: firstSegment.carrierCode,
    flightNumbers: segments.map((seg: any) => `${seg.carrierCode}${seg.number}`),
    price: {
      total: parseFloat(flight.price?.total || '0'),
      currency: flight.price?.currency || 'USD'
    },
    itinerary: flight.itineraries,
    segments: segments,
    duration: firstItinerary.duration,
    stops: segments.length - 1,
    bookingClass: firstSegment.cabin || 'Economy'
  };

  console.log('Transformed flight data:', transformedData);
  return transformedData;
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
4. Provide detailed results with clear booking options including Flight IDs
5. Offer alternatives and suggestions when no flights found

📋 **Booking Process Flow:**
1. **Flight Selection** - User selects specific flight by Flight ID
2. **Data Validation** - Verify flight data exists and is complete
3. **Passenger Collection** - Gather required details systematically
4. **Booking Creation** - Create reservation with confirmation
5. **Confirmation** - Provide booking reference and next steps

🔧 **Error Recovery:**
- When searches fail, provide clear explanations and alternatives
- Guide users to correct date/location formats
- Always validate data before attempting bookings
- Provide helpful error messages when data is missing

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
  description: "Create a flight booking with passenger information and validated flight details",
  parameters: {
    type: "object",
    properties: {
      flightSelection: {
        type: "object",
        description: "Selected flight information from search results",
        properties: {
          flightId: { type: "string", description: "Unique flight identifier from search results" },
          origin: { type: "string", description: "Origin airport code" },
          destination: { type: "string", description: "Destination airport code" },
          departureDate: { type: "string", description: "Departure date in YYYY-MM-DD format" },
          returnDate: { type: "string", description: "Return date in YYYY-MM-DD format (optional)" },
          airline: { type: "string", description: "Airline code" },
          flightNumbers: { type: "array", description: "Array of flight numbers" },
          price: { 
            type: "object", 
            properties: {
              total: { type: "number", description: "Total price" },
              currency: { type: "string", description: "Currency code" }
            }
          }
        },
        required: ["flightId", "origin", "destination", "departureDate", "price"]
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
      }
    },
    required: ["flightSelection", "passengers"]
  }
};

// Retrieve stored flight data for booking
async function getStoredFlightData(conversationId: string, flightId: string) {
  console.log('Retrieving stored flight data for:', { conversationId, flightId });
  
  try {
    const { data: storedMessages } = await supabase
      .from('chat_messages')
      .select('metadata')
      .eq('conversation_id', conversationId)
      .eq('content', 'FLIGHT_SEARCH_RESULTS')
      .order('created_at', { ascending: false })
      .limit(5); // Get recent search results
    
    if (!storedMessages || storedMessages.length === 0) {
      console.log('No stored flight data found');
      return null;
    }
    
    // Look for the specific flight in stored results
    for (const message of storedMessages) {
      const metadata = message.metadata;
      if (metadata?.searchResults) {
        const flight = metadata.searchResults.find((f: any) => f.id === flightId);
        if (flight) {
          console.log('Found matching flight in stored data:', flight.id);
          return {
            flight: flight,
            searchContext: metadata.searchContext
          };
        }
      }
    }
    
    console.log('Flight ID not found in stored data:', flightId);
    return null;
  } catch (error) {
    console.error('Error retrieving stored flight data:', error);
    return null;
  }
}

// Enhanced flight booking function with proper validation
async function createFlightBooking(flightSelection: any, passengers: any[], userId: string, conversationId: string) {
  console.log('Creating flight booking with data:', { 
    flightSelection, 
    passengerCount: passengers?.length, 
    userId, 
    conversationId 
  });

  try {
    // Validate required data
    if (!flightSelection) {
      console.error('Flight selection is missing');
      return {
        success: false,
        error: 'Flight selection data is required. Please select a flight first.'
      };
    }

    if (!flightSelection.departureDate) {
      console.error('Departure date is missing from flight selection:', flightSelection);
      return {
        success: false,
        error: 'Flight departure date is missing. Please search for flights again and select a valid option.'
      };
    }

    if (!flightSelection.price || typeof flightSelection.price.total !== 'number') {
      console.error('Invalid price data:', flightSelection.price);
      return {
        success: false,
        error: 'Flight price information is invalid. Please search for flights again.'
      };
    }

    if (!passengers || !Array.isArray(passengers) || passengers.length === 0) {
      console.error('Invalid passenger data:', passengers);
      return {
        success: false,
        error: 'Passenger information is required. Please provide passenger details.'
      };
    }

    // Validate passenger data
    for (let i = 0; i < passengers.length; i++) {
      const passenger = passengers[i];
      const requiredFields = ['title', 'firstName', 'lastName', 'dateOfBirth', 'nationality', 'email', 'phone'];
      
      for (const field of requiredFields) {
        if (!passenger[field]) {
          return {
            success: false,
            error: `Missing required field '${field}' for passenger ${i + 1}. Please provide all required passenger information.`
          };
        }
      }
    }

    console.log('All validation passed, creating booking...');

    // Create the main booking record
    const bookingData = {
      user_id: userId,
      conversation_id: conversationId,
      total_amount: flightSelection.price.total,
      currency: flightSelection.price.currency || 'USD',
      flight_data: {
        flightId: flightSelection.flightId,
        origin: flightSelection.origin,
        destination: flightSelection.destination,
        airline: flightSelection.airline,
        flightNumbers: flightSelection.flightNumbers || [],
        bookingClass: flightSelection.bookingClass || 'Economy',
        duration: flightSelection.duration,
        stops: flightSelection.stops || 0
      },
      departure_date: flightSelection.departureDate,
      return_date: flightSelection.returnDate || null,
      origin_airport: flightSelection.origin,
      destination_airport: flightSelection.destination,
      airline_code: flightSelection.airline || null,
      flight_numbers: flightSelection.flightNumbers || null,
      passenger_count: passengers.length,
      booking_status: 'confirmed' // For now, we'll mark as confirmed (payment integration comes later)
    };

    console.log('Inserting booking with data:', bookingData);

    const { data: booking, error: bookingError } = await supabase
      .from('flight_bookings')
      .insert(bookingData)
      .select()
      .single();

    if (bookingError) {
      console.error('Error creating booking:', bookingError);
      return {
        success: false,
        error: `Failed to create booking: ${bookingError.message}`
      };
    }

    console.log('Booking created successfully:', booking.id);

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

    console.log('Inserting passengers:', passengerInserts);

    const { error: passengersError } = await supabase
      .from('booking_passengers')
      .insert(passengerInserts);

    if (passengersError) {
      console.error('Error creating passengers:', passengersError);
      // Rollback booking if passengers fail
      await supabase.from('flight_bookings').delete().eq('id', booking.id);
      return {
        success: false,
        error: `Failed to create passenger records: ${passengersError.message}`
      };
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
      error: `Booking creation failed: ${error.message}`
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
        JSON.stringify({ 
          response: '🔑 **Configuration Issue**: My AI system isn\'t properly configured right now.\n\n**What this means:**\n• My OpenAI connection needs to be set up by an administrator\n• I can\'t process your travel requests until this is fixed\n\n**What you can do:**\n• Contact support to resolve this configuration issue\n• This is a technical problem that needs admin attention\n• Try again later once the issue is resolved\n\nI apologize for the inconvenience! Once this is fixed, I\'ll be ready to help you plan amazing trips! 🌟',
          error: true,
          errorType: 'api_configuration'
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!amadeusApiKey || !amadeusApiSecret) {
      console.error('Amadeus API credentials not found');
      return new Response(
        JSON.stringify({ 
          response: '✈️ **Flight Search Unavailable**: My flight booking service isn\'t configured properly.\n\n**What this means:**\n• I can\'t search for flights or make bookings right now\n• My Amadeus API connection needs admin setup\n\n**What you can do:**\n• Contact support to report this configuration issue\n• I can still help with travel advice and planning\n• Try flight searches again once this is resolved\n\nI\'m sorry I can\'t search flights right now, but I\'m here for any other travel questions! 🗺️',
          error: true,
          errorType: 'flight_api_configuration'
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
                functionArgs.adults || 1
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
            const storedData = await getStoredFlightData(currentConversationId, flightSelectionData.flightId);
            
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
              continue;
            }
          }
          
          const bookingResult = await createFlightBooking(
            flightSelectionData,
            functionArgs.passengers,
            userId,
            currentConversationId
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
