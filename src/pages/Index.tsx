
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
            id: 'passport_club',
            title: 'OGT Passport Club',
            subtitle: 'Annual Membership',
            description: 'Unlimited visa renewals with exclusive member benefits and year-round savings',
            price: '$279/y',
            image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
            alt: 'Passport Club membership',
            badge: 'Save All Year',
            badgeColor: 'bg-emerald-500',
            route: '/pricing',
            features: [
              'Unlimited visa renewals at no extra cost',
              '15% discount on all services and packages', 
              'Priority customer support line',
              'Post-arrival assistance and concierge',
              'Access to exclusive member-only deals'
            ]
          },
          {
            id: 'visa_assist',
            title: 'Visa Assist',
            subtitle: 'Essential Service',
            description: 'Professional visa application support with AI-powered accuracy checks',
            price: '$129',
            image: '/lovable-uploads/0eab89a7-31c2-4a08-9421-fa542434e4ce.png',
            alt: 'Visa assistance service',
            route: '/visas',
            features: [
              'Smart AI application review and validation',
              'Biometric/Fingerprint Appointment Hunter',
              'Complete form preparation and submission',
              'Real-time application tracking portal',
              'Document checklist and requirements guide',
              '24/7 AI Travel Agent'
            ]
          },
          {
            id: 'trip_bundle',
            title: 'Trip Bundle',
            subtitle: 'Complete Travel Package',
            description: 'Full travel experience with visa, accommodation, and flight arrangements',
            price: '$249',
            image: '/lovable-uploads/2aa35fa9-6f77-4530-b502-0223423fa205.png',
            alt: 'Complete travel bundle',
            badge: 'Most Popular',
            badgeColor: 'bg-orange-500',
            route: '/packages',
            features: [
              'All Visa Assist services included',
              'Guaranteed 4-star hotel in prime location',
              'Premium flight booking with lounge access',
              'OGT TripGift credit for activities',
              'Comprehensive Travel Insurance Picks'
            ]
          },
          {
            id: 'ogt_elite',
            title: 'OGT Elite',
            subtitle: 'Concierge Premium',
            description: 'White-glove service with dedicated personal travel agent and VIP treatment',
            price: '$479',
            image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
            alt: 'Elite concierge service',
            route: '/pricing',
            features: [
              'All Trip Bundle services included',
              'Dedicated Human Certified Travel Advisor',
              'Priority biometric appointment booking',
              'Airport transfer and VIP assistance',
              'Restaurant and event reservations'
            ]
          }
        ]}
      />
      <AITripRecommender />
      <InteractiveWorldMap />
      <ServicesSection />
      <TrustIndicators />
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
