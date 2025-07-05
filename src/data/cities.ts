// Major cities with population > 10k for autocomplete
export interface City {
  name: string;
  country: string;
  countryCode: string;
  population: number;
  region?: string;
}

// Sample cities - in production this would be loaded from a comprehensive database
export const majorCities: City[] = [
  // Major US Cities
  { name: 'New York', country: 'United States', countryCode: 'US', population: 8419000 },
  { name: 'Los Angeles', country: 'United States', countryCode: 'US', population: 3980000 },
  { name: 'Chicago', country: 'United States', countryCode: 'US', population: 2716000 },
  { name: 'Houston', country: 'United States', countryCode: 'US', population: 2304000 },
  { name: 'Philadelphia', country: 'United States', countryCode: 'US', population: 1584000 },
  { name: 'Phoenix', country: 'United States', countryCode: 'US', population: 1608000 },
  { name: 'San Antonio', country: 'United States', countryCode: 'US', population: 1511000 },
  { name: 'San Diego', country: 'United States', countryCode: 'US', population: 1419000 },
  { name: 'Dallas', country: 'United States', countryCode: 'US', population: 1304000 },
  { name: 'San Jose', country: 'United States', countryCode: 'US', population: 1021000 },
  
  // Major UK Cities
  { name: 'London', country: 'United Kingdom', countryCode: 'GB', population: 8982000 },
  { name: 'Birmingham', country: 'United Kingdom', countryCode: 'GB', population: 1142000 },
  { name: 'Manchester', country: 'United Kingdom', countryCode: 'GB', population: 547000 },
  { name: 'Glasgow', country: 'United Kingdom', countryCode: 'GB', population: 635000 },
  { name: 'Liverpool', country: 'United Kingdom', countryCode: 'GB', population: 500000 },
  { name: 'Leeds', country: 'United Kingdom', countryCode: 'GB', population: 789000 },
  { name: 'Sheffield', country: 'United Kingdom', countryCode: 'GB', population: 582000 },
  { name: 'Edinburgh', country: 'United Kingdom', countryCode: 'GB', population: 518000 },
  { name: 'Bristol', country: 'United Kingdom', countryCode: 'GB', population: 467000 },
  { name: 'Newcastle', country: 'United Kingdom', countryCode: 'GB', population: 300000 },
  
  // Major Canadian Cities
  { name: 'Toronto', country: 'Canada', countryCode: 'CA', population: 2731000 },
  { name: 'Montreal', country: 'Canada', countryCode: 'CA', population: 1704000 },
  { name: 'Vancouver', country: 'Canada', countryCode: 'CA', population: 631000 },
  { name: 'Calgary', country: 'Canada', countryCode: 'CA', population: 1306000 },
  { name: 'Ottawa', country: 'Canada', countryCode: 'CA', population: 934000 },
  { name: 'Edmonton', country: 'Canada', countryCode: 'CA', population: 972000 },
  { name: 'Mississauga', country: 'Canada', countryCode: 'CA', population: 721000 },
  { name: 'Winnipeg', country: 'Canada', countryCode: 'CA', population: 705000 },
  { name: 'Quebec City', country: 'Canada', countryCode: 'CA', population: 532000 },
  { name: 'Hamilton', country: 'Canada', countryCode: 'CA', population: 536000 },
  
  // Major Australian Cities
  { name: 'Sydney', country: 'Australia', countryCode: 'AU', population: 5312000 },
  { name: 'Melbourne', country: 'Australia', countryCode: 'AU', population: 5078000 },
  { name: 'Brisbane', country: 'Australia', countryCode: 'AU', population: 2462000 },
  { name: 'Perth', country: 'Australia', countryCode: 'AU', population: 2059000 },
  { name: 'Adelaide', country: 'Australia', countryCode: 'AU', population: 1345000 },
  { name: 'Gold Coast', country: 'Australia', countryCode: 'AU', population: 679000 },
  { name: 'Canberra', country: 'Australia', countryCode: 'AU', population: 431000 },
  { name: 'Newcastle', country: 'Australia', countryCode: 'AU', population: 322000 },
  { name: 'Wollongong', country: 'Australia', countryCode: 'AU', population: 295000 },
  
  // Major German Cities
  { name: 'Berlin', country: 'Germany', countryCode: 'DE', population: 3669000 },
  { name: 'Hamburg', country: 'Germany', countryCode: 'DE', population: 1899000 },
  { name: 'Munich', country: 'Germany', countryCode: 'DE', population: 1472000 },
  { name: 'Cologne', country: 'Germany', countryCode: 'DE', population: 1085000 },
  { name: 'Frankfurt', country: 'Germany', countryCode: 'DE', population: 753000 },
  { name: 'Stuttgart', country: 'Germany', countryCode: 'DE', population: 626000 },
  { name: 'Düsseldorf', country: 'Germany', countryCode: 'DE', population: 619000 },
  { name: 'Dortmund', country: 'Germany', countryCode: 'DE', population: 588000 },
  { name: 'Essen', country: 'Germany', countryCode: 'DE', population: 583000 },
  { name: 'Leipzig', country: 'Germany', countryCode: 'DE', population: 582000 },
  
  // Major French Cities
  { name: 'Paris', country: 'France', countryCode: 'FR', population: 2161000 },
  { name: 'Marseille', country: 'France', countryCode: 'FR', population: 861000 },
  { name: 'Lyon', country: 'France', countryCode: 'FR', population: 513000 },
  { name: 'Toulouse', country: 'France', countryCode: 'FR', population: 471000 },
  { name: 'Nice', country: 'France', countryCode: 'FR', population: 348000 },
  { name: 'Nantes', country: 'France', countryCode: 'FR', population: 309000 },
  { name: 'Strasbourg', country: 'France', countryCode: 'FR', population: 277000 },
  { name: 'Montpellier', country: 'France', countryCode: 'FR', population: 285000 },
  { name: 'Bordeaux', country: 'France', countryCode: 'FR', population: 254000 },
  { name: 'Lille', country: 'France', countryCode: 'FR', population: 232000 },
  
  // Major Italian Cities
  { name: 'Rome', country: 'Italy', countryCode: 'IT', population: 2873000 },
  { name: 'Milan', country: 'Italy', countryCode: 'IT', population: 1366000 },
  { name: 'Naples', country: 'Italy', countryCode: 'IT', population: 967000 },
  { name: 'Turin', country: 'Italy', countryCode: 'IT', population: 870000 },
  { name: 'Palermo', country: 'Italy', countryCode: 'IT', population: 673000 },
  { name: 'Genoa', country: 'Italy', countryCode: 'IT', population: 583000 },
  { name: 'Bologna', country: 'Italy', countryCode: 'IT', population: 388000 },
  { name: 'Florence', country: 'Italy', countryCode: 'IT', population: 383000 },
  { name: 'Bari', country: 'Italy', countryCode: 'IT', population: 320000 },
  { name: 'Catania', country: 'Italy', countryCode: 'IT', population: 311000 },
  
  // Major Spanish Cities
  { name: 'Madrid', country: 'Spain', countryCode: 'ES', population: 3223000 },
  { name: 'Barcelona', country: 'Spain', countryCode: 'ES', population: 1620000 },
  { name: 'Valencia', country: 'Spain', countryCode: 'ES', population: 791000 },
  { name: 'Seville', country: 'Spain', countryCode: 'ES', population: 688000 },
  { name: 'Zaragoza', country: 'Spain', countryCode: 'ES', population: 675000 },
  { name: 'Málaga', country: 'Spain', countryCode: 'ES', population: 571000 },
  { name: 'Murcia', country: 'Spain', countryCode: 'ES', population: 447000 },
  { name: 'Palma', country: 'Spain', countryCode: 'ES', population: 416000 },
  { name: 'Las Palmas', country: 'Spain', countryCode: 'ES', population: 378000 },
  { name: 'Bilbao', country: 'Spain', countryCode: 'ES', population: 345000 },
  
  // Major Indian Cities
  { name: 'Mumbai', country: 'India', countryCode: 'IN', population: 12478000 },
  { name: 'Delhi', country: 'India', countryCode: 'IN', population: 11007000 },
  { name: 'Bangalore', country: 'India', countryCode: 'IN', population: 8443000 },
  { name: 'Hyderabad', country: 'India', countryCode: 'IN', population: 6809000 },
  { name: 'Ahmedabad', country: 'India', countryCode: 'IN', population: 5570000 },
  { name: 'Chennai', country: 'India', countryCode: 'IN', population: 4681000 },
  { name: 'Kolkata', country: 'India', countryCode: 'IN', population: 4496000 },
  { name: 'Surat', country: 'India', countryCode: 'IN', population: 4467000 },
  { name: 'Pune', country: 'India', countryCode: 'IN', population: 3124000 },
  { name: 'Jaipur', country: 'India', countryCode: 'IN', population: 3073000 },
  
  // Major Nigerian Cities
  { name: 'Lagos', country: 'Nigeria', countryCode: 'NG', population: 14368000 },
  { name: 'Kano', country: 'Nigeria', countryCode: 'NG', population: 3626000 },
  { name: 'Ibadan', country: 'Nigeria', countryCode: 'NG', population: 3565000 },
  { name: 'Abuja', country: 'Nigeria', countryCode: 'NG', population: 3278000 },
  { name: 'Port Harcourt', country: 'Nigeria', countryCode: 'NG', population: 1865000 },
  { name: 'Benin City', country: 'Nigeria', countryCode: 'NG', population: 1495000 },
  { name: 'Maiduguri', country: 'Nigeria', countryCode: 'NG', population: 1112000 },
  { name: 'Kaduna', country: 'Nigeria', countryCode: 'NG', population: 1133000 },
  { name: 'Katsina', country: 'Nigeria', countryCode: 'NG', population: 987000 },
  { name: 'Ilorin', country: 'Nigeria', countryCode: 'NG', population: 908000 }
];

export const searchCities = (query: string, limit: number = 10): City[] => {
  if (!query || query.length < 2) return [];
  
  const lowercaseQuery = query.toLowerCase();
  
  return majorCities
    .filter(city => 
      city.name.toLowerCase().includes(lowercaseQuery) ||
      city.country.toLowerCase().includes(lowercaseQuery)
    )
    .sort((a, b) => {
      // Prioritize exact matches
      const aStartsWith = a.name.toLowerCase().startsWith(lowercaseQuery);
      const bStartsWith = b.name.toLowerCase().startsWith(lowercaseQuery);
      
      if (aStartsWith && !bStartsWith) return -1;
      if (!aStartsWith && bStartsWith) return 1;
      
      // Then sort by population (larger cities first)
      return b.population - a.population;
    })
    .slice(0, limit);
};

export const getCityDisplay = (city: City): string => {
  return `${city.name}, ${city.country}`;
};