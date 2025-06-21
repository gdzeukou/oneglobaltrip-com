
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BookingNavigationProps {
  currentStep: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

const BookingNavigation = ({ currentStep, onPrevious, onNext, onSubmit }: BookingNavigationProps) => {
  return (
    <div className="flex justify-between mt-8 pt-6 border-t">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentStep === 1}
        className="flex items-center space-x-2"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Previous</span>
      </Button>

      {currentStep < 4 ? (
        <Button
          onClick={onNext}
          className="bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 flex items-center space-x-2"
        >
          <span>Next</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      ) : (
        <Button
          onClick={onSubmit}
          className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-blue-900 font-bold flex items-center space-x-2"
        >
          <span>Confirm Booking ($0 Down)</span>
          <CheckCircle className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default BookingNavigation;
