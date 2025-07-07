
import UnifiedCTA from '@/components/common/UnifiedCTA';
import { ROUTES } from '@/constants/routes';

const MainCTASection = () => {
  const ctaOptions = [
    {
      id: 'visa_assist',
      title: 'Visa Assist',
      subtitle: 'Essential Service',
      description: 'Application review, AI checklist, form submission, VAC booking, tracking portal, 48h email SLA',
      price: 'From $129',
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
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
      alt: 'Complete travel bundle',
      badge: 'Most Popular',
      badgeColor: 'bg-orange-500',
      route: ROUTES.PACKAGES,
      features: ['Visa Assist +', '1 4star hotel', '1 flight', '1 activity of your choice']
    }
  ];

  return (
    <UnifiedCTA
      id="main-cta-section"
      variant="main"
      title="Choose Your Transformation"
      subtitle="Every soul craves a different kind of awakening. Which calls to yours?"
      options={ctaOptions}
    />
  );
};

export default MainCTASection;
