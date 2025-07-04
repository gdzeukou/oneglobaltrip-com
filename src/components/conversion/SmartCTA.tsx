import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Zap, ArrowRight } from 'lucide-react';
import { useUserIntent } from '@/hooks/useUserIntent';

interface SmartCTAProps {
  variant?: 'primary' | 'secondary' | 'urgent';
  size?: 'sm' | 'md' | 'lg';
  location: string;
  className?: string;
  onClick?: () => void;
}

const SmartCTA = ({ 
  variant = 'primary', 
  size = 'md', 
  location, 
  className = '',
  onClick 
}: SmartCTAProps) => {
  const { userIntent, getPersonalizedCTAText, getPersonalizedRoute } = useUserIntent();
  const [urgencyData, setUrgencyData] = useState<{
    timeLeft: string;
    spotsLeft: number;
    recentBookings: number;
  } | null>(null);

  // Simulate real-time urgency data
  useEffect(() => {
    const updateUrgencyData = () => {
      const now = new Date();
      const endOfDay = new Date(now);
      endOfDay.setHours(23, 59, 59, 999);
      
      const timeLeft = Math.floor((endOfDay.getTime() - now.getTime()) / 1000 / 60 / 60);
      const spotsLeft = Math.floor(Math.random() * 12) + 3; // 3-15 spots
      const recentBookings = Math.floor(Math.random() * 8) + 2; // 2-10 bookings
      
      setUrgencyData({ 
        timeLeft: `${timeLeft}h`, 
        spotsLeft, 
        recentBookings 
      });
    };

    updateUrgencyData();
    const interval = setInterval(updateUrgencyData, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);

  const getDynamicText = () => {
    if (userIntent?.intent) {
      return getPersonalizedCTAText();
    }

    // Default dynamic texts based on location and urgency
    const locationTexts = {
      hero: variant === 'urgent' ? 'Claim Your Spot Now' : 'Start Your Journey',
      pricing: variant === 'urgent' ? 'Lock in This Rate' : 'Choose Your Package',
      testimonials: 'Join 15,000+ Happy Travelers',
      footer: 'Get Started Today'
    };

    return locationTexts[location as keyof typeof locationTexts] || 'Get Started';
  };

  const getButtonVariant = () => {
    switch (variant) {
      case 'urgent':
        return 'default';
      case 'secondary':
        return 'outline';
      default:
        return 'default';
    }
  };

  const getButtonClasses = () => {
    const baseClasses = 'transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl';
    
    switch (variant) {
      case 'urgent':
        return `${baseClasses} bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white animate-pulse`;
      case 'secondary':
        return `${baseClasses} border-2 border-primary hover:bg-primary hover:text-primary-foreground`;
      default:
        return `${baseClasses} bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground`;
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'lg':
        return 'text-lg px-8 py-4';
      case 'sm':
        return 'text-sm px-4 py-2';
      default:
        return 'text-base px-6 py-3';
    }
  };

  return (
    <div className={`flex flex-col items-center space-y-3 ${className}`}>
      {/* Urgency Indicators */}
      {variant === 'urgent' && urgencyData && (
        <div className="flex flex-wrap gap-2 justify-center">
          <Badge variant="destructive" className="bg-red-100 text-red-700 border border-red-200">
            <Clock className="h-3 w-3 mr-1" />
            {urgencyData.timeLeft} left today
          </Badge>
          <Badge variant="secondary" className="bg-orange-100 text-orange-700 border border-orange-200">
            <Users className="h-3 w-3 mr-1" />
            Only {urgencyData.spotsLeft} spots left
          </Badge>
          <Badge variant="secondary" className="bg-green-100 text-green-700 border border-green-200">
            <Zap className="h-3 w-3 mr-1" />
            {urgencyData.recentBookings} booked today
          </Badge>
        </div>
      )}

      {/* Main CTA Button */}
      <Button
        variant={getButtonVariant()}
        size={size === 'md' ? 'default' : size}
        className={`${getButtonClasses()} ${getSizeClasses()}`}
        onClick={onClick}
      >
        {getDynamicText()}
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>

      {/* Social Proof Indicator */}
      {location === 'hero' && (
        <p className="text-sm text-muted-foreground flex items-center">
          <Users className="h-4 w-4 mr-1" />
          Join 15,000+ travelers who got their visas approved
        </p>
      )}
    </div>
  );
};

export default SmartCTA;