
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

const IndiaShortStay = () => {
  const [showCalendly, setShowCalendly] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const cities = [
    {
      name: 'New Delhi',
      image: '/lovable-uploads/143774ee-f153-4307-a278-d6ccd66f7385.png',
      description: 'India\'s capital blending ancient heritage with modern governance, featuring Mughal architecture',
      highlights: ['Red Fort', 'India Gate', 'Lotus Temple', 'Humayun\'s Tomb']
    },
    {
      name: 'Mumbai',
      image: '/lovable-uploads/44149117-d839-409c-9984-58ab8271cacf.png',
      description: 'Bollywood capital and financial hub with colonial architecture and vibrant street life',
      highlights: ['Gateway of India', 'Marine Drive', 'Bollywood Studios', 'Elephanta Caves']
    },
    {
      name: 'Jaipur',
      image: '/lovable-uploads/be2a8c66-48a9-4a0d-be71-08376760b905.png',
      description: 'The Pink City showcasing royal Rajasthani culture, palaces, and traditional crafts',
      highlights: ['Amber Fort', 'City Palace', 'Hawa Mahal', 'Jantar Mantar']
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
      
      <section className="pt-24 pb-16 bg-gradient-to-r from-orange-600 to-orange-800 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">India Tourist e-Visa</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Journey through incredible India with its ancient temples, vibrant festivals, and diverse cultures. From the Taj Mahal to Kerala backwaters, India offers spiritual and sensory adventures.
          </p>
          <Button 
            onClick={scrollToForm}
            className="bg-white hover:bg-gray-100 text-orange-800 font-bold text-lg px-8 py-3"
          >
            Start India e-Visa Application
          </Button>
        </div>
      </section>

      <TrustBadges />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Discover India's Incredible Cities
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

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            India e-Visa Requirements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6">
              <FileText className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Valid Passport</h3>
              <p className="text-sm text-gray-600">Must be valid for at least 6 months</p>
            </Card>
            <Card className="text-center p-6">
              <Clock className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Processing Time</h3>
              <p className="text-sm text-gray-600">72 hours to 4 days</p>
            </Card>
            <Card className="text-center p-6">
              <Users className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Stay Duration</h3>
              <p className="text-sm text-gray-600">Up to 90 days</p>
            </Card>
            <Card className="text-center p-6">
              <MapPin className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Entry Type</h3>
              <p className="text-sm text-gray-600">Double entry allowed</p>
            </Card>
          </div>
        </div>
      </section>

      <section id="visa-form" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Start Your India e-Visa Application
          </h2>
          <EnhancedMultiStepForm 
            type="short-stay" 
            preSelectedCountry="India"
            onComplete={() => setShowCalendly(true)}
          />
        </div>
      </section>

      <section className="py-8 bg-yellow-500">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-orange-800 mb-2">PAY $0 DOWN</h3>
          <p className="text-orange-800">Start your India e-visa application today with no upfront payment required</p>
        </div>
      </section>

      {showCalendly && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Schedule Your Consultation</h3>
            <p className="mb-4">Book a 30-minute call with our visa experts to discuss your India application.</p>
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

export default IndiaShortStay;
