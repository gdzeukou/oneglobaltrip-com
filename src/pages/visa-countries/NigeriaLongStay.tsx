import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import EnhancedMultiStepForm from '@/components/visa/EnhancedMultiStepForm';
import TrustBadges from '@/components/visa/TrustBadges';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, AlertTriangle, FileText, Clock, Zap } from 'lucide-react';

const NigeriaLongStay = () => {
  const [showCalendly, setShowCalendly] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const cities = [
    {
      name: 'Lagos',
      image: '/lovable-uploads/143774ee-f153-4307-a278-d6ccd66f7385.png',
      description: 'Nigeria\'s vibrant megacity famous for Afrobeats music, Nollywood films, and dynamic street culture',
      highlights: ['Jollof Rice', 'Afrobeats Music', 'Lagos Carnival', 'Art Galleries']
    },
    {
      name: 'Abuja',
      image: '/lovable-uploads/44149117-d839-409c-9984-58ab8271cacf.png',
      description: 'Modern capital city known for its planned architecture, cultural festivals, and diverse cuisine',
      highlights: ['Suya Grills', 'Abuja Carnival', 'National Mosque', 'Cultural Festivals']
    },
    {
      name: 'Kano',
      image: '/lovable-uploads/be2a8c66-48a9-4a0d-be71-08376760b905.png',
      description: 'Ancient trading city famous for traditional crafts, Hausa culture, and the historic Kurmi Market',
      highlights: ['Fura da Nono', 'Durbar Festival', 'Ancient City Walls', 'Traditional Crafts']
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
      
      <section className="pt-24 pb-16 bg-gradient-to-r from-green-700 to-white text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Nigeria Long-Stay Visa</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Full-service Nigeria travel package. We process your visa, find the best flight deals, secure comfortable hotels, and arrange exciting cultural activities including Nollywood tours and music festivals.
          </p>
          <Button 
            onClick={scrollToForm}
            className="bg-white hover:bg-gray-100 text-green-700 font-bold text-lg px-8 py-3"
          >
            Start Nigeria Application
          </Button>
        </div>
      </section>

      <TrustBadges />

      <section className="py-12 bg-green-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-900">
            🚨 Critical: Tropical Medicine Insurance Required
          </h2>
          <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-6 max-w-3xl mx-auto">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-green-800 mb-1">$50,000+ Coverage Mandatory</h3>
                <p className="text-green-700 text-sm">
                  Nigeria requires specialized tropical disease coverage, malaria treatment, 
                  yellow fever vaccination, and emergency evacuation. Standard insurance is insufficient.
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            <Card className="border hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Shield className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Tropical Coverage</h3>
                    <p className="text-green-600 font-semibold text-sm mb-1">Endemic disease protection</p>
                    <p className="text-gray-600 text-xs">Malaria, yellow fever, and tropical disease treatment coverage required</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Zap className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Emergency Evacuation</h3>
                    <p className="text-green-600 font-semibold text-sm mb-1">Medical evacuation included</p>
                    <p className="text-gray-600 text-xs">Emergency transport to home country or nearest adequate facility</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Cultural Richness of Nigerian Cities
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

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Nigeria Visa Requirements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6">
              <FileText className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Valid Passport</h3>
              <p className="text-sm text-gray-600">Must be valid for at least 6 months</p>
            </Card>
            <Card className="text-center p-6">
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Tropical Insurance</h3>
              <p className="text-sm text-gray-600">$50,000+ with tropical coverage</p>
            </Card>
            <Card className="text-center p-6">
              <Clock className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Processing Time</h3>
              <p className="text-sm text-gray-600">14-30 days average</p>
            </Card>
            <Card className="text-center p-6">
              <Zap className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Yellow Fever</h3>
              <p className="text-sm text-gray-600">Vaccination certificate required</p>
            </Card>
          </div>
        </div>
      </section>

      <section id="visa-form" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Start Your Nigeria Application
          </h2>
          <EnhancedMultiStepForm 
            type="long-stay" 
            preSelectedCountry="Nigeria"
            onComplete={() => setShowCalendly(true)}
          />
        </div>
      </section>

      <section className="py-8 bg-yellow-500">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-blue-800 mb-2">PAY $0 DOWN</h3>
          <p className="text-blue-800">Start your Nigeria visa application today with no upfront payment required</p>
        </div>
      </section>

      {showCalendly && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Schedule Your Consultation</h3>
            <p className="mb-4">Book a 30-minute call with our visa experts to discuss your Nigeria application and tropical medicine insurance requirements.</p>
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

export default NigeriaLongStay;
