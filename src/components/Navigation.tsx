import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Settings, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut, isEmailVerified } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getUserInitials = () => {
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  const getUserDisplayName = () => {
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'User';
  };

  return (
    <nav className="bg-white/95 backdrop-blur-lg shadow-lg fixed w-full top-0 z-[9999] border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold gradient-text-primary">One Global Trip</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`px-3 py-2 text-sm font-medium transition-all duration-200 ${
                isActive('/') 
                  ? 'text-deep-blue-900 border-b-2 border-deep-blue-900' 
                  : 'text-gray-700 hover:text-deep-blue-900 hover:scale-105'
              }`}
            >
              Home
            </Link>
            <Link
              to="/packages"
              className={`px-3 py-2 text-sm font-medium transition-all duration-200 ${
                isActive('/packages') 
                  ? 'text-deep-blue-900 border-b-2 border-deep-blue-900' 
                  : 'text-gray-700 hover:text-deep-blue-900 hover:scale-105'
              }`}
            >
              Packages
            </Link>
            <Link
              to="/visas"
              className={`px-3 py-2 text-sm font-medium transition-all duration-200 ${
                isActive('/visas') 
                  ? 'text-deep-blue-900 border-b-2 border-deep-blue-900' 
                  : 'text-gray-700 hover:text-deep-blue-900 hover:scale-105'
              }`}
            >
              Visas
            </Link>
            <Link
              to="/get-started"
              className={`px-3 py-2 text-sm font-medium transition-all duration-200 ${
                isActive('/get-started') 
                  ? 'text-deep-blue-900 border-b-2 border-deep-blue-900' 
                  : 'text-gray-700 hover:text-deep-blue-900 hover:scale-105'
              }`}
            >
              Get Started
            </Link>

            {/* Authentication Section */}
            {user ? (
              <div className="flex items-center space-x-3">
                {!isEmailVerified && (
                  <div className="flex items-center space-x-1 px-2 py-1 bg-yellow-50 border border-yellow-200 rounded-md">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    <span className="text-xs text-yellow-700">Verify Email</span>
                  </div>
                )}
                <Link
                  to="/dashboard"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive('/dashboard')
                      ? 'bg-deep-blue-900 text-white'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-deep-blue-900'
                  }`}
                >
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="bg-deep-blue-800 text-white text-xs">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <span>{getUserDisplayName()}</span>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="text-gray-700 hover:text-deep-blue-900 hover:bg-blue-50 transition-all duration-200"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                asChild
                className="bg-deep-blue-900 hover:bg-deep-blue-800 text-white transition-colors duration-200"
              >
                <Link to="/auth">
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Link>
              </Button>
            )}
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

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200/50 shadow-lg relative z-[9998]">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className={`block px-3 py-2 text-base font-medium rounded-lg transition-all duration-200 ${
                isActive('/') 
                  ? 'text-deep-blue-900 bg-blue-50' 
                  : 'text-gray-700 hover:text-deep-blue-900 hover:bg-gray-50'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/packages"
              className={`block px-3 py-2 text-base font-medium rounded-lg transition-all duration-200 ${
                isActive('/packages') 
                  ? 'text-deep-blue-900 bg-blue-50' 
                  : 'text-gray-700 hover:text-deep-blue-900 hover:bg-gray-50'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Packages
            </Link>
            <Link
              to="/visas"
              className={`block px-3 py-2 text-base font-medium rounded-lg transition-all duration-200 ${
                isActive('/visas') 
                  ? 'text-deep-blue-900 bg-blue-50' 
                  : 'text-gray-700 hover:text-deep-blue-900 hover:bg-gray-50'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Visas
            </Link>
            <Link
              to="/get-started"
              className={`block px-3 py-2 text-base font-medium rounded-lg transition-all duration-200 ${
                isActive('/get-started') 
                  ? 'text-deep-blue-900 bg-blue-50' 
                  : 'text-gray-700 hover:text-deep-blue-900 hover:bg-gray-50'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </Link>

            {/* Mobile Authentication */}
            {user ? (
              <div className="pt-4 border-t border-gray-200/50 mt-4">
                {!isEmailVerified && (
                  <div className="flex items-center space-x-2 px-3 py-2 mb-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm text-yellow-700">Please verify your email address</span>
                  </div>
                )}
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-3 px-3 py-3 text-base font-medium text-gray-700 hover:text-deep-blue-900 hover:bg-blue-50 rounded-lg transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-deep-blue-800 text-white text-sm">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <span>Dashboard ({getUserDisplayName()})</span>
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsOpen(false);
                  }}
                  className="flex items-center space-x-3 w-full text-left px-3 py-3 text-base font-medium text-gray-700 hover:text-deep-blue-900 hover:bg-red-50 rounded-lg transition-all duration-200"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t border-gray-200/50 mt-4">
                <Link
                  to="/auth"
                  className="flex items-center space-x-3 px-3 py-3 text-base font-medium text-deep-blue-800 hover:text-deep-blue-900 hover:bg-blue-50 rounded-lg transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="h-5 w-5" />
                  <span>Sign In / Sign Up</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
