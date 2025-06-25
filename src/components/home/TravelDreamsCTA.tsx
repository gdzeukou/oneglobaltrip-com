
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Plane, Globe, Star, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const TravelDreamsCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-deep-blue-900 via-deep-blue-800 to-deep-blue-900 text-white relative overflow-hidden">
      {/* Modern background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/5 rounded-full blur-2xl" />
      </div>

      {/* Geometric patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-4 h-4 bg-yellow-400 rotate-45" />
        <div className="absolute top-40 right-32 w-6 h-6 bg-white/30 rounded-full" />
        <div className="absolute bottom-32 left-1/3 w-3 h-3 bg-yellow-400 rounded-full" />
        <div className="absolute bottom-20 right-1/4 w-5 h-5 bg-white/40 rotate-45" />
        <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-yellow-400" />
        <div className="absolute bottom-1/3 right-1/3 w-4 h-4 bg-white/20 rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center mb-6">
          <Sparkles className="h-8 w-8 text-yellow-500 mr-3 animate-pulse" />
          <span className="text-lg font-medium text-yellow-400">Premium Travel Solutions</span>
        </div>

        <h2 className="text-5xl md:text-6xl font-bold mb-6 hero-text animate-fade-in">
          Turn Your Travel Dreams Into
          <span className="block text-yellow-400 animate-float">Reality Today</span>
        </h2>

        <p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-4xl mx-auto animate-slide-up">
          Join thousands of travelers who've transformed their wanderlust into unforgettable journeys. 
          We handle the complexity, you enjoy the adventure.
        </p>

        {/* Trust indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 animate-scale-in">
          <div className="glass-modern rounded-xl p-8 hover-lift border border-white/20 shadow-xl">
            <div className="flex items-center justify-center mb-4">
              <div className="p-4 bg-yellow-500/20 rounded-full">
                <Shield className="h-8 w-8 text-yellow-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-yellow-400 mb-3">100% Success Rate</h3>
            <p className="text-blue-100">Guaranteed visa approval or full refund</p>
          </div>

          <div className="glass-modern rounded-xl p-8 hover-lift border border-white/20 shadow-xl">
            <div className="flex items-center justify-center mb-4">
              <div className="p-4 bg-yellow-500/20 rounded-full">
                <Globe className="h-8 w-8 text-yellow-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-yellow-400 mb-3">50+ Countries</h3>
            <p className="text-blue-100">Worldwide destinations at your fingertips</p>
          </div>

          <div className="glass-modern rounded-xl p-8 hover-lift border border-white/20 shadow-xl">
            <div className="flex items-center justify-center mb-4">
              <div className="p-4 bg-yellow-500/20 rounded-full">
                <Star className="h-8 w-8 text-yellow-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-yellow-400 mb-3">10,000+ Happy Travelers</h3>
            <p className="text-blue-100">Trusted by adventurers worldwide</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-deep-blue-900 font-bold text-xl px-10 py-5 hover-lift animate-pulse-glow shadow-2xl border-0 rounded-xl"
            asChild
          >
            <Link to="/get-started">
              <Plane className="h-6 w-6 mr-3" />
              Start My Journey
              <ArrowRight className="h-6 w-6 ml-3" />
            </Link>
          </Button>

          <Button 
            size="lg"
            className="bg-white/10 backdrop-blur-sm text-white border-2 border-yellow-400 hover:bg-yellow-400 hover:text-deep-blue-900 transition-all duration-300 hover-lift font-bold text-xl px-10 py-5 shadow-2xl rounded-xl"
            asChild
          >
            <Link to="/packages">
              <Globe className="h-6 w-6 mr-3" />
              Explore Packages
            </Link>
          </Button>
        </div>

        {/* Social proof */}
        <div className="text-center animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <div className="flex items-center justify-center space-x-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-blue-200 text-lg">
            <span className="font-semibold text-yellow-400">4.9/5</span> from 2,847 reviews
          </p>
        </div>
      </div>
    </section>
  );
};

export default TravelDreamsCTA;
