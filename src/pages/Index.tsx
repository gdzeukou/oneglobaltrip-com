
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
import MainCTASection from '@/components/visa/sections/MainCTASection';
import RealtimeNotifications from '@/components/conversion/RealtimeNotifications';
import AITripRecommender from '@/components/conversion/AITripRecommender';
import InteractiveWorldMap from '@/components/conversion/InteractiveWorldMap';
import MultilingualToggle from '@/components/conversion/MultilingualToggle';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <MultilingualToggle />
      <HeroCarousel />
      <ServicesSection />
      <TrustIndicators />
      <MainCTASection />
      <AITripRecommender />
      <InteractiveWorldMap />
      <PromoSection />
      <StartTripSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
      <RealtimeNotifications />
    </div>
  );
};

export default Index;
