
import { ROUTES } from '@/constants/routes';
import { FileText, Globe, Clock, Shield, Users, Briefcase } from 'lucide-react';

export const visaServiceCategories = [
  {
    id: 'document-services',
    title: 'Document Services',
    description: 'Professional document preparation and review',
    icon: FileText,
    features: [
      'Document authenticity verification',
      'Translation services',
      'Notarization assistance',
      'Digital document management'
    ],
    price: 'From $89',
    badge: 'Essential'
  },
  {
    id: 'visa-consultation',
    title: 'Visa Consultation',
    description: 'Expert guidance for complex visa situations',
    icon: Users,
    features: [
      '1-on-1 expert consultation',
      'Customized visa strategy',
      'Application timeline planning',
      'Risk assessment'
    ],
    price: 'From $149',
    badge: 'Expert'
  },
  {
    id: 'business-visas',
    title: 'Business Visa Services',
    description: 'Specialized support for business travelers',
    icon: Briefcase,
    features: [
      'Corporate account management',
      'Bulk application processing',
      'Priority customer support',
      'Expense reporting tools'
    ],
    price: 'From $299',
    badge: 'Corporate'
  },
  {
    id: 'expedited-service',
    title: 'Rush Processing',
    description: 'Fast-track visa processing for urgent travel',
    icon: Clock,
    features: [
      'Same-day document review',
      'Priority embassy appointments',
      '24/7 status updates',
      'Emergency contact support'
    ],
    price: 'From $199',
    badge: 'Urgent'
  },
  {
    id: 'visa-insurance',
    title: 'Visa Insurance',
    description: 'Protection against visa rejection and delays',
    icon: Shield,
    features: [
      'Rejection refund guarantee',
      'Delay compensation',
      'Multiple application attempts',
      'Legal consultation included'
    ],
    price: 'From $79',
    badge: 'Security'
  },
  {
    id: 'global-services',
    title: 'Worldwide Coverage',
    description: 'Visa services for 150+ destinations',
    icon: Globe,
    features: [
      'Global embassy network',
      'Local expertise worldwide',
      'Multi-country trip planning',
      'Regional visa specialists'
    ],
    price: 'Custom Quote',
    badge: 'Global'
  }
];

export const popularDestinations = [
  {
    id: 'schengen-pack',
    name: 'Schengen Visa Pack',
    tagline: '27 Countries, One Visa',
    description: 'Visit all of Europe with a single visa application',
    price: 193,
    image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop',
    route: ROUTES.SCHENGEN_LANDING,
    countries: ['France', 'Germany', 'Italy', 'Spain', 'Netherlands'],
    processingTime: '10-15 days',
    validityPeriod: '90 days'
  },
  {
    id: 'uk-visa-pass',
    name: 'UK Visa Pass',
    tagline: 'London Calling',
    description: 'Fast-track processing for UK visitor visas',
    price: 480,
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop',
    route: ROUTES.UK_SHORT_STAY,
    countries: ['England', 'Scotland', 'Wales', 'Northern Ireland'],
    processingTime: '15-20 days',
    validityPeriod: '180 days'
  },
  {
    id: 'brazil-evisa',
    name: 'Brazil eVisa',
    tagline: 'Samba Ready',
    description: 'Electronic visa for Brazil - processed online',
    price: 175,
    image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&h=600&fit=crop',
    route: ROUTES.BRAZIL_SHORT_STAY,
    countries: ['Brazil'],
    processingTime: '5-7 days',
    validityPeriod: '90 days'
  }
];
