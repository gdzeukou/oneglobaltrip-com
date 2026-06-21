export interface GlobeDestination {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  description: string;
  ctaLink: string;
  color: string;
  image?: string;
}

export const globeDestinations: GlobeDestination[] = [
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    lat: 48.8566,
    lng: 2.3522,
    description: 'Fall in love with the city that invented romance',
    ctaLink: '/packages?destination=paris',
    color: '#f59e0b',
    image: '/lovable-uploads/e3775e5c-54c8-429f-8982-ce162dce3071.png',
  },
  {
    id: 'london',
    name: 'London',
    country: 'United Kingdom',
    lat: 51.5074,
    lng: -0.1278,
    description: 'Where history whispers and legends live',
    ctaLink: '/packages?destination=london',
    color: '#3b82f6',
    image: '/lovable-uploads/6db4cf55-8097-495e-a53e-83e87927aa82.png',
  },
  {
    id: 'rome',
    name: 'Rome',
    country: 'Italy',
    lat: 41.9028,
    lng: 12.4964,
    description: 'Where emperors dreamed and gladiators conquered eternity',
    ctaLink: '/packages?destination=rome',
    color: '#ef4444',
    image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'madrid',
    name: 'Madrid',
    country: 'Spain',
    lat: 40.4168,
    lng: -3.7038,
    description: 'Where passion dances in every sunset',
    ctaLink: '/packages?destination=madrid',
    color: '#f97316',
    image: 'https://images.unsplash.com/photo-1543785734-4b6e564642f8?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'santorini',
    name: 'Santorini',
    country: 'Greece',
    lat: 36.3932,
    lng: 25.4615,
    description: 'Where Greek gods chose to watch the world end',
    ctaLink: '/packages?destination=santorini',
    color: '#8b5cf6',
    image: '/lovable-uploads/76b4c74b-7cfd-460f-b5a4-0bfaf3b3c01c.png',
  },
  {
    id: 'amsterdam',
    name: 'Amsterdam',
    country: 'Netherlands',
    lat: 52.3676,
    lng: 4.9041,
    description: 'Where canals cradle stories and art breathes freely',
    ctaLink: '/packages?destination=amsterdam',
    color: '#10b981',
    image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'rio',
    name: 'Rio de Janeiro',
    country: 'Brazil',
    lat: -22.9068,
    lng: -43.1729,
    description: 'Where mountains meet ocean and souls find rhythm',
    ctaLink: '/packages?destination=rio',
    color: '#06b6d4',
    image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    lat: 35.6762,
    lng: 139.6503,
    description: 'Where ancient tradition meets electric modernity',
    ctaLink: '/packages?destination=tokyo',
    color: '#ec4899',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'UAE',
    lat: 25.2048,
    lng: 55.2708,
    description: 'Where the desert dreams of tomorrow',
    ctaLink: '/packages?destination=dubai',
    color: '#fbbf24',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'newyork',
    name: 'New York',
    country: 'USA',
    lat: 40.7128,
    lng: -74.006,
    description: 'The city that never sleeps, always inspires',
    ctaLink: '/packages?destination=newyork',
    color: '#64748b',
    image: 'https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&w=800&q=80',
  },
];
