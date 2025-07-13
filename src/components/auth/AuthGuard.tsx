import { useAuth } from '@/contexts/AuthContext';
import { ProfileCompletion } from '@/components/profile/ProfileCompletion';
import { Loader2 } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { user, loading, needsProfile } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  // No longer blocking access for incomplete profiles
  // Profile completion is now optional

  return <>{children}</>;
};