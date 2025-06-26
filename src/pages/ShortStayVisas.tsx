import { useEffect, useState } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import TechNavigation from '@/components/TechNavigation';
import Footer from '@/components/Footer';
import MultiStepForm from '@/components/visa/MultiStepForm';
import CountryTile from '@/components/visa/CountryTile';
import TrustBadges from '@/components/visa/TrustBadges';
import { Button } from '@/components/ui/button';
import { X, MapPin, Sparkles } from 'lucide-react';

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
    { name: 'Schengen Area', image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop&crop=center' },
    { name: 'United Kingdom', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop&crop=center' },
    { name: 'Canada', image: 'https://images.unsplash.com/photo-1503614472-8c93d56cd928?w=800&h=600&fit=crop&crop=center' },
    { name: 'Brazil', image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&h=600&fit=crop&crop=center' },
    { name: 'Nigeria e-Visa', image: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=800&h=600&fit=crop&crop=center' },
    { name: 'India', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop&crop=center' },
    { name: 'UAE (Dubai)', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop&crop=center' }
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
      <TechNavigation />
      
      {/* Meta tags for Agentive context */}
      <meta data-agentive-context="visa" />
      <meta data-agentive-context-json='{"page":"short-stay-visas","visa_type":"short-stay","services":["tourist_visa","business_visa","document_assistance"]}' />
      
      {/* Hero Section with Clean Design */}
      <section className="pt-24 pb-16 relative bg-gradient-to-r from-deep-blue-900 to-deep-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-deep-blue-900/95 via-deep-blue-800/90 to-deep-blue-900/95" />
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 right-20 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
          </div>
          {/* Professional geometric patterns */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-32 left-32 w-6 h-6 bg-yellow-400 rounded-full" />
            <div className="absolute top-48 right-40 w-4 h-4 bg-white/40 rotate-45" />
            <div className="absolute bottom-32 left-1/3 w-3 h-3 bg-yellow-400 rotate-45" />
            <div className="absolute bottom-48 right-1/3 w-5 h-5 bg-white/30 rounded-full" />
          </div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="h-8 w-8 text-yellow-500 mr-3 animate-pulse" />
            <span className="text-lg font-medium text-yellow-400">Short-Stay Solutions</span>
          </div>
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
                <div className="bg-gradient-to-br from-deep-blue-900 to-blue-700 rounded-xl h-40 flex items-center justify-center text-white relative overflow-hidden hover-lift cursor-pointer group">
                  <div className="absolute inset-0">
                    <div className="absolute top-2 right-2 w-16 h-16 bg-yellow-500/10 rounded-full blur-xl" />
                    <div className="absolute bottom-2 left-2 w-12 h-12 bg-blue-400/10 rounded-full blur-lg" />
                  </div>
                  <div className="relative z-10 text-center">
                    <MapPin className="h-8 w-8 mx-auto mb-2 text-yellow-400" />
                    <h3 className="text-lg font-bold">{country.name}</h3>
                    <p className="text-blue-200 text-sm">Short-Stay Visa</p>
                  </div>
                </div>
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
