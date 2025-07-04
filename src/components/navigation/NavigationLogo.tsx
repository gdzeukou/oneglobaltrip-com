
import { Link } from 'react-router-dom';

interface NavigationLogoProps {
  textColor?: string;
}

const NavigationLogo = ({ textColor }: NavigationLogoProps) => {
  return (
    <div className="flex items-center">
      <Link to="/" className="flex-shrink-0 flex items-center">
        <span className={`text-xl font-bold gradient-text-primary ${textColor || ''}`}>One Global Trip</span>
      </Link>
    </div>
  );
};

export default NavigationLogo;
