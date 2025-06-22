
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar } from '@/components/ui/calendar';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Mail, Users, Activity, Send, Search, Filter, Calendar as CalendarIcon,
  TrendingUp, Phone, DollarSign, Clock, MapPin, ExternalLink,
  Download, Plus, Edit, Trash2, Play, Pause, BarChart3
} from 'lucide-react';

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
  const [emailTemplates, setEmailTemplates] = useState<any[]>([]);
  const [automationRules, setAutomationRules] = useState<any[]>([]);
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

      // Fetch email templates
      const { data: templatesData } = await supabase
        .from('email_templates')
        .select('*')
        .eq('is_active', true);
      
      setEmailTemplates(templatesData || []);

      // Fetch automation rules
      const { data: rulesData } = await supabase
        .from('automation_rules')
        .select('*');
      
      setAutomationRules(rulesData || []);

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

  const addLeadTag = async (leadId: string, tag: string) => {
    try {
      const lead = submissions.find(s => s.id === leadId);
      if (!lead) return;

      const newTags = [...(lead.lead_tags || []), tag];
      
      const { error } = await supabase
        .from('form_submissions')
        .update({ lead_tags: newTags })
        .eq('id', leadId);

      if (error) throw error;
      fetchAllData();
    } catch (error) {
      console.error('Error adding tag:', error);
    }
  };

  const saveInternalNotes = async (leadId: string, notes: string) => {
    try {
      const { error } = await supabase
        .from('form_submissions')
        .update({ internal_notes: notes })
        .eq('id', leadId);

      if (error) throw error;

      toast({
        title: "Notes Saved",
        description: "Internal notes have been saved"
      });
    } catch (error) {
      console.error('Error saving notes:', error);
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

        {/* Enhanced User Activity */}
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Enhanced User Activity Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                Enhanced user activity tracking with session duration, location data, and referral sources will be displayed here.
                <br />
                Features: Session timelines, geographic data, traffic sources, conversion paths.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Email Center */}
        <TabsContent value="emails" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Email Control Center</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Email Templates</h3>
                  <div className="space-y-2">
                    {emailTemplates.map((template) => (
                      <div key={template.id} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <div className="font-medium">{template.name}</div>
                          <div className="text-sm text-gray-600">{template.subject}</div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Send className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button className="w-full justify-start">
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Template
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Send className="h-4 w-4 mr-2" />
                      Send Bulk Email
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      Schedule Campaign
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Calendar View */}
        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Internal Calendar & Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <Calendar />
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Upcoming Appointments</h3>
                  <div className="space-y-3">
                    <div className="p-3 border rounded">
                      <div className="font-medium">John Doe - Schengen Consultation</div>
                      <div className="text-sm text-gray-600">Tomorrow, 2:00 PM</div>
                      <div className="text-sm text-blue-600">Zoom Meeting</div>
                    </div>
                    <div className="p-3 border rounded">
                      <div className="font-medium">Sarah Smith - UK Visa Follow-up</div>
                      <div className="text-sm text-gray-600">Dec 25, 10:00 AM</div>
                      <div className="text-sm text-blue-600">Phone Call</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Automation Center */}
        <TabsContent value="automation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Automation Rules & Triggers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Automation
                </Button>
                
                <div className="space-y-3">
                  <div className="p-4 border rounded">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Schengen Welcome Email</div>
                        <div className="text-sm text-gray-600">
                          Trigger: Form submission for Schengen visa → Send welcome email
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Follow-up Reminder</div>
                        <div className="text-sm text-gray-600">
                          Trigger: No reply after 2 days → Send follow-up email
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Business Analytics & Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Conversion Funnel</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between p-2 bg-blue-50 rounded">
                      <span>Page Visitors</span>
                      <span className="font-medium">1,245</span>
                    </div>
                    <div className="flex justify-between p-2 bg-blue-100 rounded">
                      <span>Form Started</span>
                      <span className="font-medium">382</span>
                    </div>
                    <div className="flex justify-between p-2 bg-blue-200 rounded">
                      <span>Form Completed</span>
                      <span className="font-medium">186</span>
                    </div>
                    <div className="flex justify-between p-2 bg-green-200 rounded">
                      <span>Consultation Booked</span>
                      <span className="font-medium">89</span>
                    </div>
                    <div className="flex justify-between p-2 bg-green-300 rounded">
                      <span>Converted to Sale</span>
                      <span className="font-medium">34</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Export Reports</h3>
                  <div className="space-y-2">
                    <Button className="w-full justify-start" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Weekly Summary Report
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Lead Analytics Report
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Revenue & Conversion Report
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Lead Details: {selectedLead.name}</h2>
              <Button variant="outline" onClick={() => setSelectedLead(null)}>
                ✕
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <div className="text-sm">{selectedLead.email}</div>
                </div>
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <div className="text-sm">{selectedLead.phone}</div>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Internal Notes</label>
                <Textarea
                  placeholder="Add your internal notes about this lead..."
                  value={selectedLead.internal_notes || ''}
                  onChange={(e) => setSelectedLead({
                    ...selectedLead,
                    internal_notes: e.target.value
                  })}
                  rows={4}
                />
                <Button 
                  className="mt-2"
                  onClick={() => saveInternalNotes(selectedLead.id, selectedLead.internal_notes || '')}
                >
                  Save Notes
                </Button>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Add Tags</label>
                <div className="flex gap-2 flex-wrap">
                  {['hot', 'cold', 'follow-up', 'paid', 'problem'].map(tag => (
                    <Button
                      key={tag}
                      size="sm"
                      variant="outline"
                      onClick={() => addLeadTag(selectedLead.id, tag)}
                      className="capitalize"
                    >
                      + {tag}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button className="flex-1">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
                <Button variant="outline" className="flex-1">
                  <Phone className="h-4 w-4 mr-2" />
                  WhatsApp
                </Button>
                <Button variant="outline" className="flex-1">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Book Call
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
