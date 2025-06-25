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

// Updated visa-exempt countries with comprehensive lists
export const visaExemptions = {
  // Schengen countries - Western passport holders
  schengen: [
    'United States', 'Canada', 'Australia', 'United Kingdom', 'Japan', 
    'South Korea', 'New Zealand', 'Israel', 'Singapore', 'Malaysia', 'Brunei',
    'Chile', 'Uruguay', 'Argentina', 'Brazil', 'Mexico', 'Panama', 'Costa Rica',
    'Honduras', 'El Salvador', 'Nicaragua', 'Guatemala', 'Venezuela', 'Colombia',
    'Peru', 'Paraguay', 'Bolivia', 'Ecuador', 'Barbados', 'Antigua and Barbuda',
    'Bahamas', 'Dominica', 'Grenada', 'Saint Kitts and Nevis', 'Saint Lucia',
    'Saint Vincent and the Grenadines', 'Trinidad and Tobago', 'Seychelles',
    'Mauritius', 'Taiwan', 'Hong Kong', 'Macao', 'Montenegro', 'Serbia',
    'North Macedonia', 'Albania', 'Bosnia and Herzegovina', 'Moldova', 'Ukraine',
    'Georgia'
  ],
  uk: [
    'United States', 'Canada', 'Australia', 'New Zealand', 'Japan',
    'South Korea', 'Israel', 'Singapore', 'Malaysia', 'Brunei',
    // EU countries
    'Austria', 'Belgium', 'Croatia', 'Czech Republic', 'Denmark', 'Estonia',
    'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Italy',
    'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Malta', 'Netherlands',
    'Norway', 'Poland', 'Portugal', 'Slovakia', 'Slovenia', 'Spain', 'Sweden',
    'Switzerland', 'Bulgaria', 'Romania', 'Cyprus'
  ],
  // Canada eTA required countries
  canada_eta: [
    'United Kingdom', 'Ireland', 'Australia', 'New Zealand', 'Japan', 'South Korea',
    'Israel', 'Singapore', 'Malaysia', 'Brunei', 'Chile', 'Taiwan',
    // EU countries
    'Austria', 'Belgium', 'Croatia', 'Czech Republic', 'Denmark', 'Estonia',
    'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Italy',
    'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Malta', 'Netherlands',
    'Norway', 'Poland', 'Portugal', 'Slovakia', 'Slovenia', 'Spain', 'Sweden',
    'Switzerland', 'Bulgaria', 'Romania', 'Cyprus'
  ],
  // UAE Visa-on-Arrival countries (~70 countries)
  uae: [
    'United States', 'Canada', 'Australia', 'New Zealand', 'United Kingdom',
    'Ireland', 'Japan', 'South Korea', 'Singapore', 'Malaysia', 'Brunei',
    'Hong Kong', 'Taiwan', 'Macao', 'Seychelles', 'Mauritius',
    // EU countries
    'Austria', 'Belgium', 'Croatia', 'Czech Republic', 'Denmark', 'Estonia',
    'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Italy',
    'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Malta', 'Netherlands',
    'Norway', 'Poland', 'Portugal', 'Slovakia', 'Slovenia', 'Spain', 'Sweden',
    'Switzerland', 'Bulgaria', 'Romania', 'Cyprus',
    'Chile', 'Uruguay', 'Argentina', 'Brazil', 'Mexico', 'Kazakhstan',
    'Russia', 'Ukraine', 'Moldova', 'Georgia', 'Armenia', 'Serbia', 'Montenegro',
    'North Macedonia', 'Albania', 'Bosnia and Herzegovina'
  ],
  // Brazil visa-free (most of Europe & Latin America)
  brazil: [
    'Argentina', 'Uruguay', 'Paraguay', 'Chile', 'Bolivia', 'Peru', 'Ecuador',
    'Colombia', 'Venezuela', 'Guyana', 'Suriname', 'French Guiana',
    // EU countries
    'Austria', 'Belgium', 'Croatia', 'Czech Republic', 'Denmark', 'Estonia',
    'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Italy',
    'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Malta', 'Netherlands',
    'Norway', 'Poland', 'Portugal', 'Slovakia', 'Slovenia', 'Spain', 'Sweden',
    'Switzerland', 'Bulgaria', 'Romania', 'Cyprus', 'Ireland', 'United Kingdom'
  ],
  // Nigeria ECOWAS visa-free
  nigeria_ecowas: [
    'Benin', 'Burkina Faso', 'Cape Verde', 'Ivory Coast', 'Gambia', 'Ghana',
    'Guinea', 'Guinea-Bissau', 'Liberia', 'Mali', 'Niger', 'Senegal',
    'Sierra Leone', 'Togo'
  ],
  usa: [
    'United Kingdom', 'Canada', 'Australia', 'New Zealand', 'Japan',
    'South Korea', 'Germany', 'France', 'Italy', 'Spain', 'Netherlands',
    'Sweden', 'Norway', 'Denmark', 'Finland', 'Switzerland'
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

// Countries that require UK ETA (Electronic Travel Authorization) - coming soon
export const ukETARequiredCountries = [
  'United States', 'Canada', 'Australia', 'New Zealand', 'Japan',
  'South Korea', 'Singapore', 'Malaysia', 'Brunei', 'Israel',
  'UAE', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Bahrain', 'Oman',
  // EU countries
  'Austria', 'Belgium', 'Croatia', 'Czech Republic', 'Denmark', 'Estonia',
  'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Italy',
  'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Malta', 'Netherlands',
  'Norway', 'Poland', 'Portugal', 'Slovakia', 'Slovenia', 'Spain', 'Sweden',
  'Switzerland', 'Bulgaria', 'Romania', 'Cyprus'
];

// India e-Visa eligible countries (170+ countries)
export const indiaEVisaCountries = [
  'United States', 'Canada', 'Australia', 'New Zealand', 'United Kingdom',
  'Ireland', 'Japan', 'South Korea', 'Singapore', 'Malaysia', 'Thailand',
  'Indonesia', 'Philippines', 'Vietnam', 'China', 'Russia', 'Brazil',
  'Argentina', 'Chile', 'Mexico', 'South Africa', 'Egypt', 'Morocco',
  'Turkey', 'Israel', 'UAE', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Bahrain',
  'Oman', 'Jordan', 'Lebanon', 'Georgia', 'Armenia', 'Azerbaijan', 'Kazakhstan',
  // EU countries and many others
  'Austria', 'Belgium', 'Croatia', 'Czech Republic', 'Denmark', 'Estonia',
  'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Italy',
  'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Malta', 'Netherlands',
  'Norway', 'Poland', 'Portugal', 'Slovakia', 'Slovenia', 'Spain', 'Sweden',
  'Switzerland', 'Bulgaria', 'Romania', 'Cyprus'
];

// Brazil e-Visa countries (starting April 2025)
export const brazilEVisaCountries = [
  'United States', 'Canada', 'Australia', 'Japan'
];

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
  
  // Special handling for specific countries
  if (destination === 'uk') {
    const exemptCountries = visaExemptions.uk || [];
    const isVisaExempt = exemptCountries.includes(nationality);
    const needsETA = ukETARequiredCountries.includes(nationality);
    
    if (needsETA && isVisaExempt) {
      return {
        required: true,
        type: 'eta',
        isSchengen: false,
        special: 'UK ETA (Electronic Travel Authorization) coming soon'
      };
    } else if (!isVisaExempt) {
      return {
        required: true,
        type: 'uk-standard-visitor',
        isSchengen: false
      };
    } else {
      return {
        required: false,
        type: 'visa-free',
        isSchengen: false
      };
    }
  }
  
  if (destination === 'canada') {
    if (nationality === 'United States') {
      return { required: false, type: 'visa-free', isSchengen: false };
    }
    const etaCountries = visaExemptions.canada_eta || [];
    if (etaCountries.includes(nationality)) {
      return { required: true, type: 'eta', isSchengen: false };
    }
    return { required: true, type: 'canadian-trv', isSchengen: false };
  }
  
  if (destination === 'uae') {
    const voaCountries = visaExemptions.uae || [];
    const isExempt = voaCountries.includes(nationality);
    return {
      required: !isExempt,
      type: isExempt ? 'visa-on-arrival' : 'uae-e-visa',
      isSchengen: false
    };
  }
  
  if (destination === 'brazil') {
    const exemptCountries = visaExemptions.brazil || [];
    const needsEVisa = brazilEVisaCountries.includes(nationality);
    const isExempt = exemptCountries.includes(nationality);
    
    if (needsEVisa) {
      return { required: true, type: 'brazil-e-visa', isSchengen: false };
    }
    return {
      required: !isExempt,
      type: isExempt ? 'visa-free' : 'brazil-visa',
      isSchengen: false
    };
  }
  
  if (destination === 'india') {
    const eVisaEligible = indiaEVisaCountries.includes(nationality);
    return {
      required: true,
      type: eVisaEligible ? 'india-e-visa' : 'india-visa',
      isSchengen: false
    };
  }
  
  if (destination === 'nigeria') {
    const ecowasCountries = visaExemptions.nigeria_ecowas || [];
    const isEcowas = ecowasCountries.includes(nationality);
    return {
      required: !isEcowas,
      type: isEcowas ? 'visa-free' : 'nigeria-visa-on-arrival',
      isSchengen: false
    };
  }
  
  // For other destinations, use existing logic
  const exemptCountries = visaExemptions[destination as keyof typeof visaExemptions] || [];
  const isExempt = exemptCountries.includes(nationality);
  
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
