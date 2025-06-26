import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

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
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group transition-all duration-200 ease-tech hover:scale-105"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-tech-blue-500 to-tech-cyan-500 rounded-button flex items-center justify-center shadow-elevation-2 group-hover:shadow-elevation-3 group-hover:animate-pulse-glow">
              <span className="text-white font-bold text-sm">OG</span>
            </div>
            <span className="font-space-grotesk font-bold text-xl text-white group-hover:text-tech-cyan-300 transition-colors duration-200">
              One Global Trip
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "relative px-4 py-2 rounded-button text-sm font-medium transition-all duration-200 ease-tech group overflow-hidden",
                  link.active
                    ? "text-tech-cyan-300 bg-white/10"
                    : "text-white/90 hover:text-white hover:bg-white/10 hover:scale-105"
                )}
              >
                {link.name}
                {link.active && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-tech-blue-400 to-tech-cyan-400 animate-neon-underline" />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-500 pointer-events-none" />
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                <Link to="/dashboard">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-white hover:text-tech-cyan-300 hover:bg-white/10"
                  >
                    Dashboard
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => signOut()}
                  className="border-white/30 text-white hover:bg-white/10 hover:border-white/50"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/auth">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-white hover:text-tech-cyan-300 hover:bg-white/10"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/get-started">
                  <Button 
                    variant="secondary" 
                    size="sm"
                    className="font-semibold"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

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

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 glass-effect backdrop-blur-glass border-t border-white/10 shadow-glass">
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "block px-4 py-3 rounded-button text-base font-medium transition-all duration-200 ease-tech",
                    link.active
                      ? "text-tech-cyan-300 bg-white/10"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-white/10">
                {user ? (
                  <div className="space-y-3">
                    <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
                        Dashboard
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      onClick={() => signOut()}
                      className="w-full border-white/30 text-white hover:bg-white/10"
                    >
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/get-started" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="secondary" className="w-full">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default TechNavigation;
