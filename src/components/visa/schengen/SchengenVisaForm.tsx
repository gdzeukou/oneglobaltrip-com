import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { X, Save, FileText, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface SchengenVisaFormProps {
  onClose: () => void;
  onSubmit: (formData: any) => void;
}

interface FormData {
  // Personal Information (Fields 1-10)
  surname: string;
  surnameAtBirth: string;
  firstName: string;
  dateOfBirth: string;
  placeOfBirth: string;
  countryOfBirth: string;
  currentNationality: string;
  sex: string;
  civilStatus: string;
  parentalData: string;
  
  // Document Information (Fields 11-17)
  nationalIdentityNumber: string;
  travelDocumentType: string;
  documentNumber: string;
  issueDate: string;
  expiryDate: string;
  issuingAuthority: string;
  
  // Contact Information (Fields 17-20)
  homeAddress: string;
  email: string;
  phone: string;
  residenceInOtherCountry: string;
  currentOccupation: string;
  employer: string;
  
  // Travel Information (Fields 21-30)
  mainPurpose: string[];
  memberStatesDestination: string;
  firstEntryMemberState: string;
  numberOfEntries: string;
  durationOfStay: string;
  previousSchengenVisas: string;
  fingerprintsCollected: string;
  entryPermitFinalCountry: string;
  intendedArrivalDate: string;
  intendedDepartureDate: string;
  
  // Host Information (Fields 31-35)
  invitingPerson: string;
  hostAddress: string;
  costCoverage: string[];
  euFamilyMemberData: string;
  familyRelationship: string;
  
  // Signature
  placeAndDate: string;
  signature: string;
}

const SchengenVisaForm = ({ onClose, onSubmit }: SchengenVisaFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    surname: '',
    surnameAtBirth: '',
    firstName: '',
    dateOfBirth: '',
    placeOfBirth: '',
    countryOfBirth: '',
    currentNationality: '',
    sex: '',
    civilStatus: '',
    parentalData: '',
    nationalIdentityNumber: '',
    travelDocumentType: 'ordinary-passport',
    documentNumber: '',
    issueDate: '',
    expiryDate: '',
    issuingAuthority: '',
    homeAddress: '',
    email: '',
    phone: '',
    residenceInOtherCountry: 'no',
    currentOccupation: '',
    employer: '',
    mainPurpose: [],
    memberStatesDestination: '',
    firstEntryMemberState: '',
    numberOfEntries: 'multiple',
    durationOfStay: '',
    previousSchengenVisas: 'no',
    fingerprintsCollected: 'no',
    entryPermitFinalCountry: '',
    intendedArrivalDate: '',
    intendedDepartureDate: '',
    invitingPerson: '',
    hostAddress: '',
    costCoverage: [],
    euFamilyMemberData: '',
    familyRelationship: '',
    placeAndDate: '',
    signature: ''
  });

  const { user } = useAuth();
  const { toast } = useToast();

  const steps = [
    { title: "Personal Information", fields: 10 },
    { title: "Travel Document", fields: 7 },
    { title: "Contact & Employment", fields: 4 },
    { title: "Travel Purpose & Destination", fields: 10 },
    { title: "Host Information", fields: 5 },
    { title: "Review & Submit", fields: 1 }
  ];

  const totalFields = 37;
  const currentProgress = ((currentStep + 1) / steps.length) * 100;

  useEffect(() => {
    // Pre-fill with user data if available
    if (user) {
      setFormData(prev => ({
        ...prev,
        email: user.email || '',
        firstName: user.user_metadata?.first_name || '',
        surname: user.user_metadata?.last_name || ''
      }));
    }
  }, [user]);

  const handleInputChange = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePurposeChange = (purpose: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      mainPurpose: checked 
        ? [...prev.mainPurpose, purpose]
        : prev.mainPurpose.filter(p => p !== purpose)
    }));
  };

  const handleCostCoverageChange = (option: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      costCoverage: checked 
        ? [...prev.costCoverage, option]
        : prev.costCoverage.filter(c => c !== option)
    }));
  };

  const saveDraft = () => {
    localStorage.setItem('schengen-visa-draft', JSON.stringify(formData));
    toast({
      title: "Draft Saved",
      description: "Your progress has been saved. You can continue later.",
    });
  };

  const loadDraft = () => {
    const draft = localStorage.getItem('schengen-visa-draft');
    if (draft) {
      setFormData(JSON.parse(draft));
      toast({
        title: "Draft Loaded",
        description: "Your previously saved progress has been restored.",
      });
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    toast({
      title: "Application Submitted",
      description: "Your Schengen visa application has been prepared for review.",
    });
    onSubmit(formData);
  };

  const renderPersonalInformation = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="surname">1. Surname (Family name) *</Label>
          <Input
            id="surname"
            value={formData.surname}
            onChange={(e) => handleInputChange('surname', e.target.value)}
            placeholder="As shown in passport"
            className="uppercase"
          />
        </div>
        <div>
          <Label htmlFor="surnameAtBirth">2. Surname at birth (if different)</Label>
          <Input
            id="surnameAtBirth"
            value={formData.surnameAtBirth}
            onChange={(e) => handleInputChange('surnameAtBirth', e.target.value)}
            placeholder="If different from current surname"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">3. First name(s) *</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            placeholder="As shown in passport"
          />
        </div>
        <div>
          <Label htmlFor="dateOfBirth">4. Date of birth (DD-MM-YYYY) *</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="placeOfBirth">5. Place of birth *</Label>
          <Input
            id="placeOfBirth"
            value={formData.placeOfBirth}
            onChange={(e) => handleInputChange('placeOfBirth', e.target.value)}
            placeholder="City, Country"
          />
        </div>
        <div>
          <Label htmlFor="countryOfBirth">6. Country of birth *</Label>
          <Input
            id="countryOfBirth"
            value={formData.countryOfBirth}
            onChange={(e) => handleInputChange('countryOfBirth', e.target.value)}
            placeholder="Country name"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="currentNationality">7. Current nationality *</Label>
          <Input
            id="currentNationality"
            value={formData.currentNationality}
            onChange={(e) => handleInputChange('currentNationality', e.target.value)}
            placeholder="Your nationality"
          />
        </div>
        <div>
          <Label>8. Sex *</Label>
          <RadioGroup
            value={formData.sex}
            onValueChange={(value) => handleInputChange('sex', value)}
            className="flex space-x-4 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Female</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="other" />
              <Label htmlFor="other">X</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div>
        <Label>9. Civil status *</Label>
        <RadioGroup
          value={formData.civilStatus}
          onValueChange={(value) => handleInputChange('civilStatus', value)}
          className="flex space-x-6 mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="single" id="single" />
            <Label htmlFor="single">Single</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="married" id="married" />
            <Label htmlFor="married">Married</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="other-civil" id="other-civil" />
            <Label htmlFor="other-civil">Other</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label htmlFor="parentalData">10. For minors: parental data</Label>
        <Textarea
          id="parentalData"
          value={formData.parentalData}
          onChange={(e) => handleInputChange('parentalData', e.target.value)}
          placeholder="Only fill if applicant is under 18"
          rows={2}
        />
      </div>
    </div>
  );

  const renderTravelDocument = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nationalIdentityNumber">11. National identity number</Label>
          <Input
            id="nationalIdentityNumber"
            value={formData.nationalIdentityNumber}
            onChange={(e) => handleInputChange('nationalIdentityNumber', e.target.value)}
            placeholder="ID number or N/A"
          />
        </div>
        <div>
          <Label htmlFor="travelDocumentType">12. Type of travel document *</Label>
          <Select
            value={formData.travelDocumentType}
            onValueChange={(value) => handleInputChange('travelDocumentType', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ordinary-passport">Ordinary passport</SelectItem>
              <SelectItem value="diplomatic-passport">Diplomatic passport</SelectItem>
              <SelectItem value="service-passport">Service passport</SelectItem>
              <SelectItem value="official-passport">Official passport</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="documentNumber">13. Document number *</Label>
          <Input
            id="documentNumber"
            value={formData.documentNumber}
            onChange={(e) => handleInputChange('documentNumber', e.target.value)}
            placeholder="Passport number"
          />
        </div>
        <div>
          <Label htmlFor="issueDate">14. Date of issue *</Label>
          <Input
            id="issueDate"
            type="date"
            value={formData.issueDate}
            onChange={(e) => handleInputChange('issueDate', e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="expiryDate">15. Expiry date *</Label>
          <Input
            id="expiryDate"
            type="date"
            value={formData.expiryDate}
            onChange={(e) => handleInputChange('expiryDate', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="issuingAuthority">16. Issued by (authority) *</Label>
          <Input
            id="issuingAuthority"
            value={formData.issuingAuthority}
            onChange={(e) => handleInputChange('issuingAuthority', e.target.value)}
            placeholder="Issuing authority"
          />
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-blue-800 text-sm">
          <strong>Important:</strong> Your passport must be valid for at least 3 months beyond your intended departure date from the Schengen area and issued within the last 10 years.
        </p>
      </div>
    </div>
  );

  const renderContactEmployment = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="homeAddress">17. Applicant's home address, email & phone *</Label>
        <Textarea
          id="homeAddress"
          value={formData.homeAddress}
          onChange={(e) => handleInputChange('homeAddress', e.target.value)}
          placeholder="Full address including street, city, state, ZIP code"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Email address *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="your.email@example.com"
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone number *</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="Include country code"
          />
        </div>
      </div>

      <div>
        <Label>18. Residence in a country other than nationality?</Label>
        <RadioGroup
          value={formData.residenceInOtherCountry}
          onValueChange={(value) => handleInputChange('residenceInOtherCountry', value)}
          className="flex space-x-6 mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="no-residence" />
            <Label htmlFor="no-residence">No</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="yes-residence" />
            <Label htmlFor="yes-residence">Yes</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="currentOccupation">19. Current occupation *</Label>
          <Input
            id="currentOccupation"
            value={formData.currentOccupation}
            onChange={(e) => handleInputChange('currentOccupation', e.target.value)}
            placeholder="Your job title or status"
          />
        </div>
        <div>
          <Label htmlFor="employer">20. Employer / educational establishment</Label>
          <Input
            id="employer"
            value={formData.employer}
            onChange={(e) => handleInputChange('employer', e.target.value)}
            placeholder="Company/school name and location"
          />
        </div>
      </div>
    </div>
  );

  const renderTravelPurpose = () => (
    <div className="space-y-6">
      <div>
        <Label>21. Main purpose of journey *</Label>
        <div className="grid grid-cols-2 gap-4 mt-2">
          {[
            'Tourism',
            'Business',
            'Visiting family/friends',
            'Cultural',
            'Sports',
            'Official visit',
            'Medical reasons',
            'Study',
            'Airport transit',
            'Other'
          ].map((purpose) => (
            <div key={purpose} className="flex items-center space-x-2">
              <Checkbox
                id={purpose}
                checked={formData.mainPurpose.includes(purpose)}
                onCheckedChange={(checked) => handlePurposeChange(purpose, checked as boolean)}
              />
              <Label htmlFor={purpose}>{purpose}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="memberStatesDestination">22. Member State(s) of destination *</Label>
          <Input
            id="memberStatesDestination"
            value={formData.memberStatesDestination}
            onChange={(e) => handleInputChange('memberStatesDestination', e.target.value)}
            placeholder="e.g., FR, DE, BE (ISO codes)"
          />
        </div>
        <div>
          <Label htmlFor="firstEntryMemberState">23. First entry Member State *</Label>
          <Input
            id="firstEntryMemberState"
            value={formData.firstEntryMemberState}
            onChange={(e) => handleInputChange('firstEntryMemberState', e.target.value)}
            placeholder="e.g., FR"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>24. Number of entries requested *</Label>
          <RadioGroup
            value={formData.numberOfEntries}
            onValueChange={(value) => handleInputChange('numberOfEntries', value)}
            className="flex space-x-6 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1" id="single-entry" />
              <Label htmlFor="single-entry">1</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="2" id="double-entry" />
              <Label htmlFor="double-entry">2</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="multiple" id="multiple-entry" />
              <Label htmlFor="multiple-entry">Multiple</Label>
            </div>
          </RadioGroup>
        </div>
        <div>
          <Label htmlFor="durationOfStay">25. Duration of stay (number of days) *</Label>
          <Input
            id="durationOfStay"
            type="number"
            value={formData.durationOfStay}
            onChange={(e) => handleInputChange('durationOfStay', e.target.value)}
            placeholder="Maximum 90 days"
            max={90}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="intendedArrivalDate">29. Intended arrival date in Schengen *</Label>
          <Input
            id="intendedArrivalDate"
            type="date"
            value={formData.intendedArrivalDate}
            onChange={(e) => handleInputChange('intendedArrivalDate', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="intendedDepartureDate">30. Intended departure date from Schengen *</Label>
          <Input
            id="intendedDepartureDate"
            type="date"
            value={formData.intendedDepartureDate}
            onChange={(e) => handleInputChange('intendedDepartureDate', e.target.value)}
          />
        </div>
      </div>

      <div>
        <Label>26. Schengen visas issued during past 3 years?</Label>
        <RadioGroup
          value={formData.previousSchengenVisas}
          onValueChange={(value) => handleInputChange('previousSchengenVisas', value)}
          className="flex space-x-6 mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="no-previous" />
            <Label htmlFor="no-previous">No</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="yes-previous" />
            <Label htmlFor="yes-previous">Yes</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label>27. Fingerprints collected in last 59 months?</Label>
        <RadioGroup
          value={formData.fingerprintsCollected}
          onValueChange={(value) => handleInputChange('fingerprintsCollected', value)}
          className="flex space-x-6 mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="no-fingerprints" />
            <Label htmlFor="no-fingerprints">No</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="yes-fingerprints" />
            <Label htmlFor="yes-fingerprints">Yes</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );

  const renderHostInformation = () => (
    <div className="space-y-6">
      {formData.mainPurpose.includes('Visiting family/friends') && (
        <>
          <div>
            <Label htmlFor="invitingPerson">31. Inviting person / host in Schengen</Label>
            <Input
              id="invitingPerson"
              value={formData.invitingPerson}
              onChange={(e) => handleInputChange('invitingPerson', e.target.value)}
              placeholder="Full name of host"
            />
          </div>

          <div>
            <Label htmlFor="hostAddress">32. Host's address & contact</Label>
            <Textarea
              id="hostAddress"
              value={formData.hostAddress}
              onChange={(e) => handleInputChange('hostAddress', e.target.value)}
              placeholder="Complete address, phone number, and email"
              rows={3}
            />
          </div>
        </>
      )}

      <div>
        <Label>33. Cost of travelling & living covered by *</Label>
        <div className="grid grid-cols-2 gap-4 mt-2">
          {[
            'Applicant (cash)',
            'Applicant (credit card)',
            'Applicant (traveller\'s cheques)',
            'Host/Sponsor',
            'Company/Organization',
            'Other'
          ].map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={option}
                checked={formData.costCoverage.includes(option)}
                onCheckedChange={(checked) => handleCostCoverageChange(option, checked as boolean)}
              />
              <Label htmlFor={option} className="text-sm">{option}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="euFamilyMemberData">34. Personal data of EU/EEA/CH family member (if applicable)</Label>
        <Textarea
          id="euFamilyMemberData"
          value={formData.euFamilyMemberData}
          onChange={(e) => handleInputChange('euFamilyMemberData', e.target.value)}
          placeholder="Only if you have family member who is EU/EEA/Swiss citizen"
          rows={2}
        />
      </div>

      <div>
        <Label htmlFor="familyRelationship">35. Family relationship with EU/EEA/CH citizen</Label>
        <Input
          id="familyRelationship"
          value={formData.familyRelationship}
          onChange={(e) => handleInputChange('familyRelationship', e.target.value)}
          placeholder="e.g., spouse, child, parent"
        />
      </div>
    </div>
  );

  const renderReviewSubmit = () => (
    <div className="space-y-6">
      <div className="bg-green-50 p-6 rounded-lg border border-green-200">
        <h3 className="text-lg font-semibold text-green-800 mb-4">Application Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Name:</strong> {formData.firstName} {formData.surname}
          </div>
          <div>
            <strong>Nationality:</strong> {formData.currentNationality}
          </div>
          <div>
            <strong>Purpose:</strong> {formData.mainPurpose.join(', ')}
          </div>
          <div>
            <strong>Destination:</strong> {formData.memberStatesDestination}
          </div>
          <div>
            <strong>Duration:</strong> {formData.durationOfStay} days
          </div>
          <div>
            <strong>Arrival:</strong> {formData.intendedArrivalDate}
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="placeAndDate">36. Place & date</Label>
        <Input
          id="placeAndDate"
          value={formData.placeAndDate}
          onChange={(e) => handleInputChange('placeAndDate', e.target.value)}
          placeholder="Place: City, Date: DD-MM-YYYY"
        />
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <h4 className="font-semibold text-yellow-800 mb-2">Electronic Signature</h4>
        <p className="text-yellow-700 text-sm mb-3">
          By typing your full name below, you confirm that all information provided is true and accurate.
        </p>
        <Input
          id="signature"
          value={formData.signature}
          onChange={(e) => handleInputChange('signature', e.target.value)}
          placeholder="Type your full name as electronic signature"
        />
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-800 mb-2">Next Steps</h4>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• Your application will be reviewed by our visa experts</li>
          <li>• You'll receive document checklist and appointment booking instructions</li>
          <li>• We'll guide you through the submission process</li>
          <li>• Track your application status in your dashboard</li>
        </ul>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0: return renderPersonalInformation();
      case 1: return renderTravelDocument();
      case 2: return renderContactEmployment();
      case 3: return renderTravelPurpose();
      case 4: return renderHostInformation();
      case 5: return renderReviewSubmit();
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl h-[600px] shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Schengen Visa Application - Official Form</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                onClick={saveDraft}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
              >
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
              <Button
                onClick={onClose}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span>Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}</span>
              <span>{Math.round(currentProgress)}% Complete</span>
            </div>
            <Progress value={currentProgress} className="h-2 bg-white/20" />
          </div>
        </CardHeader>
        
        <CardContent className="p-6 h-[450px] overflow-y-auto">
          {renderCurrentStep()}
        </CardContent>
        
        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <Button
            onClick={prevStep}
            disabled={currentStep === 0}
            variant="outline"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          <div className="flex items-center space-x-2">
            <Button onClick={loadDraft} variant="ghost" size="sm">
              Load Draft
            </Button>
            {currentStep < steps.length - 1 ? (
              <Button onClick={nextStep}>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700"
                disabled={!formData.signature}
              >
                <Check className="h-4 w-4 mr-2" />
                Submit Application
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SchengenVisaForm;