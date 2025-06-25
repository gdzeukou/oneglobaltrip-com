
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users } from 'lucide-react';

interface Destination {
  country: string;
  purpose: string;
}

interface MultiDestinationHeaderProps {
  nationality: string;
  destinations: Destination[];
}

const MultiDestinationHeader = ({ nationality, destinations }: MultiDestinationHeaderProps) => {
  return (
    <div className="text-center">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        Your Multi-Destination Visa Requirements
      </h3>
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        <Badge variant="outline" className="flex items-center space-x-1">
          <Users className="w-3 h-3" />
          <span>Nationality: {nationality}</span>
        </Badge>
        <Badge variant="outline" className="flex items-center space-x-1">
          <MapPin className="w-3 h-3" />
          <span>{destinations.length} Destinations</span>
        </Badge>
      </div>
    </div>
  );
};

export default MultiDestinationHeader;
