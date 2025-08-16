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

  useEffect(() => {
    // Try to detect user's country
    const detectCountry = async () => {
      try {
        // Use geolocation API or IP detection (simplified for demo)
        const storedCountry = localStorage.getItem('userCountry');
        if (storedCountry && countryData[storedCountry]) {
          setSelectedCountry(storedCountry);
          setContext(countryData[storedCountry]);
        }
      } catch (error) {
        console.log('Could not detect country, using default');
      }
    };

    detectCountry();
  }, []);

  const handleCountryChange = (countryCode: string) => {
    setSelectedCountry(countryCode);
    setContext(countryData[countryCode]);
    localStorage.setItem('userCountry', countryCode);
    
    // Dispatch custom event for other components to listen to
    window.dispatchEvent(new CustomEvent('countryChanged', { 
      detail: { countryCode, context: countryData[countryCode] } 
    }));
  };

  // Provide context globally
  useEffect(() => {
    (window as any).visaContext = context;
  }, [context]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className={cn(
            "h-10 px-3 rounded-full transition-all duration-300",
            "hover:bg-primary/10 hover:scale-105",
            "focus:scale-95 active:scale-95",
            "flex items-center space-x-2"
          )}
        >
          <Globe className="h-4 w-4" />
          <span className="text-xl">{context.flag}</span>
          <span className="hidden sm:inline text-sm font-medium">{context.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-56 bg-white/95 backdrop-blur-lg border border-border/50 shadow-luxury"
      >
        {Object.entries(countryData).map(([code, data]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => handleCountryChange(code)}
            className={cn(
              "flex items-center justify-between px-3 py-2",
              "hover:bg-primary/5 cursor-pointer transition-colors",
              selectedCountry === code && "bg-primary/10"
            )}
          >
            <div className="flex items-center space-x-3">
              <span className="text-lg">{data.flag}</span>
              <div>
                <p className="font-medium text-sm">{data.name}</p>
                <p className="text-xs text-muted-foreground">{data.visaSuccessRate} success rate</p>
              </div>
            </div>
            {selectedCountry === code && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
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