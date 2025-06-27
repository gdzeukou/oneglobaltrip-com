
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroCarousel from '@/components/home/HeroCarousel';
import TrustIndicators from '@/components/home/TrustIndicators';
import ServicesSection from '@/components/home/ServicesSection';
import PromoSection from '@/components/home/PromoSection';
import StartTripSection from '@/components/home/StartTripSection';
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTASection from '@/components/home/CTASection';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroCarousel />
      <TrustIndicators />
      <ServicesSection />
      <PromoSection />
      <StartTripSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
