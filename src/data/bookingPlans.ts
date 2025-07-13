import { BookingPlan, BookingAddOn } from '@/types/booking';

export const BOOKING_PLANS: BookingPlan[] = [
  {
    id: 'passport_club',
    name: 'OGT Passport Club',
    price: 279,
    description: 'Annual membership with exclusive benefits',
    features: [
      '✓ **Free visa renewal** on one application each year',
      '✓ **Post-arrival support** (check-lists + residence-permit appointments)',
      '✓ **Instant 15% discount** on every Visa & Travel service',
      '✓ **Priority email / WhatsApp line** (24 h SLA)',
      '✓ **Members-only travel tips newsletter**'
    ],
    sla: '24h priority SLA',
    badge: 'Save All Year',
    badgeColor: 'bg-emerald-500',
    isAnnual: true
  },
  {
    id: 'visa_assist',
    name: 'Visa Assist',
    price: 175,
    description: 'Essential visa processing with AI-powered assistance',
    features: [
      '✓ **Application review** with smart AI checklist',
      '✓ **Form completion & VAC submission**',
      '✓ **Real-time tracking portal**',
      '✓ **48 h email SLA** (two-business-day replies)',
      '✓ **Optional 24 h rush review** add-on (+$79)'
    ],
    sla: '48h email SLA'
  },
  {
    id: 'trip_bundle',
    name: 'Trip Bundle',
    price: 299,
    description: 'Complete travel planning with visa assistance',
    features: [
      '✓ **Everything in Visa Assist**',
      '✓ **Guaranteed 4-star hotel** in prime location',
      '✓ **Premium flight + lounge access***',
      '✓ **OGT TripGift credit** to spend however you like',
      '✓ **Comprehensive travel insurance** deals(medical, baggage, cancellation)',
      '✓ **24/7 WhatsApp & phone support** (12 h SLA)'
    ],
    sla: '12h SLA',
    popular: true,
    badge: 'Most Popular',
    badgeColor: 'bg-accent'
  },
  {
    id: 'ogt_elite',
    name: 'OGT Elite Concierge',
    price: 449,
    description: 'Premium concierge service with dedicated agent',
    features: [
      '✓ **Everything in Trip Bundle**',
      '✓ **Dedicated human agent of your choice**',
      '✓ **Priority biometric appointment slot hunt**',
      '✓ **Airport transfer service**',
      '✓ **Restaurant / event reservations**',
      '✓ **2 h SLA & 24/7 emergency helpline**'
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