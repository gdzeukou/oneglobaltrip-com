
// Centralized route constants for consistent navigation
export const ROUTES = {
  // Main pages
  HOME: '/',
  PACKAGES: '/packages',
  VISAS: '/visas',
  CONTACT: '/contact',
  PRICING: '/pricing',
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  BOOKINGS: '/bookings',
  BOOKING: '/booking',
  CONCIERGE: '/concierge',
  ADMIN: '/admin',
  
  // Visa categories
  SHORT_STAY_VISAS: '/visas/short-stay',
  LONG_STAY_VISAS: '/visas/long-stay', 
  VISAS_SHORT_STAY: '/visas/short-stay',
  VISAS_LONG_STAY: '/visas/long-stay',
  VISAS_PRICING: '/visas/pricing',
  
  // Short stay visas
  SCHENGEN_SHORT_STAY_LANDING: '/visas/short-stay/schengen',
  FRANCE_SHORT_STAY: '/visas/france-short-stay',
  GREECE_SHORT_STAY: '/visas/greece-short-stay',
  ITALY_SHORT_STAY: '/visas/italy-short-stay',
  NETHERLANDS_SHORT_STAY: '/visas/netherlands-short-stay',
  GERMANY_SHORT_STAY: '/visas/germany-short-stay',
  DENMARK_SHORT_STAY: '/visas/denmark-short-stay',
  SWEDEN_SHORT_STAY: '/visas/sweden-short-stay',
  UK_SHORT_STAY: '/visas/uk-short-stay',
  UK_5_YEAR_SHORT_STAY: '/visas/uk-5-year-short-stay',
  UAE_SHORT_STAY: '/visas/uae-short-stay',
  CANADA_SHORT_STAY: '/visas/canada-short-stay',
  BRAZIL_SHORT_STAY: '/visas/brazil-short-stay',
  INDIA_SHORT_STAY: '/visas/india-short-stay',
  NIGERIA_SHORT_STAY: '/visas/nigeria-short-stay',
  
  // Long stay visas
  FRANCE_LONG_STAY: '/visas/france-long-stay',
  GERMANY_LONG_STAY: '/visas/germany-long-stay',
  PORTUGAL_LONG_STAY: '/visas/portugal-long-stay',
  FINLAND_LONG_STAY: '/visas/finland-long-stay',
  DENMARK_LONG_STAY: '/visas/denmark-long-stay',
  NORWAY_LONG_STAY: '/visas/norway-long-stay',
  SWITZERLAND_LONG_STAY: '/visas/switzerland-long-stay',
  NIGERIA_LONG_STAY: '/visas/nigeria-long-stay',
  
  // Package routes
  PARIS_EXPLORE_PACKAGE: '/packages/paris-explore-package',
  
  // External links
  CALENDLY_CONSULTATION: 'https://calendly.com/camronm-oneglobaltrip/30min',
  CALENDLY_VISA_DISCOVERY: 'https://calendly.com/camronm-oneglobaltrip/30min?filter=visa-discovery-call'
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RouteValue = typeof ROUTES[RouteKey];
