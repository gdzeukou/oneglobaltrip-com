import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import UnifiedTravelForm from '@/components/forms/UnifiedTravelForm';
import TrustBadges from '@/components/visa/TrustBadges';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Clock, Users, FileText } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <section className="pt-24 pb-16 bg-gradient-to-r from-green-700 to-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Nigeria e-Visa</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Discover the Giant of Africa with its rich culture, bustling cities, and warm hospitality. Experience Nollywood glamour, traditional festivals, and diverse landscapes.
          </p>
          <Button 
            onClick={scrollToForm}
            className="bg-white hover:bg-gray-100 text-green-800 font-bold text-lg px-8 py-3"
          >
            Start Nigeria e-Visa Application
          </Button>
        </div>
      </section>

      <TrustBadges />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Experience Nigeria's Dynamic Cities
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
            Nigeria e-Visa Requirements
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
              <p className="text-sm text-gray-600">5-7 business days</p>
            </Card>
            <Card className="text-center p-6">
              <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Stay Duration</h3>
              <p className="text-sm text-gray-600">Up to 90 days</p>
            </Card>
            <Card className="text-center p-6">
              <MapPin className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Entry Type</h3>
              <p className="text-sm text-gray-600">Single or multiple entry</p>
            </Card>
          </div>
        </div>
      </section>

      <section id="visa-form" className="py-16">
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

      <section className="py-8 bg-yellow-500">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-green-800 mb-2">PAY $0 DOWN</h3>
          <p className="text-green-800">Start your Nigeria e-visa application today with no upfront payment required</p>
        </div>
      </section>

      {showCalendly && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Schedule Your Consultation</h3>
            <p className="mb-4">Book a 30-minute call with our visa experts to discuss your Nigeria application.</p>
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

export default NigeriaShortStay;
