
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
            description: 'Free renewal • 15% off all services • Post-arrival assistance • Priority line',
            price: '$279/year',
            image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
            alt: 'Passport Club membership',
            badge: 'Save All Year',
            badgeColor: 'bg-emerald-500',
            route: '/pricing',
            features: ['Free renewal', 'Post-arrival support', '15% discount']
          },
          {
            id: 'visa_assist',
            title: 'Visa Assist',
            subtitle: 'Essential Service',
            description: '✓ Application review with smart AI checklist • ✓ Form completion & VAC submission • ✓ Real-time tracking portal • ✓ 48h email SLA',
            price: '$129',
            image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop',
            alt: 'Visa assistance service',
            route: '/visas',
            features: ['Application review', 'AI checklist', 'Tracking portal']
          },
          {
            id: 'trip_bundle',
            title: 'Trip Bundle',
            subtitle: 'Complete Travel Package',
            description: '✓ Everything in Visa Assist • ✓ Guaranteed 4-star hotel in prime location • ✓ Premium flight + lounge access* • ✓ OGT TripGift credit • ✓ Comprehensive travel insurance deals • ✓ 24/7 WhatsApp & phone support',
            price: '$249',
            image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
            alt: 'Complete travel bundle',
            badge: 'Most Popular',
            badgeColor: 'bg-orange-500',
            route: '/packages',
            features: ['Everything in Visa Assist', '4-star hotel', 'Premium flight', 'TripGift credit']
          },
          {
            id: 'ogt_elite',
            title: 'OGT Elite',
            subtitle: 'Concierge Premium',
            description: '✓ Everything in Trip Bundle • ✓ Dedicated human agent of your choice • ✓ Priority biometric appointment slot hunt • ✓ Airport transfer service • ✓ Restaurant / event reservations • ✓ 2h SLA & 24/7 emergency helpline',
            price: '$479',
            image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
            alt: 'Elite concierge service',
            route: '/pricing',
            features: ['Everything in Trip Bundle', 'Dedicated agent', 'Priority slot hunt']
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
