
import { Link } from 'react-router-dom';

const NavigationLogo = () => {
  return (
    <div className="flex items-center">
      <Link to="/" className="flex-shrink-0 flex items-center">
        <span className="text-xl font-bold gradient-text-primary">One Global Trip</span>
      </Link>
    </div>
  );
};

export default NavigationLogo;
