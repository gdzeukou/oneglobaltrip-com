
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="pt-20 min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden flex items-center">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-blue-900/90 to-indigo-900/95" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          {/* Main heading */}
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            <span className="block text-white">Your Dream</span>
            <span className="block text-transparent bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text mt-2">
              Journey Awaits
            </span>
          </h1>
          
          <p className="text-xl md:text-3xl mb-12 text-white/90 max-w-5xl mx-auto leading-relaxed font-light">
            From luxury cruises to cultural tours, we craft complete travel experiences. 
            Flights, hotels, visas, and unforgettable adventures—
            <span className="text-amber-300 font-semibold"> all expertly planned for you</span>.
          </p>

          {/* CTA section */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xl px-12 py-6 rounded-xl shadow-2xl transition-all duration-300"
              asChild
            >
              <Link to="/get-started">
                Start Planning
                <ArrowRight className="h-6 w-6 ml-3" />
              </Link>
            </Button>

            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white/50 text-white hover:bg-white/10 hover:border-white font-bold text-xl px-12 py-6 rounded-xl shadow-2xl backdrop-blur-sm transition-all duration-300"
              asChild
            >
              <Link to="/packages">
                <Play className="h-6 w-6 mr-3" />
                Free Consultation
              </Link>
            </Button>
          </div>

          {/* Stats section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
              <div className="text-4xl font-bold text-white mb-2">150+</div>
              <div className="text-base text-white/70">Destinations</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
              <div className="text-4xl font-bold text-white mb-2">25K+</div>
              <div className="text-base text-white/70">Happy Travelers</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-base text-white/70">Cruise Options</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-base text-white/70">Concierge Support</div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="mt-20">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
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
