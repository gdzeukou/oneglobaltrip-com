
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { TripDetails } from '@/types/booking';

interface BookingStepTripProps {
  data?: TripDetails;
  onComplete: (data: any) => void;
  onBack: () => void;
}

const BookingStepTrip = ({ data, onComplete, onBack }: BookingStepTripProps) => {
  const [formData, setFormData] = useState<TripDetails>({
    nationality: data?.nationality || '',
    destination: data?.destination || '',
    departureDate: data?.departureDate || '',
    returnDate: data?.returnDate || '',
    travelers: data?.travelers || 1
  });
  const [departureDate, setDepartureDate] = useState<Date | undefined>(
    data?.departureDate ? new Date(data.departureDate) : undefined
  );
  const [returnDate, setReturnDate] = useState<Date | undefined>(
    data?.returnDate ? new Date(data.returnDate) : undefined
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tripData = {
      ...formData,
      departureDate: departureDate ? format(departureDate, 'yyyy-MM-dd') : '',
      returnDate: returnDate ? format(returnDate, 'yyyy-MM-dd') : ''
    };
    onComplete({ trip: tripData });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Trip Details</h2>
        <p className="text-muted-foreground">Tell us about your travel plans.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="nationality">Your Nationality *</Label>
            <Select value={formData.nationality} onValueChange={(value) => setFormData(prev => ({ ...prev, nationality: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select nationality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="au">Australia</SelectItem>
                <SelectItem value="ng">Nigeria</SelectItem>
                <SelectItem value="in">India</SelectItem>
                <SelectItem value="za">South Africa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="destination">Destination Country *</Label>
            <Select value={formData.destination} onValueChange={(value) => setFormData(prev => ({ ...prev, destination: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select destination" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="schengen">Schengen Area</SelectItem>
                <SelectItem value="france">France</SelectItem>
                <SelectItem value="germany">Germany</SelectItem>
                <SelectItem value="italy">Italy</SelectItem>
                <SelectItem value="spain">Spain</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="uae">UAE</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label>Departure Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {departureDate ? format(departureDate, 'PPP') : 'Pick a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={departureDate}
                  onSelect={setDepartureDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label>Return Date (Optional)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {returnDate ? format(returnDate, 'PPP') : 'Pick a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={returnDate}
                  onSelect={setReturnDate}
                  disabled={(date) => date < new Date() || (departureDate && date <= departureDate)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div>
          <Label htmlFor="travelers">Number of Travelers *</Label>
          <Select value={formData.travelers.toString()} onValueChange={(value) => setFormData(prev => ({ ...prev, travelers: parseInt(value) }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <SelectItem key={num} value={num.toString()}>{num} {num === 1 ? 'Traveler' : 'Travelers'}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-4 pt-6">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button type="submit" className="flex-1" disabled={!formData.nationality || !formData.destination || !departureDate}>
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookingStepTrip;
