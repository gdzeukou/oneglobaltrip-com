
import { BookingPlan, BookingAddOn } from '@/types/booking';

export const BOOKING_PLANS: BookingPlan[] = [
  {
    id: 'free_ai_agent',
    name: 'Free AI Travel Agent',
    price: 0,
    description: 'Personalized trip planning powered by AI - completely free to start',
    features: [
      'Personalized itineraries',
      'Destination inspiration & tips',
      'Up to 3 trips per month',
      'Access to 180+ countries',
      'Basic travel advice'
    ],
    sla: 'Community support',
    badge: 'Start Free',
    badgeColor: 'bg-emerald-500'
  },
  {
    id: 'visa_assist',
    name: 'Visa Assistance',
    price: 15,
    description: 'One-time visa support with expert guidance and document verification',
    features: [
      'AI-guided visa form filling',
      'Document verification',
      'Real-time embassy alerts',
      'Embassy appointment assistance',
      '98% success rate guarantee'
    ],
    sla: 'Per visa application',
    badge: '98% Success Rate',
    badgeColor: 'bg-blue-500'
  },
  {
    id: 'global_explorer',
    name: 'Global Explorer',
    price: 5,
    description: 'Premium subscription with unlimited visa assistance and advanced AI features',
    features: [
      'Unlimited visa assistance',
      'Advanced AI customization (foodie tours, adventure hikes, nightlife)',
      'Real-time travel advisories',
      'Offline access for remote travel',
      'Priority customer support',
      '$20 Expert Connect calls with human travel agents'
    ],
    sla: 'Monthly subscription ($49/year)',
    popular: true,
    badge: 'Best Choice',
    badgeColor: 'bg-gradient-to-r from-purple-600 to-pink-600',
    originalPrice: 99
  }
];

export const BOOKING_ADDONS: BookingAddOn[] = [
  {
    id: 'expedited_booking',
    name: 'Expedited Booking Support',
    price: 10,
    description: 'Faster AI-driven flight/hotel reservations with priority support'
  },
  {
    id: 'niche_guide',
    name: 'Niche Travel Guides',
    price: 7,
    description: 'Tailored plans for specific interests (e.g., "Vegan Tokyo", "Barcelona Nightlife")'
  },
  {
    id: 'partner_discounts',
    name: 'Exclusive Discounts',
    price: 3,
    description: 'Partner offers with 10-15% commissions from Booking.com and Agoda'
  }
];

// Helper to get relevant addons based on plan
export const getRelevantAddons = (planId: string): BookingAddOn[] => {
  if (planId === 'global_explorer') {
    return BOOKING_ADDONS;
  }
  if (planId === 'visa_assist') {
    return BOOKING_ADDONS.filter(addon => addon.id !== 'partner_discounts');
  }
  return [];
};
