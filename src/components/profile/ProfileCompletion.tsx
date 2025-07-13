import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { User, AlertCircle } from 'lucide-react';

interface ProfileData {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  passport_number: string;
  passport_expiry: string;
  nationality: string;
  phone: string;
}

interface ProfileCompletionProps {
  onComplete: () => void;
}

const countries = [
  'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Italy', 'Spain', 'Netherlands',
  'Belgium', 'Switzerland', 'Austria', 'Sweden', 'Norway', 'Denmark', 'Finland', 'Australia',
  'New Zealand', 'Japan', 'South Korea', 'Singapore', 'Malaysia', 'Thailand', 'India', 'China',
  'Brazil', 'Argentina', 'Mexico', 'South Africa', 'Egypt', 'Nigeria', 'Kenya', 'Morocco'
];

export const ProfileCompletion = ({ onComplete }: ProfileCompletionProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<ProfileData>({
    first_name: user?.user_metadata?.first_name || '',
    last_name: user?.user_metadata?.last_name || '',
    date_of_birth: '',
    passport_number: '',
    passport_expiry: '',
    nationality: '',
    phone: ''
  });

  const createProfileMutation = useMutation({
    mutationFn: async (data: ProfileData) => {
      if (!user?.id) throw new Error('No user ID');
      
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...data,
          updated_at: new Date().toISOString()
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
      toast({
        title: "Profile Created",
        description: "Your profile has been created successfully!",
      });
      onComplete();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create profile. Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.first_name && !formData.last_name) {
      toast({
        title: "Validation Error",
        description: "Please provide at least your first name or last name.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.date_of_birth || !formData.passport_number || !formData.passport_expiry) {
      toast({
        title: "Validation Error", 
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    createProfileMutation.mutate(formData);
  };

  const updateField = (field: keyof ProfileData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <User className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Complete Your Profile
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please provide your travel information to continue
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-blue-600" />
              <span>Required Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
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

              <div className="space-y-2">
                <Label htmlFor="date_of_birth">Date of Birth *</Label>
                <Input
                  id="date_of_birth"
                  type="date"
                  value={formData.date_of_birth}
                  onChange={(e) => updateField('date_of_birth', e.target.value)}
                  required
                />
              </div>

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

              <div className="space-y-2">
                <Label htmlFor="passport_expiry">Passport Expiry Date *</Label>
                <Input
                  id="passport_expiry"
                  type="date"
                  value={formData.passport_expiry}
                  onChange={(e) => updateField('passport_expiry', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};