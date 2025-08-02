
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
  price: number | string | null;
  period?: string;
  features: PricingFeature[];
  badge?: string;
  badgeColor?: string;
  popular?: boolean;
  enterprise?: boolean;
  contactSales?: boolean;
  customPrice?: string;
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
  enterprise = false,
  contactSales = false,
  customPrice,
  onSelect,
  buttonText = 'Get Started',
  className = ''
}: PricingCardProps) => {
  const cardClasses = enterprise 
    ? 'relative overflow-hidden border-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white shadow-2xl scale-105 transform' 
    : `relative overflow-hidden ${popular ? 'border-blue-500 border-2 shadow-lg' : 'border border-gray-200'} bg-white`;

  const textClasses = enterprise ? 'text-white' : '';
  const subtitleClasses = enterprise ? 'text-gray-200' : 'text-gray-600';
  const priceClasses = enterprise ? 'text-white' : 'text-gray-900';
  const periodClasses = enterprise ? 'text-gray-300' : 'text-gray-500';

  return (
    <Card className={`${cardClasses} ${className}`}>
      {badge && (
        <Badge className={`absolute top-4 right-4 z-10 ${badgeColor} text-white`}>
          {badge}
        </Badge>
      )}
      
      {popular && !enterprise && (
        <div className="bg-blue-500 text-white text-center py-2 text-sm font-semibold">
          Most Popular
        </div>
      )}
      
      <CardHeader className="text-center">
        <CardTitle className={`text-2xl font-bold ${textClasses}`}>{title}</CardTitle>
        {subtitle && <p className={subtitleClasses}>{subtitle}</p>}
        <div className="mt-4">
          {contactSales ? (
            <div className="text-center">
              <span className={`text-3xl font-bold ${priceClasses}`}>{customPrice}</span>
              <p className={`text-sm mt-2 ${periodClasses}`}>Custom pricing for your organization</p>
            </div>
          ) : (
            <>
              <span className={`text-4xl font-bold ${priceClasses}`}>${price}</span>
              {period && <span className={`${periodClasses} ml-1`}>{period}</span>}
            </>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              {feature.included ? (
                <Check className={`h-5 w-5 mr-3 mt-0.5 flex-shrink-0 ${enterprise ? 'text-emerald-400' : 'text-green-500'}`} />
              ) : (
                <X className={`h-5 w-5 mr-3 mt-0.5 flex-shrink-0 ${enterprise ? 'text-gray-400' : 'text-gray-400'}`} />
              )}
              <div>
                <span className={feature.included ? (enterprise ? 'text-white' : 'text-gray-900') : (enterprise ? 'text-gray-300' : 'text-gray-500')}>
                  {feature.name}
                </span>
                {feature.description && (
                  <p className={`text-sm mt-1 ${enterprise ? 'text-gray-300' : 'text-gray-500'}`}>{feature.description}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
        
        {enterprise && (
          <div className="mb-6 p-4 bg-white/10 rounded-lg border border-white/20">
            <p className="text-sm text-gray-200 italic">
              "We cut corporate travel chaos in half while boosting traveler satisfaction by 3x."
            </p>
          </div>
        )}
        
        <Button 
          onClick={onSelect}
          className={enterprise 
            ? 'w-full bg-white text-slate-900 hover:bg-gray-100 font-semibold py-3 text-lg' 
            : `w-full ${popular ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}`}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PricingCard;
