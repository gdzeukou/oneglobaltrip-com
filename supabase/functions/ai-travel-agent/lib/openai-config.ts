// Enhanced system prompt with better guidance
export const TRAVEL_AGENT_SYSTEM_PROMPT = `You are Maya, a friendly AI Travel Agent who specializes in finding AND booking flights with complete end-to-end service.

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

export const FLIGHT_SEARCH_FUNCTION = {
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

export const CREATE_FLIGHT_BOOKING_FUNCTION = {
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