import { useEffect, useState } from 'react';
import { useGeolocation } from '@/hooks/useGeolocation';
import { LocationPermissionRequest } from './LocationPermissionRequest';
import { useAuth } from '@/contexts/AuthContext';

interface LocationPermissionPromptProps {
  showOnMount?: boolean;
  delayMs?: number;
}

export const LocationPermissionPrompt = ({
  showOnMount = true,
  delayMs = 2000,
}: LocationPermissionPromptProps) => {
  const [showPrompt, setShowPrompt] = useState(false);
  const { permissionStatus } = useGeolocation();
  const { user } = useAuth();

  useEffect(() => {
    // Only show if user is authenticated and permission is not granted
    if (user && showOnMount && permissionStatus !== 'granted') {
      const timer = setTimeout(() => {
        // Check if user hasn't dismissed it in localStorage
        const dismissed = localStorage.getItem('location-permission-dismissed');
        if (!dismissed) {
          setShowPrompt(true);
        }
      }, delayMs);

      return () => clearTimeout(timer);
    }
  }, [user, showOnMount, permissionStatus, delayMs]);

  const handleDismiss = () => {
    setShowPrompt(false);
    // Remember dismissal for 7 days
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);
    localStorage.setItem('location-permission-dismissed', expiryDate.toISOString());
  };

  const handlePermissionGranted = () => {
    setShowPrompt(false);
    localStorage.removeItem('location-permission-dismissed');
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md animate-in slide-in-from-bottom-5">
      <LocationPermissionRequest
        onPermissionGranted={handlePermissionGranted}
        onDismiss={handleDismiss}
      />
    </div>
  );
};
