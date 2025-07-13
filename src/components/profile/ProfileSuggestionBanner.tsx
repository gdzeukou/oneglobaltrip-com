import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, X } from 'lucide-react';
import { useState } from 'react';
import { ProfileCompletion } from './ProfileCompletion';

export const ProfileSuggestionBanner = () => {
  const { user, needsProfile } = useAuth();
  const [isDismissed, setIsDismissed] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);

  // Don't show if user not logged in, profile is complete, or user dismissed
  if (!user || !needsProfile || isDismissed) {
    return null;
  }

  // Show full profile completion form if user clicked "Complete Now"
  if (showProfileForm) {
    return (
      <ProfileCompletion 
        onComplete={() => {
          setShowProfileForm(false);
          setIsDismissed(true);
        }} 
      />
    );
  }

  return (
    <Card className="mx-4 mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <User className="h-5 w-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">
              Complete Your Profile
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Complete your travel profile to get personalized recommendations and faster visa applications.
            </p>
            <div className="flex gap-2">
              <Button 
                size="sm"
                onClick={() => setShowProfileForm(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Complete Now
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setIsDismissed(true)}
              >
                Maybe Later
              </Button>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsDismissed(true)}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};