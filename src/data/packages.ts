
export interface Package {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  duration: string;
  location: string;
  highlights: string[];
  included: string[];
  rating: number;
  reviews: number;
  featured?: boolean;
}

export const categories = [
  { id: 'all', name: 'All Packages' },
  { id: 'luxury', name: 'Luxury' },
  { id: 'adventure', name: 'Adventure' },
  { id: 'cultural', name: 'Cultural' },
  { id: 'romantic', name: 'Romantic' },
  { id: 'family', name: 'Family' },
  { id: 'business', name: 'Business' }
];

export const packages: Package[] = [
  {
    id: '1',
    title: 'European Grand Tour',
    description: 'Experience the best of Europe with our comprehensive 14-day tour covering 7 countries',
    price: 4599,
    image: '/lovable-uploads/143774ee-f153-4307-a278-d6ccd66f7385.png',
    category: 'cultural',
    duration: '14 days',
    location: 'Europe',
    highlights: ['Paris City Tour', 'Swiss Alps', 'Roman Colosseum', 'Amsterdam Canals'],
    included: ['Visa processing', 'Hotels', 'Flights', 'Tours', 'Travel insurance'],
    rating: 4.8,
    reviews: 156,
    featured: true
  },
  {
    id: '2',
    title: 'Dubai Luxury Escape',
    description: 'Indulge in luxury with our premium Dubai package including 5-star hotels and exclusive experiences',
    price: 2899,
    image: '/lovable-uploads/44149117-d839-409c-9984-58ab8271cacf.png',
    category: 'luxury',
    duration: '7 days',
    location: 'Dubai, UAE',
    highlights: ['Burj Khalifa', 'Desert Safari', 'Luxury Shopping', 'Fine Dining'],
    included: ['UAE visa', '5-star hotel', 'Business class flights', 'Private transfers'],
    rating: 4.9,
    reviews: 89,
    featured: true
  },
  {
    id: '3',
    title: 'Japan Cultural Journey',
    description: 'Immerse yourself in Japanese culture with our authentic 10-day experience',
    price: 3299,
    image: '/lovable-uploads/be2a8c66-48a9-4a0d-be71-08376760b905.png',
    category: 'cultural',
    duration: '10 days',
    location: 'Japan',
    highlights: ['Tokyo temples', 'Mount Fuji', 'Kyoto gardens', 'Traditional ryokan'],
    included: ['Japan visa', 'Accommodation', 'Flights', 'JR Pass', 'Cultural tours'],
    rating: 4.7,
    reviews: 124,
    featured: true
  },
  {
    id: '4',
    title: 'Canadian Rockies Adventure',
    description: 'Explore the breathtaking Canadian Rockies with hiking, wildlife, and stunning landscapes',
    price: 2199,
    image: '/lovable-uploads/143774ee-f153-4307-a278-d6ccd66f7385.png',
    category: 'adventure',
    duration: '8 days',
    location: 'Canada',
    highlights: ['Banff National Park', 'Lake Louise', 'Wildlife viewing', 'Mountain hiking'],
    included: ['Canada visa', 'Lodge accommodation', 'Flights', 'Tours', 'Equipment'],
    rating: 4.6,
    reviews: 78,
    featured: false
  },
  {
    id: '5',
    title: 'Romantic Paris Getaway',
    description: 'Perfect romantic escape to the City of Love with luxury accommodations and experiences',
    price: 1899,
    image: '/lovable-uploads/44149117-d839-409c-9984-58ab8271cacf.png',
    category: 'romantic',
    duration: '5 days',
    location: 'Paris, France',
    highlights: ['Eiffel Tower dinner', 'Seine river cruise', 'Louvre Museum', 'Montmartre'],
    included: ['Schengen visa', 'Boutique hotel', 'Flights', 'Romantic dinners', 'City tours'],
    rating: 4.8,
    reviews: 203,
    featured: false
  },
  {
    id: '6',
    title: 'Family Disney Magic',
    description: 'Magical family vacation to Disney World with special packages for kids and adults',
    price: 3599,
    image: '/lovable-uploads/be2a8c66-48a9-4a0d-be71-08376760b905.png',
    category: 'family',
    duration: '7 days',
    location: 'Orlando, USA',
    highlights: ['Disney World parks', 'Character dining', 'Universal Studios', 'Family activities'],
    included: ['US visa', 'Family-friendly hotel', 'Flights', 'Park tickets', 'Meal plans'],
    rating: 4.9,
    reviews: 167,
    featured: false
  }
];
