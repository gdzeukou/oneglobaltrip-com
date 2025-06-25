
import { useState, useEffect } from 'react';

interface LocationData {
  country: string;
  countryCode: string;
  currency: string;
  timezone: string;
  isLoading: boolean;
  error: string | null;
}

export const useLocationDetection = () => {
  const [location, setLocation] = useState<LocationData>({
    country: '',
    countryCode: '',
    currency: 'USD',
    timezone: '',
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const detectLocation = async () => {
      try {
        // First try to get timezone
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        
        // Try to detect location via IP (using a free service)
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.reason || 'Location detection failed');
        }

        setLocation({
          country: data.country_name || 'Unknown',
          countryCode: data.country_code || 'US',
          currency: data.currency || 'USD',
          timezone: timezone,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        console.log('Location detection failed, using defaults:', error);
        setLocation({
          country: 'United States',
          countryCode: 'US',
          currency: 'USD',
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          isLoading: false,
          error: null,
        });
      }
    };

    detectLocation();
  }, []);

  return location;
};

export default useLocationDetection;
