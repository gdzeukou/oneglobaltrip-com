
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import UnifiedTravelForm from '@/components/forms/UnifiedTravelForm';
import TrustBadges from '@/components/visa/TrustBadges';
import CountrySpecificPricing from '@/components/visa/CountrySpecificPricing';
import DynamicVisaChecklist from '@/components/visa/pages/DynamicVisaChecklist';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const CanadaShortStay = () => {
  const [showCalendly, setShowCalendly] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const cities = [
    {
      name: 'Toronto',
      image: '/lovable-uploads/143774ee-f153-4307-a278-d6ccd66f7385.png',
      description: 'Canada\'s largest city with iconic CN Tower, diverse neighborhoods, and cultural attractions',
      highlights: ['CN Tower', 'Distillery District', 'Royal Ontario Museum', 'Harbourfront']
    },
    {
      name: 'Vancouver',
      image: '/lovable-uploads/44149117-d839-409c-9984-58ab8271cacf.png',
      description: 'Pacific coast gem surrounded by mountains, offering outdoor adventures and urban sophistication',
      highlights: ['Stanley Park', 'Granville Island', 'Capilano Bridge', 'Grouse Mountain']
    },
    {
      name: 'Montreal',
      image: '/lovable-uploads/be2a8c66-48a9-4a0d-be71-08376760b905.png',
      description: 'French-Canadian culture hub with historic Old Town, festivals, and European charm',
      highlights: ['Old Montreal', 'Mount Royal', 'Notre-Dame Basilica', 'Jazz Festival']
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-white">
      <Navigation />
      
      <section className="pt-24 pb-16 bg-gradient-to-r from-red-600 to-red-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-red-700/20"></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-red-100 bg-clip-text text-transparent">
            Canada Visitor Visa
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Experience breathtaking natural beauty, vibrant cities, and warm Canadian hospitality. From Niagara Falls to the Rocky Mountains, Canada offers unforgettable adventures.
          </p>
          <Button 
            onClick={scrollToForm}
            className="bg-white hover:bg-gray-100 text-red-700 font-bold text-lg px-8 py-3 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            Start Canada Visa Application
          </Button>
        </div>
      </section>

      <TrustBadges />

      <CountrySpecificPricing 
        country="canadaEntry"
        title="Canada Visitor Visa Pricing"
        description="Transparent pricing with no hidden fees"
      />

      <section className="py-16 bg-gradient-to-br from-white to-red-50/50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Explore Canada's Vibrant Cities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cities.map((city) => (
              <Card key={city.name} className="group relative overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-red-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative h-48">
                  <img
                    src={city.image}
                    alt={city.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white text-xl font-bold group-hover:text-yellow-300 transition-colors duration-300">{city.name}</h3>
                  </div>
                </div>
                <CardContent className="p-6 relative z-10">
                  <p className="text-gray-600 mb-4 group-hover:text-gray-700 transition-colors duration-300">{city.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {city.highlights.map((highlight) => (
                      <span key={highlight} className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm group-hover:bg-red-200 transition-colors duration-300">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </CardContent>
                
                {/* Hover shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-1000 pointer-events-none" />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Requirements Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-red-50/30">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Canada Visa Requirements
          </h2>
          <DynamicVisaChecklist onStartApplication={handleStartApplication} />
        </div>
      </section>

      <section id="visa-form" className="py-16 bg-gradient-to-br from-white to-red-50/50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Start Your Canada Visa Application
          </h2>
          <UnifiedTravelForm 
            type="visa-application" 
            title="Canada Visitor Visa Application"
            onComplete={() => setShowCalendly(true)}
          />
        </div>
      </section>

      <section className="py-8 bg-gradient-to-r from-yellow-400 to-yellow-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20"></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h3 className="text-2xl font-bold text-red-800 mb-2">PAY $0 DOWN</h3>
          <p className="text-red-800">Start your Canada visa application today with no upfront payment required</p>
        </div>
      </section>

      {showCalendly && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full shadow-2xl border border-white/20">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Schedule Your Consultation</h3>
            <p className="mb-6 text-gray-700">Book a 30-minute call with our visa experts to discuss your Canada application.</p>
            <Button
              onClick={() => window.open('https://calendly.com/camronm-oneglobaltrip/30min', '_blank')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold mb-4 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Book Consultation
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowCalendly(false)}
              className="w-full hover:bg-gray-50 transition-colors duration-300"
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

export default CanadaShortStay;
