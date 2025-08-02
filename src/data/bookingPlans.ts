
import { BookingPlan, BookingAddOn } from '@/types/booking';

export const BOOKING_PLANS: BookingPlan[] = [
  {
    id: 'free_ai_agent',
    name: 'Free AI Travel Agent',
    price: 0,
    description: 'Personalized trip planning powered by AI - completely free to start',
    features: [
      'Personalized itineraries',
      'Unlimited direct purchase through Hotels, Flights, Rentals, Cruises, more...',
      'Destination Inspiration and Tips',
      'Access to 180+ countries',
      'E-Visa Wizard'
    ],
    sla: 'Community support',
    badge: 'Start Free',
    badgeColor: 'bg-emerald-500'
  },
  {
    id: 'visa_assist',
    name: 'Visa Assistance',
    price: 69,
    description: 'One-time visa support with expert guidance and document verification',
    features: [
      'AI-Guided Visa Form Filling',
      'Human Visa Officer Analysis',
      'Biometrics Appointment assistance',
      'Real-time embassy alerts',
      '98% success rate guarantee'
    ],
    sla: 'per visa application',
    badge: '98% Success Rate',
    badgeColor: 'bg-blue-500'
  },
  {
    id: 'global_explorer',
    name: 'Global Explorer',
    price: 189,
    description: 'Premium subscription with unlimited visa assistance and advanced AI features',
    features: [
      'Unlimited visa assistance',
      'Advanced AI customization (foodie tours, adventure hikes, nightlife)',
      'Real-time travel advisories',
      'Offline access for remote travel',
      'Priority customer support',
      'Connect and talk with Certified Travel Advisors around the globe'
    ],
    sla: 'Annual subscription',
    popular: true,
    badge: 'Best Choice',
    badgeColor: 'bg-gradient-to-r from-purple-600 to-pink-600',
    originalPrice: null
  },
  {
    id: 'enterprise_global_mobility',
    name: 'Enterprise Global Mobility Suite',
    price: null,
    description: 'All-in-one travel & visa management for global teams. AI-powered. Human-backed. Built to move your business faster.',
    features: [
      'Bulk Visa Management - Manage 50+ employee visas at once with real-time embassy alerts, priority scheduling',
      'Corporate Travel Concierge - Flights, hotels, car rentals, trains, event tickets — all optimized for cost, comfort, and policy compliance',
      'AI-Powered Travel Agent 24/7 - Get instant itineraries, rebooking assistance, and budget-friendly options in seconds',
      'Dedicated Human Travel Managers - Complex visas? VIP travelers? We\'ve got real experts on standby for white-glove service',
      'Centralized Dashboard for HR & Finance - One platform for tracking trips, approvals, spend, visas, and compliance — secure, scalable, and audit-ready',
      'Seamless Integrations - Plug into your existing tools (Workday, SAP Concur, Slack, Teams) and watch admin work disappear',
      'Actionable Insights & Cost Savings - Advanced reporting uncovers hidden savings and ensures every trip aligns with company policy',
      'Global Reach, Local Expertise - 180+ countries. On-the-ground partners. 24/7 traveler support anywhere in the world'
    ],
    sla: 'Custom enterprise solution',
    contactSales: true,
    enterprise: true,
    customPrice: 'Contact Sales',
    badge: 'Enterprise',
    badgeColor: 'bg-gradient-to-r from-slate-700 to-blue-800'
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
