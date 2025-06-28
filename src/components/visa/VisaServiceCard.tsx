
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';

interface VisaServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  price?: string;
  badge?: string;
  onSelect: () => void;
  className?: string;
}

const VisaServiceCard = ({
  title,
  description,
  icon: Icon,
  features,
  price,
  badge,
  onSelect,
  className = ''
}: VisaServiceCardProps) => {
  return (
    <Card className={`relative hover:shadow-lg transition-all duration-300 hover:scale-105 ${className}`}>
      {badge && (
        <Badge className="absolute top-4 right-4 bg-orange-500 text-white">
          {badge}
        </Badge>
      )}
      
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
          <Icon className="h-8 w-8 text-blue-600" />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        {price && (
          <p className="text-2xl font-bold text-blue-600">{price}</p>
        )}
      </CardHeader>
      
      <CardContent>
        <p className="text-gray-600 mb-4">{description}</p>
        
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-gray-700">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              {feature}
            </li>
          ))}
        </ul>
        
        <Button 
          onClick={onSelect}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          Choose This Service
        </Button>
      </CardContent>
    </Card>
  );
};

export default VisaServiceCard;
