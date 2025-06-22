
import { useEffect, useState } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import MultiStepForm from '@/components/visa/MultiStepForm';
import CountryTile from '@/components/visa/CountryTile';
import TrustBadges from '@/components/visa/TrustBadges';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const ShortStayVisas = () => {
  const [searchParams] = useSearchParams();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const location = useLocation();
  const preSelectedCountry = searchParams.get('country');

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
    { name: 'Schengen Area', image: '/lovable-uploads/143774ee-f153-4307-a278-d6ccd66f7385.png' },
    { name: 'United Kingdom', image: '/lovable-uploads/44149117-d839-409c-9984-58ab8271cacf.png' },
    { name: 'Canada', image: '/lovable-uploads/be2a8c66-48a9-4a0d-be71-08376760b905.png' },
    { name: 'Brazil', image: '/lovable-uploads/c1698ac0-2579-49f9-9f36-e184b2b21206.png' },
    { name: 'Nigeria e-Visa', image: '/lovable-uploads/143774ee-f153-4307-a278-d6ccd66f7385.png' },
    { name: 'India', image: '/lovable-uploads/44149117-d839-409c-9984-58ab8271cacf.png' },
    { name: 'UAE (Dubai)', image: '/lovable-uploads/be2a8c66-48a9-4a0d-be71-08376760b905.png' }
  ];

  const scrollToForm = () => {
    const element = document.getElementById('visa-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormComplete = () => {
    setShowBookingModal(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Short-Stay Visas Made Simple</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Tourism, business, or a quick visit—get approved fast with our expert guidance and guaranteed support.
          </p>
          <Button 
            onClick={scrollToForm}
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-blue-900 font-bold text-lg px-8 py-3"
          >
            Start My Application
          </Button>
        </div>
      </section>

      <TrustBadges />

      {/* Country Tiles */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Popular Short-Stay Destinations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {countries.map((country) => (
              <CountryTile
                key={country.name}
                name={country.name}
                image={country.image}
                type="short-stay"
              />
            ))}
          </div>
        </div>
      </section>

      <section id="visa-form" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Start Your Application
          </h2>
          <MultiStepForm 
            type="short-stay" 
            preSelectedCountry={preSelectedCountry || undefined}
            onComplete={handleFormComplete}
          />
        </div>
      </section>

      <section className="py-8 bg-yellow-500">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-blue-900 mb-2">PAY $0 DOWN</h3>
          <p className="text-blue-900">Start your visa application today with no upfront payment required</p>
        </div>
      </section>

      {/* Simple Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
            <button 
              onClick={() => setShowBookingModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2 text-blue-900">🎉 Application Started!</h3>
              <p className="text-gray-600 mb-4">
                Excellent! Now let's schedule your <strong>FREE consultation</strong> to discuss your visa application.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>What's Next:</strong> Our visa experts will review your information and provide personalized guidance during your consultation.
                </p>
              </div>
              
              <Button
                onClick={() => window.open('https://calendly.com/camronm-oneglobaltrip/30min', '_blank')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold mb-4"
              >
                Book My FREE Consultation
              </Button>
              
              <p className="text-xs text-gray-500 text-center">
                Or you can close this and we'll contact you within 24 hours
              </p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ShortStayVisas;
