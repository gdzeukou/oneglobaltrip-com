
import { useState, useEffect } from 'react';

interface UserIntent {
  intent: 'visa-only' | 'package-with-visa' | 'package-only' | 'consultation' | null;
  destination: string;
  timeframe: string;
  travelers: string;
  timestamp: number;
  source: string;
}

export const useUserIntent = () => {
  const [userIntent, setUserIntent] = useState<UserIntent | null>(null);

  useEffect(() => {
    // Load stored intent from session
    const storedIntent = sessionStorage.getItem('user_application_intent');
    if (storedIntent) {
      try {
        const parsed = JSON.parse(storedIntent);
        // Check if intent is still fresh (within 1 hour)
        const isRecent = Date.now() - parsed.timestamp < 3600000;
        if (isRecent) {
          setUserIntent(parsed);
        } else {
          sessionStorage.removeItem('user_application_intent');
        }
      } catch (error) {
        console.warn('Failed to parse user intent:', error);
        sessionStorage.removeItem('user_application_intent');
      }
    }
  }, []);

  const updateIntent = (newIntent: Partial<UserIntent>) => {
    const updated = {
      ...userIntent,
      ...newIntent,
      timestamp: Date.now()
    } as UserIntent;
    
    setUserIntent(updated);
    sessionStorage.setItem('user_application_intent', JSON.stringify(updated));
  };

  const clearIntent = () => {
    setUserIntent(null);
    sessionStorage.removeItem('user_application_intent');
  };

  const getPersonalizedCTAText = (): string => {
    if (!userIntent) return 'Get Started';
    
    switch (userIntent.intent) {
      case 'visa-only':
        return 'Apply for Visa';
      case 'package-with-visa':
        return 'Explore Packages';
      case 'package-only':
        return 'Browse Experiences';
      case 'consultation':
        return 'Book Consultation';
      default:
        return 'Get Started';
    }
  };

  const getPersonalizedRoute = (): string => {
    if (!userIntent) return '/apply';
    
    switch (userIntent.intent) {
      case 'visa-only':
        return '/apply';
      case 'package-with-visa':
        return userIntent.destination ? `/packages?destination=${userIntent.destination}` : '/packages';
      case 'package-only':
        return '/packages';
      case 'consultation':
        return '/contact';
      default:
        return '/apply';
    }
  };

  return {
    userIntent,
    updateIntent,
    clearIntent,
    getPersonalizedCTAText,
    getPersonalizedRoute,
    hasIntent: Boolean(userIntent?.intent)
  };
};
