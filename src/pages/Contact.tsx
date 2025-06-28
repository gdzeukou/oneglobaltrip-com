
import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Contact = () => {
  const handleBookConsultation = () => {
    window.open('https://calendly.com/admin-oneglobaltrip/planmytrip', '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 bg-gradient-to-br from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Ready to start your journey? Our travel experts are here to help you every step of the way.
          </p>
          <Button
            onClick={handleBookConsultation}
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3"
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Book Free Consultation
          </Button>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <Phone className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Phone</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">+1 (877) 622-7278</p>
                <p className="text-sm text-gray-500 mt-1">Mon-Fri 9AM-6PM EST</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Mail className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Email</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">hello@oneglobaltrip.com</p>
                <p className="text-sm text-gray-500 mt-1">24/7 Support</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Office</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">123 Travel Street</p>
                <p className="text-gray-600">New York, NY 10001</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Mon-Fri: 9AM-6PM</p>
                <p className="text-gray-600">Sat-Sun: 10AM-4PM</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            How Can We Help You Today?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-xl mb-4">Plan Your Trip</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Explore our curated travel packages and find your perfect destination.
                </p>
                <Button 
                  className="w-full"
                  onClick={() => window.location.href = '/packages'}
                >
                  View Packages
                </Button>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-xl mb-4">Visa Services</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Get expert help with visa applications and requirements.
                </p>
                <Button 
                  className="w-full"
                  onClick={() => window.location.href = '/visas'}
                >
                  Explore Visas
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
