import { useEffect, useState } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import MultiStepForm from '@/components/visa/MultiStepForm';
import TrustBadges from '@/components/visa/TrustBadges';
import CountrySpecificPricing from '@/components/visa/CountrySpecificPricing';
import { Button } from '@/components/ui/button';
import { X, Clock, Shield, Users, CheckCircle } from 'lucide-react';
import OptimizedImage from '@/components/ui/optimized-image';

const UK5YearShortStay = () => {
  const [searchParams] = useSearchParams();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const location = useLocation();
  const preSelectedCountry = searchParams.get('country') || 'United Kingdom';

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

  const benefits = [
    'Multiple entries for 5 years',
    'Stay up to 6 months per visit',
    'Tourism and business purposes',
    'No need to reapply for 5 years',
    'Fast-track processing available',
    'Expert application support'
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative bg-gradient-to-r from-blue-900 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <OptimizedImage
            src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1920&h=1080&fit=crop&crop=center"
            alt="Big Ben and London skyline for UK visa"
            className="w-full h-full"
            overlay
            overlayColor="bg-blue-900/60"
            priority
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 hero-text animate-fade-in">
            UK Visa Pass - 5 Year
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto animate-slide-up">
            Get long-term access to the United Kingdom with our 5-year multiple entry visa. Perfect for frequent visitors, business travelers, and those with family ties.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
              <Shield className="h-5 w-5 text-yellow-500" />
              <span>5 Years Validity</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
              <Clock className="h-5 w-5 text-yellow-500" />
              <span>Multiple Entries</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
              <Users className="h-5 w-5 text-yellow-500" />
              <span>6 Months Per Visit</span>
            </div>
          </div>
          
          <Button 
            onClick={scrollToForm}
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-blue-900 font-bold text-lg px-8 py-3 hover-lift pulse-glow animate-scale-in"
          >
            Apply for UK 5-Year Visa
          </Button>
        </div>
      </section>

      <TrustBadges />

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                Why Choose the 5-Year UK Visa?
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2">Perfect For:</h3>
                <ul className="text-blue-800 space-y-1">
                  <li>• Frequent business travelers</li>
                  <li>• Visitors with family in the UK</li>
                  <li>• Long-term tourism planning</li>
                  <li>• Property owners in the UK</li>
                </ul>
              </div>
            </div>
            <div className="animate-fade-in">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1520986606214-8b456906c813?w=600&h=400&fit=crop&crop=center"
                alt="UK landmarks including Tower Bridge"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <CountrySpecificPricing 
        country="ukVisa5Year" 
        title="UK 5-Year Visa Pricing"
        description="Transparent pricing with no hidden fees"
      />

      {/* Application Form */}
      <section id="visa-form" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 animate-fade-in">
            Start Your UK 5-Year Visa Application
          </h2>
          <div className="animate-slide-up">
            <MultiStepForm 
              type="short-stay" 
              preSelectedCountry={preSelectedCountry}
              onComplete={handleFormComplete}
            />
          </div>
        </div>
      </section>

      {/* No Upfront Payment Banner */}
      <section className="py-8 bg-yellow-500">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-blue-900 mb-2">PAY $0 DOWN</h3>
          <p className="text-blue-900">Start your UK visa application today with no upfront payment required</p>
        </div>
      </section>

      {/* Booking Modal */}
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
              <h3 className="text-2xl font-bold mb-2 text-blue-900">🎉 Application Started!</h3>
              <p className="text-gray-600 mb-4">
                Excellent! Now let's schedule your <strong>FREE consultation</strong> to discuss your UK 5-year visa application.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>What's Next:</strong> Our UK visa specialists will review your information and provide personalized guidance for your long-term visa application.
                </p>
              </div>
              
              <Button
                onClick={() => window.open('https://calendly.com/camronm-oneglobaltrip/30min', '_blank')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold mb-4 hover-lift"
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

export default UK5YearShortStay;
