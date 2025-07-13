import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProfileForm } from './ProfileForm';
import { User, AlertCircle } from 'lucide-react';

interface ProfileCompletionProps {
  onComplete: () => void;
}

export const ProfileCompletion = ({ onComplete }: ProfileCompletionProps) => {
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
            <ProfileForm onComplete={onComplete} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};