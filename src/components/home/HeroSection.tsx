
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Plane, Building, MapPin, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import OptimizedImage from '@/components/ui/optimized-image';

const HeroSection = () => {
  const { user } = useAuth();

  return (
    <section className="pt-20 relative min-h-screen bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden">
      {/* Background Images with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <div className="grid grid-cols-3 h-full opacity-20">
          <OptimizedImage
            src="https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=1200&fit=crop&crop=center"
            alt="European Architecture"
            className="h-full"
            overlay
            overlayColor="bg-blue-900/60"
          />
          <OptimizedImage
            src="https://images.unsplash.com/photo-1539650116574-75c0c6d73a0e?w=800&h=1200&fit=crop&crop=center"
            alt="Modern Travel"
            className="h-full"
            overlay
            overlayColor="bg-blue-900/60"
          />
          <OptimizedImage
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=1200&fit=crop&crop=center"
            alt="Global Destinations"
            className="h-full"
            overlay
            overlayColor="bg-blue-900/60"
          />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 hero-text">
            Your Gateway to the World
            <span className="block text-yellow-500 animate-float">Starts Here</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto animate-slide-up">
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
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-blue-900 font-bold hover-lift pulse-glow"
                asChild
              >
                <Link to="/packages">
                  <MapPin className="h-5 w-5 mr-2" />
                  Destinations
                </Link>
              </Button>
              <Button 
                size="lg"
                className="bg-white/10 text-white border-2 border-yellow-400 hover:bg-yellow-400 hover:text-blue-900 transition-all duration-200 hover-lift"
                asChild
              >
                <Link to="/visas">
                  <FileText className="h-5 w-5 mr-2" />
                  All Visas
                </Link>
              </Button>
              <Button 
                size="lg"
                className="bg-white/10 text-white border-2 border-yellow-400 hover:bg-yellow-400 hover:text-blue-900 transition-all duration-200 hover-lift"
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
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-blue-900 font-bold hover-lift pulse-glow"
                asChild
              >
                <Link to="/visas/short-stay">
                  <Plane className="h-5 w-5 mr-2" />
                  Short-Stay Visas
                </Link>
              </Button>
              <Button 
                size="lg"
                className="bg-white/10 text-white border-2 border-yellow-400 hover:bg-yellow-400 hover:text-blue-900 transition-all duration-200 hover-lift"
                asChild
              >
                <Link to="/visas/long-stay">
                  <Building className="h-5 w-5 mr-2" />
                  Long-Stay & Residency
                </Link>
              </Button>
              <Button 
                size="lg"
                className="bg-white/10 text-white border-2 border-yellow-400 hover:bg-yellow-400 hover:text-blue-900 transition-all duration-200 hover-lift"
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm animate-slide-up">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 glass hover-lift">
            <h3 className="font-bold mb-2 flex items-center justify-center">
              <Plane className="h-4 w-4 mr-2" />
              Quick Tourism
            </h3>
            <p className="text-blue-100">90-day visas for vacation and business trips</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 glass hover-lift">
            <h3 className="font-bold mb-2 flex items-center justify-center">
              <Building className="h-4 w-4 mr-2" />
              Work & Study
            </h3>
            <p className="text-blue-100">Long-term permits for career and education</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 glass hover-lift">
            <h3 className="font-bold mb-2 flex items-center justify-center">
              <MapPin className="h-4 w-4 mr-2" />
              Permanent Residency
            </h3>
            <p className="text-blue-100">Complete relocation support and guidance</p>
          </div>
        </div>
      </div>

      {/* Floating elements for visual appeal */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-500/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-white/10 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 right-20 w-12 h-12 bg-yellow-400/30 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
    </section>
  );
};

export default HeroSection;
