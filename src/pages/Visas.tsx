
import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import VisasHeroSection from '@/components/visa/sections/VisasHeroSection';
import QuickVisaCheckSection from '@/components/visa/sections/QuickVisaCheckSection';
import VisaCarouselSection from '@/components/visa/sections/VisaCarouselSection';
import TransparentPricingSection from '@/components/visa/TransparentPricingSection';
import TrustBadges from '@/components/common/TrustBadges';
import MainCTASection from '@/components/visa/sections/MainCTASection';
import VisaFAQSection from '@/components/visa/sections/VisaFAQSection';
import FooterCTASection from '@/components/visa/sections/FooterCTASection';

const Visas = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToMainCTA = () => {
    const ctaElement = document.getElementById('main-cta-section');
    if (ctaElement) {
      ctaElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <VisasHeroSection onScrollToCTA={scrollToMainCTA} />
      
      <QuickVisaCheckSection />
      
      <VisaCarouselSection />
      
      <TransparentPricingSection />
      
      <TrustBadges />
      
      <MainCTASection />
      
      <VisaFAQSection />

      <FooterCTASection />

      <Footer />
    </div>
  );
};

export default Visas;
