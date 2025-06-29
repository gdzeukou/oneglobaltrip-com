import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SchengenHeroEnhanced from '@/components/visa/schengen-landing/SchengenHeroEnhanced';
import AIVisaChecker from '@/components/visa/AIVisaChecker';
import SchengenInfoSection from '@/components/visa/schengen-landing/SchengenInfoSection';
import SchengenVisaRequirements from '@/components/visa/schengen-landing/SchengenVisaRequirements';
import SchengenProcessSteps from '@/components/visa/schengen-landing/SchengenProcessSteps';
import SchengenPackagesEnhanced from '@/components/visa/schengen-landing/SchengenPackagesEnhanced';
import SchengenTrustIndicators from '@/components/visa/schengen-landing/SchengenTrustIndicators';
import SchengenTestimonialsEnhanced from '@/components/visa/schengen-landing/SchengenTestimonialsEnhanced';
import SchengenFAQ from '@/components/visa/schengen-landing/SchengenFAQ';
import SchengenBottomCTA from '@/components/visa/schengen-landing/SchengenBottomCTA';

const SchengenShortStayLanding = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <section id="hero">
        <SchengenHeroEnhanced />
      </section>

      <section id="ai-visa-checker">
        <AIVisaChecker />
      </section>

      <section id="what-is-schengen">
        <SchengenInfoSection />
      </section>

      <section id="who-needs-visa">
        <SchengenVisaRequirements />
      </section>

      <section id="how-to-get-visa">
        <SchengenProcessSteps />
      </section>

      <section id="packages">
        <SchengenPackagesEnhanced />
      </section>

      <section id="trust-indicators">
        <SchengenTrustIndicators />
      </section>

      <section id="testimonials">
        <SchengenTestimonialsEnhanced />
      </section>

      <section id="faq">
        <SchengenFAQ />
      </section>

      <section id="bottom-cta">
        <SchengenBottomCTA />
      </section>

      <Footer />
    </div>
  );
};

export default SchengenShortStayLanding;
