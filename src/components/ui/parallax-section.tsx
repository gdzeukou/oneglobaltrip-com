
import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { throttle } from '@/utils/performance';

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  backgroundImage?: string;
  speed?: number;
  disabled?: boolean;
}

const ParallaxSection = ({ 
  children, 
  className, 
  backgroundImage, 
  speed = 0.5, 
  disabled = false 
}: ParallaxSectionProps) => {
  const [offset, setOffset] = useState(0);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled) return;

    const handleScroll = throttle(() => {
      if (!parallaxRef.current) return;

      const rect = parallaxRef.current.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const rate = scrolled * -speed;
      
      // Only apply parallax when element is in viewport
      if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
        setOffset(rate);
      }
    }, 16); // ~60fps

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, disabled]);

  return (
    <div 
      ref={parallaxRef}
      className={cn("relative overflow-hidden", className)}
    >
      {/* Parallax Background */}
      {backgroundImage && (
        <div 
          className="absolute inset-0 will-change-transform"
          style={{
            transform: `translate3d(0, ${offset}px, 0)`,
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default ParallaxSection;
