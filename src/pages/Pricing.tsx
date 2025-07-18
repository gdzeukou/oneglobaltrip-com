
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Bot, Shield, Sparkles, Star, ArrowRight } from 'lucide-react';
import { BOOKING_PLANS } from '@/data/bookingPlans';
import { BookingPlan } from '@/types/booking';
import { usePerformanceOptimization } from '@/hooks/usePerformanceOptimization';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { Badge } from '@/components/ui/badge';

const Pricing = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { trackPageView } = usePerformanceOptimization();

  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView('Pricing');
    
    // Simulate loading completion with minimal delay
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, [location.pathname, trackPageView]);

  const handlePlanSelect = (plan: BookingPlan) => {
    if (plan.id === 'free_ai_agent') {
      // Navigate to signup for free plan
      navigate('/auth');
    } else if (plan.id === 'visa_assist') {
      // Navigate to visa application form
      navigate('/visas/short-stay');
    } else {
      // Navigate to premium signup with trial
      navigate('/auth?trial=premium');
    }
  };

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case 'free_ai_agent':
        return <Bot className="h-8 w-8 text-emerald-600 mb-4" />;
      case 'visa_assist':
        return <Shield className="h-8 w-8 text-blue-600 mb-4" />;
      case 'global_explorer':
        return <Sparkles className="h-8 w-8 text-purple-600 mb-4" />;
      default:
        return <Shield className="h-8 w-8 text-primary mb-4" />;
    }
  };

  if (isLoading) {
    return <LoadingScreen message="Loading pricing options..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <Navigation />
      
      {/* Hero Section */}
      <div className="pt-24 pb-16 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-purple-50/30"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-100/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Your Passport to Worry-Free Travel
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Start free with our AI Travel Agent. Upgrade for visa assistance or go premium for unlimited travel support.
          </p>
          <div className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
            <CheckCircle className="h-4 w-4 mr-2" />
            No credit card required to start • 98% visa success rate
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-3 gap-8">
          {BOOKING_PLANS.map((plan, index) => (
            <Card 
              key={plan.id} 
              className={`relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white/90 backdrop-blur-sm hover:scale-105 ${
                plan.popular ? 'ring-2 ring-purple-500 scale-105' : ''
              }`}
              onClick={() => handlePlanSelect(plan)}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
                  <Badge className={`${plan.badgeColor} text-white px-4 py-2 text-sm font-bold shadow-lg`}>
                    {plan.badge}
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pt-8 pb-6">
                <div className="flex justify-center mb-4">
                  <div className={`p-3 rounded-full ${
                    plan.id === 'free_ai_agent' ? 'bg-emerald-100 text-emerald-600' :
                    plan.id === 'visa_assist' ? 'bg-blue-100 text-blue-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    {getPlanIcon(plan.id)}
                  </div>
                </div>
                <CardTitle className="text-xl font-bold mb-2">{plan.name}</CardTitle>
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900 mb-1">
                    {plan.price === 0 ? 'Free' : `$${plan.price}`}
                    {plan.id === 'global_explorer' && <span className="text-lg font-normal text-gray-500">/month</span>}
                    {plan.id === 'visa_assist' && <span className="text-lg font-normal text-gray-500"> per visa</span>}
                  </div>
                  {plan.originalPrice && (
                    <div className="text-sm text-gray-500 mb-2">
                      or $99/year (save $21)
                    </div>
                  )}
                  <p className="text-sm text-gray-500">{plan.sla}</p>
                </div>
              </CardHeader>
              
              <CardContent className="px-6 pb-8">
                <p className="text-gray-600 text-center mb-6 text-sm leading-relaxed">
                  {plan.description}
                </p>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                    plan.id === 'free_ai_agent'
                      ? 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white'
                      : plan.popular 
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white' 
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                  }`}
                >
                  {plan.id === 'free_ai_agent' ? 'Build My Free AI Agent' : 
                   plan.id === 'visa_assist' ? 'Get Visa Help $30' :
                   'Upgrade to Global Explorer'}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Success Rate Badge */}
      <section className="py-12 bg-blue-50 border-t border-blue-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-blue-800 mb-2">
            98% Visa Success Rate
          </h3>
          <p className="text-blue-700 max-w-2xl mx-auto">
            Our expert guidance and document verification process has helped thousands of travelers 
            secure their visas successfully. Start your journey with confidence.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
