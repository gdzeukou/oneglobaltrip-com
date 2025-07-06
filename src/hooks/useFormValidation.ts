import { useState, useCallback } from 'react';

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}

export const useFormValidation = (rules: ValidationRules) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = useCallback((field: string, value: any): string => {
    const rule = rules[field];
    if (!rule) return '';

    if (rule.required && (!value || (typeof value === 'string' && !value.trim()))) {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }

    if (value && rule.minLength && value.length < rule.minLength) {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} must be at least ${rule.minLength} characters`;
    }

    if (value && rule.maxLength && value.length > rule.maxLength) {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} must be no more than ${rule.maxLength} characters`;
    }

    if (value && rule.pattern && !rule.pattern.test(value)) {
      if (field === 'email') {
        return 'Please enter a valid email address';
      }
      return `${field.charAt(0).toUpperCase() + field.slice(1)} format is invalid`;
    }

    if (rule.custom) {
      const customError = rule.custom(value);
      if (customError) return customError;
    }

    return '';
  }, [rules]);

  const validateField = useCallback((field: string, value: any) => {
    const error = validate(field, value);
    setErrors(prev => ({ ...prev, [field]: error }));
    return error;
  }, [validate]);

  const validateAll = useCallback((data: Record<string, any>) => {
    const newErrors: Record<string, string> = {};
    const newTouched: Record<string, boolean> = {};
    
    Object.keys(rules).forEach(field => {
      newTouched[field] = true;
      const error = validate(field, data[field]);
      if (error) newErrors[field] = error;
    });

    setTouched(newTouched);
    setErrors(newErrors);
    
    return Object.keys(newErrors).length === 0;
  }, [rules, validate]);

  const touch = useCallback((field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  }, []);

  const clearErrors = useCallback(() => {
    setErrors({});
    setTouched({});
  }, []);

  const hasErrors = Object.keys(errors).some(key => errors[key]);

  return {
    errors,
    touched,
    validateField,
    validateAll,
    touch,
    clearErrors,
    hasErrors
  };
};