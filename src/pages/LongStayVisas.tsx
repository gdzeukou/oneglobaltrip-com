
import { useEffect, useState } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import MultiStepForm from '@/components/visa/MultiStepForm';
import CountryTile from '@/components/visa/CountryTile';
import TrustBadges from '@/components/visa/TrustBadges';
import { Button } from '@/components/ui/button';
import CalendlyWidget from '@/components/CalendlyWidget';

const LongStayVisas = () => {
  const [searchParams] = useSearchParams();
  const [showCalendly, setShowCalendly] = useState(false);
  const location = useLocation();
  const preSelectedCountry = searchParams.get('country');

  // Scroll to top on page navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (preSelectedCountry) {
      const element = document.getElementById('visa-form');
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [preSelectedCountry]);

  const countries = [
    { name: 'Portugal', image: '/lovable-uploads/143774ee-f153-4307-a278-d6ccd66f7385.png' },
    { name: 'Norway', image: '/lovable-uploads/44149117-d839-409c-9984-58ab8271cacf.png' },
    { name: 'Denmark', image: '/lovable-uploads/be2a8c66-48a9-4a0d-be71-08376760b905.png' },
    { name: 'Finland', image: '/lovable-uploads/c1698ac0-2579-49f9-9f36-e184b2b21206.png' },
    { name: 'Nigeria', image: '/lovable-uploads/143774ee-f153-4307-a278-d6ccd66f7385.png' },
    { name: 'France', image: '/lovable-uploads/44149117-d839-409c-9984-58ab8271cacf.png' },
    { name: 'Germany', image: '/lovable-uploads/be2a8c66-48a9-4a0d-be71-08376760b905.png' },
    { name: 'Switzerland', image: '/lovable-uploads/c1698ac0-2579-49f9-9f36-e184b2b21206.png' }
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
      <section className="pt-24 pb-16 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Long-Stay & Residency Visas Without the Guesswork</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Work, study, retire, or live abroad—One Global Trip has you covered with expert guidance every step of the way.
          </p>
          <Button 
            onClick={scrollToForm}
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-blue-900 font-bold text-lg px-8 py-3"
          >
            Get Residency Help
          </Button>
        </div>
      </section>

      <TrustBadges />

      {/* Country Tiles */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Popular Long-Stay Destinations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {countries.map((country) => (
              <CountryTile
                key={country.name}
                name={country.name}
                image={country.image}
                type="long-stay"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Multi-Step Form */}
      <section id="visa-form" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Start Your Application
          </h2>
          <MultiStepForm 
            type="long-stay" 
            preSelectedCountry={preSelectedCountry || undefined}
            onComplete={() => setShowCalendly(true)}
          />
        </div>
      </section>

      {/* Pay $0 Down Banner */}
      <section className="py-8 bg-yellow-500">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-blue-900 mb-2">PAY $0 DOWN</h3>
          <p className="text-blue-900">Start your visa application today with no upfront payment required</p>
        </div>
      </section>

      {/* Calendly Modal */}
      {showCalendly && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Schedule Your Consultation</h3>
            <p className="mb-4">Book a 30-minute call with our visa experts to discuss your application.</p>
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

export default LongStayVisas;
