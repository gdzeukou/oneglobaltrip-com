
import React, { useEffect } from 'react';
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
  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url });
    } else {
      window.open(url, '_blank', 'width=800,height=700');
    }
  };

  useEffect(() => {
    // Load Calendly script if not already loaded
    if (!window.Calendly && !document.querySelector('script[src*="calendly"]')) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);
    }

    // Auto-open if requested
    if (autoOpen) {
      const timer = setTimeout(() => {
        openCalendly();
      }, 1000);
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
        variant={variant}
        className={variant === 'default' ? buttonStyles : "flex items-center space-x-2"}
      >
        <Calendar className="h-5 w-5" />
        <span>{buttonText}</span>
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
