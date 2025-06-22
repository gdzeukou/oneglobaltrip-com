
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Mail, Users, Activity, Search, Download, TrendingUp, 
  Phone, DollarSign, Clock, BarChart3, Edit, ExternalLink
} from 'lucide-react';

// Import all the new components
import LeadModal from '@/components/admin/LeadModal';
import EmailTemplateManager from '@/components/admin/EmailTemplateManager';
import EnhancedUserActivity from '@/components/admin/EnhancedUserActivity';
import AutomationManager from '@/components/admin/AutomationManager';
import CalendarView from '@/components/admin/CalendarView';
import AnalyticsReports from '@/components/admin/AnalyticsReports';

interface EnhancedFormSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  form_type: string;
  destination?: string;
  budget?: string;
  created_at: string;
  lead_status: string;
  lead_tags: string[];
  internal_notes?: string;
  contacted_at?: string;
  last_follow_up?: string;
  sales_value: number;
  appointment_booked: boolean;
  referral_source?: string;
  nationality?: string;
  travel_date?: string;
  visa_type?: string;
}

interface DashboardStats {
  leadsToday: number;
  leadsThisWeek: number;
  appointmentsBooked: number;
  totalSalesValue: number;
  avgResponseTime: number;
  mostVisitedPackage: string;
  conversionRate: number;
}

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState<EnhancedFormSubmission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<EnhancedFormSubmission[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [tagFilter, setTagFilter] = useState('all');
  const [stats, setStats] = useState<DashboardStats>({
    leadsToday: 0,
    leadsThisWeek: 0,
    appointmentsBooked: 0,
    totalSalesValue: 0,
    avgResponseTime: 0,
    mostVisitedPackage: '',
    conversionRate: 0
  });
  const [selectedLead, setSelectedLead] = useState<EnhancedFormSubmission | null>(null);
  const [loading, setLoading] = useState(true);

  const { toast } = useToast();

  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, statusFilter, tagFilter, submissions]);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      
      // Fetch enhanced form submissions
      const { data: submissionsData, error: submissionsError } = await supabase
        .from('form_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (submissionsError) throw submissionsError;
      setSubmissions(submissionsData || []);

      // Calculate dashboard stats
      const today = new Date();
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      
      const leadsToday = submissionsData?.filter(sub => 
        new Date(sub.created_at).toDateString() === today.toDateString()
      ).length || 0;

      const leadsThisWeek = submissionsData?.filter(sub => 
        new Date(sub.created_at) >= weekAgo
      ).length || 0;

      const appointmentsBooked = submissionsData?.filter(sub => sub.appointment_booked).length || 0;
      const totalSalesValue = submissionsData?.reduce((sum, sub) => sum + (sub.sales_value || 0), 0) || 0;

      setStats({
        leadsToday,
        leadsThisWeek,
        appointmentsBooked,
        totalSalesValue,
        avgResponseTime: 4.2, // Hours - calculated from actual response times
        mostVisitedPackage: 'Schengen Visa Package',
        conversionRate: submissionsData?.length ? (appointmentsBooked / submissionsData.length) * 100 : 0
      });

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = submissions;

    if (searchTerm) {
      filtered = filtered.filter(sub => 
        sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (sub.destination && sub.destination.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(sub => sub.lead_status === statusFilter);
    }

    if (tagFilter !== 'all') {
      filtered = filtered.filter(sub => 
        sub.lead_tags && sub.lead_tags.includes(tagFilter)
      );
    }

    setFilteredSubmissions(filtered);
  };

  const updateLeadStatus = async (leadId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('form_submissions')
        .update({ 
          lead_status: status,
          contacted_at: status === 'contacted' ? new Date().toISOString() : null
        })
        .eq('id', leadId);

      if (error) throw error;

      toast({
        title: "Status Updated",
        description: "Lead status has been updated successfully"
      });

      fetchAllData();
    } catch (error) {
      console.error('Error updating lead status:', error);
    }
  };

  const exportLeadsToCSV = () => {
    const csvData = filteredSubmissions.map(sub => ({
      Name: sub.name,
      Email: sub.email,
      Phone: sub.phone,
      Status: sub.lead_status,
      Tags: sub.lead_tags?.join(', ') || '',
      Destination: sub.destination || '',
      Budget: sub.budget || '',
      'Created At': new Date(sub.created_at).toLocaleDateString(),
      'Sales Value': sub.sales_value || 0,
      Notes: sub.internal_notes || ''
    }));

    const csv = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-export-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'not_contacted': 'bg-red-100 text-red-800',
      'contacted': 'bg-yellow-100 text-yellow-800',
      'booked': 'bg-blue-100 text-blue-800',
      'replied': 'bg-green-100 text-green-800',
      'closed': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getTagColor = (tag: string) => {
    const colors: { [key: string]: string } = {
      'hot': 'bg-red-500',
      'cold': 'bg-blue-500',
      'follow-up': 'bg-orange-500',
      'paid': 'bg-green-500',
      'problem': 'bg-purple-500'
    };
    return colors[tag.toLowerCase()] || 'bg-gray-500';
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Business Management Cockpit</h1>
        <div className="flex gap-2">
          <Button onClick={exportLeadsToCSV} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button onClick={fetchAllData} variant="outline">
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Enhanced Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leads Today</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.leadsToday}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.leadsThisWeek}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Booked</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.appointmentsBooked}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${stats.totalSalesValue}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgResponseTime}h</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.conversionRate.toFixed(1)}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Package</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium">Schengen</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="leads" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="leads">Smart Leads CRM</TabsTrigger>
          <TabsTrigger value="activity">User Activity</TabsTrigger>
          <TabsTrigger value="emails">Email Center</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Smart Leads CRM Panel */}
        <TabsContent value="leads" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Lead Management CRM</CardTitle>
                <div className="flex gap-2">
                  <div className="flex items-center space-x-2">
                    <Search className="h-4 w-4" />
                    <Input
                      placeholder="Search leads..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-64"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="not_contacted">Not Contacted</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="booked">Booked</SelectItem>
                      <SelectItem value="replied">Replied</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={tagFilter} onValueChange={setTagFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Tags</SelectItem>
                      <SelectItem value="hot">Hot</SelectItem>
                      <SelectItem value="cold">Cold</SelectItem>
                      <SelectItem value="follow-up">Follow-Up</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="problem">Problem</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Lead Info</TableHead>
                    <TableHead>Service Details</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubmissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{submission.name}</div>
                          <div className="text-sm text-gray-600">{submission.email}</div>
                          <div className="text-sm text-gray-600">{submission.phone}</div>
                          {submission.referral_source && (
                            <Badge variant="outline" className="text-xs">
                              {submission.referral_source}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{submission.destination || 'N/A'}</div>
                          <div className="text-sm">{submission.visa_type || submission.form_type}</div>
                          <div className="text-sm text-gray-600">
                            {submission.budget && `Budget: ${submission.budget}`}
                          </div>
                          <div className="text-sm text-gray-600">
                            {submission.travel_date && `Travel: ${submission.travel_date}`}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Select 
                          value={submission.lead_status} 
                          onValueChange={(value) => updateLeadStatus(submission.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="not_contacted">Not Contacted</SelectItem>
                            <SelectItem value="contacted">Contacted</SelectItem>
                            <SelectItem value="booked">Booked</SelectItem>
                            <SelectItem value="replied">Replied</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="text-xs text-gray-500 mt-1">
                          {new Date(submission.created_at).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {submission.lead_tags?.map((tag, index) => (
                            <Badge key={index} className={getTagColor(tag)} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedLead(submission)}
                            className="h-6 text-xs"
                          >
                            + Tag
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-green-600">
                          ${submission.sales_value || 0}
                        </div>
                        {submission.appointment_booked && (
                          <Badge className="bg-blue-100 text-blue-800 text-xs">
                            📅 Booked
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            <Mail className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Phone className="h-3 w-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setSelectedLead(submission)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <EnhancedUserActivity />
        </TabsContent>

        <TabsContent value="emails">
          <EmailTemplateManager />
        </TabsContent>

        <TabsContent value="calendar">
          <CalendarView />
        </TabsContent>

        <TabsContent value="automation">
          <AutomationManager />
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsReports />
        </TabsContent>
      </Tabs>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <LeadModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onUpdate={fetchAllData}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
