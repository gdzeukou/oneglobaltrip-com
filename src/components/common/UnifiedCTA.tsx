import { ArrowRight, Phone, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

interface CTAOption {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  priceNote?: string;
  image: string;
  alt: string;
  badge?: string;
  badgeColor?: string;
  route: string;
  features: string[];
}

interface UnifiedCTAProps {
  variant: 'main' | 'consultation' | 'footer';
  title: string;
  subtitle?: string;
  description?: string;
  options?: CTAOption[];
  buttonText?: string;
  buttonAction?: () => void;
  className?: string;
  id?: string;
}

const UnifiedCTA = ({
  variant,
  title,
  subtitle,
  description,
  options = [],
  buttonText,
  buttonAction,
  className = '',
  id
}: UnifiedCTAProps) => {
  const navigate = useNavigate();

  const handleConsultation = () => {
    window.open(ROUTES.CALENDLY_CONSULTATION, '_blank');
  };

  if (variant === 'main' && options.length > 0) {
    return (
      <section id={id} className={`py-16 bg-white ${className}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl text-gray-900 mb-4 font-extrabold">{title}</h2>
            {subtitle && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
            {options.map((option, index) => (
              <Card 
                key={option.id} 
                className="overflow-hidden hover-lift group cursor-pointer relative card-hover animate-scale-in" 
                style={{ animationDelay: `${index * 0.2}s` }} 
                onClick={() => navigate(option.route)}
              >
                {option.badge && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className={`${option.badgeColor || 'bg-orange-500'} text-white px-3 py-1 text-sm font-bold rounded-full shadow-lg`}>
                      {option.badge}
                    </span>
                  </div>
                )}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={option.image} 
                    alt={option.alt} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="flex flex-wrap gap-2">
                      {option.features.map((feature, idx) => (
                        <span key={idx} className="text-xs bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl text-deep-blue-900">{option.title}</CardTitle>
                      <p className="text-gray-600 text-sm font-medium">{option.subtitle}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-deep-blue-900">{option.price}</p>
                      {option.priceNote && (
                        <p className="text-xs text-emerald-600 font-medium">{option.priceNote}</p>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{option.description}</p>
                  <Button className="w-full bg-gradient-to-r from-deep-blue-900 to-deep-blue-800 hover:from-deep-blue-800 hover:to-deep-blue-700 shadow-lg hover-lift">
                    Start Application
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="bg-gradient-to-r from-blue-50 to-yellow-50 rounded-xl p-8 max-w-3xl mx-auto">
              <p className="text-lg text-gray-600 mb-6">
                Need help choosing the right visa? Our experts have processed over 10,000 successful applications.
              </p>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-deep-blue-800 text-deep-blue-800 hover:bg-deep-blue-800 hover:text-white shadow-lg hover-lift" 
                onClick={handleConsultation}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Book Free Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'consultation') {
    return (
      <section id={id} className={`py-12 bg-gray-50 ${className}`}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">{title}</h2>
          {description && (
            <p className="text-xl mb-8 text-gray-600">{description}</p>
          )}
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={buttonAction || handleConsultation}
          >
            <Phone className="h-5 w-5 mr-2" />
            {buttonText || 'Book Free Consultation'}
          </Button>
        </div>
      </section>
    );
  }

  if (variant === 'footer') {
    return (
      <section id={id} className={`py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden ${className}`}>
        {/* Curved top edge */}
        <div className="absolute top-0 left-0 w-full overflow-hidden">
          <svg 
            className="relative block w-full h-12 fill-white"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path d="M0,0V40c120,30,240,30,360,0s240-30,360,0s240,30,360,0s120-30,120,0V0H0z" />
          </svg>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 mt-8">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          {description && (
            <p className="text-xl mb-8 text-blue-100">{description}</p>
          )}
          <Button 
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 font-bold text-lg px-8 py-4 rounded-full"
            onClick={buttonAction || handleConsultation}
          >
            {buttonText || 'Book Free Consultation'}
          </Button>
        </div>
      </section>
    );
  }

  return null;
};

export default UnifiedCTA;
