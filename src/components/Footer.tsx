
import { Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/b3a89cf1-b7be-4c8e-be8f-774de3f62929.png" 
                alt="One Global Trip" 
                className="h-8 w-auto"
              />
              <span className="font-bold text-lg">One Global Trip</span>
            </div>
            <p className="text-blue-200">Luxury European travel experiences with guaranteed visa assistance.</p>
            
            {/* Founders */}
            <div className="pt-4">
              <p className="text-sm text-blue-200 mb-2">Founded by Camron & Zuku</p>
              <p className="text-xs text-blue-300">U.S-based, travel-obsessed</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-blue-200 hover:text-white transition-colors">Home</Link>
              <Link to="/packages" className="block text-blue-200 hover:text-white transition-colors">Packages</Link>
              <Link to="/visas" className="block text-blue-200 hover:text-white transition-colors">Visas</Link>
              <Link to="/get-started" className="block text-blue-200 hover:text-white transition-colors">Get Started</Link>
              <Link to="/booking" className="block text-blue-200 hover:text-white transition-colors">Book Now</Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <div className="space-y-2 text-blue-200">
              <p>Schengen Visa Pack</p>
              <p>UK Visa Pass</p>
              <p>Brazil eVisa</p>
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
                <span className="text-blue-200">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-blue-200">hello@oneglobaltrip.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="text-blue-200">Dallas, Texas</span>
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
