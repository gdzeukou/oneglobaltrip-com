// Get Amadeus access token with better error handling
export async function getAmadeusToken(amadeusApiKey: string, amadeusApiSecret: string): Promise<string> {
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
export async function searchFlights(
  origin: string, 
  destination: string, 
  departureDate: string, 
  returnDate?: string, 
  adults: number = 1,
  amadeusApiKey?: string,
  amadeusApiSecret?: string
): Promise<any[]> {
  console.log('Starting flight search:', { origin, destination, departureDate, returnDate, adults });
  
  if (!amadeusApiKey || !amadeusApiSecret) {
    throw new Error('Amadeus API credentials not available');
  }
  
  try {
    const token = await getAmadeusToken(amadeusApiKey, amadeusApiSecret);
    
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