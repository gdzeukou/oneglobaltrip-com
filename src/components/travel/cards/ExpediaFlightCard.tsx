import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import FlightRoute from './FlightRoute';
import FlightDealBadge from './FlightDealBadge';
import type { FlightResult } from '@/components/travel/results/FlightResultCard';

interface ExpediaFlightCardProps {
  flight: FlightResult;
  onSelect: (flight: FlightResult) => void;
  onCompare?: (flight: FlightResult) => void;
  isSelected?: boolean;
  isComparing?: boolean;
}

const ExpediaFlightCard: React.FC<ExpediaFlightCardProps> = ({
  flight,
  onSelect,
  onCompare,
  isSelected = false,
  isComparing = false
}) => {
  const calculateSavings = () => {
    // Mock savings calculation based on price
    const typicalPrice = flight.price.amount * 1.3;
    return Math.round(typicalPrice - flight.price.amount);
  };

  const calculateSavingsPercentage = () => {
    const savings = calculateSavings();
    const typicalPrice = flight.price.amount + savings;
    return Math.round((savings / typicalPrice) * 100);
  };

  const getRandomHoursAgo = () => {
    return Math.floor(Math.random() * 12) + 1;
  };

  return (
    <Card className={`group cursor-pointer transition-all duration-200 hover:shadow-elegant border-border/50 hover:border-primary/20 ${
      isSelected ? 'ring-2 ring-primary' : ''
    } ${isComparing ? 'ring-2 ring-accent' : ''}`}>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
          {/* Flight Route - Takes most space */}
          <div className="lg:col-span-2">
            <FlightRoute
              departure={flight.departure}
              arrival={flight.arrival}
              duration={flight.duration}
              stops={flight.stops}
              airline={flight.airline}
              isNonstop={flight.stops === 0}
            />
          </div>

          {/* Price and Deal Badge */}
          <div className="lg:col-span-1 space-y-2">
            <div className="text-right lg:text-left">
              <div className="text-2xl font-bold text-foreground">
                ${flight.price.amount}
              </div>
              <div className="text-sm text-muted-foreground">
                Roundtrip per traveler
              </div>
            </div>
            <FlightDealBadge
              savings={calculateSavings()}
              percentage={calculateSavingsPercentage()}
              hoursAgo={getRandomHoursAgo()}
            />
          </div>

          {/* Action Buttons */}
          <div className="lg:col-span-1 space-y-2">
            <Button
              onClick={() => onSelect(flight)}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
              size="lg"
            >
              Select
            </Button>
            {onCompare && (
              <Button
                onClick={() => onCompare(flight)}
                variant="outline"
                className="w-full text-xs"
                size="sm"
              >
                {isComparing ? 'Remove from Compare' : 'Compare'}
              </Button>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-4 pt-4 border-t border-border/50">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-4">
              {flight.aircraft && (
                <span>Aircraft: {flight.aircraft}</span>
              )}
              <span>Class: {flight.class}</span>
              <span>{flight.availability} seats left</span>
            </div>
            {flight.departure.terminal && (
              <span>
                Departs: Terminal {flight.departure.terminal}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpediaFlightCard;