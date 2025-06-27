
export interface CarouselSlide {
  id: string;
  image: string;
  destination: string;
  teaser: string;
  ctaText: string;
  ctaLink: string;
  alt: string;
}

export const heroSlides: CarouselSlide[] = [
  {
    id: '1',
    image: '/lovable-uploads/82a7689d-5b8f-4da5-90f7-039d2ceefe64.png',
    destination: 'Santorini',
    teaser: 'Sunsets in Santorini',
    ctaText: 'Explore Deals',
    ctaLink: '/packages?destination=santorini',
    alt: 'Beautiful Santorini sunset with white-washed buildings and blue domes overlooking the Aegean Sea'
  },
  {
    id: '2',
    image: '/lovable-uploads/73138664-5eac-4bdb-bd23-292b7cd838bd.png',
    destination: 'Paris',
    teaser: 'See Paris in Bloom',
    ctaText: 'Explore Deals',
    ctaLink: '/packages?destination=paris',
    alt: 'Eiffel Tower standing majestically against a clear blue sky with Parisian cityscape and green parks'
  },
  {
    id: '3',
    image: '/lovable-uploads/efe38805-430b-4eea-b406-7b3d5e188592.png',
    destination: 'London',
    teaser: 'Royal London Adventures',
    ctaText: 'Explore Deals',
    ctaLink: '/packages?destination=london',
    alt: 'London cityscape with Big Ben and Thames River during twilight blue hour'
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=1920&q=80',
    destination: 'Rome',
    teaser: 'Ancient Rome Awaits',
    ctaText: 'Explore Deals',
    ctaLink: '/packages?destination=rome',
    alt: 'Roman Colosseum illuminated at night with ancient architecture details'
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=1920&q=80',
    destination: 'Amsterdam',
    teaser: 'Canal City Magic',
    ctaText: 'Explore Deals',
    ctaLink: '/packages?destination=amsterdam',
    alt: 'Amsterdam canal houses with colorful facades reflected in water at dusk'
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1543785734-4b6e564642f8?auto=format&fit=crop&w=1920&q=80',
    destination: 'Madrid',
    teaser: 'Spanish Passion',
    ctaText: 'Explore Deals',  
    ctaLink: '/packages?destination=madrid',
    alt: 'Gran Via in Madrid with historic architecture and vibrant city lights'
  },
  {
    id: '7',
    image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1920&q=80',
    destination: 'Rio de Janeiro',
    teaser: 'Brazilian Paradise',
    ctaText: 'Explore Deals',
    ctaLink: '/packages?destination=rio',
    alt: 'Christ the Redeemer statue overlooking Rio de Janeiro bay and Sugarloaf Mountain'
  },
  {
    id: '8',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1920&q=80',
    destination: 'Tokyo',
    teaser: 'Neon Dreams',
    ctaText: 'Explore Deals',
    ctaLink: '/packages?destination=tokyo',
    alt: 'Tokyo skyline at night with neon lights and Mount Fuji in the background'
  }
];
