import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Bot, Shield, Sparkles } from 'lucide-react';
import { BOOKING_PLANS } from '@/data/bookingPlans';
import { Badge } from '@/components/ui/badge';

interface VisaPricingCardsProps {
  visaType?: string;
}

const VisaPricingCards = ({ visaType }: VisaPricingCardsProps) => {
  const navigate = useNavigate();

  const handlePlanSelect = (planId: string) => {
    if (planId === 'free_ai_agent') {
      navigate('/auth');
    } else if (planId === 'visa_assist') {
      navigate('/visas/short-stay');
    } else {
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

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50/50 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-purple-50/30"></div>
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Choose Your Visa Service Package
          </h2>
          <p className="text-xl text-gray-600">
            From free AI assistance to full visa support - we've got you covered
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {BOOKING_PLANS.map((plan, index) => (
            <Card 
              key={plan.id} 
              className={`relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white/90 backdrop-blur-sm hover:scale-105 ${
                plan.popular ? 'ring-2 ring-purple-500 scale-105' : ''
              }`}
              onClick={() => handlePlanSelect(plan.id)}
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
                    {plan.id === 'global_explorer' && <span className="text-lg font-normal text-gray-500">/year</span>}
                    {plan.id === 'visa_assist' && <span className="text-lg font-normal text-gray-500"> per visa</span>}
                  </div>
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
                  {plan.id === 'free_ai_agent' ? 'Start Free' : 
                   plan.id === 'visa_assist' ? 'Get Visa Help' :
                   'Go Premium'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisaPricingCards;