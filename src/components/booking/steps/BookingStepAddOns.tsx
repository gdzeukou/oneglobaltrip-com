
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Minus } from 'lucide-react';
import { BookingPlan, BookingAddOn } from '@/types/booking';
import { BOOKING_ADDONS, getExtraTravelerAddon } from '@/data/bookingPlans';

interface BookingStepAddOnsProps {
  selectedPlan: BookingPlan;
  selectedAddOns: Array<{ addOn: BookingAddOn; quantity: number }>;
  onComplete: (data: any) => void;
  onBack: () => void;
}

const BookingStepAddOns = ({ selectedPlan, selectedAddOns, onComplete, onBack }: BookingStepAddOnsProps) => {
  const [addOns, setAddOns] = useState<Array<{ addOn: BookingAddOn; quantity: number }>>(selectedAddOns);

  // Filter relevant add-ons based on the selected plan
  const relevantAddOns = BOOKING_ADDONS.filter(addon => {
    // Always show general add-ons
    if (!addon.id.includes('extra_traveler')) return true;
    
    // Show the correct extra traveler addon for the selected plan
    const extraTravelerAddon = getExtraTravelerAddon(selectedPlan.id);
    return addon.id === extraTravelerAddon.id;
  });

  const updateQuantity = (addonId: string, change: number) => {
    setAddOns(prev => {
      const existingIndex = prev.findIndex(item => item.addOn.id === addonId);
      const addon = relevantAddOns.find(a => a.id === addonId)!;
      
      if (existingIndex >= 0) {
        const newQuantity = Math.max(0, Math.min(prev[existingIndex].quantity + change, addon.maxQuantity || 10));
        
        if (newQuantity === 0) {
          return prev.filter((_, index) => index !== existingIndex);
        }
        
        return prev.map((item, index) => 
          index === existingIndex ? { ...item, quantity: newQuantity } : item
        );
      } else if (change > 0) {
        return [...prev, { addOn: addon, quantity: 1 }];
      }
      
      return prev;
    });
  };

  const getQuantity = (addonId: string) => {
    const item = addOns.find(item => item.addOn.id === addonId);
    return item ? item.quantity : 0;
  };

  const calculateAddOnsTotal = () => {
    return addOns.reduce((total, item) => total + (item.addOn.price * item.quantity), 0);
  };

  const handleContinue = () => {
    const addonsTotal = calculateAddOnsTotal();
    onComplete({ 
      selectedAddOns: addOns,
      addonsTotal
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Optional Add-Ons</h2>
        <p className="text-muted-foreground">Enhance your service with these optional extras.</p>
      </div>

      <div className="grid gap-4 mb-8">
        {relevantAddOns.map((addon) => {
          const quantity = getQuantity(addon.id);
          const isPopular = addon.id === 'rush_prep' || addon.id === 'extra_traveler_bundle';
          
          return (
            <Card key={addon.id} className="relative">
              {isPopular && (
                <Badge className="absolute -top-2 left-4 bg-orange-500">
                  Popular
                </Badge>
              )}
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{addon.name}</CardTitle>
                    <p className="text-muted-foreground text-sm mt-1">{addon.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">${addon.price}</div>
                    {addon.maxQuantity && (
                      <div className="text-xs text-muted-foreground">Max: {addon.maxQuantity}</div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(addon.id, -1)}
                      disabled={quantity === 0}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="font-medium min-w-[2ch] text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(addon.id, 1)}
                      disabled={quantity >= (addon.maxQuantity || 10)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {quantity > 0 && (
                    <div className="text-right">
                      <div className="font-semibold">
                        ${addon.price * quantity}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {quantity} × ${addon.price}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {addOns.length > 0 && (
        <Card className="mb-6 bg-muted/30">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <span className="font-medium">Add-ons Total:</span>
              <span className="text-xl font-bold text-primary">
                ${calculateAddOnsTotal()}
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-4">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleContinue} className="flex-1">
          Continue
          {calculateAddOnsTotal() > 0 && (
            <span className="ml-2">- +${calculateAddOnsTotal()}</span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default BookingStepAddOns;
