import { Check, Clock } from 'lucide-react';
import { BookingPlan, BookingAddOn } from '@/types/booking';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface Step {
  id: number;
  title: string;
  description: string;
}

interface BookingProgressProps {
  steps: Step[];
  currentStep: number;
  selectedPlan: BookingPlan;
  selectedAddOns: Array<{ addOn: BookingAddOn; quantity: number }>;
  totalAmount: number;
}

const BookingProgress = ({ 
  steps, 
  currentStep, 
  selectedPlan, 
  selectedAddOns,
  totalAmount 
}: BookingProgressProps) => {
  const getStepStatus = (stepId: number) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'upcoming';
  };

  const addonsTotal = selectedAddOns.reduce((total, item) => {
    return total + (item.addOn.price * item.quantity);
  }, 0);

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div>
        <h3 className="font-semibold text-foreground mb-4 font-[Inter]">
          Booking Progress
        </h3>
        <div className="space-y-3">
          {steps.map((step, index) => {
            const status = getStepStatus(step.id);
            return (
              <div key={step.id} className="flex items-center space-x-3">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  status === 'completed' 
                    ? 'bg-emerald-500 text-white' 
                    : status === 'current'
                    ? 'bg-primary text-white'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {status === 'completed' ? (
                    <Check className="h-4 w-4" />
                  ) : status === 'current' ? (
                    <Clock className="h-4 w-4" />
                  ) : (
                    step.id + 1
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${
                    status === 'current' ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Separator />

      {/* Order Summary */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-[Inter]">Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Selected Plan */}
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <p className="font-medium text-foreground">{selectedPlan?.name}</p>
              <p className="text-xs text-muted-foreground">{selectedPlan?.description}</p>
            </div>
            <p className="font-semibold text-foreground">${selectedPlan?.price}</p>
          </div>

          {/* Add-ons */}
          {selectedAddOns.length > 0 && (
            <>
              <Separator />
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Add-ons</p>
                {selectedAddOns.map((item, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <div className="flex-1">
                      <span className="text-foreground">{item.addOn.name}</span>
                      {item.quantity > 1 && (
                        <span className="text-muted-foreground ml-1">x{item.quantity}</span>
                      )}
                    </div>
                    <span className="text-foreground font-medium">
                      ${item.addOn.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}

          <Separator />

          {/* Total */}
          <div className="flex justify-between items-center">
            <p className="font-semibold text-foreground">Total</p>
            <p className="font-bold text-xl text-primary">${totalAmount}</p>
          </div>

          {/* Transparency Notice */}
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-xs text-yellow-800">
              <strong>Note:</strong> Government visa fees (≈$85-$160) are paid separately to the embassy
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingProgress;