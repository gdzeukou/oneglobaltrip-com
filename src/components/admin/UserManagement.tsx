import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Search, 
  Eye, 
  Settings, 
  Activity,
  User,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Globe
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  nationality: string | null;
  date_of_birth: string | null;
  passport_number: string | null;
  passport_expiry: string | null;
  membership_expiry: string | null;
  created_at: string;
  updated_at: string;
}

interface UserActivity {
  id: string;
  email: string;
  page_visited: string;
  action_type: string | null;
  session_duration: number | null;
  referrer_source: string | null;
  location_data: any;
  created_at: string;
  last_seen: string | null;
  is_online: boolean | null;
  city: string | null;
  country: string | null;
}

interface UserAgent {
  id: string;
  user_id: string;
  name: string;
  avatar_url: string | null;
  preferences: any;
  created_at: string;
  updated_at: string;
}

interface UserData {
  profile: UserProfile;
  email: string;
  recentActivity: UserActivity[];
  agent: UserAgent | null;
  totalSessions: number;
  lastSeen: string | null;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      const userData: UserData[] = [];
      const processedUsers = new Set<string>();

      // 1. Get all profiles (registered users)
      const { data: profiles } = await supabase
        .from('profiles')
        .select('*');

      // 2. Get all form submissions (leads)
      const { data: formSubmissions } = await supabase
        .from('form_submissions')
        .select('*');

      // 3. Get users from user_activity (non-anonymous only)  
      const { data: activityUsers } = await supabase
        .from('user_activity')
        .select('email, user_id')
        .neq('email', 'anonymous')
        .not('email', 'is', null);

      // Process registered users from profiles
      for (const profile of profiles || []) {
        const userId = profile.id;
        
        // Try to get email from user_activity or use a placeholder
        const activityUser = activityUsers?.find(u => u.user_id === userId);
        const email = activityUser?.email || `user-${userId}@example.com`;

        if (processedUsers.has(userId)) continue;
        processedUsers.add(userId);

        // Get user agent
        const { data: agent } = await supabase
          .from('user_agents')
          .select('*')
          .eq('user_id', userId)
          .maybeSingle();

        // Get recent activity
        const { data: activity } = await supabase
          .from('user_activity')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(10);

        // Count total sessions
        const { count: totalSessions } = await supabase
          .from('user_activity')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', userId);

        // Get last seen
        const { data: lastActivity } = await supabase
          .from('user_activity')
          .select('last_seen')
          .eq('user_id', userId)
          .order('last_seen', { ascending: false })
          .limit(1)
          .maybeSingle();

        userData.push({
          profile,
          email,
          recentActivity: activity || [],
          agent: agent || null,
          totalSessions: totalSessions || 0,
          lastSeen: lastActivity?.last_seen || null
        });
      }

      // Process form submissions (leads without profiles)
      for (const submission of formSubmissions || []) {
        if (processedUsers.has(submission.email)) continue;
        processedUsers.add(submission.email);

        // Get recent activity by email
        const { data: activity } = await supabase
          .from('user_activity')
          .select('*')
          .eq('email', submission.email)
          .order('created_at', { ascending: false })
          .limit(10);

        // Count total sessions
        const { count: totalSessions } = await supabase
          .from('user_activity')
          .select('*', { count: 'exact', head: true })
          .eq('email', submission.email);

        // Get last seen
        const { data: lastActivity } = await supabase
          .from('user_activity')
          .select('last_seen')
          .eq('email', submission.email)
          .order('last_seen', { ascending: false })
          .limit(1)
          .maybeSingle();

        userData.push({
          profile: {
            id: submission.user_id || submission.id,
            first_name: submission.name.split(' ')[0] || null,
            last_name: submission.name.split(' ').slice(1).join(' ') || null,
            phone: submission.phone,
            nationality: submission.nationality,
            date_of_birth: null,
            passport_number: null,
            passport_expiry: null,
            membership_expiry: null,
            created_at: submission.created_at || new Date().toISOString(),
            updated_at: submission.updated_at || new Date().toISOString()
          },
          email: submission.email,
          recentActivity: activity || [],
          agent: null,
          totalSessions: totalSessions || 0,
          lastSeen: lastActivity?.last_seen || null
        });
      }

      // Process activity users (users with activity but no profile/submission)
      for (const activityUser of activityUsers || []) {
        if (processedUsers.has(activityUser.email)) continue;
        processedUsers.add(activityUser.email);

        // Get recent activity
        const { data: activity } = await supabase
          .from('user_activity')
          .select('*')
          .eq('email', activityUser.email)
          .order('created_at', { ascending: false })
          .limit(10);

        // Count total sessions  
        const { count: totalSessions } = await supabase
          .from('user_activity')
          .select('*', { count: 'exact', head: true })
          .eq('email', activityUser.email);

        // Get last seen
        const { data: lastActivity } = await supabase
          .from('user_activity')
          .select('last_seen')
          .eq('email', activityUser.email)
          .order('last_seen', { ascending: false })
          .limit(1)
          .maybeSingle();

        userData.push({
          profile: {
            id: activityUser.user_id || 'unknown',
            first_name: null,
            last_name: null,
            phone: null,
            nationality: null,
            date_of_birth: null,
            passport_number: null,
            passport_expiry: null,
            membership_expiry: null,
            created_at: activity?.[0]?.created_at || new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          email: activityUser.email,
          recentActivity: activity || [],
          agent: null,
          totalSessions: totalSessions || 0,
          lastSeen: lastActivity?.last_seen || null
        });
      }

      console.log('Fetched user data:', userData);
      setUsers(userData);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Failed to fetch user data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.profile.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.profile.last_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString();
  };

  const formatDateTime = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleString();
  };

  const getLocationDisplay = (locationData: any) => {
    if (!locationData) return 'Unknown';
    if (typeof locationData === 'string') return locationData;
    return locationData.city && locationData.country 
      ? `${locationData.city}, ${locationData.country}`
      : 'Unknown';
  };

  const getUserStatus = (user: UserData) => {
    const lastSeen = user.lastSeen ? new Date(user.lastSeen) : null;
    const now = new Date();
    const timeDiff = lastSeen ? now.getTime() - lastSeen.getTime() : null;
    
    if (!timeDiff || timeDiff < 5 * 60 * 1000) { // 5 minutes
      return { status: 'Online', color: 'bg-green-500' };
    } else if (timeDiff < 24 * 60 * 60 * 1000) { // 24 hours
      return { status: 'Recently Active', color: 'bg-yellow-500' };
    } else {
      return { status: 'Offline', color: 'bg-gray-500' };
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6" />
          <h2 className="text-2xl font-bold">User Management</h2>
        </div>
        <Button onClick={fetchUsers} variant="outline">
          <Activity className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Search and Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter(user => {
                const status = getUserStatus(user);
                return status.status === 'Online' || status.status === 'Recently Active';
              }).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">With AI Agents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter(user => user.agent).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter(user => user.profile.membership_expiry && 
                new Date(user.profile.membership_expiry) > new Date()).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search users by email or name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Users List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Users ({filteredUsers.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-96 overflow-y-auto">
                {filteredUsers.map((user) => {
                  const userStatus = getUserStatus(user);
                  return (
                    <div
                      key={user.profile.id}
                      className={`p-4 border-b cursor-pointer hover:bg-muted/50 ${
                        selectedUser?.profile.id === user.profile.id ? 'bg-muted' : ''
                      }`}
                      onClick={() => setSelectedUser(user)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${userStatus.color}`} />
                          <div>
                            <div className="font-medium">
                              {user.profile.first_name && user.profile.last_name
                                ? `${user.profile.first_name} ${user.profile.last_name}`
                                : user.email}
                            </div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{userStatus.status}</div>
                          <div className="text-xs text-muted-foreground">
                            {user.totalSessions} sessions
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Details */}
        <div>
          {selectedUser ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  User Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs defaultValue="profile">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                    <TabsTrigger value="agent">AI Agent</TabsTrigger>
                  </TabsList>

                  <TabsContent value="profile" className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{selectedUser.email}</span>
                      </div>
                      
                      {selectedUser.profile.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{selectedUser.profile.phone}</span>
                        </div>
                      )}
                      
                      {selectedUser.profile.nationality && (
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{selectedUser.profile.nationality}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Joined {formatDate(selectedUser.profile.created_at)}</span>
                      </div>
                      
                      {selectedUser.profile.membership_expiry && (
                        <div>
                          <Badge variant={
                            new Date(selectedUser.profile.membership_expiry) > new Date() 
                              ? "default" 
                              : "secondary"
                          }>
                            Member until {formatDate(selectedUser.profile.membership_expiry)}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="activity" className="space-y-4">
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Recent Activity</div>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {selectedUser.recentActivity.map((activity) => (
                          <div key={activity.id} className="text-xs p-2 bg-muted rounded">
                            <div className="font-medium">{activity.page_visited}</div>
                            <div className="text-muted-foreground">
                              {formatDateTime(activity.created_at)}
                            </div>
                            {activity.location_data && (
                              <div className="flex items-center gap-1 mt-1">
                                <MapPin className="h-3 w-3" />
                                <span>{getLocationDisplay(activity.location_data)}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="agent" className="space-y-4">
                    {selectedUser.agent ? (
                      <div className="space-y-3">
                        <div className="text-sm">
                          <span className="font-medium">Name:</span> {selectedUser.agent.name}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Created:</span> {formatDate(selectedUser.agent.created_at)}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Preferences:</span>
                          <pre className="text-xs mt-1 p-2 bg-muted rounded overflow-auto">
                            {JSON.stringify(selectedUser.agent.preferences, null, 2)}
                          </pre>
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground">
                        No AI agent configured
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <div className="text-center text-muted-foreground">
                  <Eye className="h-8 w-8 mx-auto mb-2" />
                  <p>Select a user to view details</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;