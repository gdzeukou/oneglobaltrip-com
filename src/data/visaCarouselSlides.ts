
import { ROUTES } from '@/constants/routes';

export interface VisaSlide {
  id: string;
  image: string;
  title: string;
  description: string;
  processingTime: string;
  ctaText: string;
  ctaLink: string;
  alt: string;
}

export const visaSlides: VisaSlide[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1920&q=80',
    title: 'Schengen Visa Excellence',
    description: 'Your gateway to 27 European countries with our premium visa concierge service',
    processingTime: '5-15 business days',
    ctaText: 'Explore Europe',
    ctaLink: ROUTES.SHORT_STAY_VISAS,
    alt: 'Stunning Paris cityscape with Eiffel Tower at golden hour representing Schengen visa excellence'
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1920&q=80',
    title: 'UK Visa Mastery',
    description: 'Business, tourism, and study visas for the United Kingdom with guaranteed success',
    processingTime: '3-8 weeks',
    ctaText: 'Visit Britain',
    ctaLink: ROUTES.SHORT_STAY_VISAS,
    alt: 'Majestic London skyline with Big Ben and Thames representing UK visa excellence'
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1920&q=80',
    title: 'Japan Visa Precision',
    description: 'Experience Japan with our streamlined visa application and cultural preparation',
    processingTime: '4-7 business days',
    ctaText: 'Discover Japan',
    ctaLink: ROUTES.SHORT_STAY_VISAS,
    alt: 'Spectacular Tokyo cityscape with neon lights and modern architecture at night'
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1544735716-392fe20ff0c8?auto=format&fit=crop&w=1920&q=80',
    title: 'Brazil Visa Adventure',
    description: 'Unlock the wonders of Brazil with our comprehensive visa and travel planning',
    processingTime: '5-10 business days',
    ctaText: 'Experience Brazil',
    ctaLink: ROUTES.SHORT_STAY_VISAS,
    alt: 'Breathtaking aerial view of Rio de Janeiro with Christ the Redeemer and Sugarloaf Mountain'
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1920&q=80',
    title: 'India Visa Gateway',
    description: 'Immerse yourself in India with our expert visa services and cultural insights',
    processingTime: '3-5 business days',
    ctaText: 'Explore India',
    ctaLink: ROUTES.SHORT_STAY_VISAS,
    alt: 'Magnificent Taj Mahal at sunrise with golden reflections representing India visa services'
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=80',
    title: 'UAE Visa Luxury',
    description: 'Experience Dubai and UAE with our premium fast-track visa processing',
    processingTime: '2-4 business days',
    ctaText: 'Visit UAE',
    ctaLink: ROUTES.SHORT_STAY_VISAS,
    alt: 'Stunning Dubai skyline with Burj Khalifa and modern architecture representing UAE luxury'
  }
];
