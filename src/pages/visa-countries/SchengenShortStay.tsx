import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import UnifiedTravelForm from '@/components/forms/UnifiedTravelForm';
import TrustBadges from '@/components/visa/TrustBadges';
import CountrySpecificPricing from '@/components/visa/CountrySpecificPricing';
import SchengenRequirements from '@/components/visa/SchengenRequirements';
import SchengenApplicationOptions from '@/components/visa/schengen/SchengenApplicationOptions';
import MayaVisaAssistant from '@/components/visa/schengen/MayaVisaAssistant';
import EnhancedSchengenForm from '@/components/visa/enhanced/EnhancedSchengenForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const SchengenShortStay = () => {
  const [showCalendly, setShowCalendly] = useState(false);
  const [selectedPurpose, setSelectedPurpose] = useState('Tourism');
  const [showMayaAssistant, setShowMayaAssistant] = useState(false);
  const [showTraditionalForm, setShowTraditionalForm] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const countries = [
    {
      name: 'France',
      image: '/lovable-uploads/143774ee-f153-4307-a278-d6ccd66f7385.png',
      description: 'Experience French culture, cuisine, and iconic landmarks like the Eiffel Tower',
      highlights: ['Eiffel Tower', 'Louvre Museum', 'French Cuisine', 'Palace of Versailles']
    },
    {
      name: 'Germany',
      image: '/lovable-uploads/44149117-d839-409c-9984-58ab8271cacf.png',
      description: 'Discover German history, Oktoberfest, and beautiful castles',
      highlights: ['Oktoberfest', 'Neuschwanstein Castle', 'Berlin Wall', 'Christmas Markets']
    },
    {
      name: 'Italy',
      image: '/lovable-uploads/be2a8c66-48a9-4a0d-be71-08376760b905.png',
      description: 'Explore ancient Rome, Renaissance art, and authentic Italian cuisine',
      highlights: ['Colosseum', 'Vatican City', 'Venice Canals', 'Italian Cuisine']
    }
  ];

  const scrollToForm = () => {
    const element = document.getElementById('visa-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMayaComplete = (formData: any) => {
    console.log('Maya application completed:', formData);
    setShowMayaAssistant(false);
    setShowCalendly(true);
  };

  const handleTraditionalSubmit = (formData: any) => {
    console.log('Traditional form submitted:', formData);
    setShowTraditionalForm(false);
    setShowCalendly(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <section className="pt-24 pb-16 relative overflow-hidden min-h-[600px]">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/lovable-uploads/099bd39c-ef31-44b8-b27d-0d5e98410d95.png')`
          }}
        />
        <div className="absolute inset-0 bg-black/10" />
      </section>

      <TrustBadges />

      {/* Enhanced Application Options for Authenticated Users */}
      {user && (
        <SchengenApplicationOptions
          onSelectMaya={() => setShowMayaAssistant(true)}
          onSelectTraditional={() => navigate('/visas/short-stay/schengen/apply')}
        />
      )}

      <CountrySpecificPricing 
        country="schengenShortStay"
        title="Schengen Short-Stay Visa Pricing"
        description="Transparent pricing with no hidden fees"
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Explore 27 European Countries
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {countries.map((country) => (
              <Card key={country.name} className="overflow-hidden hover-lift">
                <div className="relative h-48">
                  <img
                    src={country.image}
                    alt={country.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white text-xl font-bold">{country.name}</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4">{country.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {country.highlights.map((highlight) => (
                      <span key={highlight} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
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

      {/* Dynamic Requirements Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <SchengenRequirements 
            selectedCategory={selectedPurpose}
            onCategoryChange={setSelectedPurpose}
          />
        </div>
      </section>

      {/* Traditional Application Form for Non-Authenticated Users */}
      {!user && (
        <section id="visa-form" className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Start Your Schengen Visa Application
            </h2>
            <UnifiedTravelForm 
              type="visa-application" 
              title="Schengen Short-Stay Visa Application"
              onComplete={() => setShowCalendly(true)}
            />
          </div>
        </section>
      )}

      <section className="py-8 bg-yellow-500">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-blue-800 mb-2">PAY $0 DOWN</h3>
          <p className="text-blue-800">Start your Schengen visa application today with no upfront payment required</p>
        </div>
      </section>

      {/* Maya Visa Assistant Modal */}
      {showMayaAssistant && (
        <MayaVisaAssistant
          onClose={() => setShowMayaAssistant(false)}
          onComplete={handleMayaComplete}
        />
      )}

      {/* Enhanced Visa Form Modal */}
      {showTraditionalForm && (
        <EnhancedSchengenForm
          onClose={() => setShowTraditionalForm(false)}
          onSubmit={handleTraditionalSubmit}
        />
      )}

      {showCalendly && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Schedule Your Consultation</h3>
            <p className="mb-4">Book a 30-minute call with our visa experts to discuss your Schengen visa application.</p>
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

export default SchengenShortStay;
