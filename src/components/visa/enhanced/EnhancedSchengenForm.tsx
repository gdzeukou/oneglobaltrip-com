import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  FileText, 
  User, 
  CreditCard, 
  Calendar, 
  MapPin,
  Save,
  X 
} from 'lucide-react';
import { schengenFormSchema, SchengenFormData, validatePassportValidity } from '@/lib/schengenFormValidation';
import CountrySelector from './CountrySelector';
import CityAutocomplete from './CityAutocomplete';
import SmartDatePicker from './SmartDatePicker';
import { cn } from '@/lib/utils';

interface EnhancedSchengenFormProps {
  onClose?: () => void;
  onSubmit?: (formData: SchengenFormData) => void;
  onCancel?: () => void;
  fullPage?: boolean;
  applicationId?: string; // For continuing existing applications
}

const steps = [
  {
    id: 'personal',
    title: 'Personal Information',
    description: 'Basic details and nationality',
    icon: User,
    fields: ['nationality', 'cityOfBirth', 'countryOfBirth']
  },
  {
    id: 'passport',
    title: 'Passport Details',
    description: 'Document information and validity',
    icon: CreditCard,
    fields: ['passportNumber', 'passportIssueDate', 'passportExpiryDate', 'issuingAuthority']
  },
  {
    id: 'travel',
    title: 'Travel Information',
    description: 'Dates and residency details',
    icon: Calendar,
    fields: ['departureDate', 'returnDate', 'residesInOtherCountry']
  },
  {
    id: 'review',
    title: 'Review & Submit',
    description: 'Final review of your application',
    icon: Check,
    fields: []
  }
];

const EnhancedSchengenForm = ({ 
  onClose, 
  onSubmit, 
  onCancel, 
  fullPage = false, 
  applicationId 
}: EnhancedSchengenFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    trigger,
    getValues
  } = useForm<SchengenFormData>({
    resolver: zodResolver(schengenFormSchema),
    mode: 'onChange',
    defaultValues: {
      nationality: '',
      cityOfBirth: '',
      countryOfBirth: '',
      passportNumber: '',
      passportIssueDate: '',
      passportExpiryDate: '',
      issuingAuthority: '',
      departureDate: '',
      returnDate: '',
      residesInOtherCountry: false,
      visaPermitNumber: '',
      permitExpiryDate: '',
      employmentStatus: 'employed',
      employerName: '',
      employerAddress: '',
      employerPhone: '',
      companyName: '',
      businessAddress: '',
      schoolName: '',
      schoolAddress: ''
    }
  });

  const watchedValues = watch();
  const currentStepProgress = ((currentStep + 1) / steps.length) * 100;

  // Auto-save functionality
  useEffect(() => {
    if (!autoSaveEnabled || !user || currentStep === 0) return;

    const saveTimer = setTimeout(async () => {
      try {
        const formData = getValues();
        await saveProgressToDatabase(formData);
      } catch (error) {
        console.error('Auto-save failed:', error);
      }
    }, 2000);

    return () => clearTimeout(saveTimer);
  }, [watchedValues, currentStep, autoSaveEnabled, user]);

  const saveProgressToDatabase = async (formData: Partial<SchengenFormData>) => {
    if (!user) return;

    try {
      const applicationData = {
        user_id: user.id,
        visa_type: 'Schengen Short-Stay',
        travel_purpose: 'tourism',
        country_code: 'SCHENGEN',
        nationality: formData.nationality || '',
        email: user.email || '',
        name: `${user.user_metadata?.first_name || ''} ${user.user_metadata?.last_name || ''}`.trim() || 'Unnamed',
        application_data: formData,
        is_draft: true,
        progress_step: currentStep + 1,
        auto_saved_at: new Date().toISOString(),
        departure_date: formData.departureDate || null,
        return_date: formData.returnDate || null
      };

      if (applicationId) {
        await supabase
          .from('visa_applications')
          .update(applicationData)
          .eq('id', applicationId);
      } else {
        await supabase
          .from('visa_applications')
          .insert([applicationData]);
      }

      toast({
        title: 'Progress Saved',
        description: 'Your application has been automatically saved.',
        duration: 2000
      });
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  };

  const handleNext = async () => {
    const currentStepFields = steps[currentStep].fields;
    const isStepValid = await trigger(currentStepFields as any);
    
    if (isStepValid && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFormSubmit = async (data: SchengenFormData) => {
    setIsSubmitting(true);
    
    try {
      // Validate passport before submission
      const passportValidation = validatePassportValidity(
        data.passportIssueDate,
        data.passportExpiryDate,
        data.departureDate
      );

      if (!passportValidation.isValid) {
        toast({
          title: 'Passport Validation Failed',
          description: passportValidation.errors.join(', '),
          variant: 'destructive'
        });
        setCurrentStep(1); // Go back to passport step
        return;
      }

      // Submit the final application
      if (onSubmit) {
        await onSubmit(data);
      }
      
      toast({
        title: 'Application Submitted',
        description: 'Your Schengen visa application has been submitted successfully.',
      });
    } catch (error) {
      toast({
        title: 'Submission Failed',
        description: 'There was an error submitting your application. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderPersonalStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">Personal Information</h3>
        <p className="text-muted-foreground">Please provide your nationality and birth details</p>
      </div>

      <Controller
        name="nationality"
        control={control}
        render={({ field }) => (
          <CountrySelector
            value={field.value}
            onChange={field.onChange}
            label="Nationality"
            placeholder="Select your nationality"
            error={errors.nationality?.message}
            required
          />
        )}
      />

      <Controller
        name="cityOfBirth"
        control={control}
        render={({ field }) => (
          <CityAutocomplete
            value={field.value}
            onChange={field.onChange}
            label="City of Birth"
            placeholder="Search for your birth city"
            error={errors.cityOfBirth?.message}
            required
          />
        )}
      />

      <Controller
        name="countryOfBirth"
        control={control}
        render={({ field }) => (
          <CountrySelector
            value={field.value}
            onChange={field.onChange}
            label="Country of Birth"
            placeholder="Select your birth country"
            error={errors.countryOfBirth?.message}
            required
          />
        )}
      />
    </div>
  );

  const renderPassportStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">Passport Details</h3>
        <p className="text-muted-foreground">Document information and validation</p>
      </div>

      <Controller
        name="passportNumber"
        control={control}
        render={({ field }) => (
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">
              Passport Number <span className="text-destructive">*</span>
            </Label>
            <Input
              {...field}
              placeholder="Enter passport number (3-15 characters)"
              className={cn(
                "h-11 rounded-lg border-border transition-all duration-200",
                "focus:border-accent focus:ring-2 focus:ring-accent/20",
                errors.passportNumber && "border-destructive focus:border-destructive"
              )}
              onChange={(e) => field.onChange(e.target.value.toUpperCase())}
            />
            {errors.passportNumber && (
              <p className="text-sm text-destructive flex items-center">
                <span className="animate-pulse mr-1">⚠</span>
                {errors.passportNumber.message}
              </p>
            )}
          </div>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Controller
          name="passportIssueDate"
          control={control}
          render={({ field }) => (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Date of Issue <span className="text-destructive">*</span>
              </Label>
              <Input
                {...field}
                type="date"
                max={new Date().toISOString().split('T')[0]}
                className={cn(
                  "h-11 rounded-lg border-border transition-all duration-200",
                  "focus:border-accent focus:ring-2 focus:ring-accent/20",
                  errors.passportIssueDate && "border-destructive"
                )}
              />
              {errors.passportIssueDate && (
                <p className="text-sm text-destructive flex items-center">
                  <span className="animate-pulse mr-1">⚠</span>
                  {errors.passportIssueDate.message}
                </p>
              )}
            </div>
          )}
        />

        <Controller
          name="passportExpiryDate"
          control={control}
          render={({ field }) => (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Date of Expiry <span className="text-destructive">*</span>
              </Label>
              <Input
                {...field}
                type="date"
                min={new Date().toISOString().split('T')[0]}
                className={cn(
                  "h-11 rounded-lg border-border transition-all duration-200",
                  "focus:border-accent focus:ring-2 focus:ring-accent/20",
                  errors.passportExpiryDate && "border-destructive"
                )}
              />
              {errors.passportExpiryDate && (
                <p className="text-sm text-destructive flex items-center">
                  <span className="animate-pulse mr-1">⚠</span>
                  {errors.passportExpiryDate.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      <Controller
        name="issuingAuthority"
        control={control}
        render={({ field }) => (
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">
              Issuing Authority
            </Label>
            <Input
              {...field}
              placeholder="e.g., Passport Office, Ministry of Foreign Affairs"
              className={cn(
                "h-11 rounded-lg border-border transition-all duration-200",
                "focus:border-accent focus:ring-2 focus:ring-accent/20"
              )}
            />
          </div>
        )}
      />

      <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
        <p className="text-sm text-foreground flex items-start">
          <FileText className="h-4 w-4 text-accent mr-2 mt-0.5 flex-shrink-0" />
          <span>
            <strong>Important:</strong> Your passport must be valid for at least 3 months beyond your intended departure date and issued within the last 10 years.
          </span>
        </p>
      </div>
    </div>
  );

  const renderTravelStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">Travel Information</h3>
        <p className="text-muted-foreground">Your travel dates and residency details</p>
      </div>

      <SmartDatePicker
        departureValue={watchedValues.departureDate}
        returnValue={watchedValues.returnDate}
        onDepartureChange={(value) => setValue('departureDate', value)}
        onReturnChange={(value) => setValue('returnDate', value)}
        departureError={errors.departureDate?.message}
        returnError={errors.returnDate?.message}
      />

      <div className="space-y-4">
        <Label className="text-sm font-medium text-foreground">
          Do you legally reside in a country other than your nationality?
        </Label>
        
        <Controller
          name="residesInOtherCountry"
          control={control}
          render={({ field }) => (
            <RadioGroup
              value={field.value ? 'yes' : 'no'}
              onValueChange={(value) => field.onChange(value === 'yes')}
              className="flex space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="no-residence" />
                <Label htmlFor="no-residence" className="cursor-pointer">No</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="yes-residence" />
                <Label htmlFor="yes-residence" className="cursor-pointer">Yes</Label>
              </div>
            </RadioGroup>
          )}
        />

        {watchedValues.residesInOtherCountry && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-4 bg-accent/5 border border-accent/20 rounded-lg">
            <Controller
              name="visaPermitNumber"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    Visa/Residence Permit Number <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    {...field}
                    placeholder="Enter permit number"
                    className={cn(
                      "h-11 rounded-lg border-border transition-all duration-200",
                      "focus:border-accent focus:ring-2 focus:ring-accent/20",
                      errors.visaPermitNumber && "border-destructive"
                    )}
                  />
                  {errors.visaPermitNumber && (
                    <p className="text-sm text-destructive flex items-center">
                      <span className="animate-pulse mr-1">⚠</span>
                      {errors.visaPermitNumber.message}
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              name="permitExpiryDate"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    Permit Expiry Date <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    {...field}
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    className={cn(
                      "h-11 rounded-lg border-border transition-all duration-200",
                      "focus:border-accent focus:ring-2 focus:ring-accent/20",
                      errors.permitExpiryDate && "border-destructive"
                    )}
                  />
                  {errors.permitExpiryDate && (
                    <p className="text-sm text-destructive flex items-center">
                      <span className="animate-pulse mr-1">⚠</span>
                      {errors.permitExpiryDate.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
        )}
      </div>

      <div className="space-y-4">
        <Label className="text-sm font-medium text-foreground">
          Employment Status <span className="text-destructive">*</span>
        </Label>
        
        <Controller
          name="employmentStatus"
          control={control}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="employed" id="employed" />
                <Label htmlFor="employed" className="cursor-pointer">Employed</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="self-employed" id="self-employed" />
                <Label htmlFor="self-employed" className="cursor-pointer">Self-Employed</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="student" id="student" />
                <Label htmlFor="student" className="cursor-pointer">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="retired" id="retired" />
                <Label htmlFor="retired" className="cursor-pointer">Retired</Label>
              </div>
            </RadioGroup>
          )}
        />

        {/* Conditional Employment Fields */}
        {watchedValues.employmentStatus === 'employed' && (
          <div className="space-y-4 p-4 bg-accent/5 border border-accent/20 rounded-lg">
            <Controller
              name="employerName"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    Employer Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    {...field}
                    placeholder="Enter employer name"
                    className="h-11 rounded-lg"
                  />
                  {errors.employerName && (
                    <p className="text-sm text-destructive">{errors.employerName.message}</p>
                  )}
                </div>
              )}
            />
            
            <Controller
              name="employerAddress"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    Employer Address <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    {...field}
                    placeholder="Enter employer address"
                    className="h-11 rounded-lg"
                  />
                  {errors.employerAddress && (
                    <p className="text-sm text-destructive">{errors.employerAddress.message}</p>
                  )}
                </div>
              )}
            />
            
            <Controller
              name="employerPhone"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    Employer Phone <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    {...field}
                    placeholder="Enter employer phone number"
                    className="h-11 rounded-lg"
                  />
                  {errors.employerPhone && (
                    <p className="text-sm text-destructive">{errors.employerPhone.message}</p>
                  )}
                </div>
              )}
            />
          </div>
        )}

        {watchedValues.employmentStatus === 'self-employed' && (
          <div className="space-y-4 p-4 bg-accent/5 border border-accent/20 rounded-lg">
            <Controller
              name="companyName"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    Legal Company Name
                  </Label>
                  <Input
                    {...field}
                    placeholder="Enter company name (optional)"
                    className="h-11 rounded-lg"
                  />
                </div>
              )}
            />
            
            <Controller
              name="businessAddress"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    Business Address
                  </Label>
                  <Input
                    {...field}
                    placeholder="Enter business address (optional)"
                    className="h-11 rounded-lg"
                  />
                </div>
              )}
            />
          </div>
        )}

        {watchedValues.employmentStatus === 'student' && (
          <div className="space-y-4 p-4 bg-accent/5 border border-accent/20 rounded-lg">
            <Controller
              name="schoolName"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    School Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    {...field}
                    placeholder="Enter school name"
                    className="h-11 rounded-lg"
                  />
                  {errors.schoolName && (
                    <p className="text-sm text-destructive">{errors.schoolName.message}</p>
                  )}
                </div>
              )}
            />
            
            <Controller
              name="schoolAddress"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    School Address <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    {...field}
                    placeholder="Enter school address"
                    className="h-11 rounded-lg"
                  />
                  {errors.schoolAddress && (
                    <p className="text-sm text-destructive">{errors.schoolAddress.message}</p>
                  )}
                </div>
              )}
            />
          </div>
        )}
      </div>
    </div>
  );

  const renderReviewStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">Review Your Application</h3>
        <p className="text-muted-foreground">Please review all information before submitting</p>
      </div>

      <div className="space-y-4">
        <Card className="border-accent/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <User className="h-4 w-4 mr-2" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-muted-foreground">Nationality:</span> {watchedValues.nationality}</div>
              <div><span className="text-muted-foreground">City of Birth:</span> {watchedValues.cityOfBirth}</div>
              <div className="col-span-2"><span className="text-muted-foreground">Country of Birth:</span> {watchedValues.countryOfBirth}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-accent/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <CreditCard className="h-4 w-4 mr-2" />
              Passport Details
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-muted-foreground">Passport Number:</span> {watchedValues.passportNumber}</div>
              <div><span className="text-muted-foreground">Issue Date:</span> {watchedValues.passportIssueDate}</div>
              <div><span className="text-muted-foreground">Expiry Date:</span> {watchedValues.passportExpiryDate}</div>
              <div><span className="text-muted-foreground">Issuing Authority:</span> {watchedValues.issuingAuthority || 'N/A'}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-accent/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Travel Information
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-muted-foreground">Departure Date:</span> {watchedValues.departureDate}</div>
              <div><span className="text-muted-foreground">Return Date:</span> {watchedValues.returnDate}</div>
              <div className="col-span-2">
                <span className="text-muted-foreground">Resides in Other Country:</span> {watchedValues.residesInOtherCountry ? 'Yes' : 'No'}
              </div>
              <div className="col-span-2">
                <span className="text-muted-foreground">Employment Status:</span> {watchedValues.employmentStatus}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: return renderPersonalStep();
      case 1: return renderPassportStep();
      case 2: return renderTravelStep();
      case 3: return renderReviewStep();
      default: return null;
    }
  };

  const containerClass = fullPage 
    ? "w-full" 
    : "fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4";
  
  const formClass = fullPage 
    ? "w-full" 
    : "w-full max-w-2xl max-h-[90vh] overflow-hidden";

  return (
    <div className={containerClass}>
      <Card className={formClass}>
        {!fullPage && (
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-border">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-accent" />
              <CardTitle className="text-xl">Schengen Visa Application</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
        )}

        {/* Progress Indicator */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-foreground">
              Step {currentStep + 1} of {steps.length}
            </div>
            <div className="text-sm text-muted-foreground">
              {Math.round(currentStepProgress)}%
            </div>
          </div>
          <Progress value={currentStepProgress} className="h-2" />
          
          <div className="flex justify-between mt-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              
              return (
                <div key={step.id} className="flex flex-col items-center space-y-1">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200",
                    isActive && "bg-accent text-white ring-2 ring-accent/20",
                    isCompleted && "bg-accent text-white",
                    !isActive && !isCompleted && "bg-muted text-muted-foreground"
                  )}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="text-xs text-center max-w-20">
                    <div className={cn(
                      "font-medium",
                      isActive && "text-accent",
                      isCompleted && "text-accent",
                      !isActive && !isCompleted && "text-muted-foreground"
                    )}>
                      {step.title}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <CardContent className={fullPage ? "p-0" : "flex-1 overflow-y-auto p-6"}>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            {renderStepContent()}
          </form>
        </CardContent>

        {/* Navigation */}
        <div className={fullPage ? "sticky bottom-0 bg-card border-t border-border px-6 py-4 mt-8" : "sticky bottom-0 bg-card border-t border-border px-6 py-4"}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {autoSaveEnabled && (
                <Badge variant="outline" className="text-xs">
                  <Save className="h-3 w-3 mr-1" />
                  Auto-save enabled
                </Badge>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center space-x-1"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </Button>
              
              {currentStep < steps.length - 1 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center space-x-1 bg-accent hover:bg-accent/90"
                >
                  <span>Next</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  onClick={handleSubmit(handleFormSubmit)}
                  className="flex items-center space-x-1 bg-accent hover:bg-accent/90"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Submit Application</span>
                    </>
                  )}
                </Button>
              )}
              
              {(onCancel || onClose) && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={onCancel || onClose}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EnhancedSchengenForm;