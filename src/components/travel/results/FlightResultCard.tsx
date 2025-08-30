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
    <Card className={`card-luxury group transition-all duration-500 hover:scale-[1.02] ${
      isSelected ? 'ring-2 ring-primary/50 shadow-luxury-primary' : ''
    }`}>
      <CardContent className="p-6 relative overflow-hidden">
        {/* Premium Header with Gradient */}
        <div className="flex items-center justify-between mb-6 relative">
          <div className="flex items-center space-x-4">
            {flight.airline.logo ? (
              <img 
                src={flight.airline.logo} 
                alt={flight.airline.name}
                className="w-12 h-12 object-contain rounded-lg p-2 bg-white shadow-sm"
              />
            ) : (
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                <Plane className="w-6 h-6 text-primary" />
              </div>
            )}
            <div>
              <h3 className="font-bold text-lg text-foreground">{flight.airline.name}</h3>
              <p className="text-sm text-muted-foreground font-medium">{flight.airline.code}</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-3xl font-black text-primary mb-1">
              {formatPrice(flight.price.amount, flight.price.currency)}
            </div>
            <Badge variant="secondary" className="bg-gradient-to-r from-primary/10 to-accent/10 text-primary font-semibold">
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

        {/* Enhanced Flight Details */}
        <div className="grid grid-cols-3 gap-4 mt-6 mb-6 p-4 bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl">
          <div className="flex flex-col items-center space-y-1">
            <Clock className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-foreground">{flight.duration}</span>
            <span className="text-xs text-muted-foreground">Duration</span>
          </div>
          
          <div className="flex flex-col items-center space-y-1">
            <Plane className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-foreground">{getStopsText(flight.stops)}</span>
            <span className="text-xs text-muted-foreground">Stops</span>
          </div>

          <div className="flex flex-col items-center space-y-1">
            <Calendar className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-foreground">{flight.availability}</span>
            <span className="text-xs text-muted-foreground">Seats Left</span>
          </div>
        </div>

        {flight.aircraft && (
          <div className="flex items-center justify-center space-x-2 mb-4 p-2 bg-accent/10 rounded-lg">
            <Users className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">{flight.aircraft}</span>
          </div>
        )}

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

        {/* Premium Action Buttons */}
        <div className="flex space-x-3 mt-6">
          <Button 
            onClick={() => onSelect(flight)}
            className={`flex-1 font-bold py-3 rounded-xl transition-all duration-300 ${
              isSelected 
                ? 'bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg' 
                : 'bg-gradient-to-r from-primary/10 to-accent/10 text-primary border-2 border-primary/20 hover:bg-gradient-to-r hover:from-primary hover:to-primary/80 hover:text-white'
            }`}
          >
            {isSelected ? '✓ Flight Selected' : 'Select Flight'}
          </Button>
          
          {onCompare && (
            <Button 
              onClick={() => onCompare(flight)}
              variant="outline"
              size="sm"
              className={`border-2 rounded-xl font-semibold transition-all duration-300 ${
                isComparing 
                  ? 'bg-accent/20 border-accent text-accent' 
                  : 'border-muted-foreground/30 hover:border-accent hover:text-accent'
              }`}
            >
              {isComparing ? '✓ Added' : 'Compare'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightResultCard;