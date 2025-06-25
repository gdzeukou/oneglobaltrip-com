
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Sparkles, Globe, Plane, Hotel, Ship, Users, Calendar, MapPin, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="pt-20 min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden flex items-center">
      {/* Sophisticated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-blue-900/90 to-indigo-900/95" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-amber-400/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-emerald-400/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
      </div>

      {/* Refined geometric patterns */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-32 left-32 w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
        <div className="absolute top-48 right-40 w-1 h-1 bg-white/60 rotate-45" />
        <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-emerald-400 rotate-45" />
        <div className="absolute bottom-48 right-1/3 w-2 h-2 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          {/* Premium service indicator */}
          <div className="flex items-center justify-center mb-10 animate-fade-in">
            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
              <Sparkles className="h-5 w-5 text-amber-400 animate-pulse" />
              <span className="text-base font-medium text-amber-300 tracking-wide">Premium Travel Concierge</span>
              <Award className="h-5 w-5 text-amber-400" />
            </div>
          </div>
          
          {/* Main heading with better hierarchy */}
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <span className="block text-white">Your Dream</span>
            <span className="block text-transparent bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text mt-2">
              Journey Awaits
            </span>
          </h1>
          
          <p className="text-xl md:text-3xl mb-12 text-white/90 max-w-5xl mx-auto leading-relaxed font-light animate-slide-up" style={{ animationDelay: '0.4s' }}>
            From luxury cruises to cultural tours, we craft complete travel experiences. 
            Flights, hotels, visas, and unforgettable adventures—
            <span className="text-amber-300 font-semibold"> all expertly planned for you</span>.
          </p>

          {/* Travel Services Icons */}
          <div className="flex flex-wrap justify-center gap-6 mb-12 animate-scale-in" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center space-x-3 bg-white/15 backdrop-blur-sm px-6 py-4 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="p-2 bg-amber-500/20 rounded-full">
                <Plane className="h-5 w-5 text-amber-300" />
              </div>
              <span className="font-medium text-white">Premium Flights</span>
            </div>
            
            <div className="flex items-center space-x-3 bg-white/15 backdrop-blur-sm px-6 py-4 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="p-2 bg-emerald-500/20 rounded-full">
                <Hotel className="h-5 w-5 text-emerald-300" />
              </div>
              <span className="font-medium text-white">Luxury Hotels</span>
            </div>
            
            <div className="flex items-center space-x-3 bg-white/15 backdrop-blur-sm px-6 py-4 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="p-2 bg-blue-500/20 rounded-full">
                <Ship className="h-5 w-5 text-blue-300" />
              </div>
              <span className="font-medium text-white">Ocean Cruises</span>
            </div>
            
            <div className="flex items-center space-x-3 bg-white/15 backdrop-blur-sm px-6 py-4 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="p-2 bg-purple-500/20 rounded-full">
                <Users className="h-5 w-5 text-purple-300" />
              </div>
              <span className="font-medium text-white">Group Tours</span>
            </div>
          </div>

          {/* Enhanced CTA section */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xl px-12 py-6 rounded-xl shadow-2xl hover:shadow-amber-500/25 transition-all duration-300 hover:scale-105 border-0"
              asChild
            >
              <Link to="/get-started">
                <Calendar className="h-6 w-6 mr-3" />
                Start Planning
                <ArrowRight className="h-6 w-6 ml-3" />
              </Link>
            </Button>

            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white/50 text-white hover:bg-white/10 hover:border-white font-bold text-xl px-12 py-6 rounded-xl shadow-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105"
              asChild
            >
              <Link to="/packages">
                <Play className="h-6 w-6 mr-3" />
                Free Consultation
              </Link>
            </Button>
          </div>

          {/* Enhanced stats section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto animate-slide-up" style={{ animationDelay: '1s' }}>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105 border border-white/20 text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full">
                  <Globe className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="text-4xl font-bold text-white mb-2">150+</div>
              <div className="text-base text-white/70">Destinations</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105 border border-white/20 text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full">
                  <Users className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="text-4xl font-bold text-white mb-2">25K+</div>
              <div className="text-base text-white/70">Happy Travelers</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105 border border-white/20 text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full">
                  <Ship className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-base text-white/70">Cruise Options</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105 border border-white/20 text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-base text-white/70">Concierge Support</div>
            </div>
          </div>

          {/* Enhanced testimonial */}
          <div className="mt-20 animate-fade-in" style={{ animationDelay: '1.2s' }}>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto border border-white/20 hover:bg-white/12 transition-all duration-300">
              <blockquote className="text-lg md:text-xl text-white/95 mb-6 italic leading-relaxed">
                "From our Mediterranean cruise to the African safari, every detail was perfect. 
                Their team handled everything—flights, visas, accommodations. Pure luxury!"
              </blockquote>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  S
                </div>
                <div className="text-center">
                  <div className="font-semibold text-white">Sarah & Michael Chen</div>
                  <div className="text-sm text-white/70">Luxury World Tour • 2024</div>
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
