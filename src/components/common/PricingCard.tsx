
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

interface PricingFeature {
  name: string;
  included: boolean;
  description?: string;
}

interface PricingCardProps {
  title: string;
  subtitle?: string;
  price: number | string;
  period?: string;
  features: PricingFeature[];
  badge?: string;
  badgeColor?: string;
  popular?: boolean;
  onSelect: () => void;
  buttonText?: string;
  className?: string;
}

const PricingCard = ({
  title,
  subtitle,
  price,
  period = '',
  features,
  badge,
  badgeColor = 'bg-orange-500',
  popular = false,
  onSelect,
  buttonText = 'Get Started',
  className = ''
}: PricingCardProps) => {
  return (
    <Card className={`relative overflow-hidden ${popular ? 'border-blue-500 border-2 shadow-lg' : ''} ${className}`}>
      {badge && (
        <Badge className={`absolute top-4 right-4 z-10 ${badgeColor} text-white`}>
          {badge}
        </Badge>
      )}
      
      {popular && (
        <div className="bg-blue-500 text-white text-center py-2 text-sm font-semibold">
          Most Popular
        </div>
      )}
      
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        {subtitle && <p className="text-gray-600">{subtitle}</p>}
        <div className="mt-4">
          <span className="text-4xl font-bold">${price}</span>
          {period && <span className="text-gray-500 ml-1">{period}</span>}
        </div>
      </CardHeader>
      
      <CardContent>
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              {feature.included ? (
                <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              ) : (
                <X className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
              )}
              <div>
                <span className={feature.included ? 'text-gray-900' : 'text-gray-500'}>
                  {feature.name}
                </span>
                {feature.description && (
                  <p className="text-sm text-gray-500 mt-1">{feature.description}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
        
        <Button 
          onClick={onSelect}
          className={`w-full ${popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PricingCard;
