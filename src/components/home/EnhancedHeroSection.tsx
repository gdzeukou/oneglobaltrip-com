
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Plane, Building, MapPin, FileText, Globe, Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import OptimizedImage from '@/components/ui/optimized-image';

const EnhancedHeroSection = () => {
  const { user } = useAuth();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [visaCount, setVisaCount] = useState(23547);
  const [bookingCount, setBookingCount] = useState(1247);

  const testimonials = [
    { name: "Sarah M.", country: "USA", text: "Got my Schengen visa in 3 days!" },
    { name: "Ahmed K.", country: "UAE", text: "Perfect European honeymoon package" },
    { name: "Maria L.", country: "Brazil", text: "Seamless visa process, highly recommend" }
  ];

  const floatingElements = [
    { icon: Plane, delay: 0, size: 'w-12 h-12', color: 'text-blue-300' },
    { icon: Globe, delay: 1000, size: 'w-8 h-8', color: 'text-yellow-300' },
    { icon: Star, delay: 2000, size: 'w-6 h-6', color: 'text-white' },
    { icon: Users, delay: 1500, size: 'w-10 h-10', color: 'text-blue-200' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Simulate real-time counters
    const counterInterval = setInterval(() => {
      setVisaCount(prev => prev + Math.floor(Math.random() * 3));
      if (Math.random() > 0.7) {
        setBookingCount(prev => prev + 1);
      }
    }, 5000);
    return () => clearInterval(counterInterval);
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 text-white overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] animate-pulse"></div>
      </div>

      {/* Dynamic Background Images Grid */}
      <div className="absolute inset-0 z-0">
        <div className="grid grid-cols-4 h-full opacity-20">
          <OptimizedImage
            src="https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=600&h=1200&fit=crop"
            alt="European Architecture"
            className="h-full transform hover:scale-105 transition-transform duration-700"
            overlay
            overlayColor="bg-brand-900/60"
          />
          <OptimizedImage
            src="https://images.unsplash.com/photo-1539650116574-75c0c6d73a0e?w=600&h=1200&fit=crop"
            alt="Modern Travel"
            className="h-full transform hover:scale-105 transition-transform duration-700"
            overlay
            overlayColor="bg-brand-900/60"
          />
          <OptimizedImage
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=1200&fit=crop"
            alt="Global Destinations"
            className="h-full transform hover:scale-105 transition-transform duration-700"
            overlay
            overlayColor="bg-brand-900/60"
          />
          <OptimizedImage
            src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=1200&fit=crop"
            alt="Luxury Travel"
            className="h-full transform hover:scale-105 transition-transform duration-700"
            overlay
            overlayColor="bg-brand-900/60"
          />
        </div>
      </div>

      {/* Floating Animated Elements */}
      {floatingElements.map((element, index) => (
        <div
          key={index}
          className={`absolute ${element.size} ${element.color} animate-float opacity-30`}
          style={{
            top: `${20 + (index * 15)}%`,
            left: `${10 + (index * 20)}%`,
            animationDelay: `${element.delay}ms`,
          }}
        >
          <element.icon className="w-full h-full" />
        </div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        {/* Live Statistics Bar */}
        <div className="flex justify-center mb-8">
          <div className="glass bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20 animate-fade-in">
            <div className="flex items-center space-x-6 text-sm font-medium">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>{visaCount.toLocaleString()} visas approved</span>
              </div>
              <div className="w-px h-4 bg-white/30"></div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span>{bookingCount.toLocaleString()} bookings this month</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Hero Content */}
        <div className="text-center animate-fade-in">
          <div className="mb-6">
            <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-4 leading-tight">
              Your Gateway to the
              <span className="block bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                World Starts Here
              </span>
            </h1>
            <div className="relative">
              <p className="font-inter text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto leading-relaxed">
                From quick getaways to permanent moves - we handle visas, flights, and accommodations 
                so you can focus on your journey ahead
              </p>
              
              {/* Rotating Testimonial */}
              <div className="absolute -right-4 md:right-8 top-4 glass bg-white/10 backdrop-blur-md rounded-xl p-4 max-w-xs transform rotate-3 animate-bounce-gentle hidden lg:block">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-white/90 mb-2">"{testimonials[currentTestimonial].text}"</p>
                <p className="text-xs text-blue-200">
                  {testimonials[currentTestimonial].name} • {testimonials[currentTestimonial].country}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-scale-in">
          {user ? (
            <>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 hover:from-gold-600 hover:to-gold-600 text-brand-900 font-bold text-lg px-8 py-4 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 animate-glow font-inter"
                asChild
              >
                <Link to="/packages">
                  <MapPin className="h-6 w-6 mr-2" />
                  Explore Destinations
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              <Button 
                size="lg"
                className="glass bg-white/10 backdrop-blur-md text-white border-2 border-gold-400/50 hover:bg-gold-400/20 hover:border-gold-400 transition-all duration-300 font-bold text-lg px-8 py-4 rounded-2xl transform hover:scale-105 font-inter"
                asChild
              >
                <Link to="/visas">
                  <FileText className="h-6 w-6 mr-2" />
                  Get Visa Now
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 hover:from-gold-600 hover:to-gold-600 text-brand-900 font-bold text-lg px-8 py-4 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 animate-glow font-inter"
                asChild
              >
                <Link to="/visas/short-stay">
                  <Plane className="h-6 w-6 mr-2" />
                  Quick Tourism Visa
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              <Button 
                size="lg"
                className="glass bg-white/10 backdrop-blur-md text-white border-2 border-gold-400/50 hover:bg-gold-400/20 hover:border-gold-400 transition-all duration-300 font-bold text-lg px-8 py-4 rounded-2xl transform hover:scale-105 font-inter"
                asChild
              >
                <Link to="/visas/long-stay">
                  <Building className="h-6 w-6 mr-2" />
                  Work & Study Visas
                </Link>
              </Button>
              <Button 
                size="lg"
                className="glass bg-white/10 backdrop-blur-md text-white border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 font-bold text-lg px-8 py-4 rounded-2xl transform hover:scale-105 font-inter"
                asChild
              >
                <Link to="/packages">
                  View Premium Packages
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </>
          )}
        </div>

        {/* Enhanced Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm animate-slide-up max-w-5xl mx-auto">
          <div className="glass bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-full p-3">
                <Plane className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="font-playfair font-bold text-lg mb-3 text-center">Quick Tourism</h3>
            <p className="text-blue-100 text-center leading-relaxed">90-day visas for vacation and business trips with guaranteed approval</p>
            <div className="mt-4 text-center">
              <span className="inline-block bg-green-400/20 text-green-300 px-3 py-1 rounded-full text-xs font-medium">
                98% Success Rate
              </span>
            </div>
          </div>
          
          <div className="glass bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-full p-3">
                <Building className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="font-playfair font-bold text-lg mb-3 text-center">Work & Study</h3>
            <p className="text-blue-100 text-center leading-relaxed">Long-term permits for career and education with complete support</p>
            <div className="mt-4 text-center">
              <span className="inline-block bg-blue-400/20 text-blue-300 px-3 py-1 rounded-full text-xs font-medium">
                Expert Guidance
              </span>
            </div>
          </div>
          
          <div className="glass bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-br from-gold-400 to-gold-600 rounded-full p-3">
                <MapPin className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="font-playfair font-bold text-lg mb-3 text-center">Permanent Residency</h3>
            <p className="text-blue-100 text-center leading-relaxed">Complete relocation support and guidance for new life abroad</p>
            <div className="mt-4 text-center">
              <span className="inline-block bg-gold-400/20 text-gold-300 px-3 py-1 rounded-full text-xs font-medium">
                Full Service
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedHeroSection;
