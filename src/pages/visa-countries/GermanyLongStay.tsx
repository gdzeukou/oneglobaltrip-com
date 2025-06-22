import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import UnifiedTravelForm from '@/components/forms/UnifiedTravelForm';
import TrustBadges from '@/components/visa/TrustBadges';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Heart, AlertTriangle, FileText, Clock, Euro } from 'lucide-react';

const GermanyLongStay = () => {
  const [showCalendly, setShowCalendly] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const cities = [
    {
      name: 'Berlin',
      image: '/lovable-uploads/143774ee-f153-4307-a278-d6ccd66f7385.png',
      description: 'Capital famous for currywurst, world-class museums, and historic Brandenburg Gate',
      highlights: ['Currywurst', 'Museum Island', 'Brandenburg Gate', 'Berlin Wall Memorial']
    },
    {
      name: 'Munich',
      image: '/lovable-uploads/44149117-d839-409c-9984-58ab8271cacf.png',
      description: 'Bavarian hub renowned for Oktoberfest, traditional beer gardens, and stunning architecture',
      highlights: ['Oktoberfest', 'Beer Gardens', 'Neuschwanstein Castle', 'Marienplatz']
    },
    {
      name: 'Hamburg',
      image: '/lovable-uploads/be2a8c66-48a9-4a0d-be71-08376760b905.png',
      description: 'Port city known for fresh fish markets, Reeperbahn nightlife, and maritime heritage',
      highlights: ['Fish Market', 'Reeperbahn', 'Speicherstadt', 'Elbphilharmonie']
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
      
      <section className="pt-24 pb-16 bg-gradient-to-r from-black to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Germany Long-Stay Visa</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Experience German precision with comprehensive medical insurance compliance. Navigate Germany's world-class healthcare system with expert guidance.
          </p>
          <Button 
            onClick={scrollToForm}
            className="bg-white hover:bg-gray-100 text-black font-bold text-lg px-8 py-3"
          >
            Start Germany Application
          </Button>
        </div>
      </section>

      <TrustBadges />

      <section className="py-12 bg-red-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-900">
            🚨 Critical: €30,000+ German Insurance Required
          </h2>
          <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-6 max-w-3xl mx-auto">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-red-800 mb-1">€30,000+ Coverage Mandatory</h3>
                <p className="text-red-700 text-sm">
                  Germany requires insurance meeting Krankenversicherung standards. 
                  Must be compatible with German statutory or private health insurance.
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            <Card className="border hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Shield className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Krankenversicherung</h3>
                    <p className="text-red-600 font-semibold text-sm mb-1">German insurance system</p>
                    <p className="text-gray-600 text-xs">Compatible with GKV or approved PKV</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Euro className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Comprehensive Benefits</h3>
                    <p className="text-red-600 font-semibold text-sm mb-1">Full spectrum coverage</p>
                    <p className="text-gray-600 text-xs">Emergency, specialist, preventive, and dental care</p>
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
            Cultural Heritage of German Cities
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
                      <span key={highlight} className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm">
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
            Germany Visa Requirements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6">
              <FileText className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Valid Passport</h3>
              <p className="text-sm text-gray-600">Must be valid for intended stay duration</p>
            </Card>
            <Card className="text-center p-6">
              <Shield className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">German Insurance</h3>
              <p className="text-sm text-gray-600">€30,000+ German-standard</p>
            </Card>
            <Card className="text-center p-6">
              <Clock className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Processing Time</h3>
              <p className="text-sm text-gray-600">60-120 days average</p>
            </Card>
            <Card className="text-center p-6">
              <Euro className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Financial Proof</h3>
              <p className="text-sm text-gray-600">Blocked account or income proof</p>
            </Card>
          </div>
        </div>
      </section>

      <section id="visa-form" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Start Your Germany Application
          </h2>
          <UnifiedTravelForm 
            type="visa-application" 
            title="Germany Long-Stay Visa Application"
            onComplete={() => setShowCalendly(true)}
          />
        </div>
      </section>

      <section className="py-8 bg-yellow-500">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-blue-800 mb-2">PAY $0 DOWN</h3>
          <p className="text-blue-800">Start your Germany visa application today with no upfront payment required</p>
        </div>
      </section>

      {showCalendly && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Schedule Your Consultation</h3>
            <p className="mb-4">Book a 30-minute call with our visa experts to discuss your Germany application and German healthcare insurance requirements.</p>
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

export default GermanyLongStay;
