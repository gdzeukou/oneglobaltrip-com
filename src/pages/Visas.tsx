
import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import VisasHero from '@/components/visa/VisasHero';
import TransparentPricingSection from '@/components/visa/TransparentPricingSection';
import MainCTASection from '@/components/visa/MainCTASection';
import VisaCategoriesSection from '@/components/visa/VisaCategoriesSection';
import PopularVisaServicesSection from '@/components/visa/PopularVisaServicesSection';
import AgentiveInlineWidget from '@/components/ai/AgentiveInlineWidget';

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
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <VisasHero />
      <TransparentPricingSection />
      
      {/* Inline Visa Widget */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-center mb-6 text-gray-900">
            Have Questions? Chat with Camron
          </h3>
          <AgentiveInlineWidget 
            containerId="ogt-visa-widget"
            context="visa"
            height="520px"
          />
        </div>
      </section>
      
      <MainCTASection />
      <VisaCategoriesSection />
      <PopularVisaServicesSection />
      <Footer />
    </div>
  );
};

export default Visas;
