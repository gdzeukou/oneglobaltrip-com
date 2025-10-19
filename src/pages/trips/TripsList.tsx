import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Plus, Calendar, MapPin, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PremiumCard from '@/components/ui/premium-card';
import { Card } from '@/components/ui/card';
import OGTNavbar from '@/components/navigation/OGTNavbar';
import PersistentAIWidget from '@/components/ai/PersistentAIWidget';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Trip {
  id: string;
  destination: string;
  start_date: string;
  end_date: string;
  travelers_count: number;
  status: string;
  budget_amount?: number;
  budget_currency?: string;
}

const TripsList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchTrips();
    }
  }, [user]);

  const fetchTrips = async () => {
    try {
      const { data, error } = await supabase
        .from('trips')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTrips(data || []);
    } catch (error) {
      console.error('Error fetching trips:', error);
      toast({
        title: 'Error',
        description: 'Failed to load your trips',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getDaysDifference = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning':
        return 'bg-blue-100 text-blue-700';
      case 'confirmed':
        return 'bg-green-100 text-green-700';
      case 'ongoing':
        return 'bg-gold/20 text-gold';
      case 'completed':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <OGTNavbar />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">My Trips</h1>
            <p className="text-muted-foreground">Manage and plan your adventures</p>
          </div>
          <Button
            onClick={() => navigate('/trips/new')}
            className="bg-gradient-to-r from-primary to-primary-glow gap-2"
          >
            <Plus className="h-4 w-4" />
            New Trip
          </Button>
        </div>

        {/* Trips Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-card rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : trips.length === 0 ? (
          <Card className="p-12 text-center premium-shadow">
            <div className="max-w-md mx-auto">
              <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-3">No trips yet</h2>
              <p className="text-muted-foreground mb-6">
                Start planning your first adventure! Create a trip and let our AI help you build the perfect itinerary.
              </p>
              <Button
                onClick={() => navigate('/trips/new')}
                className="bg-gradient-to-r from-primary to-primary-glow"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Trip
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <PremiumCard
                key={trip.id}
                className="cursor-pointer overflow-hidden premium-shadow smooth-transition hover:scale-105"
              >
                <div onClick={() => navigate(`/trips/${trip.id}`)}>

                <div className="h-32 bg-gradient-to-br from-primary to-gold relative">
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(trip.status)}`}>
                      {trip.status}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{trip.destination}</h3>
                  
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(trip.start_date).toLocaleDateString()} - {new Date(trip.end_date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{getDaysDifference(trip.start_date, trip.end_date)} days</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{trip.travelers_count} traveler{trip.travelers_count > 1 ? 's' : ''}</span>
                    </div>
                  </div>

                  {trip.budget_amount && (
                    <div className="mt-4 pt-4 border-t">
                      <span className="text-sm font-semibold">
                        Budget: {trip.budget_currency} {trip.budget_amount.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
                </div>
              </PremiumCard>
            ))}
          </div>
        )}
      </main>

      <PersistentAIWidget />
    </div>
  );
};

export default TripsList;
