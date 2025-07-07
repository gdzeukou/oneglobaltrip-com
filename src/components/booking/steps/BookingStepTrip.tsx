
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { isPassportValidForTravel } from '@/utils/dateHelpers';

interface TripData {
  nationality: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  travelers: number;
  passportExpiry?: string;
}

interface BookingStepTripProps {
  data?: TripData;
  onComplete: (data: { trip: TripData }) => void;
  onBack: () => void;
}

const BookingStepTrip = ({ data, onComplete, onBack }: BookingStepTripProps) => {
  const [formData, setFormData] = useState<TripData>({
    nationality: data?.nationality || '',
    destination: data?.destination || '',
    departureDate: data?.departureDate || '',
    returnDate: data?.returnDate || '',
    travelers: data?.travelers || 1,
    passportExpiry: data?.passportExpiry || ''
  });
  
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (field: string, value: string | number) => {
    let error = '';
    
    switch (field) {
      case 'nationality':
        if (!value) error = 'Please select your nationality';
        break;
      case 'destination':
        if (!value) error = 'Please select your destination';
        break;
      case 'departureDate':
        if (!value) {
          error = 'Please select departure date';
        } else {
          const depDate = new Date(value as string);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          
          if (depDate < today) {
            error = 'Departure date cannot be in the past';
          }
        }
        break;
      case 'returnDate':
        if (value && formData.departureDate) {
          const depDate = new Date(formData.departureDate);
          const retDate = new Date(value as string);
          if (retDate <= depDate) {
            error = 'Return date must be after departure date';
          }
        }
        break;
      case 'travelers':
        if (!value || (value as number) < 1) {
          error = 'At least 1 traveler is required';
        }
        break;
      case 'passportExpiry':
        if (value && formData.departureDate) {
          if (!isPassportValidForTravel(value as string, formData.departureDate)) {
            error = 'Passport must be valid for at least 3 months beyond your departure date';
          }
        }
        break;
    }
    
    return error;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched: Record<string, boolean> = {};
    Object.keys(formData).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);
    
    // Validate all fields
    const newErrors: Record<string, string> = {};
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) newErrors[key] = error;
    });
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      onComplete({ trip: formData });
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field as keyof TripData]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // If field is touched, validate immediately
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
    
    // Special handling for departure date changes - revalidate passport
    if (field === 'departureDate' && formData.passportExpiry && touched.passportExpiry) {
      const passportError = validateField('passportExpiry', formData.passportExpiry);
      setErrors(prev => ({ ...prev, passportExpiry: passportError }));
    }
  };

  const nationalities = [
    'United States', 'United Kingdom', 'Canada', 'Australia',
    'Germany', 'France', 'Italy', 'Spain', 'Netherlands',
    'Sweden', 'Norway', 'Denmark', 'Japan', 'South Korea',
    'India', 'Nigeria', 'South Africa', 'Brazil', 'Mexico'
  ];

  const destinations = [
    'France', 'Germany', 'Italy', 'Spain', 'Netherlands',
    'United Kingdom', 'Japan', 'Australia', 'Canada',
    'Switzerland', 'Austria', 'Belgium', 'Portugal'
  ];

  return (
    <div className="max-w-2xl mx-auto p-4 lg:p-6">
      <div className="mb-6 lg:mb-8">
        <h2 className="text-xl lg:text-2xl font-bold mb-2">Trip Details</h2>
        <p className="text-sm lg:text-base text-muted-foreground">Tell us about your travel plans.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          <div>
            <Label htmlFor="nationality" className="text-sm lg:text-base">Nationality *</Label>
            <Select 
              value={formData.nationality} 
              onValueChange={(value) => handleChange('nationality', value)}
            >
              <SelectTrigger className={`mt-1 ${touched.nationality && errors.nationality ? 'border-destructive' : ''}`}>
                <SelectValue placeholder="Select your nationality" />
              </SelectTrigger>
              <SelectContent>
                {nationalities.map(nationality => (
                  <SelectItem key={nationality} value={nationality}>
                    {nationality}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {touched.nationality && errors.nationality && (
              <p className="text-xs lg:text-sm text-destructive mt-1">{errors.nationality}</p>
            )}
          </div>

          <div>
            <Label htmlFor="destination" className="text-sm lg:text-base">Destination *</Label>
            <Select 
              value={formData.destination} 
              onValueChange={(value) => handleChange('destination', value)}
            >
              <SelectTrigger className={`mt-1 ${touched.destination && errors.destination ? 'border-destructive' : ''}`}>
                <SelectValue placeholder="Select destination" />
              </SelectTrigger>
              <SelectContent>
                {destinations.map(destination => (
                  <SelectItem key={destination} value={destination}>
                    {destination}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {touched.destination && errors.destination && (
              <p className="text-xs lg:text-sm text-destructive mt-1">{errors.destination}</p>
            )}
          </div>

          <div>
            <Label htmlFor="departureDate" className="text-sm lg:text-base">Departure Date *</Label>
            <Input
              id="departureDate"
              type="date"
              value={formData.departureDate}
              onChange={(e) => handleChange('departureDate', e.target.value)}
              onBlur={() => handleBlur('departureDate')}
              className={`mt-1 ${touched.departureDate && errors.departureDate ? 'border-destructive' : ''}`}
              required
            />
            {touched.departureDate && errors.departureDate && (
              <p className="text-xs lg:text-sm text-destructive mt-1">{errors.departureDate}</p>
            )}
          </div>

          <div>
            <Label htmlFor="returnDate" className="text-sm lg:text-base">Return Date</Label>
            <Input
              id="returnDate"
              type="date"
              value={formData.returnDate}
              onChange={(e) => handleChange('returnDate', e.target.value)}
              onBlur={() => handleBlur('returnDate')}
              className={`mt-1 ${touched.returnDate && errors.returnDate ? 'border-destructive' : ''}`}
            />
            {touched.returnDate && errors.returnDate && (
              <p className="text-xs lg:text-sm text-destructive mt-1">{errors.returnDate}</p>
            )}
          </div>

          <div>
            <Label htmlFor="travelers" className="text-sm lg:text-base">Number of Travelers *</Label>
            <Select 
              value={formData.travelers.toString()} 
              onValueChange={(value) => handleChange('travelers', parseInt(value))}
            >
              <SelectTrigger className={`mt-1 ${touched.travelers && errors.travelers ? 'border-destructive' : ''}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1,2,3,4,5,6,7,8].map(num => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? 'Traveler' : 'Travelers'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {touched.travelers && errors.travelers && (
              <p className="text-xs lg:text-sm text-destructive mt-1">{errors.travelers}</p>
            )}
          </div>

          <div>
            <Label htmlFor="passportExpiry" className="text-sm lg:text-base">Passport Expiry Date</Label>
            <Input
              id="passportExpiry"
              type="date"
              value={formData.passportExpiry}
              onChange={(e) => handleChange('passportExpiry', e.target.value)}
              onBlur={() => handleBlur('passportExpiry')}
              className={`mt-1 ${touched.passportExpiry && errors.passportExpiry ? 'border-destructive' : ''}`}
            />
            {touched.passportExpiry && errors.passportExpiry && (
              <p className="text-xs lg:text-sm text-destructive mt-1">{errors.passportExpiry}</p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Your passport should be valid for at least 3 months beyond your departure date
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 pt-4 lg:pt-6">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onBack}
            className="w-full sm:w-auto order-2 sm:order-1"
          >
            Back
          </Button>
          <Button 
            type="submit" 
            className="flex-1 order-1 sm:order-2"
          >
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookingStepTrip;
