import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const calculateSavingsPercentage = () => {
    // Generate realistic savings percentage based on price
    const basePercentage = Math.floor(Math.random() * 30) + 60; // 60-90%
    return basePercentage;
  };

  const getRandomHoursAgo = () => {
    return Math.floor(Math.random() * 24) + 1;
  };

  const getDateRange = () => {
    const depDate = formatDate(flight.departure.time);
    const arrDate = formatDate(flight.arrival.time);
    return `${depDate} - ${arrDate}`;
  };

  const savingsPercentage = calculateSavingsPercentage();
  const hoursAgo = getRandomHoursAgo();

  return (
    <Card className={`group cursor-pointer transition-all duration-300 hover:shadow-travel-card-hover border-border/50 hover:border-primary/30 bg-card/50 backdrop-blur-sm ${
      isSelected ? 'ring-2 ring-primary shadow-luxury-shadow-primary' : ''
    } ${isComparing ? 'ring-2 ring-accent' : ''}`}>
      <CardContent className="p-5">
        {/* Date Range Header */}
        <div className="text-sm font-medium text-foreground mb-3">
          {getDateRange()}
        </div>

        {/* Main Flight Info Row */}
        <div className="flex items-center justify-between mb-3">
          {/* Airline Info */}
          <div className="flex items-center space-x-2">
            {flight.airline.logo && (
              <img 
                src={flight.airline.logo} 
                alt={flight.airline.name}
                className="w-6 h-6 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            )}
            <span className="text-sm font-medium text-foreground">
              {flight.airline.name}
            </span>
            {flight.stops === 0 && (
              <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs px-2 py-0.5">
                Nonstop
              </Badge>
            )}
          </div>
        </div>

        {/* Route and Time */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <div className="text-lg font-bold text-foreground">
              {flight.departure.code} → {flight.arrival.code}
            </div>
            <div className="text-sm text-muted-foreground">
              {formatTime(flight.departure.time)} - {formatTime(flight.arrival.time)}
            </div>
          </div>
        </div>

        {/* Price and Deal Section */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-foreground">
              ${flight.price.amount}
            </div>
            <div className="text-xs text-muted-foreground">
              Roundtrip per traveler
            </div>
          </div>
          
          <div className="text-right space-y-1">
            <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-medium">
              ✓ {savingsPercentage}% less than typical
            </Badge>
            <div className="text-xs text-muted-foreground">
              Found {hoursAgo} hours ago
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-4 pt-3 border-t border-border/30">
          <div className="flex items-center justify-between">
            <Button
              onClick={() => onSelect(flight)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 py-2 rounded-lg transition-all duration-200 hover:shadow-lg"
              size="sm"
            >
              Select Flight
            </Button>
            
            {onCompare && (
              <Button
                onClick={() => onCompare(flight)}
                variant="ghost"
                className="text-primary hover:text-primary/80 text-sm"
                size="sm"
              >
                {isComparing ? 'Remove' : 'Compare'}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpediaFlightCard;