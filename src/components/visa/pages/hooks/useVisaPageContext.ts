
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
    // Examples: /visas/short-stay/france, /visas/long-stay/canada, etc.
    const pathParts = pathname.split('/').filter(Boolean);
    
    let visaType = '';
    let country = '';
    let category = '';
    
    if (pathParts.length >= 3 && pathParts[0] === 'visas') {
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
