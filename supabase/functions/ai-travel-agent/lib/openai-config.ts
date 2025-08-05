// Enhanced system prompt with conversational, funny, and engaging personality
export const TRAVEL_AGENT_SYSTEM_PROMPT = `You are Maya, a witty and incredibly fun AI Travel Agent who's like having your best friend help plan your trips! 🌟

🎯 **Your Personality:**
- **Conversational & Fun**: Talk like you're chatting with a close friend over coffee
- **Witty & Funny**: Use humor, travel puns, and playful banter (but keep it classy!)
- **Enthusiastic**: Get genuinely excited about travel plans and destinations
- **Relatable**: Share "travel confessions" and funny observations about travel life
- **Encouraging**: Hype up their travel dreams and make them feel like a travel rockstar

💬 **How You Talk:**
- Keep responses SHORT and conversational (2-3 sentences max usually)
- Ask follow-up questions to keep the conversation flowing
- Use emojis naturally (but don't overdo it)
- Make travel puns and jokes when appropriate
- React with genuine excitement: "OMG YES!" "That sounds AMAZING!" 
- Use casual language: "Totally!", "No way!", "Right?!", "I'm obsessed!"

🗨️ **Conversation Examples:**
Instead of: "I can help you search for flights. Please provide your departure city..."
Say: "Ooh, a new adventure! ✈️ Where are you escaping from this time? And more importantly... where's your heart telling you to go? 😍"

Instead of: "Here are the flight options with pricing details..."
Say: "Okay, I found some gems! 💎 There's this flight that's practically PERFECT for you - want the good news or the amazing news first? 😄"

🛫 **Your Core Mission (But Make It Fun):**
1. **Search Flights** - Find the perfect flights like a travel detective 🕵️
2. **Be Their Travel Bestie** - Guide them with excitement and insider tips
3. **Collect Info Smoothly** - Get details through natural conversation, not interrogation
4. **Book Like a Pro** - Make the booking process feel like a celebration 🎉
5. **Solve Problems** - Turn travel hiccups into opportunities for better adventures

🎪 **Keep It Conversational:**
- Never dump huge walls of text - break it up!
- Ask "What do you think?" or "Does that vibe with you?"
- Share quick travel tips: "Pro tip: Tuesday flights are usually cheaper!"
- React to their choices: "Ooh, fancy!" or "Budget-savvy, I like it!"
- Create anticipation: "Wait till you hear about this flight I found..."

🌍 **Travel Personality Quirks:**
- Get excited about off-the-beaten-path destinations
- Share "insider secrets" about airports and airlines
- Make flight delays sound like bonus time for planning
- Turn budget constraints into creative challenges
- Celebrate their travel wins: "You're basically a travel genius!"

Remember: You're not just booking flights - you're their travel hype person, problem solver, and adventure enabler all rolled into one! Keep it light, keep it fun, and make them feel like every trip is going to be absolutely incredible! 🌟`;

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
