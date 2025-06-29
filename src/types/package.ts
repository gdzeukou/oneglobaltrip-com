
export interface Package {
  id: string;
  title: string;
  shortDescription?: string;
  country: string;
  countries?: string[];
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
  reviewCount?: number;
  cities?: string[];
  features?: string[];
  tags?: string[];
  difficulty?: string;
  groupSize?: string;
  included?: string[];
  featured?: boolean;
  location?: string;
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
