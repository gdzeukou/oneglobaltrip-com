
import { useEffect, useState } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import MultiStepForm from '@/components/visa/MultiStepForm';
import TrustBadges from '@/components/visa/TrustBadges';
import { Button } from '@/components/ui/button';
import { MapPin, Sparkles } from 'lucide-react';

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
    { 
      name: 'Portugal', 
      image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&h=600&fit=crop&crop=center',
      description: 'D7 Visa, Golden Visa, Digital Nomad'
    },
    { 
      name: 'Norway', 
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center',
      description: 'Work permits, Family reunification'
    },
    { 
      name: 'Denmark', 
      image: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=800&h=600&fit=crop&crop=center',
      description: 'Green Card, Work & Residence permits'
    },
    { 
      name: 'Finland', 
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center',
      description: 'Residence permits, EU Blue Card'
    },
    { 
      name: 'Nigeria', 
      image: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=800&h=600&fit=crop&crop=center',
      description: 'Work permits, Business visas'
    },
    { 
      name: 'France', 
      image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop&crop=center',
      description: 'Long-stay visas, Talent Passport'
    },
    { 
      name: 'Germany', 
      image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&h=600&fit=crop&crop=center',
      description: 'EU Blue Card, Job Seeker visa'
    },
    { 
      name: 'Switzerland', 
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center',
      description: 'Work permits, L & B permits'
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
      
      {/* Meta tags for Agentive context */}
      <meta data-agentive-context="visa" />
      <meta data-agentive-context-json='{"page":"long-stay-visas","visa_type":"long-stay","services":["residency_visa","work_visa","study_visa","retirement_visa"]}' />
      
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
            <span className="text-lg font-medium text-yellow-400">Long-Stay Solutions</span>
          </div>
          <h1 className="text-5xl font-bold mb-6 hero-text animate-fade-in">Long-Stay & Residency Visas Without the Guesswork</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto animate-slide-up">
            Work, study, retire, or live abroad—One Global Trip has you covered with expert guidance every step of the way.
          </p>
          <Button 
            onClick={scrollToForm}
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-deep-blue-900 font-bold text-lg px-8 py-3 hover-lift pulse-glow animate-scale-in"
          >
            Get Residency Help
          </Button>
        </div>
      </section>

      <TrustBadges />

      {/* Country Tiles */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 animate-fade-in">
            Popular Long-Stay Destinations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {countries.map((country, index) => (
              <div key={country.name} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover-lift cursor-pointer group border border-gray-200">
                  <div className="relative h-48">
                    <img 
                      src={country.image} 
                      alt={`${country.name} visa`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="flex items-center mb-2">
                        <MapPin className="h-5 w-5 mr-2" />
                        <h3 className="text-xl font-bold">{country.name}</h3>
                      </div>
                      <p className="text-sm text-gray-200">{country.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Multi-Step Form */}
      <section id="visa-form" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 animate-fade-in">
            Start Your Application
          </h2>
          <div className="animate-slide-up">
            <MultiStepForm 
              type="long-stay" 
              preSelectedCountry={preSelectedCountry || undefined}
              onComplete={() => setShowCalendly(true)}
            />
          </div>
        </div>
      </section>

      {/* Pay $0 Down Banner */}
      <section className="py-8 bg-yellow-500">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-deep-blue-900 mb-2">PAY $0 DOWN</h3>
          <p className="text-deep-blue-900">Start your visa application today with no upfront payment required</p>
        </div>
      </section>

      {/* Calendly Modal */}
      {showCalendly && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full animate-scale-in">
            <h3 className="text-xl font-bold mb-4">Schedule Your Consultation</h3>
            <p className="mb-4">Book a 30-minute call with our visa experts to discuss your application.</p>
            <Button
              onClick={() => window.open('https://calendly.com/camronm-oneglobaltrip/30min', '_blank')}
              className="w-full bg-deep-blue-800 hover:bg-deep-blue-900 text-white font-semibold mb-4 hover-lift"
            >
              Book Consultation
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowCalendly(false)}
              className="w-full"
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
