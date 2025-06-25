
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
}

export const GlassCard = ({ 
  children, 
  className, 
  hover = true, 
  gradient = false 
}: GlassCardProps) => {
  return (
    <motion.div
      className={cn(
        "relative backdrop-blur-md bg-white/10 border border-white/20 rounded-xl",
        "shadow-premium",
        gradient && "bg-gradient-to-br from-white/20 to-white/5",
        hover && "hover:shadow-premium-hover hover:bg-white/15 transition-all duration-300",
        className
      )}
      whileHover={hover ? { y: -5 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="absolute inset-0 bg-noise opacity-30 rounded-xl" />
      <div className="relative z-10 p-6">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;
