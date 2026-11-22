import { useRef, useState } from 'react';
import { BookingPlan, BookingFormData } from '@/types/booking';
import { useAuth } from '@/contexts/AuthContext';
import { BookingProvider, useBooking } from './BookingContext';
import BookingStepAuth from './steps/BookingStepAuth';
import BookingStepContact from './steps/BookingStepContact';
import BookingStepTrip from './steps/BookingStepTrip';
import BookingStepPlan from './steps/BookingStepPlan';
import BookingStepAddOns from './steps/BookingStepAddOns';
import BookingStepPayment, { PendingOrder } from './steps/BookingStepPayment';
import BookingStepConfirmation from './steps/BookingStepConfirmation';
import BookingProgress from './BookingProgress';
import { supabase } from '@/integrations/supabase/client';

interface BookingStepsProps {
  selectedPlan: BookingPlan;
  onClose: () => void;
}

const BookingStepsContent = ({ selectedPlan, onClose }: BookingStepsProps) => {
  const { user } = useAuth();
  const { formData, updateFormData, validateStep, errors } = useBooking();
  const [currentStep, setCurrentStep] = useState(user ? 1 : 0);
  const [paidOrder, setPaidOrder] = useState<PendingOrder | null>(null);
  // One unpaid order per cart. Going back and changing the cart makes a new
  // one; coming back unchanged reuses it (and survives StrictMode re-mounts).
  const pendingOrder = useRef<{ key: string; promise: Promise<PendingOrder> } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form data with selected plan
  useState(() => {
    updateFormData({ 
      selectedPlan,
      selectedAddOns: formData.selectedAddOns || [],
      totalAmount: selectedPlan.price,
      addonsTotal: formData.addonsTotal || 0
    });
  });

  const steps = [
    { id: 0, title: 'Sign In', description: 'Create account or sign in' },
    { id: 1, title: 'Contact', description: 'Your contact details' },
    { id: 2, title: 'Trip Details', description: 'Where and when' },
    { id: 3, title: 'Plan', description: 'Confirm your selection' },
    { id: 4, title: 'Add-Ons', description: 'Optional extras' },
    { id: 5, title: 'Payment', description: 'Secure checkout' },
    { id: 6, title: 'Confirmation', description: 'You\'re all set!' }
  ];

  const handleStepComplete = (stepData: any) => {
    // Validate current step before proceeding
    if (!validateStep(currentStep)) {
      return;
    }
    
    updateFormData(stepData);
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > (user ? 1 : 0)) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const calculateTotal = () => {
    const planPrice = formData.selectedPlan?.price || 0;
    const addonsTotal = formData.selectedAddOns?.reduce((total, item) => {
      return total + (item.addOn.price * item.quantity);
    }, 0) || 0;
    
    return planPrice + addonsTotal;
  };

  // Creates the order as unpaid. The row only says what is being bought;
  // payment_status, order_status and the amounts are set by the
  // square-create-payment function after Square has charged the server price.
  // The database ignores those columns from the browser anyway.
  const ensurePendingOrder = (): Promise<PendingOrder> => {
    if (!user) return Promise.reject(new Error('Sign in to complete your booking'));
    if (!formData.selectedPlan) return Promise.reject(new Error('No plan selected'));

    const order = {
      user_id: user.id,
      plan_type: formData.selectedPlan.id,
      addons: (formData.selectedAddOns || []).map(item => ({ id: item.addOn.id, quantity: item.quantity })),
      trip_meta: { ...formData.trip, contact: formData.contact },
    };
    const key = JSON.stringify(order);
    if (pendingOrder.current?.key === key) return pendingOrder.current.promise;

    const promise = (async () => {
      const { data, error } = await supabase
        .from('ogt_orders')
        // The amounts are required by the column types but are placeholders:
        // the database zeroes them and the payment function writes the real ones.
        .insert({ ...order, plan_price: 0, total_amount: 0 })
        .select('id, order_reference')
        .single();
      if (error) throw error;
      return { id: data.id, orderReference: data.order_reference };
    })();
    promise.catch(() => {
      if (pendingOrder.current?.promise === promise) pendingOrder.current = null;
    });
    pendingOrder.current = { key, promise };
    return promise;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return !user ? (
          <BookingStepAuth onComplete={handleStepComplete} />
        ) : null;
      case 1:
        return (
          <BookingStepContact
            data={formData.contact}
            user={user}
            onComplete={handleStepComplete}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <BookingStepTrip
            data={formData.trip}
            onComplete={handleStepComplete}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <BookingStepPlan
            selectedPlan={formData.selectedPlan!}
            onComplete={handleStepComplete}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <BookingStepAddOns
            selectedPlan={formData.selectedPlan!}
            selectedAddOns={formData.selectedAddOns || []}
            onComplete={handleStepComplete}
            onBack={handleBack}
          />
        );
      case 5:
        return (
          <BookingStepPayment
            formData={formData as BookingFormData}
            totalAmount={calculateTotal()}
            ensureOrder={ensurePendingOrder}
            onPaid={(order) => {
              pendingOrder.current = null;
              setPaidOrder(order);
              setCurrentStep(6);
            }}
            onBack={handleBack}
          />
        );
      case 6:
        return (
          <BookingStepConfirmation
            orderReference={paidOrder?.orderReference ?? null}
            formData={formData as BookingFormData}
            onClose={onClose}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-full flex-col lg:flex-row">
      {/* Progress Sidebar - Mobile responsive */}
      <div className="w-full lg:w-80 bg-muted/30 border-b lg:border-b-0 lg:border-r border-border p-4 lg:p-6 flex-shrink-0">
        <div className="lg:sticky lg:top-0">
          <BookingProgress 
            steps={steps} 
            currentStep={currentStep}
            selectedPlan={formData.selectedPlan!}
            selectedAddOns={formData.selectedAddOns || []}
            totalAmount={calculateTotal()}
          />
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto relative">
        {isLoading && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}
        <div className="min-h-full">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

const BookingSteps = ({ selectedPlan, onClose }: BookingStepsProps) => {
  return (
    <BookingProvider>
      <BookingStepsContent selectedPlan={selectedPlan} onClose={onClose} />
    </BookingProvider>
  );
};

export default BookingSteps;