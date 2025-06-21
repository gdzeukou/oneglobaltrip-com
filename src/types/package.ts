
export interface Package {
  id: number;
  title: string;
  country: string;
  category: string;
  duration: string;
  price: number;
  image: string;
  description: string;
  highlights: string[];
  specialFeatures: string[];
  visasRequired: string[];
  rating: number;
  reviews: number;
}

export interface Category {
  id: string;
  name: string;
}
