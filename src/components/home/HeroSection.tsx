
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Sparkles, Globe, Plane, Hotel, Ship, Users, Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="pt-20 min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 right-20 w-64 md:w-96 h-64 md:h-96 bg-amber-400/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-48 md:w-80 h-48 md:h-80 bg-emerald-400/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 md:w-96 h-72 md:h-96 bg-blue-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Subtle geometric patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-32 left-32 w-4 h-4 bg-amber-400 rounded-full animate-bounce" />
        <div className="absolute top-48 right-40 w-3 h-3 bg-white rotate-45 animate-pulse" />
        <div className="absolute bottom-32 left-1/3 w-2 h-2 bg-emerald-400 rotate-45 animate-bounce" />
        <div className="absolute bottom-48 right-1/3 w-3 h-3 bg-blue-300 rounded-full animate-pulse" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="text-center">
          <div className="flex items-center justify-center mb-8">
            <Sparkles className="h-6 md:h-8 w-6 md:w-8 text-amber-400 mr-3 animate-pulse" />
            <span className="text-lg md:text-xl font-semibold text-amber-300 tracking-wide">AI-Powered Travel Planning</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            <span className="block text-white">Your Free AI</span>
            <span className="block bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
              Travel Agent
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl lg:text-3xl mb-12 text-slate-200 max-w-4xl mx-auto leading-relaxed font-light">
            Plan trips, simplify visas, and customize your AI for global adventures. 
            Sign up free and get visa help from just $15 with our 98% success rate.
          </p>

          {/* Travel Services Icons */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 md:px-6 py-3 md:py-4 rounded-full border border-white/20 hover:bg-white/15 transition-all">
              <Plane className="h-5 md:h-6 w-5 md:w-6 text-amber-400" />
              <span className="font-medium text-sm md:text-base">Flights</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 md:px-6 py-3 md:py-4 rounded-full border border-white/20 hover:bg-white/15 transition-all">
              <Hotel className="h-5 md:h-6 w-5 md:w-6 text-emerald-400" />
              <span className="font-medium text-sm md:text-base">Hotels</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 md:px-6 py-3 md:py-4 rounded-full border border-white/20 hover:bg-white/15 transition-all">
              <Ship className="h-5 md:h-6 w-5 md:w-6 text-blue-400" />
              <span className="font-medium text-sm md:text-base">Cruises</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 md:px-6 py-3 md:py-4 rounded-full border border-white/20 hover:bg-white/15 transition-all">
              <Users className="h-5 md:h-6 w-5 md:w-6 text-purple-400" />
              <span className="font-medium text-sm md:text-base">Group Tours</span>
            </div>
          </div>

          {/* Enhanced CTA section */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-scale-in" style={{ animationDelay: '0.5s' }}>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-xl px-12 py-6 rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 border-0"
              asChild
            >
              <Link to="/ai-agent-auth">
                <Sparkles className="h-6 w-6 mr-3" />
                Sign Up Free
                <ArrowRight className="h-6 w-6 ml-3" />
              </Link>
            </Button>

            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white/50 text-white hover:bg-white/10 hover:border-white font-bold text-xl px-12 py-6 rounded-xl shadow-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105"
              asChild
            >
              <Link to="/pricing">
                <Play className="h-6 w-6 mr-3" />
                View Plans
              </Link>
            </Button>
          </div>

          {/* Enhanced stats section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto animate-slide-up" style={{ animationDelay: '0.7s' }}>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105 border border-white/20">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full">
                  <Users className="h-6 md:h-8 w-6 md:w-8 text-white" />
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">10K+</div>
              <div className="text-sm md:text-base text-slate-300">Happy Travelers</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105 border border-white/20">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full">
                  <Globe className="h-6 md:h-8 w-6 md:w-8 text-white" />
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">180+</div>
              <div className="text-sm md:text-base text-slate-300">Countries</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105 border border-white/20">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full">
                  <Ship className="h-6 md:h-8 w-6 md:w-8 text-white" />
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">98%</div>
              <div className="text-sm md:text-base text-slate-300">Visa Success</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105 border border-white/20">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full">
                  <MapPin className="h-6 md:h-8 w-6 md:w-8 text-white" />
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-sm md:text-base text-slate-300">Support</div>
            </div>
          </div>

          {/* Trust indicator */}
          <div className="mt-16 animate-fade-in" style={{ animationDelay: '0.9s' }}>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto border border-white/10">
              <p className="text-lg md:text-xl text-slate-200 mb-4 italic">
                "From our Mediterranean cruise to the African safari, every detail was perfect. 
                Their team handled everything—flights, visas, accommodations. Pure luxury!"
              </p>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  S
                </div>
                <div className="text-left">
                  <div className="font-semibold text-white">Sarah & Michael Chen</div>
                  <div className="text-sm text-slate-300">Luxury World Tour, 2024</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
