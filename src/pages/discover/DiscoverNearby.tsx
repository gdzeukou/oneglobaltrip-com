import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import OGTNavbar from '@/components/navigation/OGTNavbar';
import { TravelerCard } from '@/components/discover/TravelerCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MapPin, Loader2, Navigation } from 'lucide-react';
import { PublicProfile } from '@/hooks/usePublicProfile';
import { LocationPermissionPrompt } from '@/components/location/LocationPermissionPrompt';
import { useGeolocation } from '@/hooks/useGeolocation';

interface NearbyTraveler extends PublicProfile {
  distance_km: number;
  upcoming_trips?: Array<{
    destination: string;
    start_date: string;
    end_date: string;
  }>;
}

export default function DiscoverNearby() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const { location: geoLocation } = useGeolocation();

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }

    setIsGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocationError(null);
        setIsGettingLocation(false);
      },
      (error) => {
        setLocationError('Unable to retrieve your location. Please enable location services.');
        setIsGettingLocation(false);
      }
    );
  };

  const { data: nearbyTravelers, isLoading } = useQuery({
    queryKey: ['nearby-travelers', userLocation?.lat, userLocation?.lng],
    queryFn: async () => {
      if (!userLocation) return [];

      const { data, error } = await supabase.rpc('get_nearby_travelers', {
        user_lat: userLocation.lat,
        user_lng: userLocation.lng,
        radius_km: 50,
      });

      if (error) throw error;
      return data as NearbyTraveler[];
    },
    enabled: !!userLocation,
  });

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <OGTNavbar />
      <LocationPermissionPrompt />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">Travelers Near You</h1>
              <p className="text-muted-foreground">
                Discover and connect with travelers in your area
              </p>
            </div>
          </div>

          {locationError && (
            <Alert className="mb-4">
              <AlertDescription className="flex items-center justify-between">
                <span>{locationError}</span>
                <Button onClick={getUserLocation} size="sm">
                  <Navigation className="h-4 w-4 mr-2" />
                  Enable Location
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {userLocation && (
            <Card className="p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="text-sm">
                    Location: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
                  </span>
                </div>
                <Button variant="outline" size="sm" onClick={getUserLocation}>
                  <Navigation className="h-4 w-4 mr-2" />
                  Refresh Location
                </Button>
              </div>
            </Card>
          )}
        </div>

        {isGettingLocation ? (
          <Card className="p-12 text-center">
            <Loader2 className="h-12 w-12 mx-auto mb-4 animate-spin text-primary" />
            <h3 className="text-xl font-semibold mb-2">Getting your location...</h3>
            <p className="text-muted-foreground">
              Please allow location access to discover nearby travelers
            </p>
          </Card>
        ) : !userLocation ? (
          <Card className="p-12 text-center">
            <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">Location Required</h3>
            <p className="text-muted-foreground mb-4">
              Enable location services to discover travelers near you
            </p>
            <Button onClick={getUserLocation}>
              <Navigation className="h-4 w-4 mr-2" />
              Enable Location
            </Button>
          </Card>
        ) : isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="h-64 animate-pulse bg-muted" />
            ))}
          </div>
        ) : nearbyTravelers && nearbyTravelers.length > 0 ? (
          <>
            <div className="mb-4 text-muted-foreground">
              Found {nearbyTravelers.length} travelers within 50km
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nearbyTravelers.map(traveler => (
                <TravelerCard key={traveler.user_id} traveler={traveler} />
              ))}
            </div>
          </>
        ) : (
          <Card className="p-12 text-center">
            <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No travelers nearby</h3>
            <p className="text-muted-foreground">
              There are no travelers within 50km of your location. Try checking the global directory instead.
            </p>
            <Button className="mt-4" onClick={() => window.location.href = '/discover/global'}>
              Browse All Travelers
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
