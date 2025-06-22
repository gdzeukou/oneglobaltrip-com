
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DestinationStepProps {
  value: string;
  onChange: (value: string) => void;
}

const countries = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France',
  'Spain', 'Italy', 'Netherlands', 'Portugal', 'Norway', 'Denmark', 'Finland',
  'Switzerland', 'Brazil', 'Nigeria', 'India', 'UAE', 'Schengen Area'
];

const DestinationStep = ({ value, onChange }: DestinationStepProps) => {
  return (
    <div className="space-y-4">
      <Label className="text-lg font-semibold">Primary Destination Country</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select destination country" />
        </SelectTrigger>
        <SelectContent>
          {countries.map((country) => (
            <SelectItem key={country} value={country}>{country}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DestinationStep;
