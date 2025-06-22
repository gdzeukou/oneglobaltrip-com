
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface DepartureCityStepProps {
  value: string;
  onChange: (value: string) => void;
}

const DepartureCityStep = ({ value, onChange }: DepartureCityStepProps) => {
  return (
    <div className="space-y-4">
      <Label htmlFor="departureCity" className="text-lg font-semibold">
        Where are you traveling from?
      </Label>
      <Input
        id="departureCity"
        placeholder="Enter your departure city"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default DepartureCityStep;
