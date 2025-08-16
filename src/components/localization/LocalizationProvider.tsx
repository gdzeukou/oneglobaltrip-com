import React, { useState, useEffect } from 'react';
import { Check, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import FlagIcon from './FlagIcon';

interface CountryContext {
  flag: string;
  name: string;
  currency: string;
  currencySymbol: string;
  visaSuccessRate: string;
  localSupport: string;
  popularDestinations: string[];
}

const countryData: Record<string, CountryContext> = {
  'NG': {
    flag: '🇳🇬',
    name: 'Nigeria',
    currency: 'NGN',
    currencySymbol: '₦',
    visaSuccessRate: '98%',
    localSupport: '+234 800 123 4567',
    popularDestinations: ['UK', 'Germany', 'Canada', 'USA']
  },
  'KE': {
    flag: '🇰🇪',
    name: 'Kenya',
    currency: 'KES',
    currencySymbol: 'KSh',
    visaSuccessRate: '96%',
    localSupport: '+254 700 123 456',
    popularDestinations: ['UK', 'Schengen', 'Canada', 'USA']
  },
  'ZA': {
    flag: '🇿🇦',
    name: 'South Africa',
    currency: 'ZAR',
    currencySymbol: 'R',
    visaSuccessRate: '97%',
    localSupport: '+27 21 123 4567',
    popularDestinations: ['UK', 'Schengen', 'Australia', 'Canada']
  },
  'GH': {
    flag: '🇬🇭',
    name: 'Ghana',
    currency: 'GHS',
    currencySymbol: '₵',
    visaSuccessRate: '95%',
    localSupport: '+233 30 123 4567',
    popularDestinations: ['UK', 'Germany', 'USA', 'Canada']
  },
  'US': {
    flag: '🇺🇸',
    name: 'United States',
    currency: 'USD',
    currencySymbol: '$',
    visaSuccessRate: '99%',
    localSupport: '+1 (555) 123-4567',
    popularDestinations: ['UK', 'Schengen', 'Japan', 'Australia']
  },
  'CA': {
    flag: '🇨🇦',
    name: 'Canada',
    currency: 'CAD',
    currencySymbol: 'C$',
    visaSuccessRate: '99%',
    localSupport: '+1 (416) 123-4567',
    popularDestinations: ['UK', 'Schengen', 'USA', 'Australia']
  },
  'GB': {
    flag: '🇬🇧',
    name: 'United Kingdom',
    currency: 'GBP',
    currencySymbol: '£',
    visaSuccessRate: '99%',
    localSupport: '+44 20 1234 5678',
    popularDestinations: ['Schengen', 'USA', 'Australia', 'Japan']
  },
  'IN': {
    flag: '🇮🇳',
    name: 'India',
    currency: 'INR',
    currencySymbol: '₹',
    visaSuccessRate: '94%',
    localSupport: '+91 11 1234 5678',
    popularDestinations: ['USA', 'UK', 'Schengen', 'Canada']
  }
};

const LocalizationProvider = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>('NG');
  const [context, setContext] = useState<CountryContext>(countryData['NG']);
  const [isDetecting, setIsDetecting] = useState(true);
  const [detectedLocation, setDetectedLocation] = useState<string>('');

  useEffect(() => {
    // Automatically detect user's actual location
    const detectUserLocation = async () => {
      setIsDetecting(true);
      try {
        // Try multiple detection methods for accuracy
        
        // Method 1: IP-based geolocation API
        const response = await fetch('https://ipapi.co/json/');
        const locationData = await response.json();
        
        if (locationData.country_code) {
          const countryCode = locationData.country_code.toUpperCase();
          const city = locationData.city;
          const region = locationData.region;
          
          // Set detected location string
          setDetectedLocation(`${city}, ${region}, ${locationData.country_name}`);
          
          if (countryData[countryCode]) {
            setSelectedCountry(countryCode);
            setContext(countryData[countryCode]);
            localStorage.setItem('userCountry', countryCode);
            localStorage.setItem('detectedLocation', `${city}, ${region}`);
          }
        }
      } catch (error) {
        console.log('IP detection failed, trying browser geolocation');
        
        // Method 2: Browser geolocation as fallback
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              try {
                // Reverse geocoding to get location name
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                
                // Using a simple reverse geocoding service
                const geoResponse = await fetch(
                  `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
                );
                const geoData = await geoResponse.json();
                
                if (geoData.countryCode) {
                  const countryCode = geoData.countryCode.toUpperCase();
                  const city = geoData.city || geoData.locality;
                  const region = geoData.principalSubdivision;
                  
                  setDetectedLocation(`${city}, ${region}`);
                  
                  if (countryData[countryCode]) {
                    setSelectedCountry(countryCode);
                    setContext(countryData[countryCode]);
                    localStorage.setItem('userCountry', countryCode);
                    localStorage.setItem('detectedLocation', `${city}, ${region}`);
                  }
                }
              } catch (geoError) {
                console.log('Reverse geocoding failed');
                setDetectedLocation('Location detected');
              }
            },
            (error) => {
              console.log('Geolocation failed:', error);
              setDetectedLocation('Location unavailable');
            }
          );
        }
      } finally {
        setIsDetecting(false);
      }
    };

    // Check if we have a previously detected location
    const storedCountry = localStorage.getItem('userCountry');
    const storedLocation = localStorage.getItem('detectedLocation');
    
    if (storedCountry && countryData[storedCountry] && storedLocation) {
      setSelectedCountry(storedCountry);
      setContext(countryData[storedCountry]);
      setDetectedLocation(storedLocation);
      setIsDetecting(false);
    } else {
      detectUserLocation();
    }
  }, []);

  // Provide context globally
  useEffect(() => {
    (window as any).visaContext = context;
  }, [context]);

  // Only show the detected location, no dropdown
  return (
    <div className={cn(
      "flex items-center space-x-3 px-4 py-2 rounded-full",
      "bg-gradient-to-r from-primary/5 to-primary/10",
      "border border-primary/20 shadow-sm",
      "transition-all duration-300 hover:shadow-md"
    )}>
      <div className={cn(
        "flex items-center justify-center w-8 h-8 rounded-full",
        "bg-white/50 border border-primary/10 shadow-sm"
      )}>
        <FlagIcon 
          countryCode={selectedCountry} 
          className="w-6 h-4 rounded-sm shadow-sm" 
        />
      </div>
      <span className="text-sm font-medium text-primary">
        {isDetecting ? 'Detecting location...' : detectedLocation || context.name}
      </span>
      {isDetecting && (
        <div className="h-3 w-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      )}
    </div>
  );
};

// Hook to use localization context
export const useLocalization = () => {
  const [context, setContext] = useState<CountryContext>(countryData['NG']);

  useEffect(() => {
    const handleCountryChange = (event: CustomEvent) => {
      setContext(event.detail.context);
    };

    window.addEventListener('countryChanged', handleCountryChange as EventListener);
    
    // Initialize with stored or default context
    const storedCountry = localStorage.getItem('userCountry');
    if (storedCountry && countryData[storedCountry]) {
      setContext(countryData[storedCountry]);
    }

    return () => {
      window.removeEventListener('countryChanged', handleCountryChange as EventListener);
    };
  }, []);

  return context;
};

export default LocalizationProvider;