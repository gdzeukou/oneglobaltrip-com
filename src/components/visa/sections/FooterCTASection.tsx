
import UnifiedCTA from '@/components/common/UnifiedCTA';
import { ROUTES } from '@/constants/routes';

const FooterCTASection = () => {
  return (
    <UnifiedCTA
      variant="footer"
      title="Still have questions? Talk to a visa expert"
      description="Get personalized advice for your specific travel situation"
      buttonText="Book Free Consultation"
      buttonAction={() => window.open(ROUTES.CALENDLY_VISA_DISCOVERY, '_blank')}
    />
  );
};

export default FooterCTASection;
