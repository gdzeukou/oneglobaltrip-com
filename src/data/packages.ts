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

// Europe Express packages will be added here
export const packages: Package[] = [
  // This array is now empty and ready for your Europe Express itineraries
  // Each package should follow the Package interface structure:
  // {
  //   id: string,
  //   title: string,
  //   country: string,
  //   category: string,
  //   duration: string,
  //   price: number,
  //   originalPrice?: number,
  //   image: string,
  //   description: string,
  //   highlights: string[],
  //   specialFeatures: string[],
  //   visasRequired: string[],
  //   rating: number,
  //   reviews: number,
  //   countries?: string[],
  //   features?: string[],
  //   tags?: string[]
  // }
];
