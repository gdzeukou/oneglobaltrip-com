
import { Link } from 'react-router-dom';
import { X, Plane, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NavigationAuth from './NavigationAuth';
import { useAuth } from '@/contexts/AuthContext';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNavigation = ({ isOpen, onClose }: MobileNavigationProps) => {
  const { user } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
        <Link
          to="/"
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
          onClick={onClose}
        >
          Home
        </Link>
        <Link
          to="/visas"
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
          onClick={onClose}
        >
          Visas
        </Link>
        <Link
          to="/packages"
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
          onClick={onClose}
        >
          Packages
        </Link>
        <Link
          to="/pricing"
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
          onClick={onClose}
        >
          Pricing
        </Link>
        <Link
          to="/ai-chat"
          className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
          onClick={onClose}
        >
          <Plane className="h-4 w-4" />
          <span>Maya AI</span>
        </Link>

        {/* Bookings Link - Only show if user is authenticated */}
        {user && (
          <Link
            to="/bookings"
            className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            onClick={onClose}
          >
            <Calendar className="h-4 w-4" />
            <span>My Bookings</span>
          </Link>
        )}
        
        <div className="pt-4 border-t border-gray-200">
          <NavigationAuth />
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;
