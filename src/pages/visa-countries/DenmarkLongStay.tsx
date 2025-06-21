import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import EnhancedMultiStepForm from '@/components/visa/EnhancedMultiStepForm';
import TrustBadges from '@/components/visa/TrustBadges';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Heart, AlertTriangle, FileText, Clock, Crown } from 'lucide-react';
import CalendlyWidget from '@/components/CalendlyWidget';

const DenmarkLongStay = () => {
  const [showCalendly, setShowCalendly] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const cities = [
    {
      name: 'Copenhagen',
      image: '/lovable-uploads/143774ee-f153-4307-a278-d6ccd66f7385.png',
      description: 'Capital famous for smørrebrød, hygge culture, and colorful Nyhavn waterfront',
      highlights: ['Smørrebrød', 'Hygge Culture', 'Nyhavn Harbor', 'Tivoli Gardens']
    },
    {
      name: 'Aarhus',
      image: '/lovable-uploads/44149117-d839-409c-9984-58ab8271cacf.png',
      description: 'University city known for Danish pastries, ARoS art museum, and vibrant music festivals',
      highlights: ['Danish Pastries', 'ARoS Museum', 'Aarhus Festival', 'Latin Quarter']
    },
    {
      name: 'Odense',
      image: '/lovable-uploads/be2a8c66-48a9-4a0d-be71-08376760b905.png',
      description: 'Hans Christian Andersen\'s birthplace, famous for fairy tales, fynsk cuisine, and historic charm',
      highlights: ['Fairy Tales', 'Fynsk Cuisine', 'Andersen Museum', 'Historic Center']
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
      
      <section className="pt-24 pb-16 bg-gradient-to-r from-red-700 to-white text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Denmark Long-Stay Visa</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Your complete Denmark travel solution. From visa processing to exclusive flight deals, luxury accommodations, and curated cultural experiences - we make your Danish journey effortless.
          </p>
          <Button 
            onClick={scrollToForm}
            className="bg-white hover:bg-gray-100 text-red-700 font-bold text-lg px-8 py-3"
          >
            Start Denmark Application
          </Button>
        </div>
      </section>

      <TrustBadges />

      <section className="py-12 bg-red-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-900">
            🚨 Critical: DKK 300,000+ Insurance Required
          </h2>
          <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-6 max-w-3xl mx-auto">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-red-800 mb-1">DKK 300,000+ Coverage Mandatory</h3>
                <p className="text-red-700 text-sm">
                  Denmark requires comprehensive medical insurance including mental health coverage. 
                  Danish Immigration Service strictly enforces these requirements.
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
                    <h3 className="font-bold mb-1">EU Recognition</h3>
                    <p className="text-red-600 font-semibold text-sm mb-1">EU/EEA compliant insurance</p>
                    <p className="text-gray-600 text-xs">Must meet EU standards and be valid throughout Schengen</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Heart className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Mental Health</h3>
                    <p className="text-red-600 font-semibold text-sm mb-1">Psychological care included</p>
                    <p className="text-gray-600 text-xs">Denmark requires mental health coverage</p>
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
            Cultural Delights of Danish Cities
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
            Denmark Visa Requirements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6">
              <FileText className="h-12 w-12 text-red-700 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Valid Passport</h3>
              <p className="text-sm text-gray-600">Must be valid for entire stay period</p>
            </Card>
            <Card className="text-center p-6">
              <Shield className="h-12 w-12 text-red-700 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Health Insurance</h3>
              <p className="text-sm text-gray-600">DKK 300,000+ with mental health</p>
            </Card>
            <Card className="text-center p-6">
              <Clock className="h-12 w-12 text-red-700 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Processing Time</h3>
              <p className="text-sm text-gray-600">60-90 days average</p>
            </Card>
            <Card className="text-center p-6">
              <Crown className="h-12 w-12 text-red-700 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Financial Proof</h3>
              <p className="text-sm text-gray-600">Sufficient fund requirements</p>
            </Card>
          </div>
        </div>
      </section>

      <section id="visa-form" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Start Your Denmark Application
          </h2>
          <EnhancedMultiStepForm 
            type="long-stay" 
            preSelectedCountry="Denmark"
            onComplete={() => setShowCalendly(true)}
          />
        </div>
      </section>

      <section className="py-8 bg-yellow-500">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-blue-800 mb-2">PAY $0 DOWN</h3>
          <p className="text-blue-800">Start your Denmark visa application today with no upfront payment required</p>
        </div>
      </section>

      {showCalendly && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Schedule Your Consultation</h3>
            <p className="mb-4">Book a 30-minute call with our visa experts to discuss your Denmark application and comprehensive insurance requirements.</p>
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

export default DenmarkLongStay;
