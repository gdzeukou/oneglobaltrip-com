
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
    processingTime: '5-35 business days',
    ctaText: 'Explore Europe',
    ctaLink: ROUTES.SHORT_STAY_VISAS,
    alt: 'Stunning Paris cityscape with Eiffel Tower at golden hour representing Schengen visa excellence'
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1920&q=80',
    title: 'UK Visa Mastery',
    description: 'Business, tourism, and study visas for the United Kingdom with guaranteed success',
    processingTime: '2-15 business days',
    ctaText: 'Visit Britain',
    ctaLink: ROUTES.SHORT_STAY_VISAS,
    alt: 'Majestic London skyline with Big Ben and Thames representing UK visa excellence'
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1544735716-392fe20ff0c8?auto=format&fit=crop&w=1920&q=80',
    title: 'Brazil Visa Adventure',
    description: 'Unlock the wonders of Brazil with our comprehensive visa and travel planning',
    processingTime: '3-15 business days',
    ctaText: 'Experience Brazil',
    ctaLink: ROUTES.SHORT_STAY_VISAS,
    alt: 'Breathtaking aerial view of Rio de Janeiro with Christ the Redeemer and Sugarloaf Mountain'
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=1920&q=80',
    title: 'Canada Visa Excellence',
    description: 'Explore Canada with our comprehensive visa services and travel planning',
    processingTime: '2-30 business days',
    ctaText: 'Visit Canada',
    ctaLink: ROUTES.SHORT_STAY_VISAS,
    alt: 'Beautiful Canadian landscape with mountains and river representing Canada visa services'
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1920&q=80',
    title: 'India Visa Gateway',
    description: 'Immerse yourself in India with our expert visa services and cultural insights',
    processingTime: '2-15 business days',
    ctaText: 'Explore India',
    ctaLink: ROUTES.SHORT_STAY_VISAS,
    alt: 'Magnificent Taj Mahal at sunrise with golden reflections representing India visa services'
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?auto=format&fit=crop&w=1920&q=80',
    title: 'Nigeria Visa Gateway',
    description: 'Visit Nigeria with our expert visa processing and local insights',
    processingTime: '5-45 business days',
    ctaText: 'Discover Nigeria',
    ctaLink: ROUTES.SHORT_STAY_VISAS,
    alt: 'Modern Nigerian architecture with traditional elements representing Nigeria visa services'
  }
];
