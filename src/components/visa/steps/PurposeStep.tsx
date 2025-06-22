
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface PurposeStepProps {
  type: 'short-stay' | 'long-stay';
  value: string;
  onChange: (value: string) => void;
}

const shortStayPurposes = [
  'Tourism',
  'Family/Friends',
  'Academic Trip',
  'Work/Business',
  'Religious',
  'Athletic Event',
  'Conference'
];

const longStayCategories = [
  'Residency',
  'Work',
  'Retirement',
  'Study',
  'Digital Nomad'
];

const PurposeStep = ({ type, value, onChange }: PurposeStepProps) => {
  const options = type === 'short-stay' ? shortStayPurposes : longStayCategories;
  
  return (
    <div className="space-y-4">
      <Label className="text-lg font-semibold">
        {type === 'short-stay' ? 'Select Visa Purpose' : 'Select Visa Category'}
      </Label>
      <RadioGroup value={value} onValueChange={onChange} className="grid grid-cols-2 gap-4">
        {options.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <RadioGroupItem value={option} id={option} />
            <Label htmlFor={option} className="cursor-pointer">{option}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default PurposeStep;
