
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Sparkles, LogOut, User, Home, FileText, Package, Phone } from 'lucide-react';
import { ROUTES } from '@/constants/routes';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyClick: () => void;
}

const MobileNavigation = ({ isOpen, onClose, onApplyClick }: MobileNavigationProps) => {
  const { user, signOut } = useAuth();

  if (!isOpen) return null;

  const handleLinkClick = () => {
    onClose();
  };

  const handleApplyClick = () => {
    onApplyClick();
    onClose();
  };

  return (
    <div className="md:hidden bg-white border-t border-gray-200">
      <div className="px-4 py-4 space-y-4">
        <div className="space-y-2">
          <Link
            to={ROUTES.HOME}
            onClick={handleLinkClick}
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 py-2"
          >
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>
          <Link
            to={ROUTES.PACKAGES}
            onClick={handleLinkClick}
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 py-2"
          >
            <Package className="h-4 w-4" />
            <span>Packages</span>
          </Link>
          <Link
            to={ROUTES.VISAS}
            onClick={handleLinkClick}
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 py-2"
          >
            <FileText className="h-4 w-4" />
            <span>Visas</span>
          </Link>
          <Link
            to={ROUTES.CONTACT}
            onClick={handleLinkClick}
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 py-2"
          >
            <Phone className="h-4 w-4" />
            <span>Contact</span>
          </Link>
        </div>

        <div className="border-t pt-4">
          <Button
            onClick={handleApplyClick}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold flex items-center justify-center space-x-2 mb-4"
          >
            <Sparkles className="h-4 w-4" />
            <span>Smart Apply</span>
          </Button>

          {user ? (
            <div className="space-y-2">
              <Link
                to={ROUTES.DASHBOARD}
                onClick={handleLinkClick}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 py-2"
              >
                <User className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
              <Button
                variant="outline"
                onClick={() => {
                  signOut();
                  onClose();
                }}
                className="w-full flex items-center justify-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </Button>
            </div>
          ) : (
            <Link to={ROUTES.AUTH} onClick={handleLinkClick}>
              <Button variant="outline" className="w-full">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;
