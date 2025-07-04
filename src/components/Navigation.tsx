
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Plane, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NavigationLogo from './navigation/NavigationLogo';
import NavigationLinks from './navigation/NavigationLinks';
import NavigationAuth from './navigation/NavigationAuth';
import MobileNavigation from './navigation/MobileNavigation';
import { useAuth } from '@/contexts/AuthContext';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <NavigationLogo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavigationLinks />
            
            {/* AI Chat Link */}
            <Link
              to="/ai-chat"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === '/ai-chat'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <Plane className="h-4 w-4" />
              <span>Maya AI</span>
            </Link>

            {/* Bookings Link - Only show if user is authenticated */}
            {user && (
              <Link
                to="/bookings"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === '/bookings'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <Calendar className="h-4 w-4" />
                <span>My Bookings</span>
              </Link>
            )}
            
            <NavigationAuth />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="text-gray-500 hover:text-gray-700"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </nav>
  );
};

export default Navigation;
