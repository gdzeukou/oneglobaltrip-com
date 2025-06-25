
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

const NigeriaShortStay = () => {
  const [showCalendly, setShowCalendly] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const cities = [
    {
      name: 'Lagos',
      image: '/lovable-uploads/143774ee-f153-4307-a278-d6ccd66f7385.png',
      description: 'Africa\'s largest city and commercial hub, famous for Nollywood, music, and vibrant nightlife',
      highlights: ['Victoria Island', 'Lekki Peninsula', 'National Theatre', 'Tafawa Balewa Square']
    },
    {
      name: 'Abuja',
      image: '/lovable-uploads/44149117-d839-409c-9984-58ab8271cacf.png',
      description: 'Modern planned capital city with impressive architecture and government buildings',
      highlights: ['Aso Rock', 'National Mosque', 'Nigerian National Museum', 'Millennium Park']
    },
    {
      name: 'Kano',
      image: '/lovable-uploads/be2a8c66-48a9-4a0d-be71-08376760b905.png',
      description: 'Historic trading city with ancient walls, traditional markets, and rich Hausa culture',
      highlights: ['Kano City Walls', 'Kurmi Market', 'Emir\'s Palace', 'Dala Hill']
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-white">
      <Navigation />
      
      <section className="pt-24 pb-16 bg-gradient-to-r from-green-700 to-green-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-green-800/20"></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
            Nigeria e-Visa
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Discover the Giant of Africa with its rich culture, bustling cities, and warm hospitality. Experience Nollywood glamour, traditional festivals, and diverse landscapes.
          </p>
          <Button 
            onClick={scrollToForm}
            className="bg-white hover:bg-gray-100 text-green-800 font-bold text-lg px-8 py-3 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            Start Nigeria e-Visa Application
          </Button>
        </div>
      </section>

      <TrustBadges />

      <CountrySpecificPricing 
        country="nigeriaVisa"
        title="Nigeria Visa Pricing"
        description="Transparent pricing with no hidden fees"
      />

      <section className="py-16 bg-gradient-to-br from-white to-green-50/50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Experience Nigeria's Dynamic Cities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cities.map((city) => (
              <Card key={city.name} className="group relative overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-green-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
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
                      <span key={highlight} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm group-hover:bg-green-200 transition-colors duration-300">
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
      <section className="py-16 bg-gradient-to-br from-gray-50 to-green-50/30">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Nigeria Visa Requirements
          </h2>
          <DynamicVisaChecklist onStartApplication={handleStartApplication} />
        </div>
      </section>

      <section id="visa-form" className="py-16 bg-gradient-to-br from-white to-green-50/50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Start Your Nigeria e-Visa Application
          </h2>
          <UnifiedTravelForm 
            type="visa-application" 
            title="Nigeria e-Visa Application"
            onComplete={() => setShowCalendly(true)}
          />
        </div>
      </section>

      <section className="py-8 bg-gradient-to-r from-yellow-400 to-yellow-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20"></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h3 className="text-2xl font-bold text-green-800 mb-2">PAY $0 DOWN</h3>
          <p className="text-green-800">Start your Nigeria e-Visa application today with no upfront payment required</p>
        </div>
      </section>

      {showCalendly && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full shadow-2xl border border-white/20">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Schedule Your Consultation</h3>
            <p className="mb-6 text-gray-700">Book a 30-minute call with our visa experts to discuss your Nigeria application.</p>
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

export default NigeriaShortStay;
