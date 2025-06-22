
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
  const [sending, setSending] = useState(false);
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

    setSending(true);

    try {
      // Send emails using the edge function
      const { data, error } = await supabase.functions.invoke('send-marketing-email', {
        body: {
          recipients: selectedEmails,
          subject: emailSubject,
          content: emailContent,
          campaignName: `Custom Email - ${new Date().toISOString().split('T')[0]}`
        }
      });

      if (error) throw error;

      // Save campaign to database
      await supabase
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

      toast({
        title: "Email Campaign Sent Successfully!",
        description: `Sent to ${data.successful} recipients. ${data.failed} failed.`,
      });

      // Clear form
      setEmailSubject('');
      setEmailContent('');
      setSelectedEmails([]);

    } catch (error) {
      console.error('Error sending campaign:', error);
      toast({
        title: "Error",
        description: "Failed to send email campaign",
        variant: "destructive"
      });
    } finally {
      setSending(false);
    }
  };

  const getOnlineUsers = () => {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    return userActivity.filter(activity => 
      activity.is_online && new Date(activity.last_seen) > fiveMinutesAgo
    );
  };

  const loadWelcomeEmailTemplate = () => {
    setEmailSubject("✈️ We've Got Your Trip Covered — Next Steps Inside!");
    setEmailContent(`
      <h2 style="color: #2563eb;">Hi {{First Name}},</h2>
      
      <p>Thank you for reaching out to <strong>One Global Trip LLC</strong>—we're thrilled to help you plan your next adventure (and make the visa process a breeze).</p>
      
      <h3 style="color: #2563eb;">🚀 What happens now?</h3>
      
      <p>A dedicated Travel & Visa Specialist will review your request and get in touch within the next <strong>24 business hours</strong>. If you'd rather lock in a time right away, feel free to <strong>book a 15-minute call on our Calendly</strong>:</p>
      
      <div style="text-align: center; margin: 20px 0;">
        <a href="https://calendly.com/oneglobaltrip/intro" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">📅 Pick My Call Slot</a>
      </div>
      
      <h3 style="color: #2563eb;">✨ A quick look at what we can do for you</h3>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <thead>
          <tr style="background-color: #f8fafc;">
            <th style="padding: 12px; text-align: left; border: 1px solid #e2e8f0;">Popular Service</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #e2e8f0;">Perfect For</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #e2e8f0;">Why Travelers Love It</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px; border: 1px solid #e2e8f0;"><strong>Schengen Full Pack</strong></td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">Europe vacations & business trips</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">End-to-end visa guidance, priority appointments, 24/7 AI chat</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #e2e8f0;"><strong>UK Visa Pass</strong></td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">London getaways, study & work visits</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">Form fill, document check, express biometrics</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #e2e8f0;"><strong>Brazil e-Visa Fast-Track</strong></td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">Rio carnivals & Amazon tours</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">Paperwork simplified + insider tips for 2025 rule changes</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #e2e8f0;"><strong>Custom Trip Packages</strong></td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">Honeymoons, family reunions, solo escapes</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">"Pay $0 upfront" planning—flights, hotels, tours bundled</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #e2e8f0;"><strong>Travel Medical Insurance</strong></td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">All international travelers</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">Low-cost coverage accepted by embassies & airlines</td>
          </tr>
        </tbody>
      </table>
      
      <h3 style="color: #2563eb;">📞 How to stay in touch</h3>
      
      <ul>
        <li><strong>Reply to this email</strong> – we answer lightning-fast.</li>
        <li><strong>WhatsApp/Text</strong> – +1 (555) 555-0130 for real-time chat.</li>
        <li><strong>Phone</strong> – Call us at +1 (555) 555-0100 (Mon-Fri, 9 AM–6 PM CT).</li>
        <li><strong>Instagram & TikTok</strong> – @OneGlobalTrip for travel hacks and flash deals.</li>
      </ul>
      
      <div style="background-color: #fef3c7; padding: 15px; border-radius: 6px; margin: 20px 0;">
        <p style="margin: 0;"><strong>💡 Pro tip:</strong> New clients who book a call this week get <strong>$25 off</strong> any visa service or <strong>free airport lounge access</strong> on select flight packages.</p>
      </div>
      
      <p>We're here to make every step—form filling, flights, hotels, even last-minute seat upgrades—seamless and stress-free. Expect a friendly hello from your specialist soon!</p>
      
      <p>Safe travels,<br>
      <strong>The One Global Trip Team</strong><br>
      Your passport to easy visas & unforgettable journeys 🌍✈️</p>
    `);
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
                <Button onClick={loadWelcomeEmailTemplate} variant="outline">
                  Load Welcome Template
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
                    placeholder="Email content (HTML supported)..."
                    rows={10}
                  />
                </div>

                <Button onClick={sendCustomEmail} className="w-full" disabled={sending}>
                  <Send className="h-4 w-4 mr-2" />
                  {sending ? 'Sending...' : 'Send Email Campaign'}
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
