
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
