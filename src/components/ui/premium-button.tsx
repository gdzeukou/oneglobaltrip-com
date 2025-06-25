
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button, ButtonProps } from './button';

interface PremiumButtonProps extends ButtonProps {
  glow?: boolean;
  pulse?: boolean;
  scale?: boolean;
}

export const PremiumButton = ({ 
  children, 
  className, 
  glow = false, 
  pulse = false, 
  scale = true,
  ...props 
}: PremiumButtonProps) => {
  return (
    <motion.div
      whileHover={scale ? { scale: 1.02 } : {}}
      whileTap={scale ? { scale: 0.98 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Button
        className={cn(
          "relative overflow-hidden transition-all duration-300",
          glow && "shadow-glow hover:shadow-glow-lg",
          pulse && "animate-pulse-glow",
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700",
          className
        )}
        {...props}
      >
        <span className="relative z-10">{children}</span>
      </Button>
    </motion.div>
  );
};

export default PremiumButton;
