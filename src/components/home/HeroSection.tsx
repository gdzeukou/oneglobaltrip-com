
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Plane, Building, MapPin, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import OptimizedImage from '@/components/ui/optimized-image';

const HeroSection = () => {
  const { user } = useAuth();

  return (
    <section className="pt-20 relative min-h-screen bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 text-white overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] animate-pulse"></div>
      </div>

      {/* Background Images with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <div className="grid grid-cols-3 h-full opacity-20">
          <OptimizedImage
            src="https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=1200&fit=crop&crop=center"
            alt="European Architecture"
            className="h-full transform hover:scale-105 transition-transform duration-700"
            overlay
            overlayColor="bg-brand-900/60"
          />
          <OptimizedImage
            src="https://images.unsplash.com/photo-1539650116574-75c0c6d73a0e?w=800&h=1200&fit=crop&crop=center"
            alt="Modern Travel"
            className="h-full transform hover:scale-105 transition-transform duration-700"
            overlay
            overlayColor="bg-brand-900/60"
          />
          <OptimizedImage
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=1200&fit=crop&crop=center"
            alt="Global Destinations"
            className="h-full transform hover:scale-105 transition-transform duration-700"
            overlay
            overlayColor="bg-brand-900/60"
          />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="animate-fade-in">
          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6 hero-text leading-tight">
            Your Gateway to the World
            <span className="block bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 bg-clip-text text-transparent animate-float">
              Starts Here
            </span>
          </h1>
          <p className="font-inter text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto animate-slide-up leading-relaxed">
            From quick getaways to permanent moves - we handle visas, flights, and accommodations 
            so you can focus on your journey ahead
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-scale-in">
          {user ? (
            // Signed-in user buttons
            <>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-brand-900 font-bold hover-lift pulse-glow font-inter transform hover:scale-105 transition-all duration-300"
                asChild
              >
                <Link to="/packages">
                  <MapPin className="h-5 w-5 mr-2" />
                  Destinations
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              <Button 
                size="lg"
                className="glass bg-white/10 backdrop-blur-md text-white border-2 border-gold-400/50 hover:bg-gold-400/20 hover:border-gold-400 transition-all duration-300 hover-lift font-inter"
                asChild
              >
                <Link to="/visas">
                  <FileText className="h-5 w-5 mr-2" />
                  All Visas
                </Link>
              </Button>
              <Button 
                size="lg"
                className="glass bg-white/10 backdrop-blur-md text-white border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover-lift font-inter"
                asChild
              >
                <Link to="/packages">
                  View All Packages
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </>
          ) : (
            // Non-signed-in user buttons
            <>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-brand-900 font-bold hover-lift pulse-glow font-inter transform hover:scale-105 transition-all duration-300"
                asChild
              >
                <Link to="/visas/short-stay">
                  <Plane className="h-5 w-5 mr-2" />
                  Short-Stay Visas
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              <Button 
                size="lg"
                className="glass bg-white/10 backdrop-blur-md text-white border-2 border-gold-400/50 hover:bg-gold-400/20 hover:border-gold-400 transition-all duration-300 hover-lift font-inter"
                asChild
              >
                <Link to="/visas/long-stay">
                  <Building className="h-5 w-5 mr-2" />
                  Long-Stay & Residency
                </Link>
              </Button>
              <Button 
                size="lg"
                className="glass bg-white/10 backdrop-blur-md text-white border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover-lift font-inter"
                asChild
              >
                <Link to="/packages">
                  View All Packages
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm animate-slide-up max-w-4xl mx-auto">
          <div className="glass bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 card-hover">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-full p-3">
                <Plane className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="font-playfair font-bold text-lg mb-3 text-center">Quick Tourism</h3>
            <p className="text-blue-100 text-center leading-relaxed">90-day visas for vacation and business trips</p>
            <div className="mt-4 text-center">
              <span className="inline-block bg-green-400/20 text-green-300 px-3 py-1 rounded-full text-xs font-medium">
                98% Success Rate
              </span>
            </div>
          </div>
          <div className="glass bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 card-hover">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-full p-3">
                <Building className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="font-playfair font-bold text-lg mb-3 text-center">Work & Study</h3>
            <p className="text-blue-100 text-center leading-relaxed">Long-term permits for career and education</p>
            <div className="mt-4 text-center">
              <span className="inline-block bg-blue-400/20 text-blue-300 px-3 py-1 rounded-full text-xs font-medium">
                Expert Guidance
              </span>
            </div>
          </div>
          <div className="glass bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 card-hover">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-br from-gold-400 to-gold-600 rounded-full p-3">
                <MapPin className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="font-playfair font-bold text-lg mb-3 text-center">Permanent Residency</h3>
            <p className="text-blue-100 text-center leading-relaxed">Complete relocation support and guidance</p>
            <div className="mt-4 text-center">
              <span className="inline-block bg-gold-400/20 text-gold-300 px-3 py-1 rounded-full text-xs font-medium">
                Full Service
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gold-500/20 rounded-full animate-float blur-sm" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-white/10 rounded-full animate-float blur-sm" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 right-20 w-12 h-12 bg-gold-400/30 rounded-full animate-float blur-sm" style={{ animationDelay: '0.5s' }} />
    </section>
  );
};

export default HeroSection;
