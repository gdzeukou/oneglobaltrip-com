// Enhanced city to IATA code mappings with multi-airport support
export const CITY_TO_IATA: Record<string, string> = {
  // Major US cities - Primary airports
  'houston': 'IAH',
  'h-town': 'IAH',
  'space city': 'IAH',
  'dallas': 'DFW',
  'big d': 'DFW',
  'fort worth': 'DFW',
  'new york': 'JFK',
  'nyc': 'JFK',
  'new york city': 'JFK',
  'manhattan': 'JFK',
  'brooklyn': 'JFK',
  'los angeles': 'LAX',
  'la': 'LAX',
  'city of angels': 'LAX',
  'chicago': 'ORD',
  'chi town': 'ORD',
  'windy city': 'ORD',
  'miami': 'MIA',
  'magic city': 'MIA',
  'atlanta': 'ATL',
  'hotlanta': 'ATL',
  'boston': 'BOS',
  'beantown': 'BOS',
  'seattle': 'SEA',
  'emerald city': 'SEA',
  'san francisco': 'SFO',
  'sf': 'SFO',
  'frisco': 'SFO',
  'bay area': 'SFO',
  'las vegas': 'LAS',
  'vegas': 'LAS',
  'sin city': 'LAS',
  'denver': 'DEN',
  'mile high city': 'DEN',
  'phoenix': 'PHX',
  'valley of the sun': 'PHX',
  'philadelphia': 'PHL',
  'philly': 'PHL',
  'city of brotherly love': 'PHL',
  'detroit': 'DTW',
  'motor city': 'DTW',
  'minneapolis': 'MSP',
  'twin cities': 'MSP',
  'orlando': 'MCO',
  'o-town': 'MCO',
  'charlotte': 'CLT',
  'queen city': 'CLT',
  'washington': 'DCA',
  'dc': 'DCA',
  'washington dc': 'DCA',
  'baltimore': 'BWI',
  'nashville': 'BNA',
  'music city': 'BNA',
  'austin': 'AUS',
  'atx': 'AUS',
  'keep it weird': 'AUS',
  'san antonio': 'SAT',
  'alamo city': 'SAT',
  'san diego': 'SAN',
  'america finest city': 'SAN',
  'portland': 'PDX',
  'rose city': 'PDX',
  'salt lake city': 'SLC',
  'slc': 'SLC',
  
  // International cities
  'london': 'LHR',
  'big ben': 'LHR',
  'england': 'LHR',
  'paris': 'CDG',
  'city of lights': 'CDG',
  'city of love': 'CDG',
  'madrid': 'MAD',
  'barcelona': 'BCN',
  'rome': 'FCO',
  'eternal city': 'FCO',
  'amsterdam': 'AMS',
  'venice of the north': 'AMS',
  'berlin': 'BER',
  'munich': 'MUC',
  'frankfurt': 'FRA',
  'zurich': 'ZUR',
  'vienna': 'VIE',
  'brussels': 'BRU',
  'milan': 'MXP',
  'istanbul': 'IST',
  'dubai': 'DXB',
  'city of gold': 'DXB',
  'tokyo': 'NRT',
  'singapore': 'SIN',
  'lion city': 'SIN',
  'sydney': 'SYD',
  'harbour city': 'SYD',
  'toronto': 'YYZ',
  'vancouver': 'YVR',
  'mexico city': 'MEX',
  'cdmx': 'MEX',
  'mumbai': 'BOM',
  'bombay': 'BOM',
  'delhi': 'DEL',
  'new delhi': 'DEL',
  'bangkok': 'BKK',
  'city of angels': 'BKK',
  'hong kong': 'HKG',
  'fragrant harbor': 'HKG',
  'seoul': 'ICN',
  'beijing': 'PEK',
  'shanghai': 'PVG',
  'rio de janeiro': 'GIG',
  'rio': 'GIG',
  'sao paulo': 'GRU',
  'buenos aires': 'EZE',
  'lima': 'LIM',
  'bogota': 'BOG',
  'caracas': 'CCS',
  'johannesburg': 'JNB',
  'jo-burg': 'JNB',
  'cape town': 'CPT',
  'cairo': 'CAI',
  'casablanca': 'CMN',
  'lagos': 'LOS',
  'nairobi': 'NBO',
  'addis ababa': 'ADD',
  'melbourne': 'MEL',
  'perth': 'PER',
  'auckland': 'AKL',
  'wellington': 'WLG'
};

// Enhanced multi-airport city mappings with detailed information
export const CITY_AIRPORTS: Record<string, { 
  primary: string; 
  secondary?: string[]; 
  name: string;
  details: Record<string, {
    name: string;
    distance: string;
    airlines: string[];
    note: string;
  }>;
  routePreferences?: Record<string, string>;
}> = {
  'houston': { 
    primary: 'IAH', 
    secondary: ['HOU'], 
    name: 'Houston',
    details: {
      'IAH': {
        name: 'George Bush Intercontinental Airport',
        distance: '23 miles north of downtown',
        airlines: ['United (Hub)', 'American', 'Delta', 'Southwest'],
        note: 'Major international hub with more flight options'
      },
      'HOU': {
        name: 'William P. Hobby Airport',
        distance: '7 miles southeast of downtown',
        airlines: ['Southwest (Hub)', 'American', 'Delta'],
        note: 'Southwest hub, closer to downtown, great for domestic flights'
      }
    },
    routePreferences: {
      'DAL': 'HOU', // HOU-DAL preferred for Southwest
      'DFW': 'IAH'  // IAH-DFW for major carriers
    }
  },
  'dallas': { 
    primary: 'DFW', 
    secondary: ['DAL'], 
    name: 'Dallas',
    details: {
      'DFW': {
        name: 'Dallas/Fort Worth International Airport',
        distance: '20 miles northwest of downtown',
        airlines: ['American (Hub)', 'United', 'Delta', 'Southwest'],
        note: 'Major American Airlines hub with extensive domestic and international network'
      },
      'DAL': {
        name: 'Dallas Love Field Airport',
        distance: '6 miles northwest of downtown',
        airlines: ['Southwest (Hub)', 'Alaska'],
        note: 'Southwest hub, closer to downtown, mainly domestic flights'
      }
    },
    routePreferences: {
      'HOU': 'DAL', // DAL-HOU preferred for Southwest
      'IAH': 'DFW'  // DFW-IAH for major carriers
    }
  },
  'new york': { 
    primary: 'JFK', 
    secondary: ['LGA', 'EWR'], 
    name: 'New York',
    details: {
      'JFK': {
        name: 'John F. Kennedy International Airport',
        distance: '15 miles southeast of Manhattan',
        airlines: ['American', 'Delta (Hub)', 'United', 'JetBlue (Hub)'],
        note: 'Major international gateway, most international flights'
      },
      'LGA': {
        name: 'LaGuardia Airport',
        distance: '8 miles northeast of Manhattan',
        airlines: ['American', 'Delta', 'United', 'Southwest'],
        note: 'Mainly domestic flights, closest to Manhattan, recently renovated'
      },
      'EWR': {
        name: 'Newark Liberty International Airport',
        distance: '11 miles southwest of Manhattan',
        airlines: ['United (Hub)', 'American', 'Delta'],
        note: 'United hub, good mix of domestic and international flights'
      }
    }
  },
  'nyc': { 
    primary: 'JFK', 
    secondary: ['LGA', 'EWR'], 
    name: 'New York',
    details: {
      'JFK': {
        name: 'John F. Kennedy International Airport',
        distance: '15 miles southeast of Manhattan',
        airlines: ['American', 'Delta (Hub)', 'United', 'JetBlue (Hub)'],
        note: 'Major international gateway, most international flights'
      },
      'LGA': {
        name: 'LaGuardia Airport',
        distance: '8 miles northeast of Manhattan',
        airlines: ['American', 'Delta', 'United', 'Southwest'],
        note: 'Mainly domestic flights, closest to Manhattan'
      },
      'EWR': {
        name: 'Newark Liberty International Airport',
        distance: '11 miles southwest of Manhattan',
        airlines: ['United (Hub)', 'American', 'Delta'],
        note: 'United hub, good for both domestic and international'
      }
    }
  },
  'chicago': { 
    primary: 'ORD', 
    secondary: ['MDW'], 
    name: 'Chicago',
    details: {
      'ORD': {
        name: "O'Hare International Airport",
        distance: '17 miles northwest of downtown',
        airlines: ['American (Hub)', 'United (Hub)', 'Delta', 'Southwest'],
        note: 'Major hub for American and United, extensive network'
      },
      'MDW': {
        name: 'Midway International Airport',
        distance: '10 miles southwest of downtown',
        airlines: ['Southwest (Hub)', 'American', 'Delta'],
        note: 'Southwest hub, closer to downtown, generally less crowded'
      }
    }
  },
  'washington': { 
    primary: 'DCA', 
    secondary: ['IAD', 'BWI'], 
    name: 'Washington DC',
    details: {
      'DCA': {
        name: 'Ronald Reagan Washington National Airport',
        distance: '5 miles south of downtown DC',
        airlines: ['American', 'Delta', 'United', 'Southwest'],
        note: 'Most convenient to DC, perimeter rule limits long-distance flights'
      },
      'IAD': {
        name: 'Washington Dulles International Airport',
        distance: '26 miles west of downtown DC',
        airlines: ['United (Hub)', 'American', 'Delta'],
        note: 'United hub, best for international and long-distance domestic flights'
      },
      'BWI': {
        name: 'Baltimore/Washington International Airport',
        distance: '32 miles northeast of downtown DC',
        airlines: ['Southwest (Focus City)', 'American', 'Delta'],
        note: 'Southwest focus city, often has competitive fares'
      }
    }
  },
  'los angeles': { 
    primary: 'LAX', 
    secondary: ['BUR', 'LGB'], 
    name: 'Los Angeles',
    details: {
      'LAX': {
        name: 'Los Angeles International Airport',
        distance: '18 miles southwest of downtown',
        airlines: ['American', 'Delta', 'United', 'Southwest', 'Alaska'],
        note: 'Major international hub with most flight options'
      },
      'BUR': {
        name: 'Hollywood Burbank Airport',
        distance: '12 miles northwest of downtown',
        airlines: ['Southwest', 'American', 'Delta', 'Alaska'],
        note: 'Convenient for Hollywood/San Fernando Valley, less crowded'
      },
      'LGB': {
        name: 'Long Beach Airport',
        distance: '20 miles southeast of downtown',
        airlines: ['Southwest', 'American', 'Delta'],
        note: 'Smaller airport with limited but convenient flights'
      }
    }
  },
  'san francisco': {
    primary: 'SFO',
    secondary: ['SJC', 'OAK'],
    name: 'San Francisco',
    details: {
      'SFO': {
        name: 'San Francisco International Airport',
        distance: '13 miles south of downtown',
        airlines: ['United (Hub)', 'American', 'Delta', 'Alaska'],
        note: 'Major international hub, United hub'
      },
      'SJC': {
        name: 'Norman Y. Mineta San José International Airport',
        distance: '45 miles southeast of San Francisco',
        airlines: ['Southwest', 'American', 'Delta', 'Alaska'],
        note: 'Convenient for Silicon Valley, Southwest focus'
      },
      'OAK': {
        name: 'Oakland International Airport',
        distance: '11 miles southeast of San Francisco',
        airlines: ['Southwest', 'American', 'Delta', 'Alaska'],
        note: 'Often cheaper fares, less crowded than SFO'
      }
    }
  },
  'london': { 
    primary: 'LHR', 
    secondary: ['LGW', 'STN'], 
    name: 'London',
    details: {
      'LHR': {
        name: 'Heathrow Airport',
        distance: '15 miles west of central London',
        airlines: ['British Airways (Hub)', 'American', 'United', 'Virgin Atlantic'],
        note: 'Major international hub, most US airline connections'
      },
      'LGW': {
        name: 'Gatwick Airport',
        distance: '30 miles south of central London',
        airlines: ['British Airways', 'Virgin Atlantic', 'Norwegian'],
        note: 'Secondary hub, often cheaper fares'
      },
      'STN': {
        name: 'Stansted Airport',
        distance: '35 miles northeast of central London',
        airlines: ['Ryanair', 'easyJet'],
        note: 'Budget airline hub, limited US connections'
      }
    }
  }
};

// Route-specific recommendations and airline preferences
export const ROUTE_PREFERENCES = {
  // Texas Triangle - optimized routes
  'HOU-DAL': {
    recommended: true,
    airlines: ['Southwest Airlines'],
    frequency: 'Every 1-2 hours',
    note: 'Southwest dominates this route with frequent, reliable service'
  },
  'IAH-DFW': {
    recommended: true,
    airlines: ['American Airlines', 'United Airlines'],
    frequency: 'Every 1-2 hours',
    note: 'Major hub-to-hub route, excellent for connections'
  },
  'HOU-DFW': {
    recommended: false,
    airlines: ['American Airlines', 'United Airlines'],
    frequency: 'Limited',
    note: 'Consider HOU-DAL or IAH-DFW for better options'
  },
  'IAH-DAL': {
    recommended: false,
    airlines: ['Southwest Airlines'],
    frequency: 'Very limited',
    note: 'Consider HOU-DAL instead for better Southwest service'
  }
};

// Smart airport selection helper
export function getSmartAirportSuggestion(origin: string, destination: string): {
  recommended: string;
  reason: string;
  alternative?: string;
} | null {
  const originLower = origin.toLowerCase();
  const destLower = destination.toLowerCase();
  
  // Houston to Dallas area
  if ((originLower.includes('houston') || originLower === 'hou' || originLower === 'iah') && 
      (destLower.includes('dallas') || destLower === 'dal' || destLower === 'dfw')) {
    return {
      recommended: 'HOU to DAL',
      reason: 'Southwest Airlines operates frequent flights on this route with competitive fares',
      alternative: 'IAH to DFW for more airline options and better connections'
    };
  }
  
  // Dallas to Houston area
  if ((destLower.includes('houston') || destLower === 'hou' || destLower === 'iah') && 
      (originLower.includes('dallas') || originLower === 'dal' || originLower === 'dfw')) {
    return {
      recommended: 'DAL to HOU',
      reason: 'Southwest Airlines operates frequent flights on this route with competitive fares',
      alternative: 'DFW to IAH for more airline options and better connections'
    };
  }
  
  return null;
}

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};