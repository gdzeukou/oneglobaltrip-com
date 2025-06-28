
import { Button } from '@/components/ui/button';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  backgroundGradient?: string;
  ctaButton?: {
    text: string;
    onClick: () => void;
  };
  className?: string;
  children?: React.ReactNode;
}

const PageHeader = ({
  title,
  subtitle,
  description,
  backgroundImage,
  backgroundGradient = 'bg-gradient-to-br from-slate-50 via-white to-blue-50',
  ctaButton,
  className = '',
  children
}: PageHeaderProps) => {
  const backgroundStyle = backgroundImage 
    ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : {};

  return (
    <section 
      className={`pt-24 pb-16 relative overflow-hidden ${backgroundImage ? 'text-white' : backgroundGradient} ${className}`}
      style={backgroundStyle}
    >
      {backgroundImage && (
        <div className="absolute inset-0 bg-black/40" />
      )}
      
      <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
          {title}
        </h1>
        
        {subtitle && (
          <p className="text-xl md:text-2xl mb-4 max-w-3xl mx-auto opacity-90">
            {subtitle}
          </p>
        )}
        
        {description && (
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-80">
            {description}
          </p>
        )}
        
        {ctaButton && (
          <Button 
            onClick={ctaButton.onClick}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in"
          >
            {ctaButton.text}
          </Button>
        )}
        
        {children}
      </div>
    </section>
  );
};

export default PageHeader;
