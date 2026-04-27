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
  Plus,
  MessageCircle,
  FileText,
  CheckCircle,
} from 'lucide-react';

const SimplifiedDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tripPlanningData] = useState(() => {
    const stored = localStorage.getItem('tripPlanningData');
    return stored ? JSON.parse(stored) : null;
  });

  const quickActions = [
    { title: 'Plan new trip',  description: 'Start planning your next adventure',     icon: PlaneTakeoff,   action: () => navigate('/startmytrip') },
    { title: 'Chat with AI',   description: 'Get travel advice and recommendations',  icon: MessageCircle,  action: () => navigate('/ai-chat') },
    { title: 'Visa support',   description: 'Get help with visa applications',        icon: FileText,       action: () => navigate('/visas') },
    { title: 'Create AI agent',description: 'Personalize your travel assistant',      icon: Bot,            action: () => navigate('/dashboard?tab=settings') },
  ];

  const recentActivities = [
    { action: 'Started trip planning', date: new Date().toLocaleDateString(), status: 'in-progress' as const },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SimplifiedNavigation />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            Welcome back, {user?.user_metadata?.first_name || 'Traveler'}.
          </h1>
          <p className="mt-2 text-muted-foreground">Ready to plan your next adventure?</p>
        </div>

        {/* Trip planning data card */}
        {tripPlanningData && (
          <Card className="mb-8 border-card-border border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-serif text-base">
                <CheckCircle className="h-4 w-4 text-verified-green" />
                Your trip planning data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div><span className="font-medium text-foreground">Destinations:</span> <span className="text-muted-foreground">{tripPlanningData.destinations?.join(', ') || 'Not specified'}</span></div>
                <div><span className="font-medium text-foreground">Budget:</span>       <span className="text-muted-foreground">{tripPlanningData.budget       || 'Not specified'}</span></div>
                <div><span className="font-medium text-foreground">Travel type:</span>  <span className="text-muted-foreground">{tripPlanningData.travelType   || 'Not specified'}</span></div>
                <div><span className="font-medium text-foreground">Duration:</span>     <span className="text-muted-foreground">{tripPlanningData.duration     || 'Not specified'}</span></div>
              </div>
              <Button className="mt-5" onClick={() => navigate('/ai-chat')}>
                <MessageCircle className="mr-2 h-4 w-4" />
                Continue planning with AI
              </Button>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trips">My trips</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Quick actions */}
            <div>
              <h2 className="font-serif text-xl font-semibold tracking-tight text-foreground mb-4">Quick actions</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {quickActions.map(({ title, description, icon: Icon, action }) => (
                  <button
                    key={title}
                    onClick={action}
                    className="text-left rounded-lg border border-card-border bg-card p-5 hover-elevate transition-colors"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-md bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 font-serif text-base font-semibold text-foreground">{title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent activity */}
            <div>
              <h2 className="font-serif text-xl font-semibold tracking-tight text-foreground mb-4">Recent activity</h2>
              <Card className="border-card-border">
                <CardContent className="p-6">
                  {recentActivities.length > 0 ? (
                    <div className="space-y-3">
                      {recentActivities.map((a, i) => (
                        <div key={i} className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <span className="grid h-8 w-8 place-items-center rounded-md bg-primary/10 text-primary">
                              <PlaneTakeoff className="h-4 w-4" />
                            </span>
                            <div>
                              <p className="font-medium text-foreground">{a.action}</p>
                              <p className="text-xs text-muted-foreground">{a.date}</p>
                            </div>
                          </div>
                          <Badge variant={a.status === 'in-progress' ? 'secondary' : 'default'}>
                            {a.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center">
                      <p className="text-muted-foreground">No recent activity</p>
                      <Button className="mt-4" onClick={() => navigate('/startmytrip')}>
                        <Plus className="mr-2 h-4 w-4" /> Start your first trip
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trips" className="space-y-6">
            <Card className="border-card-border">
              <CardHeader><CardTitle className="font-serif">My trips</CardTitle></CardHeader>
              <CardContent>
                <div className="py-10 text-center">
                  <MapPin className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">No trips planned yet</p>
                  <Button onClick={() => navigate('/startmytrip')}>
                    <Plus className="mr-2 h-4 w-4" /> Plan your first trip
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <Card className="border-card-border">
              <CardHeader><CardTitle className="font-serif">My bookings</CardTitle></CardHeader>
              <CardContent>
                <div className="py-10 text-center">
                  <Calendar className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">No bookings yet</p>
                  <Button onClick={() => navigate('/packages')}>
                    <Plus className="mr-2 h-4 w-4" /> Browse packages
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="border-card-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-serif">
                    <User className="h-4 w-4" /> Profile settings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Manage your account information.</p>
                  <Button variant="outline" onClick={() => navigate('/profile')}>Edit profile</Button>
                </CardContent>
              </Card>

              <Card className="border-card-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-serif">
                    <Bot className="h-4 w-4" /> AI travel agent
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Create and customize your personal AI travel assistant.</p>
                  <Button><Bot className="mr-2 h-4 w-4" /> Set up AI agent</Button>
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
