import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import EnhancedMultiStepForm from '@/components/visa/EnhancedMultiStepForm';
import TrustBadges from '@/components/visa/TrustBadges';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Clock, Users, FileText, X } from 'lucide-react';
import CalendlyWidget from '@/components/CalendlyWidget';

const SchengenShortStay = () => {
  const [showCalendly, setShowCalendly] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const cities = [
    {
      name: 'Paris, France',
      image: '/lovable-uploads/143774ee-f153-4307-a278-d6ccd66f7385.png',
      description: 'The City of Light with iconic landmarks, world-class museums, and romantic ambiance',
      highlights: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame', 'Champs-Élysées']
    },
    {
      name: 'Rome, Italy',
      image: '/lovable-uploads/44149117-d839-409c-9984-58ab8271cacf.png',
      description: 'The Eternal City showcasing ancient history, Vatican treasures, and Italian cuisine',
      highlights: ['Colosseum', 'Vatican City', 'Trevi Fountain', 'Roman Forum']
    },
    {
      name: 'Amsterdam, Netherlands',
      image: '/lovable-uploads/be2a8c66-48a9-4a0d-be71-08376760b905.png',
      description: 'Charming canals, vibrant culture, world-renowned museums, and cycling paradise',
      highlights: ['Canal Rings', 'Van Gogh Museum', 'Anne Frank House', 'Jordaan District']
    }
  ];

  const scrollToForm = () => {
    const element = document.getElementById('visa-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormComplete = () => {
    setShowCalendly(true);
    // Scroll to top for better visibility
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <section className="pt-24 pb-16 bg-gradient-to-r from-blue-800 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Schengen Area Tourist Visa</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Explore 27 European countries with one visa. From Paris galleries to Rome's ancient wonders, your European adventure starts here.
          </p>
          <Button 
            onClick={scrollToForm}
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-blue-800 font-bold text-lg px-8 py-3"
          >
            Start Schengen Visa Application
          </Button>
        </div>
      </section>

      <TrustBadges />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Discover Europe's Iconic Cities
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

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Schengen Visa Requirements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6">
              <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Valid Passport</h3>
              <p className="text-sm text-gray-600">Must be valid for at least 3 months beyond stay</p>
            </Card>
            <Card className="text-center p-6">
              <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Processing Time</h3>
              <p className="text-sm text-gray-600">15 calendar days</p>
            </Card>
            <Card className="text-center p-6">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Stay Duration</h3>
              <p className="text-sm text-gray-600">Up to 90 days in 180-day period</p>
            </Card>
            <Card className="text-center p-6">
              <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Coverage</h3>
              <p className="text-sm text-gray-600">27 European countries</p>
            </Card>
          </div>
        </div>
      </section>

      <section id="visa-form" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Start Your Schengen Visa Application
          </h2>
          <EnhancedMultiStepForm 
            type="short-stay" 
            preSelectedCountry="Schengen Area"
            onComplete={handleFormComplete}
          />
        </div>
      </section>

      <section className="py-8 bg-yellow-500">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-blue-800 mb-2">PAY $0 DOWN</h3>
          <p className="text-blue-800">Start your Schengen visa application today with no upfront payment required</p>
        </div>
      </section>

      {/* Enhanced Calendly Modal */}
      {showCalendly && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
            <button 
              onClick={() => setShowCalendly(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2 text-blue-900">🎉 Application Submitted!</h3>
              <p className="text-gray-600 mb-4">
                Great! Now let's schedule your <strong>FREE consultation</strong> to discuss your Schengen visa application.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-yellow-800">
                  <strong>Next Steps:</strong> Book a 30-minute call with our visa experts to review your application and get personalized guidance.
                </p>
              </div>
            </div>
            
            <CalendlyWidget 
              url="https://calendly.com/camronm-oneglobaltrip/30min" 
              buttonText="Schedule My FREE Consultation"
            />
            
            <p className="text-xs text-gray-500 text-center mt-4">
              Or you can close this and we'll contact you within 24 hours
            </p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default SchengenShortStay;
