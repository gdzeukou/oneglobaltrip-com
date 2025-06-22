
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface ContactInfoStepProps {
  email: string;
  phone: string;
  onEmailChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
}

const ContactInfoStep = ({ email, phone, onEmailChange, onPhoneChange }: ContactInfoStepProps) => {
  return (
    <div className="space-y-4">
      <Label className="text-lg font-semibold">Contact Information</Label>
      <div className="space-y-4">
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactInfoStep;
