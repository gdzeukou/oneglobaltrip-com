
import React, { useEffect, useState, useCallback, useRef } from 'react';
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
  const loadingRef = useRef(false);
  const mountedRef = useRef(true);

  // Check if Calendly is already available
  const isCalendlyAvailable = useCallback(() => {
    return typeof window !== 'undefined' && window.Calendly && typeof window.Calendly.initPopupWidget === 'function';
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    
    // If Calendly is already loaded, mark as ready
    if (isCalendlyAvailable()) {
      console.log('Calendly already available');
      setIsScriptLoaded(true);
      setError(null);
      return;
    }

    // Prevent multiple loading attempts
    if (loadingRef.current) {
      console.log('Calendly script already loading');
      return;
    }

    // Check if script is already in DOM
    const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
    if (existingScript) {
      console.log('Calendly script already in DOM');
      // Wait for it to load
      const checkLoaded = setInterval(() => {
        if (isCalendlyAvailable()) {
          clearInterval(checkLoaded);
          if (mountedRef.current) {
            setIsScriptLoaded(true);
            setError(null);
          }
        }
      }, 100);
      
      // Timeout after 10 seconds
      setTimeout(() => {
        clearInterval(checkLoaded);
        if (!isCalendlyAvailable() && mountedRef.current) {
          setError('Calendly failed to load');
        }
      }, 10000);
      
      return;
    }

    // Load the script
    loadingRef.current = true;
    console.log('Loading Calendly script...');
    
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    
    script.onload = () => {
      console.log('Calendly script loaded successfully');
      loadingRef.current = false;
      if (mountedRef.current) {
        setIsScriptLoaded(true);
        setError(null);
      }
    };
    
    script.onerror = () => {
      console.error('Failed to load Calendly script');
      loadingRef.current = false;
      if (mountedRef.current) {
        setError('Failed to load Calendly. Please try again.');
        setIsLoading(false);
      }
    };
    
    document.head.appendChild(script);

    return () => {
      loadingRef.current = false;
    };
  }, [isCalendlyAvailable]);

  // Auto-open effect
  useEffect(() => {
    if (isScriptLoaded && autoOpen && !error && mountedRef.current) {
      console.log('Auto-opening Calendly popup');
      const timer = setTimeout(() => {
        if (mountedRef.current) {
          handleCalendlyOpen();
        }
      }, 500); // Small delay to ensure everything is ready
      
      return () => clearTimeout(timer);
    }
  }, [isScriptLoaded, autoOpen, error]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const handleCalendlyOpen = useCallback(() => {
    if (!isCalendlyAvailable()) {
      console.error('Calendly not available');
      setError('Calendly is not available. Please refresh and try again.');
      return;
    }

    if (!mountedRef.current) {
      console.log('Component unmounted, skipping Calendly open');
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
      
      // Listen for Calendly events with cleanup
      const handleCalendlyEvent = (e: MessageEvent) => {
        if (e.data?.event && typeof e.data.event === 'string' && e.data.event.indexOf('calendly') === 0) {
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
      if (mountedRef.current) {
        setError('Unable to open calendar. Please try again.');
      }
    } finally {
      if (mountedRef.current) {
        setIsLoading(false);
      }
    }
  }, [url, isCalendlyAvailable]);

  if (error) {
    return (
      <div className={`text-center ${className}`}>
        <p className="text-red-600 mb-2 text-sm">{error}</p>
        <Button 
          onClick={() => window.location.reload()} 
          variant="outline"
          size="sm"
        >
          Refresh Page
        </Button>
      </div>
    );
  }

  return (
    <div className={className}>
      <Button
        onClick={handleCalendlyOpen}
        disabled={!isScriptLoaded || isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
      >
        {isLoading ? 'Opening Calendar...' : !isScriptLoaded ? 'Loading Calendar...' : buttonText}
      </Button>
      
      {!isScriptLoaded && !error && (
        <p className="text-xs text-gray-500 mt-1 text-center">Loading calendar widget...</p>
      )}
    </div>
  );
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: any) => void;
    };
  }
}

export default CalendlyWidget;
