
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  TrendingUp, 
  Mail, 
  Calendar,
  Database,
  Settings,
  RefreshCw
} from 'lucide-react';
import { useAdminMetrics } from '@/hooks/useAdminMetrics';

// Import existing admin components
import AnalyticsReports from '@/components/admin/AnalyticsReports';
import LeadModal from '@/components/admin/LeadModal';
import EnhancedUserActivity from '@/components/admin/EnhancedUserActivity';
import EmailTemplateManager from '@/components/admin/EmailTemplateManager';
import AutomationManager from '@/components/admin/AutomationManager';
import CalendarView from '@/components/admin/CalendarView';
import UserManagement from '@/components/admin/UserManagement';
import LiveUserManagement from '@/components/admin/LiveUserManagement';

// Import new Supabase components
import SupabaseConfigComponent from '@/components/admin/supabase/SupabaseConfig';
import SupabasePanel from '@/components/admin/supabase/SupabasePanel';

interface SupabaseConfig {
  projectUrl: string;
  anonKey: string;
  serviceRoleKey: string;
}

const AdminDashboard = () => {
  const [supabaseConfig, setSupabaseConfig] = useState<SupabaseConfig | null>(null);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const { 
    totalLeads, 
    conversionRate, 
    emailsSent, 
    appointments, 
    previousMonthLeads,
    previousMonthEmails,
    previousMonthAppointments,
    loading, 
    error,
    calculateChange 
  } = useAdminMetrics();

  const handleSupabaseConfigSaved = (config: SupabaseConfig) => {
    setSupabaseConfig(config);
  };

  const handleLeadUpdate = () => {
    // Refresh leads data
    console.log('Lead updated, refreshing data...');
    // Note: The useAdminMetrics hook could be enhanced to have a refresh function
    window.location.reload(); // Simple refresh for now
  };

  const formatChangeText = (current: number, previous: number, unit: string = '') => {
    const change = calculateChange(current, previous);
    const direction = change > 0 ? '+' : '';
    return `${direction}${change}% from last month${unit}`;
  };

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
          <Button 
            onClick={() => window.location.reload()} 
            variant="outline" 
            className="mt-2"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button variant="outline">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="supabase">Supabase</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-2xl font-bold text-muted-foreground">Loading...</div>
                ) : (
                  <>
                    <div className="text-2xl font-bold">{totalLeads.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">
                      {formatChangeText(totalLeads, previousMonthLeads)}
                    </p>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-2xl font-bold text-muted-foreground">Loading...</div>
                ) : (
                  <>
                    <div className="text-2xl font-bold">{conversionRate}%</div>
                    <p className="text-xs text-muted-foreground">
                      {appointments > 0 ? `${appointments} appointments booked` : 'No appointments yet'}
                    </p>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Emails Sent</CardTitle>
                <Mail className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-2xl font-bold text-muted-foreground">Loading...</div>
                ) : (
                  <>
                    <div className="text-2xl font-bold">{emailsSent.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">
                      {formatChangeText(emailsSent, previousMonthEmails)}
                    </p>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Appointments</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-2xl font-bold text-muted-foreground">Loading...</div>
                ) : (
                  <>
                    <div className="text-2xl font-bold">{appointments}</div>
                    <p className="text-xs text-muted-foreground">
                      {formatChangeText(appointments, previousMonthAppointments)}
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
          
          <AnalyticsReports />
        </TabsContent>

        <TabsContent value="users">
          <LiveUserManagement />
        </TabsContent>

        <TabsContent value="leads">
          <div className="space-y-4">
            <EnhancedUserActivity />
            {selectedLead && (
              <LeadModal 
                lead={selectedLead} 
                onClose={() => setSelectedLead(null)}
                onUpdate={handleLeadUpdate}
              />
            )}
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsReports />
        </TabsContent>

        <TabsContent value="email">
          <EmailTemplateManager />
        </TabsContent>

        <TabsContent value="automation">
          <AutomationManager />
        </TabsContent>

        <TabsContent value="calendar">
          <CalendarView />
        </TabsContent>

        <TabsContent value="supabase" className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Database className="h-6 w-6" />
            <h2 className="text-2xl font-bold">Supabase Integration</h2>
          </div>
          
          {!supabaseConfig ? (
            <SupabaseConfigComponent onConfigSaved={handleSupabaseConfigSaved} />
          ) : (
            <SupabasePanel 
              projectUrl={supabaseConfig.projectUrl}
              anonKey={supabaseConfig.anonKey}
              serviceRoleKey={supabaseConfig.serviceRoleKey}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
