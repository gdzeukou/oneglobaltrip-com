
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Star, ArrowRight, Clock, Shield, Zap } from 'lucide-react';
import { BOOKING_PLANS } from '@/data/bookingPlans';
import BookingModal from '@/components/booking/BookingModal';
import { BookingPlan } from '@/types/booking';
import TransparentPricingSection from '@/components/visa/TransparentPricingSection';

const Pricing = () => {
  const location = useLocation();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<BookingPlan | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handlePlanSelect = (plan: BookingPlan) => {
    setSelectedPlan(plan);
    setShowBookingModal(true);
  };

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case 'passport_club':
        return <Star className="h-8 w-8 text-emerald-600 mb-4" />;
      case 'visa_assist':
        return <Shield className="h-8 w-8 text-primary mb-4" />;
      case 'trip_bundle':
        return <Star className="h-8 w-8 text-primary mb-4" />;
      case 'ogt_elite':
        return <Zap className="h-8 w-8 text-primary mb-4" />;
      default:
        return <Shield className="h-8 w-8 text-primary mb-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary via-primary to-accent text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-[Inter]">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-white/90">
            Choose the perfect service level for your travel needs. No hidden fees, no surprises.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-white/80">
            <Clock className="h-4 w-4" />
            <span>Starting from just $129 • Instant booking available</span>
          </div>
        </div>
      </section>

      {/* Transparent Pricing Section */}
      <TransparentPricingSection />

      {/* Pricing Cards */}
      <section className="py-16 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-6">
            {BOOKING_PLANS.map((plan, index) => (
              <Card 
                key={plan.id} 
                className={`relative transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer ${
                  plan.popular 
                    ? 'border-2 border-accent shadow-lg ring-2 ring-accent/20' 
                    : 'border border-border hover:border-accent/50'
                }`}
                onClick={() => handlePlanSelect(plan)}
              >
                {(plan.popular || plan.badge) && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className={`${plan.badgeColor || 'bg-accent'} text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center shadow-lg`}>
                      <Star className="h-4 w-4 mr-1" />
                      {plan.badge || 'Most Popular'}
                    </div>
                  </div>
                )}
                
                <CardHeader className="text-center pt-8 pb-4">
                  <div className="flex justify-center">
                    {getPlanIcon(plan.id)}
                  </div>
                  <CardTitle className="text-2xl font-bold text-foreground font-[Inter]">
                    {plan.name}
                  </CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-primary">${plan.price}</span>
                    <span className="text-muted-foreground ml-2">
                      {plan.isAnnual ? 'per year' : 'per traveler'}
                    </span>
                  </div>
                  <p className="text-muted-foreground mt-4 text-sm">
                    {plan.description}
                  </p>
                  <div className="mt-2 text-xs font-medium text-accent">
                    {plan.sla}
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0 px-6">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start justify-center space-x-3 text-center">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-purple-600 rounded-full flex-shrink-0 mt-2"></div>
                          <span className="text-sm text-foreground leading-relaxed">{feature}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="text-center">
                    <Button 
                      className={`w-full font-semibold transition-all duration-300 ${
                        plan.popular 
                          ? 'bg-accent hover:bg-accent/90 text-white shadow-lg hover:shadow-xl' 
                          : 'bg-primary hover:bg-primary/90 text-white'
                      } group-hover:scale-105`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlanSelect(plan);
                      }}
                    >
                      Book Now
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Passport Club Note */}
      <section className="py-8 bg-emerald-50 border-t border-emerald-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
            <Shield className="h-8 w-8 text-emerald-600" />
          </div>
          <h3 className="text-xl font-semibold text-emerald-800 mb-2">
            Important Passport Club Note
          </h3>
          <p className="text-emerald-700 max-w-2xl mx-auto">
            <strong>Important:</strong> Consulate/VAC fees remain the responsibility of the traveler.
            The Passport Club only covers our advisory and assistance services.
          </p>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-foreground mb-4 font-[Inter]">
            Popular Add-Ons
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Enhance your experience with our premium services
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Rush Document Prep</h3>
                <p className="text-2xl font-bold text-primary mb-2">+$79</p>
                <p className="text-muted-foreground text-sm">Expedited processing</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ArrowRight className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Door-to-Door Courier</h3>
                <p className="text-2xl font-bold text-primary mb-2">+$59</p>
                <p className="text-muted-foreground text-sm">Secure pickup & delivery</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Certified Translation</h3>
                <p className="text-2xl font-bold text-primary mb-2">+$45</p>
                <p className="text-muted-foreground text-sm">Per document</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Extra Traveler</h3>
                <p className="text-2xl font-bold text-primary mb-2">+$89-$199</p>
                <p className="text-muted-foreground text-sm">Based on plan selected</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Transparency Notice */}
      <section className="py-12 bg-yellow-50 border-t border-yellow-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
            <Shield className="h-8 w-8 text-yellow-600" />
          </div>
          <h3 className="text-xl font-semibold text-yellow-800 mb-2">
            100% Transparent Pricing
          </h3>
          <p className="text-yellow-700 max-w-2xl mx-auto">
            <strong>Important:</strong> Consulate & VAC fees (≈ $85–$160 per traveller) are paid directly 
            to the embassy or VFS and are not included in our service fee. We'll provide exact amounts 
            during your booking process.
          </p>
        </div>
      </section>

      {/* Booking Modal */}
      {showBookingModal && selectedPlan && (
        <BookingModal
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          selectedPlan={selectedPlan}
        />
      )}

      <Footer />
    </div>
  );
};

export default Pricing;
