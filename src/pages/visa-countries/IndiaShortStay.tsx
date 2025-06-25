
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import UnifiedTravelForm from '@/components/forms/UnifiedTravelForm';
import TrustBadges from '@/components/visa/TrustBadges';
import CountrySpecificPricing from '@/components/visa/CountrySpecificPricing';
import IndiaRequirements from '@/components/visa/IndiaRequirements';
import DynamicVisaChecklist from '@/components/visa/pages/DynamicVisaChecklist';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const IndiaShortStay = () => {
  const [showCalendly, setShowCalendly] = useState(false);
  const [selectedVisaType, setSelectedVisaType] = useState('e-Tourist');
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const cities = [
    {
      name: 'Delhi',
      image: '/lovable-uploads/143774ee-f153-4307-a278-d6ccd66f7385.png',
      description: 'India\'s capital with rich Mughal history, Red Fort, and vibrant street food culture',
      highlights: ['Red Fort', 'India Gate', 'Street Food', 'Chandni Chowk']
    },
    {
      name: 'Mumbai',
      image: '/lovable-uploads/44149117-d839-409c-9984-58ab8271cacf.png',
      description: 'Bollywood capital and financial hub with Gateway of India and bustling markets',
      highlights: ['Gateway of India', 'Bollywood', 'Marine Drive', 'Crawford Market']
    },
    {
      name: 'Agra',
      image: '/lovable-uploads/be2a8c66-48a9-4a0d-be71-08376760b905.png',
      description: 'Home to the iconic Taj Mahal, one of the Seven Wonders of the World',
      highlights: ['Taj Mahal', 'Agra Fort', 'Mehtab Bagh', 'Fatehpur Sikri']
    }
  ];

  const scrollToForm = () => {
    const element = document.getElementById('visa-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartApplication = () => {
    scrollToForm();
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <section className="pt-24 pb-16 bg-gradient-to-r from-orange-600 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">India e-Visa</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Discover incredible India with its rich history, diverse culture, and stunning architecture. From the Taj Mahal to bustling markets, India offers unforgettable experiences.
          </p>
          <Button 
            onClick={scrollToForm}
            className="bg-white hover:bg-gray-100 text-orange-700 font-bold text-lg px-8 py-3"
          >
            Start India e-Visa Application
          </Button>
        </div>
      </section>

      <TrustBadges />

      <CountrySpecificPricing 
        country="indiaVisa"
        title="India e-Visa Pricing"
        description="Transparent pricing with no hidden fees"
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Explore India's Magnificent Cities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cities.map((city) => (
              <Card key={city.name} className="overflow-hidden hover-lift">
                <div className="relative h-48">
                  <img
                    src={city.image}
                    alt={city.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white text-xl font-bold">{city.name}</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4">{city.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {city.highlights.map((highlight) => (
                      <span key={highlight} className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Requirements Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            India e-Visa Requirements
          </h2>
          <DynamicVisaChecklist onStartApplication={handleStartApplication} />
        </div>
      </section>

      {/* Detailed Requirements Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <IndiaRequirements 
            selectedCategory={selectedVisaType}
            onCategoryChange={setSelectedVisaType}
          />
        </div>
      </section>

      <section id="visa-form" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Start Your India e-Visa Application
          </h2>
          <UnifiedTravelForm 
            type="visa-application" 
            title="India e-Visa Application"
            onComplete={() => setShowCalendly(true)}
          />
        </div>
      </section>

      <section className="py-8 bg-yellow-500">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-orange-800 mb-2">PAY $0 DOWN</h3>
          <p className="text-orange-800">Start your India e-Visa application today with no upfront payment required</p>
        </div>
      </section>

      {showCalendly && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Schedule Your Consultation</h3>
            <p className="mb-4">Book a 30-minute call with our visa experts to discuss your India e-Visa application.</p>
            <Button
              onClick={() => window.open('https://calendly.com/camronm-oneglobaltrip/30min', '_blank')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              Book Consultation
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowCalendly(false)}
              className="w-full mt-4"
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

export default IndiaShortStay;
