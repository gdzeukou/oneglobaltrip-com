import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PhoneInput } from '@/components/ui/phone-input';
import { DatePickerField } from './DatePickerField';
import { useAuth } from '@/contexts/AuthContext';
import { useProfileMutation } from '@/hooks/useProfileMutation';
import { validateProfileData } from '@/utils/profileValidation';
import { useToast } from '@/hooks/use-toast';
import { countries } from '@/data/countries';

interface ProfileData {
  first_name: string;
  last_name: string;
  date_of_birth: Date | undefined;
  passport_number: string;
  passport_expiry: Date | undefined;
  nationality: string;
  phone: string;
}

interface ProfileFormProps {
  onComplete: () => void;
}

export const ProfileForm = ({ onComplete }: ProfileFormProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState<ProfileData>({
    first_name: user?.user_metadata?.first_name || '',
    last_name: user?.user_metadata?.last_name || '',
    date_of_birth: undefined,
    passport_number: '',
    passport_expiry: undefined,
    nationality: '',
    phone: ''
  });

  const createProfileMutation = useProfileMutation({ onSuccess: onComplete });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateProfileData(formData);
    if (!validation.isValid) {
      toast({
        title: "Validation Error",
        description: validation.error,
        variant: "destructive"
      });
      return;
    }

    createProfileMutation.mutate(formData);
  };

  const updateField = (field: keyof ProfileData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="first_name">First Name</Label>
          <Input
            id="first_name"
            value={formData.first_name}
            onChange={(e) => updateField('first_name', e.target.value)}
            placeholder="Enter first name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last_name">Last Name</Label>
          <Input
            id="last_name"
            value={formData.last_name}
            onChange={(e) => updateField('last_name', e.target.value)}
            placeholder="Enter last name"
          />
        </div>
      </div>

      <DatePickerField
        label="Date of Birth"
        value={formData.date_of_birth}
        onChange={(date) => updateField('date_of_birth', date)}
        placeholder="Select your date of birth"
        required
        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
        fromYear={1900}
        toYear={new Date().getFullYear()}
      />

      <div className="space-y-2">
        <Label htmlFor="nationality">Nationality</Label>
        <Select value={formData.nationality} onValueChange={(value) => updateField('nationality', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select your nationality" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country} value={country}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="passport_number">Passport Number *</Label>
        <Input
          id="passport_number"
          value={formData.passport_number}
          onChange={(e) => updateField('passport_number', e.target.value)}
          placeholder="Enter passport number"
          required
        />
      </div>

      <DatePickerField
        label="Passport Expiry Date"
        value={formData.passport_expiry}
        onChange={(date) => updateField('passport_expiry', date)}
        placeholder="Select passport expiry date"
        required
        disabled={(date) => date < new Date()}
        fromYear={new Date().getFullYear()}
        toYear={new Date().getFullYear() + 20}
      />

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <PhoneInput
          value={formData.phone}
          onChange={(value) => updateField('phone', value)}
          placeholder="Enter phone number"
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> You must provide at least your first name or last name, 
          along with your date of birth, passport number, and expiry date to use our services.
        </p>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={createProfileMutation.isPending}
      >
        {createProfileMutation.isPending ? 'Creating Profile...' : 'Complete Profile'}
      </Button>
    </form>
  );
};