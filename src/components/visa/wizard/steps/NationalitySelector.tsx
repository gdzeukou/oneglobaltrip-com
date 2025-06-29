
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface NationalitySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const NationalitySelector = ({ value, onChange }: NationalitySelectorProps) => {
  const nationalities = [
    'United States',
    'United Kingdom',
    'Canada',
    'Australia',
    'Germany',
    'France',
    'Italy',
    'Spain',
    'Netherlands',
    'Sweden',
    'Norway',
    'Denmark',
    'Japan',
    'South Korea',
    'India',
    'Nigeria',
    'South Africa',
    'Brazil',
    'Mexico'
  ];

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">Select your nationality:</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choose your nationality" />
        </SelectTrigger>
        <SelectContent>
          {nationalities.map((nationality) => (
            <SelectItem key={nationality} value={nationality}>
              {nationality}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default NationalitySelector;
