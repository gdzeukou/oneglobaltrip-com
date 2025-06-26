
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import UnifiedTravelForm from '@/components/forms/UnifiedTravelForm';
import TrustBadges from '@/components/visa/TrustBadges';
import CountrySpecificPricing from '@/components/visa/CountrySpecificPricing';
import SchengenRequirements from '@/components/visa/SchengenRequirements';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const SchengenShortStay = () => {
  const [showCalendly, setShowCalendly] = useState(false);
  const [selectedPurpose, setSelectedPurpose] = useState('Tourism');
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const countries = [
    {
      name: 'France',
      image: '/lovable-uploads/143774ee-f153-4307-a278-d6ccd66f7385.png',
      description: 'Experience French culture, cuisine, and iconic landmarks like the Eiffel Tower',
      highlights: ['Eiffel Tower', 'Louvre Museum', 'French Cuisine', 'Palace of Versailles']
    },
    {
      name: 'Germany',
      image: '/lovable-uploads/44149117-d839-409c-9984-58ab8271cacf.png',
      description: 'Discover German history, Oktoberfest, and beautiful castles',
      highlights: ['Oktoberfest', 'Neuschwanstein Castle', 'Berlin Wall', 'Christmas Markets']
    },
    {
      name: 'Italy',
      image: '/lovable-uploads/be2a8c66-48a9-4a0d-be71-08376760b905.png',
      description: 'Explore ancient Rome, Renaissance art, and authentic Italian cuisine',
      highlights: ['Colosseum', 'Vatican City', 'Venice Canals', 'Italian Cuisine']
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
      
      <section className="pt-24 pb-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Schengen Short-Stay Visa</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Visit 27 European countries with one visa. Explore historic cities, diverse cultures, and stunning landscapes across Europe.
          </p>
          <Button 
            onClick={scrollToForm}
            className="bg-white hover:bg-gray-100 text-blue-700 font-bold text-lg px-8 py-3"
          >
            Start Schengen Visa Application
          </Button>
        </div>
      </section>

      <TrustBadges />

      <CountrySpecificPricing 
        country="schengenShortStay"
        title="Schengen Short-Stay Visa Pricing"
        description="Transparent pricing with no hidden fees"
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Explore 27 European Countries
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {countries.map((country) => (
              <Card key={country.name} className="overflow-hidden hover-lift">
                <div className="relative h-48">
                  <img
                    src={country.image}
                    alt={country.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white text-xl font-bold">{country.name}</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4">{country.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {country.highlights.map((highlight) => (
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
          <SchengenRequirements 
            selectedCategory={selectedPurpose}
            onCategoryChange={setSelectedPurpose}
          />
        </div>
      </section>

      <section id="visa-form" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Start Your Schengen Visa Application
          </h2>
          <UnifiedTravelForm 
            type="visa-application" 
            title="Schengen Short-Stay Visa Application"
            onComplete={() => setShowCalendly(true)}
          />
        </div>
      </section>

      <section className="py-8 bg-yellow-500">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-blue-800 mb-2">PAY $0 DOWN</h3>
          <p className="text-blue-800">Start your Schengen visa application today with no upfront payment required</p>
        </div>
      </section>

      {showCalendly && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Schedule Your Consultation</h3>
            <p className="mb-4">Book a 30-minute call with our visa experts to discuss your Schengen visa application.</p>
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

export default SchengenShortStay;
