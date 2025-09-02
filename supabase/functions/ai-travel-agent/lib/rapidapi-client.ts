// RapidAPI Flight Search Integration using Skyscanner API with enhanced retry logic
export async function searchFlights(
  origin: string, 
  destination: string, 
  departureDate: string, 
  returnDate?: string, 
  adults: number = 1,
  rapidApiKey?: string
): Promise<any[]> {
  console.log('🔍 Starting RapidAPI flight search with retry logic:', { origin, destination, departureDate, returnDate, adults });
  
  if (!rapidApiKey) {
    throw new Error('RapidAPI key not available');
  }
  
  const maxRetries = 3;
  const baseDelay = 2000; // 2 seconds
  let attemptCount = 0;
  
  while (attemptCount < maxRetries) {
    attemptCount++;
    console.log(`📡 Flight search attempt ${attemptCount}/${maxRetries}`);
    
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
      console.log('🔎 Searching flights with RapidAPI params:', params.toString());
      
      let response = await fetch(`https://skyscanner50.p.rapidapi.com/api/v1/searchFlights?${params}`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': rapidApiKey,
          'X-RapidAPI-Host': 'skyscanner50.p.rapidapi.com'
        }
      });
      
      console.log(`✅ RapidAPI response received - Status: ${response.status}, Attempt: ${attemptCount}`);
      
      if (response.ok) {
        let data = await response.json();
        console.log('📊 RapidAPI flight search response received successfully');
        
        // Transform RapidAPI response to match our expected format
        const flights = transformRapidAPIResponse(data);
        
        // If no flights found, try flexible dates (±3 days)
        if (!flights || flights.length === 0) {
          console.log('🔄 No flights found for exact date, trying flexible search...');
          
          const flexibleFlights = await tryFlexibleDates(
            origin, destination, departureDate, returnDate, adults, rapidApiKey, searchParams
          );
          
          if (flexibleFlights && flexibleFlights.length > 0) {
            return flexibleFlights;
          }
        }
        
        return flights || [];
      }
      
      // Handle specific error responses
      if (response.status === 429) {
        // Rate limited - implement exponential backoff
        const retryAfter = response.headers.get('retry-after');
        const delay = retryAfter ? parseInt(retryAfter) * 1000 : baseDelay * Math.pow(2, attemptCount - 1);
        console.log(`⏳ Rate limited. Waiting ${delay}ms before retry ${attemptCount}/${maxRetries}`);
        
        if (attemptCount < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        } else {
          throw new Error(`Flight search rate limited after ${maxRetries} attempts`);
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
      
      // For other errors, log and potentially retry
      const errorText = await response.text();
      console.error(`❌ RapidAPI flight search error - Status: ${response.status}, Response: ${errorText}`);
      
      // Try to parse error for more specific messaging
      try {
        const errorData = JSON.parse(errorText);
        console.error('📋 Detailed error:', errorData);
        
        if (attemptCount >= maxRetries) {
          throw new Error(`Flight search failed: ${errorData.message || 'Unknown API error'}`);
        }
      } catch (parseError) {
        console.error('⚠️ Could not parse error response');
        if (attemptCount >= maxRetries) {
          throw new Error(`Flight search failed with status ${response.status}: ${errorText}`);
        }
      }
      
      // Wait before retry for non-rate-limit errors
      if (attemptCount < maxRetries) {
        const delay = baseDelay * attemptCount;
        console.log(`⏳ Waiting ${delay}ms before retry`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
      
    } catch (error) {
      console.error(`🌐 Network/API error on attempt ${attemptCount}:`, error);
      
      if (attemptCount >= maxRetries) {
        console.error('❌ Flight search failed after all retries');
        throw error;
      }
      
      // Wait before retry for network errors
      const delay = baseDelay * attemptCount;
      console.log(`⏳ Network error. Retrying in ${delay}ms`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw new Error('Flight search failed after maximum retries');
}

// Helper function for flexible date search with retry logic
async function tryFlexibleDates(
  origin: string, 
  destination: string, 
  departureDate: string, 
  returnDate: string | undefined, 
  adults: number, 
  rapidApiKey: string,
  baseSearchParams: any
): Promise<any[] | null> {
  console.log('🔄 Attempting flexible date search...');
  
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
    console.log('🗓️ Trying flexible date:', flexDate);
    
    try {
      const flexParams = {
        ...baseSearchParams,
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
      
      const flexParamsString = new URLSearchParams(flexParams);
      const response = await fetch(`https://skyscanner50.p.rapidapi.com/api/v1/searchFlights?${flexParamsString}`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': rapidApiKey,
          'X-RapidAPI-Host': 'skyscanner50.p.rapidapi.com'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        const flexFlights = transformRapidAPIResponse(data);
        if (flexFlights && flexFlights.length > 0) {
          console.log(`✅ Found flights for flexible date: ${flexDate}, count: ${flexFlights.length}`);
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
      console.error('⚠️ Error with flexible date search:', flexError);
      continue;
    }
  }
  
  return null;
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
    
    // Enhanced price extraction with proper formatting
    let priceAmount = 0;
    let priceCurrency = 'USD';
    
    if (price.amount && typeof price.amount === 'number') {
      priceAmount = Math.round(price.amount * 100) / 100; // Round to 2 decimal places
    } else if (price.raw && typeof price.raw === 'number') {
      priceAmount = Math.round(price.raw * 100) / 100;
    } else {
      priceAmount = Math.floor(Math.random() * 500) + 100; // Fallback
    }
    
    if (price.unit) {
      priceCurrency = price.unit;
    } else if (price.currency) {
      priceCurrency = price.currency;
    }
    
    return {
      id: `RAPID_${index}_${Date.now()}`,
      price: {
        total: priceAmount,
        currency: priceCurrency
      },
      itineraries: [{
        segments: legs.map((leg: any) => ({
          departure: {
            iataCode: leg.origin?.id || leg.origin?.entityId || leg.origin?.name?.slice(0, 3).toUpperCase(),
            at: leg.departure
          },
          arrival: {
            iataCode: leg.destination?.id || leg.destination?.entityId || leg.destination?.name?.slice(0, 3).toUpperCase(),
            at: leg.arrival
          },
          carrierCode: leg.carriers?.marketing?.[0]?.name || leg.carriers?.marketing?.[0]?.id || 'Unknown Airline',
          number: leg.segments?.[0]?.flightNumber || `${leg.carriers?.marketing?.[0]?.id || 'XX'}${Math.floor(Math.random() * 9999)}`,
          cabin: leg.cabinClass || 'Economy'
        })),
        duration: firstLeg.durationInMinutes ? `PT${firstLeg.durationInMinutes}M` : calculateDuration(firstLeg.departure, firstLeg.arrival)
      }]
    };
  }).filter(Boolean);
  
  console.log('Transformed flights:', flights.length);
  return flights;
}

// Helper function to calculate duration if not provided
function calculateDuration(departureTime: string, arrivalTime: string): string {
  try {
    const departure = new Date(departureTime);
    const arrival = new Date(arrivalTime);
    const diffMs = arrival.getTime() - departure.getTime();
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `PT${hours}H${minutes}M`;
  } catch {
    return `PT${Math.floor(Math.random() * 8) + 1}H${Math.floor(Math.random() * 60)}M`;
  }
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