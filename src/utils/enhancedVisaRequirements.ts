
import { destinationCountries, schengenCountries, checkVisaRequirement } from '@/data/visaRequirementsDatabase';

// Duration mappings
export const durationMappings = {
  'single-short': 30,      // ≤30 days
  'single-medium': 90,     // 31-90 days
  'multiple-short': 90,    // ≤90 days multiple entries
  'multiple-long': 180,    // >90 days multiple entries
  'long-stay': 365         // >90 days long-stay
};

// Enhanced visa requirement check with duration logic
export const checkEnhancedVisaRequirement = (
  nationality: string,
  destination: string,
  purpose: string,
  duration: string
) => {
  const durationDays = durationMappings[duration as keyof typeof durationMappings] || 0;
  const isUSCitizen = nationality === 'United States';
  const isSchengenDestination = schengenCountries.includes(destination);
  
  // US Citizen Logic
  if (isUSCitizen) {
    // Schengen Area Rules
    if (isSchengenDestination) {
      if (durationDays <= 90 && (purpose === 'tourism' || purpose === 'business')) {
        return {
          required: false,
          type: 'visa-free',
          isSchengen: true,
          message: "Great news—U.S. passport holders don't need a visa for up to 90 days in the Schengen Area!",
          showPackages: true,
          maxStayDays: 90
        };
      } else {
        return {
          required: true,
          type: 'long-stay-visa',
          isSchengen: true,
          message: `Trips longer than 90 days require a ${destination} national visa. Let's start your application.`,
          showPackages: false
        };
      }
    }
    
    // UK Rules
    if (destination === 'uk') {
      const maxStayMonths = 6;
      const maxStayDays = maxStayMonths * 30;
      
      if (durationDays <= maxStayDays && (purpose === 'tourism' || purpose === 'business')) {
        return {
          required: false,
          type: 'visa-free',
          isSchengen: false,
          message: "No visa required for U.S. travelers staying up to 6 months in the UK!",
          showPackages: true,
          maxStayDays: maxStayDays
        };
      } else {
        return {
          required: true,
          type: 'uk-visa',
          isSchengen: false,
          message: "You'll need a UK visa. Let's gather your details.",
          showPackages: false
        };
      }
    }
    
    // Non-Schengen EU/EEA (Ireland, Croatia, Bulgaria, Romania, Cyprus)
    const nonSchengenEU = ['ireland', 'croatia', 'bulgaria', 'romania', 'cyprus'];
    if (nonSchengenEU.includes(destination)) {
      if (durationDays <= 90 && (purpose === 'tourism' || purpose === 'business')) {
        return {
          required: false,
          type: 'visa-free',
          isSchengen: false,
          message: `Great news—U.S. passport holders don't need a visa for up to 90 days in ${destination}!`,
          showPackages: true,
          maxStayDays: 90
        };
      } else {
        return {
          required: true,
          type: 'national-visa',
          isSchengen: false,
          message: `You'll need a ${destination} visa. Let's get started on your application.`,
          showPackages: false
        };
      }
    }
  }
  
  // Fallback for non-US citizens or other destinations
  const basicResult = checkVisaRequirement(nationality, destination, purpose);
  return {
    ...basicResult,
    message: `To visit ${destination} for ${purpose}, you'll need a visa. Let's get started on your application now.`,
    showPackages: false
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
    ]
  };
  
  return packageMap[destination] || [
    { id: 'custom', title: `Explore ${destination}`, price: 2999 }
  ];
};
