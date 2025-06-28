
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface VisaCardProps {
  id: string;
  name: string;
  tagline?: string;
  description: string;
  price: number;
  image: string;
  promo?: string;
  route: string;
  features?: string[];
  size?: 'small' | 'medium' | 'large';
  showDetails?: boolean;
}

const VisaCard = ({
  id,
  name,
  tagline,
  description,
  price,
  image,
  promo,
  route,
  features = ['24/7 AI assistant', 'Expedited appointments', 'Document review'],
  size = 'medium',
  showDetails = true
}: VisaCardProps) => {
  const navigate = useNavigate();

  const cardClasses = {
    small: 'h-auto',
    medium: 'h-auto',
    large: 'h-auto min-h-[500px]'
  };

  const imageClasses = {
    small: 'h-32',
    medium: 'h-48',
    large: 'h-64'
  };

  return (
    <Card className={`overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 relative ${cardClasses[size]}`}>
      {/* Promo Badge */}
      {promo && (
        <Badge className="absolute top-4 right-4 z-10 bg-orange-500 text-white">
          {promo}
        </Badge>
      )}
      
      {/* Image */}
      <div className={`relative ${imageClasses[size]}`}>
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Features overlay for small cards */}
        {size === 'small' && features && (
          <div className="absolute bottom-2 left-2">
            <div className="flex flex-wrap gap-1">
              {features.slice(0, 2).map((feature, idx) => (
                <span key={idx} className="text-xs bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full">
                  {feature.replace('• ', '')}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Content */}
      <CardContent className={size === 'small' ? 'p-4' : 'p-6'}>
        <h3 className={`font-bold mb-2 text-gray-900 ${size === 'small' ? 'text-sm' : 'text-xl'}`}>
          {name}
        </h3>
        
        {size !== 'small' && <div className="h-px bg-gray-200 mb-4" />}
        
        <div className="mb-4">
          {tagline && (
            <p className={`font-semibold text-orange-600 mb-2 ${size === 'small' ? 'text-xs' : 'text-sm'}`}>
              {tagline}
            </p>
          )}
          <p className={`text-gray-600 mb-4 ${size === 'small' ? 'text-xs' : 'text-sm'}`}>
            {description}
          </p>
          
          {/* Features list for medium/large cards */}
          {size !== 'small' && features && (
            <ul className="text-sm text-gray-600 space-y-1">
              {features.map((feature, idx) => (
                <li key={idx}>{feature.startsWith('•') ? feature : `• ${feature}`}</li>
              ))}
            </ul>
          )}
        </div>
        
        {/* Price and Actions */}
        <div className={`flex items-center justify-between mb-4 ${size === 'small' ? 'text-sm' : ''}`}>
          <span className={`font-bold text-gray-900 ${size === 'small' ? 'text-lg' : 'text-2xl'}`}>
            ${price}
          </span>
          <span className={`text-gray-500 ${size === 'small' ? 'text-xs' : 'text-sm'}`}>
            starting from
          </span>
        </div>
        
        <Button 
          className={`w-full mb-3 rounded-full ${size === 'small' ? 'text-xs py-2' : ''}`}
          style={{ backgroundColor: '#FF6B35' }}
          onClick={() => navigate(route)}
        >
          {size === 'small' ? 'Apply Now' : 'Start Application'}
        </Button>
        
        {showDetails && size !== 'small' && (
          <Button variant="ghost" size="sm" className="w-full text-gray-600">
            Details
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default VisaCard;
