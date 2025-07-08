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
      <section id={id} className={`py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden ${className}`}>
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-purple-50/30"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-100/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6 leading-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">{subtitle}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-16">
            {options.map((option, index) => (
              <Card 
                key={option.id} 
                className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer relative bg-white/80 backdrop-blur-sm hover:scale-105 animate-scale-in" 
                style={{ animationDelay: `${index * 0.1}s` }} 
                onClick={() => navigate(option.route)}
              >
                {option.badge && (
                  <div className="absolute top-4 right-4 z-20">
                    <span className={`${option.badgeColor || 'bg-orange-500'} text-white px-3 py-1.5 text-sm font-bold rounded-full shadow-lg animate-pulse`}>
                      {option.badge}
                    </span>
                  </div>
                )}
                
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={option.image} 
                    alt={option.alt} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Enhanced features list */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <ul className="space-y-2">
                      {option.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-white/90 text-sm">
                          <div className="w-1.5 h-1.5 bg-white rounded-full mr-3 flex-shrink-0"></div>
                          <span className="font-medium backdrop-blur-sm bg-black/20 px-2 py-1 rounded-full">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <CardHeader className="pb-4 pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                        {option.title}
                      </CardTitle>
                      <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">
                        {option.subtitle}
                      </p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {option.price}
                      </p>
                      {option.priceNote && (
                        <p className="text-xs text-emerald-600 font-semibold mt-1 bg-emerald-50 px-2 py-1 rounded-full">
                          {option.priceNote}
                        </p>
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0 pb-6">
                  <p className="text-gray-600 mb-6 leading-relaxed">{option.description}</p>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    Start Application
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <div className="bg-gradient-to-r from-blue-50 via-white to-purple-50 rounded-2xl p-10 max-w-4xl mx-auto shadow-lg border border-gray-100/50 backdrop-blur-sm">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Need Expert Guidance?</h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Our travel experts have successfully processed over <span className="font-bold text-blue-600">10,000</span> visa applications with a <span className="font-bold text-emerald-600">99% success rate</span>.
              </p>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" 
                onClick={handleConsultation}
              >
                <Calendar className="h-5 w-5 mr-3" />
                Book Free 30-Min Consultation
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
