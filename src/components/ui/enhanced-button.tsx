import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import LoadingSpinner from '@/components/common/LoadingSpinner';

interface EnhancedButtonProps extends ButtonProps {
  loading?: boolean;
  loadingText?: string;
}

const EnhancedButton = React.forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({ children, loading = false, loadingText, disabled, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <LoadingSpinner size="sm" className="mr-2" />}
        {loading && loadingText ? loadingText : children}
      </Button>
    );
  }
);

EnhancedButton.displayName = 'EnhancedButton';

export { EnhancedButton };