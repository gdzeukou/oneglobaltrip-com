
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

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
      <Link to={ROUTES.HOME} className={linkClass(ROUTES.HOME)}>
        Home
      </Link>
      <Link to={ROUTES.PACKAGES} className={linkClass(ROUTES.PACKAGES)}>
        Packages
      </Link>
      <Link to={ROUTES.VISAS} className={linkClass(ROUTES.VISAS)}>
        Visas
      </Link>
      <Link to={ROUTES.CONTACT} className={linkClass(ROUTES.CONTACT)}>
        Contact
      </Link>
    </div>
  );
};

export default NavigationLinks;
