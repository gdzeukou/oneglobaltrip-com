import { useState } from 'react';
import { MapPin, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useGeolocation } from '@/hooks/useGeolocation';

interface LocationPermissionRequestProps {
  onPermissionGranted?: (coords: { latitude: number; longitude: number }) => void;
  onDismiss?: () => void;
  autoSaveToProfile?: boolean;
}

export const LocationPermissionRequest = ({
  onPermissionGranted,
  onDismiss,
  autoSaveToProfile = true,
}: LocationPermissionRequestProps) => {
  const { requestLocation, saveLocationToProfile, loading } = useGeolocation();
  const [dismissed, setDismissed] = useState(false);

  const handleRequestLocation = async () => {
    const coords = await requestLocation();
    
    if (coords) {
      if (autoSaveToProfile) {
        await saveLocationToProfile(coords);
      }
      
      onPermissionGranted?.({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    }
  };

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  if (dismissed) return null;

  return (
    <Card className="p-4 bg-primary/5 border-primary/20 relative">
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-2 right-2 h-6 w-6 p-0"
        onClick={handleDismiss}
      >
        <X className="h-4 w-4" />
      </Button>
      
      <div className="flex items-start gap-3 pr-8">
        <div className="rounded-full bg-primary/10 p-2 mt-1">
          <MapPin className="h-5 w-5 text-primary" />
        </div>
        
        <div className="flex-1 space-y-2">
          <h3 className="font-semibold text-foreground">
            Enable Location Access
          </h3>
          <p className="text-sm text-muted-foreground">
            Allow us to access your location to discover nearby travelers and get personalized recommendations.
          </p>
          
          <div className="flex gap-2 pt-2">
            <Button
              onClick={handleRequestLocation}
              disabled={loading}
              size="sm"
              className="bg-primary hover:bg-primary/90"
            >
              {loading ? 'Requesting...' : 'Allow Location'}
            </Button>
            <Button
              onClick={handleDismiss}
              variant="outline"
              size="sm"
            >
              Not Now
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
