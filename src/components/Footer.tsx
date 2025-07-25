
import { Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-12">
      <div className="w-full mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/b91448b5-fbc8-45b2-93f4-ed24bfa0d28d.png" 
                alt="One Global Trip" 
                className="h-8 w-auto"
              />
              <span className="font-bold text-lg">One Global Trip</span>
            </div>
            <p className="text-blue-200">Luxury European travel experiences with guaranteed visa assistance.</p>
            
            {/* Founders */}
            <div className="pt-4">
              <p className="text-sm text-blue-200 mb-2">Founded by a group of travelers</p>
              <p className="text-xs text-blue-300">U.S-based, travel-obsessed</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link to={ROUTES.HOME} className="block text-blue-200 hover:text-white transition-colors">Home</Link>
              <Link to={ROUTES.PACKAGES} className="block text-blue-200 hover:text-white transition-colors">Packages</Link>
              <Link to={ROUTES.VISAS} className="block text-blue-200 hover:text-white transition-colors">Visas</Link>
              <Link to={ROUTES.CONTACT} className="block text-blue-200 hover:text-white transition-colors">Contact</Link>
              <Link to={ROUTES.AUTH} className="block text-blue-200 hover:text-white transition-colors">Sign In</Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <div className="space-y-2 text-blue-200">
              <Link to={ROUTES.SCHENGEN_SHORT_STAY_LANDING} className="block hover:text-white transition-colors">Schengen Visa Pack</Link>
              <Link to={ROUTES.UK_SHORT_STAY} className="block hover:text-white transition-colors">UK Visa Pass</Link>
              <Link to={ROUTES.BRAZIL_SHORT_STAY} className="block hover:text-white transition-colors">Brazil eVisa</Link>
              <p>Passport Renewal</p>
              <p>Custom Itineraries</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-blue-200">+1 (877) 622-7278</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-blue-200">booking@oneglobaltrip.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="text-blue-200">San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-300">
          <p>&copy; 2024 One Global Trip. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
