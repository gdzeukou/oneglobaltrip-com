
import { allCountries } from './visaRequirements';

interface VisaCheckResult {
  required: boolean;
  visaType?: string;
  processingTime?: string;
  documents?: string[];
  message?: string;
  isSchengen?: boolean;
  fallback?: boolean;
}

// Common document lists
const commonTouristDocuments = [
  'Valid passport (6+ months validity)',
  'Completed visa application form',
  'Recent passport-sized photos',
  'Proof of accommodation',
  'Flight itinerary',
  'Bank statements (3 months)',
  'Travel insurance'
];

const commonBusinessDocuments = [
  'Valid passport (6+ months validity)',
  'Business visa application form',
  'Company letter/invitation',
  'Recent passport-sized photos',
  'Proof of accommodation',
  'Flight itinerary',
  'Bank statements',
  'Business registration documents'
];

// Schengen countries
const schengenCountries = [
  'Austria', 'Belgium', 'Croatia', 'Czech Republic', 'Denmark', 'Estonia',
  'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Italy',
  'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Malta', 'Netherlands',
  'Norway', 'Poland', 'Portugal', 'Slovakia', 'Slovenia', 'Spain', 'Sweden', 'Switzerland'
];

// Visa-exempt countries for Schengen (90 days)
const schengenVisaExempt = [
  'United States', 'Canada', 'Australia', 'United Kingdom', 'Japan', 'South Korea',
  'New Zealand', 'Israel', 'Singapore', 'Malaysia', 'Brunei', 'Chile', 'Uruguay',
  'Argentina', 'Brazil', 'Mexico', 'Panama', 'Costa Rica'
];

// Countries that typically don't need visas for many destinations
const strongPassports = [
  'Germany', 'Singapore', 'Finland', 'Luxembourg', 'Spain', 'Italy', 'Austria',
  'Denmark', 'Sweden', 'France', 'Ireland', 'Netherlands', 'Switzerland',
  'Belgium', 'Norway', 'United Kingdom', 'Portugal', 'Japan', 'South Korea'
];

export const checkVisaRequirement = (
  nationality: string,
  destination: string,
  purpose: string
): VisaCheckResult => {
  // Handle Schengen area destinations
  if (schengenCountries.includes(destination)) {
    // If nationality is from Schengen area
    if (schengenCountries.includes(nationality)) {
      return {
        required: false,
        message: `As a ${nationality} citizen, you can travel freely within the Schengen area with just your national ID card or passport.`,
        isSchengen: true
      };
    }

    // If nationality is visa-exempt for Schengen
    if (schengenVisaExempt.includes(nationality)) {
      return {
        required: false,
        message: `${nationality} citizens can visit Schengen countries visa-free for up to 90 days within a 180-day period for tourism or business.`,
        isSchengen: true
      };
    }

    // Visa required for Schengen
    return {
      required: true,
      visaType: 'Schengen Short-stay Visa (Type C)',
      processingTime: '15-20 business days',
      documents: purpose === 'Business' ? commonBusinessDocuments : commonTouristDocuments,
      message: `A Schengen visa allows you to visit all 27 Schengen countries. Apply at the consulate of your main destination or longest stay.`,
      isSchengen: true
    };
  }

  // Handle specific country cases
  const countryRules = getCountrySpecificRules(nationality, destination, purpose);
  if (countryRules) {
    return countryRules;
  }

  // Handle strong passport countries
  if (strongPassports.includes(nationality)) {
    const commonVisaFreeDestinations = [
      'United States', 'Canada', 'Australia', 'United Kingdom', 'Japan', 'South Korea',
      'Singapore', 'Malaysia', 'Thailand', 'Philippines', 'Indonesia', 'Vietnam',
      'Turkey', 'Russia', 'China', 'India', 'Brazil', 'Argentina', 'Chile',
      'South Africa', 'Morocco', 'Egypt', 'Jordan', 'UAE', 'Qatar'
    ];

    if (commonVisaFreeDestinations.includes(destination)) {
      return {
        required: false,
        message: `${nationality} citizens typically enjoy visa-free or visa-on-arrival access to ${destination}. Please verify current requirements before travel.`
      };
    }
  }

  // Fallback for unknown combinations
  return {
    required: false,
    fallback: true
  };
};

const getCountrySpecificRules = (
  nationality: string,
  destination: string,
  purpose: string
): VisaCheckResult | null => {
  const key = `${nationality}-${destination}-${purpose}`;
  
  // United States specific rules
  if (destination === 'United States') {
    const viWaiverCountries = [
      'Andorra', 'Australia', 'Austria', 'Belgium', 'Brunei', 'Chile', 'Croatia',
      'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France', 'Germany',
      'Greece', 'Hungary', 'Iceland', 'Ireland', 'Israel', 'Italy', 'Japan',
      'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Malta', 'Monaco',
      'Netherlands', 'New Zealand', 'Norway', 'Poland', 'Portugal', 'San Marino',
      'Singapore', 'Slovakia', 'Slovenia', 'South Korea', 'Spain', 'Sweden',
      'Switzerland', 'Taiwan', 'United Kingdom'
    ];

    if (viWaiverCountries.includes(nationality)) {
      return {
        required: false,
        message: `${nationality} citizens can visit the US for up to 90 days under the Visa Waiver Program (ESTA required).`
      };
    }

    return {
      required: true,
      visaType: purpose === 'Business' ? 'B-1 Business Visa' : 'B-2 Tourist Visa',
      processingTime: '3-5 weeks',
      documents: [
        'Valid passport',
        'DS-160 form',
        'Visa application fee receipt',
        'Interview appointment confirmation',
        'Recent photograph',
        'Supporting documents based on purpose'
      ],
      message: 'US visa requires an interview at the embassy or consulate.'
    };
  }

  // United Kingdom specific rules
  if (destination === 'United Kingdom') {
    const ukVisaFree = [
      'United States', 'Canada', 'Australia', 'New Zealand', 'Japan', 'South Korea',
      'Singapore', 'Malaysia', 'Brunei', 'Hong Kong', 'Taiwan'
    ];

    if (ukVisaFree.includes(nationality)) {
      return {
        required: false,
        message: `${nationality} citizens can visit the UK for up to 6 months without a visa for tourism or business.`
      };
    }

    return {
      required: true,
      visaType: 'UK Standard Visitor Visa',
      processingTime: '3 weeks',
      documents: [
        'Valid passport',
        'Completed application form',
        'Recent photograph',
        'Proof of funds',
        'Travel itinerary',
        'Accommodation proof',
        'Biometric information'
      ]
    };
  }

  // Add more country-specific rules as needed
  return null;
};

export const getTravelPurposes = () => [
  { value: 'tourism', label: 'Tourism / Vacation', flag: '🏖️' },
  { value: 'business', label: 'Business', flag: '💼' },
  { value: 'study', label: 'Study', flag: '📚' },
  { value: 'family', label: 'Family Visit', flag: '👨‍👩‍👧‍👦' },
  { value: 'transit', label: 'Transit', flag: '✈️' },
  { value: 'medical', label: 'Medical', flag: '🏥' },
  { value: 'other', label: 'Other', flag: '📝' }
];

export const getCountryOptions = () => {
  // Country code to flag emoji mapping (partial list)
  const countryFlags: { [key: string]: string } = {
    'United States': '🇺🇸',
    'United Kingdom': '🇬🇧',
    'Canada': '🇨🇦',
    'Australia': '🇦🇺',
    'Germany': '🇩🇪',
    'France': '🇫🇷',
    'Italy': '🇮🇹',
    'Spain': '🇪🇸',
    'Japan': '🇯🇵',
    'China': '🇨🇳',
    'India': '🇮🇳',
    'Brazil': '🇧🇷',
    'Nigeria': '🇳🇬',
    'South Africa': '🇿🇦',
    'Russia': '🇷🇺',
    'Mexico': '🇲🇽',
    'Argentina': '🇦🇷',
    'Turkey': '🇹🇷',
    'South Korea': '🇰🇷',
    'Thailand': '🇹🇭',
    'Singapore': '🇸🇬',
    'Malaysia': '🇲🇾',
    'Indonesia': '🇮🇩',
    'Philippines': '🇵🇭',
    'Vietnam': '🇻🇳',
    'Egypt': '🇪🇬',
    'Morocco': '🇲🇦',
    'UAE': '🇦🇪',
    'Saudi Arabia': '🇸🇦',
    'Israel': '🇮🇱',
    'Jordan': '🇯🇴',
    'Lebanon': '🇱🇧',
    'Pakistan': '🇵🇰',
    'Bangladesh': '🇧🇩',
    'Sri Lanka': '🇱🇰',
    'Nepal': '🇳🇵',
    'Kenya': '🇰🇪',
    'Ghana': '🇬🇭',
    'Ethiopia': '🇪🇹',
    'Tanzania': '🇹🇿',
    'Uganda': '🇺🇬'
  };

  return allCountries.map(country => ({
    value: country,
    label: country,
    flag: countryFlags[country] || '🌍'
  }));
};
