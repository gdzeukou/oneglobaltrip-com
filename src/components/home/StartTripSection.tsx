
import React from 'react';
import { Plane, Star, CreditCard } from 'lucide-react';
import UnifiedTravelForm from '@/components/forms/UnifiedTravelForm';
import AuthenticatedDocumentValidator from '@/components/smart/AuthenticatedDocumentValidator';
import { AnimatedSection } from '@/components/ui/animated-section';

const StartTripSection = () => {
  return (
    <AnimatedSection animation="fadeInUp">
      <section className="py-16 bg-gradient-to-br from-yellow-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Plane className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-4xl font-bold text-gray-900">START YOUR JOURNEY TODAY</h2>
            </div>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <CreditCard className="h-5 w-5 text-green-600" />
              <span className="text-xl font-semibold text-green-600">Pay $0 Down</span>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tell us about your dream destination and we'll create a personalized travel package just for you. 
              Our expert team will handle every detail from visas to accommodations.
            </p>
            <div className="flex items-center justify-center mt-4 space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 text-gray-600">Trusted by 10,000+ happy travelers</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <UnifiedTravelForm type="consultation" />
            <AuthenticatedDocumentValidator />
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
};

export default StartTripSection;
