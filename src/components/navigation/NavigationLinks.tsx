
import { Link, useLocation } from 'react-router-dom';

const NavigationLinks = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const linkClass = (path: string) => 
    `px-3 py-2 text-sm font-medium transition-all duration-200 ${
      isActive(path) 
        ? 'text-deep-blue-900 border-b-2 border-deep-blue-900' 
        : 'text-gray-700 hover:text-deep-blue-900 hover:scale-105'
    }`;

  return (
    <div className="hidden md:flex items-center space-x-6">
      <Link to="/" className={linkClass('/')}>
        Home
      </Link>
      <Link to="/packages" className={linkClass('/packages')}>
        Packages
      </Link>
      <Link to="/visas" className={linkClass('/visas')}>
        Visas
      </Link>
      <Link to="/contact" className={linkClass('/contact')}>
        Contact
      </Link>
    </div>
  );
};

export default NavigationLinks;
