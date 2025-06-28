
import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import VisasPageHero from '@/components/visa/VisasPageHero';
import QuickVisaWizard from '@/components/visa/QuickVisaWizard';
import VisasCarousel from '@/components/visa/VisasCarousel';
import TransparentPricingSection from '@/components/visa/TransparentPricingSection';
import TrustBadges from '@/components/common/TrustBadges';
import UnifiedCTA from '@/components/common/UnifiedCTA';
import FAQSection from '@/components/common/FAQSection';
import { ROUTES } from '@/constants/routes';

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

  const faqData = [
    {
      question: "How long does visa processing take?",
      answer: "Processing times vary by destination: Schengen visas take 10-15 days, UK visas 15-20 days, and e-visas like UAE and India can be processed in 3-5 days. We provide expedited services for urgent travel."
    },
    {
      question: "What's included in your visa service?",
      answer: "Our service includes document review, application completion, appointment booking, embassy liaison, status tracking, and 24/7 support. We also provide travel insurance and other required documents."
    },
    {
      question: "Do you guarantee visa approval?",
      answer: "While we cannot guarantee approval (only embassies make that decision), we have a 99% success rate. If your visa is rejected due to our error, we'll reapply for free."
    },
    {
      question: "Can you help with urgent applications?",
      answer: "Yes! We offer expedited services for urgent travel. Depending on the destination, we can often get visas processed in 3-7 days with our premium rush service."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <VisasPageHero onScrollToCTA={scrollToMainCTA} />
      
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Quick Visa Check</h2>
          <QuickVisaWizard />
        </div>
      </section>
      
      <div className="container mx-auto px-4 py-8">
        <VisasCarousel />
      </div>
      
      <TransparentPricingSection />
      
      <TrustBadges />
      
      <UnifiedCTA
        id="main-cta-section"
        variant="main"
        title="Choose Your Visa Service"
        subtitle="Whether you're planning a short trip or extended stay, we've got you covered"
        options={ctaOptions}
      />
      
      <FAQSection 
        title="Visa Questions? We've Got Answers"
        subtitle="Everything you need to know about our visa services"
        faqs={faqData}
      />

      <UnifiedCTA
        variant="footer"
        title="Still have questions? Talk to a visa expert"
        description="Get personalized advice for your specific travel situation"
        buttonText="Book Free Consultation"
        buttonAction={() => window.open(ROUTES.CALENDLY_VISA_DISCOVERY, '_blank')}
      />

      <Footer />
    </div>
  );
};

export default Visas;
