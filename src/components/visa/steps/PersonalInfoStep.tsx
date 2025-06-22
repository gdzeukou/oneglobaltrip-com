
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

interface PersonalInfoStepProps {
  name: string;
  onNameChange: (value: string) => void;
  additionalNeeds: string[];
  onAdditionalNeedsChange: (need: string, checked: boolean) => void;
}

const additionalNeedsOptions = [
  'Flight booking',
  'Hotel reservation',
  'Car rental',
  'Bus/Train tickets',
  'Travel insurance',
  'Airport transfer'
];

const PersonalInfoStep = ({ name, onNameChange, additionalNeeds, onAdditionalNeedsChange }: PersonalInfoStepProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label htmlFor="name" className="text-lg font-semibold">Your Full Name</Label>
        <Input
          id="name"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
        />
      </div>
      
      <div className="space-y-4">
        <Label className="text-lg font-semibold">What else do you still need? (Optional)</Label>
        <div className="grid grid-cols-2 gap-4">
          {additionalNeedsOptions.map((need) => (
            <div key={need} className="flex items-center space-x-2">
              <Checkbox
                id={need}
                checked={additionalNeeds.includes(need)}
                onCheckedChange={(checked) => onAdditionalNeedsChange(need, checked as boolean)}
              />
              <Label htmlFor={need} className="cursor-pointer text-sm">{need}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
