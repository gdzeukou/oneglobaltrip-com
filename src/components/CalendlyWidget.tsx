
import React, { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CalendlyWidgetProps {
  url?: string;
  buttonText?: string;
  className?: string;
  autoOpen?: boolean;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
}

const CalendlyWidget: React.FC<CalendlyWidgetProps> = ({ 
  url = "https://calendly.com/camronm-oneglobaltrip/30min",
  buttonText = "Schedule Your FREE Consultation",
  className = "",
  autoOpen = false,
  variant = "default"
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const loadCalendlyScript = () => {
    return new Promise<void>((resolve, reject) => {
      // Check if script already exists
      if (document.querySelector('script[src*="calendly"]')) {
        console.log('Calendly script already loaded');
        setScriptLoaded(true);
        resolve();
        return;
      }

      console.log('Loading Calendly script...');
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      
      script.onload = () => {
        console.log('Calendly script loaded successfully');
        setScriptLoaded(true);
        resolve();
      };
      
      script.onerror = () => {
        console.error('Failed to load Calendly script');
        reject(new Error('Failed to load Calendly script'));
      };
      
      document.body.appendChild(script);
    });
  };

  const openCalendly = async () => {
    console.log('Opening Calendly widget...');
    setIsLoading(true);

    try {
      // Ensure script is loaded
      if (!scriptLoaded) {
        await loadCalendlyScript();
      }

      // Wait a moment for window.Calendly to be available
      await new Promise(resolve => setTimeout(resolve, 100));

      if (window.Calendly) {
        console.log('Opening Calendly popup');
        window.Calendly.initPopupWidget({ url });
      } else {
        console.log('Calendly not available, opening in new window');
        window.open(url, '_blank', 'width=800,height=700');
      }
    } catch (error) {
      console.error('Error opening Calendly:', error);
      // Fallback to opening in new window
      window.open(url, '_blank', 'width=800,height=700');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Load script on component mount
    loadCalendlyScript().catch(console.error);

    // Auto-open if requested
    if (autoOpen) {
      const timer = setTimeout(() => {
        openCalendly();
      }, 1500); // Increased delay to ensure script is loaded
      return () => clearTimeout(timer);
    }
  }, [autoOpen, url]);

  const buttonStyles = variant === 'default' 
    ? "w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-blue-900 font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
    : "";

  return (
    <div className={className}>
      <Button 
        onClick={openCalendly}
        disabled={isLoading}
        variant={variant}
        className={variant === 'default' ? buttonStyles : "flex items-center space-x-2"}
      >
        <Calendar className="h-5 w-5" />
        <span>{isLoading ? 'Loading...' : buttonText}</span>
      </Button>
    </div>
  );
};

// Add type declaration for Calendly
declare global {
  interface Window {
    Calendly: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

export default CalendlyWidget;
