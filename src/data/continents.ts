export interface Continent {
  id: string;
  name: string;
  emoji: string;
  center: [number, number]; // [lng, lat]
  zoom: number;
  color: string;
  countries: string[]; // country slugs that belong here (for breadcrumb detection)
}

export const CONTINENTS: Continent[] = [
  {
    id: 'europe',
    name: 'Europe',
    emoji: '🌍',
    center: [15, 54],
    zoom: 3.8,
    color: '#5B8DD9',
    countries: [
      'france', 'germany', 'spain', 'italy', 'united-kingdom', 'portugal', 'netherlands',
      'greece', 'switzerland', 'austria', 'belgium', 'sweden', 'norway', 'denmark',
      'finland', 'poland', 'czech-republic', 'hungary', 'romania', 'croatia',
      'serbia', 'bulgaria', 'ukraine', 'russia', 'ireland', 'scotland', 'turkey',
    ],
  },
  {
    id: 'north-america',
    name: 'N. America',
    emoji: '🌎',
    center: [-100, 45],
    zoom: 3.0,
    color: '#5BC48D',
    countries: ['usa', 'canada', 'mexico', 'cuba', 'jamaica', 'haiti', 'dominican-republic', 'panama', 'costa-rica', 'guatemala'],
  },
  {
    id: 'south-america',
    name: 'S. America',
    emoji: '🌎',
    center: [-60, -15],
    zoom: 3.2,
    color: '#9B59B6',
    countries: ['brazil', 'argentina', 'colombia', 'peru', 'chile', 'venezuela', 'ecuador', 'bolivia', 'paraguay', 'uruguay'],
  },
  {
    id: 'africa',
    name: 'Africa',
    emoji: '🌍',
    center: [20, 5],
    zoom: 3.2,
    color: '#E8A44B',
    countries: [
      'kenya', 'south-africa', 'nigeria', 'ghana', 'ethiopia', 'tanzania', 'morocco',
      'egypt', 'senegal', 'ivory-coast', 'cameroon', 'uganda', 'rwanda', 'zambia', 'zimbabwe',
    ],
  },
  {
    id: 'asia',
    name: 'Asia',
    emoji: '🌏',
    center: [100, 30],
    zoom: 3.0,
    color: '#E8674B',
    countries: [
      'japan', 'china', 'india', 'south-korea', 'thailand', 'singapore', 'indonesia',
      'malaysia', 'vietnam', 'philippines', 'taiwan', 'hong-kong', 'cambodia', 'myanmar',
      'sri-lanka', 'bangladesh', 'nepal', 'pakistan',
    ],
  },
  {
    id: 'middle-east',
    name: 'Middle East',
    emoji: '🌍',
    center: [45, 25],
    zoom: 3.8,
    color: '#F39C12',
    countries: [
      'united-arab-emirates', 'saudi-arabia', 'qatar', 'bahrain', 'kuwait', 'oman',
      'jordan', 'israel', 'lebanon', 'iran', 'iraq',
    ],
  },
  {
    id: 'oceania',
    name: 'Oceania',
    emoji: '🌏',
    center: [140, -25],
    zoom: 3.5,
    color: '#1ABC9C',
    countries: ['australia', 'new-zealand', 'fiji', 'papua-new-guinea', 'vanuatu', 'solomon-islands'],
  },
];

export function getContinentByCountry(countrySlug: string): Continent | undefined {
  return CONTINENTS.find((c) => c.countries.includes(countrySlug));
}
