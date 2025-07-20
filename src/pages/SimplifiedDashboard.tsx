import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import SimplifiedNavigation from '@/components/SimplifiedNavigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  PlaneTakeoff, 
  Bot, 
  MapPin, 
  Calendar, 
  User, 
  Settings,
  Plus,
  MessageCircle,
  FileText,
  CheckCircle
} from 'lucide-react';

const SimplifiedDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tripPlanningData, setTripPlanningData] = useState(() => {
    const stored = localStorage.getItem('tripPlanningData');
    return stored ? JSON.parse(stored) : null;
  });

  const quickActions = [
    {
      title: 'Plan New Trip',
      description: 'Start planning your next adventure',
      icon: PlaneTakeoff,
      action: () => navigate('/startmytrip'),
      color: 'bg-blue-500'
    },
    {
      title: 'Chat with AI',
      description: 'Get travel advice and recommendations',
      icon: MessageCircle,
      action: () => navigate('/ai-chat'),
      color: 'bg-purple-500'
    },
    {
      title: 'Visa Support',
      description: 'Get help with visa applications',
      icon: FileText,
      action: () => navigate('/visas'),
      color: 'bg-green-500'
    },
    {
      title: 'Create AI Agent',
      description: 'Personalize your travel assistant',
      icon: Bot,
      action: () => navigate('/dashboard?tab=settings'),
      color: 'bg-orange-500'
    }
  ];

  const recentActivities = [
    {
      action: 'Started trip planning',
      date: new Date().toLocaleDateString(),
      status: 'in-progress'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SimplifiedNavigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.user_metadata?.first_name || 'Traveler'}! 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Ready to plan your next amazing adventure?
          </p>
        </div>

        {/* Trip Planning Data Card */}
        {tripPlanningData && (
          <Card className="mb-8 border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                Your Trip Planning Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Destinations:</span> {tripPlanningData.destinations?.join(', ') || 'Not specified'}
                </div>
                <div>
                  <span className="font-medium">Budget:</span> {tripPlanningData.budget || 'Not specified'}
                </div>
                <div>
                  <span className="font-medium">Travel Type:</span> {tripPlanningData.travelType || 'Not specified'}
                </div>
                <div>
                  <span className="font-medium">Duration:</span> {tripPlanningData.duration || 'Not specified'}
                </div>
              </div>
              <Button className="mt-4" onClick={() => navigate('/ai-chat')}>
                <MessageCircle className="h-4 w-4 mr-2" />
                Continue Planning with AI
              </Button>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trips">My Trips</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Actions */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={action.action}>
                    <CardContent className="p-6 text-center">
                      <div className={`${action.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <action.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <Card>
                <CardContent className="p-6">
                  {recentActivities.length > 0 ? (
                    <div className="space-y-4">
                      {recentActivities.map((activity, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                              <PlaneTakeoff className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{activity.action}</p>
                              <p className="text-sm text-gray-600">{activity.date}</p>
                            </div>
                          </div>
                          <Badge variant={activity.status === 'completed' ? 'default' : 'secondary'}>
                            {activity.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No recent activity</p>
                      <Button className="mt-4" onClick={() => navigate('/startmytrip')}>
                        <Plus className="h-4 w-4 mr-2" />
                        Start Your First Trip
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trips" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Trips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">No trips planned yet</p>
                  <Button onClick={() => navigate('/startmytrip')}>
                    <Plus className="h-4 w-4 mr-2" />
                    Plan Your First Trip
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">No bookings yet</p>
                  <Button onClick={() => navigate('/packages')}>
                    <Plus className="h-4 w-4 mr-2" />
                    Browse Packages
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Profile Settings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Manage your account information</p>
                  <Button variant="outline" onClick={() => navigate('/profile')}>
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bot className="h-5 w-5 mr-2" />
                    AI Travel Agent
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Create and customize your personal AI travel assistant</p>
                  <Button>
                    <Bot className="h-4 w-4 mr-2" />
                    Set Up AI Agent
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default SimplifiedDashboard;