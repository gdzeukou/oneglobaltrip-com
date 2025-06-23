
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

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

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-[9999] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-blue-900">One Global Trip</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-blue-900 border-b-2 border-blue-900' 
                  : 'text-gray-700 hover:text-blue-900'
              }`}
            >
              Home
            </Link>
            <Link
              to="/packages"
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                isActive('/packages') 
                  ? 'text-blue-900 border-b-2 border-blue-900' 
                  : 'text-gray-700 hover:text-blue-900'
              }`}
            >
              Packages
            </Link>
            <Link
              to="/visas"
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                isActive('/visas') 
                  ? 'text-blue-900 border-b-2 border-blue-900' 
                  : 'text-gray-700 hover:text-blue-900'
              }`}
            >
              Visas
            </Link>
            <Link
              to="/get-started"
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                isActive('/get-started') 
                  ? 'text-blue-900 border-b-2 border-blue-900' 
                  : 'text-gray-700 hover:text-blue-900'
              }`}
            >
              Get Started
            </Link>

            {/* Authentication Section */}
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-900"
                >
                  <User className="h-4 w-4" />
                  <span>{user.email?.split('@')[0]}</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-900"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-900"
              >
                <User className="h-4 w-4" />
                <span>Sign In</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-900 focus:outline-none relative z-[10000]"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg relative z-[9998]">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className={`block px-3 py-2 text-base font-medium ${
                isActive('/') 
                  ? 'text-blue-900 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-900 hover:bg-gray-50'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/packages"
              className={`block px-3 py-2 text-base font-medium ${
                isActive('/packages') 
                  ? 'text-blue-900 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-900 hover:bg-gray-50'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Packages
            </Link>
            <Link
              to="/visas"
              className={`block px-3 py-2 text-base font-medium ${
                isActive('/visas') 
                  ? 'text-blue-900 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-900 hover:bg-gray-50'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Visas
            </Link>
            <Link
              to="/get-started"
              className={`block px-3 py-2 text-base font-medium ${
                isActive('/get-started') 
                  ? 'text-blue-900 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-900 hover:bg-gray-50'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </Link>

            {/* Mobile Authentication */}
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-900 hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard ({user.email?.split('@')[0]})
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-900 hover:bg-gray-50"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="block px-3 py-2 text-base font-medium text-blue-600 hover:text-blue-900 hover:bg-blue-50"
                onClick={() => setIsOpen(false)}
              >
                Sign In / Sign Up
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
