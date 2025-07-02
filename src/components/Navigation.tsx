
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Menu, X, Plane, Sparkles } from 'lucide-react';
import NavigationLogo from './navigation/NavigationLogo';
import NavigationLinks from './navigation/NavigationLinks';
import NavigationAuth from './navigation/NavigationAuth';
import MobileNavigation from './navigation/MobileNavigation';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleApplyClick = () => {
    if (user) {
      // Store intent for intelligent form
      sessionStorage.setItem('visa_application_intent', JSON.stringify({
        source: 'navigation',
        timestamp: Date.now()
      }));
      navigate('/apply');
    } else {
      // Store intent and redirect to auth
      sessionStorage.setItem('visa_application_intent', JSON.stringify({
        source: 'navigation',
        timestamp: Date.now(),
        redirectAfterAuth: '/apply'
      }));
      navigate('/auth');
    }
  };

  return (
    <nav className="bg-background/95 backdrop-blur-md shadow-luxury border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <NavigationLogo />
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavigationLinks />
            
            <Button
              onClick={handleApplyClick}
              className="btn-luxury-accent group relative overflow-hidden px-6 py-3 text-lg font-bold tracking-wide shadow-luxury hover:shadow-luxury-lg transition-all duration-500 transform hover:scale-105 hover:-translate-y-1"
            >
              <span className="relative z-10 flex items-center">
                <Sparkles className="h-5 w-5 mr-2 animate-pulse" />
                Smart Apply
              </span>
              {/* Animated shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </Button>
            
            <NavigationAuth />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
        onApplyClick={handleApplyClick}
      />
    </nav>
  );
};

export default Navigation;
