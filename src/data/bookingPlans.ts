import { BookingPlan, BookingAddOn } from '@/types/booking';

export const BOOKING_PLANS: BookingPlan[] = [
  {
    id: 'visa_assist',
    name: 'Visa Assist',
    price: 129,
    description: 'Essential visa processing with AI-powered assistance',
    features: [
      'Application review',
      'AI checklist',
      'Form submission',
      'VAC booking',
      'Tracking portal',
      '48h email SLA'
    ],
    sla: '48h email SLA'
  },
  {
    id: 'trip_bundle',
    name: 'Trip Bundle',
    price: 249,
    description: 'Complete travel planning with visa assistance',
    features: [
      'Visa Assist +',
      '3 flight quotes',
      '3 hotel quotes', 
      'Insurance comparison',
      'WhatsApp/phone support',
      '12h SLA'
    ],
    sla: '12h SLA',
    popular: true
  },
  {
    id: 'ogt_elite',
    name: 'OGT Elite Concierge',
    price: 479,
    description: 'Premium concierge service with dedicated agent',
    features: [
      'Trip Bundle +',
      'Dedicated agent',
      'Priority slot hunt',
      'Airport transfer booking',
      'Dining/event reservations',
      '2h SLA & emergency helpline'
    ],
    sla: '2h SLA & emergency helpline'
  }
];

export const BOOKING_ADDONS: BookingAddOn[] = [
  {
    id: 'rush_prep',
    name: 'Rush Document Prep',
    price: 79,
    description: 'Expedited document review and preparation'
  },
  {
    id: 'translation',
    name: 'Certified Translation',
    price: 45,
    description: 'Per document certified translation service',
    maxQuantity: 10
  },
  {
    id: 'courier',
    name: 'Door-to-Door Courier',
    price: 59,
    description: 'Secure document pickup and delivery service'
  },
  {
    id: 'extra_traveler_visa',
    name: 'Extra Traveler (Visa Assist)',
    price: 89,
    description: 'Additional traveler for Visa Assist plan',
    maxQuantity: 10
  },
  {
    id: 'extra_traveler_bundle',
    name: 'Extra Traveler (Trip Bundle)',
    price: 129,
    description: 'Additional traveler for Trip Bundle plan',
    maxQuantity: 10
  },
  {
    id: 'extra_traveler_elite',
    name: 'Extra Traveler (Elite)',
    price: 199,
    description: 'Additional traveler for OGT Elite plan',
    maxQuantity: 10
  }
];

// Helper to get extra traveler addon based on plan
export const getExtraTravelerAddon = (planId: string): BookingAddOn => {
  switch (planId) {
    case 'visa_assist':
      return BOOKING_ADDONS.find(addon => addon.id === 'extra_traveler_visa')!;
    case 'trip_bundle':
      return BOOKING_ADDONS.find(addon => addon.id === 'extra_traveler_bundle')!;
    case 'ogt_elite':
      return BOOKING_ADDONS.find(addon => addon.id === 'extra_traveler_elite')!;
    default:
      return BOOKING_ADDONS.find(addon => addon.id === 'extra_traveler_visa')!;
  }
};