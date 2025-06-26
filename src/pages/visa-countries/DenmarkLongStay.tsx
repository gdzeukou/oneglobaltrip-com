import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import EnhancedMultiStepForm from '@/components/visa/EnhancedMultiStepForm';
import TrustBadges from '@/components/visa/TrustBadges';
import CountrySpecificPricing from '@/components/visa/CountrySpecificPricing';
import DenmarkLongStayRequirements from '@/components/visa/DenmarkLongStayRequirements';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, AlertTriangle, FileText, Clock, Euro } from 'lucide-react';

const DenmarkLongStay = () => {
  const [showCalendly, setShowCalendly] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Work');
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const cities = [
    {
      name: 'Copenhagen',
      image: '/lovable-uploads/143774ee-f153-4307-a278-d6ccd66f7385.png',
      description: 'Capital famous for smørrebrød, hygge culture, and colorful Nyhavn waterfront',
      highlights: ['Smørrebrød', 'Hygge Culture', 'Nyhavn Harbor', 'Tivoli Gardens']
    },
    {
      name: 'Aarhus',
      image: '/lovable-uploads/44149117-d839-409c-9984-58ab8271cacf.png',
      description: 'University city known for Danish pastries, ARoS art museum, and vibrant music festivals',
      highlights: ['Danish Pastries', 'ARoS Museum', 'Aarhus Festival', 'Latin Quarter']
    },
    {
      name: 'Odense',
      image: '/lovable-uploads/be2a8c66-48a9-4a0d-be71-08376760b905.png',
      description: 'Hans Christian Andersen\'s birthplace, famous for fairy tales, fynsk cuisine, and historic charm',
      highlights: ['Fairy Tales', 'Fynsk Cuisine', 'Andersen Museum', 'Historic Center']
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
      
      <section className="pt-24 pb-16 bg-gradient-to-r from-red-700 to-white text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Denmark Long-Stay Visa</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Complete Danish travel assistance package. We handle visa processing, accommodations, and cultural integration support.
          </p>
          <Button 
            onClick={scrollToForm}
            className="bg-white hover:bg-gray-100 text-red-700 font-bold text-lg px-8 py-3"
          >
            Start Denmark Application
          </Button>
        </div>
      </section>

      <TrustBadges />

      <CountrySpecificPricing 
        country="denmarkLongStay"
        title="Denmark Long-Stay Visa Pricing"
        description="Transparent pricing with no hidden fees"
      />

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <DenmarkLongStayRequirements 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
      </section>

      <section id="visa-form" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Start Your Denmark Application
          </h2>
          <EnhancedMultiStepForm 
            type="long-stay" 
            preSelectedCountry="Denmark"
            onComplete={() => setShowCalendly(true)}
          />
        </div>
      </section>

      <section className="py-8 bg-yellow-500">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-blue-800 mb-2">PAY $0 DOWN</h3>
          <p className="text-blue-800">Start your Denmark visa application today with no upfront payment required</p>
        </div>
      </section>

      {showCalendly && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Schedule Your Consultation</h3>
            <p className="mb-4">Book a 30-minute call with our visa experts to discuss your Denmark application requirements.</p>
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

export default DenmarkLongStay;
