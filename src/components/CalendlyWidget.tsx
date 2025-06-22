
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface CalendlyWidgetProps {
  url?: string;
  buttonText?: string;
  className?: string;
  autoOpen?: boolean;
}

const CalendlyWidget: React.FC<CalendlyWidgetProps> = ({ 
  url = "https://calendly.com/camronm-oneglobaltrip/30min",
  buttonText = "Schedule Consultation",
  className = "",
  autoOpen = false
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if Calendly is already loaded
    if (window.Calendly) {
      setIsScriptLoaded(true);
      console.log('Calendly already loaded');
      return;
    }

    // Load Calendly script
    const loadCalendlyScript = () => {
      console.log('Loading Calendly script...');
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      
      script.onload = () => {
        console.log('Calendly script loaded successfully');
        setIsScriptLoaded(true);
        setError(null);
      };
      
      script.onerror = () => {
        console.error('Failed to load Calendly script');
        setError('Failed to load Calendly. Please try again.');
        setIsLoading(false);
      };
      
      document.body.appendChild(script);
    };

    // Try to load with retry mechanism
    let retryCount = 0;
    const maxRetries = 3;
    
    const tryLoad = () => {
      if (retryCount < maxRetries) {
        retryCount++;
        console.log(`Attempting to load Calendly (attempt ${retryCount})`);
        loadCalendlyScript();
      } else {
        setError('Unable to load Calendly after multiple attempts');
        setIsLoading(false);
      }
    };

    tryLoad();

    return () => {
      // Cleanup: remove script if component unmounts
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  useEffect(() => {
    // Auto-open if requested and script is loaded
    if (isScriptLoaded && autoOpen && window.Calendly) {
      console.log('Auto-opening Calendly popup');
      handleCalendlyOpen();
    }
  }, [isScriptLoaded, autoOpen]);

  const handleCalendlyOpen = () => {
    if (!window.Calendly) {
      console.error('Calendly not loaded');
      setError('Calendly is not available. Please refresh and try again.');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Opening Calendly popup with URL:', url);
      window.Calendly.initPopupWidget({
        url: url,
        utm: {
          utmCampaign: 'visa-application',
          utmSource: 'website',
          utmMedium: 'widget'
        }
      });
      
      // Listen for Calendly events
      const handleCalendlyEvent = (e: any) => {
        if (e.data.event && e.data.event.indexOf('calendly') === 0) {
          console.log('Calendly event:', e.data.event);
          if (e.data.event === 'calendly.event_scheduled') {
            console.log('Event scheduled successfully');
          }
        }
      };
      
      window.addEventListener('message', handleCalendlyEvent);
      
      // Clean up event listener after 30 seconds
      setTimeout(() => {
        window.removeEventListener('message', handleCalendlyEvent);
      }, 30000);
      
    } catch (error) {
      console.error('Error opening Calendly:', error);
      setError('Unable to open calendar. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <div className={`text-center ${className}`}>
        <p className="text-red-600 mb-4">{error}</p>
        <Button 
          onClick={() => window.location.reload()} 
          variant="outline"
          className="w-full"
        >
          Refresh Page
        </Button>
      </div>
    );
  }

  return (
    <div className={`text-center ${className}`}>
      <Button
        onClick={handleCalendlyOpen}
        disabled={!isScriptLoaded || isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
      >
        {isLoading ? 'Loading...' : !isScriptLoaded ? 'Loading Calendar...' : buttonText}
      </Button>
      
      {!isScriptLoaded && !error && (
        <p className="text-sm text-gray-500 mt-2">Loading calendar widget...</p>
      )}
    </div>
  );
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    Calendly: any;
  }
}

export default CalendlyWidget;
