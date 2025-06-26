
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import NavigationLogo from './navigation/NavigationLogo';
import NavigationLinks from './navigation/NavigationLinks';
import AuthButtons from './navigation/AuthButtons';
import MobileMenu from './navigation/MobileMenu';

const TechNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    {
      name: 'Home',
      href: '/',
      active: location.pathname === '/'
    },
    {
      name: 'Visas',
      href: '/visas',
      active: location.pathname.startsWith('/visas')
    },
    {
      name: 'Packages',
      href: '/packages',
      active: location.pathname.startsWith('/packages')
    },
    {
      name: 'Get Started',
      href: '/get-started',
      active: location.pathname === '/get-started'
    }
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-tech",
      isScrolled 
        ? "glass-effect backdrop-blur-glass border-b border-white/10 shadow-glass" 
        : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <NavigationLogo />
          <NavigationLinks navLinks={navLinks} />
          <AuthButtons user={user} signOut={signOut} />

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:bg-white/10"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        <MobileMenu 
          isOpen={isMenuOpen}
          navLinks={navLinks}
          user={user}
          signOut={signOut}
          onClose={() => setIsMenuOpen(false)}
        />
      </div>
    </nav>
  );
};

export default TechNavigation;
