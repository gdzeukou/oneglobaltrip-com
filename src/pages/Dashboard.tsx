
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Calendar,
  MapPin,
  Sparkles,
  Plus,
  Loader2
} from 'lucide-react';

interface VisaApplication {
  id: string;
  application_reference: string;
  visa_type: string;
  travel_purpose: string;
  departure_date: string | null;
  return_date: string | null;
  status: string;
  created_at: string;
  last_updated: string;
  application_data: any;
}

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // Fetch user's visa applications
  const { data: applications = [], isLoading, error } = useQuery({
    queryKey: ['visa-applications', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('visa_applications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as VisaApplication[];
    },
    enabled: !!user?.id
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'submitted':
      case 'in-review':
        return 'bg-blue-100 text-blue-800';
      case 'draft':
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'submitted':
      case 'in-review':
        return <Clock className="h-4 w-4" />;
      case 'draft':
      case 'pending':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getProgress = (application: VisaApplication) => {
    switch (application.status.toLowerCase()) {
      case 'draft': return 25;
      case 'submitted': return 50;
      case 'in-review': return 75;
      case 'approved': return 100;
      case 'rejected': return 100;
      default: return 0;
    }
  };

  const handleNewApplication = () => {
    sessionStorage.setItem('visa_application_intent', JSON.stringify({
      source: 'dashboard',
      timestamp: Date.now()
    }));
    navigate('/apply');
  };

  const getStats = () => {
    const total = applications.length;
    const inReview = applications.filter(app => ['submitted', 'in-review'].includes(app.status.toLowerCase())).length;
    const approved = applications.filter(app => app.status.toLowerCase() === 'approved').length;
    const successRate = total > 0 ? Math.round((approved / total) * 100) : 95;

    return { total, inReview, approved, successRate };
  };

  const stats = getStats();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex items-center space-x-2">
              <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
              <span className="text-gray-600">Loading your applications...</span>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.user_metadata?.first_name || 'User'}!
              </h1>
              <p className="text-gray-600 mt-2">
                Manage your visa applications and track their progress
              </p>
            </div>
            <Button
              onClick={handleNewApplication}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>New Application</span>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  <p className="text-sm text-gray-600">Total Applications</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.inReview}</p>
                  <p className="text-sm text-gray-600">In Review</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
                  <p className="text-sm text-gray-600">Approved</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.successRate}%</p>
                  <p className="text-sm text-gray-600">Success Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-blue-600" />
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2"
                onClick={handleNewApplication}
              >
                <Plus className="h-6 w-6 text-blue-600" />
                <span className="font-medium">Start New Application</span>
                <span className="text-xs text-gray-500">AI-powered form</span>
              </Button>
              
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2"
                onClick={() => navigate('/visas')}
              >
                <MapPin className="h-6 w-6 text-green-600" />
                <span className="font-medium">Check Requirements</span>
                <span className="text-xs text-gray-500">Visa eligibility</span>
              </Button>
              
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2"
              >
                <Calendar className="h-6 w-6 text-purple-600" />
                <span className="font-medium">Book Biometrics</span>
                <span className="text-xs text-gray-500">Schedule appointment</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Applications List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Applications</CardTitle>
          </CardHeader>
          <CardContent>
            {applications.length > 0 ? (
              <div className="space-y-4">
                {applications.map((app) => (
                  <div
                    key={app.id}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5 text-blue-600" />
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {app.visa_type} - {app.travel_purpose}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Ref: {app.application_reference}
                          </p>
                          <p className="text-sm text-gray-600">
                            Created: {new Date(app.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(app.status)}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(app.status)}
                          <span className="capitalize">{app.status.replace('-', ' ')}</span>
                        </div>
                      </Badge>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                        <span>Progress</span>
                        <span>{getProgress(app)}%</span>
                      </div>
                      <Progress value={getProgress(app)} className="h-2" />
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="space-y-1">
                        {app.departure_date && (
                          <span>Departure: {new Date(app.departure_date).toLocaleDateString()}</span>
                        )}
                        {app.return_date && (
                          <span className="block">Return: {new Date(app.return_date).toLocaleDateString()}</span>
                        )}
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No applications yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Start your first visa application with our intelligent form
                </p>
                <Button
                  onClick={handleNewApplication}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Start Application
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
