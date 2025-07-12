import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Plane, Bot } from 'lucide-react';
import NavigationAuth from './navigation/NavigationAuth';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="w-full mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link 
                to="/" 
                className="flex items-center transition-all duration-200 hover:opacity-80"
              >
                <img 
                  src="/lovable-uploads/b91448b5-fbc8-45b2-93f4-ed24bfa0d28d.png" 
                  alt="One Global Trip" 
                  className="h-12 w-auto"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link
                  to="/home"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive('/home')
                      ? 'bg-deep-blue-100 text-deep-blue-900 shadow-sm'
                      : 'text-gray-700 hover:text-deep-blue-900 hover:bg-deep-blue-50'
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/visas"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive('/visas')
                      ? 'bg-deep-blue-100 text-deep-blue-900 shadow-sm'
                      : 'text-gray-700 hover:text-deep-blue-900 hover:bg-deep-blue-50'
                  }`}
                >
                  Visas
                </Link>
                <Link
                  to="/packages"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive('/packages')
                      ? 'bg-deep-blue-100 text-deep-blue-900 shadow-sm'
                      : 'text-gray-700 hover:text-deep-blue-900 hover:bg-deep-blue-50'
                  }`}
                >
                  Packages
                </Link>
                <Link
                  to="/pricing"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive('/pricing')
                      ? 'bg-deep-blue-100 text-deep-blue-900 shadow-sm'
                      : 'text-gray-700 hover:text-deep-blue-900 hover:bg-deep-blue-50'
                  }`}
                >
                  Pricing
                </Link>
                <Link
                  to="/contact"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive('/contact')
                      ? 'bg-deep-blue-100 text-deep-blue-900 shadow-sm'
                      : 'text-gray-700 hover:text-deep-blue-900 hover:bg-deep-blue-50'
                  }`}
                >
                  Contact
                </Link>
                
                {/* AI Travel Agent Chat - Show different states based on auth */}
                {user ? (
                  <Link
                    to="/ai-chat"
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      isActive('/ai-chat')
                        ? 'bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 shadow-sm'
                        : 'text-gray-700 hover:text-purple-700 hover:bg-purple-50'
                    }`}
                  >
                    <Bot className="h-4 w-4" />
                    <span>AI Travel Agent</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full ml-1">Free</span>
                  </Link>
                ) : (
                  <Link
                    to="/ai-agent-auth"
                    className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-purple-700 hover:bg-purple-50 transition-all duration-200"
                  >
                    <Bot className="h-4 w-4" />
                    <span>Create AI Agent</span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full ml-1">Free</span>
                  </Link>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={toggleMobileMenu}
                type="button"
                className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-deep-blue-500"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Auth Section - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-4">
              <NavigationAuth />
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/home"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                  isActive('/home')
                    ? 'bg-deep-blue-100 text-deep-blue-900'
                    : 'text-gray-700 hover:text-deep-blue-900 hover:bg-deep-blue-50'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/visas"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                  isActive('/visas')
                    ? 'bg-deep-blue-100 text-deep-blue-900'
                    : 'text-gray-700 hover:text-deep-blue-900 hover:bg-deep-blue-50'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Visas
              </Link>
              <Link
                to="/packages"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                  isActive('/packages')
                    ? 'bg-deep-blue-100 text-deep-blue-900'
                    : 'text-gray-700 hover:text-deep-blue-900 hover:bg-deep-blue-50'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Packages
              </Link>
              <Link
                to="/pricing"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                  isActive('/pricing')
                    ? 'bg-deep-blue-100 text-deep-blue-900'
                    : 'text-gray-700 hover:text-deep-blue-900 hover:bg-deep-blue-50'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                to="/contact"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                  isActive('/contact')
                    ? 'bg-deep-blue-100 text-deep-blue-900'
                    : 'text-gray-700 hover:text-deep-blue-900 hover:bg-deep-blue-50'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              
              {/* AI Travel Agent Chat - Mobile */}
              {user ? (
                <Link
                  to="/ai-chat"
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                    isActive('/ai-chat')
                      ? 'bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700'
                      : 'text-gray-700 hover:text-purple-700 hover:bg-purple-50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Bot className="h-5 w-5" />
                  <span>AI Travel Agent</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Free</span>
                </Link>
              ) : (
                <Link
                  to="/ai-agent-auth"
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-700 hover:bg-purple-50 transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Bot className="h-5 w-5" />
                  <span>Create AI Agent</span>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Free</span>
                </Link>
              )}
              
              {/* Mobile Auth Section */}
              <div className="pt-4 mt-4 border-t border-gray-200">
                <NavigationAuth />
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navigation;
