
import React from 'react';
import { PopupWidget } from 'react-calendly';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CalendlyWidgetProps {
  url: string;
  buttonText?: string;
  className?: string;
}

const CalendlyWidget: React.FC<CalendlyWidgetProps> = ({ 
  url, 
  buttonText = "Schedule Now",
  className = ""
}) => {
  return (
    <div className={className}>
      <PopupWidget
        url={url}
        rootElement={document.getElementById('root') as HTMLElement}
        text={buttonText}
        textColor="#ffffff"
        color="#1e3a8a"
        render={({ onClick }) => (
          <Button 
            onClick={onClick}
            className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Calendar className="h-5 w-5" />
            <span>{buttonText}</span>
          </Button>
        )}
      />
    </div>
  );
};

export default CalendlyWidget;
