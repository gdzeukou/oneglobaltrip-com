
import React from 'react';
import SimplifiedNavigation from '@/components/SimplifiedNavigation';
import Footer from '@/components/Footer';
import HeroCarousel from '@/components/home/HeroCarousel';
import TrustIndicators from '@/components/home/TrustIndicators';
import { ProfileSuggestionBanner } from '@/components/profile/ProfileSuggestionBanner';

import PromoSection from '@/components/home/PromoSection';
import StartTripSection from '@/components/home/StartTripSection';
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTASection from '@/components/home/CTASection';
import WhyChooseSection from '@/components/home/WhyChooseSection';

// Phase 2 MVP Components - High ROI Features
import SmartVisaChecker from '@/components/visa/SmartVisaChecker';
import LiveStats from '@/components/social-proof/LiveStats';
import TrustBadgesEnhanced from '@/components/social-proof/TrustBadgesEnhanced';
import FloatingChatWidget from '@/components/chat/FloatingChatWidget';
import UnifiedCTA from '@/components/common/UnifiedCTA';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <SimplifiedNavigation />
      <ProfileSuggestionBanner />
      <HeroCarousel />
      {/* Single Primary CTA - Streamlined for MVP */}
      <UnifiedCTA 
        variant="main"
        title="Get Your Visa in 3 Simple Steps"
        subtitle="AI-powered visa assistance with 98% success rate. No paperwork confusion."
        options={[
          {
            id: 'visa_assistance',
            title: 'Start Visa Application',
            subtitle: 'AI-Guided Support',
            description: 'Get your visa approved with our AI-guided process',
            price: 'Free Consultation',
            image: '/lovable-uploads/aa2bd5bf-60f3-4560-a840-674f0d86c971.png',
            alt: 'AI Visa Assistance',
            badge: '98% Success Rate',
            badgeColor: 'bg-blue-500',
            route: '/visas',
            features: [
              'Instant visa requirements check',
              'AI-guided application assistance',
              'Document verification',
              'Real-time embassy updates'
            ]
          }
        ]}
      />
      
      {/* Phase 2: Smart Visa Checker - Core Revenue Driver */}
      <SmartVisaChecker />
      
      {/* Phase 2: Live Social Proof */}
      <LiveStats />
      
      <TrustIndicators />
      
      {/* Phase 2: Enhanced Trust Badges */}
      <TrustBadgesEnhanced />
      <WhyChooseSection />
      <PromoSection />
      <StartTripSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <CTASection />
      
      {/* Phase 2: Floating AI Chat Widget - Always Visible */}
      <FloatingChatWidget />
      
      <Footer />
    </div>
  );
};

export default Index;
