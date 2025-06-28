
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import PersonalInfoSection from './PersonalInfoSection';
import TravelInfoSection from './TravelInfoSection';
import AdditionalInfoSection from './AdditionalInfoSection';
import { useVisaApplicationForm } from './hooks/useVisaApplicationForm';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
  destination: string;
  travelDate: string;
  purpose: string;
  additionalInfo: string;
}

interface VisaApplicationFormProps {
  title?: string;
  onSubmit: (data: FormData) => void;
  loading?: boolean;
  defaultDestination?: string;
  className?: string;
}

const VisaApplicationForm = ({
  title = 'Start Your Visa Application',
  onSubmit,
  loading = false,
  defaultDestination = '',
  className = ''
}: VisaApplicationFormProps) => {
  const { formData, handleChange } = useVisaApplicationForm(defaultDestination);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-500" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <PersonalInfoSection
            firstName={formData.firstName}
            lastName={formData.lastName}
            email={formData.email}
            phone={formData.phone}
            nationality={formData.nationality}
            onFirstNameChange={(value) => handleChange('firstName', value)}
            onLastNameChange={(value) => handleChange('lastName', value)}
            onEmailChange={(value) => handleChange('email', value)}
            onPhoneChange={(value) => handleChange('phone', value)}
            onNationalityChange={(value) => handleChange('nationality', value)}
          />

          <TravelInfoSection
            destination={formData.destination}
            travelDate={formData.travelDate}
            purpose={formData.purpose}
            onDestinationChange={(value) => handleChange('destination', value)}
            onTravelDateChange={(value) => handleChange('travelDate', value)}
            onPurposeChange={(value) => handleChange('purpose', value)}
          />

          <AdditionalInfoSection
            additionalInfo={formData.additionalInfo}
            onAdditionalInfoChange={(value) => handleChange('additionalInfo', value)}
          />

          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Start Application'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default VisaApplicationForm;
