
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { BookingPlan } from '@/types/booking';

interface BookingStepPlanProps {
  selectedPlan: BookingPlan;
  onComplete: (data: any) => void;
  onBack: () => void;
}

const BookingStepPlan = ({ selectedPlan, onComplete, onBack }: BookingStepPlanProps) => {
  const handleContinue = () => {
    onComplete({ selectedPlan });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Confirm Your Plan</h2>
        <p className="text-muted-foreground">Review your selected service plan before proceeding.</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">{selectedPlan.name}</CardTitle>
              {selectedPlan.popular && (
                <Badge className="mt-2">Most Popular</Badge>
              )}
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">${selectedPlan.price}</div>
              {selectedPlan.originalPrice && (
                <div className="text-sm text-muted-foreground line-through">
                  ${selectedPlan.originalPrice}
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{selectedPlan.description}</p>
          
          <div className="space-y-2">
            <h4 className="font-medium">What's included:</h4>
            <div className="grid grid-cols-1 gap-2">
              {selectedPlan.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 p-3 bg-muted rounded-lg">
            <div className="text-sm font-medium">Service Level Agreement</div>
            <div className="text-sm text-muted-foreground">{selectedPlan.sla}</div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-2">
          <div className="text-yellow-600 text-sm">
            <strong>Important:</strong> Government visa fees (typically $85-$160) are paid separately to the embassy or consulate. Our service fee covers professional assistance with your application.
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleContinue} className="flex-1">
          Confirm Plan - ${selectedPlan.price}
        </Button>
      </div>
    </div>
  );
};

export default BookingStepPlan;
