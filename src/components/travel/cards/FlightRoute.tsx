import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';

interface Airport {
  code: string;
  name?: string;
  time: string;
}

interface FlightRouteProps {
  departure: Airport;
  arrival: Airport;
  duration: string;
  stops: number;
  airline: {
    name: string;
    logo?: string;
  };
  isNonstop?: boolean;
}

const FlightRoute: React.FC<FlightRouteProps> = ({
  departure,
  arrival,
  duration,
  stops,
  airline,
  isNonstop = true
}) => {
  const formatTime = (timeString: string) => {
    try {
      const date = new Date(timeString);
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: false
      });
    } catch {
      return timeString;
    }
  };

  const formatDate = (timeString: string) => {
    try {
      const date = new Date(timeString);
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return '';
    }
  };

  return (
    <div className="space-y-3">
      {/* Airline and flight type */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {airline.logo && (
            <img 
              src={airline.logo} 
              alt={airline.name}
              className="w-6 h-6 object-contain"
            />
          )}
          <span className="text-sm font-medium text-foreground">
            {airline.name}
          </span>
          {isNonstop && (
            <span className="text-xs text-emerald-600 font-medium">
              • Nonstop
            </span>
          )}
        </div>
      </div>

      {/* Route */}
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="text-sm text-muted-foreground">
            {formatDate(departure.time)}
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">
                {departure.code}
              </div>
              <div className="text-sm text-muted-foreground">
                {formatTime(departure.time)}
              </div>
            </div>
            
            <div className="flex-1 flex items-center justify-center">
              <ArrowRight className="w-4 h-4 text-muted-foreground mx-2" />
            </div>
            
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">
                {arrival.code}
              </div>
              <div className="text-sm text-muted-foreground">
                {formatTime(arrival.time)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Duration and stops */}
      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
        <div className="flex items-center space-x-1">
          <Clock className="w-3 h-3" />
          <span>{duration}</span>
        </div>
        {stops > 0 && (
          <span>{stops} stop{stops > 1 ? 's' : ''}</span>
        )}
      </div>
    </div>
  );
};

export default FlightRoute;