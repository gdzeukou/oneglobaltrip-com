
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User, LogOut, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { isDevelopmentMode } from '@/utils/developmentMode';

interface NavigationAuthProps {
  buttonVariant?: 'default' | 'outline';
  textColor?: string;
}

const NavigationAuth = ({ buttonVariant = 'default', textColor }: NavigationAuthProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut, isEmailVerified } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleSignOut = async () => {
    try {
      if (!isDevelopmentMode()) {
        await signOut();
      }
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
    if (isDevelopmentMode()) {
      return 'Dev User';
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'User';
  };

  if (user) {
    return (
      <div className="flex items-center space-x-3">
        {!isDevelopmentMode() && !isEmailVerified && (
          <div className="flex items-center space-x-1 px-2 py-1 bg-yellow-50 border border-yellow-200 rounded-md">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <span className="text-xs text-yellow-700">Verify Email</span>
          </div>
        )}
        {isDevelopmentMode() && (
          <div className="flex items-center space-x-1 px-2 py-1 bg-green-50 border border-green-200 rounded-md">
            <span className="text-xs text-green-700">Dev Mode</span>
          </div>
        )}
        <Link
          to="/dashboard"
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            isActive('/dashboard')
              ? 'bg-deep-blue-900 text-white shadow-lg'
              : `${textColor || 'text-gray-700'} hover:bg-blue-50 hover:text-deep-blue-900`
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
          className={`${textColor || 'text-gray-700'} hover:text-deep-blue-900 hover:bg-blue-50 transition-all duration-200`}
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  const buttonClass = buttonVariant === 'outline' 
    ? `border-2 ${textColor === 'text-white' ? 'border-white text-white hover:bg-white hover:text-black' : 'border-deep-blue-900 text-deep-blue-900 hover:bg-deep-blue-900 hover:text-white'}`
    : "bg-gradient-to-r from-deep-blue-900 to-deep-blue-800 hover:from-deep-blue-800 hover:to-deep-blue-700 text-white";

  return (
    <Button
      asChild
      variant={buttonVariant === 'outline' ? 'outline' : 'default'}
      className={`${buttonClass} shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105`}
    >
      <Link to="/auth">
        <User className="h-4 w-4 mr-2" />
        Sign In
      </Link>
    </Button>
  );
};

export default NavigationAuth;
