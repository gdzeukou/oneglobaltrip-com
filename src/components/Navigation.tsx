
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
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <NavigationLogo />
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavigationLinks />
            
            <Button
              onClick={handleApplyClick}
              className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 hover:from-yellow-300 hover:via-orange-300 hover:to-pink-400 text-white px-6 py-2 rounded-lg font-bold text-lg flex items-center space-x-2 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 border-2 border-white/20 backdrop-blur-sm relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/30 before:via-transparent before:to-white/30 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
            >
              <Sparkles className="h-5 w-5 animate-pulse text-white filter drop-shadow-lg" />
              <span className="relative z-10 text-white font-extrabold tracking-wide filter drop-shadow-lg [text-shadow:_0_0_10px_rgb(255_255_255_/_50%),_0_0_20px_rgb(255_255_255_/_30%),_0_0_30px_rgb(255_255_255_/_20%)]">Smart Apply</span>
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
