
import { Package, PackageCategory } from '@/types/package';

export const categories: PackageCategory[] = [
  { id: 'all', name: 'All Packages', icon: 'Globe' },
  { id: 'europe', name: 'Europe', icon: 'MapPin' },
  { id: 'asia', name: 'Asia', icon: 'MapPin' },
  { id: 'americas', name: 'Americas', icon: 'MapPin' },
  { id: 'africa', name: 'Africa', icon: 'MapPin' },
  { id: 'oceania', name: 'Oceania', icon: 'MapPin' },
  { id: 'business', name: 'Business Travel', icon: 'Briefcase' },
  { id: 'luxury', name: 'Luxury', icon: 'Crown' },
  { id: 'budget', name: 'Budget', icon: 'DollarSign' }
];

export const packages: Package[] = [
  // Europe Packages
  {
    id: 'schengen-explorer',
    title: 'Schengen Explorer Package',
    description: 'Visit 27 European countries with one visa. Includes visa processing, flights, and accommodation recommendations.',
    price: 1299,
    originalPrice: 1599,
    duration: '2-3 weeks',
    country: 'Multiple European Countries',
    countries: ['Germany', 'France', 'Italy', 'Spain', 'Netherlands'],
    highlights: [
      'Schengen visa processing',
      'Multi-city flight bookings',
      'Hotel recommendations',
      'Travel insurance',
      '24/7 support'
    ],
    specialFeatures: ['Multi-Country Access', 'Flexible Itinerary'],
    visasRequired: ['Schengen Visa'],
    image: '/lovable-uploads/143774ee-f153-4307-a278-d6ccd66f7385.png',
    rating: 4.9,
    reviews: 234,
    category: 'europe',
    tags: ['Multi-Country', 'Popular', 'Cultural']
  },
  {
    id: 'uk-business',
    title: 'UK Business Traveler',
    description: 'Complete UK business visa package with fast-track processing and premium accommodations.',
    price: 899,
    originalPrice: 1099,
    duration: '1-2 weeks',
    country: 'United Kingdom',
    highlights: [
      'UK business visa',
      'Business class flights',
      'Central London hotels',
      'Airport transfers',
      'Meeting room bookings'
    ],
    specialFeatures: ['Fast-Track Processing', 'Premium Service'],
    visasRequired: ['UK Business Visa'],
    image: '/lovable-uploads/44149117-d839-409c-9984-58ab8271cacf.png',
    rating: 4.8,
    reviews: 189,
    category: 'europe',
    tags: ['Business', 'Premium', 'Fast-Track']
  },
  {
    id: 'portugal-residency',
    title: 'Portugal Golden Visa',
    description: 'Complete Portugal residency package including investment guidance and legal support.',
    price: 2999,
    originalPrice: 3499,
    duration: '6-12 months',
    country: 'Portugal',
    highlights: [
      'Investment visa processing',
      'Legal consultation',
      'Property viewing tours',
      'Banking assistance',
      'Residency card processing'
    ],
    specialFeatures: ['Investment Opportunity', 'Permanent Residency Path'],
    visasRequired: ['Portugal Golden Visa'],
    image: '/lovable-uploads/be2a8c66-48a9-4a0d-be71-08376760b905.png',
    rating: 4.9,
    reviews: 156,
    category: 'europe',
    tags: ['Residency', 'Investment', 'Premium']
  },
  {
    id: 'norway-work',
    title: 'Norway Work Permit Package',
    description: 'Complete work permit processing with job search assistance and relocation support.',
    price: 1899,
    originalPrice: 2299,
    duration: '3-6 months',
    country: 'Norway',
    highlights: [
      'Work permit processing',
      'Job search assistance',
      'Accommodation finding',
      'Bank account setup',
      'Integration courses'
    ],
    specialFeatures: ['Job Placement Assistance', 'Full Relocation Support'],
    visasRequired: ['Norway Work Permit'],
    image: '/lovable-uploads/c1698ac0-2579-49f9-9f36-e184b2b21206.png',
    rating: 4.7,
    reviews: 143,
    category: 'europe',
    tags: ['Work Permit', 'Relocation', 'Support']
  },
  {
    id: 'france-student',
    title: 'France Student Visa Package',
    description: 'Complete student visa package with university applications and accommodation.',
    price: 1599,
    originalPrice: 1899,
    duration: '1-4 years',
    country: 'France',
    highlights: [
      'Student visa processing',
      'University application support',
      'Student accommodation',
      'Health insurance',
      'Orientation program'
    ],
    specialFeatures: ['University Application Support', 'Student Community Access'],
    visasRequired: ['France Student Visa'],
    image: '/lovable-uploads/b3a89cf1-b7be-4c8e-be8f-774de3f62929.png',
    rating: 4.8,
    reviews: 167,
    category: 'europe',
    tags: ['Student', 'Education', 'Long-term']
  },

  // Asia Packages
  {
    id: 'japan-tourist',
    title: 'Japan Discovery Package',
    description: 'Complete Japan tourist package with cultural experiences and guided tours.',
    price: 2199,
    originalPrice: 2599,
    duration: '2-3 weeks',
    country: 'Japan',
    highlights: [
      'Tourist visa processing',
      'Round-trip flights',
      'Traditional ryokan stays',
      'Cultural experiences',
      'English-speaking guides'
    ],
    specialFeatures: ['Cultural Immersion', 'Traditional Accommodation'],
    visasRequired: ['Japan Tourist Visa'],
    image: '/lovable-uploads/143774ee-f153-4307-a278-d6ccd66f7385.png',
    rating: 4.9,
    reviews: 298,
    category: 'asia',
    tags: ['Cultural', 'Premium', 'Guided']
  },
  {
    id: 'india-business',
    title: 'India Business Package',
    description: 'Comprehensive India business visa with trade mission support and networking.',
    price: 799,
    originalPrice: 999,
    duration: '1-4 weeks',
    country: 'India',
    highlights: [
      'Business visa processing',
      'Trade mission support',
      'Business hotel bookings',
      'Local business networking',
      'Cultural orientation'
    ],
    specialFeatures: ['Business Networking', 'Trade Mission Access'],
    visasRequired: ['India Business Visa'],
    image: '/lovable-uploads/44149117-d839-409c-9984-58ab8271cacf.png',
    rating: 4.6,
    reviews: 201,
    category: 'asia',
    tags: ['Business', 'Networking', 'Cultural']
  },
  {
    id: 'singapore-stopover',
    title: 'Singapore Stopover Special',
    description: 'Perfect for layovers and short business trips to Singapore.',
    price: 599,
    originalPrice: 799,
    duration: '2-7 days',
    country: 'Singapore',
    highlights: [
      'Transit visa assistance',
      'Airport hotel bookings',
      'City tour options',
      'Business center access',
      'Fast immigration support'
    ],
    specialFeatures: ['Transit Convenience', 'Quick Processing'],
    visasRequired: ['Singapore Transit Visa'],
    image: '/lovable-uploads/be2a8c66-48a9-4a0d-be71-08376760b905.png',
    rating: 4.7,
    reviews: 134,
    category: 'asia',
    tags: ['Transit', 'Business', 'Short-term']
  },

  // Americas Packages
  {
    id: 'usa-tourist',
    title: 'USA Coast to Coast',
    description: 'Epic American road trip package with visa, flights, and rental car.',
    price: 2499,
    originalPrice: 2999,
    duration: '3-4 weeks',
    country: 'United States',
    highlights: [
      'B1/B2 visa processing',
      'Multi-city flights included',
      'Rental car bookings',
      'Hotel reservations',
      'Travel insurance'
    ],
    specialFeatures: ['Road Trip Adventure', 'Multi-City Experience'],
    visasRequired: ['USA Tourist Visa (B1/B2)'],
    image: '/lovable-uploads/c1698ac0-2579-49f9-9f36-e184b2b21206.png',
    rating: 4.8,
    reviews: 267,
    category: 'americas',
    tags: ['Road Trip', 'Adventure', 'Multi-City']
  },
  {
    id: 'canada-immigration',
    title: 'Canada Express Entry',
    description: 'Complete Canada immigration package with Express Entry processing.',
    price: 3499,
    originalPrice: 3999,
    duration: '12-18 months',
    country: 'Canada',
    highlights: [
      'Express Entry processing',
      'Language test preparation',
      'Credential evaluation',
      'Job search assistance',
      'Settlement services'
    ],
    specialFeatures: ['Permanent Residency', 'Job Placement Support'],
    visasRequired: ['Canada Express Entry'],
    image: '/lovable-uploads/b3a89cf1-b7be-4c8e-be8f-774de3f62929.png',
    rating: 4.9,
    reviews: 178,
    category: 'americas',
    tags: ['Immigration', 'Permanent', 'Professional']
  },
  {
    id: 'brazil-carnival',
    title: 'Brazil Carnival Experience',
    description: 'Experience Rio Carnival with visa, accommodation, and exclusive access.',
    price: 1899,
    originalPrice: 2399,
    duration: '1-2 weeks',
    country: 'Brazil',
    highlights: [
      'Tourist visa processing',
      'Carnival tickets included',
      'Beachfront accommodation',
      'Local guide services',
      'Cultural workshops'
    ],
    specialFeatures: ['Carnival Access', 'Cultural Experience'],
    visasRequired: ['Brazil Tourist Visa'],
    image: '/lovable-uploads/143774ee-f153-4307-a278-d6ccd66f7385.png',
    rating: 4.8,
    reviews: 189,
    category: 'americas',
    tags: ['Festival', 'Cultural', 'Premium']
  },

  // Africa & Middle East Packages
  {
    id: 'uae-business',
    title: 'UAE Business Hub',
    description: 'Dubai and Abu Dhabi business package with networking and trade support.',
    price: 1299,
    originalPrice: 1599,
    duration: '1-2 weeks',
    country: 'United Arab Emirates',
    highlights: [
      'Business visa processing',
      '5-star hotel bookings',
      'Business lounge access',
      'Trade show tickets',
      'Local business introductions'
    ],
    specialFeatures: ['Luxury Business Travel', 'Trade Show Access'],
    visasRequired: ['UAE Business Visa'],
    image: '/lovable-uploads/44149117-d839-409c-9984-58ab8271cacf.png',
    rating: 4.7,
    reviews: 156,
    category: 'africa',
    tags: ['Business', 'Luxury', 'Networking']
  },
  {
    id: 'south-africa-safari',
    title: 'South Africa Safari Adventure',
    description: 'Complete safari package with visa, accommodation, and guided tours.',
    price: 2199,
    originalPrice: 2699,
    duration: '2-3 weeks',
    country: 'South Africa',
    highlights: [
      'Tourist visa processing',
      'Safari lodge bookings',
      'Game drive experiences',
      'Cultural village visits',
      'Photography workshops'
    ],
    specialFeatures: ['Wildlife Safari', 'Photography Workshops'],
    visasRequired: ['South Africa Tourist Visa'],
    image: '/lovable-uploads/be2a8c66-48a9-4a0d-be71-08376760b905.png',
    rating: 4.9,
    reviews: 234,
    category: 'africa',
    tags: ['Safari', 'Adventure', 'Wildlife']
  },

  // Oceania Packages
  {
    id: 'australia-working-holiday',
    title: 'Australia Working Holiday',
    description: 'Complete working holiday visa package with job placement assistance.',
    price: 1799,
    originalPrice: 2199,
    duration: '12 months',
    country: 'Australia',
    highlights: [
      'Working holiday visa',
      'Job placement assistance',
      'Accommodation booking',
      'Bank account setup',
      'Tax file number application'
    ],
    specialFeatures: ['Working Holiday Experience', 'Job Placement'],
    visasRequired: ['Australia Working Holiday Visa'],
    image: '/lovable-uploads/c1698ac0-2579-49f9-9f36-e184b2b21206.png',
    rating: 4.8,
    reviews: 167,
    category: 'oceania',
    tags: ['Working Holiday', 'Adventure', 'Long-term']
  },
  {
    id: 'new-zealand-adventure',
    title: 'New Zealand Adventure Package',
    description: 'Complete New Zealand adventure with visa, accommodation, and activities.',
    price: 2299,
    originalPrice: 2799,
    duration: '3-4 weeks',
    country: 'New Zealand',
    highlights: [
      'Tourist visa processing',
      'Adventure activity bookings',
      'Scenic accommodation',
      'Rental car included',
      'Travel insurance'
    ],
    specialFeatures: ['Adventure Activities', 'Scenic Tours'],
    visasRequired: ['New Zealand Tourist Visa'],
    image: '/lovable-uploads/b3a89cf1-b7be-4c8e-be8f-774de3f62929.png',
    rating: 4.9,
    reviews: 145,
    category: 'oceania',
    tags: ['Adventure', 'Nature', 'Activities']
  },

  // Budget Options
  {
    id: 'budget-europe',
    title: 'Budget European Backpacker',
    description: 'Affordable European adventure with hostels and budget airlines.',
    price: 799,
    originalPrice: 999,
    duration: '2-4 weeks',
    country: 'Multiple European Countries',
    highlights: [
      'Schengen visa processing',
      'Budget airline tickets',
      'Hostel bookings',
      'Eurail pass included',
      'Travel insurance'
    ],
    specialFeatures: ['Budget-Friendly', 'Backpacker Experience'],
    visasRequired: ['Schengen Visa'],
    image: '/lovable-uploads/143774ee-f153-4307-a278-d6ccd66f7385.png',
    rating: 4.5,
    reviews: 189,
    category: 'budget',
    tags: ['Budget', 'Backpacking', 'Multi-Country']
  },
  {
    id: 'budget-asia',
    title: 'Southeast Asia Explorer',
    description: 'Budget-friendly Southeast Asia tour with visa support.',
    price: 899,
    originalPrice: 1199,
    duration: '3-4 weeks',
    country: 'Multiple Asian Countries',
    countries: ['Thailand', 'Vietnam', 'Cambodia'],
    highlights: [
      'Multi-country visa support',
      'Budget accommodation',
      'Local transportation',
      'Street food tours',
      'Cultural experiences'
    ],
    specialFeatures: ['Multi-Country Tour', 'Cultural Immersion'],
    visasRequired: ['Thailand Visa', 'Vietnam Visa', 'Cambodia Visa'],
    image: '/lovable-uploads/44149117-d839-409c-9984-58ab8271cacf.png',
    rating: 4.6,
    reviews: 223,
    category: 'budget',
    tags: ['Budget', 'Cultural', 'Adventure']
  }
];
