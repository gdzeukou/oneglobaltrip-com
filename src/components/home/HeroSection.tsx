
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Sparkles, Globe, Plane } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="pt-20 min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden animate-gradient">
      {/* Enhanced colorful background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 right-20 w-64 md:w-96 h-64 md:h-96 bg-yellow-400/20 rounded-full blur-3xl animate-colorful-float" />
        <div className="absolute bottom-20 left-20 w-48 md:w-80 h-48 md:h-80 bg-green-400/20 rounded-full blur-3xl animate-colorful-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 md:w-96 h-72 md:h-96 bg-blue-400/15 rounded-full blur-2xl animate-colorful-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Colorful geometric patterns */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-32 left-32 w-6 h-6 bg-pink-400 rounded-full animate-bounce" />
        <div className="absolute top-48 right-40 w-4 h-4 bg-yellow-300 rotate-45 animate-pulse" />
        <div className="absolute bottom-32 left-1/3 w-3 h-3 bg-green-400 rotate-45 animate-bounce" />
        <div className="absolute bottom-48 right-1/3 w-5 h-5 bg-blue-300 rounded-full animate-pulse" />
        <div className="absolute top-2/3 left-1/4 w-2 h-2 bg-purple-400 animate-bounce" />
        <div className="absolute bottom-1/4 right-1/4 w-4 h-4 bg-indigo-300 rounded-full animate-pulse" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="h-6 md:h-8 w-6 md:w-8 text-yellow-400 mr-3 animate-pulse" />
            <span className="text-base md:text-lg font-medium text-yellow-300">Your Gateway to the World</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 hero-text-mobile md:hero-text animate-slide-up-fade">
            Travel Without
            <span className="block text-gradient-primary animate-colorful-float">Boundaries</span>
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl mb-8 md:mb-12 text-blue-100 max-w-4xl mx-auto animate-slide-up-fade" style={{ animationDelay: '0.2s' }}>
            We make global travel simple with guaranteed visa approvals, curated experiences, 
            and 24/7 expert support. Your dream destination is just one click away.
          </p>

          {/* Enhanced CTA section */}
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center mb-12 md:mb-16 animate-scale-bounce" style={{ animationDelay: '0.4s' }}>
            <Button 
              size="lg"
              className="btn-gradient-primary animate-rainbow-pulse hover-glow text-lg md:text-xl px-8 md:px-10 py-4 md:py-5 rounded-xl shadow-2xl"
              asChild
            >
              <Link to="/get-started">
                <Plane className="h-5 md:h-6 w-5 md:w-6 mr-3" />
                Start Planning
                <ArrowRight className="h-5 md:h-6 w-5 md:w-6 ml-3" />
              </Link>
            </Button>

            <Button 
              size="lg"
              className="glass-colorful border-2 border-white/30 text-white hover:bg-white/20 transition-all duration-300 hover-lift-colorful text-lg md:text-xl px-8 md:px-10 py-4 md:py-5 rounded-xl shadow-2xl"
              asChild
            >
              <Link to="/visas">
                <Play className="h-5 md:h-6 w-5 md:w-6 mr-3" />
                Watch Demo
              </Link>
            </Button>
          </div>

          {/* Enhanced stats section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto animate-slide-up-fade" style={{ animationDelay: '0.6s' }}>
            <div className="glass-colorful rounded-xl p-4 md:p-6 hover-lift-colorful border border-white/30 shadow-xl">
              <div className="flex items-center justify-center mb-3">
                <div className="p-2 bg-gradient-to-r from-pink-400 to-red-500 rounded-full">
                  <Globe className="h-4 md:h-6 w-4 md:w-6 text-white" />
                </div>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gradient-warm mb-1">50+</div>
              <div className="text-xs md:text-sm text-blue-200">Countries</div>
            </div>
            
            <div className="glass-colorful rounded-xl p-4 md:p-6 hover-lift-colorful border border-white/30 shadow-xl">
              <div className="flex items-center justify-center mb-3">
                <div className="p-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full">
                  <Sparkles className="h-4 md:h-6 w-4 md:w-6 text-white" />
                </div>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gradient-primary mb-1">100%</div>
              <div className="text-xs md:text-sm text-blue-200">Visa Success</div>
            </div>
            
            <div className="glass-colorful rounded-xl p-4 md:p-6 hover-lift-colorful border border-white/30 shadow-xl">
              <div className="flex items-center justify-center mb-3">
                <div className="p-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full">
                  <Plane className="h-4 md:h-6 w-4 md:w-6 text-white" />
                </div>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gradient-cool mb-1">24/7</div>
              <div className="text-xs md:text-sm text-blue-200">Support</div>
            </div>
            
            <div className="glass-colorful rounded-xl p-4 md:p-6 hover-lift-colorful border border-white/30 shadow-xl">
              <div className="flex items-center justify-center mb-3">
                <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full">
                  <ArrowRight className="h-4 md:h-6 w-4 md:w-6 text-white" />
                </div>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gradient-warm mb-1">10K+</div>
              <div className="text-xs md:text-sm text-blue-200">Happy Travelers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
