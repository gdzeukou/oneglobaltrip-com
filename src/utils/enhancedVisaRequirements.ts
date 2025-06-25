import { destinationCountries, schengenCountries, checkVisaRequirement } from '@/data/visaRequirementsDatabase';
import { getNationalVisaCategories, regionalMovementRules } from './nationalVisaCategories';

// Duration mappings with updated thresholds
export const durationMappings = {
  'single-short': 30,      // ≤30 days
  'single-medium': 90,     // 31-90 days
  'multiple-short': 90,    // ≤90 days multiple entries
  'multiple-long': 180,    // >90 days multiple entries
  'long-stay': 365         // >90 days long-stay
};

// Long-stay thresholds by region
export const longStayThresholds = {
  schengen: 90,      // 90 days - Type D national visa required
  uk: 180,           // 6 months
  usa: 180,          // 6 months
  default: 90        // Most other countries
};

// Western passport countries (typically visa-exempt for major destinations)
export const westernPassportCountries = [
  'United States', 'Canada', 'Australia', 'New Zealand', 'United Kingdom',
  'Ireland', 'Japan', 'South Korea', 'Singapore', 'Israel',
  // EU/Schengen countries
  'Austria', 'Belgium', 'Croatia', 'Czech Republic', 'Denmark', 'Estonia',
  'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Italy',
  'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Malta', 'Netherlands',
  'Norway', 'Poland', 'Portugal', 'Slovakia', 'Slovenia', 'Spain', 'Sweden',
  'Switzerland',
  // Other Western countries
  'Chile', 'Uruguay', 'Argentina', 'Brazil', 'Mexico', 'Costa Rica'
];

// UAE Visa-on-Arrival countries (~70 countries)
export const uaeVisaOnArrivalCountries = [
  'United States', 'Canada', 'Australia', 'New Zealand', 'United Kingdom',
  'Ireland', 'Japan', 'South Korea', 'Singapore', 'Malaysia', 'Brunei',
  'Hong Kong', 'Taiwan', 'Macao', 'Seychelles', 'Mauritius',
  // EU countries
  'Austria', 'Belgium', 'Croatia', 'Czech Republic', 'Denmark', 'Estonia',
  'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Italy',
  'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Malta', 'Netherlands',
  'Norway', 'Poland', 'Portugal', 'Slovakia', 'Slovenia', 'Spain', 'Sweden',
  'Switzerland', 'Bulgaria', 'Romania', 'Cyprus',
  // Others
  'Chile', 'Uruguay', 'Argentina', 'Brazil', 'Mexico', 'Kazakhstan',
  'Russia', 'Ukraine', 'Moldova', 'Georgia', 'Armenia', 'Serbia', 'Montenegro',
  'North Macedonia', 'Albania', 'Bosnia and Herzegovina', 'Andorra', 'Monaco',
  'San Marino', 'Vatican City'
];

// Canada eTA required countries (visa-exempt but need eTA)
export const canadaETACountries = [
  'United Kingdom', 'Ireland', 'Australia', 'New Zealand', 'Japan', 'South Korea',
  'Israel', 'Singapore', 'Malaysia', 'Brunei', 'Chile', 'Taiwan',
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
  // EU countries and many others - this is a representative list
  'Austria', 'Belgium', 'Croatia', 'Czech Republic', 'Denmark', 'Estonia',
  'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Italy',
  'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Malta', 'Netherlands',
  'Norway', 'Poland', 'Portugal', 'Slovakia', 'Slovenia', 'Spain', 'Sweden',
  'Switzerland', 'Bulgaria', 'Romania', 'Cyprus'
];

// ECOWAS countries (visa-free for Nigeria)
export const ecowasCountries = [
  'Benin', 'Burkina Faso', 'Cape Verde', 'Ivory Coast', 'Gambia', 'Ghana',
  'Guinea', 'Guinea-Bissau', 'Liberia', 'Mali', 'Niger', 'Nigeria', 'Senegal',
  'Sierra Leone', 'Togo'
];

// Brazil e-Visa countries (starting April 2025)
export const brazilEVisaCountries = [
  'United States', 'Canada', 'Australia', 'Japan'
];

// Enhanced visa requirement check with updated national visa logic
export const checkEnhancedVisaRequirement = (
  nationality: string,
  destination: string,
  purpose: string,
  duration: string
) => {
  const durationDays = durationMappings[duration as keyof typeof durationMappings] || 0;
  const isWesternPassport = westernPassportCountries.includes(nationality);
  const isSchengenDestination = schengenCountries.includes(destination);
  const destinationInfo = destinationCountries.find(c => c.code === destination);
  
  // Determine long-stay threshold
  let longStayThreshold = longStayThresholds.default;
  if (isSchengenDestination) {
    longStayThreshold = longStayThresholds.schengen;
  } else if (['uk', 'usa'].includes(destination)) {
    longStayThreshold = longStayThresholds[destination as keyof typeof longStayThresholds];
  }
  
  // Universal requirements message
  const universalReqs = "Remember: valid passport, proof of funds & return ticket required.";
  
  // Check if this is a long-stay scenario requiring national visa
  const requiresNationalVisa = durationDays > longStayThreshold || 
    ['work', 'study', 'family'].includes(purpose) ||
    duration === 'long-stay';
  
  // Schengen Area Rules
  if (isSchengenDestination) {
    if (requiresNationalVisa) {
      const categories = getNationalVisaCategories(destination, purpose);
      const movementRules = regionalMovementRules.schengen.typeD;
      
      return {
        required: true,
        type: 'national-visa',
        isSchengen: true,
        message: `For stays longer than 90 days or ${purpose} purposes, you need a ${destinationInfo?.name} national visa (Type D). ${movementRules.description}. ${universalReqs}`,
        showPackages: false,
        nationalVisaCategories: categories,
        regionalMovement: movementRules
      };
    } else if (isWesternPassport && durationDays <= 90 && (purpose === 'tourism' || purpose === 'business')) {
      return {
        required: false,
        type: 'visa-free',
        isSchengen: true,
        message: `Great news—your passport allows visa-free entry to the Schengen Area for up to 90 days within any 180-day period! ${universalReqs}`,
        showPackages: true,
        maxStayDays: 90
      };
    } else if (!isWesternPassport && durationDays <= 90) {
      return {
        required: true,
        type: 'schengen-visa',
        isSchengen: true,
        message: `You'll need a Schengen visa (Type C) for short stays in ${destinationInfo?.name}. Apply online, book biometrics, and show travel insurance/funds.`,
        showPackages: false
      };
    }
  }
  
  // UK Rules with updated 6-month threshold
  if (destination === 'uk') {
    if (requiresNationalVisa) {
      const categories = getNationalVisaCategories(destination, purpose);
      return {
        required: true,
        type: 'uk-long-stay',
        isSchengen: false,
        message: `For stays longer than 6 months or ${purpose} purposes, you need a UK long-stay visa. Work/study requires specific permits with pathway to settlement.`,
        showPackages: false,
        nationalVisaCategories: categories
      };
    } else if (isWesternPassport && durationDays <= 180 && (purpose === 'tourism' || purpose === 'business')) {
      return {
        required: false,
        type: 'visa-free',
        isSchengen: false,
        message: `No visa required for stays up to 6 months in the UK! Note: UK will soon introduce ETA requirement. ${universalReqs}`,
        showPackages: true,
        maxStayDays: 180
      };
    } else if (!isWesternPassport) {
      return {
        required: true,
        type: 'uk-standard-visitor',
        isSchengen: false,
        message: `You'll need a UK Standard Visitor visa. Apply online, book biometrics, and show financial evidence.`,
        showPackages: false
      };
    }
  }
  
  // USA Rules with updated 6-month threshold
  if (destination === 'usa') {
    if (requiresNationalVisa) {
      const categories = getNationalVisaCategories(destination, purpose);
      return {
        required: true,
        type: 'usa-long-stay',
        isSchengen: false,
        message: `For stays longer than 6 months or ${purpose} purposes, you need specific US visas (H-1B, L-1, student visas, etc.). Green card pathway available.`,
        showPackages: false,
        nationalVisaCategories: categories
      };
    }
    // Continue with existing USA logic for short stays...
  }
  
  // Canada Rules
  if (destination === 'canada') {
    if (requiresNationalVisa) {
      const categories = getNationalVisaCategories(destination, purpose);
      return {
        required: true,
        type: 'canada-long-stay',
        isSchengen: false,
        message: `For ${purpose} purposes or long stays, Canada offers Express Entry and other pathways to permanent residence (~3 years to citizenship).`,
        showPackages: false,
        nationalVisaCategories: categories
      };
    }
    // Continue with existing Canada logic...
    if (nationality === 'United States') {
      return {
        required: false,
        type: 'visa-free',
        isSchengen: false,
        message: `US citizens can enter Canada visa-free with valid passport. ${universalReqs}`,
        showPackages: true,
        maxStayDays: 180
      };
    } else if (canadaETACountries.includes(nationality)) {
      return {
        required: true,
        type: 'eta',
        isSchengen: false,
        message: `You need a Canadian eTA (Electronic Travel Authorization) - $7 CAD online application. Quick approval, valid for 5 years. ${universalReqs}`,
        showPackages: false
      };
    } else {
      return {
        required: true,
        type: 'canadian-trv',
        isSchengen: false,
        message: `You need a Canadian Temporary Resident Visa (TRV). File online application and get up to 6 months stay. ${universalReqs}`,
        showPackages: false
      };
    }
  }
  
  // UAE Rules
  if (destination === 'uae') {
    if (requiresNationalVisa || purpose === 'work') {
      const categories = getNationalVisaCategories(destination, purpose);
      return {
        required: true,
        type: 'uae-long-stay',
        isSchengen: false,
        message: `For work or long-term residence, UAE offers Golden Visa (5-10 years) and other residence permits. No direct citizenship pathway.`,
        showPackages: false,
        nationalVisaCategories: categories
      };
    } else if (uaeVisaOnArrivalCountries.includes(nationality)) {
      return {
        required: false,
        type: 'visa-on-arrival',
        isSchengen: false,
        message: `Great news! You get a free 30-90 day visa-on-arrival in the UAE. Just walk in with your passport! ${universalReqs}`,
        showPackages: true,
        maxStayDays: 90
      };
    } else {
      return {
        required: true,
        type: 'uae-e-visa',
        isSchengen: false,
        message: `You need a sponsor-backed UAE e-Visa (30-60 days, extendable once). Book through hotels or tour operators. ${universalReqs}`,
        showPackages: false
      };
    }
  }
  
  // Brazil Rules
  if (destination === 'brazil') {
    if (isWesternPassport && !brazilEVisaCountries.includes(nationality)) {
      return {
        required: false,
        type: 'visa-free',
        isSchengen: false,
        message: `Visa-free entry to Brazil for up to 90 days per trip, 180 days per year! ${universalReqs}`,
        showPackages: true,
        maxStayDays: 90
      };
    } else if (brazilEVisaCountries.includes(nationality)) {
      return {
        required: true,
        type: 'brazil-e-visa',
        isSchengen: false,
        message: `Brazil e-Visa required (starting April 2025) - approximately $80 USD, quick online process. 90 days per trip, 180 days/year max. ${universalReqs}`,
        showPackages: false
      };
    } else {
      return {
        required: true,
        type: 'brazil-visa',
        isSchengen: false,
        message: `Brazil visa required - apply through consulate. 90 days per trip, 180 days/year max. ${universalReqs}`,
        showPackages: false
      };
    }
  }
  
  // India Rules
  if (destination === 'india') {
    if (indiaEVisaCountries.includes(nationality)) {
      return {
        required: true,
        type: 'india-e-visa',
        isSchengen: false,
        message: `India e-Visa available online for 170+ countries! Usually 30-90 day single-entry stays. Quick processing. ${universalReqs}`,
        showPackages: false
      };
    } else {
      return {
        required: true,
        type: 'india-visa',
        isSchengen: false,
        message: `India visa required - apply through consulate. Various stay durations available. ${universalReqs}`,
        showPackages: false
      };
    }
  }
  
  // Nigeria Rules
  if (destination === 'nigeria') {
    if (ecowasCountries.includes(nationality)) {
      return {
        required: false,
        type: 'visa-free',
        isSchengen: false,
        message: `ECOWAS citizens enter Nigeria visa-free! ${universalReqs}`,
        showPackages: true,
        maxStayDays: 90
      };
    } else {
      return {
        required: true,
        type: 'nigeria-visa-on-arrival',
        isSchengen: false,
        message: `Nigeria offers pre-approved "Visa on Arrival" - apply online first, then collect at airport. Usually 30-90 day stays. ${universalReqs}`,
        showPackages: false
      };
    }
  }
  
  // Default for other countries
  const basicResult = checkVisaRequirement(nationality, destination, purpose);
  return {
    ...basicResult,
    message: `Check specific visa requirements for ${destinationInfo?.name}. ${universalReqs}`,
    showPackages: !basicResult.required
  };
};

// Get packages for destination
export const getDestinationPackagesEnhanced = (destination: string) => {
  const packageMap: { [key: string]: Array<{ id: string; title: string; price: number }> } = {
    'france': [
      { id: 'france-classic', title: 'Paris & Loire Valley Classic', price: 2899 },
      { id: 'france-riviera', title: 'French Riviera Experience', price: 3299 },
      { id: 'france-wine', title: 'Wine Country Tour', price: 2699 }
    ],
    'germany': [
      { id: 'germany-classic', title: 'Berlin & Munich Classic', price: 2599 },
      { id: 'germany-romantic', title: 'Romantic Road Adventure', price: 2799 },
      { id: 'germany-oktoberfest', title: 'Oktoberfest Special', price: 3199 }
    ],
    'italy': [
      { id: 'italy-classic', title: 'Rome & Florence Classic', price: 2999 },
      { id: 'italy-tuscany', title: 'Tuscany Wine Experience', price: 3499 },
      { id: 'italy-amalfi', title: 'Amalfi Coast Romance', price: 3799 }
    ],
    'spain': [
      { id: 'spain-classic', title: 'Madrid & Barcelona', price: 2699 },
      { id: 'spain-andalusia', title: 'Andalusia Explorer', price: 2899 },
      { id: 'spain-camino', title: 'Camino de Santiago', price: 2499 }
    ],
    'uk': [
      { id: 'uk-royal', title: 'London Royal Experience', price: 2799 },
      { id: 'uk-scotland', title: 'Scotland Highlands', price: 3199 },
      { id: 'uk-isles', title: 'British Isles Explorer', price: 3699 }
    ],
    'nigeria': [
      { id: 'nigeria-lagos', title: 'Lagos Business & Culture', price: 1899 },
      { id: 'nigeria-abuja', title: 'Abuja Capital Experience', price: 1699 },
      { id: 'nigeria-cultural', title: 'Nigerian Cultural Heritage', price: 2199 }
    ]
  };
  
  return packageMap[destination] || [
    { id: 'custom', title: `Explore ${destination}`, price: 2999 }
  ];
};
