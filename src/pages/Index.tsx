
import React from 'react';
import TechNavigation from '@/components/TechNavigation';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import TrustIndicators from '@/components/home/TrustIndicators';
import ServicesSection from '@/components/home/ServicesSection';
import PromoSection from '@/components/home/PromoSection';
import StartTripSection from '@/components/home/StartTripSection';
import TravelDreamsCTA from '@/components/home/TravelDreamsCTA';
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTASection from '@/components/home/CTASection';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <TechNavigation />
      <HeroSection />
      <TrustIndicators />
      <ServicesSection />
      <PromoSection />
      <TravelDreamsCTA />
      <StartTripSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
