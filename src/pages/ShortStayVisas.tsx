
import { useEffect, useState } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import MultiStepForm from '@/components/visa/MultiStepForm';
import CountryTile from '@/components/visa/CountryTile';
import TrustBadges from '@/components/visa/TrustBadges';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import OptimizedImage from '@/components/ui/optimized-image';
import { getCountryImage } from '@/utils/countryImages';

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
    { name: 'Schengen Area', image: getCountryImage('Schengen Area') },
    { name: 'United Kingdom', image: getCountryImage('United Kingdom') },
    { name: 'Canada', image: getCountryImage('Canada') },
    { name: 'Brazil', image: getCountryImage('Brazil') },
    { name: 'Nigeria e-Visa', image: getCountryImage('Nigeria e-Visa') },
    { name: 'India', image: getCountryImage('India') },
    { name: 'UAE (Dubai)', image: getCountryImage('UAE (Dubai)') }
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
      
      {/* Meta tags for Agentive context */}
      <meta data-agentive-context="visa" />
      <meta data-agentive-context-json='{"page":"short-stay-visas","visa_type":"short-stay","services":["tourist_visa","business_visa","document_assistance"]}' />
      
      {/* Hero Section with Background Image */}
      <section className="pt-24 pb-16 relative bg-gradient-to-r from-deep-blue-900 to-deep-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <OptimizedImage
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=1080&fit=crop&crop=center"
            alt="Global travel destinations for short-stay visas"
            className="w-full h-full"
            overlay
            overlayColor="bg-deep-blue-900/60"
            priority
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 hero-text animate-fade-in">Short-Stay Visas Made Simple</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto animate-slide-up">
            Tourism, business, or a quick visit—get approved fast with our expert guidance and guaranteed support.
          </p>
          <Button 
            onClick={scrollToForm}
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-deep-blue-900 font-bold text-lg px-8 py-3 hover-lift pulse-glow animate-scale-in"
          >
            Start My Application
          </Button>
        </div>
      </section>

      <TrustBadges />

      {/* Country Tiles */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 animate-fade-in">
            Popular Short-Stay Destinations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {countries.map((country, index) => (
              <div key={country.name} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CountryTile
                  name={country.name}
                  image={country.image}
                  type="short-stay"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="visa-form" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 animate-fade-in">
            Start Your Application
          </h2>
          <div className="animate-slide-up">
            <MultiStepForm 
              type="short-stay" 
              preSelectedCountry={preSelectedCountry || undefined}
              onComplete={handleFormComplete}
            />
          </div>
        </div>
      </section>

      <section className="py-8 bg-yellow-500">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-deep-blue-900 mb-2">PAY $0 DOWN</h3>
          <p className="text-deep-blue-900">Start your visa application today with no upfront payment required</p>
        </div>
      </section>

      {/* Simple Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full relative animate-scale-in">
            <button 
              onClick={() => setShowBookingModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 hover-lift"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2 text-deep-blue-900">🎉 Application Started!</h3>
              <p className="text-gray-600 mb-4">
                Excellent! Now let's schedule your <strong>FREE consultation</strong> to discuss your visa application.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-deep-blue-800">
                  <strong>What's Next:</strong> Our visa experts will review your information and provide personalized guidance during your consultation.
                </p>
              </div>
              
              <Button
                onClick={() => window.open('https://calendly.com/camronm-oneglobaltrip/30min', '_blank')}
                className="w-full bg-deep-blue-800 hover:bg-deep-blue-900 text-white font-semibold mb-4 hover-lift"
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
