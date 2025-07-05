import { useState } from 'react';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format, addDays, isBefore, isAfter } from 'date-fns';

interface SmartDatePickerProps {
  departureValue: string;
  returnValue: string;
  onDepartureChange: (value: string) => void;
  onReturnChange: (value: string) => void;
  departureError?: string;
  returnError?: string;
  className?: string;
}

const SmartDatePicker = ({
  departureValue,
  returnValue,
  onDepartureChange,
  onReturnChange,
  departureError,
  returnError,
  className = ""
}: SmartDatePickerProps) => {
  const [isDepartureOpen, setIsDepartureOpen] = useState(false);
  const [isReturnOpen, setIsReturnOpen] = useState(false);

  const today = new Date();
  const tomorrow = addDays(today, 1);
  
  const departureDate = departureValue ? new Date(departureValue) : undefined;
  const returnDate = returnValue ? new Date(returnValue) : undefined;

  const handleDepartureSelect = (date: Date | undefined) => {
    if (date) {
      const dateString = format(date, 'yyyy-MM-dd');
      onDepartureChange(dateString);
      
      // Auto-adjust return date if it's before departure
      if (returnDate && isBefore(returnDate, date)) {
        const newReturnDate = addDays(date, 1);
        onReturnChange(format(newReturnDate, 'yyyy-MM-dd'));
      }
      
      setIsDepartureOpen(false);
    }
  };

  const handleReturnSelect = (date: Date | undefined) => {
    if (date) {
      const dateString = format(date, 'yyyy-MM-dd');
      onReturnChange(dateString);
      setIsReturnOpen(false);
    }
  };

  const isDateDisabled = (date: Date, type: 'departure' | 'return') => {
    if (type === 'departure') {
      // Departure: disable past dates (must be at least tomorrow)
      return isBefore(date, tomorrow);
    } else {
      // Return: disable dates before departure date
      if (departureDate) {
        return isBefore(date, addDays(departureDate, 1));
      }
      return isBefore(date, tomorrow);
    }
  };

  const getDateModifiers = (date: Date, type: 'departure' | 'return') => {
    const modifiers: Record<string, boolean> = {};
    
    if (isDateDisabled(date, type)) {
      modifiers.disabled = true;
    }
    
    // Highlight weekends differently
    if (date.getDay() === 0 || date.getDay() === 6) {
      modifiers.weekend = true;
    }
    
    return modifiers;
  };

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-4", className)}>
      {/* Departure Date */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-foreground">
          Date of Departure
          <span className="text-destructive ml-1">*</span>
        </Label>
        
        <Popover open={isDepartureOpen} onOpenChange={setIsDepartureOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal h-11 px-3 rounded-lg",
                "border-border hover:border-accent transition-all duration-200",
                "focus:border-accent focus:ring-2 focus:ring-accent/20",
                departureError && "border-destructive hover:border-destructive",
                !departureDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {departureDate ? (
                <span className="flex items-center">
                  {format(departureDate, 'PPP')}
                  <Clock className="ml-2 h-3 w-3 text-muted-foreground" />
                </span>
              ) : (
                <span>Pick departure date</span>
              )}
            </Button>
          </PopoverTrigger>
          
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={departureDate}
              onSelect={handleDepartureSelect}
              disabled={(date) => isDateDisabled(date, 'departure')}
              initialFocus
              className="rounded-md border-0"
              modifiers={{
                disabled: (date) => isDateDisabled(date, 'departure'),
                weekend: (date) => date.getDay() === 0 || date.getDay() === 6
              }}
              modifiersStyles={{
                disabled: { 
                  color: 'hsl(var(--muted-foreground))',
                  backgroundColor: 'hsl(var(--muted))',
                  opacity: 0.5 
                },
                weekend: { 
                  backgroundColor: 'hsl(var(--accent) / 0.1)' 
                }
              }}
            />
            <div className="px-3 pb-3">
              <p className="text-xs text-muted-foreground">
                ℹ️ Departure must be at least 24 hours from now
              </p>
            </div>
          </PopoverContent>
        </Popover>

        {departureError && (
          <p className="text-sm text-destructive flex items-center">
            <span className="animate-pulse mr-1">⚠</span>
            {departureError}
          </p>
        )}
      </div>

      {/* Return Date */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-foreground">
          Date of Return/Exit
          <span className="text-destructive ml-1">*</span>
        </Label>
        
        <Popover open={isReturnOpen} onOpenChange={setIsReturnOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              disabled={!departureDate}
              className={cn(
                "w-full justify-start text-left font-normal h-11 px-3 rounded-lg",
                "border-border hover:border-accent transition-all duration-200",
                "focus:border-accent focus:ring-2 focus:ring-accent/20",
                returnError && "border-destructive hover:border-destructive",
                !returnDate && "text-muted-foreground",
                !departureDate && "opacity-50 cursor-not-allowed"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {returnDate ? (
                <span className="flex items-center">
                  {format(returnDate, 'PPP')}
                  <Clock className="ml-2 h-3 w-3 text-muted-foreground" />
                </span>
              ) : (
                <span>Pick return date</span>
              )}
            </Button>
          </PopoverTrigger>
          
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={returnDate}
              onSelect={handleReturnSelect}
              disabled={(date) => isDateDisabled(date, 'return')}
              initialFocus
              className="rounded-md border-0"
              modifiers={{
                disabled: (date) => isDateDisabled(date, 'return'),
                weekend: (date) => date.getDay() === 0 || date.getDay() === 6
              }}
              modifiersStyles={{
                disabled: { 
                  color: 'hsl(var(--muted-foreground))',
                  backgroundColor: 'hsl(var(--muted))',
                  opacity: 0.5 
                },
                weekend: { 
                  backgroundColor: 'hsl(var(--accent) / 0.1)' 
                }
              }}
            />
            <div className="px-3 pb-3">
              <p className="text-xs text-muted-foreground">
                ℹ️ Return date must be after departure date
              </p>
            </div>
          </PopoverContent>
        </Popover>

        {returnError && (
          <p className="text-sm text-destructive flex items-center">
            <span className="animate-pulse mr-1">⚠</span>
            {returnError}
          </p>
        )}
      </div>
    </div>
  );
};

export default SmartDatePicker;