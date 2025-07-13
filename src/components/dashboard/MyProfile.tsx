import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PhoneInput } from '@/components/ui/phone-input';
import { 
  User, 
  CreditCard, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  Shield,
  Upload,
  Save,
  Edit3,
  CheckCircle2,
  AlertCircle,
  Users,
  Loader2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  date_of_birth: string;
  nationality: string;
  passport_number: string;
  passport_expiry: string;
  created_at: string;
  updated_at: string;
}

interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email: string;
}

interface UserPreferences {
  notification_settings: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  privacy_settings: {
    profile_visibility: string;
  };
  travel_preferences: {
    seat_preference?: string;
    meal_preference?: string;
    special_requirements?: string;
  };
  emergency_contacts: EmergencyContact[];
}

const MyProfile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<Partial<Profile>>({});
  const [preferences, setPreferences] = useState<UserPreferences>({
    notification_settings: { email: true, sms: false, push: true },
    privacy_settings: { profile_visibility: 'private' },
    travel_preferences: {},
    emergency_contacts: []
  });

  const { data: profile, isLoading } = useQuery({
    queryKey: ['user-profile', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data as Profile;
    },
    enabled: !!user?.id
  });

  const { data: userPreferences } = useQuery({
    queryKey: ['user-preferences', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
    enabled: !!user?.id
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (data: Partial<Profile>) => {
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
      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile information has been saved successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Update Failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      });
    }
  });

  const updatePreferencesMutation = useMutation({
    mutationFn: async (data: Partial<UserPreferences>) => {
      if (!user?.id) throw new Error('No user ID');
      
      const { error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user.id,
          ...data,
          updated_at: new Date().toISOString()
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-preferences'] });
      toast({
        title: "Preferences Updated",
        description: "Your preferences have been saved successfully.",
      });
    }
  });

  useEffect(() => {
    if (profile) {
      setProfileData(profile);
    }
  }, [profile]);

  useEffect(() => {
    if (userPreferences) {
      setPreferences({
        notification_settings: userPreferences.notification_settings || { email: true, sms: false, push: true },
        privacy_settings: userPreferences.privacy_settings || { profile_visibility: 'private' },
        travel_preferences: userPreferences.travel_preferences || {},
        emergency_contacts: userPreferences.emergency_contacts || []
      });
    }
  }, [userPreferences]);

  const handleSaveProfile = () => {
    updateProfileMutation.mutate(profileData);
  };

  const handleSavePreferences = () => {
    updatePreferencesMutation.mutate(preferences);
  };

  const addEmergencyContact = () => {
    setPreferences(prev => ({
      ...prev,
      emergency_contacts: [
        ...prev.emergency_contacts,
        { name: '', relationship: '', phone: '', email: '' }
      ]
    }));
  };

  const removeEmergencyContact = (index: number) => {
    setPreferences(prev => ({
      ...prev,
      emergency_contacts: prev.emergency_contacts.filter((_, i) => i !== index)
    }));
  };

  const updateEmergencyContact = (index: number, field: keyof EmergencyContact, value: string) => {
    setPreferences(prev => ({
      ...prev,
      emergency_contacts: prev.emergency_contacts.map((contact, i) => 
        i === index ? { ...contact, [field]: value } : contact
      )
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          <span className="text-gray-600">Loading your profile...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Profile</h2>
          <p className="text-gray-600 mt-1">
            Manage your personal information and travel preferences
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveProfile}
                disabled={updateProfileMutation.isPending}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              variant="outline"
            >
              <Edit3 className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="travel">Travel Docs</TabsTrigger>
          <TabsTrigger value="emergency">Emergency</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Personal Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user?.user_metadata?.avatar_url} />
                  <AvatarFallback className="text-lg">
                    {user?.user_metadata?.first_name?.[0]}{user?.user_metadata?.last_name?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">
                    {profileData.first_name} {profileData.last_name}
                  </h3>
                  <p className="text-gray-600">{user?.email}</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    <Upload className="h-4 w-4 mr-2" />
                    Change Photo
                  </Button>
                </div>
              </div>

              {/* Personal Details Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    value={profileData.first_name || ''}
                    onChange={(e) => setProfileData(prev => ({ ...prev, first_name: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    value={profileData.last_name || ''}
                    onChange={(e) => setProfileData(prev => ({ ...prev, last_name: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <PhoneInput
                    value={profileData.phone || ''}
                    onChange={(value) => setProfileData(prev => ({ ...prev, phone: value }))}
                    placeholder="Enter phone number"
                    className={!isEditing ? "pointer-events-none opacity-60" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date_of_birth">Date of Birth</Label>
                  <Input
                    id="date_of_birth"
                    type="date"
                    value={profileData.date_of_birth || ''}
                    onChange={(e) => setProfileData(prev => ({ ...prev, date_of_birth: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationality</Label>
                  <Input
                    id="nationality"
                    value={profileData.nationality || ''}
                    onChange={(e) => setProfileData(prev => ({ ...prev, nationality: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="travel">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5" />
                <span>Travel Documents</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="passport_number">Passport Number</Label>
                  <Input
                    id="passport_number"
                    value={profileData.passport_number || ''}
                    onChange={(e) => setProfileData(prev => ({ ...prev, passport_number: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passport_expiry">Passport Expiry</Label>
                  <Input
                    id="passport_expiry"
                    type="date"
                    value={profileData.passport_expiry || ''}
                    onChange={(e) => setProfileData(prev => ({ ...prev, passport_expiry: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              
              {profileData.passport_expiry && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                    <span className="text-yellow-800 font-medium">
                      Passport expires in {Math.ceil((new Date(profileData.passport_expiry).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emergency">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Emergency Contacts</span>
                </div>
                <Button onClick={addEmergencyContact} size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  Add Contact
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {preferences.emergency_contacts.map((contact, index) => (
                <Card key={index} className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input
                        value={contact.name}
                        onChange={(e) => updateEmergencyContact(index, 'name', e.target.value)}
                        placeholder="Full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Relationship</Label>
                      <Input
                        value={contact.relationship}
                        onChange={(e) => updateEmergencyContact(index, 'relationship', e.target.value)}
                        placeholder="e.g., Parent, Spouse, Sibling"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <Input
                        value={contact.phone}
                        onChange={(e) => updateEmergencyContact(index, 'phone', e.target.value)}
                        placeholder="Phone number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input
                        value={contact.email}
                        onChange={(e) => updateEmergencyContact(index, 'email', e.target.value)}
                        placeholder="Email address"
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeEmergencyContact(index)}
                    >
                      Remove
                    </Button>
                  </div>
                </Card>
              ))}
              
              {preferences.emergency_contacts.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p>No emergency contacts added yet.</p>
                  <p className="text-sm">Add contacts for safety during your travels.</p>
                </div>
              )}
              
              <div className="flex justify-end">
                <Button onClick={handleSavePreferences}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Emergency Contacts
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <div className="space-y-6">
            {/* Travel Preferences */}
            <Card>
              <CardHeader>
                <CardTitle>Travel Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Preferred Seat</Label>
                    <Input
                      value={preferences.travel_preferences.seat_preference || ''}
                      onChange={(e) => setPreferences(prev => ({
                        ...prev,
                        travel_preferences: { ...prev.travel_preferences, seat_preference: e.target.value }
                      }))}
                      placeholder="e.g., Window, Aisle"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Meal Preference</Label>
                    <Input
                      value={preferences.travel_preferences.meal_preference || ''}
                      onChange={(e) => setPreferences(prev => ({
                        ...prev,
                        travel_preferences: { ...prev.travel_preferences, meal_preference: e.target.value }
                      }))}
                      placeholder="e.g., Vegetarian, Halal"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Special Requirements</Label>
                  <Textarea
                    value={preferences.travel_preferences.special_requirements || ''}
                    onChange={(e) => setPreferences(prev => ({
                      ...prev,
                      travel_preferences: { ...prev.travel_preferences, special_requirements: e.target.value }
                    }))}
                    placeholder="Any special requirements or accessibility needs"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>Email Notifications</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.notification_settings.email}
                      onChange={(e) => setPreferences(prev => ({
                        ...prev,
                        notification_settings: { ...prev.notification_settings, email: e.target.checked }
                      }))}
                      className="toggle"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4" />
                      <span>SMS Notifications</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.notification_settings.sms}
                      onChange={(e) => setPreferences(prev => ({
                        ...prev,
                        notification_settings: { ...prev.notification_settings, sms: e.target.checked }
                      }))}
                      className="toggle"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={handleSavePreferences}>
                <Save className="h-4 w-4 mr-2" />
                Save Preferences
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyProfile;