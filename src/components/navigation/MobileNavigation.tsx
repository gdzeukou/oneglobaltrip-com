
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { Sparkles, Plane, Shield, Crown, MapPin, Phone } from 'lucide-react';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyClick: () => void;
}

const MobileNavigation = ({ isOpen, onClose, onApplyClick }: MobileNavigationProps) => {
  if (!isOpen) return null;

  const handleApplyClick = () => {
    onApplyClick();
    onClose();
  };

  return (
    <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-40">
      <div className="px-4 py-6 space-y-4">
        {/* Main Navigation */}
        <div className="space-y-3">
          <Link
            to={ROUTES.HOME}
            onClick={onClose}
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
          >
            Home
          </Link>
          
          <div className="space-y-2">
            <div className="px-3 py-2 text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Services
            </div>
            <Link
              to={ROUTES.VISAS}
              onClick={onClose}
              className="flex items-center space-x-3 px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors ml-4"
            >
              <Plane className="h-4 w-4 text-blue-600" />
              <span>Visa Services</span>
            </Link>
            <Link
              to={ROUTES.PACKAGES}
              onClick={onClose}
              className="flex items-center space-x-3 px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors ml-4"
            >
              <Crown className="h-4 w-4 text-blue-600" />
              <span>Travel Packages</span>
            </Link>
            <Link
              to={ROUTES.CONCIERGE}
              onClick={onClose}
              className="flex items-center space-x-3 px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors ml-4"
            >
              <MapPin className="h-4 w-4 text-blue-600" />
              <span>Concierge</span>
            </Link>
          </div>
          
          <Link
            to={ROUTES.CONTACT}
            onClick={onClose}
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* CTA Button */}
        <div className="pt-4 border-t border-gray-200">
          <Button
            onClick={handleApplyClick}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-all duration-300"
          >
            <Sparkles className="h-5 w-5 mr-2" />
            Smart Apply
          </Button>
        </div>

        {/* Contact Info */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Phone className="h-4 w-4" />
            <span>Free consultation available</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;
