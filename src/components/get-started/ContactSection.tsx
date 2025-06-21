
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const ContactSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-900">Get in Touch</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-yellow-500" />
            <div>
              <p className="font-semibold">Phone</p>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-yellow-500" />
            <div>
              <p className="font-semibold">Email</p>
              <p className="text-gray-600">hello@oneglobaltrip.com</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="h-5 w-5 text-yellow-500" />
            <div>
              <p className="font-semibold">Office</p>
              <p className="text-gray-600">Dallas, Texas</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Clock className="h-5 w-5 text-yellow-500" />
            <div>
              <p className="font-semibold">Hours</p>
              <p className="text-gray-600">Mon-Fri: 9AM-6PM CST</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-blue-900">Quick Message</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <Label htmlFor="contact-name">Name</Label>
              <Input id="contact-name" />
            </div>
            <div>
              <Label htmlFor="contact-email">Email</Label>
              <Input id="contact-email" type="email" />
            </div>
            <div>
              <Label htmlFor="contact-subject">Subject</Label>
              <Input id="contact-subject" />
            </div>
            <div>
              <Label htmlFor="contact-message">Message</Label>
              <Textarea id="contact-message" rows={4} />
            </div>
            <Button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-blue-900 font-bold">
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactSection;
