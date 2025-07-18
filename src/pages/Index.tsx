
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroCarousel from '@/components/home/HeroCarousel';
import TrustIndicators from '@/components/home/TrustIndicators';
import { ProfileSuggestionBanner } from '@/components/profile/ProfileSuggestionBanner';

import PromoSection from '@/components/home/PromoSection';
import StartTripSection from '@/components/home/StartTripSection';
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTASection from '@/components/home/CTASection';
import MainCTASection from '@/components/visa/sections/MainCTASection';
// Lazy load heavy components for better performance
import { lazy, Suspense } from 'react';

const AITripRecommender = lazy(() => import('@/components/conversion/AITripRecommender'));
const InteractiveWorldMap = lazy(() => import('@/components/conversion/InteractiveWorldMap'));
import UnifiedCTA from '@/components/common/UnifiedCTA';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <ProfileSuggestionBanner />
      <HeroCarousel />
      <UnifiedCTA 
        variant="main"
        title="Travel Smart. Travel Easy."
        subtitle="Create Your AI Personal Travel Agent, no code, for free! Book from multiple platforms, create customized itineraries, guide you through your entire visa application and immigration, and more."
        options={[
          {
            id: 'free_plan',
            title: 'Free Plan',
            subtitle: 'AI Travel Agent',
            description: 'Create your own AI travel agent that works in 180+ countries with smart itineraries and destination tips',
            price: '$0',
            image: '/lovable-uploads/0eab89a7-31c2-4a08-9421-fa542434e4ce.png',
            alt: 'Free AI Travel Agent',
            badge: 'Get Started',
            badgeColor: 'bg-emerald-500',
            route: '/auth',
            features: [
              'Create your own AI travel agent',
              'Plan 3 trips/month',
              'Smart itineraries, destination tips, activity ideas',
              'Works in 180+ countries',
              'No code required'
            ]
          },
          {
            id: 'visa_assistance',
            title: 'Visa Assistance',
            subtitle: 'AI-Guided Support',
            description: 'AI-guided form filling with document verification and real-time embassy alerts',
            price: '$30',
            priceNote: 'per application',
            image: '/lovable-uploads/aa2bd5bf-60f3-4560-a840-674f0d86c971.png',
            alt: 'AI Visa Assistance',
            badge: '98% Success Rate',
            badgeColor: 'bg-blue-500',
            route: '/visas',
            features: [
              'AI-guided form filling',
              'Document verification',
              'Real-time embassy alerts',
              'Powered by a 98% visa approval rate',
              'Expert review available'
            ]
          },
          {
            id: 'global_explorer',
            title: 'Global Explorer',
            subtitle: 'Premium Access',
            description: 'Unlimited visa support with real-time alerts and specific AI trip planning for all travel styles',
            price: '$99/year',
            priceNote: 'or $10/month',
            image: '/lovable-uploads/2aa35fa9-6f77-4530-b502-0223423fa205.png',
            alt: 'Global Explorer Premium',
            badge: 'Most Popular',
            badgeColor: 'bg-orange-500',
            route: '/pricing',
            features: [
              'Unlimited visa support',
              'Real-time flight price alerts',
              'Specific AI trip planning (foodies, adventure, family trips)',
              'Offline access for remote travel',
              'Priority customer support'
            ]
          }
        ]}
      />
      <Suspense fallback={<div className="h-64 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
        <AITripRecommender />
      </Suspense>
      <Suspense fallback={<div className="h-64 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
        <InteractiveWorldMap />
      </Suspense>
      
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
