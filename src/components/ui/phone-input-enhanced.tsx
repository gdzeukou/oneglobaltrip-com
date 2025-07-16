import React, { forwardRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface PhoneInputEnhancedProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  label?: string;
  error?: string;
  required?: boolean;
}

const PhoneInputEnhanced = forwardRef<HTMLInputElement, PhoneInputEnhancedProps>(
  ({ value, onChange, placeholder = "Enter your phone number", className, label, error, required, ...props }, ref) => {
    
    const formatPhoneNumber = (input: string) => {
      // Remove all non-numeric characters except + at the beginning
      let cleaned = input.replace(/[^\d+]/g, '');
      
      // If it starts with +, keep only one + at the beginning
      if (cleaned.startsWith('+')) {
        cleaned = '+' + cleaned.slice(1).replace(/\+/g, '');
      }
      
      return cleaned;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatPhoneNumber(e.target.value);
      onChange(formatted);
    };

    return (
      <div className="space-y-2">
        {label && (
          <Label htmlFor="phone" className="text-sm font-medium">
            {label} {required && <span className="text-red-500">*</span>}
          </Label>
        )}
        <Input
          ref={ref}
          id="phone"
          type="tel"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={cn(
            "w-full",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
        <p className="text-xs text-gray-500">
          Examples: +1-555-123-4567, (555) 123-4567, or 5551234567
        </p>
      </div>
    );
  }
);

PhoneInputEnhanced.displayName = "PhoneInputEnhanced";

export { PhoneInputEnhanced };
