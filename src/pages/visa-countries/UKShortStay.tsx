
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import UnifiedTravelForm from '@/components/forms/UnifiedTravelForm';
import TrustBadges from '@/components/visa/TrustBadges';
import CountrySpecificPricing from '@/components/visa/CountrySpecificPricing';
import UKRequirements from '@/components/visa/UKRequirements';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const UKShortStay = () => {
  const [showCalendly, setShowCalendly] = useState(false);
  const [selectedPurpose, setSelectedPurpose] = useState('Tourism');
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const cities = [
    {
      name: 'London',
      image: '/lovable-uploads/143774ee-f153-4307-a278-d6ccd66f7385.png',
      description: 'Historic capital with Big Ben, Tower Bridge, and world-class museums',
      highlights: ['Big Ben', 'Tower Bridge', 'British Museum', 'Thames River']
    },
    {
      name: 'Edinburgh',
      image: '/lovable-uploads/44149117-d839-409c-9984-58ab8271cacf.png',
      description: 'Scottish capital with castle, festivals, and stunning architecture',
      highlights: ['Edinburgh Castle', 'Royal Mile', 'Arthur\'s Seat', 'Festivals']
    },
    {
      name: 'Bath',
      image: '/lovable-uploads/be2a8c66-48a9-4a0d-be71-08376760b905.png',
      description: 'Georgian city famous for Roman baths and beautiful architecture',
      highlights: ['Roman Baths', 'Georgian Architecture', 'Bath Abbey', 'Jane Austen']
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
      
      <section className="pt-24 pb-16 bg-gradient-to-r from-blue-600 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">UK Visitor Visa</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Explore the United Kingdom's rich history, vibrant culture, and stunning landscapes. From London's iconic landmarks to Scotland's highlands.
          </p>
          <Button 
            onClick={scrollToForm}
            className="bg-white hover:bg-gray-100 text-blue-700 font-bold text-lg px-8 py-3"
          >
            Start UK Visa Application
          </Button>
        </div>
      </section>

      <TrustBadges />

      <CountrySpecificPricing 
        country="ukVisa"
        title="UK Visitor Visa Pricing"
        description="Transparent pricing with no hidden fees"
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Explore UK's Historic Cities
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
                      <span key={highlight} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
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
          <UKRequirements 
            selectedCategory={selectedPurpose}
            onCategoryChange={setSelectedPurpose}
          />
        </div>
      </section>

      <section id="visa-form" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Start Your UK Visa Application
          </h2>
          <UnifiedTravelForm 
            type="visa-application" 
            title="UK Visitor Visa Application"
            onComplete={() => setShowCalendly(true)}
          />
        </div>
      </section>

      <section className="py-8 bg-yellow-500">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-blue-800 mb-2">PAY $0 DOWN</h3>
          <p className="text-blue-800">Start your UK visa application today with no upfront payment required</p>
        </div>
      </section>

      {showCalendly && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Schedule Your Consultation</h3>
            <p className="mb-4">Book a 30-minute call with our visa experts to discuss your UK application.</p>
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

export default UKShortStay;
