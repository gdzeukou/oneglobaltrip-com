import React from 'react';
import { Clock, Plane, Users, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import FlightTimeline from './FlightTimeline';

export interface FlightResult {
  id: string;
  airline: {
    code: string;
    name: string;
    logo?: string;
  };
  departure: {
    airport: string;
    code: string;
    time: string;
    terminal?: string;
  };
  arrival: {
    airport: string;
    code: string;
    time: string;
    terminal?: string;
  };
  duration: string;
  stops: number;
  layovers?: Array<{
    airport: string;
    code: string;
    duration: string;
  }>;
  price: {
    amount: number;
    currency: string;
  };
  class: string;
  aircraft?: string;
  availability: number;
}

interface FlightResultCardProps {
  flight: FlightResult;
  onSelect: (flight: FlightResult) => void;
  onCompare?: (flight: FlightResult) => void;
  isSelected?: boolean;
  isComparing?: boolean;
}

const FlightResultCard: React.FC<FlightResultCardProps> = ({
  flight,
  onSelect,
  onCompare,
  isSelected = false,
  isComparing = false
}) => {
  const formatTime = (time: string) => {
    return new Date(time).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const getStopsText = (stops: number) => {
    if (stops === 0) return 'Non-stop';
    if (stops === 1) return '1 Stop';
    return `${stops} Stops`;
  };

  return (
    <Card className={`group hover:shadow-elegant transition-all duration-300 ${
      isSelected ? 'ring-2 ring-primary shadow-glow' : ''
    }`}>
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {flight.airline.logo ? (
              <img 
                src={flight.airline.logo} 
                alt={flight.airline.name}
                className="w-8 h-8 object-contain"
              />
            ) : (
              <div className="w-8 h-8 bg-muted rounded flex items-center justify-center">
                <Plane className="w-4 h-4 text-muted-foreground" />
              </div>
            )}
            <div>
              <h3 className="font-semibold text-foreground">{flight.airline.name}</h3>
              <p className="text-sm text-muted-foreground">{flight.airline.code}</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">
              {formatPrice(flight.price.amount, flight.price.currency)}
            </div>
            <Badge variant="outline" className="text-xs">
              {flight.class}
            </Badge>
          </div>
        </div>

        {/* Flight Timeline */}
        <FlightTimeline 
          departure={flight.departure}
          arrival={flight.arrival}
          layovers={flight.layovers}
          duration={flight.duration}
        />

        {/* Flight Details */}
        <div className="flex items-center justify-between mt-4 mb-4">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{flight.duration}</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Plane className="w-4 h-4" />
              <span>{getStopsText(flight.stops)}</span>
            </div>

            {flight.aircraft && (
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{flight.aircraft}</span>
              </div>
            )}
          </div>

          <div className="text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{flight.availability} seats left</span>
            </div>
          </div>
        </div>

        {/* Layover Information */}
        {flight.layovers && flight.layovers.length > 0 && (
          <div className="mb-4 p-3 bg-muted/30 rounded-lg">
            <p className="text-sm font-medium text-foreground mb-2">Layovers:</p>
            <div className="space-y-1">
              {flight.layovers.map((layover, index) => (
                <div key={index} className="text-sm text-muted-foreground">
                  {layover.airport} ({layover.code}) - {layover.duration}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button 
            onClick={() => onSelect(flight)}
            className="flex-1"
            variant={isSelected ? "default" : "outline"}
          >
            {isSelected ? 'Selected' : 'Select Flight'}
          </Button>
          
          {onCompare && (
            <Button 
              onClick={() => onCompare(flight)}
              variant="ghost"
              size="sm"
              className={isComparing ? 'bg-secondary' : ''}
            >
              {isComparing ? 'Remove' : 'Compare'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightResultCard;