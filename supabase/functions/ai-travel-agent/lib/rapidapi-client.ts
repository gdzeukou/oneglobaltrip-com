// RapidAPI Flight Search Integration using Skyscanner API
export async function searchFlights(
  origin: string, 
  destination: string, 
  departureDate: string, 
  returnDate?: string, 
  adults: number = 1,
  rapidApiKey?: string
): Promise<any[]> {
  console.log('Starting RapidAPI flight search:', { origin, destination, departureDate, returnDate, adults });
  
  if (!rapidApiKey) {
    throw new Error('RapidAPI key not available');
  }
  
  try {
    // First, search for flights using Skyscanner API via RapidAPI
    const searchParams = {
      originSkyId: origin,
      destinationSkyId: destination,
      originEntityId: origin,
      destinationEntityId: destination,
      departureDate,
      adults: adults.toString(),
      currency: 'USD',
      market: 'US',
      locale: 'en-US'
    };
    
    if (returnDate) {
      searchParams.returnDate = returnDate;
    }
    
    const params = new URLSearchParams(searchParams);
    console.log('Searching flights with RapidAPI params:', params.toString());
    
    let response = await fetch(`https://skyscanner50.p.rapidapi.com/api/v1/searchFlights?${params}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': rapidApiKey,
        'X-RapidAPI-Host': 'skyscanner50.p.rapidapi.com'
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('RapidAPI flight search error:', response.status, errorText);
      
      // Try to parse error for more specific messaging
      try {
        const errorData = JSON.parse(errorText);
        console.error('Detailed error:', errorData);
        throw new Error(`Flight search failed: ${errorData.message || 'Unknown error'}`);
      } catch (parseError) {
        console.error('Could not parse error response');
      }
      
      throw new Error(`Flight search failed with status ${response.status}: ${errorText}`);
    }
    
    let data = await response.json();
    console.log('RapidAPI flight search response received');
    
    // Transform RapidAPI response to match our expected format
    const flights = transformRapidAPIResponse(data);
    
    // If no flights found, try flexible dates (±3 days)
    if (!flights || flights.length === 0) {
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
        
        const flexParams = {
          ...searchParams,
          departureDate: flexDate
        };
        
        if (returnDate) {
          const originalReturn = new Date(returnDate);
          const originalDeparture = new Date(departureDate);
          const daysDiff = Math.floor((originalReturn.getTime() - originalDeparture.getTime()) / (1000 * 60 * 60 * 24));
          const flexReturn = new Date(flexDate);
          flexReturn.setDate(flexReturn.getDate() + daysDiff);
          flexParams.returnDate = flexReturn.toISOString().split('T')[0];
        }
        
        try {
          const flexParamsString = new URLSearchParams(flexParams);
          response = await fetch(`https://skyscanner50.p.rapidapi.com/api/v1/searchFlights?${flexParamsString}`, {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': rapidApiKey,
              'X-RapidAPI-Host': 'skyscanner50.p.rapidapi.com'
            }
          });
          
          if (response.ok) {
            data = await response.json();
            const flexFlights = transformRapidAPIResponse(data);
            if (flexFlights && flexFlights.length > 0) {
              console.log(`Found flights for flexible date: ${flexDate}, count: ${flexFlights.length}`);
              // Add a note about the date change
              return flexFlights.map(flight => ({
                ...flight,
                dateChanged: true,
                originalDate: departureDate,
                newDate: flexDate
              }));
            }
          }
        } catch (flexError) {
          console.error('Error with flexible date search:', flexError);
          continue;
        }
      }
    }
    
    return flights || [];
  } catch (error) {
    console.error('RapidAPI flight search error:', error);
    throw error;
  }
}

// Transform RapidAPI Skyscanner response to match our expected format
function transformRapidAPIResponse(data: any): any[] {
  console.log('Transforming RapidAPI response:', data);
  
  if (!data || !data.data || !data.data.itineraries) {
    console.log('No itineraries found in response');
    return [];
  }
  
  const flights = data.data.itineraries.map((itinerary: any, index: number) => {
    const legs = itinerary.legs || [];
    const firstLeg = legs[0];
    const pricing = itinerary.pricing || {};
    const price = pricing.price || {};
    
    if (!firstLeg) {
      console.warn('No legs found in itinerary:', itinerary);
      return null;
    }
    
    return {
      id: `RAPID_${index}_${Date.now()}`,
      price: {
        total: price.amount || 0,
        currency: price.unit || 'USD'
      },
      itineraries: [{
        segments: legs.map((leg: any) => ({
          departure: {
            iataCode: leg.origin?.id || leg.origin?.entityId,
            at: leg.departure
          },
          arrival: {
            iataCode: leg.destination?.id || leg.destination?.entityId,
            at: leg.arrival
          },
          carrierCode: leg.carriers?.marketing?.[0]?.id || 'Unknown',
          number: leg.segments?.[0]?.flightNumber || 'N/A',
          cabin: leg.cabinClass || 'Economy'
        })),
        duration: firstLeg.durationInMinutes ? `PT${firstLeg.durationInMinutes}M` : null
      }]
    };
  }).filter(Boolean);
  
  console.log('Transformed flights:', flights.length);
  return flights;
}

// Search for hotels using Booking.com API via RapidAPI
export async function searchHotels(
  destination: string,
  checkInDate: string,
  checkOutDate: string,
  adults: number = 1,
  rapidApiKey?: string
): Promise<any[]> {
  console.log('Starting RapidAPI hotel search:', { destination, checkInDate, checkOutDate, adults });
  
  if (!rapidApiKey) {
    throw new Error('RapidAPI key not available');
  }
  
  try {
    const params = new URLSearchParams({
      dest_id: destination,
      search_type: 'city',
      arrival_date: checkInDate,
      departure_date: checkOutDate,
      adults: adults.toString(),
      room_qty: '1',
      units: 'metric',
      temperature_unit: 'c',
      languagecode: 'en-us',
      currency_code: 'USD'
    });
    
    console.log('Searching hotels with RapidAPI params:', params.toString());
    
    const response = await fetch(`https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels?${params}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': rapidApiKey,
        'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com'
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('RapidAPI hotel search error:', response.status, errorText);
      throw new Error(`Hotel search failed with status ${response.status}: ${errorText}`);
    }
    
    const data = await response.json();
    console.log('RapidAPI hotel search response received');
    
    return transformHotelResponse(data);
  } catch (error) {
    console.error('RapidAPI hotel search error:', error);
    throw error;
  }
}

// Transform hotel response to standardized format
function transformHotelResponse(data: any): any[] {
  console.log('Transforming hotel response:', data);
  
  if (!data || !data.data || !data.data.hotels) {
    console.log('No hotels found in response');
    return [];
  }
  
  return data.data.hotels.map((hotel: any, index: number) => ({
    id: `HOTEL_${index}_${Date.now()}`,
    name: hotel.property?.name,
    address: hotel.property?.wishlistName,
    price: {
      total: hotel.property?.priceBreakdown?.grossPrice?.value || 0,
      currency: hotel.property?.priceBreakdown?.grossPrice?.currency || 'USD'
    },
    rating: hotel.property?.reviewScore || 0,
    image: hotel.property?.photoUrls?.[0],
    amenities: hotel.property?.facilities || []
  })).filter(hotel => hotel.name);
}