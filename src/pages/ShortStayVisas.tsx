
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ShortStayHero from '@/components/pages/short-stay-visas/ShortStayHero';
import SchengenInfoRibbon from '@/components/pages/short-stay-visas/SchengenInfoRibbon';
import VisaGrid from '@/components/pages/short-stay-visas/VisaGrid';
import TrustBadges from '@/components/common/TrustBadges';
import FAQSection from '@/components/common/FAQSection';
import UnifiedCTA from '@/components/common/UnifiedCTA';
import { ROUTES } from '@/constants/routes';

const ShortStayVisas = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const scrollToCards = () => {
    const element = document.getElementById('visa-cards');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const faqData = [
    {
      question: "How long does visa processing typically take?",
      answer: "Processing times vary by destination: Schengen visas take 10-15 days, UK visas 15-20 days, and e-visas like UAE and India can be processed in 3-5 days. We provide expedited services for urgent travel."
    },
    {
      question: "What documents do I need for a short-stay visa?",
      answer: "Common requirements include a valid passport, completed application form, passport photos, travel insurance, flight bookings, accommodation proof, and financial statements. Our document checker helps ensure you have everything needed."
    },
    {
      question: "Can you help if my visa gets rejected?",
      answer: "Yes! We offer a 100% approval guarantee. If your visa is rejected due to our error, we'll reapply for free. Our expert review process minimizes rejection risks significantly."
    },
    {
      question: "Do I need travel insurance for my visa application?",
      answer: "Most short-stay visas require travel insurance with minimum coverage (usually €30,000 for Schengen). We can help you get compliant insurance as part of our visa package."
    },
    {
      question: "Can I extend my short-stay visa once I'm there?",
      answer: "Short-stay visas generally cannot be extended beyond the maximum allowed duration (usually 90 days). You must exit and reapply. We can advise on the best strategy for longer stays."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <ShortStayHero onScrollToCards={scrollToCards} />
      <SchengenInfoRibbon />
      <VisaGrid />
      <TrustBadges />
      <FAQSection faqs={faqData} />

      <UnifiedCTA
        variant="footer"
        title="Still unsure? Book a free 15-minute call with a visa expert."
        description="Get personalized advice for your specific travel situation"
        buttonText="Book Free Consultation"
        buttonAction={() => window.open(ROUTES.CALENDLY_VISA_DISCOVERY, '_blank')}
      />

      <Footer />
    </div>
  );
};

export default ShortStayVisas;
