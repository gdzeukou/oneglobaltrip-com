

export interface Package {
  id: string; // Changed from number to string to match usage
  title: string;
  shortDescription?: string; // Added shortDescription as optional property
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
  reviewCount?: number; // Added reviewCount as optional property
  countries?: string[];
  cities?: string[]; // Added cities as optional property
  features?: string[];
  tags?: string[];
  difficulty?: string; // Added difficulty as optional property
  groupSize?: string; // Added groupSize as optional property
  included?: string[]; // Added included as optional property
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

