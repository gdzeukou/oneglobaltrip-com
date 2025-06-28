
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User } from 'lucide-react';

interface PersonalInfoSectionProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onNationalityChange: (value: string) => void;
}

const PersonalInfoSection = ({
  firstName,
  lastName,
  email,
  phone,
  nationality,
  onFirstNameChange,
  onLastNameChange,
  onEmailChange,
  onPhoneChange,
  onNationalityChange
}: PersonalInfoSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-3">
        <User className="h-4 w-4 text-gray-500" />
        <h3 className="font-medium">Personal Information</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={firstName}
            onChange={(e) => onFirstNameChange(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={lastName}
            onChange={(e) => onLastNameChange(e.target.value)}
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="nationality">Nationality *</Label>
        <Select onValueChange={onNationalityChange} value={nationality}>
          <SelectTrigger>
            <SelectValue placeholder="Select your nationality" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="ng">Nigeria</SelectItem>
            <SelectItem value="in">India</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PersonalInfoSection;
