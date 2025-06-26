
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
          <Card className="bg-white/95 backdrop-blur-md border-0 shadow-2xl rounded-3xl overflow-hidden hover:shadow-3xl transition-all duration-500 group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-transparent to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
            
            <CardContent className="relative z-10 p-12 text-center">
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300">
                  Ready to Apply for Your Visa?
                </h3>
                <p className="text-lg text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  Get started with our intelligent visa wizard or speak directly with our experts
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Link to="/get-started">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    Start Visa Application
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
                
                <Button size="lg" variant="outline" className="border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105">
                  <Users className="w-5 h-5 mr-2" />
                  Speak with Expert
                </Button>
              </div>

              <div className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                ⭐ Trusted by 50,000+ travelers worldwide
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden hover:bg-white/15 hover:border-white/30 transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="bg-white/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-gray-100 transition-colors duration-300">
                  {benefit.title}
                </h4>
                <p className="text-white/80 text-sm group-hover:text-white/90 transition-colors duration-300">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Success metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
          <div className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="text-3xl font-bold text-white mb-2">100%</div>
            <div className="text-sm text-white/70">Success Rate</div>
          </div>
          
          <div className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="text-3xl font-bold text-white mb-2">50K+</div>
            <div className="text-sm text-white/70">Visas Processed</div>
          </div>
          
          <div className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="text-3xl font-bold text-white mb-2">180+</div>
            <div className="text-sm text-white/70">Countries</div>
          </div>
          
          <div className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="text-3xl font-bold text-white mb-2">24/7</div>
            <div className="text-sm text-white/70">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainCTASection;
