
export const countryImages = {
  // European Countries
  'Portugal': 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&h=600&fit=crop&crop=center',
  'Norway': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center',
  'Denmark': 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=800&h=600&fit=crop&crop=center',
  'Finland': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center',
  'France': 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop&crop=center',
  'Germany': 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&h=600&fit=crop&crop=center',
  'Switzerland': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center',
  'Italy': 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&h=600&fit=crop&crop=center',
  'Spain': 'https://images.unsplash.com/photo-1539650116574-75c0c6d73a0e?w=800&h=600&fit=crop&crop=center',
  'Netherlands': 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&h=600&fit=crop&crop=center',
  'United Kingdom': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop&crop=center',
  'Austria': 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&h=600&fit=crop&crop=center',
  'Greece': 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&h=600&fit=crop&crop=center',
  
  // Short-stay Destinations
  'Schengen Area': 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop&crop=center',
  'Canada': 'https://images.unsplash.com/photo-1503614472-8c93d56cd928?w=800&h=600&fit=crop&crop=center',
  'Brazil': 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&h=600&fit=crop&crop=center',
  'Nigeria': 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=800&h=600&fit=crop&crop=center',
  'Nigeria e-Visa': 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=800&h=600&fit=crop&crop=center',
  'India': 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop&crop=center',
  'UAE (Dubai)': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop&crop=center',
  
  // Multi-country packages
  'Multi-Country': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop&crop=center',
  'European Union': 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop&crop=center'
};

export const getCountryImage = (countryName: string, fallback?: string): string => {
  return countryImages[countryName as keyof typeof countryImages] || fallback || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop&crop=center';
};

export const getVisaTypeImage = (visaType: 'short-stay' | 'long-stay', countryName?: string): string => {
  if (countryName && countryImages[countryName as keyof typeof countryImages]) {
    return countryImages[countryName as keyof typeof countryImages];
  }
  
  return visaType === 'short-stay' 
    ? 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop&crop=center'
    : 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop&crop=center';
};
