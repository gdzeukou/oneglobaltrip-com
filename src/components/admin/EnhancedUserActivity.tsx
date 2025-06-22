
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { MapPin, Clock, ExternalLink, Eye } from 'lucide-react';

interface EnhancedUserActivity {
  id: string;
  email: string;
  page_visited: string;
  action_type: string;
  session_duration: number;
  referrer_source: string;
  location_data: any;
  created_at: string;
  last_seen: string;
  is_online: boolean;
}

const EnhancedUserActivity = () => {
  const [activities, setActivities] = useState<EnhancedUserActivity[]>([]);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [sessionTimeline, setSessionTimeline] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnhancedActivity();
  }, []);

  const fetchEnhancedActivity = async () => {
    try {
      const { data, error } = await supabase
        .from('user_activity')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      setActivities(data || []);
    } catch (error) {
      console.error('Error fetching enhanced activity:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSessionTimeline = async (email: string) => {
    try {
      const { data, error } = await supabase
        .from('user_activity')
        .select('*')
        .eq('email', email)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setSessionTimeline(data || []);
      setSelectedSession(email);
    } catch (error) {
      console.error('Error fetching session timeline:', error);
    }
  };

  const getLocationDisplay = (locationData: any) => {
    if (!locationData) return 'Unknown';
    return `${locationData.city || 'Unknown'}, ${locationData.country || 'Unknown'}`;
  };

  const formatDuration = (seconds: number) => {
    if (!seconds) return 'N/A';
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ${seconds % 60}s`;
  };

  const getReferrerDisplay = (referrer: string) => {
    if (!referrer) return 'Direct';
    if (referrer.includes('google')) return 'Google';
    if (referrer.includes('facebook')) return 'Facebook';
    if (referrer.includes('instagram')) return 'Instagram';
    if (referrer.includes('linkedin')) return 'LinkedIn';
    return 'Other';
  };

  if (loading) return <div>Loading enhanced activity...</div>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Enhanced User Activity Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Page/Action</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{activity.email}</div>
                      <div className="text-sm text-gray-500">
                        {new Date(activity.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{activity.page_visited}</div>
                      <div className="text-sm text-gray-500">{activity.action_type}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {getLocationDisplay(activity.location_data)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {getReferrerDisplay(activity.referrer_source)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {formatDuration(activity.session_duration)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={activity.is_online ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {activity.is_online ? 'Online' : 'Offline'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => fetchSessionTimeline(activity.email)}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      Timeline
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedSession && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Session Timeline: {selectedSession}</CardTitle>
              <Button variant="outline" onClick={() => setSelectedSession(null)}>
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sessionTimeline.map((event, index) => (
                <div key={event.id} className="flex items-center space-x-4 p-3 border rounded">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="font-medium">{event.page_visited}</div>
                    <div className="text-sm text-gray-500">{event.action_type}</div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(event.created_at).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedUserActivity;
