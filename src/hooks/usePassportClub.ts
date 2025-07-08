import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface PassportClubStatus {
  isActive: boolean;
  expiryDate: string | null;
  daysRemaining: number | null;
}

export const usePassportClub = () => {
  const { user } = useAuth();
  const [status, setStatus] = useState<PassportClubStatus>({
    isActive: false,
    expiryDate: null,
    daysRemaining: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setStatus({ isActive: false, expiryDate: null, daysRemaining: null });
      setLoading(false);
      return;
    }

    const checkMembershipStatus = async () => {
      try {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('membership_expiry')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        const now = new Date();
        const expiryDate = profile?.membership_expiry ? new Date(profile.membership_expiry) : null;
        
        if (expiryDate && expiryDate > now) {
          const daysRemaining = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
          setStatus({
            isActive: true,
            expiryDate: profile.membership_expiry,
            daysRemaining
          });
        } else {
          setStatus({
            isActive: false,
            expiryDate: profile?.membership_expiry || null,
            daysRemaining: null
          });
        }
      } catch (error) {
        console.error('Error checking passport club status:', error);
        setStatus({ isActive: false, expiryDate: null, daysRemaining: null });
      } finally {
        setLoading(false);
      }
    };

    checkMembershipStatus();
  }, [user]);

  const getMemberDiscount = (originalPrice: number): number => {
    return status.isActive ? Math.round(originalPrice * 0.15) : 0;
  };

  const getMemberPrice = (originalPrice: number): number => {
    return originalPrice - getMemberDiscount(originalPrice);
  };

  return {
    status,
    loading,
    getMemberDiscount,
    getMemberPrice,
    isActive: status.isActive
  };
};