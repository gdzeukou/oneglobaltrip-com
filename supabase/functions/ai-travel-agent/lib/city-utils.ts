import { CITY_TO_IATA, CITY_AIRPORTS } from './constants.ts';

// Enhanced city IATA code lookup with multi-airport support and fuzzy matching
export function getCityIATA(cityName: string): { code: string; suggestions?: string[]; multiAirport?: boolean; airports?: string[] } {
  const normalized = cityName.toLowerCase().trim();
  console.log('Looking up city:', normalized);
  
  // Check for multi-airport cities first
  if (CITY_AIRPORTS[normalized]) {
    const cityInfo = CITY_AIRPORTS[normalized];
    const allAirports = [cityInfo.primary, ...(cityInfo.secondary || [])];
    return { 
      code: cityInfo.primary,
      multiAirport: true,
      airports: allAirports,
      suggestions: allAirports.map(code => `${cityInfo.name} (${code})`)
    };
  }
  
  // Direct match in simple mapping
  if (CITY_TO_IATA[normalized]) {
    return { code: CITY_TO_IATA[normalized] };
  }
  
  // Fuzzy matching - find cities that contain the search term
  const suggestions: string[] = [];
  const partialMatches: string[] = [];
  
  for (const [city, code] of Object.entries(CITY_TO_IATA)) {
    if (city.includes(normalized)) {
      partialMatches.push(`${city} (${code})`);
    }
  }
  
  // If we found partial matches, suggest them
  if (partialMatches.length > 0) {
    return {
      code: cityName.toUpperCase(), // Return original as fallback
      suggestions: partialMatches.slice(0, 5) // Limit to 5 suggestions
    };
  }
  
  console.log('No match found for city:', cityName);
  return { code: cityName.toUpperCase() };
}