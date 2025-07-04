
import UnifiedCTA from '@/components/common/UnifiedCTA';
import { ROUTES } from '@/constants/routes';

const MainCTASection = () => {
  const ctaOptions = [
    {
      id: 'explore',
      title: 'EXPLORE',
      subtitle: 'For the Curious Soul',
      description: 'Where wanderlust meets wonder. Discover cultures, taste adventures, and collect moments that become treasures.',
      price: 'From $193',
      image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop',
      alt: 'European cityscape',
      badge: 'Most Popular',
      badgeColor: 'bg-orange-500',
      route: ROUTES.SHORT_STAY_VISAS,
      features: ['Cultural immersion', 'Hidden gem discoveries', 'Authentic local experiences']
    },
    {
      id: 'elevate',
      title: 'ELEVATE',
      subtitle: 'For the Discerning Traveler',
      description: 'Where luxury meets legacy. Curated experiences that transform perspectives and create lifelong memories.',
      price: 'From $890',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
      alt: 'Luxury travel experience',
      route: ROUTES.LONG_STAY_VISAS,
      features: ['Exclusive access', 'Personal concierge', 'Bespoke itineraries']
    },
    {
      id: 'escape',
      title: 'ESCAPE',
      subtitle: 'For the Dream Seeker',
      description: 'Where impossible becomes inevitable. Journey beyond maps to places that exist only in dreams—until now.',
      price: 'From $1,890',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      alt: 'Exclusive destination',
      route: ROUTES.PACKAGES,
      features: ['Private sanctuaries', 'Once-in-lifetime moments', 'Beyond extraordinary']
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
