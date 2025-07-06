import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from '@supabase/supabase-js';

interface BookingStepContactProps {
  data?: any;
  user?: User | null;
  onComplete: (data: any) => void;
  onBack: () => void;
}

const BookingStepContact = ({ data, user, onComplete, onBack }: BookingStepContactProps) => {
  const [formData, setFormData] = useState({
    name: data?.name || user?.user_metadata?.full_name || '',
    email: data?.email || user?.email || '',
    phone: data?.phone || user?.user_metadata?.phone || ''
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (field: string, value: string) => {
    switch (field) {
      case 'name':
        return value.trim() ? '' : 'Name is required';
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
        return '';
      case 'phone':
        return value.trim() ? '' : 'Phone number is required';
      default:
        return '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true });
    
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field as keyof typeof formData]);
      if (error) newErrors[field] = error;
    });
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      onComplete({ contact: formData });
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field as keyof typeof formData]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 lg:p-6">
      <div className="mb-6 lg:mb-8">
        <h2 className="text-xl lg:text-2xl font-bold mb-2">Contact Information</h2>
        <p className="text-sm lg:text-base text-muted-foreground">We'll use this to keep you updated on your booking.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
        <div className="space-y-4 lg:space-y-6">
          <div>
            <Label htmlFor="name" className="text-sm lg:text-base">Full Name *</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              onBlur={() => handleBlur('name')}
              placeholder="Enter your full name"
              className={`mt-1 ${touched.name && errors.name ? 'border-destructive' : ''}`}
              required
            />
            {touched.name && errors.name && (
              <p className="text-xs lg:text-sm text-destructive mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email" className="text-sm lg:text-base">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              placeholder="Enter your email address"
              className={`mt-1 ${touched.email && errors.email ? 'border-destructive' : ''}`}
              required
            />
            {touched.email && errors.email && (
              <p className="text-xs lg:text-sm text-destructive mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone" className="text-sm lg:text-base">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              onBlur={() => handleBlur('phone')}
              placeholder="+1 (555) 123-4567"
              className={`mt-1 ${touched.phone && errors.phone ? 'border-destructive' : ''}`}
              required
            />
            {touched.phone && errors.phone && (
              <p className="text-xs lg:text-sm text-destructive mt-1">{errors.phone}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 pt-4 lg:pt-6">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onBack}
            className="w-full sm:w-auto order-2 sm:order-1"
          >
            Back
          </Button>
          <Button 
            type="submit" 
            className="flex-1 order-1 sm:order-2"
            disabled={Object.keys(errors).some(key => errors[key]) || !formData.name.trim() || !formData.email.trim() || !formData.phone.trim()}
          >
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookingStepContact;