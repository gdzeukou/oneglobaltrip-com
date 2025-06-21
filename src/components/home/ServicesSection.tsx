
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Plane, Hotel, MapPin } from 'lucide-react';

const ServicesSection = () => {
  const features = [
    {
      icon: <FileText className="h-6 w-6" />,
      name: 'Visa Services',
      description: 'Expert visa processing for 180+ countries',
    },
    {
      icon: <Plane className="h-6 w-6" />,
      name: 'Flight Deals',
      description: 'Best prices on international flights',
    },
    {
      icon: <Hotel className="h-6 w-6" />,
      name: 'Hotel Bookings',
      description: 'Handpicked accommodations worldwide',
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      name: 'Travel Planning',
      description: 'Custom itineraries and local experiences',
    },
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need for Travel</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From visa approval to your dream destination - we handle it all
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-blue-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <div className="text-blue-600">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.name}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
