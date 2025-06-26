
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
  // Smooth scroll to CTA section with improved timing
  useEffect(() => {
    const scrollToImportantCTA = () => {
      const ctaElement = document.getElementById('main-cta-section');
      if (ctaElement) {
        setTimeout(() => {
          ctaElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 800);
      }
    };

    scrollToImportantCTA();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Enhanced background patterns */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-amber-200/10 to-orange-200/10 rounded-full blur-2xl" />
      </div>

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="relative z-10">
        <Navigation />
        
        {/* Enhanced section spacing and animations */}
        <div className="animate-fade-in">
          <VisasHero />
        </div>
        
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <TransparentPricingSection />
        </div>
        
        {/* Enhanced wizard section with better container */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-blue-50/80 to-indigo-50/80 backdrop-blur-sm" />
          <div className="relative z-10 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Find Your Perfect Visa
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Our intelligent visa wizard guides you through the process step by step, 
                  ensuring you get exactly the right visa for your journey.
                </p>
              </div>
              <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-xl border border-blue-100/50 p-8 hover:shadow-2xl hover:border-blue-200/70 transition-all duration-500 group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 via-transparent to-purple-50/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <VisaWizard />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <EnhancedVisaPagesPreview />
        </div>
        
        <div className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <MainCTASection />
        </div>
        
        {/* Enhanced categories section */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50/80 to-blue-50/60 backdrop-blur-sm" />
          <div className="relative z-10 animate-fade-in" style={{ animationDelay: '1s' }}>
            <VisaCategoriesSection />
          </div>
        </section>
        
        {/* Enhanced services section */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/80 via-white/90 to-purple-50/80 backdrop-blur-sm" />
          <div className="relative z-10 animate-fade-in" style={{ animationDelay: '1.2s' }}>
            <PopularVisaServicesSection />
          </div>
        </section>
        
        <Footer />
      </div>

      {/* Enhanced floating elements */}
      <div className="fixed top-20 right-10 w-4 h-4 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full opacity-60 animate-pulse pointer-events-none" />
      <div className="fixed bottom-32 left-10 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-50 animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />
      <div className="fixed top-1/2 left-20 w-2 h-2 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full opacity-40 animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />
    </div>
  );
};

export default Visas;
