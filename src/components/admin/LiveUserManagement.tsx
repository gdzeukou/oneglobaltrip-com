import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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
  Globe,
  Clock,
  RefreshCw,
  UserCheck,
  UserX,
  MessageSquare,
  Download
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UserSession {
  id: string;
  user_id: string | null;
  email: string;
  session_id: string;
  started_at: string;
  ended_at: string | null;
  last_activity: string;
  ip_address: string | null;
  user_agent: string | null;
  location_data: any;
  pages_visited: number;
  duration_seconds: number;
  is_active: boolean;
}

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

interface UserAgent {
  id: string;
  user_id: string;
  name: string;
  avatar_url: string | null;
  preferences: any;
  created_at: string;
  updated_at: string;
}

interface EnhancedUserData {
  profile: UserProfile | null;
  email: string;
  activeSessions: UserSession[];
  totalSessions: number;
  agent: UserAgent | null;
  lastSeen: string | null;
  isOnline: boolean;
  totalPageViews: number;
  averageSessionDuration: number;
  joinedDate: string;
  membershipStatus: 'active' | 'expired' | 'none';
}

const LiveUserManagement: React.FC = () => {
  const [users, setUsers] = useState<EnhancedUserData[]>([]);
  const [selectedUser, setSelectedUser] = useState<EnhancedUserData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [filterStatus, setFilterStatus] = useState<'all' | 'online' | 'members'>('all');
  const { toast } = useToast();

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      
      // Get all unique emails from sessions and activity
      const { data: sessions } = await supabase
        .from('user_sessions')
        .select('*')
        .order('last_activity', { ascending: false });

      const { data: profiles } = await supabase
        .from('profiles')
        .select('*');

      const { data: agents } = await supabase
        .from('user_agents')
        .select('*');

      // Get form submissions for lead data
      const { data: formSubmissions } = await supabase
        .from('form_submissions')
        .select('*');

      // Process user data
      const userMap = new Map<string, EnhancedUserData>();

      // Process profiles first
      profiles?.forEach(profile => {
        const membershipExpiry = profile.membership_expiry ? new Date(profile.membership_expiry) : null;
        const now = new Date();
        
        userMap.set(profile.id, {
          profile,
          email: `user-${profile.id}@system.local`, // Will be updated if we find real email
          activeSessions: [],
          totalSessions: 0,
          agent: null,
          lastSeen: null,
          isOnline: false,
          totalPageViews: 0,
          averageSessionDuration: 0,
          joinedDate: profile.created_at,
          membershipStatus: membershipExpiry 
            ? (membershipExpiry > now ? 'active' : 'expired')
            : 'none'
        });
      });

      // Process sessions
      sessions?.forEach(session => {
        const email = session.email;
        let userData = Array.from(userMap.values()).find(u => u.profile?.id === session.user_id);
        
        if (!userData) {
          // Create new user data for session-only users
          userData = {
            profile: null,
            email,
            activeSessions: [],
            totalSessions: 0,
            agent: null,
            lastSeen: null,
            isOnline: false,
            totalPageViews: 0,
            averageSessionDuration: 0,
            joinedDate: session.created_at,
            membershipStatus: 'none'
          };
          userMap.set(email, userData);
        } else {
          // Update email for profile users
          userData.email = email;
        }

        // Add session data
        if (session.is_active) {
          userData.activeSessions.push(session);
          userData.isOnline = true;
        }
        
        userData.totalSessions++;
        userData.totalPageViews += session.pages_visited;
        
        if (!userData.lastSeen || new Date(session.last_activity) > new Date(userData.lastSeen)) {
          userData.lastSeen = session.last_activity;
        }
      });

      // Process form submissions for additional email data
      formSubmissions?.forEach(submission => {
        let userData = Array.from(userMap.values()).find(u => u.email === submission.email);
        
        if (!userData) {
          userData = {
            profile: null,
            email: submission.email,
            activeSessions: [],
            totalSessions: 0,
            agent: null,
            lastSeen: null,
            isOnline: false,
            totalPageViews: 0,
            averageSessionDuration: 0,
            joinedDate: submission.created_at || new Date().toISOString(),
            membershipStatus: 'none'
          };
          userMap.set(submission.email, userData);
        }

        // If no profile, create one from form data
        if (!userData.profile) {
          userData.profile = {
            id: submission.user_id || submission.id,
            first_name: submission.name?.split(' ')[0] || null,
            last_name: submission.name?.split(' ').slice(1).join(' ') || null,
            phone: submission.phone || null,
            nationality: submission.nationality || null,
            date_of_birth: null,
            passport_number: null,
            passport_expiry: null,
            membership_expiry: null,
            created_at: submission.created_at || new Date().toISOString(),
            updated_at: submission.updated_at || new Date().toISOString()
          };
        }
      });

      // Add AI agents
      agents?.forEach(agent => {
        const userData = Array.from(userMap.values()).find(u => u.profile?.id === agent.user_id);
        if (userData) {
          userData.agent = agent;
        }
      });

      // Calculate averages
      userMap.forEach(userData => {
        if (userData.totalSessions > 0) {
          const totalDuration = userData.activeSessions.reduce((sum, session) => sum + session.duration_seconds, 0);
          userData.averageSessionDuration = totalDuration / userData.totalSessions;
        }
      });

      const usersArray = Array.from(userMap.values())
        .filter(user => 
          user.email !== 'anonymous' && 
          !user.email.includes('system.local') &&
          (user.profile || user.agent || user.totalSessions > 0 || user.email.includes('@'))
        )
        .sort((a, b) => {
          if (a.isOnline && !b.isOnline) return -1;
          if (!a.isOnline && b.isOnline) return 1;
          return new Date(b.lastSeen || 0).getTime() - new Date(a.lastSeen || 0).getTime();
        });

      setUsers(usersArray);
      setLastUpdated(new Date());
      
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
  }, [toast]);

  // Setup realtime subscriptions
  useEffect(() => {
    fetchUsers();

    // Subscribe to realtime changes
    const channel = supabase
      .channel('user-management-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'user_sessions' }, () => {
        fetchUsers();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'user_activity' }, () => {
        fetchUsers();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, () => {
        fetchUsers();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'user_agents' }, () => {
        fetchUsers();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchUsers]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.profile?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.profile?.last_name?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterStatus === 'all' || 
      (filterStatus === 'online' && user.isOnline) ||
      (filterStatus === 'members' && user.membershipStatus === 'active');

    return matchesSearch && matchesFilter;
  });

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    return `${minutes}m`;
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

  const exportUsers = () => {
    const csv = [
      ['Email', 'Name', 'Status', 'Last Seen', 'Sessions', 'Page Views', 'Membership'].join(','),
      ...filteredUsers.map(user => [
        user.email,
        user.profile ? `${user.profile.first_name || ''} ${user.profile.last_name || ''}`.trim() : '',
        user.isOnline ? 'Online' : 'Offline',
        formatDateTime(user.lastSeen),
        user.totalSessions,
        user.totalPageViews,
        user.membershipStatus
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `users-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading live user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6" />
          <h2 className="text-2xl font-bold">Live User Management</h2>
          <Badge variant="outline" className="ml-2">
            <Clock className="h-3 w-3 mr-1" />
            Updated {lastUpdated.toLocaleTimeString()}
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button onClick={exportUsers} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={fetchUsers} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Real-time Stats */}
      <div className="grid gap-4 md:grid-cols-5">
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
            <CardTitle className="text-sm font-medium">Online Now</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {users.filter(user => user.isOnline).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {users.filter(user => user.membershipStatus === 'active').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">With AI Agents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {users.filter(user => user.agent).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {users.reduce((sum, user) => sum + user.activeSessions.length, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users by email or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button 
            variant={filterStatus === 'all' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilterStatus('all')}
          >
            All
          </Button>
          <Button 
            variant={filterStatus === 'online' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilterStatus('online')}
          >
            Online
          </Button>
          <Button 
            variant={filterStatus === 'members' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilterStatus('members')}
          >
            Members
          </Button>
        </div>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sessions</TableHead>
                <TableHead>Membership</TableHead>
                <TableHead>Last Seen</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow 
                  key={user.email}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => setSelectedUser(user)}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${user.isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
                      <div>
                        <div className="font-medium">
                          {user.profile?.first_name && user.profile?.last_name
                            ? `${user.profile.first_name} ${user.profile.last_name}`
                            : user.email}
                        </div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.isOnline ? 'default' : 'secondary'}>
                      {user.isOnline ? 'Online' : 'Offline'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{user.totalSessions} total</div>
                      <div className="text-sm text-muted-foreground">
                        {user.activeSessions.length} active
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        user.membershipStatus === 'active' ? 'default' :
                        user.membershipStatus === 'expired' ? 'destructive' : 'secondary'
                      }
                    >
                      {user.membershipStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">
                    {formatDateTime(user.lastSeen)}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* User Details Modal/Panel */}
      {selectedUser && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                User Details: {selectedUser.email}
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSelectedUser(null)}>
                ×
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="sessions">Sessions</TabsTrigger>
                <TabsTrigger value="agent">AI Agent</TabsTrigger>
                <TabsTrigger value="actions">Actions</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-medium">Profile Information</h4>
                    {selectedUser.profile ? (
                      <>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {selectedUser.profile.first_name} {selectedUser.profile.last_name}
                          </span>
                        </div>
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
                      </>
                    ) : (
                      <p className="text-muted-foreground text-sm">No profile information available</p>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Activity Summary</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Total Sessions:</span>
                        <span className="text-sm font-medium">{selectedUser.totalSessions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Page Views:</span>
                        <span className="text-sm font-medium">{selectedUser.totalPageViews}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Avg Session Duration:</span>
                        <span className="text-sm font-medium">{formatDuration(selectedUser.averageSessionDuration)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Member Status:</span>
                        <Badge variant={selectedUser.membershipStatus === 'active' ? 'default' : 'secondary'}>
                          {selectedUser.membershipStatus}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="sessions" className="space-y-4">
                <h4 className="font-medium">Active Sessions ({selectedUser.activeSessions.length})</h4>
                {selectedUser.activeSessions.length > 0 ? (
                  <div className="space-y-2">
                    {selectedUser.activeSessions.map((session) => (
                      <Card key={session.id} className="p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="text-sm font-medium">Session {session.session_id.slice(0, 8)}...</div>
                            <div className="text-xs text-muted-foreground">
                              Started: {formatDateTime(session.started_at)}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Location: {getLocationDisplay(session.location_data)}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm">{session.pages_visited} pages</div>
                            <div className="text-xs text-muted-foreground">
                              {formatDuration(session.duration_seconds)}
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">No active sessions</p>
                )}
              </TabsContent>

              <TabsContent value="agent" className="space-y-4">
                {selectedUser.agent ? (
                  <div>
                    <h4 className="font-medium mb-3">AI Agent: {selectedUser.agent.name}</h4>
                    <div className="space-y-2">
                      <div className="text-sm">
                        <strong>Created:</strong> {formatDateTime(selectedUser.agent.created_at)}
                      </div>
                      <div className="text-sm">
                        <strong>Preferences:</strong>
                        <pre className="mt-1 p-2 bg-muted rounded text-xs">
                          {JSON.stringify(selectedUser.agent.preferences, null, 2)}
                        </pre>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">No AI agent configured</p>
                )}
              </TabsContent>

              <TabsContent value="actions" className="space-y-4">
                <div className="flex gap-2 flex-wrap">
                  <Button size="sm" variant="outline">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                  <Button size="sm" variant="outline">
                    <UserCheck className="h-4 w-4 mr-2" />
                    Grant Membership
                  </Button>
                  <Button size="sm" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button size="sm" variant="destructive">
                    <UserX className="h-4 w-4 mr-2" />
                    Block User
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LiveUserManagement;