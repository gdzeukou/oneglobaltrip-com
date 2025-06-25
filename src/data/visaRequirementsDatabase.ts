// Comprehensive visa requirements database
export const destinationCountries = [
  { code: 'schengen', name: 'Schengen Area', flag: '🇪🇺' },
  { code: 'uk', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'usa', name: 'United States', flag: '🇺🇸' },
  { code: 'canada', name: 'Canada', flag: '🇨🇦' },
  { code: 'australia', name: 'Australia', flag: '🇦🇺' },
  { code: 'japan', name: 'Japan', flag: '🇯🇵' },
  { code: 'china', name: 'China', flag: '🇨🇳' },
  { code: 'india', name: 'India', flag: '🇮🇳' },
  { code: 'brazil', name: 'Brazil', flag: '🇧🇷' },
  { code: 'nigeria', name: 'Nigeria', flag: '🇳🇬' },
  { code: 'uae', name: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'south-africa', name: 'South Africa', flag: '🇿🇦' },
  { code: 'mexico', name: 'Mexico', flag: '🇲🇽' },
];

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
  const exemptCountries = visaExemptions[destination as keyof typeof visaExemptions] || [];
  const isExempt = exemptCountries.includes(nationality);
  
  // Special cases for certain purposes
  if (purpose === 'study' || purpose === 'business' && !isExempt) {
    return { required: true, type: purpose };
  }
  
  return {
    required: !isExempt,
    type: isExempt ? 'visa-free' : 'tourist-visa'
  };
};

// Multi-destination specific configurations
export const multiDestinationOptions = [
  { value: 'single', label: 'Single Destination' },
  { value: 'multiple', label: 'Multiple Destinations' },
];

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
    totalDestinations: results.length
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

  if (destinations.some(d => d === 'schengen' || d === 'uk')) {
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
    'schengen': ['European Grand Tour', 'Paris & Rome Classic', 'Amsterdam & Berlin'],
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
