
import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import VisasHero from '@/components/visa/VisasHero';
import TransparentPricingSection from '@/components/visa/TransparentPricingSection';
import VisaWizard from '@/components/visa/wizard/VisaWizard';
import MainCTASection from '@/components/visa/MainCTASection';
import VisaCategoriesSection from '@/components/visa/VisaCategoriesSection';
import PopularVisaServicesSection from '@/components/visa/PopularVisaServicesSection';
import EnhancedVisaPagesPreview from '@/components/visa/EnhancedVisaPagesPreview';

const Visas = () => {
  // Direct users to most important CTA on page load
  useEffect(() => {
    const scrollToImportantCTA = () => {
      const ctaElement = document.getElementById('main-cta-section');
      if (ctaElement) {
        setTimeout(() => {
          ctaElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 500);
      }
    };

    scrollToImportantCTA();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navigation />
      
      <VisasHero />
      <TransparentPricingSection />
      <VisaWizard />
      <EnhancedVisaPagesPreview />
      <MainCTASection />
      <VisaCategoriesSection />
      <PopularVisaServicesSection />
      <Footer />
    </div>
  );
};

export default Visas;
