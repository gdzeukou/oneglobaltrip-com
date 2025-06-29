
import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Plane, FileText, Clock, CheckCircle } from 'lucide-react';

const Bookings = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Mock booking data
  const bookings = [
    {
      id: 1,
      reference: 'VA-2024-12345',
      destination: 'France',
      visaType: 'Short-stay Tourist',
      status: 'processing',
      applicationDate: '2024-12-15',
      expectedDecision: '2024-12-30',
      documents: 8,
      price: '$299'
    },
    {
      id: 2,
      reference: 'VA-2024-12346',
      destination: 'Germany',
      visaType: 'Business Visa',
      status: 'approved',
      applicationDate: '2024-11-20',
      expectedDecision: '2024-12-05',
      documents: 6,
      price: '$275'
    },
    {
      id: 3,
      reference: 'VA-2024-12347',
      destination: 'UK',
      visaType: 'Tourist Visa',
      status: 'pending',
      applicationDate: '2024-12-20',
      expectedDecision: '2025-01-10',
      documents: 5,
      price: '$325'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4" />;
      case 'processing':
        return <Clock className="h-4 w-4" />;
      case 'pending':
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4">My Bookings</h1>
              <p className="text-xl text-blue-100">Track your visa applications and travel bookings</p>
            </div>
            <Link to="/apply">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold">
                New Application
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Bookings List */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {bookings.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Plane className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings yet</h3>
                <p className="text-gray-600 mb-6">Start your visa application to see your bookings here.</p>
                <Link to="/apply">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Start Application
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {bookings.map((booking) => (
                <Card key={booking.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5 text-blue-600" />
                        <span>{booking.destination} - {booking.visaType}</span>
                      </CardTitle>
                      <Badge className={getStatusColor(booking.status)}>
                        {getStatusIcon(booking.status)}
                        <span className="ml-1 capitalize">{booking.status}</span>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Reference</p>
                        <p className="font-semibold">{booking.reference}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Application Date</p>
                        <p className="font-semibold flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {booking.applicationDate}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Expected Decision</p>
                        <p className="font-semibold">{booking.expectedDecision}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Price</p>
                        <p className="font-semibold text-green-600">{booking.price}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <FileText className="h-4 w-4 mr-1" />
                          {booking.documents} documents
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                          Track Status
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Bookings;
