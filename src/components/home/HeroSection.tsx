import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Plane, Building, MapPin, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const HeroSection = () => {
  const { user } = useAuth();

  return (
    <section className="pt-20 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Your Gateway to the World
          <span className="block text-yellow-500">Starts Here</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
          From quick getaways to permanent moves - we handle visas, flights, and accommodations 
          so you can focus on your journey ahead
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          {user ? (
            // Signed-in user buttons
            <>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-blue-900 font-bold"
                asChild
              >
                <Link to="/packages">
                  <MapPin className="h-5 w-5 mr-2" />
                  Destinations
                </Link>
              </Button>
              <Button 
                size="lg"
                className="bg-white/10 text-white border-2 border-yellow-400 hover:bg-yellow-400 hover:text-blue-900 transition-all duration-200"
                asChild
              >
                <Link to="/visas">
                  <FileText className="h-5 w-5 mr-2" />
                  All Visas
                </Link>
              </Button>
              <Button 
                size="lg"
                className="bg-white/10 text-white border-2 border-yellow-400 hover:bg-yellow-400 hover:text-blue-900 transition-all duration-200"
                asChild
              >
                <Link to="/packages">
                  View All Packages
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </>
          ) : (
            // Non-signed-in user buttons - Fixed visibility with proper contrast
            <>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-blue-900 font-bold"
                asChild
              >
                <Link to="/visas/short-stay">
                  <Plane className="h-5 w-5 mr-2" />
                  Short-Stay Visas
                </Link>
              </Button>
              <Button 
                size="lg"
                className="bg-white/10 text-white border-2 border-yellow-400 hover:bg-yellow-400 hover:text-blue-900 transition-all duration-200"
                asChild
              >
                <Link to="/visas/long-stay">
                  <Building className="h-5 w-5 mr-2" />
                  Long-Stay & Residency
                </Link>
              </Button>
              <Button 
                size="lg"
                className="bg-white/10 text-white border-2 border-yellow-400 hover:bg-yellow-400 hover:text-blue-900 transition-all duration-200"
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <h3 className="font-bold mb-2 flex items-center justify-center">
              <Plane className="h-4 w-4 mr-2" />
              Quick Tourism
            </h3>
            <p className="text-blue-100">90-day visas for vacation and business trips</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <h3 className="font-bold mb-2 flex items-center justify-center">
              <Building className="h-4 w-4 mr-2" />
              Work & Study
            </h3>
            <p className="text-blue-100">Long-term permits for career and education</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <h3 className="font-bold mb-2 flex items-center justify-center">
              <MapPin className="h-4 w-4 mr-2" />
              Permanent Residency
            </h3>
            <p className="text-blue-100">Complete relocation support and guidance</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
