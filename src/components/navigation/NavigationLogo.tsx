
import { Link } from 'react-router-dom';

interface NavigationLogoProps {
  textColor?: string;
}

const NavigationLogo = ({ textColor }: NavigationLogoProps) => {
  return (
    <div className="flex items-center">
      <Link to="/" className="flex-shrink-0 flex items-center">
        <img 
          src="/lovable-uploads/5b4dba4f-5616-4525-b9e3-909656247d46.png" 
          alt="One Global Trip" 
          className="h-10 w-auto"
        />
      </Link>
    </div>
  );
};

export default NavigationLogo;
