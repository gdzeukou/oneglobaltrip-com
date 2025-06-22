
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Info } from 'lucide-react';

interface NationalityStepProps {
  value: string;
  onChange: (value: string) => void;
  availableNationalities: string[];
  destinationCountry: string;
  type: 'short-stay' | 'long-stay';
}

const NationalityStep = ({ value, onChange, availableNationalities, destinationCountry, type }: NationalityStepProps) => {
  const getStepInfo = () => {
    if (destinationCountry === 'Schengen Area' && type === 'short-stay') {
      return (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <div className="flex items-start space-x-2">
            <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-blue-800">
              Only showing nationalities that require a Schengen visa. Citizens of Schengen countries and visa-exempt countries (US, UK, Canada, etc.) don't need short-stay visas.
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      <Label className="text-lg font-semibold">What's your nationality?</Label>
      {getStepInfo()}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select your nationality" />
        </SelectTrigger>
        <SelectContent className="max-h-60">
          {availableNationalities.map((country) => (
            <SelectItem key={country} value={country}>{country}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default NationalityStep;
