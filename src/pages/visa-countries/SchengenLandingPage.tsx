
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SchengenHeroCarousel from '@/components/visa/schengen/SchengenHeroCarousel';
import SchengenAuthGate from '@/components/visa/schengen/SchengenAuthGate';
import SchengenVisaInfo from '@/components/visa/schengen/SchengenVisaInfo';
import SchengenPackages from '@/components/visa/schengen/SchengenPackages';
import SchengenWarnings from '@/components/visa/schengen/SchengenWarnings';
import SchengenReviews from '@/components/visa/schengen/SchengenReviews';

const SchengenLandingPage = () => {
  const { user, session } = useAuth();
  const [showProtectedContent, setShowProtectedContent] = useState(false);

  useEffect(() => {
    // Show protected content if user is authenticated
    if (user && session) {
      setShowProtectedContent(true);
    }
  }, [user, session]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Slideshow Carousel */}
      <SchengenHeroCarousel />
      
      {/* Authentication Gate */}
      {!showProtectedContent && (
        <SchengenAuthGate onAuthSuccess={() => setShowProtectedContent(true)} />
      )}
      
      {/* Protected Content - Only visible after authentication */}
      {showProtectedContent && (
        <>
          <SchengenVisaInfo />
          <SchengenPackages />
          <SchengenWarnings />
          <SchengenReviews />
        </>
      )}
      
      <Footer />
    </div>
  );
};

export default SchengenLandingPage;
