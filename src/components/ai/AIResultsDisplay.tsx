import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import SearchResultsContainer from '@/components/travel/results/SearchResultsContainer';
import AIResultsLoadingSkeleton from './AIResultsLoadingSkeleton';
import type { FlightResult } from '@/components/travel/results/FlightResultCard';
import type { HotelResult } from '@/components/travel/results/HotelResultCard';
import type { CarRentalResult } from '@/components/travel/results/CarRentalCard';

interface AIResultsDisplayProps {
  conversationId: string;
  onFlightSelect?: (flight: FlightResult) => void;
  onHotelSelect?: (hotel: HotelResult) => void;
  onCarSelect?: (car: CarRentalResult) => void;
}

const AIResultsDisplay: React.FC<AIResultsDisplayProps> = ({
  conversationId,
  onFlightSelect,
  onHotelSelect,
  onCarSelect
}) => {
  const [flights, setFlights] = useState<FlightResult[]>([]);
  const [hotels, setHotels] = useState<HotelResult[]>([]);
  const [carRentals, setCarRentals] = useState<CarRentalResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'flights' | 'hotels' | 'cars'>('flights');

  useEffect(() => {
    if (conversationId) {
      fetchSearchResults();
    }
  }, [conversationId]);

  const fetchSearchResults = async () => {
    setLoading(true);
    try {
      console.log('🔍 Fetching search results for conversation:', conversationId);
      
      // Fetch the latest search results from the conversation
      const { data: messages, error } = await supabase
        .from('chat_messages')
        .select('content, metadata, created_at')
        .eq('conversation_id', conversationId)
        .eq('role', 'assistant')
        .in('content', ['FLIGHT_SEARCH_RESULTS', 'HOTEL_SEARCH_RESULTS', 'CAR_SEARCH_RESULTS'])
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error fetching search results:', error);
        return;
      }

      console.log('📊 Found search result messages:', messages?.length || 0);
      console.log('📝 Messages details:', messages);

      // Reset all results first
      setFlights([]);
      setHotels([]);
      setCarRentals([]);

      // Process and transform the search results
      messages?.forEach(message => {
        console.log('🔍 Processing message:', message.content, message.metadata);
        const metadata = message.metadata as any;
        
        if (message.content === 'FLIGHT_SEARCH_RESULTS' && metadata?.searchResults) {
          console.log('✈️ Processing flight results:', metadata.searchResults);
          const transformedFlights = transformFlightsForDisplay(metadata.searchResults);
          console.log('✅ Transformed flights:', transformedFlights);
          setFlights(transformedFlights);
          setActiveTab('flights');
        }
        
        if (message.content === 'HOTEL_SEARCH_RESULTS' && metadata?.searchResults) {
          console.log('🏨 Processing hotel results:', metadata.searchResults);
          const transformedHotels = transformHotelsForDisplay(metadata.searchResults);
          console.log('✅ Transformed hotels:', transformedHotels);
          setHotels(transformedHotels);
          setActiveTab('hotels');
        }
        
        if (message.content === 'CAR_SEARCH_RESULTS' && metadata?.searchResults) {
          console.log('🚗 Processing car results:', metadata.searchResults);
          const transformedCars = transformCarsForDisplay(metadata.searchResults);
          console.log('✅ Transformed cars:', transformedCars);
          setCarRentals(transformedCars);
          setActiveTab('cars');
        }
      });

      console.log('🎯 Final results - Flights:', flights.length, 'Hotels:', hotels.length, 'Cars:', carRentals.length);

    } catch (error) {
      console.error('Error processing search results:', error);
    } finally {
      setLoading(false);
    }
  };

  const transformFlightsForDisplay = (flights: any[]): FlightResult[] => {
    console.log('🔄 Transforming flights for display:', flights);
    
    return flights.map(flight => {
      console.log('🔄 Processing flight:', flight);
      
      // Handle the date/time format from the database
      const formatDateTime = (date: string, time: string) => {
        try {
          if (date && time) {
            return new Date(`${date}T${time}:00`).toISOString();
          }
          // Fallback to current time
          return new Date().toISOString();
        } catch (error) {
          console.warn('Date parsing error:', error, 'date:', date, 'time:', time);
          return new Date().toISOString();
        }
      };

      const transformedFlight = {
        id: flight.id || Math.random().toString(),
        airline: {
          code: flight.airlineCode || flight.airline?.substring(0, 2).toUpperCase() || 'XX',
          name: flight.airline || 'Unknown Airline',
          logo: getAirlineLogo(flight.airlineCode || flight.airline)
        },
        departure: {
          airport: flight.departure?.airport || flight.origin || 'Unknown',
          code: flight.departure?.code || flight.origin || 'XXX',
          time: formatDateTime(flight.departure?.date, flight.departure?.time),
          terminal: flight.departure?.terminal
        },
        arrival: {
          airport: flight.arrival?.airport || flight.destination || 'Unknown',
          code: flight.arrival?.code || flight.destination || 'XXX',
          time: formatDateTime(flight.arrival?.date, flight.arrival?.time),
          terminal: flight.arrival?.terminal
        },
        duration: flight.duration || '2h 30m',
        stops: flight.stops || 0,
        layovers: flight.layovers || [],
        price: {
          amount: flight.price || flight.totalPrice || 0,
          currency: flight.currency || 'USD'
        },
        class: flight.class || flight.bookingClass || 'Economy',
        aircraft: flight.aircraft || flight.airplaneType || flight.flightNumber,
        availability: flight.availability || 9
      };
      
      console.log('✅ Transformed flight:', transformedFlight);
      return transformedFlight;
    });
  };

  const transformHotelsForDisplay = (hotels: any[]): HotelResult[] => {
    return hotels.map(hotel => ({
      id: hotel.id,
      name: hotel.name || 'Unknown Hotel',
      images: hotel.images || ['/placeholder.svg'],
      rating: hotel.rating || 4,
      reviewCount: hotel.reviewCount || 100,
      location: {
        address: hotel.address || hotel.location || 'Unknown Location',
        city: hotel.city || 'Unknown City',
        distance: hotel.distance || '1km from center',
        coordinates: hotel.coordinates
      },
      amenities: hotel.amenities || ['WiFi', 'Parking', 'Restaurant'],
      rooms: [{
        type: hotel.roomType || 'Standard Room',
        bedType: hotel.bedType || 'Double Bed',
        occupancy: hotel.occupancy || 2,
        pricePerNight: hotel.pricePerNight || hotel.price || 100,
        totalPrice: hotel.totalPrice || (hotel.price * 3) || 300,
        currency: hotel.currency || 'USD',
        cancellation: hotel.cancellation || 'Free cancellation'
      }],
      checkIn: hotel.checkIn || new Date().toISOString(),
      checkOut: hotel.checkOut || new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      nights: hotel.nights || 3
    }));
  };

  const transformCarsForDisplay = (cars: any[]): CarRentalResult[] => {
    return cars.map(car => ({
      id: car.id,
      provider: {
        name: car.provider || car.company || 'Unknown Provider',
        logo: getCarProviderLogo(car.provider || car.company)
      },
      vehicle: {
        category: car.category || car.type || 'Economy',
        model: car.model || 'Unknown Model',
        brand: car.brand || car.make || 'Unknown Brand',
        image: car.image,
        passengers: car.passengers || 4,
        luggage: car.luggage || 2,
        transmission: car.transmission || 'Automatic',
        fuelType: car.fuelType || 'Petrol',
        doors: car.doors || 4,
        airConditioning: car.airConditioning !== false
      },
      pickup: {
        location: car.pickupLocation || 'Airport',
        address: car.pickupAddress || 'Terminal 1',
        date: car.pickupDate || new Date().toISOString(),
        time: car.pickupTime || '10:00'
      },
      dropoff: {
        location: car.dropoffLocation || 'Airport',
        address: car.dropoffAddress || 'Terminal 1',
        date: car.dropoffDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        time: car.dropoffTime || '10:00'
      },
      pricing: {
        dailyRate: car.dailyRate || car.pricePerDay || 50,
        weeklyRate: car.weeklyRate,
        totalDays: car.totalDays || 7,
        basePrice: car.basePrice || car.totalPrice || 350,
        taxes: car.taxes || 35,
        fees: car.fees || 15,
        totalPrice: car.totalPrice || 400,
        currency: car.currency || 'USD'
      },
      insurance: car.insurance || [
        {
          type: 'Basic Coverage',
          description: 'Third party liability',
          dailyPrice: 10,
          included: true
        }
      ],
      inclusions: car.inclusions || ['Unlimited mileage', 'Basic insurance'],
      mileage: {
        type: car.mileage?.type || 'Unlimited',
        limit: car.mileage?.limit
      }
    }));
  };

  const getAirlineLogo = (airlineCode: string) => {
    // Map of airline codes to logos - you can expand this
    const logoMap: { [key: string]: string } = {
      'AA': 'https://logoeps.com/wp-content/uploads/2013/03/american-airlines-vector-logo.png',
      'DL': 'https://logoeps.com/wp-content/uploads/2013/03/delta-air-lines-vector-logo.png',
      'UA': 'https://logoeps.com/wp-content/uploads/2013/03/united-airlines-vector-logo.png',
      'Southwest': 'https://logoeps.com/wp-content/uploads/2013/03/southwest-airlines-vector-logo.png'
    };
    return logoMap[airlineCode] || undefined;
  };

  const getCarProviderLogo = (provider: string) => {
    const logoMap: { [key: string]: string } = {
      'Hertz': 'https://logoeps.com/wp-content/uploads/2013/03/hertz-vector-logo.png',
      'Enterprise': 'https://logoeps.com/wp-content/uploads/2013/03/enterprise-vector-logo.png',
      'Avis': 'https://logoeps.com/wp-content/uploads/2013/03/avis-vector-logo.png'
    };
    return logoMap[provider] || undefined;
  };

  console.log('🎯 Render check - Flights:', flights.length, 'Hotels:', hotels.length, 'Cars:', carRentals.length, 'Loading:', loading);

  // Always render if we have a conversationId - show loading state or results
  if (!conversationId) {
    return null;
  }

  // Show loading skeleton when loading
  if (loading) {
    return <AIResultsLoadingSkeleton />;
  }

  return (
    <div className="mt-6 space-y-4">
      <SearchResultsContainer
        flights={flights}
        hotels={hotels}
        carRentals={carRentals}
        loading={loading}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onFlightSelect={onFlightSelect}
        onHotelSelect={onHotelSelect}
        onCarSelect={onCarSelect}
      />
    </div>
  );
};

export default AIResultsDisplay;