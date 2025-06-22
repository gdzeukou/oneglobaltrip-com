
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Users, 
  Search, 
  Mail, 
  UserX, 
  UserCheck,
  ExternalLink,
  RefreshCw,
  Plus
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AuthManagerProps {
  projectUrl: string;
  anonKey: string;
  serviceRoleKey: string;
  onOpenInSupabase: (path: string) => void;
}

interface User {
  id: string;
  email: string;
  email_confirmed_at: string | null;
  last_sign_in_at: string | null;
  created_at: string;
  user_metadata: any;
  app_metadata: any;
}

const AuthManager: React.FC<AuthManagerProps> = ({ 
  projectUrl, 
  anonKey, 
  serviceRoleKey, 
  onOpenInSupabase 
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    loadUsers();
  }, [currentPage, searchQuery]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/supabase/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          projectUrl, 
          serviceRoleKey,
          page: currentPage,
          search: searchQuery
        })
      });
      
      const result = await response.json();
      if (result.success) {
        setUsers(result.data.users);
        setTotalUsers(result.data.total);
      } else {
        toast({
          title: "Error",
          description: "Failed to load users",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to connect to auth service",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const resendConfirmation = async (userId: string, email: string) => {
    try {
      const response = await fetch('/api/supabase/resend-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectUrl, serviceRoleKey, userId, email })
      });
      
      const result = await response.json();
      if (result.success) {
        toast({
          title: "Success",
          description: "Confirmation email sent"
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to send confirmation",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send confirmation email",
        variant: "destructive"
      });
    }
  };

  const toggleUserStatus = async (userId: string, currentStatus: boolean) => {
    try {
      const response = await fetch('/api/supabase/toggle-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          projectUrl, 
          serviceRoleKey, 
          userId, 
          disable: currentStatus 
        })
      });
      
      const result = await response.json();
      if (result.success) {
        loadUsers(); // Refresh the list
        toast({
          title: "Success",
          description: `User ${currentStatus ? 'disabled' : 'enabled'}`
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to update user status",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user status",
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Auth Manager</h3>
          <Badge variant="outline">{totalUsers} users</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={loadUsers}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenInSupabase('/auth/users')}
          >
            <ExternalLink className="h-4 w-4" />
            Open in Supabase
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">User Management</CardTitle>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64"
              />
              <Button size="sm">
                <Plus className="h-4 w-4" />
                Invite User
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading users...</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Last Sign In</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{user.email}</div>
                          <div className="text-xs text-muted-foreground">
                            ID: {user.id.substring(0, 8)}...
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={user.email_confirmed_at ? "default" : "secondary"}
                        >
                          {user.email_confirmed_at ? 'Confirmed' : 'Unconfirmed'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {formatDate(user.created_at)}
                      </TableCell>
                      <TableCell className="text-sm">
                        {formatDate(user.last_sign_in_at)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {!user.email_confirmed_at && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => resendConfirmation(user.id, user.email)}
                              title="Resend confirmation email"
                            >
                              <Mail className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleUserStatus(user.id, true)}
                            title="Disable user"
                          >
                            <UserX className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthManager;
