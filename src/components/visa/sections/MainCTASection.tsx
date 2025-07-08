
import UnifiedCTA from '@/components/common/UnifiedCTA';
import { ROUTES } from '@/constants/routes';

const MainCTASection = () => {
  const ctaOptions = [
    {
      id: 'passport_club',
      title: 'OGT Passport Club',
      subtitle: 'Annual Membership',
      description: 'Free renewal • 15% off all services • Post-arrival assistance • Priority line',
      price: '$279/year',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
      alt: 'Passport Club membership',
      badge: 'Save All Year',
      badgeColor: 'bg-emerald-500',
      route: '/pricing',
      features: ['Free renewal', 'Post-arrival assistance', '15% off all services']
    },
    {
      id: 'visa_assist',
      title: 'Visa Assist',
      subtitle: 'Essential Service',
      description: 'Application review, AI checklist, form submission, VAC booking, tracking portal, 48h email SLA',
      price: 'From $129',
      priceNote: '15% off with Passport Club',
      image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop',
      alt: 'Visa assistance service',
      route: ROUTES.SHORT_STAY_VISAS,
      features: ['Application review', 'AI checklist', 'Form submission']
    },
    {
      id: 'trip_bundle',
      title: 'Trip Bundle',
      subtitle: 'Complete Travel Package',
      description: 'Visa Assist plus • 1 4star hotel • 1 flight • 1 activity of your choice • Basic insurance quote pack • WhatsApp/phone (12h SLA)',
      price: 'From $249',
      priceNote: '15% off with Passport Club',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
      alt: 'Complete travel bundle',
      badge: 'Most Popular',
      badgeColor: 'bg-orange-500',
      route: ROUTES.PACKAGES,
      features: ['Visa Assist +', '1 4star hotel', '1 flight', '1 activity of your choice']
    },
    {
      id: 'ogt_elite',
      title: 'OGT Elite',
      subtitle: 'Concierge Premium',
      description: 'Trip Bundle + dedicated agent • Priority slot hunt • Airport transfers • Dining reservations • 2h SLA',
      price: 'From $479',
      priceNote: '15% off with Passport Club',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      alt: 'Elite concierge service',
      route: '/pricing',
      features: ['Dedicated agent', 'Priority slot hunt', 'Airport transfers']
    }
  ];

  return (
    <UnifiedCTA
      id="main-cta-section"
      variant="main"
      title="Choose Your Perfect Travel Experience"
      subtitle="From visa assistance to luxury packages, we handle everything for your dream trip"
      options={ctaOptions}
    />
  );
};

export default MainCTASection;
