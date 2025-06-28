
import UnifiedCTA from '@/components/common/UnifiedCTA';
import { ROUTES } from '@/constants/routes';

const MainCTASection = () => {
  const ctaOptions = [
    {
      id: 'short-stay',
      title: 'Short-Stay Visas',
      subtitle: 'Tourism, Business & Family Visits',
      description: 'Perfect for trips up to 90 days. Get your tourist, business, or family visit visa processed quickly and efficiently.',
      price: 'From $193',
      image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop',
      alt: 'European cityscape',
      badge: 'Most Popular',
      badgeColor: 'bg-orange-500',
      route: ROUTES.SHORT_STAY_VISAS,
      features: ['90-day validity', 'Multiple destinations', 'Fast processing']
    },
    {
      id: 'long-stay',
      title: 'Long-Stay Visas',
      subtitle: 'Work, Study & Residence',
      description: 'For extended stays over 90 days. Work permits, study visas, and residence applications handled by experts.',
      price: 'From $890',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
      alt: 'Modern office building',
      route: ROUTES.LONG_STAY_VISAS,
      features: ['1+ year validity', 'Work authorization', 'Expert guidance']
    }
  ];

  return (
    <UnifiedCTA
      id="main-cta-section"
      variant="main"
      title="Choose Your Visa Service"
      subtitle="Whether you're planning a short trip or extended stay, we've got you covered"
      options={ctaOptions}
    />
  );
};

export default MainCTASection;
