
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
import AITripRecommender from '@/components/conversion/AITripRecommender';
import InteractiveWorldMap from '@/components/conversion/InteractiveWorldMap';
import UnifiedCTA from '@/components/common/UnifiedCTA';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroCarousel />
      <UnifiedCTA 
        variant="main"
        title="Choose Your Perfect Travel Experience"
        subtitle="From visa assistance to luxury packages, we handle everything for your dream trip"
        options={[
          {
            id: 'visa-services',
            title: 'Visa Services',
            subtitle: 'Professional visa assistance',
            description: 'Expert guidance for all your visa applications with 99% success rate',
            price: 'From €99',
            image: '/lovable-uploads/3bee657a-be4d-476c-b496-1d6dd9f6031a.png',
            alt: 'Visa services',
            badge: 'Most Popular',
            badgeColor: 'bg-orange-500',
            route: '/visas',
            features: ['Expert Consultation', 'Document Review', 'Fast Processing']
          },
          {
            id: 'travel-packages',
            title: 'Travel Packages',
            subtitle: 'Luxury curated experiences',
            description: 'Handcrafted travel packages designed for unforgettable experiences',
            price: 'From €1,299',
            image: '/lovable-uploads/432945ff-b098-486a-a3e4-03057fc3c67e.png',
            alt: 'Travel packages',
            badge: 'Premium',
            badgeColor: 'bg-purple-500',
            route: '/packages',
            features: ['Luxury Hotels', 'Private Tours', 'Concierge Service']
          }
        ]}
      />
      <AITripRecommender />
      <InteractiveWorldMap />
      <ServicesSection />
      <TrustIndicators />
      <MainCTASection />
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
