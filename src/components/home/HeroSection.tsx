
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Plane, Building, MapPin, FileText, User, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const HeroSection = () => {
  const { user } = useAuth();

  return (
    <section className="pt-20 relative min-h-screen bg-gradient-to-br from-deep-blue-900 via-deep-blue-800 to-deep-blue-900 text-white overflow-hidden">
      {/* Modern geometric background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-deep-blue-900/95 via-deep-blue-800/90 to-deep-blue-900/95" />
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/5 rounded-full blur-2xl" />
        </div>
        {/* Geometric patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-32 left-20 w-4 h-4 bg-yellow-400 rotate-45" />
          <div className="absolute top-48 right-32 w-6 h-6 bg-white/30 rounded-full" />
          <div className="absolute bottom-32 left-1/3 w-3 h-3 bg-yellow-400 rounded-full" />
          <div className="absolute bottom-48 right-1/4 w-2 h-2 bg-white/40" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="animate-fade-in">
          {user ? (
            <>
              <div className="flex items-center justify-center mb-4">
                <Sparkles className="h-8 w-8 text-yellow-500 mr-3 animate-pulse" />
                <span className="text-lg font-medium text-yellow-400">Welcome Back!</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 hero-text">
                Your Travel Journey
                <span className="block text-yellow-400 animate-float">Continues</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto animate-slide-up">
                Access your dashboard, track applications, and discover new destinations. 
                Your personalized travel experience awaits.
              </p>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center mb-4">
                <Plane className="h-8 w-8 text-yellow-500 mr-3" />
                <span className="text-lg font-medium text-yellow-400">Premium Travel Solutions</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 hero-text">
                Turn Travel Dreams Into
                <span className="block text-yellow-400 animate-float">Reality</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto animate-slide-up">
                From weekend escapes to life-changing adventures - we handle visas, flights, and accommodations 
                so you can focus on creating memories that last forever
              </p>
            </>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-scale-in">
          {user ? (
            <>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-deep-blue-900 font-bold text-lg px-8 py-4 hover-lift animate-pulse-glow shadow-xl border-0"
                asChild
              >
                <Link to="/dashboard">
                  <User className="h-5 w-5 mr-2" />
                  My Dashboard
                </Link>
              </Button>
              <Button 
                size="lg"
                className="bg-white/10 backdrop-blur-sm text-white border-2 border-yellow-400 hover:bg-yellow-400 hover:text-deep-blue-900 transition-all duration-300 hover-lift font-bold text-lg px-8 py-4 shadow-xl"
                asChild
              >
                <Link to="/packages">
                  <MapPin className="h-5 w-5 mr-2" />
                  Browse Destinations
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-deep-blue-900 font-bold text-lg px-8 py-4 hover-lift animate-pulse-glow shadow-xl border-0"
                asChild
              >
                <Link to="/visas/short-stay">
                  <Plane className="h-5 w-5 mr-2" />
                  Short-Stay Visas
                </Link>
              </Button>
              <Button 
                size="lg"
                className="bg-white/10 backdrop-blur-sm text-white border-2 border-yellow-400 hover:bg-yellow-400 hover:text-deep-blue-900 transition-all duration-300 hover-lift font-bold text-lg px-8 py-4 shadow-xl"
                asChild
              >
                <Link to="/visas/long-stay">
                  <Building className="h-5 w-5 mr-2" />
                  Long-Stay & Residency
                </Link>
              </Button>
            </>
          )}
        </div>

        {/* Professional info cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-slide-up">
          {user ? (
            <>
              <div className="glass-modern rounded-xl p-6 hover-lift border border-white/20 shadow-xl">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 bg-yellow-500/20 rounded-full">
                    <User className="h-6 w-6 text-yellow-400" />
                  </div>
                </div>
                <h3 className="font-bold mb-2 text-yellow-400">Personal Dashboard</h3>
                <p className="text-blue-100 text-sm">Track your applications, trips, and travel documents</p>
              </div>
              <div className="glass-modern rounded-xl p-6 hover-lift border border-white/20 shadow-xl">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 bg-yellow-500/20 rounded-full">
                    <MapPin className="h-6 w-6 text-yellow-400" />
                  </div>
                </div>
                <h3 className="font-bold mb-2 text-yellow-400">Curated Packages</h3>
                <p className="text-blue-100 text-sm">Exclusive deals and personalized travel recommendations</p>
              </div>
              <div className="glass-modern rounded-xl p-6 hover-lift border border-white/20 shadow-xl">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 bg-yellow-500/20 rounded-full">
                    <FileText className="h-6 w-6 text-yellow-400" />
                  </div>
                </div>
                <h3 className="font-bold mb-2 text-yellow-400">Priority Support</h3>
                <p className="text-blue-100 text-sm">Dedicated assistance for all your travel needs</p>
              </div>
            </>
          ) : (
            <>
              <div className="glass-modern rounded-xl p-6 hover-lift border border-white/20 shadow-xl">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 bg-yellow-500/20 rounded-full">
                    <Plane className="h-6 w-6 text-yellow-400" />
                  </div>
                </div>
                <h3 className="font-bold mb-2 text-yellow-400">Quick Tourism</h3>
                <p className="text-blue-100 text-sm">90-day visas for vacation and business trips</p>
              </div>
              <div className="glass-modern rounded-xl p-6 hover-lift border border-white/20 shadow-xl">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 bg-yellow-500/20 rounded-full">
                    <Building className="h-6 w-6 text-yellow-400" />
                  </div>
                </div>
                <h3 className="font-bold mb-2 text-yellow-400">Work & Study</h3>
                <p className="text-blue-100 text-sm">Long-term permits for career and education</p>
              </div>
              <div className="glass-modern rounded-xl p-6 hover-lift border border-white/20 shadow-xl">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 bg-yellow-500/20 rounded-full">
                    <MapPin className="h-6 w-6 text-yellow-400" />
                  </div>
                </div>
                <h3 className="font-bold mb-2 text-yellow-400">Permanent Residency</h3>
                <p className="text-blue-100 text-sm">Complete relocation support and guidance</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-32 left-16 w-16 h-16 bg-yellow-500/20 rounded-lg rotate-12 animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-32 right-16 w-12 h-12 bg-white/10 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 right-32 w-8 h-8 bg-yellow-400/30 rounded-lg rotate-45 animate-float" style={{ animationDelay: '0.5s' }} />
    </section>
  );
};

export default HeroSection;
