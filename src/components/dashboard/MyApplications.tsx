import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  Plus, 
  Edit3, 
  Eye, 
  Users, 
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Save
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface VisaApplication {
  id: string;
  application_reference_new: string;
  application_reference: string;
  visa_type: string;
  travel_purpose: string;
  departure_date: string | null;
  return_date: string | null;
  status: string;
  is_draft: boolean;
  progress_step: number;
  total_travelers: number;
  country_code: string;
  created_at: string;
  auto_saved_at: string | null;
  application_data: any;
}

const MyApplications = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ['my-visa-applications', user?.id],
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

  const autoSaveMutation = useMutation({
    mutationFn: async ({ applicationId, data }: { applicationId: string; data: any }) => {
      const { error } = await supabase
        .from('visa_applications')
        .update({
          application_data: data,
          auto_saved_at: new Date().toISOString()
        })
        .eq('id', applicationId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-visa-applications'] });
    }
  });

  const getStatusColor = (status: string, isDraft: boolean) => {
    if (isDraft) return 'bg-yellow-100 text-yellow-800';
    
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'submitted':
      case 'in-review':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string, isDraft: boolean) => {
    if (isDraft) return <Edit3 className="h-4 w-4" />;
    
    switch (status.toLowerCase()) {
      case 'approved':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'submitted':
      case 'in-review':
        return <Clock className="h-4 w-4" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getProgress = (application: VisaApplication) => {
    if (application.is_draft) {
      return (application.progress_step / 7) * 100; // 7 steps total
    }
    
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
    navigate('/visas/short-stay/schengen/apply');
  };

  const handleContinueApplication = (applicationId: string) => {
    navigate(`/visas/short-stay/schengen/apply?continue=${applicationId}`);
  };

  const handleViewApplication = (applicationId: string) => {
    navigate(`/applications/${applicationId}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          <span className="text-gray-600">Loading your applications...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Applications</h2>
          <p className="text-gray-600 mt-1">
            Manage and track your visa applications
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

      {/* Applications Grid */}
      {applications.length > 0 ? (
        <div className="grid gap-6">
          {applications.map((app) => (
            <Card key={app.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <div>
                      <CardTitle className="text-lg">
                        {app.visa_type} - {app.travel_purpose}
                      </CardTitle>
                      <p className="text-sm text-gray-600 font-mono">
                        {app.application_reference_new || app.application_reference}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {app.auto_saved_at && (
                      <div className="flex items-center space-x-1 text-xs text-green-600">
                        <Save className="h-3 w-3" />
                        <span>Auto-saved</span>
                      </div>
                    )}
                    <Badge className={getStatusColor(app.status, app.is_draft)}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(app.status, app.is_draft)}
                        <span className="capitalize">
                          {app.is_draft ? 'Draft' : app.status.replace('-', ' ')}
                        </span>
                      </div>
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Application Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span>{app.total_travelers} Traveler(s)</span>
                  </div>
                  {app.departure_date && (
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>Departure: {new Date(app.departure_date).toLocaleDateString()}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>Created: {new Date(app.created_at).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>
                      {app.is_draft ? `Step ${app.progress_step} of 7` : 'Progress'}
                    </span>
                    <span>{Math.round(getProgress(app))}%</span>
                  </div>
                  <Progress value={getProgress(app)} className="h-2" />
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2">
                  <div className="text-xs text-gray-500">
                    {app.auto_saved_at && (
                      <span>Last saved: {new Date(app.auto_saved_at).toLocaleString()}</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewApplication(app.id)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    {app.is_draft && (
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => handleContinueApplication(app.id)}
                      >
                        <Edit3 className="h-4 w-4 mr-1" />
                        Continue
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <CardContent>
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No applications yet
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Start your first visa application with our intelligent form system. 
              We'll guide you through every step and save your progress automatically.
            </p>
            <Button
              onClick={handleNewApplication}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Start Your First Application
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MyApplications;