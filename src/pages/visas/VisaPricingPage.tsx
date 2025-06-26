
import React from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const VisaPricingPage = () => {
  const { visaType } = useParams<{ visaType: string }>();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {visaType ? visaType.charAt(0).toUpperCase() + visaType.slice(1) : 'Visa'} Pricing
          </h1>
          <p className="text-xl text-gray-600">
            Detailed pricing information for your visa application
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VisaPricingPage;
