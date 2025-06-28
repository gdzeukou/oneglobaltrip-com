import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  User, 
  FileText, 
  Plane, 
  Calendar, 
  MapPin, 
  Settings,
  LogOut,
  Plus,
  Clock
} from 'lucide-react';
import DocumentUpload from '@/components/DocumentUpload';
import DocumentsList from '@/components/DocumentsList';

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  nationality: string | null;
  passport_number: string | null;
  passport_expiry: string | null;
  date_of_birth: string | null;
}

interface Application {
  id: string;
  visa_type: string;
  nationality: string;
  status: string;
  application_reference: string | null;
  submitted_at: string;
  last_updated: string;
}

interface Trip {
  id: string;
  destination_country: string;
  departure_city: string | null;
  departure_date: string | null;
  return_date: string | null;
  trip_type: string;
  status: string;
  total_budget: number | null;
}

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [documentsRefreshTrigger, setDocumentsRefreshTrigger] = useState(0);

  useEffect(() => {
    fetchUserData();
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return;

    try {
      // Fetch profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileData) {
        setProfile(profileData);
      }

      // Fetch applications
      const { data: applicationsData } = await supabase
        .from('visa_applications')
        .select('*')
        .eq('user_id', user.id)
        .order('submitted_at', { ascending: false });

      if (applicationsData) {
        setApplications(applicationsData);
      }

      // Fetch trips
      const { data: tripsData } = await supabase
        .from('trips')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (tripsData) {
        setTrips(tripsData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
      case 'visa_issued':
        return 'bg-green-100 text-green-800';
      case 'under_review':
        return 'bg-blue-100 text-blue-800';
      case 'submitted':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'additional_docs_required':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDocumentUploadSuccess = () => {
    setDocumentsRefreshTrigger(prev => prev + 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pt-24 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-blue-600 text-white">
                  {profile?.first_name?.charAt(0) || user?.email?.charAt(0)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back, {profile?.first_name || 'Traveler'}!
                </h1>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Applications</p>
                    <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Plane className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Trips</p>
                    <p className="text-2xl font-bold text-gray-900">{trips.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Clock className="h-8 w-8 text-orange-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {applications.filter(app => app.status === 'submitted' || app.status === 'under_review').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <MapPin className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Countries</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {new Set(applications.map(app => app.visa_type)).size}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="applications" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="trips">My Trips</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="applications" className="mt-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Visa Applications</CardTitle>
                  <Button onClick={() => navigate('/visas')}>
                    <Plus className="h-4 w-4 mr-2" />
                    New Application
                  </Button>
                </CardHeader>
                <CardContent>
                  {applications.length === 0 ? (
                    <div className="text-center py-12">
                      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
                      <p className="text-gray-600 mb-6">Start your visa application journey today!</p>
                      <Button onClick={() => navigate('/visas')}>
                        Start First Application
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {applications.map((app) => (
                        <div key={app.id} className="border rounded-lg p-4 hover:bg-gray-50">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold text-gray-900">{app.visa_type}</h4>
                              <p className="text-sm text-gray-600">
                                Application for {app.nationality} citizen
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                Submitted: {formatDate(app.submitted_at)}
                              </p>
                              {app.application_reference && (
                                <p className="text-xs text-gray-500">
                                  Ref: {app.application_reference}
                                </p>
                              )}
                            </div>
                            <Badge className={getStatusColor(app.status)}>
                              {app.status.replace('_', ' ').toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trips" className="mt-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>My Trips</CardTitle>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Plan New Trip
                  </Button>
                </CardHeader>
                <CardContent>
                  {trips.length === 0 ? (
                    <div className="text-center py-12">
                      <Plane className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No trips planned</h3>
                      <p className="text-gray-600 mb-6">Start planning your next adventure!</p>
                      <Button>Plan Your First Trip</Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {trips.map((trip) => (
                        <div key={trip.id} className="border rounded-lg p-4 hover:bg-gray-50">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold text-gray-900">{trip.destination_country}</h4>
                              <p className="text-sm text-gray-600">
                                {trip.trip_type.charAt(0).toUpperCase() + trip.trip_type.slice(1)} trip
                              </p>
                              {trip.departure_date && trip.return_date && (
                                <p className="text-xs text-gray-500 mt-1">
                                  {formatDate(trip.departure_date)} - {formatDate(trip.return_date)}
                                </p>
                              )}
                              {trip.total_budget && (
                                <p className="text-xs text-gray-500">
                                  Budget: ${trip.total_budget.toLocaleString()}
                                </p>
                              )}
                            </div>
                            <Badge className={getStatusColor(trip.status)}>
                              {trip.status.toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-4">Personal Information</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-gray-600">Name</label>
                          <p className="text-gray-900">
                            {profile?.first_name || profile?.last_name 
                              ? `${profile?.first_name || ''} ${profile?.last_name || ''}`.trim()
                              : 'Not provided'
                            }
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Email</label>
                          <p className="text-gray-900">{user?.email}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Phone</label>
                          <p className="text-gray-900">{profile?.phone || 'Not provided'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Nationality</label>
                          <p className="text-gray-900">{profile?.nationality || 'Not provided'}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-4">Travel Documents</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-gray-600">Passport Number</label>
                          <p className="text-gray-900">{profile?.passport_number || 'Not provided'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Passport Expiry</label>
                          <p className="text-gray-900">
                            {profile?.passport_expiry ? formatDate(profile.passport_expiry) : 'Not provided'}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Date of Birth</label>
                          <p className="text-gray-900">
                            {profile?.date_of_birth ? formatDate(profile.date_of_birth) : 'Not provided'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button>Update Profile</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="mt-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Documents</CardTitle>
                  <DocumentUpload onUploadSuccess={handleDocumentUploadSuccess} />
                </CardHeader>
                <CardContent>
                  <DocumentsList refreshTrigger={documentsRefreshTrigger} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
