import { useAuth } from '@/contexts/AuthContext';
import { ProfileCompletion } from '@/components/profile/ProfileCompletion';
import { Loader2 } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="text-muted-foreground">Loading OneGlobalTrip...</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};