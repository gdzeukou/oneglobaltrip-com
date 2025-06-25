// Comprehensive visa requirements database with individual Schengen countries
export const destinationCountries = [
  // Individual Schengen Countries (replacing "Schengen Area")
  { code: 'austria', name: 'Austria', flag: '🇦🇹', isSchengen: true },
  { code: 'belgium', name: 'Belgium', flag: '🇧🇪', isSchengen: true },
  { code: 'czech-republic', name: 'Czech Republic', flag: '🇨🇿', isSchengen: true },
  { code: 'denmark', name: 'Denmark', flag: '🇩🇰', isSchengen: true },
  { code: 'estonia', name: 'Estonia', flag: '🇪🇪', isSchengen: true },
  { code: 'finland', name: 'Finland', flag: '🇫🇮', isSchengen: true },
  { code: 'france', name: 'France', flag: '🇫🇷', isSchengen: true },
  { code: 'germany', name: 'Germany', flag: '🇩🇪', isSchengen: true },
  { code: 'greece', name: 'Greece', flag: '🇬🇷', isSchengen: true },
  { code: 'hungary', name: 'Hungary', flag: '🇭🇺', isSchengen: true },
  { code: 'iceland', name: 'Iceland', flag: '🇮🇸', isSchengen: true },
  { code: 'italy', name: 'Italy', flag: '🇮🇹', isSchengen: true },
  { code: 'latvia', name: 'Latvia', flag: '🇱🇻', isSchengen: true },
  { code: 'liechtenstein', name: 'Liechtenstein', flag: '🇱🇮', isSchengen: true },
  { code: 'lithuania', name: 'Lithuania', flag: '🇱🇹', isSchengen: true },
  { code: 'luxembourg', name: 'Luxembourg', flag: '🇱🇺', isSchengen: true },
  { code: 'malta', name: 'Malta', flag: '🇲🇹', isSchengen: true },
  { code: 'netherlands', name: 'Netherlands', flag: '🇳🇱', isSchengen: true },
  { code: 'norway', name: 'Norway', flag: '🇳🇴', isSchengen: true },
  { code: 'poland', name: 'Poland', flag: '🇵🇱', isSchengen: true },
  { code: 'portugal', name: 'Portugal', flag: '🇵🇹', isSchengen: true },
  { code: 'slovakia', name: 'Slovakia', flag: '🇸🇰', isSchengen: true },
  { code: 'slovenia', name: 'Slovenia', flag: '🇸🇮', isSchengen: true },
  { code: 'spain', name: 'Spain', flag: '🇪🇸', isSchengen: true },
  { code: 'sweden', name: 'Sweden', flag: '🇸🇪', isSchengen: true },
  { code: 'switzerland', name: 'Switzerland', flag: '🇨🇭', isSchengen: true },
  
  // Non-Schengen Countries
  { code: 'uk', name: 'United Kingdom', flag: '🇬🇧', isSchengen: false },
  { code: 'usa', name: 'United States', flag: '🇺🇸', isSchengen: false },
  { code: 'canada', name: 'Canada', flag: '🇨🇦', isSchengen: false },
  { code: 'australia', name: 'Australia', flag: '🇦🇺', isSchengen: false },
  { code: 'japan', name: 'Japan', flag: '🇯🇵', isSchengen: false },
  { code: 'china', name: 'China', flag: '🇨🇳', isSchengen: false },
  { code: 'india', name: 'India', flag: '🇮🇳', isSchengen: false },
  { code: 'brazil', name: 'Brazil', flag: '🇧🇷', isSchengen: false },
  { code: 'nigeria', name: 'Nigeria', flag: '🇳🇬', isSchengen: false },
  { code: 'uae', name: 'United Arab Emirates', flag: '🇦🇪', isSchengen: false },
  { code: 'south-africa', name: 'South Africa', flag: '🇿🇦', isSchengen: false },
  { code: 'mexico', name: 'Mexico', flag: '🇲🇽', isSchengen: false },
];

// Schengen embassy/consulate data for intelligent recommendations
export const schengenEmbassyData = {
  austria: {
    name: 'Austria',
    majorConsulates: ['New York', 'Los Angeles', 'Chicago'],
    bookingUrl: 'https://www.austria.org/consulates-general',
    processingTime: '15-20 business days'
  },
  belgium: {
    name: 'Belgium',
    majorConsulates: ['New York', 'Los Angeles', 'Atlanta'],
    bookingUrl: 'https://diplomatie.belgium.be/en/services/services_abroad/visa_for_belgium',
    processingTime: '15-20 business days'
  },
  france: {
    name: 'France',
    majorConsulates: ['New York', 'Los Angeles', 'Chicago', 'Miami', 'Boston'],
    bookingUrl: 'https://france-visas.gouv.fr/',
    processingTime: '15-20 business days'
  },
  germany: {
    name: 'Germany',
    majorConsulates: ['New York', 'Los Angeles', 'Chicago', 'Miami', 'Boston'],
    bookingUrl: 'https://www.germany.travel/en/ms/german-missions/visa-info.html',
    processingTime: '15-20 business days'
  },
  italy: {
    name: 'Italy',
    majorConsulates: ['New York', 'Los Angeles', 'Chicago', 'Miami', 'Boston'],
    bookingUrl: 'https://vistoperitalia.esteri.it/home/en',
    processingTime: '15-20 business days'
  },
  spain: {
    name: 'Spain',
    majorConsulates: ['New York', 'Los Angeles', 'Chicago', 'Miami', 'Boston'],
    bookingUrl: 'https://www.exteriores.gob.es/Consulados/nuevayork/en/ServiciosConsulares/Paginas/Consular-Services.aspx',
    processingTime: '15-20 business days'
  },
  // ... other Schengen countries follow similar pattern
};

// Get all Schengen country codes
export const schengenCountries = destinationCountries
  .filter(country => country.isSchengen)
  .map(country => country.code);

export const tripPurposes = [
  { value: 'tourism', label: 'Tourism & Leisure' },
  { value: 'business', label: 'Business & Work' },
  { value: 'study', label: 'Study & Education' },
  { value: 'family', label: 'Family Visit' },
  { value: 'conference', label: 'Conference & Events' },
  { value: 'transit', label: 'Transit' },
  { value: 'medical', label: 'Medical Treatment' },
];

export const stayDurations = [
  { value: 'single-short', label: 'Single entry (≤30 days)' },
  { value: 'single-medium', label: 'Single entry (31-90 days)' },
  { value: 'multiple-short', label: 'Multiple entry (≤90 days)' },
  { value: 'multiple-long', label: 'Multiple entry (>90 days)' },
  { value: 'long-stay', label: 'Long-stay (>90 days)' },
];

// Visa-exempt countries for major destinations
export const visaExemptions = {
  // For Schengen countries, use any Schengen country code as key
  schengen: [
    'United States', 'Canada', 'Australia', 'United Kingdom', 'Japan', 
    'South Korea', 'New Zealand', 'Israel', 'Singapore', 'Malaysia', 'Brunei',
    'Chile', 'Uruguay', 'Argentina', 'Brazil', 'Mexico', 'Panama'
  ],
  uk: [
    'United States', 'Canada', 'Australia', 'New Zealand', 'Japan',
    'South Korea', 'Israel', 'Singapore', 'Malaysia', 'Brunei'
  ],
  usa: [
    'United Kingdom', 'Canada', 'Australia', 'New Zealand', 'Japan',
    'South Korea', 'Germany', 'France', 'Italy', 'Spain', 'Netherlands',
    'Sweden', 'Norway', 'Denmark', 'Finland', 'Switzerland'
  ],
  canada: [
    'United States', 'United Kingdom', 'Australia', 'New Zealand', 'Japan',
    'South Korea', 'Germany', 'France', 'Italy', 'Spain', 'Netherlands'
  ],
  australia: [
    'New Zealand', 'United States', 'Canada', 'United Kingdom', 'Japan',
    'South Korea', 'Singapore', 'Malaysia', 'Brunei'
  ],
  japan: [
    'United States', 'Canada', 'United Kingdom', 'Australia', 'New Zealand',
    'South Korea', 'Germany', 'France', 'Italy', 'Spain', 'Singapore'
  ]
};

// Check if visa is required
export const checkVisaRequirement = (nationality: string, destination: string, purpose: string = 'tourism') => {
  // Check if destination is Schengen
  const isDestinationSchengen = schengenCountries.includes(destination);
  
  if (isDestinationSchengen) {
    // For Schengen countries, check against Schengen exemptions
    const exemptCountries = visaExemptions.schengen || [];
    const isExempt = exemptCountries.includes(nationality);
    
    return {
      required: !isExempt,
      type: isExempt ? 'visa-free' : 'schengen-visa',
      isSchengen: true
    };
  }
  
  // For non-Schengen countries
  const exemptCountries = visaExemptions[destination as keyof typeof visaExemptions] || [];
  const isExempt = exemptCountries.includes(nationality);
  
  // Special cases for certain purposes
  if (purpose === 'study' || purpose === 'business' && !isExempt) {
    return { required: true, type: purpose, isSchengen: false };
  }
  
  return {
    required: !isExempt,
    type: isExempt ? 'visa-free' : 'tourist-visa',
    isSchengen: false
  };
};

// Multi-destination specific configurations
export const multiDestinationOptions = [
  { value: 'single', label: 'Single Destination' },
  { value: 'multiple', label: 'Multiple Destinations' },
];

// Schengen consulate recommendation logic
export interface SchengenTripData {
  selectedCountries: string[];
  nightsDistribution: { [countryCode: string]: number };
  businessLocation?: string;
  entryPoint: string;
  purpose: string;
}

export interface ConsulateRecommendation {
  primaryConsulate: {
    country: string;
    countryName: string;
    reasoning: string;
    bookingUrl: string;
    processingTime: string;
  };
  alternatives?: {
    country: string;
    countryName: string;
    reasoning: string;
  }[];
  expertConsultationNeeded: boolean;
}

export const getSchengenConsulateRecommendation = (tripData: SchengenTripData): ConsulateRecommendation => {
  const { selectedCountries, nightsDistribution, businessLocation, entryPoint, purpose } = tripData;
  
  // Single country case
  if (selectedCountries.length === 1) {
    const country = selectedCountries[0];
    const countryInfo = destinationCountries.find(c => c.code === country);
    const embassyInfo = schengenEmbassyData[country as keyof typeof schengenEmbassyData];
    
    return {
      primaryConsulate: {
        country,
        countryName: countryInfo?.name || country,
        reasoning: `Single destination trip to ${countryInfo?.name}`,
        bookingUrl: embassyInfo?.bookingUrl || '',
        processingTime: embassyInfo?.processingTime || '15-20 business days'
      },
      expertConsultationNeeded: false
    };
  }
  
  // Business/conference override
  if ((purpose === 'business' || purpose === 'conference') && businessLocation) {
    const countryInfo = destinationCountries.find(c => c.code === businessLocation);
    const embassyInfo = schengenEmbassyData[businessLocation as keyof typeof schengenEmbassyData];
    
    return {
      primaryConsulate: {
        country: businessLocation,
        countryName: countryInfo?.name || businessLocation,
        reasoning: `Business activity takes place in ${countryInfo?.name}, which overrides nights distribution`,
        bookingUrl: embassyInfo?.bookingUrl || '',
        processingTime: embassyInfo?.processingTime || '15-20 business days'
      },
      expertConsultationNeeded: false
    };
  }
  
  // Find country with most nights
  const sortedByNights = Object.entries(nightsDistribution)
    .sort(([,a], [,b]) => b - a);
  
  if (sortedByNights.length === 0) {
    return {
      primaryConsulate: {
        country: entryPoint,
        countryName: destinationCountries.find(c => c.code === entryPoint)?.name || entryPoint,
        reasoning: 'Unable to determine nights distribution, using entry point',
        bookingUrl: '',
        processingTime: '15-20 business days'
      },
      expertConsultationNeeded: true
    };
  }
  
  const [topCountry, topNights] = sortedByNights[0];
  const [secondCountry, secondNights] = sortedByNights[1] || ['', 0];
  
  // Check for tie
  if (secondNights === topNights) {
    // Use entry point as tiebreaker
    const tieBreaker = entryPoint;
    const countryInfo = destinationCountries.find(c => c.code === tieBreaker);
    const embassyInfo = schengenEmbassyData[tieBreaker as keyof typeof schengenEmbassyData];
    
    return {
      primaryConsulate: {
        country: tieBreaker,
        countryName: countryInfo?.name || tieBreaker,
        reasoning: `Tied nights distribution (${topNights} nights each), using first entry point: ${countryInfo?.name}`,
        bookingUrl: embassyInfo?.bookingUrl || '',
        processingTime: embassyInfo?.processingTime || '15-20 business days'
      },
      alternatives: sortedByNights.slice(0, 2).map(([country]) => {
        const info = destinationCountries.find(c => c.code === country);
        return {
          country,
          countryName: info?.name || country,
          reasoning: `${nightsDistribution[country]} nights in ${info?.name}`
        };
      }),
      expertConsultationNeeded: false
    };
  }
  
  // Clear winner by nights
  const countryInfo = destinationCountries.find(c => c.code === topCountry);
  const embassyInfo = schengenEmbassyData[topCountry as keyof typeof schengenEmbassyData];
  
  return {
    primaryConsulate: {
      country: topCountry,
      countryName: countryInfo?.name || topCountry,
      reasoning: `Most nights in ${countryInfo?.name} (${topNights} nights vs ${secondNights} in ${destinationCountries.find(c => c.code === secondCountry)?.name})`,
      bookingUrl: embassyInfo?.bookingUrl || '',
      processingTime: embassyInfo?.processingTime || '15-20 business days'
    },
    expertConsultationNeeded: false
  };
};

// Transit visa requirements for common layover countries
export const transitVisaRequirements = {
  'uk': ['China', 'India', 'Nigeria', 'Pakistan', 'Bangladesh', 'Sri Lanka'],
  'schengen': ['India', 'China', 'Nigeria', 'Turkey', 'Russia'],
  'usa': ['Most countries except VWP nationals'],
  'canada': ['Same as visitor visa requirements'],
  'uae': ['Most nationalities visa-free for <24h transit'],
};

// Check multi-destination visa requirements
export const checkMultiDestinationVisaRequirement = (nationality: string, destinations: string[], purposes: string[] = []) => {
  const results = destinations.map((destination, index) => {
    const purpose = purposes[index] || 'tourism';
    const singleResult = checkVisaRequirement(nationality, destination, purpose);
    return {
      destination,
      ...singleResult,
      destinationName: destinationCountries.find(c => c.code === destination)?.name || destination,
      flag: destinationCountries.find(c => c.code === destination)?.flag || '🌍'
    };
  });

  // Check for common transit countries that might require visas
  const transitWarnings = checkTransitRequirements(nationality, destinations);

  return {
    destinations: results,
    transitWarnings,
    hasVisaRequired: results.some(r => r.required),
    allVisaFree: results.every(r => !r.required),
    totalDestinations: results.length,
    hasSchengenCountries: results.some(r => r.isSchengen)
  };
};

// Check transit visa requirements for multi-destination trips
export const checkTransitRequirements = (nationality: string, destinations: string[]) => {
  const warnings = [];
  
  // Common transit scenarios
  if (destinations.includes('usa') || destinations.includes('canada')) {
    const transitCountries = transitVisaRequirements['usa'];
    if (transitCountries.some(country => nationality.includes(country))) {
      warnings.push({
        type: 'transit',
        message: 'You may need a transit visa for connections through USA/Canada',
        destinations: ['USA', 'Canada']
      });
    }
  }

  if (destinations.some(d => schengenCountries.includes(d))) {
    const transitCountries = transitVisaRequirements['schengen'];
    if (transitCountries.includes(nationality)) {
      warnings.push({
        type: 'transit',
        message: 'Consider transit visa requirements for European connections',
        destinations: ['Europe']
      });
    }
  }

  return warnings;
};

// Get relevant packages for destination
export const getDestinationPackages = (destination: string) => {
  const packageMap = {
    'france': ['Paris Classic', 'French Riviera', 'Loire Valley Castles'],
    'germany': ['Berlin & Munich', 'Romantic Road', 'Oktoberfest Special'],
    'italy': ['Rome & Florence', 'Tuscany Wine Tour', 'Amalfi Coast'],
    'spain': ['Madrid & Barcelona', 'Andalusia Explorer', 'Camino de Santiago'],
    'uk': ['London Royal Experience', 'Scotland Highlands', 'British Isles Explorer'],
    'usa': ['New York City Break', 'California Dreaming', 'East Coast Adventure'],
    'canada': ['Canadian Rockies', 'Toronto & Montreal', 'Vancouver Island'],
    'australia': ['Sydney & Melbourne', 'Great Barrier Reef', 'Outback Adventure'],
    'japan': ['Tokyo & Kyoto Classic', 'Cherry Blossom Tour', 'Cultural Japan'],
    'brazil': ['Rio & São Paulo', 'Amazon Adventure', 'Brazilian Beaches'],
    'india': ['Golden Triangle', 'Kerala Backwaters', 'Rajasthan Royal'],
  };
  
  return packageMap[destination as keyof typeof packageMap] || ['Explore ' + destination];
};
