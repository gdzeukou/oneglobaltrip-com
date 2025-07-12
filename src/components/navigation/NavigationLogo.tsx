
import { Link } from 'react-router-dom';

interface NavigationLogoProps {
  textColor?: string;
}

const NavigationLogo = ({ textColor }: NavigationLogoProps) => {
  return (
    <div className="flex items-center">
      <Link to="/" className="flex-shrink-0 flex items-center">
        <img 
          src="/lovable-uploads/b91448b5-fbc8-45b2-93f4-ed24bfa0d28d.png" 
          alt="One Global Trip" 
          className="h-10 w-auto"
        />
      </Link>
    </div>
  );
};

export default NavigationLogo;
