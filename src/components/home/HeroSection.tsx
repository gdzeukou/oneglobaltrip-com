
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="pt-20 min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden flex items-center">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-blue-900/90 to-indigo-900/95" />
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="w-full h-full animate-pulse"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 194, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 194, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }}
          />
        </div>
        
        {/* Floating tech elements */}
        <div className="absolute top-20 right-10 w-4 h-4 bg-tech-cyan-400 rounded-full animate-pulse opacity-60" />
        <div className="absolute bottom-32 left-10 w-3 h-3 bg-neon-accent rounded-full animate-pulse opacity-50" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-20 w-2 h-2 bg-tech-blue-400 rounded-full animate-pulse opacity-40" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          {/* Enhanced main heading */}
          <div className="mb-8">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 text-tech-cyan-400 mr-3 animate-pulse" />
              <span className="text-tech-cyan-300 font-space-grotesk font-medium text-lg tracking-wide">
                PREMIUM TRAVEL CONCIERGE
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-space-grotesk font-bold mb-8 leading-tight">
              <span className="block text-white">Your Dream</span>
              <span className="block text-transparent bg-gradient-to-r from-tech-cyan-400 via-tech-blue-400 to-purple-400 bg-clip-text mt-2 animate-shimmer">
                Journey Awaits
              </span>
            </h1>
          </div>
          
          <p className="text-xl md:text-3xl mb-12 text-white/90 max-w-5xl mx-auto leading-relaxed font-light">
            From luxury cruises to cultural tours, we craft complete travel experiences. 
            Flights, hotels, visas, and unforgettable adventures—
            <span className="text-tech-cyan-300 font-semibold"> all expertly planned for you</span>.
          </p>

          {/* Enhanced CTA section */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button 
              size="lg"
              variant="default"
              className="font-bold text-xl px-12 py-6 group relative overflow-hidden"
              asChild
            >
              <Link to="/get-started">
                <Sparkles className="h-6 w-6 mr-3 group-hover:animate-spin" />
                Start Planning
                <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </Button>

            <Button 
              size="lg"
              variant="glass"
              className="font-bold text-xl px-12 py-6 group"
              asChild
            >
              <Link to="/packages">
                <Play className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform duration-200" />
                Free Consultation
              </Link>
            </Button>
          </div>

          {/* Enhanced stats section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { number: "150+", label: "Destinations", delay: "0s" },
              { number: "25K+", label: "Happy Travelers", delay: "0.1s" },
              { number: "500+", label: "Cruise Options", delay: "0.2s" },
              { number: "24/7", label: "Concierge Support", delay: "0.3s" }
            ].map((stat, index) => (
              <div 
                key={index}
                className="glass-effect rounded-card p-8 text-center group hover:scale-105 transition-all duration-300 ease-tech hover:shadow-glass border border-white/20"
                style={{ animationDelay: stat.delay }}
              >
                <div className="text-4xl font-space-grotesk font-bold text-white mb-2 group-hover:text-tech-cyan-300 transition-colors duration-200">
                  {stat.number}
                </div>
                <div className="text-base text-white/70 group-hover:text-white/90 transition-colors duration-200">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced testimonial */}
          <div className="mt-20">
            <div className="glass-effect rounded-card p-8 max-w-4xl mx-auto border border-white/20 group hover:shadow-glass transition-all duration-300 ease-tech">
              <blockquote className="text-lg md:text-xl text-white/95 mb-6 italic leading-relaxed">
                "From our Mediterranean cruise to the African safari, every detail was perfect. 
                Their team handled everything—flights, visas, accommodations. Pure luxury!"
              </blockquote>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-tech-cyan-400 to-tech-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-elevation-2 group-hover:shadow-elevation-3 group-hover:scale-110 transition-all duration-200">
                  S
                </div>
                <div className="text-center">
                  <div className="font-semibold text-white font-space-grotesk">Sarah & Michael Chen</div>
                  <div className="text-sm text-tech-cyan-300">Luxury World Tour • 2024</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-tech-cyan-400 rounded-full animate-ping opacity-40" />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-neon-accent rounded-full animate-ping opacity-30" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-tech-blue-400 rounded-full animate-ping opacity-35" style={{ animationDelay: '0.5s' }} />
      </div>
    </section>
  );
};

export default HeroSection;
