
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
import InternationalTestimonials from '@/components/conversion/InternationalTestimonials';
import EnhancedTrustBadges from '@/components/conversion/EnhancedTrustBadges';

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
      {/* Navigation with transparent background over hero */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <Navigation />
      </div>
      
      <VisasHeroSection onScrollToCTA={scrollToMainCTA} />
      
      <QuickVisaCheckSection />
      
      <VisaCarouselSection />
      
      <MainCTASection />
      
      <TransparentPricingSection />
      
      <EnhancedTrustBadges />
      
      <InternationalTestimonials />
      
      <VisaFAQSection />

      <FooterCTASection />

      <Footer />
    </div>
  );
};

export default Visas;
