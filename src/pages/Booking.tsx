
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import UnifiedTravelForm from '@/components/forms/UnifiedTravelForm';

const Booking = () => {
  const [searchParams] = useSearchParams();
  const packageId = searchParams.get('package');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          <UnifiedTravelForm 
            type="package-booking" 
            preSelectedPackage={packageId || undefined}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Booking;
