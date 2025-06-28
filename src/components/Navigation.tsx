
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import NavigationLogo from './navigation/NavigationLogo';
import NavigationLinks from './navigation/NavigationLinks';
import NavigationAuth from './navigation/NavigationAuth';
import MobileNavigation from './navigation/MobileNavigation';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-lg shadow-lg fixed w-full top-0 z-[9999] border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <NavigationLogo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavigationLinks />
            <NavigationAuth />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-deep-blue-900 focus:outline-none relative z-[10000] transition-colors duration-200"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <MobileNavigation isOpen={isOpen} setIsOpen={setIsOpen} />
    </nav>
  );
};

export default Navigation;
