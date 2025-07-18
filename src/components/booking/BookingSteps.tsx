import { useState } from 'react';
import { BookingPlan, BookingFormData, TripDetails, BookingAddOn } from '@/types/booking';
import { BOOKING_ADDONS, getRelevantAddons } from '@/data/bookingPlans';
import { useAuth } from '@/contexts/AuthContext';
import { BookingProvider, useBooking } from './BookingContext';
import BookingStepAuth from './steps/BookingStepAuth';
import BookingStepContact from './steps/BookingStepContact';
import BookingStepTrip from './steps/BookingStepTrip';
import BookingStepPlan from './steps/BookingStepPlan';
import BookingStepAddOns from './steps/BookingStepAddOns';
import BookingStepPayment from './steps/BookingStepPayment';
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
  const [orderId, setOrderId] = useState<string | null>(null);
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

  const createOrder = async (paymentData: any) => {
    try {
      const orderData = {
        user_id: user?.id || null,
        plan_type: formData.selectedPlan?.id,
        plan_price: formData.selectedPlan?.price,
        trip_meta: formData.trip,
        addons: formData.selectedAddOns?.map(item => ({
          id: item.addOn.id,
          name: item.addOn.name,
          price: item.addOn.price,
          quantity: item.quantity
        })) || [],
        addons_total: formData.addonsTotal || 0,
        total_amount: calculateTotal(),
        currency: 'USD',
        square_payment_id: paymentData.paymentId,
        square_order_id: paymentData.orderId,
        payment_status: 'completed',
        order_status: 'confirmed'
      };

      const { data, error } = await supabase
        .from('ogt_orders')
        .insert(orderData)
        .select()
        .single();

      if (error) throw error;

      setOrderId(data.id);
      
      // Trigger webhook for future automation
      await fetch('/api/webhook/order-created', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_id: data.id, ...orderData })
      }).catch(err => console.log('Webhook trigger failed:', err));

      return data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
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
            onComplete={async (paymentData) => {
              const order = await createOrder(paymentData);
              handleStepComplete({ order });
            }}
            onBack={handleBack}
          />
        );
      case 6:
        return (
          <BookingStepConfirmation
            orderId={orderId}
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