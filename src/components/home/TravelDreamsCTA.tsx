
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Plane, Globe, Star, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const TravelDreamsCTA = () => {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 text-white relative overflow-hidden animate-gradient">
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center mb-6">
          <Sparkles className="h-6 md:h-8 w-6 md:w-8 text-yellow-400 mr-3 animate-pulse" />
          <span className="text-base md:text-lg font-medium text-yellow-300">Premium Travel Solutions</span>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up-fade">
          Turn Your Travel Dreams Into
          <span className="block text-gradient-reality animate-colorful-float">Reality Today</span>
        </h2>

        <p className="text-lg md:text-xl lg:text-2xl mb-8 md:mb-12 text-blue-100 max-w-4xl mx-auto animate-slide-up-fade" style={{ animationDelay: '0.2s' }}>
          Join thousands of travelers who've transformed their wanderlust into unforgettable journeys. 
          We handle the complexity, you enjoy the adventure.
        </p>

        {/* Enhanced trust indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12 animate-scale-bounce" style={{ animationDelay: '0.4s' }}>
          <div className="glass-colorful rounded-xl p-6 md:p-8 hover-lift-colorful border border-white/30 shadow-2xl">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 md:p-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full">
                <Shield className="h-6 md:h-8 w-6 md:w-8 text-white" />
              </div>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gradient-primary mb-3">100% Success Rate</h3>
            <p className="text-blue-100 text-sm md:text-base">Guaranteed visa approval or full refund</p>
          </div>

          <div className="glass-colorful rounded-xl p-6 md:p-8 hover-lift-colorful border border-white/30 shadow-2xl">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 md:p-4 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full">
                <Globe className="h-6 md:h-8 w-6 md:w-8 text-white" />
              </div>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gradient-warm mb-3">50+ Countries</h3>
            <p className="text-blue-100 text-sm md:text-base">Worldwide destinations at your fingertips</p>
          </div>

          <div className="glass-colorful rounded-xl p-6 md:p-8 hover-lift-colorful border border-white/30 shadow-2xl">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 md:p-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full">
                <Star className="h-6 md:h-8 w-6 md:w-8 text-white" />
              </div>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gradient-cool mb-3">10,000+ Happy Travelers</h3>
            <p className="text-blue-100 text-sm md:text-base">Trusted by adventurers worldwide</p>
          </div>
        </div>

        {/* Enhanced CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center mb-8 animate-slide-up-fade" style={{ animationDelay: '0.6s' }}>
          <Button 
            size="lg"
            className="btn-gradient-primary animate-rainbow-pulse hover-glow text-lg md:text-xl px-8 md:px-10 py-4 md:py-5 rounded-xl border-0 shadow-2xl"
            asChild
          >
            <Link to="/get-started">
              <Plane className="h-5 md:h-6 w-5 md:w-6 mr-3" />
              Start My Journey
              <ArrowRight className="h-5 md:h-6 w-5 md:w-6 ml-3" />
            </Link>
          </Button>

          <Button 
            size="lg"
            className="btn-gradient-secondary hover-glow text-lg md:text-xl px-8 md:px-10 py-4 md:py-5 rounded-xl shadow-2xl"
            asChild
          >
            <Link to="/packages">
              <Globe className="h-5 md:h-6 w-5 md:w-6 mr-3" />
              Explore Packages
            </Link>
          </Button>
        </div>

        {/* Enhanced social proof */}
        <div className="text-center animate-slide-up-fade" style={{ animationDelay: '0.8s' }}>
          <div className="flex items-center justify-center space-x-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 md:h-5 w-4 md:w-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-blue-200 text-base md:text-lg">
            <span className="font-semibold text-gradient-warm">4.9/5</span> from 2,847 reviews
          </p>
        </div>
      </div>
    </section>
  );
};

export default TravelDreamsCTA;
