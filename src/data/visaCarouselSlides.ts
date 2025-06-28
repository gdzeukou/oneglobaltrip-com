
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
    image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?auto=format&fit=crop&w=1920&q=80',
    title: 'Schengen Visa Services',
    description: 'Travel freely across 27 European countries with our expert assistance',
    processingTime: '5-15 business days',
    ctaText: 'Learn More',
    ctaLink: ROUTES.SHORT_STAY_VISAS,
    alt: 'European landmarks including Eiffel Tower representing Schengen area'
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1520986606214-8b456906c813?auto=format&fit=crop&w=1920&q=80',
    title: 'UK Visa Application',
    description: 'Business, tourism, and study visas for the United Kingdom',
    processingTime: '3-8 weeks',
    ctaText: 'Learn More',
    ctaLink: ROUTES.SHORT_STAY_VISAS,
    alt: 'Big Ben and London skyline representing UK visa services'
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1920&q=80',
    title: 'Japan Visa Processing',
    description: 'Tourist and business visas for Japan with streamlined application',
    processingTime: '4-7 business days',
    ctaText: 'Learn More',
    ctaLink: ROUTES.SHORT_STAY_VISAS,
    alt: 'Tokyo cityscape at night representing Japan visa services'
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1920&q=80',
    title: 'Brazil Visa Services',
    description: 'Tourist and business visas for Brazil with expert guidance',
    processingTime: '5-10 business days',
    ctaText: 'Learn More',
    ctaLink: ROUTES.SHORT_STAY_VISAS,
    alt: 'Christ the Redeemer and Rio de Janeiro representing Brazil visa services'
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=80',
    title: 'India Visa Application',
    description: 'Tourist, business, and medical visas for India made simple',
    processingTime: '3-5 business days',
    ctaText: 'Learn More',
    ctaLink: ROUTES.SHORT_STAY_VISAS,
    alt: 'Indian landmarks and architecture representing India visa services'
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1920&q=80',
    title: 'UAE Visa Processing',
    description: 'Dubai and UAE visas with fast-track processing options',
    processingTime: '2-4 business days',
    ctaText: 'Learn More',
    ctaLink: ROUTES.SHORT_STAY_VISAS,
    alt: 'Dubai skyline and Burj Khalifa representing UAE visa services'
  }
];
