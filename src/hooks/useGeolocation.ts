import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface GeolocationCoordinates {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

export const useGeolocation = () => {
  const [location, setLocation] = useState<GeolocationCoordinates | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState<PermissionState | null>(null);

  // Check permission status
  const checkPermission = useCallback(async () => {
    if ('permissions' in navigator) {
      try {
        const result = await navigator.permissions.query({ name: 'geolocation' });
        setPermissionStatus(result.state);
        
        result.addEventListener('change', () => {
          setPermissionStatus(result.state);
        });
      } catch (err) {
        console.error('Permission check error:', err);
      }
    }
  }, []);

  // Request location permission and get current position
  const requestLocation = useCallback(async () => {
    if (!('geolocation' in navigator)) {
      const errorMsg = 'Geolocation is not supported by your browser';
      setError(errorMsg);
      toast.error(errorMsg);
      return null;
    }

    setLoading(true);
    setError(null);

    return new Promise<GeolocationCoordinates | null>((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords: GeolocationCoordinates = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp,
          };
          setLocation(coords);
          setLoading(false);
          toast.success('Location access granted');
          resolve(coords);
        },
        (err) => {
          let errorMsg = 'Unable to retrieve your location';
          
          switch (err.code) {
            case err.PERMISSION_DENIED:
              errorMsg = 'Location permission denied. Please enable it in your browser settings.';
              break;
            case err.POSITION_UNAVAILABLE:
              errorMsg = 'Location information is unavailable';
              break;
            case err.TIMEOUT:
              errorMsg = 'Location request timed out';
              break;
          }
          
          setError(errorMsg);
          setLoading(false);
          toast.error(errorMsg);
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    });
  }, []);

  // Save location to user profile
  const saveLocationToProfile = useCallback(async (coords: GeolocationCoordinates) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { error: updateError } = await supabase
        .from('user_location_history')
        .insert({
          user_id: user.id,
          location: {
            latitude: coords.latitude,
            longitude: coords.longitude,
            accuracy: coords.accuracy,
          },
          recorded_at: new Date().toISOString(),
          expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
        });

      if (updateError) throw updateError;

      // Also update public profile with current location
      const { error: profileError } = await supabase
        .from('user_profiles_public')
        .update({
          current_location: {
            latitude: coords.latitude,
            longitude: coords.longitude,
            accuracy: coords.accuracy,
            updated_at: new Date().toISOString(),
          },
          location_sharing_enabled: true,
        })
        .eq('user_id', user.id);

      if (profileError) throw profileError;

      toast.success('Location saved to your profile');
    } catch (err) {
      console.error('Error saving location:', err);
      toast.error('Failed to save location');
    }
  }, []);

  // Watch position continuously
  const watchLocation = useCallback(() => {
    if (!('geolocation' in navigator)) {
      return null;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const coords: GeolocationCoordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
        };
        setLocation(coords);
      },
      (err) => {
        console.error('Watch location error:', err);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000,
      }
    );

    return watchId;
  }, []);

  useEffect(() => {
    checkPermission();
  }, [checkPermission]);

  return {
    location,
    error,
    loading,
    permissionStatus,
    requestLocation,
    saveLocationToProfile,
    watchLocation,
  };
};
