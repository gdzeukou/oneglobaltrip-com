// Enhanced flight results formatting with better error messages
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