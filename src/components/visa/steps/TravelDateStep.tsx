
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface TravelDateStepProps {
  value: string;
  onChange: (value: string) => void;
}

const TravelDateStep = ({ value, onChange }: TravelDateStepProps) => {
  return (
    <div className="space-y-4">
      <Label htmlFor="travelDate" className="text-lg font-semibold">
        When do you need to be there?
      </Label>
      <Input
        id="travelDate"
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default TravelDateStep;
