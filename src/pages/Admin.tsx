
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Mail, Users, Activity, Send } from 'lucide-react';

interface FormSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  form_type: string;
  destination?: string;
  budget?: string;
  created_at: string;
  travel_needs?: string[];
  special_requests?: string;
}

interface UserActivity {
  id: string;
  email: string;
  page_visited: string;
  action_type: string;
  is_online: boolean;
  last_seen: string;
  created_at: string;
}

const Admin = () => {
  const [formSubmissions, setFormSubmissions] = useState<FormSubmission[]>([]);
  const [userActivity, setUserActivity] = useState<UserActivity[]>([]);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch form submissions
      const { data: submissions, error: submissionsError } = await supabase
        .from('form_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (submissionsError) throw submissionsError;
      setFormSubmissions(submissions || []);

      // Fetch user activity
      const { data: activity, error: activityError } = await supabase
        .from('user_activity')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (activityError) throw activityError;
      setUserActivity(activity || []);

    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch admin data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSelection = (email: string) => {
    setSelectedEmails(prev => 
      prev.includes(email) 
        ? prev.filter(e => e !== email)
        : [...prev, email]
    );
  };

  const selectAllEmails = () => {
    const allEmails = formSubmissions.map(sub => sub.email);
    setSelectedEmails(allEmails);
  };

  const clearEmailSelection = () => {
    setSelectedEmails([]);
  };

  const sendCustomEmail = async () => {
    if (selectedEmails.length === 0 || !emailSubject || !emailContent) {
      toast({
        title: "Missing Information",
        description: "Please select recipients and fill in subject and content",
        variant: "destructive"
      });
      return;
    }

    try {
      // In a real implementation, you would call an edge function to send emails
      // For now, we'll just save the campaign to the database
      const { error } = await supabase
        .from('marketing_campaigns')
        .insert([{
          name: `Custom Email - ${new Date().toISOString().split('T')[0]}`,
          type: 'email',
          subject: emailSubject,
          content: emailContent,
          status: 'sent',
          recipients_count: selectedEmails.length,
          sent_at: new Date().toISOString()
        }]);

      if (error) throw error;

      toast({
        title: "Email Campaign Created",
        description: `Campaign created for ${selectedEmails.length} recipients. In production, integrate with email service to send.`,
      });

      // Clear form
      setEmailSubject('');
      setEmailContent('');
      setSelectedEmails([]);

    } catch (error) {
      console.error('Error creating campaign:', error);
      toast({
        title: "Error",
        description: "Failed to create email campaign",
        variant: "destructive"
      });
    }
  };

  const getOnlineUsers = () => {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    return userActivity.filter(activity => 
      activity.is_online && new Date(activity.last_seen) > fiveMinutesAgo
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">Loading admin dashboard...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button onClick={fetchData} variant="outline">
          Refresh Data
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formSubmissions.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Users Online</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getOnlineUsers().length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Activity</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userActivity.length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="submissions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="submissions">Form Submissions</TabsTrigger>
          <TabsTrigger value="activity">User Activity</TabsTrigger>
          <TabsTrigger value="email">Send Emails</TabsTrigger>
        </TabsList>

        <TabsContent value="submissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Form Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {formSubmissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell className="font-medium">{submission.name}</TableCell>
                      <TableCell>{submission.email}</TableCell>
                      <TableCell>{submission.phone}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{submission.form_type}</Badge>
                      </TableCell>
                      <TableCell>{submission.destination || '-'}</TableCell>
                      <TableCell>{submission.budget || '-'}</TableCell>
                      <TableCell>{new Date(submission.created_at).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Page</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Seen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userActivity.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell className="font-medium">{activity.email}</TableCell>
                      <TableCell>{activity.page_visited}</TableCell>
                      <TableCell>{activity.action_type || '-'}</TableCell>
                      <TableCell>
                        <Badge variant={activity.is_online ? "default" : "secondary"}>
                          {activity.is_online ? "Online" : "Offline"}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(activity.last_seen).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Send Custom Emails</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Button onClick={selectAllEmails} variant="outline">
                  Select All ({formSubmissions.length})
                </Button>
                <Button onClick={clearEmailSelection} variant="outline">
                  Clear Selection
                </Button>
                <span className="text-sm text-muted-foreground self-center">
                  {selectedEmails.length} selected
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 max-h-40 overflow-y-auto border rounded p-4">
                {formSubmissions.map((submission) => (
                  <label key={submission.id} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedEmails.includes(submission.email)}
                      onChange={() => handleEmailSelection(submission.email)}
                      className="rounded"
                    />
                    <span className="text-sm">{submission.name} ({submission.email})</span>
                  </label>
                ))}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Subject</label>
                  <Input
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder="Email subject..."
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Content</label>
                  <Textarea
                    value={emailContent}
                    onChange={(e) => setEmailContent(e.target.value)}
                    placeholder="Email content..."
                    rows={6}
                  />
                </div>

                <Button onClick={sendCustomEmail} className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Create Email Campaign
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
