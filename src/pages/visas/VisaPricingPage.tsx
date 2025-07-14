
import React from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import VisaPricingHero from '@/components/visa/pricing/VisaPricingHero';
import VisaPricingCards from '@/components/visa/pricing/VisaPricingCards';
import VisaPricingInfo from '@/components/visa/pricing/VisaPricingInfo';

const VisaPricingPage = () => {
  const { visaType } = useParams<{ visaType: string }>();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      <VisaPricingHero visaType={visaType} />
      <VisaPricingCards visaType={visaType} />
      <VisaPricingInfo />
      <Footer />
    </div>
  );
};

export default VisaPricingPage;
