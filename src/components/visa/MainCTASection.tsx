
import UnifiedCTA from '@/components/common/UnifiedCTA';
import { ROUTES } from '@/constants/routes';

const MainCTASection = () => {
  const popularChoices = [{
    id: 'schengen',
    title: 'Schengen Visa Pack',
    subtitle: '27 European Countries',
    description: 'Access 27 European countries with a single visa application. Perfect for exploring multiple destinations.',
    price: 'from $193',
    image: '/lovable-uploads/a70031da-92cd-4c64-bc4e-e490944cd7aa.png',
    alt: 'European Union flag waving in front of classical European architecture',
    badge: 'POPULAR',
    badgeColor: 'bg-red-500',
    route: ROUTES.SCHENGEN_LANDING,
    features: ['90-day validity', 'Multiple entries', 'Fast processing']
  }, {
    id: 'portugal',
    title: 'Portugal Long-Stay Visa',
    subtitle: 'Work, Study & Residence',
    description: 'Long-term visa for Portugal with comprehensive support for work permits and residency applications.',
    price: 'from $240',
    image: '/lovable-uploads/9c32b030-f008-4022-995f-0151ebec23ae.png',
    alt: 'Beautiful view of Portuguese architecture and cityscape from historic window',
    badge: 'TRENDING',
    badgeColor: 'bg-green-500',
    route: ROUTES.PORTUGAL_LONG_STAY,
    features: ['Work authorization', 'Path to residency', 'Family inclusion']
  }];

  return (
    <UnifiedCTA
      variant="main"
      title="Priority Visa Guidance"
      subtitle="Start your visa application today with our most requested services"
      options={popularChoices}
    />
  );
};

export default MainCTASection;
