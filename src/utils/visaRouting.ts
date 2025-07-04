import { ROUTES } from '@/constants/routes';

interface VisaRouteParams {
  nationality: string;
  destination: string;
  purpose: string;
  duration: string;
}

export const getVisaApplicationRoute = (params: VisaRouteParams): string => {
  const { nationality, destination, purpose, duration } = params;
  
  // Convert destination to lowercase for route matching
  const destLower = destination.toLowerCase().replace(/\s+/g, '-');
  
  // Determine if it's a long-stay or short-stay visa based on duration
  const isLongStay = duration === 'long-stay';
  const isTransit = duration === 'transit';
  
  // Route priority logic
  if (isLongStay) {
    // Check for specific long-stay country pages
    const longStayRoutes: { [key: string]: string } = {
      'france': ROUTES.FRANCE_LONG_STAY,
      'germany': ROUTES.GERMANY_LONG_STAY,
      'portugal': ROUTES.PORTUGAL_LONG_STAY,
      'finland': ROUTES.FINLAND_LONG_STAY,
      'denmark': ROUTES.DENMARK_LONG_STAY,
      'norway': ROUTES.NORWAY_LONG_STAY,
      'switzerland': ROUTES.SWITZERLAND_LONG_STAY,
      'nigeria': ROUTES.NIGERIA_LONG_STAY
    };
    
    if (longStayRoutes[destLower]) {
      return longStayRoutes[destLower];
    }
    
    // Default to long-stay visas page with pre-selected country
    return `${ROUTES.LONG_STAY_VISAS}?country=${encodeURIComponent(destination)}`;
  }
  
  // Short-stay visa routing
  const shortStayRoutes: { [key: string]: string } = {
    'france': ROUTES.FRANCE_SHORT_STAY,
    'germany': ROUTES.GERMANY_SHORT_STAY,
    'italy': ROUTES.ITALY_SHORT_STAY,
    'netherlands': ROUTES.NETHERLANDS_SHORT_STAY,
    'greece': ROUTES.GREECE_SHORT_STAY,
    'denmark': ROUTES.DENMARK_SHORT_STAY,
    'sweden': ROUTES.SWEDEN_SHORT_STAY,
    'united-kingdom': ROUTES.UK_SHORT_STAY,
    'united-arab-emirates': ROUTES.UAE_SHORT_STAY,
    'canada': ROUTES.CANADA_SHORT_STAY,
    'brazil': ROUTES.BRAZIL_SHORT_STAY,
    'india': ROUTES.INDIA_SHORT_STAY,
    'nigeria': ROUTES.NIGERIA_SHORT_STAY
  };
  
  // Check for Schengen countries
  const schengenCountries = [
    'austria', 'belgium', 'croatia', 'czech-republic', 'denmark', 'estonia',
    'finland', 'france', 'germany', 'greece', 'hungary', 'iceland', 'italy',
    'latvia', 'liechtenstein', 'lithuania', 'luxembourg', 'malta', 'netherlands',
    'norway', 'poland', 'portugal', 'slovakia', 'slovenia', 'spain', 'sweden', 'switzerland'
  ];
  
  if (schengenCountries.includes(destLower)) {
    // If specific Schengen country page exists, use it
    if (shortStayRoutes[destLower]) {
      return shortStayRoutes[destLower];
    }
    // Otherwise, use general Schengen page
    return ROUTES.SCHENGEN_SHORT_STAY_LANDING;
  }
  
  // Check for specific country pages
  if (shortStayRoutes[destLower]) {
    return shortStayRoutes[destLower];
  }
  
  // Default to short-stay visas page
  return ROUTES.SHORT_STAY_VISAS;
};

export const getConsultationRoute = (): string => {
  return ROUTES.CALENDLY_CONSULTATION;
};

export const getVisaButtonText = (destination: string, duration: string): string => {
  const isLongStay = duration === 'long-stay';
  const isTransit = duration === 'transit';
  
  if (isTransit) {
    return `Apply for ${destination} Transit Visa`;
  }
  
  if (isLongStay) {
    return `Apply for ${destination} Long-Stay Visa`;
  }
  
  return `Apply for ${destination} Visa`;
};
