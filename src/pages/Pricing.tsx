import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Building2, Globe, Shield, Users, Phone, Clock, TrendingUp, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PricingCard from '@/components/common/PricingCard';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { BOOKING_PLANS } from '@/data/bookingPlans';
import { BookingPlan } from '@/types/booking';

const Pricing = () => {
  const [isLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handlePlanSelect = (plan: BookingPlan) => {
    if (plan.contactSales) {
      // Open Calendly for enterprise sales
      window.open('https://calendly.com/oneglobaltrip/enterprise-consultation', '_blank');
      return;
    }

    if (plan.id === 'free_ai_agent') {
      navigate('/trip-planner');
    } else if (plan.id === 'visa_assist') {
      navigate('/visa-booking');
    } else if (plan.id === 'global_explorer') {
      navigate('/booking', { state: { selectedPlan: plan } });
    }
  };

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case 'free_ai_agent':
        return Globe;
      case 'visa_assist':
        return Shield;
      case 'global_explorer':
        return TrendingUp;
      case 'enterprise_global_mobility':
        return Building2;
      default:
        return Globe;
    }
  };

  const getButtonText = (plan: BookingPlan) => {
    if (plan.contactSales) return 'Contact Sales →';
    if (plan.id === 'free_ai_agent') return 'Build My Free AI Agent';
    if (plan.id === 'visa_assist') return 'Get Visa Help $69';
    return 'Upgrade to Global Explorer';
  };

  if (isLoading) {
    return <LoadingScreen message="Loading pricing plans..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section - OpenAI Style */}
      <section className="pt-32 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Enterprise Global Mobility Suite
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-4">
              All-in-one travel & visa management for global teams.
            </p>
            <p className="text-lg text-gray-500 mb-8">
              AI-powered. Human-backed. Built to move your business faster.
            </p>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12 border border-blue-100">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                When business moves globally, we move with you.
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Your teams deserve more than a booking tool. They need a partner that handles every trip, every visa, every detail — end to end. One Global Trip combines intelligent automation with human travel experts to make global mobility frictionless.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Grid - OpenAI Style */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Choose your plan
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From free AI-powered trip planning to enterprise-grade global mobility solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {BOOKING_PLANS.map((plan) => {
              const Icon = getPlanIcon(plan.id);
              const features = plan.features.map(feature => ({
                name: feature,
                included: true
              }));

              return (
                <div key={plan.id} className={plan.enterprise ? 'lg:col-span-1' : ''}>
                  <PricingCard
                    title={plan.name}
                    subtitle={plan.sla}
                    price={plan.price}
                    period={plan.sla.includes('Annual') ? '/year' : ''}
                    features={features}
                    badge={plan.badge}
                    badgeColor={plan.badgeColor}
                    popular={plan.popular}
                    enterprise={plan.enterprise}
                    contactSales={plan.contactSales}
                    customPrice={plan.customPrice}
                    onSelect={() => handlePlanSelect(plan)}
                    buttonText={getButtonText(plan)}
                    className={plan.enterprise ? 'lg:transform lg:scale-105' : ''}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enterprise Banner */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-3xl p-8 md:p-12 text-white text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Managing thousands of trips a year?
            </h3>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Our Enterprise Global Mobility Suite combines visas, travel bookings, and compliance into one seamless platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                onClick={() => window.open('https://calendly.com/oneglobaltrip/enterprise-consultation', '_blank')}
                className="bg-white text-slate-900 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
              >
                Contact Sales →
              </Button>
              <div className="flex items-center gap-2 text-gray-300">
                <Clock className="h-4 w-4" />
                <span className="text-sm">15-minute consultation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Why leading companies choose us
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See how [Client Company] cut travel admin time by 60% using One Global Trip.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 border-0 shadow-lg">
              <CardContent className="pt-6">
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h4 className="text-xl font-semibold mb-2">Fortune 500 Ready</h4>
                <p className="text-gray-600">More powerful and reliable than competitors like Navan</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg">
              <CardContent className="pt-6">
                <Award className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                <h4 className="text-xl font-semibold mb-2">98% Success Rate</h4>
                <p className="text-gray-600">Proven track record with visa applications and travel management</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg">
              <CardContent className="pt-6">
                <Phone className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h4 className="text-xl font-semibold mb-2">24/7 Support</h4>
                <p className="text-gray-600">Global reach with on-the-ground partners in 180+ countries</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to transform your global mobility?
          </h3>
          <p className="text-xl text-gray-600 mb-8">
            Let's design a global mobility solution that saves you time, money, and stress — at scale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => window.open('https://calendly.com/oneglobaltrip/enterprise-consultation', '_blank')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg"
            >
              Contact Sales →
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/trip-planner')}
              className="px-8 py-3 text-lg"
            >
              Try Free Version
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;