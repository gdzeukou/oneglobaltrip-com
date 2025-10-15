// Enhanced flight results formatting with better error handling and price display
export function formatFlightResults(flights: any[], searchedOrigin: string, searchedDestination: string, searchParams?: any): string {
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
    // Enhanced price formatting with proper error handling
    const priceDisplay = formatPrice(flight.price);
    const segments = flight.itineraries?.[0]?.segments || [];
    const firstSegment = segments[0];
    const lastSegment = segments[segments.length - 1];
    
    if (!firstSegment || !lastSegment) {
      return `❌ **Flight Option ${index + 1}** - Data incomplete`;
    }

    // Enhanced time formatting
    const departureTime = formatFlightTime(firstSegment.departure?.at);
    const arrivalTime = formatFlightTime(lastSegment.arrival?.at);

    const stops = segments.length - 1;
    const stopsText = stops === 0 ? 'Nonstop' : `${stops} stop${stops > 1 ? 's' : ''}`;
    
    // Enhanced duration calculation
    const durationText = formatDuration(flight.itineraries?.[0]?.duration);

    return [
      `✈️ **Flight Option ${index + 1}**`,
      `🏢 **Airline:** ${firstSegment.carrierCode || 'TBD'}`,
      `🛫 **Depart:** ${departureTime} from ${firstSegment.departure?.iataCode || searchedOrigin}`,
      `🛬 **Arrive:** ${arrivalTime} in ${lastSegment.arrival?.iataCode || searchedDestination}`,
      `💲 **Price:** ${priceDisplay}`,
      `🔁 **Stops:** ${stopsText}`,
      `⏱️ **Duration:** ${durationText}`,
      `📋 **Class:** ${firstSegment.cabin || 'Economy'}`,
      `🎫 **Flight ID:** ${flight.id || `FLIGHT_${index + 1}`}`
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

// Helper function to format flight times with proper error handling
function formatFlightTime(timeString: string): string {
  if (!timeString) return 'Time TBD';
  
  try {
    const date = new Date(timeString);
    if (isNaN(date.getTime())) return 'Time TBD';
    
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'UTC'
    });
  } catch {
    return timeString;
  }
}

// Helper function to format price with comprehensive error handling for multiple API formats
function formatPrice(price: any): string {
  if (!price) return 'Price not available';
  
  try {
    let amount: number;
    let currency = 'USD';
    
    if (typeof price === 'number') {
      amount = price;
    } else if (typeof price === 'string') {
      // Handle string prices like "199.99" or "$199.99 USD"
      const cleanPrice = price.replace(/[^0-9.]/g, '');
      amount = parseFloat(cleanPrice);
      const currencyMatch = price.match(/[A-Z]{3}/);
      if (currencyMatch) currency = currencyMatch[0];
    } else if (typeof price === 'object') {
      // Handle various object formats from different APIs
      amount = price.total || price.amount || price.value || price.raw || price.price || price.grandTotal;
      currency = price.currency || price.unit || price.currencyCode || currency;
      
      if (amount === undefined || amount === null) {
        return 'Price not available';
      }
    } else {
      return 'Price not available';
    }
    
    // Ensure amount is a valid number
    const numAmount = Number(amount);
    if (isNaN(numAmount)) {
      return 'Price not available';
    }
    
    // Format with proper currency symbol
    const currencySymbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : currency;
    return `${currencySymbol}${numAmount.toFixed(2)} ${currency}`;
  } catch (error) {
    console.error('Error formatting price:', error, price);
    return 'Price not available';
  }
}

// Helper function to format duration
function formatDuration(duration: string): string {
  if (!duration) return 'Duration TBD';
  
  try {
    // Handle PT format (e.g., PT2H30M)
    if (duration.startsWith('PT')) {
      const hours = duration.match(/(\d+)H/)?.[1] || '0';
      const minutes = duration.match(/(\d+)M/)?.[1] || '0';
      return `${hours}h ${minutes}m`;
    }
    
    // Handle minutes format
    if (typeof duration === 'number' || !isNaN(Number(duration))) {
      const totalMinutes = Number(duration);
      const hours = Math.floor(totalMinutes / 60);
      const mins = totalMinutes % 60;
      return `${hours}h ${mins}m`;
    }
    
    return duration;
  } catch {
    return 'Duration TBD';
  }
}

// Transform Amadeus flight data to booking format
export function transformFlightDataForBooking(flight: any, searchParams: any) {
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