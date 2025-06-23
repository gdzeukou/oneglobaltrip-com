
import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import VisasHero from '@/components/visa/VisasHero';
import TransparentPricingSection from '@/components/visa/TransparentPricingSection';
import MainCTASection from '@/components/visa/MainCTASection';
import VisaCategoriesSection from '@/components/visa/VisaCategoriesSection';
import PopularVisaServicesSection from '@/components/visa/PopularVisaServicesSection';
import AgentiveChatWidget from '@/components/ai/AgentiveChatWidget';

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

    // Set Agentive context for visa pages
    const script = document.createElement('script');
    script.innerHTML = `
      if (window.agentive) {
        window.agentive.setContext({
          page: 'visas',
          context: 'visa',
          services: ['visa_consultation', 'document_review', 'application_assistance']
        });
      }
    `;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Meta tags for Agentive context */}
      <meta data-agentive-context="visa" />
      <meta data-agentive-context-json='{"page":"visas","services":["visa_consultation","document_review","application_assistance"]}' />
      
      <VisasHero />
      <TransparentPricingSection />
      
      {/* Inline Visa Widget */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div id="ogt-visa-widget">
            <AgentiveChatWidget 
              mode="inline"
              context="visa"
              height="520px"
              preloadData={{
                page: 'visas',
                services: ['visa_consultation', 'document_review', 'application_assistance']
              }}
            />
          </div>
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
