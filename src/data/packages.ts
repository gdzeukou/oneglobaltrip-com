
import { Package, PackageCategory } from '@/types/package';

export const categories: PackageCategory[] = [
  { id: 'all', name: 'All Packages', icon: 'Globe' },
  { id: 'romantic', name: 'Romantic', icon: 'Heart' },
  { id: 'cultural', name: 'Cultural', icon: 'MapPin' },
  { id: 'luxury', name: 'Luxury', icon: 'Crown' },
  { id: 'family', name: 'Family', icon: 'Users' },
  { id: 'adventure', name: 'Adventure', icon: 'Mountain' },
  { id: 'city-breaks', name: 'City Breaks', icon: 'Building' },
  { id: 'multi-country', name: 'Multi-Country', icon: 'Map' }
];

// Europe Express packages
export const packages: Package[] = [
  {
    id: 'london-paris-rome-signature',
    title: 'London, Paris & Rome – 10-Day Signature Tour',
    country: 'United Kingdom, France, Italy',
    category: 'multi-country',
    duration: '10 Days',
    price: 4299,
    originalPrice: 4899,
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop&crop=center',
    description: 'Experience three of Europe\'s most iconic capitals on this carefully curated 10-day journey. Perfect for couples and first-time Europe travelers seeking a comprehensive introduction to European culture, history, and cuisine.',
    highlights: [
      'Explore London with Go City London Pass + Cotswolds Day Trip',
      'Take the Eurostar to Paris for a Louvre Tour and Loire Valley castles',
      'Fly to Rome for the Colosseum, Vatican & Sistine Chapel',
      'Private transfers and guided tours throughout',
      'Train & flight between destinations included'
    ],
    specialFeatures: [
      'Private transfers, hotels, guided tours, and optional excursions',
      'Eurostar high-speed train experience',
      'Skip-the-line access to major attractions',
      'Professional local guides in each city',
      'Flexible optional excursions'
    ],
    visasRequired: ['Schengen Visa', 'UK Visa'],
    rating: 4.9,
    reviews: 247,
    countries: ['United Kingdom', 'France', 'Italy'],
    features: ['Private Transfers', 'Guided Tours', 'Skip-the-Line Access', 'Train Travel', 'Flight Included'],
    tags: ['couples', 'first-time-europe', 'signature-tour', 'multi-country', 'cultural']
  }
];
