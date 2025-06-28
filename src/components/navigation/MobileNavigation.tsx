
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User, LogOut, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface MobileNavigationProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const MobileNavigation = ({ isOpen, setIsOpen }: MobileNavigationProps) => {
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

  const linkClass = (path: string) => 
    `block px-3 py-2 text-base font-medium rounded-lg transition-all duration-200 ${
      isActive(path) 
        ? 'text-deep-blue-900 bg-blue-50' 
        : 'text-gray-700 hover:text-deep-blue-900 hover:bg-gray-50'
    }`;

  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200/50 shadow-lg relative z-[9998]">
      <div className="px-2 pt-2 pb-3 space-y-1">
        <Link to="/" className={linkClass('/')} onClick={() => setIsOpen(false)}>
          Home
        </Link>
        <Link to="/packages" className={linkClass('/packages')} onClick={() => setIsOpen(false)}>
          Packages
        </Link>
        <Link to="/visas" className={linkClass('/visas')} onClick={() => setIsOpen(false)}>
          Visas
        </Link>
        <Link to="/get-started" className={linkClass('/get-started')} onClick={() => setIsOpen(false)}>
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
  );
};

export default MobileNavigation;
