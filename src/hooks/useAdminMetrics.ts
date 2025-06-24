
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AdminMetrics {
  totalLeads: number;
  conversionRate: number;
  emailsSent: number;
  appointments: number;
  previousMonthLeads: number;
  previousMonthEmails: number;
  previousMonthAppointments: number;
  loading: boolean;
  error: string | null;
}

export const useAdminMetrics = () => {
  const [metrics, setMetrics] = useState<AdminMetrics>({
    totalLeads: 0,
    conversionRate: 0,
    emailsSent: 0,
    appointments: 0,
    previousMonthLeads: 0,
    previousMonthEmails: 0,
    previousMonthAppointments: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setMetrics(prev => ({ ...prev, loading: true, error: null }));

        // Get current month dates
        const now = new Date();
        const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const currentMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        
        // Get previous month dates
        const previousMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const previousMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

        // Fetch total leads
        const { count: totalLeads } = await supabase
          .from('form_submissions')
          .select('*', { count: 'exact', head: true });

        // Fetch current month leads
        const { count: currentMonthLeads } = await supabase
          .from('form_submissions')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', currentMonthStart.toISOString())
          .lte('created_at', currentMonthEnd.toISOString());

        // Fetch previous month leads
        const { count: previousMonthLeads } = await supabase
          .from('form_submissions')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', previousMonthStart.toISOString())
          .lte('created_at', previousMonthEnd.toISOString());

        // Fetch appointments (leads with appointment_booked = true)
        const { count: appointments } = await supabase
          .from('form_submissions')
          .select('*', { count: 'exact', head: true })
          .eq('appointment_booked', true);

        // Fetch current month appointments
        const { count: currentMonthAppointments } = await supabase
          .from('form_submissions')
          .select('*', { count: 'exact', head: true })
          .eq('appointment_booked', true)
          .gte('created_at', currentMonthStart.toISOString())
          .lte('created_at', currentMonthEnd.toISOString());

        // Fetch previous month appointments
        const { count: previousMonthAppointments } = await supabase
          .from('form_submissions')
          .select('*', { count: 'exact', head: true })
          .eq('appointment_booked', true)
          .gte('created_at', previousMonthStart.toISOString())
          .lte('created_at', previousMonthEnd.toISOString());

        // Fetch emails sent
        const { count: emailsSent } = await supabase
          .from('campaign_sends')
          .select('*', { count: 'exact', head: true });

        // Fetch current month emails
        const { count: currentMonthEmails } = await supabase
          .from('campaign_sends')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', currentMonthStart.toISOString())
          .lte('created_at', currentMonthEnd.toISOString());

        // Fetch previous month emails
        const { count: previousMonthEmailsSent } = await supabase
          .from('campaign_sends')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', previousMonthStart.toISOString())
          .lte('created_at', previousMonthEnd.toISOString());

        // Calculate conversion rate (appointments / total leads * 100)
        const conversionRate = totalLeads && totalLeads > 0 
          ? ((appointments || 0) / totalLeads) * 100 
          : 0;

        setMetrics({
          totalLeads: totalLeads || 0,
          conversionRate: Number(conversionRate.toFixed(1)),
          emailsSent: emailsSent || 0,
          appointments: appointments || 0,
          previousMonthLeads: previousMonthLeads || 0,
          previousMonthEmails: previousMonthEmailsSent || 0,
          previousMonthAppointments: previousMonthAppointments || 0,
          loading: false,
          error: null,
        });

      } catch (error) {
        console.error('Error fetching admin metrics:', error);
        setMetrics(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to load metrics. Please try again.',
        }));
      }
    };

    fetchMetrics();
  }, []);

  const calculateChange = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Number(((current - previous) / previous * 100).toFixed(1));
  };

  return {
    ...metrics,
    calculateChange,
  };
};
