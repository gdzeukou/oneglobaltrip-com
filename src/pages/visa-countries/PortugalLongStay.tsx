
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import EnhancedMultiStepForm from '@/components/visa/EnhancedMultiStepForm';
import TrustBadges from '@/components/visa/TrustBadges';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Heart, AlertTriangle, FileText, Clock, Euro } from 'lucide-react';
import CalendlyWidget from '@/components/CalendlyWidget';

const PortugalLongStay = () => {
  const [showCalendly, setShowCalendly] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const insuranceRequirements = [
    {
      icon: Euro,
      title: 'Minimum Coverage',
      detail: '€30,000 medical coverage required',
      description: 'Comprehensive health insurance with minimum €30,000 coverage for medical expenses and emergency treatment'
    },
    {
      icon: Shield,
      title: 'EU Compliance',
      detail: 'EU/EEA approved insurance',
      description: 'Insurance must be recognized by Portuguese authorities and cover all EU/EEA territories'
    },
    {
      icon: Heart,
      title: 'Emergency Coverage',
      detail: 'Emergency repatriation included',
      description: 'Must include emergency medical evacuation and repatriation to home country'
    },
    {
      icon: AlertTriangle,
      title: 'Pre-existing Conditions',
      detail: 'Coverage verification required',
      description: 'Chronic conditions and pre-existing medical issues must be declared and covered'
    }
  ];

  const cities = [
    {
      name: 'Lisbon',
      image: '/lovable-uploads/143774ee-f153-4307-a278-d6ccd66f7385.png',
      description: 'Historic capital with excellent healthcare system and expat-friendly insurance providers',
      highlights: ['SNS Healthcare', 'Private Insurance Options', 'EU Health Card Accepted', 'Quality Medical Facilities']
    },
    {
      name: 'Porto',
      image: '/lovable-uploads/44149117-d839-409c-9984-58ab8271cacf.png',
      description: 'Vibrant northern city with comprehensive medical coverage and affordable healthcare',
      highlights: ['Hospital São João', 'Insurance Brokers', 'Medical Tourism', 'Specialist Care']
    },
    {
      name: 'Faro',
      image: '/lovable-uploads/be2a8c66-48a9-4a0d-be71-08376760b905.png',
      description: 'Southern gateway with retirement-focused healthcare and insurance solutions',
      highlights: ['Retirement Healthcare', 'Expat Insurance', 'Emergency Services', 'Wellness Centers']
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
      
      <section className="pt-24 pb-16 bg-gradient-to-r from-green-700 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Portugal Long-Stay Visa</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Live, work, or retire in Portugal with comprehensive medical insurance compliance. Our experts ensure your health coverage meets all Portuguese requirements.
          </p>
          <Button 
            onClick={scrollToForm}
            className="bg-white hover:bg-gray-100 text-green-700 font-bold text-lg px-8 py-3"
          >
            Start Portugal Application
          </Button>
        </div>
      </section>

      <TrustBadges />

      <section className="py-16 bg-red-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">
            🚨 Critical: Medical Insurance Requirements
          </h2>
          <div className="bg-red-100 border-l-4 border-red-500 p-6 mb-8 max-w-4xl mx-auto">
            <div className="flex">
              <AlertTriangle className="h-6 w-6 text-red-500 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-red-800 mb-2">Mandatory Insurance Compliance</h3>
                <p className="text-red-700">
                  Portugal requires ALL long-stay visa applicants to have valid medical insurance with minimum €30,000 coverage. 
                  Failure to meet these requirements will result in automatic visa rejection.
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {insuranceRequirements.map((req, index) => (
              <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <req.icon className="h-8 w-8 text-green-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg mb-1">{req.title}</h3>
                      <p className="text-green-600 font-semibold mb-2">{req.detail}</p>
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
            Healthcare-Ready Portuguese Cities
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
            Portugal Visa Requirements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6">
              <FileText className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Valid Passport</h3>
              <p className="text-sm text-gray-600">Must be valid for at least 3 months beyond stay</p>
            </Card>
            <Card className="text-center p-6">
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Health Insurance</h3>
              <p className="text-sm text-gray-600">€30,000 minimum coverage required</p>
            </Card>
            <Card className="text-center p-6">
              <Clock className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Processing Time</h3>
              <p className="text-sm text-gray-600">60-90 days average</p>
            </Card>
            <Card className="text-center p-6">
              <Euro className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Financial Proof</h3>
              <p className="text-sm text-gray-600">Sufficient funds demonstration</p>
            </Card>
          </div>
        </div>
      </section>

      <section id="visa-form" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Start Your Portugal Application
          </h2>
          <EnhancedMultiStepForm 
            type="long-stay" 
            preSelectedCountry="Portugal"
            onComplete={() => setShowCalendly(true)}
          />
        </div>
      </section>

      <section className="py-8 bg-yellow-500">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-blue-800 mb-2">PAY $0 DOWN</h3>
          <p className="text-blue-800">Start your Portugal visa application today with no upfront payment required</p>
        </div>
      </section>

      {showCalendly && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Schedule Your Consultation</h3>
            <p className="mb-4">Book a 30-minute call with our visa experts to discuss your Portugal application and insurance requirements.</p>
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

export default PortugalLongStay;
