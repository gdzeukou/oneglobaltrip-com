
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

const NorwayLongStay = () => {
  const [showCalendly, setShowCalendly] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const insuranceRequirements = [
    {
      icon: Crown,
      title: 'Premium Coverage',
      detail: 'NOK 500,000+ medical coverage',
      description: 'Comprehensive health insurance with minimum NOK 500,000 coverage for all medical expenses in Norway'
    },
    {
      icon: Shield,
      title: 'Norwegian Recognition',
      detail: 'EEA/Norwegian approved only',
      description: 'Insurance must be explicitly recognized by Norwegian Immigration Service (UDI)'
    },
    {
      icon: Heart,
      title: 'Full Medical Coverage',
      detail: 'Emergency + routine care',
      description: 'Must cover emergency treatment, hospitalization, and routine medical care in Norway'
    },
    {
      icon: AlertTriangle,
      title: 'Arctic Coverage',
      detail: 'Cold weather medical needs',
      description: 'Special consideration for cold-weather related medical issues and seasonal conditions'
    }
  ];

  const cities = [
    {
      name: 'Oslo',
      image: '/lovable-uploads/143774ee-f153-4307-a278-d6ccd66f7385.png',
      description: 'Capital with world-class healthcare system and extensive insurance provider network',
      highlights: ['Oslo University Hospital', 'Private Insurance Market', 'Medical Specialists', 'Emergency Services']
    },
    {
      name: 'Bergen',
      image: '/lovable-uploads/44149117-d839-409c-9984-58ab8271cacf.png',
      description: 'Coastal city with specialized maritime medical facilities and comprehensive coverage',
      highlights: ['Haukeland Hospital', 'Coastal Healthcare', 'Insurance Brokers', 'Medical Tourism']
    },
    {
      name: 'Trondheim',
      image: '/lovable-uploads/be2a8c66-48a9-4a0d-be71-08376760b905.png',
      description: 'Historic city with university hospital and student-friendly insurance options',
      highlights: ['St. Olavs Hospital', 'Student Insurance', 'Research Medicine', 'Preventive Care']
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
      
      <section className="pt-24 pb-16 bg-gradient-to-r from-red-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Norway Long-Stay Visa</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Experience Norway's high standard of living with premium medical insurance compliance. Our experts navigate Norway's strict healthcare requirements.
          </p>
          <Button 
            onClick={scrollToForm}
            className="bg-white hover:bg-gray-100 text-red-700 font-bold text-lg px-8 py-3"
          >
            Start Norway Application
          </Button>
        </div>
      </section>

      <TrustBadges />

      <section className="py-16 bg-red-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">
            🚨 Critical: Premium Insurance Requirements
          </h2>
          <div className="bg-red-100 border-l-4 border-red-500 p-6 mb-8 max-w-4xl mx-auto">
            <div className="flex">
              <AlertTriangle className="h-6 w-6 text-red-500 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-red-800 mb-2">Mandatory Premium Coverage</h3>
                <p className="text-red-700">
                  Norway requires minimum NOK 500,000 medical insurance coverage. Given Norway's high healthcare costs, 
                  insufficient coverage will result in automatic visa rejection and potential emergency medical debt.
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {insuranceRequirements.map((req, index) => (
              <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <req.icon className="h-8 w-8 text-red-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg mb-1">{req.title}</h3>
                      <p className="text-red-600 font-semibold mb-2">{req.detail}</p>
                      <p className="text-gray-600 text-sm">{req.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Healthcare Excellence in Norwegian Cities
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
            Norway Visa Requirements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6">
              <FileText className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Valid Passport</h3>
              <p className="text-sm text-gray-600">Must be valid for duration of stay plus 3 months</p>
            </Card>
            <Card className="text-center p-6">
              <Shield className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Premium Insurance</h3>
              <p className="text-sm text-gray-600">NOK 500,000+ coverage mandatory</p>
            </Card>
            <Card className="text-center p-6">
              <Clock className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Processing Time</h3>
              <p className="text-sm text-gray-600">90-120 days average</p>
            </Card>
            <Card className="text-center p-6">
              <Crown className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Financial Proof</h3>
              <p className="text-sm text-gray-600">High financial requirements</p>
            </Card>
          </div>
        </div>
      </section>

      <section id="visa-form" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Start Your Norway Application
          </h2>
          <EnhancedMultiStepForm 
            type="long-stay" 
            preSelectedCountry="Norway"
            onComplete={() => setShowCalendly(true)}
          />
        </div>
      </section>

      <section className="py-8 bg-yellow-500">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-blue-800 mb-2">PAY $0 DOWN</h3>
          <p className="text-blue-800">Start your Norway visa application today with no upfront payment required</p>
        </div>
      </section>

      {showCalendly && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Schedule Your Consultation</h3>
            <p className="mb-4">Book a 30-minute call with our visa experts to discuss your Norway application and premium insurance requirements.</p>
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

export default NorwayLongStay;
