import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import EnhancedMultiStepForm from '@/components/visa/EnhancedMultiStepForm';
import TrustBadges from '@/components/visa/TrustBadges';
import CountrySpecificPricing from '@/components/visa/CountrySpecificPricing';
import FranceLongStayRequirements from '@/components/visa/FranceLongStayRequirements';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, AlertTriangle, FileText, Clock, Euro } from 'lucide-react';

const FranceLongStay = () => {
  const [showCalendly, setShowCalendly] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Work');
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const cities = [
    {
      name: 'Paris',
      image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop&crop=faces,center',
      description: 'City of Light famous for croissants, world-class museums, and iconic Eiffel Tower',
      highlights: ['Croissants & Café', 'Louvre Museum', 'Eiffel Tower', 'Seine River Cruises']
    },
    {
      name: 'Lyon',
      image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&h=600&fit=crop&crop=faces,center',
      description: 'Culinary capital renowned for bouchon restaurants, silk heritage, and Festival of Lights',
      highlights: ['Bouchon Cuisine', 'Silk Museum', 'Festival of Lights', 'Traboules Passages']
    },
    {
      name: 'Marseille',
      image: 'https://images.unsplash.com/photo-1508050919630-b135583b29ab?w=800&h=600&fit=crop&crop=faces,center',
      description: 'Mediterranean port famous for bouillabaisse, Notre-Dame de la Garde, and vibrant markets',
      highlights: ['Bouillabaisse', 'Notre-Dame Basilica', 'Old Port', 'Calanques National Park']
    }
  ];

  const scrollToForm = () => {
    const element = document.getElementById('visa-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <section className="pt-24 pb-16 bg-gradient-to-r from-blue-700 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">France Long-Stay Visa</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Complete French travel assistance package. We handle visa processing, secure accommodations, and organize cultural experiences in the heart of Europe.
          </p>
          <Button 
            onClick={scrollToForm}
            className="bg-white hover:bg-gray-100 text-blue-700 font-bold text-lg px-8 py-3"
          >
            Start France Application
          </Button>
        </div>
      </section>

      <TrustBadges />

      <CountrySpecificPricing 
        country="franceLongStay"
        title="France Long-Stay Visa Pricing"
        description="Transparent pricing with no hidden fees"
      />

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <FranceLongStayRequirements 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
      </section>

      <section id="visa-form" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Start Your France Application
          </h2>
          <EnhancedMultiStepForm 
            type="long-stay" 
            preSelectedCountry="France"
            onComplete={() => setShowCalendly(true)}
          />
        </div>
      </section>

      <section className="py-8 bg-yellow-500">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-blue-800 mb-2">PAY $0 DOWN</h3>
          <p className="text-blue-800">Start your France visa application today with no upfront payment required</p>
        </div>
      </section>

      {showCalendly && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Schedule Your Consultation</h3>
            <p className="mb-4">Book a 30-minute call with our visa experts to discuss your France application requirements.</p>
            <Button
              onClick={() => window.open('https://calendly.com/camronm-oneglobaltrip/30min', '_blank')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold mb-4"
            >
              Book Consultation
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowCalendly(false)}
              className="w-full"
            >
              Close
            </Button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default FranceLongStay;
