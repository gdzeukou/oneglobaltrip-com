
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import TrustIndicators from '@/components/home/TrustIndicators';
import ServicesSection from '@/components/home/ServicesSection';
import PromoSection from '@/components/home/PromoSection';
import StartTripSection from '@/components/home/StartTripSection';
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTASection from '@/components/home/CTASection';
import VisaRecommendations from '@/components/smart/VisaRecommendations';
import InteractiveMap from '@/components/interactive/InteractiveMap';
import ProgressTracker from '@/components/tracking/ProgressTracker';
import SmartChatbot from '@/components/chat/SmartChatbot';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <TrustIndicators />
      <VisaRecommendations />
      <InteractiveMap />
      <ServicesSection />
      <PromoSection />
      <StartTripSection />
      <ProgressTracker />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
      <SmartChatbot />
    </div>
  );
};

export default Index;
