
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface LeadTraveler {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber: string;
  passportExpiry: string;
}

interface TravelerInfoStepProps {
  travelers: number;
  leadTraveler: LeadTraveler;
  onTravelersChange: (count: number) => void;
  onLeadTravelerChange: (field: string, value: string) => void;
}

const TravelerInfoStep = ({ 
  travelers, 
  leadTraveler, 
  onTravelersChange, 
  onLeadTravelerChange 
}: TravelerInfoStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="travelers">Number of Travelers</Label>
        <select
          id="travelers"
          className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
          value={travelers}
          onChange={(e) => onTravelersChange(parseInt(e.target.value))}
        >
          {[1,2,3,4,5,6,7,8].map(num => (
            <option key={num} value={num}>{num} {num === 1 ? 'Traveler' : 'Travelers'}</option>
          ))}
        </select>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Lead Traveler Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              value={leadTraveler.firstName}
              onChange={(e) => onLeadTravelerChange('firstName', e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              value={leadTraveler.lastName}
              onChange={(e) => onLeadTravelerChange('lastName', e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={leadTraveler.email}
              onChange={(e) => onLeadTravelerChange('email', e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone *</Label>
            <Input
              id="phone"
              type="tel"
              value={leadTraveler.phone}
              onChange={(e) => onLeadTravelerChange('phone', e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="nationality">Nationality *</Label>
            <Input
              id="nationality"
              value={leadTraveler.nationality}
              onChange={(e) => onLeadTravelerChange('nationality', e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="dateOfBirth">Date of Birth *</Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={leadTraveler.dateOfBirth}
              onChange={(e) => onLeadTravelerChange('dateOfBirth', e.target.value)}
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelerInfoStep;
