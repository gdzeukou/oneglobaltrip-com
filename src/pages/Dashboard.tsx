
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserAgent } from '@/hooks/useUserAgent';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AITravelAgent from '@/components/ai/AITravelAgent';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import MyApplications from '@/components/dashboard/MyApplications';
import MyTrips from '@/components/dashboard/MyTrips';
import MyProfile from '@/components/dashboard/MyProfile';
import MySettings from '@/components/dashboard/MySettings';
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
  const { agent } = useUserAgent();
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
        {/* AI Agent Welcome Section */}
        <div className="bg-gradient-to-r from-primary to-purple-600 text-white rounded-lg p-8 mb-8">
          <div className="flex items-start gap-4">
            {agent?.avatar_url && (
              <img 
                src={agent.avatar_url} 
                alt={agent.name}
                className="w-16 h-16 rounded-full border-2 border-white/20 bg-white/10"
              />
            )}
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">
                Hi, I'm {agent?.name || 'your AI Travel Agent'}! ✈️
              </h1>
              <p className="text-lg opacity-90 mb-6">
                Welcome back, {user?.user_metadata?.first_name || 'Traveler'}! Ready to explore the world together?
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild variant="secondary" size="lg">
                  <a href="#ai-chat" className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Chat with {agent?.name || 'AI Travel Agent'}
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <a href="/startmytrip" className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Plan a New Trip
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="trips" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="trips">My Trips</TabsTrigger>
            <TabsTrigger value="applications">My Applications</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="trips">
            <MyTrips />
          </TabsContent>

          <TabsContent value="applications">
            <MyApplications />
          </TabsContent>

          <TabsContent value="profile">
            <MyProfile />
          </TabsContent>

          <TabsContent value="settings">
            <MySettings />
          </TabsContent>
        </Tabs>
      </div>

      <div id="ai-chat">
        <AITravelAgent />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
