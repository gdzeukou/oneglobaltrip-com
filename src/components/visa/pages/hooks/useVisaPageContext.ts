
import { useLocation, useParams } from 'react-router-dom';
import { useMemo } from 'react';

export interface VisaPageContext {
  visaType: string;
  country: string;
  category: string;
  isSchengen: boolean;
}

export const useVisaPageContext = (): VisaPageContext => {
  const location = useLocation();
  const params = useParams();

  return useMemo(() => {
    const pathname = location.pathname;
    
    // Extract visa type and country from URL patterns
    // Examples: /visas/short-stay/france, /visa-countries/IndiaShortStay, etc.
    const pathParts = pathname.split('/').filter(Boolean);
    
    let visaType = '';
    let country = '';
    let category = '';
    
    // Handle different URL patterns
    if (pathParts.includes('visa-countries')) {
      // Handle specific country pages like /visa-countries/IndiaShortStay
      const pageComponent = pathParts[pathParts.indexOf('visa-countries') + 1];
      if (pageComponent) {
        // Map component names to country codes
        const countryMap: Record<string, string> = {
          'IndiaShortStay': 'india',
          'UAEShortStay': 'uae',
          'CanadaShortStay': 'canada',
          'BrazilShortStay': 'brazil',
          'NigeriaShortStay': 'nigeria'
        };
        
        country = countryMap[pageComponent] || pageComponent.toLowerCase();
        category = 'short-stay';
        visaType = `${category}_${country}`;
      }
    } else if (pathParts.length >= 3 && pathParts[0] === 'visas') {
      // Handle /visas/short-stay/france pattern
      category = pathParts[1]; // short-stay, long-stay, etc.
      country = pathParts[2]; // france, canada, etc.
      visaType = `${category}_${country}`;
    }
    
    // Check if it's a Schengen country
    const schengenCountries = [
      'austria', 'belgium', 'czech-republic', 'denmark', 'estonia', 'finland',
      'france', 'germany', 'greece', 'hungary', 'iceland', 'italy', 'latvia',
      'liechtenstein', 'lithuania', 'luxembourg', 'malta', 'netherlands',
      'norway', 'poland', 'portugal', 'slovakia', 'slovenia', 'spain',
      'sweden', 'switzerland'
    ];
    
    const isSchengen = schengenCountries.includes(country);
    
    return {
      visaType,
      country,
      category,
      isSchengen
    };
  }, [location.pathname, params]);
};
