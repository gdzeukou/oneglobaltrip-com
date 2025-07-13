import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw, User, UserCheck, Bot, Mail, Calendar } from 'lucide-react';

interface UserData {
  user_id: string;
  email: string;
  created_at: string;
  agent_name?: string;
  agent_preferences?: any;
  agent_created_at?: string;
  has_profile: boolean;
  profile_data?: {
    first_name?: string;
    last_name?: string;
    phone?: string;
    nationality?: string;
    membership_expiry?: string;
  };
  form_submissions: any[];
  session_count: number;
  last_activity?: string;
}

interface UserStats {
  total_users: number;
  total_agents: number;
  users_with_profiles: number;
  users_without_profiles: number;
  recent_activity: number;
  form_only_users: number;
}

const UserOverview: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [stats, setStats] = useState<UserStats>({
    total_users: 0,
    total_agents: 0,
    users_with_profiles: 0,
    users_without_profiles: 0,
    recent_activity: 0,
    form_only_users: 0
  });
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      // Call our edge function to get complete user data including emails
      const { data, error } = await supabase.functions.invoke('admin-users');

      if (error) {
        console.error('Error fetching users:', error);
        return;
      }

      setUsers(data.users || []);
      setStats(data.stats || {
        total_users: 0,
        total_agents: 0,
        users_with_profiles: 0,
        users_without_profiles: 0,
        recent_activity: 0,
        form_only_users: 0
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const exportUsers = () => {
    const csvData = users.map(user => ({
      'User ID': user.user_id,
      'Email': user.email,
      'Agent Name': user.agent_name || 'No Agent',
      'First Name': user.profile_data?.first_name || '',
      'Last Name': user.profile_data?.last_name || '',
      'Phone': user.profile_data?.phone || '',
      'Nationality': user.profile_data?.nationality || '',
      'Has Profile': user.has_profile ? 'Yes' : 'No',
      'Has AI Agent': user.agent_name ? 'Yes' : 'No',
      'Form Submissions': user.form_submissions?.length || 0,
      'Recent Sessions': user.session_count || 0,
      'Last Activity': user.last_activity || '',
      'Agent Created': user.agent_created_at || '',
      'Account Created': user.created_at || '',
      'Membership Status': user.profile_data?.membership_expiry ? 
        (new Date(user.profile_data.membership_expiry) > new Date() ? 'Active' : 'Expired') : 'No Membership'
    }));

    const csvContent = [
      Object.keys(csvData[0] || {}).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `users-export-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getUserDisplayName = (user: UserData) => {
    if (user.profile_data?.first_name && user.profile_data?.last_name) {
      return `${user.profile_data.first_name} ${user.profile_data.last_name}`;
    }
    if (user.agent_name) {
      return user.agent_name;
    }
    return `User ${user.user_id.slice(0, 8)}`;
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total AI Agents</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total_agents}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Users with Profiles</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.users_with_profiles}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Users without Profiles</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.users_without_profiles}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users (24h)</CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.recent_activity}</div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Users</CardTitle>
              <CardDescription>
                Complete overview of all users, their accounts, AI agents, and activity
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button onClick={fetchUsers} variant="outline" size="sm" disabled={loading}>
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button onClick={exportUsers} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="h-6 w-6 animate-spin mr-2" />
              Loading users...
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Account Status</TableHead>
                  <TableHead>AI Agent</TableHead>
                  <TableHead>Contact Info</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow key={user.user_id}>
                       <TableCell>
                         <div className="font-medium">{getUserDisplayName(user)}</div>
                         <div className="text-sm text-muted-foreground flex items-center gap-1">
                           <Mail className="h-3 w-3" />
                           {user.email}
                         </div>
                         <div className="text-xs text-muted-foreground">
                           ID: {user.user_id.slice(0, 8)}...
                         </div>
                       </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <Badge variant={user.has_profile ? "default" : "secondary"}>
                            {user.has_profile ? "Has Profile" : "No Profile"}
                          </Badge>
                          {user.profile_data?.membership_expiry && (
                            <Badge 
                              variant={new Date(user.profile_data.membership_expiry) > new Date() ? "default" : "destructive"}
                              className="text-xs"
                            >
                              {new Date(user.profile_data.membership_expiry) > new Date() ? "Member" : "Expired"}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {user.agent_name ? (
                          <div>
                            <Badge variant="default" className="mb-1">
                              <Bot className="h-3 w-3 mr-1" />
                              {user.agent_name}
                            </Badge>
                            {user.agent_preferences?.travel_style && (
                              <div className="text-xs text-muted-foreground">
                                Style: {user.agent_preferences.travel_style.join(', ')}
                              </div>
                            )}
                          </div>
                        ) : (
                          <Badge variant="outline">No AI Agent</Badge>
                        )}
                      </TableCell>
                       <TableCell>
                         <div className="text-sm space-y-1">
                           {user.profile_data?.phone && (
                             <div className="flex items-center gap-1">
                               📞 {user.profile_data.phone}
                             </div>
                           )}
                           {user.profile_data?.nationality && (
                             <div className="flex items-center gap-1">
                               🌍 {user.profile_data.nationality}
                             </div>
                           )}
                           {user.profile_data?.first_name && user.profile_data?.last_name && (
                             <div className="text-xs text-muted-foreground">
                               {user.profile_data.first_name} {user.profile_data.last_name}
                             </div>
                           )}
                         </div>
                       </TableCell>
                       <TableCell>
                         <div className="text-sm space-y-1">
                           <div>Sessions: {user.session_count || 0}</div>
                           <div>Forms: {user.form_submissions?.length || 0}</div>
                           {user.last_activity && (
                             <div className="text-xs text-muted-foreground flex items-center gap-1">
                               <Calendar className="h-3 w-3" />
                               Last: {formatDate(user.last_activity)}
                             </div>
                           )}
                         </div>
                       </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {user.agent_created_at ? formatDate(user.agent_created_at) : 'N/A'}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserOverview;