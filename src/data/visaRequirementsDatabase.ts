
export interface VisaRequirement {
  required: boolean;
  isSchengen: boolean;
  message?: string;
}

export interface MultiDestinationVisaCheck {
  hasVisaRequired: boolean;
  schengenVisaRequired: boolean;
  individualVisasRequired: string[];
  transitWarnings: string[];
  recommendations: string[];
}

export interface ConsulateRecommendation {
  primaryConsulate: {
    countryName: string;
    reasoning: string;
    processingTime: string;
    bookingUrl?: string;
  };
  alternatives?: {
    countryName: string;
    reasoning: string;
  }[];
  expertConsultationNeeded: boolean;
}

export interface SchengenTripData {
  selectedCountries: string[];
  nightsDistribution: { [key: string]: number };
  businessLocation?: string;
  entryPoint: string;
  purpose: string;
}

export const destinationCountries = [
  { code: 'uk', name: 'United Kingdom', flag: '🇬🇧', isSchengen: false },
  { code: 'france', name: 'France', flag: '🇫🇷', isSchengen: true },
  { code: 'italy', name: 'Italy', flag: '🇮🇹', isSchengen: true },
  { code: 'germany', name: 'Germany', flag: '🇩🇪', isSchengen: true },
  { code: 'spain', name: 'Spain', flag: '🇪🇸', isSchengen: true },
  { code: 'netherlands', name: 'Netherlands', flag: '🇳🇱', isSchengen: true },
  { code: 'greece', name: 'Greece', flag: '🇬🇷', isSchengen: true },
  { code: 'japan', name: 'Japan', flag: '🇯🇵', isSchengen: false },
  { code: 'uae', name: 'United Arab Emirates', flag: '🇦🇪', isSchengen: false },
  { code: 'canada', name: 'Canada', flag: '🇨🇦', isSchengen: false },
  { code: 'usa', name: 'United States', flag: '🇺🇸', isSchengen: false }
];

export const schengenCountries = ['france', 'italy', 'germany', 'spain', 'netherlands', 'greece'];

export const tripPurposes = [
  { value: 'tourism', label: 'Tourism & Leisure' },
  { value: 'business', label: 'Business' },
  { value: 'family', label: 'Family Visit' },
  { value: 'conference', label: 'Conference/Event' },
  { value: 'education', label: 'Education/Training' },
  { value: 'medical', label: 'Medical Treatment' }
];

export const multiDestinationOptions = [
  { value: 'single', label: 'Single Destination' },
  { value: 'multiple', label: 'Multiple Destinations' }
];

export const checkVisaRequirement = (nationality: string, destination: string, purpose: string): VisaRequirement => {
  // Simplified visa check logic
  const isSchengen = schengenCountries.includes(destination);
  
  // US citizens generally don't need visas for short stays in Europe
  if (nationality === 'United States') {
    if (destination === 'uk') {
      return { required: false, isSchengen: false, message: 'ETA required from 2024' };
    }
    return { required: false, isSchengen };
  }
  
  // Default to requiring visa for other nationalities
  return { required: true, isSchengen };
};

export const checkMultiDestinationVisaRequirement = (
  nationality: string, 
  countries: string[], 
  purposes: string[]
): MultiDestinationVisaCheck => {
  const schengenCountriesInTrip = countries.filter(c => schengenCountries.includes(c));
  const nonSchengenCountries = countries.filter(c => !schengenCountries.includes(c));
  
  let hasVisaRequired = false;
  let schengenVisaRequired = false;
  const individualVisasRequired: string[] = [];
  const transitWarnings: string[] = [];
  
  // Check Schengen countries
  if (schengenCountriesInTrip.length > 0) {
    const schengenCheck = checkVisaRequirement(nationality, schengenCountriesInTrip[0], purposes[0]);
    if (schengenCheck.required) {
      hasVisaRequired = true;
      schengenVisaRequired = true;
    }
  }
  
  // Check non-Schengen countries
  nonSchengenCountries.forEach((country, index) => {
    const check = checkVisaRequirement(nationality, country, purposes[index] || purposes[0]);
    if (check.required) {
      hasVisaRequired = true;
      individualVisasRequired.push(country);
    }
  });
  
  return {
    hasVisaRequired,
    schengenVisaRequired,
    individualVisasRequired,
    transitWarnings,
    recommendations: []
  };
};

export const getSchengenConsulateRecommendation = (tripData: SchengenTripData): ConsulateRecommendation => {
  const { nightsDistribution, businessLocation, entryPoint, purpose } = tripData;
  
  // Business trips - apply where business activities occur
  if (purpose === 'business' && businessLocation) {
    const businessCountryInfo = destinationCountries.find(c => c.code === businessLocation);
    return {
      primaryConsulate: {
        countryName: businessCountryInfo?.name || businessLocation,
        reasoning: 'Primary business activities take place here',
        processingTime: '15-20 business days'
      },
      expertConsultationNeeded: false
    };
  }
  
  // Find country with most nights
  const nightsEntries = Object.entries(nightsDistribution);
  if (nightsEntries.length === 0) {
    const entryCountryInfo = destinationCountries.find(c => c.code === entryPoint);
    return {
      primaryConsulate: {
        countryName: entryCountryInfo?.name || entryPoint,
        reasoning: 'First point of entry into Schengen area',
        processingTime: '15-20 business days'
      },
      expertConsultationNeeded: true
    };
  }
  
  const sortedByNights = nightsEntries.sort(([,a], [,b]) => b - a);
  const [longestStayCountry, longestNights] = sortedByNights[0];
  
  // Check if there's a tie
  const tiedCountries = sortedByNights.filter(([,nights]) => nights === longestNights);
  
  if (tiedCountries.length > 1) {
    // Tied - use entry point
    const entryCountryInfo = destinationCountries.find(c => c.code === entryPoint);
    return {
      primaryConsulate: {
        countryName: entryCountryInfo?.name || entryPoint,
        reasoning: 'Equal nights in multiple countries - using first entry point',
        processingTime: '15-20 business days'
      },
      alternatives: tiedCountries.map(([country]) => {
        const countryInfo = destinationCountries.find(c => c.code === country);
        return {
          countryName: countryInfo?.name || country,
          reasoning: `Equal longest stay (${longestNights} nights)`
        };
      }),
      expertConsultationNeeded: false
    };
  }
  
  // Clear winner - most nights
  const longestStayCountryInfo = destinationCountries.find(c => c.code === longestStayCountry);
  return {
    primaryConsulate: {
      countryName: longestStayCountryInfo?.name || longestStayCountry,
      reasoning: `Longest stay (${longestNights} nights)`,
      processingTime: '15-20 business days'
    },
    expertConsultationNeeded: false
  };
};

export const getDestinationPackages = (destination: string): string[] => {
  const packageMap: { [key: string]: string[] } = {
    'france': ['Paris City Break', 'French Riviera Tour', 'Loire Valley Castles'],
    'italy': ['Rome & Vatican Tour', 'Tuscany Wine Tour', 'Venice & Florence'],
    'germany': ['Berlin History Tour', 'Bavarian Alps', 'Rhine Valley Cruise'],
    'uk': ['London Explorer', 'Scottish Highlands', 'Cotswolds Tour'],
    'spain': ['Barcelona & Madrid', 'Andalusia Tour', 'Balearic Islands'],
    'japan': ['Tokyo & Kyoto', 'Mount Fuji Tour', 'Cherry Blossom Special'],
    'uae': ['Dubai Luxury', 'Abu Dhabi Culture', 'Desert Safari'],
    'canada': ['Canadian Rockies', 'Toronto & Montreal', 'Niagara Falls'],
    'usa': ['New York City', 'California Coast', 'Grand Canyon']
  };
  
  return packageMap[destination] || ['Custom Package Available'];
};
