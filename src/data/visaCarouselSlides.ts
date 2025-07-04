
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
    image: '/lovable-uploads/3bee657a-be4d-476c-b496-1d6dd9f6031a.png',
    title: 'Schengen Visa Excellence',
    description: 'Your gateway to 27 European countries with our premium visa concierge service',
    processingTime: '5-35 business days',
    ctaText: 'Explore Europe',
    ctaLink: ROUTES.SHORT_STAY_VISAS,
    alt: 'Beautiful Venice canal with gondola representing Schengen visa excellence'
  },
  {
    id: '2',
    image: '/lovable-uploads/c1af39df-aed8-441c-a852-5e8567ccca13.png',
    title: 'UK Visa Mastery',
    description: 'Business, tourism, and study visas for the United Kingdom with guaranteed success',
    processingTime: '2-15 business days',
    ctaText: 'Visit Britain',
    ctaLink: ROUTES.SHORT_STAY_VISAS,
    alt: 'Iconic Tower Bridge in London at twilight representing UK visa excellence'
  },
  {
    id: '3',
    image: '/lovable-uploads/f271e7d8-b6b9-4263-91a8-3f5c42042400.png',
    title: 'Brazil Visa Adventure',
    description: 'Unlock the wonders of Brazil with our comprehensive visa and travel planning',
    processingTime: '3-15 business days',
    ctaText: 'Experience Brazil',
    ctaLink: ROUTES.SHORT_STAY_VISAS,
    alt: 'Stunning Rio de Janeiro skyline at night with Copacabana beach representing Brazil visa services'
  },
  {
    id: '4',
    image: '/lovable-uploads/4f1cdd82-b712-48cd-a7c2-1ede36b0a705.png',
    title: 'Canada Visa Excellence',
    description: 'Explore Canada with our comprehensive visa services and travel planning',
    processingTime: '2-30 business days',
    ctaText: 'Visit Canada',
    ctaLink: ROUTES.SHORT_STAY_VISAS,
    alt: 'Historic Quebec City in winter with snow and Canadian flag representing Canada visa services'
  },
  {
    id: '5',
    image: '/lovable-uploads/0ddd7e0a-80f9-46bf-8baa-5d5ddc75e1f6.png',
    title: 'India Visa Gateway',
    description: 'Immerse yourself in India with our expert visa services and cultural insights',
    processingTime: '2-15 business days',
    ctaText: 'Explore India',
    ctaLink: ROUTES.SHORT_STAY_VISAS,
    alt: 'Mumbai skyline at night with Bandra-Worli Sea Link representing India visa services'
  },
  {
    id: '6',
    image: '/lovable-uploads/432945ff-b098-486a-a3e4-03057fc3c67e.png',
    title: 'Nigeria Visa Gateway',
    description: 'Visit Nigeria with our expert visa processing and local insights',
    processingTime: '5-45 business days',
    ctaText: 'Discover Nigeria',
    ctaLink: ROUTES.SHORT_STAY_VISAS,
    alt: 'Aerial view of Lagos waterfront with colorful buildings representing Nigeria visa services'
  }
];
