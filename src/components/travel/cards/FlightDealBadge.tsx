import React from 'react';
import { Badge } from '@/components/ui/badge';

interface FlightDealBadgeProps {
  savings?: number;
  percentage?: number;
  dealType?: 'typical' | 'great' | 'excellent';
  hoursAgo?: number;
}

const FlightDealBadge: React.FC<FlightDealBadgeProps> = ({
  savings,
  percentage = 70,
  dealType = 'typical',
  hoursAgo = 4
}) => {
  const getBadgeText = () => {
    if (savings) {
      return `$${savings} less than typical`;
    }
    return `${percentage}% less than typical`;
  };

  const getBadgeVariant = () => {
    switch (dealType) {
      case 'excellent':
        return 'default'; // Green
      case 'great':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-1">
      <Badge 
        variant={getBadgeVariant()} 
        className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-medium px-2 py-1"
      >
        ✓ {getBadgeText()}
      </Badge>
      <p className="text-xs text-muted-foreground">
        Found {hoursAgo} hours ago
      </p>
    </div>
  );
};

export default FlightDealBadge;