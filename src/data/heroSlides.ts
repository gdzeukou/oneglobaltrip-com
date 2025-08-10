export interface CarouselSlide {
  id: string;
  image?: string;
  destination: string;
  teaser: string;
  ctaText: string;
  ctaLink: string;
  alt: string;
  // Optional rich media
  videoMp4?: string;
  videoWebm?: string;
  poster?: string;
}

// Curated luxury destinations (videos optional, images as fallback)
export const heroSlides: CarouselSlide[] = [
  {
    id: '1',
    destination: 'Paris',
    teaser: 'Fall in love with the city that invented romance',
    ctaText: 'Begin Your Transformation',
    ctaLink: '/packages?destination=paris',
    image: '/lovable-uploads/e3775e5c-54c8-429f-8982-ce162dce3071.png',
    alt: 'Eiffel Tower standing majestically against a clear blue sky with Parisian cityscape and green parks'
  },
  {
    id: '2',
    destination: 'London',
    teaser: 'Where history whispers and legends live',
    ctaText: 'Begin Your Transformation',
    ctaLink: '/packages?destination=london',
    image: '/lovable-uploads/6db4cf55-8097-495e-a53e-83e87927aa82.png',
    alt: 'London bridge with St. Pauls Cathedral during a stunning purple sunset with modern architectural details'
  },
  {
    id: '3',
    destination: 'Rome',
    teaser: 'Where emperors dreamed and gladiators conquered eternity',
    ctaText: 'Begin Your Transformation',
    ctaLink: '/packages?destination=rome',
    image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=1920&q=80',
    alt: 'Roman Colosseum illuminated at night with ancient architecture details'
  },
  {
    id: '4',
    destination: 'Madrid',
    teaser: 'Where passion dances in every sunset',
    ctaText: 'Begin Your Transformation',
    ctaLink: '/packages?destination=madrid',
    image: 'https://images.unsplash.com/photo-1543785734-4b6e564642f8?auto=format&fit=crop&w=1920&q=80',
    alt: 'Gran Via in Madrid with historic architecture and vibrant city lights'
  },
  {
    id: '5',
    destination: 'Santorini',
    teaser: 'Where Greek gods chose to watch the world end',
    ctaText: 'Begin Your Transformation',
    ctaLink: '/packages?destination=santorini',
    image: '/lovable-uploads/76b4c74b-7cfd-460f-b5a4-0bfaf3b3c01c.png',
    alt: 'Beautiful Santorini with white-washed buildings and blue domes overlooking the Aegean Sea under a cloudy blue sky'
  },
  {
    id: '6',
    destination: 'Amsterdam',
    teaser: 'Where canals cradle stories and art breathes freely',
    ctaText: 'Begin Your Transformation',
    ctaLink: '/packages?destination=amsterdam',
    image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=1920&q=80',
    alt: 'Amsterdam canal houses with colorful facades reflected in water at dusk'
  },
  {
    id: '7',
    destination: 'Rio de Janeiro',
    teaser: 'Where mountains meet ocean and souls find rhythm',
    ctaText: 'Begin Your Transformation',
    ctaLink: '/packages?destination=rio',
    image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1920&q=80',
    alt: 'Christ the Redeemer statue overlooking Rio de Janeiro bay and Sugarloaf Mountain'
  }
];
