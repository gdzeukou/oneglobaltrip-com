
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  Shield, 
  Users,
  Star,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

const MainCTASection = () => {
  const benefits = [
    {
      icon: Shield,
      title: "100% Approval Guarantee",
      description: "We guarantee your visa approval or provide a full refund"
    },
    {
      icon: Clock,
      title: "Fast Processing",
      description: "Express services available for urgent travel needs"
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Dedicated visa specialists guide you through every step"
    }
  ];

  return (
    <section id="main-cta-section" className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-amber-400/5 to-orange-400/5 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Sparkles className="w-8 h-8 text-amber-400 animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Start Your Journey Today
            </h2>
            <Star className="w-8 h-8 text-amber-400 fill-current" />
          </div>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Join thousands of satisfied travelers who trusted us with their visa applications. 
            <span className="text-amber-300 font-semibold"> Your dream destination is just one step away.</span>
          </p>
        </div>

        {/* Main CTA Card */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="bg-white rounded-lg border border-gray-200 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Ready to Apply for Your Visa?
                </h3>
                <p className="text-lg text-gray-600">
                  Get started with our intelligent visa wizard or speak directly with our experts
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                <Link to="/get-started">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-colors duration-200">
                    Start Visa Application
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 font-medium px-8 py-3 rounded-lg transition-colors duration-200">
                  <Users className="w-5 h-5 mr-2" />
                  Speak with Expert
                </Button>
              </div>

              <div className="text-sm text-gray-500">
                ⭐ Trusted by 50,000+ travelers worldwide
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
              <CardContent className="p-6 text-center">
                <div className="bg-white/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  {benefit.title}
                </h4>
                <p className="text-white/80 text-sm">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Success metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="text-3xl font-bold text-white mb-2">100%</div>
            <div className="text-sm text-white/70">Success Rate</div>
          </div>
          
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="text-3xl font-bold text-white mb-2">50K+</div>
            <div className="text-sm text-white/70">Visas Processed</div>
          </div>
          
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="text-3xl font-bold text-white mb-2">180+</div>
            <div className="text-sm text-white/70">Countries</div>
          </div>
          
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="text-3xl font-bold text-white mb-2">24/7</div>
            <div className="text-sm text-white/70">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainCTASection;
