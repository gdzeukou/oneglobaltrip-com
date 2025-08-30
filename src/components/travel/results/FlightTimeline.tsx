import React from 'react';
import { Plane, Circle } from 'lucide-react';

interface TimelineProps {
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
  layovers?: Array<{
    airport: string;
    code: string;
    duration: string;
  }>;
  duration: string;
}

const FlightTimeline: React.FC<TimelineProps> = ({
  departure,
  arrival,
  layovers = [],
  duration
}) => {
  const formatTime = (time: string) => {
    return new Date(time).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const totalSegments = layovers.length + 1;

  return (
    <div className="relative">
      {/* Main Timeline Container */}
      <div className="flex items-center justify-between relative">
        {/* Departure */}
        <div className="flex flex-col items-center text-center min-w-0 flex-1">
          <div className="text-lg font-bold text-foreground">
            {formatTime(departure.time)}
          </div>
          <div className="text-sm font-medium text-foreground">
            {departure.code}
          </div>
          <div className="text-xs text-muted-foreground truncate max-w-full">
            {departure.airport}
          </div>
          {departure.terminal && (
            <div className="text-xs text-muted-foreground">
              Terminal {departure.terminal}
            </div>
          )}
        </div>

        {/* Timeline Line with Stops */}
        <div className="flex-1 mx-4 relative flex items-center">
          {/* Main line */}
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-0.5 bg-gradient-to-r from-primary via-primary to-primary"></div>
          </div>
          
          {/* Flight path */}
          <div className="relative w-full flex items-center justify-between">
            {/* Departure point */}
            <div className="w-3 h-3 bg-primary rounded-full border-2 border-background z-10"></div>
            
            {/* Layover points */}
            {layovers.map((layover, index) => (
              <div key={index} className="flex flex-col items-center relative z-10">
                <div className="w-2 h-2 bg-warning rounded-full border border-background mb-1"></div>
                <div className="absolute top-4 text-xs text-muted-foreground whitespace-nowrap">
                  {layover.code}
                </div>
                <div className="absolute top-6 text-xs text-muted-foreground whitespace-nowrap">
                  {layover.duration}
                </div>
              </div>
            ))}
            
            {/* Arrival point */}
            <div className="w-3 h-3 bg-primary rounded-full border-2 border-background z-10"></div>
          </div>

          {/* Flight icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-background border border-border rounded-full p-1">
              <Plane className="w-3 h-3 text-primary" />
            </div>
          </div>
        </div>

        {/* Arrival */}
        <div className="flex flex-col items-center text-center min-w-0 flex-1">
          <div className="text-lg font-bold text-foreground">
            {formatTime(arrival.time)}
          </div>
          <div className="text-sm font-medium text-foreground">
            {arrival.code}
          </div>
          <div className="text-xs text-muted-foreground truncate max-w-full">
            {arrival.airport}
          </div>
          {arrival.terminal && (
            <div className="text-xs text-muted-foreground">
              Terminal {arrival.terminal}
            </div>
          )}
        </div>
      </div>

      {/* Duration Badge */}
      <div className="flex justify-center mt-2">
        <div className="bg-muted px-2 py-1 rounded-full text-xs text-muted-foreground">
          Total: {duration}
        </div>
      </div>
    </div>
  );
};

export default FlightTimeline;