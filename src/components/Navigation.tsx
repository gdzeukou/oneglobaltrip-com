
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NavigationLinks from './navigation/NavigationLinks';
import NavigationAuth from './navigation/NavigationAuth';
import NavigationLogo from './navigation/NavigationLogo';
import MobileNavigation from './navigation/MobileNavigation';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Check if we're on the visas page to apply transparent styling
  const isVisasPage = location.pathname === '/visas';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleApplyClick = () => {
    // Handle smart apply functionality here
    console.log('Smart Apply clicked');
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isVisasPage 
        ? (isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
        )
        : 'bg-white shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <NavigationLogo textColor={isVisasPage && !isScrolled ? 'text-white' : undefined} />
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationLinks textColor={isVisasPage && !isScrolled ? 'text-white' : undefined} />
          </div>

          {/* Auth Section */}
          <div className="hidden md:block">
            <NavigationAuth 
              buttonVariant={isVisasPage && !isScrolled ? 'outline' : 'default'}
              textColor={isVisasPage && !isScrolled ? 'text-white' : undefined}
            />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={isVisasPage && !isScrolled ? 'text-white hover:text-white' : ''}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)}
        onApplyClick={handleApplyClick}
      />
    </nav>
  );
};

export default Navigation;
