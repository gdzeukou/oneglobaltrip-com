
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface CalendlyWidgetProps {
  url?: string;
  buttonText?: string;
  className?: string;
}

const CalendlyWidget: React.FC<CalendlyWidgetProps> = ({ 
  url = "https://calendly.com/camronm-oneglobaltrip/30min",
  buttonText = "Schedule Consultation",
  className = ""
}) => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    // Check if Calendly is already available
    if (window.Calendly) {
      setIsScriptLoaded(true);
      return;
    }

    // Check if script is already loading/loaded
    if (document.querySelector('script[src*="calendly.com"]')) {
      // Wait for it to load
      const checkCalendly = setInterval(() => {
        if (window.Calendly) {
          setIsScriptLoaded(true);
          clearInterval(checkCalendly);
        }
      }, 100);
      
      // Cleanup after 10 seconds
      setTimeout(() => clearInterval(checkCalendly), 10000);
      return;
    }

    // Load the script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    
    script.onload = () => {
      setIsScriptLoaded(true);
    };
    
    document.head.appendChild(script);
  }, []);

  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url });
    } else {
      // Fallback: open in new tab
      window.open(url, '_blank');
    }
  };

  return (
    <div className={className}>
      <Button
        onClick={openCalendly}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
      >
        {buttonText}
      </Button>
    </div>
  );
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

export default CalendlyWidget;
