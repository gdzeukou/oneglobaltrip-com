import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

// Retrieve stored flight data for booking
export async function getStoredFlightData(supabase: any, conversationId: string, flightId: string) {
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
export async function createFlightBooking(
  flightSelection: any, 
  passengers: any[], 
  userId: string, 
  conversationId: string,
  supabase: any
) {
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