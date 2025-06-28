
import React from 'react';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface VisaActionButtonProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'lg';
  className?: string;
  icon: LucideIcon;
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
}

const VisaActionButton = ({
  variant = 'default',
  size,
  className = '',
  icon: Icon,
  children,
  onClick,
  href
}: VisaActionButtonProps) => {
  const buttonContent = (
    <>
      <Icon className="w-5 h-5 mr-2" />
      {children}
    </>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block">
        <Button variant={variant} size={size} className={`w-full ${className}`}>
          {buttonContent}
        </Button>
      </a>
    );
  }

  return (
    <Button 
      variant={variant} 
      size={size} 
      className={`w-full ${className}`}
      onClick={onClick}
    >
      {buttonContent}
    </Button>
  );
};

export default VisaActionButton;
