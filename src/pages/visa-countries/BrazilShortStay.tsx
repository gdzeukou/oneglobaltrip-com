
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import EnhancedMultiStepForm from '@/components/visa/EnhancedMultiStepForm';
import TrustBadges from '@/components/visa/TrustBadges';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Clock, Users, FileText } from 'lucide-react';
import CalendlyWidget from '@/components/CalendlyWidget';

const BrazilShortStay = () => {
  const [showCalendly, setShowCalendly] = useState(false);
  const location = useLocation();

  // Scroll to top on page navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const cities = [
    {
      name: 'Rio de Janeiro',
      image: '/lovable-uploads/143774ee-f153-4307-a278-d6ccd66f7385.png',
      description: 'Famous for Christ the Redeemer, Copacabana Beach, and vibrant Carnival celebrations',
      highlights: ['Christ the Redeemer', 'Copacabana Beach', 'Sugarloaf Mountain', 'Carnival']
    },
    {
      name: 'São Paulo',
      image: '/lovable-uploads/44149117-d839-409c-9984-58ab8271cacf.png',
      description: 'Brazil\'s business capital with world-class museums, restaurants, and nightlife',
      highlights: ['Financial District', 'MASP Museum', 'Liberdade District', 'Vila Madalena']
    },
    {
      name: 'Brasília',
      image: '/lovable-uploads/be2a8c66-48a9-4a0d-be71-08376760b905.png',
      description: 'The futuristic capital city known for its modernist architecture by Oscar Niemeyer',
      highlights: ['National Congress', 'Cathedral of Brasília', 'Palácio da Alvorada', 'JK Memorial']
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
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-green-800 to-yellow-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Brazil Tourist Visa</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Experience the vibrant culture, stunning landscapes, and warm hospitality of Brazil. From Rio's beaches to São Paulo's energy, your Brazilian adventure awaits.
          </p>
          <Button 
            onClick={scrollToForm}
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-green-800 font-bold text-lg px-8 py-3"
          >
            Start Brazil Visa Application
          </Button>
        </div>
      </section>

      <TrustBadges />

      {/* Cities Showcase */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Discover Brazil's Amazing Cities
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
                      <span key={highlight} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
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

      {/* Visa Requirements */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Brazil Visa Requirements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6">
              <FileText className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Valid Passport</h3>
              <p className="text-sm text-gray-600">Must be valid for at least 6 months</p>
            </Card>
            <Card className="text-center p-6">
              <Clock className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Processing Time</h3>
              <p className="text-sm text-gray-600">5-10 business days</p>
            </Card>
            <Card className="text-center p-6">
              <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Stay Duration</h3>
              <p className="text-sm text-gray-600">Up to 90 days</p>
            </Card>
            <Card className="text-center p-6">
              <MapPin className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Multiple Entry</h3>
              <p className="text-sm text-gray-600">Available for tourism</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="visa-form" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Start Your Brazil Visa Application
          </h2>
          <EnhancedMultiStepForm 
            type="short-stay" 
            preSelectedCountry="Brazil"
            onComplete={() => setShowCalendly(true)}
          />
        </div>
      </section>

      {/* Pay $0 Down Banner */}
      <section className="py-8 bg-yellow-500">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-green-800 mb-2">PAY $0 DOWN</h3>
          <p className="text-green-800">Start your Brazil visa application today with no upfront payment required</p>
        </div>
      </section>

      {/* Calendly Modal */}
      {showCalendly && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Schedule Your Consultation</h3>
            <p className="mb-4">Book a 30-minute call with our visa experts to discuss your Brazil application.</p>
            <CalendlyWidget url="https://calendly.com/camronm-oneglobaltrip/30min" />
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

export default BrazilShortStay;
