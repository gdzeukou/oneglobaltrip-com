
export interface Package {
  id: string; // Changed from number to string to match usage
  title: string;
  country: string;
  category: string;
  duration: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  highlights: string[];
  specialFeatures: string[];
  visasRequired: string[];
  rating: number;
  reviews: number;
  countries?: string[];
  features?: string[];
  tags?: string[];
}

export interface Category {
  id: string;
  name: string;
}

export interface PackageCategory {
  id: string;
  name: string;
  icon: string;
}
