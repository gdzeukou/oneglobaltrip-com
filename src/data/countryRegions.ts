export interface CountryRegion {
  name: string;
  slug: string;
  emoji: string;
  lat: number;
  lng: number;
  description: string;
}

export const COUNTRY_REGIONS: Record<string, CountryRegion[]> = {
  france: [
    { name: 'Île-de-France', slug: 'ile-de-france', emoji: '🗼', lat: 48.85, lng: 2.35, description: 'Paris & surrounds' },
    { name: "Côte d'Azur", slug: 'cote-dazur', emoji: '🏖️', lat: 43.70, lng: 7.25, description: 'French Riviera' },
    { name: 'Provence', slug: 'provence', emoji: '🌻', lat: 43.93, lng: 5.38, description: 'Lavender fields & cuisine' },
    { name: 'Normandy', slug: 'normandy', emoji: '🏰', lat: 49.18, lng: 0.37, description: 'History, cheese & coast' },
    { name: 'Alps', slug: 'alps-france', emoji: '⛷️', lat: 45.83, lng: 6.52, description: 'Skiing & mountain lakes' },
    { name: 'Bordeaux', slug: 'bordeaux', emoji: '🍷', lat: 44.84, lng: -0.58, description: 'World-class wine country' },
  ],
  italy: [
    { name: 'Rome & Lazio', slug: 'rome', emoji: '🏛️', lat: 41.90, lng: 12.50, description: 'Ancient Rome, Vatican' },
    { name: 'Tuscany', slug: 'tuscany', emoji: '🌿', lat: 43.40, lng: 11.00, description: 'Rolling hills, wine, art' },
    { name: 'Amalfi Coast', slug: 'amalfi', emoji: '🍋', lat: 40.63, lng: 14.60, description: 'Cliffside villages & sea' },
    { name: 'Venice & Veneto', slug: 'venice', emoji: '🚤', lat: 45.44, lng: 12.33, description: 'Canals & lagoon city' },
    { name: 'Sicily', slug: 'sicily', emoji: '🌋', lat: 37.60, lng: 14.02, description: 'Culture, beaches, Etna' },
    { name: 'Cinque Terre', slug: 'cinque-terre', emoji: '🎨', lat: 44.13, lng: 9.72, description: 'Colorful coastal villages' },
  ],
  spain: [
    { name: 'Barcelona & Catalonia', slug: 'barcelona', emoji: '🦜', lat: 41.39, lng: 2.17, description: 'Gaudí, beaches & nightlife' },
    { name: 'Madrid', slug: 'madrid', emoji: '🎭', lat: 40.42, lng: -3.70, description: 'Culture, tapas & football' },
    { name: 'Andalusia', slug: 'andalusia', emoji: '💃', lat: 37.39, lng: -5.99, description: 'Flamenco, flamenco, flamenco' },
    { name: 'Ibiza & Balearics', slug: 'ibiza', emoji: '🎉', lat: 38.91, lng: 1.43, description: 'Clubs, coves & sunsets' },
    { name: 'Canary Islands', slug: 'canary-islands', emoji: '🌺', lat: 28.29, lng: -16.63, description: 'Year-round sun & nature' },
    { name: 'Valencia', slug: 'valencia', emoji: '🍊', lat: 39.47, lng: -0.38, description: 'Paella, futuristic architecture' },
  ],
  'united-kingdom': [
    { name: 'London', slug: 'london', emoji: '🎡', lat: 51.51, lng: -0.13, description: 'World city & culture hub' },
    { name: 'Scotland', slug: 'scotland', emoji: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', lat: 56.83, lng: -4.18, description: 'Highlands, castles & whisky' },
    { name: 'The Cotswolds', slug: 'cotswolds', emoji: '🌾', lat: 51.84, lng: -1.83, description: 'Quintessential English countryside' },
    { name: 'Wales', slug: 'wales', emoji: '🐉', lat: 52.13, lng: -3.78, description: 'Mountains, castles & coast' },
    { name: 'Northern Ireland', slug: 'northern-ireland', emoji: '🤝', lat: 54.61, lng: -6.69, description: 'Giants Causeway & history' },
    { name: 'Lake District', slug: 'lake-district', emoji: '🌊', lat: 54.46, lng: -3.09, description: 'Lakes, fells & villages' },
  ],
  japan: [
    { name: 'Tokyo & Kanto', slug: 'tokyo', emoji: '🌸', lat: 35.68, lng: 139.69, description: 'Mega city, anime, tech' },
    { name: 'Kyoto & Kansai', slug: 'kyoto', emoji: '⛩️', lat: 35.01, lng: 135.76, description: 'Temples, geisha & tradition' },
    { name: 'Hokkaido', slug: 'hokkaido', emoji: '❄️', lat: 43.46, lng: 142.99, description: 'Snow, skiing & nature' },
    { name: 'Okinawa', slug: 'okinawa', emoji: '🐠', lat: 26.34, lng: 127.80, description: 'Tropical beaches & reefs' },
    { name: 'Hiroshima & West', slug: 'hiroshima', emoji: '🕊️', lat: 34.39, lng: 132.45, description: 'History & island shrines' },
    { name: 'Japanese Alps', slug: 'japan-alps', emoji: '⛰️', lat: 36.25, lng: 137.97, description: 'Matsumoto, Takayama, Hakuba' },
  ],
  usa: [
    { name: 'New York', slug: 'new-york', emoji: '🗽', lat: 40.71, lng: -74.01, description: 'The city that never sleeps' },
    { name: 'California', slug: 'california', emoji: '🌴', lat: 36.78, lng: -119.42, description: 'LA, SF, beaches & national parks' },
    { name: 'Florida', slug: 'florida', emoji: '🐊', lat: 27.99, lng: -81.76, description: 'Theme parks, beaches & Keys' },
    { name: 'Hawaii', slug: 'hawaii', emoji: '🌺', lat: 20.80, lng: -156.33, description: 'Volcanic islands & surf' },
    { name: 'Southwest', slug: 'usa-southwest', emoji: '🌵', lat: 36.10, lng: -111.84, description: 'Grand Canyon, Vegas, Utah' },
    { name: 'New England', slug: 'new-england', emoji: '🍂', lat: 43.20, lng: -71.55, description: 'Fall foliage & colonial history' },
  ],
  thailand: [
    { name: 'Bangkok', slug: 'bangkok', emoji: '🛺', lat: 13.76, lng: 100.50, description: 'Street food & temples' },
    { name: 'Phuket', slug: 'phuket', emoji: '🏝️', lat: 7.88, lng: 98.39, description: 'Beaches & island-hopping' },
    { name: 'Chiang Mai', slug: 'chiang-mai', emoji: '🐘', lat: 18.79, lng: 98.98, description: 'Temples, trekking & culture' },
    { name: 'Koh Samui', slug: 'koh-samui', emoji: '🌴', lat: 9.56, lng: 100.06, description: 'Coconut coast & full moon' },
    { name: 'Krabi', slug: 'krabi', emoji: '🧗', lat: 8.09, lng: 98.91, description: 'Rock climbing & emerald sea' },
  ],
  australia: [
    { name: 'Sydney & NSW', slug: 'sydney', emoji: '🦘', lat: -33.87, lng: 151.21, description: 'Harbour, beaches & Opera House' },
    { name: 'Melbourne', slug: 'melbourne', emoji: '☕', lat: -37.81, lng: 144.96, description: 'Coffee, culture & sport' },
    { name: 'Queensland', slug: 'queensland', emoji: '🐠', lat: -20.92, lng: 142.70, description: 'Great Barrier Reef & Whitsundays' },
    { name: 'Western Australia', slug: 'western-australia', emoji: '🌅', lat: -25.05, lng: 121.63, description: 'Outback, Margaret River' },
    { name: 'Tasmania', slug: 'tasmania', emoji: '🌿', lat: -42.00, lng: 146.32, description: 'Wild nature & clean air' },
  ],
  'united-arab-emirates': [
    { name: 'Dubai', slug: 'dubai', emoji: '🏙️', lat: 25.20, lng: 55.27, description: 'Skyscrapers, malls & desert' },
    { name: 'Abu Dhabi', slug: 'abu-dhabi', emoji: '🕌', lat: 24.47, lng: 54.37, description: 'Grand Mosque & Formula 1' },
    { name: 'Sharjah', slug: 'sharjah', emoji: '🎨', lat: 25.33, lng: 55.41, description: 'Culture & arts capital of UAE' },
  ],
  indonesia: [
    { name: 'Bali', slug: 'bali', emoji: '🌺', lat: -8.34, lng: 115.09, description: 'Temple culture & surf' },
    { name: 'Jakarta & Java', slug: 'jakarta', emoji: '🏙️', lat: -6.21, lng: 106.85, description: 'Capital & ancient kingdoms' },
    { name: 'Lombok', slug: 'lombok', emoji: '🏔️', lat: -8.65, lng: 116.32, description: 'Rinjani & pristine beaches' },
    { name: 'Raja Ampat', slug: 'raja-ampat', emoji: '🐟', lat: -0.59, lng: 130.60, description: 'World\'s best diving' },
    { name: 'Komodo', slug: 'komodo', emoji: '🦎', lat: -8.55, lng: 119.49, description: 'Komodo dragons & pink beaches' },
  ],
  portugal: [
    { name: 'Lisbon & Coast', slug: 'lisbon', emoji: '🚋', lat: 38.72, lng: -9.14, description: 'Fado, pastéis & tram rides' },
    { name: 'Algarve', slug: 'algarve', emoji: '🏖️', lat: 37.09, lng: -8.24, description: 'Golden beaches & sea caves' },
    { name: 'Porto', slug: 'porto', emoji: '🍷', lat: 41.15, lng: -8.61, description: 'Port wine & tile facades' },
    { name: 'Madeira', slug: 'madeira', emoji: '🌸', lat: 32.76, lng: -16.96, description: 'Volcanic island & levadas' },
    { name: 'Azores', slug: 'azores', emoji: '🌋', lat: 37.74, lng: -25.67, description: 'Green volcanic calderas' },
  ],
  greece: [
    { name: 'Athens & Attica', slug: 'athens', emoji: '🏛️', lat: 37.98, lng: 23.73, description: 'Acropolis & ancient ruins' },
    { name: 'Santorini', slug: 'santorini', emoji: '🌅', lat: 36.39, lng: 25.46, description: 'Blue domes & caldera views' },
    { name: 'Mykonos', slug: 'mykonos', emoji: '🎉', lat: 37.45, lng: 25.33, description: 'Windmills, parties & beaches' },
    { name: 'Crete', slug: 'crete', emoji: '🫒', lat: 35.24, lng: 24.81, description: 'Largest island, ancient palaces' },
    { name: 'Corfu', slug: 'corfu', emoji: '🌿', lat: 39.62, lng: 19.92, description: 'Venetian old town & beaches' },
  ],
  mexico: [
    { name: 'Mexico City', slug: 'mexico-city', emoji: '🏙️', lat: 19.43, lng: -99.13, description: 'Culture, food & art scene' },
    { name: 'Cancún & Riviera Maya', slug: 'cancun', emoji: '🏖️', lat: 21.16, lng: -86.85, description: 'Beaches & Mayan ruins' },
    { name: 'Oaxaca', slug: 'oaxaca', emoji: '🫙', lat: 17.07, lng: -96.72, description: 'Mezcal, mole & indigenous culture' },
    { name: 'Los Cabos', slug: 'los-cabos', emoji: '🌵', lat: 22.89, lng: -109.92, description: 'Desert meets ocean luxury' },
    { name: 'Guadalajara', slug: 'guadalajara', emoji: '🎺', lat: 20.66, lng: -103.35, description: 'Tequila, mariachi & tacos' },
  ],
  brazil: [
    { name: 'Rio de Janeiro', slug: 'rio-de-janeiro', emoji: '🎭', lat: -22.91, lng: -43.17, description: 'Carnival, Christ & beaches' },
    { name: 'São Paulo', slug: 'sao-paulo', emoji: '🏙️', lat: -23.55, lng: -46.63, description: 'Largest city in South America' },
    { name: 'Amazon', slug: 'amazon', emoji: '🌿', lat: -3.10, lng: -60.02, description: 'World\'s greatest rainforest' },
    { name: 'Florianópolis', slug: 'florianopolis', emoji: '🏄', lat: -27.60, lng: -48.55, description: 'Island beaches & surf' },
    { name: 'Pantanal', slug: 'pantanal', emoji: '🐆', lat: -17.98, lng: -57.65, description: 'World\'s largest tropical wetland' },
  ],
  canada: [
    { name: 'Toronto & Ontario', slug: 'toronto', emoji: '🏒', lat: 43.65, lng: -79.38, description: 'Multicultural world city' },
    { name: 'Vancouver & BC', slug: 'vancouver', emoji: '🏔️', lat: 49.28, lng: -123.12, description: 'Mountains meet Pacific coast' },
    { name: 'Quebec', slug: 'quebec', emoji: '🥐', lat: 46.81, lng: -71.21, description: 'French culture & winter carnival' },
    { name: 'Banff & Rockies', slug: 'banff', emoji: '🦌', lat: 51.18, lng: -115.57, description: 'Turquoise lakes & glaciers' },
    { name: 'Maritimes', slug: 'maritimes', emoji: '🦞', lat: 45.95, lng: -64.82, description: 'Lobster, tides & fishing villages' },
  ],
  india: [
    { name: 'Delhi & North', slug: 'delhi', emoji: '🕌', lat: 28.61, lng: 77.21, description: 'Red Fort, Taj Mahal nearby' },
    { name: 'Rajasthan', slug: 'rajasthan', emoji: '🏰', lat: 27.02, lng: 74.22, description: 'Desert palaces & forts' },
    { name: 'Goa', slug: 'goa', emoji: '🌴', lat: 15.30, lng: 74.12, description: 'Beaches, Portuguese culture' },
    { name: 'Kerala', slug: 'kerala', emoji: '🛶', lat: 10.85, lng: 76.27, description: 'Backwaters, spice gardens' },
    { name: 'Mumbai', slug: 'mumbai', emoji: '🎬', lat: 19.08, lng: 72.88, description: 'Bollywood & financial hub' },
  ],
  'south-africa': [
    { name: 'Cape Town & Cape', slug: 'cape-town', emoji: '🏔️', lat: -33.93, lng: 18.42, description: 'Table Mountain & wine routes' },
    { name: 'Kruger & Safari', slug: 'kruger', emoji: '🦁', lat: -24.02, lng: 31.49, description: 'Big Five safari' },
    { name: 'Garden Route', slug: 'garden-route', emoji: '🌿', lat: -33.97, lng: 22.46, description: 'Coastline & forest drives' },
    { name: 'Johannesburg', slug: 'johannesburg', emoji: '💎', lat: -26.20, lng: 28.04, description: 'Gold rush history & art' },
  ],
  kenya: [
    { name: 'Masai Mara', slug: 'masai-mara', emoji: '🦓', lat: -1.51, lng: 35.14, description: 'Great Migration & big cats' },
    { name: 'Nairobi', slug: 'nairobi', emoji: '🏙️', lat: -1.29, lng: 36.82, description: 'Safari gateway & tech hub' },
    { name: 'Diani & Coast', slug: 'diani', emoji: '🏖️', lat: -4.32, lng: 39.57, description: 'White sand & coral reefs' },
    { name: 'Mt. Kenya & Rift', slug: 'mt-kenya', emoji: '🏔️', lat: -0.15, lng: 37.31, description: 'Snow-capped peak & lakes' },
  ],
  morocco: [
    { name: 'Marrakech', slug: 'marrakech', emoji: '🌹', lat: 31.63, lng: -8.00, description: 'Medina, souks & riads' },
    { name: 'Sahara & Merzouga', slug: 'sahara', emoji: '🐪', lat: 31.09, lng: -4.01, description: 'Dunes & desert camps' },
    { name: 'Fes', slug: 'fes', emoji: '🏺', lat: 34.03, lng: -5.00, description: 'Medieval medina & tanneries' },
    { name: 'Essaouira', slug: 'essaouira', emoji: '🌊', lat: 31.51, lng: -9.76, description: 'Windswept blue & white port' },
  ],
  'saudi-arabia': [
    { name: 'Riyadh', slug: 'riyadh', emoji: '🏙️', lat: 24.69, lng: 46.72, description: 'Capital city & business hub' },
    { name: 'Jeddah', slug: 'jeddah', emoji: '⚓', lat: 21.49, lng: 39.19, description: 'Red Sea coast & old city' },
    { name: 'AlUla', slug: 'alula', emoji: '🏜️', lat: 26.62, lng: 37.92, description: 'Ancient Nabataean ruins' },
    { name: 'NEOM', slug: 'neom', emoji: '🔷', lat: 28.00, lng: 35.80, description: 'Future city in the desert' },
  ],
  egypt: [
    { name: 'Cairo & Pyramids', slug: 'cairo', emoji: '🔺', lat: 30.04, lng: 31.24, description: 'Pharaohs & ancient wonders' },
    { name: 'Hurghada', slug: 'hurghada', emoji: '🤿', lat: 27.26, lng: 33.81, description: 'Red Sea diving & resorts' },
    { name: 'Sharm el-Sheikh', slug: 'sharm-el-sheikh', emoji: '🐡', lat: 27.91, lng: 34.33, description: 'Coral reefs & Sinai mountains' },
    { name: 'Luxor & Aswan', slug: 'luxor', emoji: '⛵', lat: 25.69, lng: 32.64, description: 'Valley of Kings & Nile cruise' },
  ],
  colombia: [
    { name: 'Cartagena', slug: 'cartagena', emoji: '🌺', lat: 10.39, lng: -75.51, description: 'Colorful colonial walled city' },
    { name: 'Medellín', slug: 'medellin', emoji: '🌸', lat: 6.25, lng: -75.57, description: 'City of eternal spring' },
    { name: 'Bogotá', slug: 'bogota', emoji: '🏙️', lat: 4.71, lng: -74.07, description: 'Capital at 2,600m altitude' },
    { name: 'Coffee Region', slug: 'coffee-region', emoji: '☕', lat: 4.81, lng: -75.69, description: 'Colombia\'s coffee heartland' },
  ],
  singapore: [
    { name: 'Marina Bay', slug: 'marina-bay', emoji: '🌉', lat: 1.28, lng: 103.86, description: 'Futuristic skyline & Gardens' },
    { name: 'Sentosa', slug: 'sentosa', emoji: '🎢', lat: 1.25, lng: 103.83, description: 'Beaches, resorts & Universal' },
    { name: 'Chinatown & Culture', slug: 'chinatown-sg', emoji: '🏮', lat: 1.28, lng: 103.84, description: 'Heritage temples & food' },
  ],
  vietnam: [
    { name: 'Hanoi & North', slug: 'hanoi', emoji: '🏮', lat: 21.03, lng: 105.85, description: 'Old quarter & Ha Long Bay' },
    { name: 'Ho Chi Minh City', slug: 'ho-chi-minh-city', emoji: '🛵', lat: 10.78, lng: 106.70, description: 'Buzzing southern metropolis' },
    { name: 'Hội An', slug: 'hoi-an', emoji: '🪔', lat: 15.88, lng: 108.33, description: 'Ancient trading port & lanterns' },
    { name: 'Da Nang', slug: 'da-nang', emoji: '🌉', lat: 16.05, lng: 108.20, description: 'Dragon Bridge & My Son' },
    { name: 'Phú Quốc', slug: 'phu-quoc', emoji: '🏝️', lat: 10.29, lng: 103.98, description: 'Island beaches & pepper farms' },
  ],
};
