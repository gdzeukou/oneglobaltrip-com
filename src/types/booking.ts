export interface BookingPlan {
  id: 'free_ai_agent' | 'visa_assist' | 'global_explorer' | 'enterprise_global_mobility';
  name: string;
  price: number | null;
  originalPrice?: number;
  description: string;
  features: string[];
  sla: string;
  popular?: boolean;
  isAnnual?: boolean;
  badge?: string;
  badgeColor?: string;
  contactSales?: boolean;
  enterprise?: boolean;
  customPrice?: string;
}

export interface BookingAddOn {
  id: string;
  name: string;
  price: number;
  description: string;
  maxQuantity?: number;
}

export interface TripDetails {
  nationality: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  travelers: number;
}

export interface BookingFormData {
  // Auth step
  user?: {
    id: string;
    email: string;
    name?: string;
    phone?: string;
  };
  
  // Contact step
  contact: {
    name: string;
    email: string;
    phone: string;
  };
  
  // Trip step
  trip: TripDetails;
  
  // Plan step
  selectedPlan: BookingPlan;
  
  // Add-ons step
  selectedAddOns: Array<{
    addOn: BookingAddOn;
    quantity: number;
  }>;
  
  // Payment
  totalAmount: number;
  addonsTotal: number;
}

export interface OrderData {
  id: string;
  orderReference: string;
  userId?: string;
  planType: string;
  planPrice: number;
  tripMeta: TripDetails;
  addons: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  addonsTotal: number;
  totalAmount: number;
  currency: string;
  squarePaymentId?: string;
  squareOrderId?: string;
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  orderStatus: 'created' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
}