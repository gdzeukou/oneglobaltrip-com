
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface TravelPreferencesStepProps {
  departureDate: string;
  accommodationType: string;
  specialRequests: string;
  onDepartureDateChange: (date: string) => void;
  onAccommodationTypeChange: (type: string) => void;
  onSpecialRequestsChange: (requests: string) => void;
}

const TravelPreferencesStep = ({
  departureDate,
  accommodationType,
  specialRequests,
  onDepartureDateChange,
  onAccommodationTypeChange,
  onSpecialRequestsChange
}: TravelPreferencesStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="departureDate">Preferred Departure Date</Label>
        <Input
          id="departureDate"
          type="date"
          value={departureDate}
          onChange={(e) => onDepartureDateChange(e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="accommodationType">Accommodation Preference</Label>
        <select
          id="accommodationType"
          className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
          value={accommodationType}
          onChange={(e) => onAccommodationTypeChange(e.target.value)}
        >
          <option value="standard">Standard (4-star hotels)</option>
          <option value="luxury">Luxury (5-star hotels)</option>
          <option value="boutique">Boutique (Unique properties)</option>
        </select>
      </div>

      <div>
        <Label htmlFor="specialRequests">Special Requests</Label>
        <Textarea
          id="specialRequests"
          placeholder="Any special requests, celebrations, accessibility needs, etc."
          value={specialRequests}
          onChange={(e) => onSpecialRequestsChange(e.target.value)}
          className="mt-1"
        />
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Visa Services Needed</h3>
        <div className="space-y-3">
          {['Schengen Visa Pack ($299)', 'UK Visa Pass ($399)', 'Brazil eVisa ($199)'].map((visa) => (
            <label key={visa} className="flex items-center space-x-3">
              <input type="checkbox" className="rounded border-gray-300" />
              <span>{visa}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelPreferencesStep;
