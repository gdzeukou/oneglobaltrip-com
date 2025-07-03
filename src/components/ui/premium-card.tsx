
import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface PremiumCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  intensity?: 'subtle' | 'medium' | 'strong';
}

const PremiumCard = ({ 
  children, 
  className, 
  glowColor = 'blue',
  intensity = 'medium' 
}: PremiumCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });

    // 3D tilt effect
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    cardRef.current.style.transform = `
      perspective(1000px) 
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg) 
      scale3d(1.02, 1.02, 1.02)
    `;
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
  };

  const glowIntensity = {
    subtle: 'drop-shadow-lg',
    medium: 'drop-shadow-2xl',
    strong: 'drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]'
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative transition-all duration-300 ease-out",
        "before:absolute before:inset-0 before:rounded-inherit before:opacity-0 before:transition-opacity before:duration-300",
        `before:bg-gradient-to-r before:from-${glowColor}-500/10 before:to-${glowColor}-600/10`,
        isHovered && "before:opacity-100",
        isHovered && glowIntensity[intensity],
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 0.1s ease-out'
      }}
    >
      {/* Spotlight effect */}
      {isHovered && (
        <div
          className="absolute inset-0 opacity-20 pointer-events-none rounded-inherit"
          style={{
            background: `radial-gradient(circle 100px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.4), transparent)`
          }}
        />
      )}
      
      {children}
    </div>
  );
};

export default PremiumCard;
