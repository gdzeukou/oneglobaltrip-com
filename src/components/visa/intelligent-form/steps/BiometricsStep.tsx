
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ApplicationData } from '../IntelligentVisaForm';
import { MapPin, Clock, Phone, ExternalLink, Calendar } from 'lucide-react';

interface BiometricsStepProps {
  formData: ApplicationData;
  onInputChange: (field: string, value: any) => void;
}

interface BiometricCenter {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  hours: string;
  distance: string;
  availability: 'high' | 'medium' | 'low';
  services: string[];
}

const BiometricsStep = ({ formData, onInputChange }: BiometricsStepProps) => {
  const [selectedCenter, setSelectedCenter] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  // Mock data - in real implementation, this would be fetched based on user location
  const biometricCenters: BiometricCenter[] = [
    {
      id: 'vfs-nyc',
      name: 'VFS Global - New York',
      address: '145 W 45th St, New York, NY 10036',
      city: 'New York',
      phone: '+1 (212) 967-8030',
      hours: 'Mon-Fri: 8:00 AM - 4:00 PM',
      distance: '2.3 miles',
      availability: 'high',
      services: ['Biometric Collection', 'Document Verification', 'Premium Lounge']
    },
    {
      id: 'tlscontact-nyc',
      name: 'TLScontact - New York',
      address: '1350 Broadway, New York, NY 10018',
      city: 'New York',
      phone: '+1 (212) 858-0048',
      hours: 'Mon-Fri: 9:00 AM - 3:00 PM',
      distance: '3.1 miles',
      availability: 'medium',
      services: ['Biometric Collection', 'Photo Service', 'Express Service']
    }
  ];

  const availableDates = [
    '2024-01-15',
    '2024-01-16',
    '2024-01-17',
    '2024-01-18',
    '2024-01-19'
  ];

  const availableTimes = [
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM'
  ];

  const getAvailabilityBadge = (availability: string) => {
    switch (availability) {
      case 'high':
        return <Badge className="bg-green-100 text-green-800">High Availability</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">Medium Availability</Badge>;
      case 'low':
        return <Badge className="bg-red-100 text-red-800">Low Availability</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Biometric Appointment</h3>
        <p className="text-gray-600 mb-6">
          Your visa application requires biometric data collection (fingerprints and photograph). 
          Please select a convenient appointment center and time slot.
        </p>
      </div>

      {/* Important Information */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-6">
          <h4 className="font-semibold text-blue-900 mb-4">What to Expect</h4>
          <ul className="space-y-2 text-blue-800 text-sm">
            <li className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <span>Biometric appointment typically takes 15-30 minutes</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <span>Bring your passport and appointment confirmation</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <span>Arrive 15 minutes before your scheduled time</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <span>No electronic devices allowed inside the center</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Select Biometric Center */}
      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4">Select Biometric Center</h4>
        <div className="space-y-4">
          {biometricCenters.map((center) => (
            <Card 
              key={center.id} 
              className={`cursor-pointer transition-all ${
                selectedCenter === center.id 
                  ? 'border-blue-500 ring-2 ring-blue-200 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedCenter(center.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-1">{center.name}</h5>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{center.distance}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Phone className="h-4 w-4" />
                        <span>{center.phone}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{center.address}</p>
                  </div>
                  {getAvailabilityBadge(center.availability)}
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">
                      <Clock className="h-4 w-4 inline mr-1" />
                      {center.hours}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {center.services.map((service) => (
                        <Badge key={service} variant="secondary" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(`https://maps.google.com?q=${encodeURIComponent(center.address)}`, '_blank');
                    }}
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    View Map
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Select Date and Time */}
      {selectedCenter && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-4">Select Date</h4>
            <div className="grid grid-cols-2 gap-2">
              {availableDates.map((date) => (
                <Button
                  key={date}
                  variant={selectedDate === date ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => setSelectedDate(date)}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    weekday: 'short'
                  })}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-4">Select Time</h4>
            <div className="grid grid-cols-2 gap-2">
              {availableTimes.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  onClick={() => setSelectedTime(time)}
                  disabled={!selectedDate}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Appointment Summary */}
      {selectedCenter && selectedDate && selectedTime && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6">
            <h4 className="font-semibold text-green-900 mb-4">Appointment Summary</h4>
            <div className="space-y-2 text-green-800">
              <p><strong>Center:</strong> {biometricCenters.find(c => c.id === selectedCenter)?.name}</p>
              <p><strong>Date:</strong> {new Date(selectedDate).toLocaleDateString('en-US', { 
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</p>
              <p><strong>Time:</strong> {selectedTime}</p>
              <p><strong>Address:</strong> {biometricCenters.find(c => c.id === selectedCenter)?.address}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BiometricsStep;
