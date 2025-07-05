import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plane, 
  Hotel, 
  Package, 
  Plus, 
  Calendar, 
  MapPin, 
  Clock,
  CheckCircle2,
  AlertTriangle,
  DollarSign,
  Users,
  Loader2
} from 'lucide-react';

interface Booking {
  id: string;
  booking_type: string;
  booking_category: string;
  status: string;
  location: string;
  booking_date: string;
  check_in_date: string | null;
  check_out_date: string | null;
  cost: number;
  confirmation_code: string;
  supplier_reference: string;
  description: string;
  booking_details: any;
  created_at: string;
}

interface Trip {
  id: string;
  destination_country: string;
  departure_city: string;
  departure_date: string;
  return_date: string;
  trip_type: string;
  status: string;
  total_budget: number;
  created_at: string;
  bookings: Booking[];
}

const MyTrips = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('all');

  const { data: trips = [], isLoading } = useQuery({
    queryKey: ['my-trips', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('trips')
        .select(`
          *,
          bookings (*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Trip[];
    },
    enabled: !!user?.id
  });

  const { data: allBookings = [], isLoading: bookingsLoading } = useQuery({
    queryKey: ['my-bookings', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Booking[];
    },
    enabled: !!user?.id
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'cancelled':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const getBookingIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'flight':
        return <Plane className="h-5 w-5 text-blue-600" />;
      case 'hotel':
      case 'accommodation':
        return <Hotel className="h-5 w-5 text-green-600" />;
      case 'package':
        return <Package className="h-5 w-5 text-purple-600" />;
      default:
        return <Calendar className="h-5 w-5 text-gray-600" />;
    }
  };

  const filterBookings = (bookings: Booking[], category: string) => {
    if (category === 'all') return bookings;
    return bookings.filter(booking => 
      booking.booking_type.toLowerCase() === category || 
      booking.booking_category?.toLowerCase() === category
    );
  };

  if (isLoading || bookingsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          <span className="text-gray-600">Loading your trips...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Trips</h2>
          <p className="text-gray-600 mt-1">
            Manage your flights, hotels, and travel packages
          </p>
        </div>
        <Button
          className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>New Booking</span>
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Bookings</TabsTrigger>
          <TabsTrigger value="flight">Flights</TabsTrigger>
          <TabsTrigger value="hotel">Hotels</TabsTrigger>
          <TabsTrigger value="package">Packages</TabsTrigger>
          <TabsTrigger value="trips">Trip Plans</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {allBookings.length > 0 ? (
            <div className="grid gap-4">
              {filterBookings(allBookings, 'all').map((booking) => (
                <Card key={booking.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {getBookingIcon(booking.booking_type)}
                        <div>
                          <h3 className="font-semibold text-lg capitalize">
                            {booking.booking_type} - {booking.location}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {booking.confirmation_code && `Confirmation: ${booking.confirmation_code}`}
                          </p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(booking.status)}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(booking.status)}
                          <span className="capitalize">{booking.status}</span>
                        </div>
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      {booking.check_in_date && (
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>Check-in: {new Date(booking.check_in_date).toLocaleDateString()}</span>
                        </div>
                      )}
                      {booking.check_out_date && (
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>Check-out: {new Date(booking.check_out_date).toLocaleDateString()}</span>
                        </div>
                      )}
                      {booking.cost && (
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4" />
                          <span>${booking.cost.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>Booked: {new Date(booking.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {booking.description && (
                      <p className="mt-3 text-sm text-gray-700">{booking.description}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No bookings yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Start planning your next adventure by booking flights, hotels, or travel packages.
                </p>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Make Your First Booking
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="flight">
          <div className="grid gap-4">
            {filterBookings(allBookings, 'flight').map((booking) => (
              <Card key={booking.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Plane className="h-6 w-6 text-blue-600" />
                    <div>
                      <h3 className="font-semibold text-lg">{booking.location}</h3>
                      <p className="text-sm text-gray-600">Flight Booking</p>
                    </div>
                  </div>
                  {/* Flight-specific details would go here */}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="hotel">
          <div className="grid gap-4">
            {filterBookings(allBookings, 'hotel').map((booking) => (
              <Card key={booking.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Hotel className="h-6 w-6 text-green-600" />
                    <div>
                      <h3 className="font-semibold text-lg">{booking.location}</h3>
                      <p className="text-sm text-gray-600">Hotel Reservation</p>
                    </div>
                  </div>
                  {/* Hotel-specific details would go here */}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="package">
          <div className="grid gap-4">
            {filterBookings(allBookings, 'package').map((booking) => (
              <Card key={booking.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Package className="h-6 w-6 text-purple-600" />
                    <div>
                      <h3 className="font-semibold text-lg">{booking.location}</h3>
                      <p className="text-sm text-gray-600">Travel Package</p>
                    </div>
                  </div>
                  {/* Package-specific details would go here */}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trips">
          <div className="grid gap-4">
            {trips.map((trip) => (
              <Card key={trip.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <span>{trip.destination_country}</span>
                    </CardTitle>
                    <Badge className={getStatusColor(trip.status)}>
                      {trip.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">From:</span>
                      <p className="font-medium">{trip.departure_city}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Departure:</span>
                      <p className="font-medium">{new Date(trip.departure_date).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Return:</span>
                      <p className="font-medium">{trip.return_date ? new Date(trip.return_date).toLocaleDateString() : 'Open'}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Budget:</span>
                      <p className="font-medium">${trip.total_budget?.toLocaleString() || 'TBD'}</p>
                    </div>
                  </div>
                  
                  {trip.bookings && trip.bookings.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Bookings ({trip.bookings.length})</h4>
                      <div className="flex flex-wrap gap-2">
                        {trip.bookings.map((booking) => (
                          <Badge key={booking.id} variant="outline">
                            {booking.booking_type}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyTrips;