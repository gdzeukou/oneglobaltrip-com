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
    price: 30,
    description: 'One-time visa support with expert guidance and document verification',
    features: [
      'Step-by-step form guidance',
      'Document verification',
      'Real-time embassy updates',
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
    price: 10,
    description: 'Premium subscription with unlimited visa assistance and advanced features',
    features: [
      'Unlimited visa assistance',
      'Niche AI itineraries (eco-tours, foodie trips, etc.)',
      'Real-time travel advisories',
      'Offline access for low-connectivity travel',
      'Priority customer support',
      'Exclusive member deals'
    ],
    sla: 'Monthly subscription',
    popular: true,
    badge: 'Most Popular',
    badgeColor: 'bg-accent',
    originalPrice: 99
  }
];

export const BOOKING_ADDONS: BookingAddOn[] = [
  {
    id: 'expedited_booking',
    name: 'Expedited Booking Support',
    price: 15,
    description: 'Priority booking assistance with faster response times'
  },
  {
    id: 'niche_guide',
    name: 'Niche Travel Guide',
    price: 10,
    description: 'Specialized guides for eco-tours, foodie trips, or cultural experiences'
  },
  {
    id: 'partner_discounts',
    name: 'Exclusive Partner Discounts',
    price: 5,
    description: 'Unlock special deals and discounts from our travel partners'
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
