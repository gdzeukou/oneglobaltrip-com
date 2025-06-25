
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  animation?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' | 'slideInUp';
}

const animations = {
  fadeInUp: {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
  },
  fadeInLeft: {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
  },
  fadeInRight: {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
  },
  slideInUp: {
    initial: { opacity: 0, y: 100 },
    animate: { opacity: 1, y: 0 },
  },
};

export const AnimatedSection = ({ 
  children, 
  className, 
  delay = 0, 
  duration = 0.6,
  animation = 'fadeInUp' 
}: AnimatedSectionProps) => {
  const selectedAnimation = animations[animation];

  return (
    <motion.div
      className={cn(className)}
      initial={selectedAnimation.initial}
      whileInView={selectedAnimation.animate}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration,
        delay,
        ease: [0.21, 1.11, 0.81, 0.99],
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
