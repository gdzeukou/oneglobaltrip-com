
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';

const Contact = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Navigation />
      
      {/* Hero Section - Brighter gradient and colors */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6 text-white drop-shadow-md">Get in Touch</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-white/95 font-medium">
            Ready to start your journey? Our travel experts are here to help you every step of the way.
          </p>
          <Button 
            onClick={() => window.open('https://calendly.com/camronm-oneglobaltrip/30min', '_blank')}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-lg px-8 py-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Book Free Consultation
          </Button>
        </div>
      </section>

      {/* Contact Information - Brighter cards and colors */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Details */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Contact Information</h2>
              <div className="space-y-6">
                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-r from-blue-50 to-blue-100">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <Phone className="h-6 w-6 text-blue-500" />
                      <span className="text-gray-800 font-bold">Phone Support</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold text-gray-900">+1 (555) 123-4567</p>
                    <p className="text-gray-700 font-medium">Available 24/7 for urgent matters</p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-r from-purple-50 to-purple-100">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <Mail className="h-6 w-6 text-purple-500" />
                      <span className="text-gray-800 font-bold">Email Support</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold text-gray-900">support@oneglobaltrip.com</p>
                    <p className="text-gray-700 font-medium">Response within 2-4 hours</p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-r from-green-50 to-green-100">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <Clock className="h-6 w-6 text-green-500" />
                      <span className="text-gray-800 font-bold">Business Hours</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold text-gray-900">Mon - Fri: 9AM - 6PM EST</p>
                    <p className="text-gray-700 font-medium">Weekend support available</p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-r from-orange-50 to-orange-100">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <MessageCircle className="h-6 w-6 text-orange-500" />
                      <span className="text-gray-800 font-bold">Live Chat</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold text-gray-900">Available on website</p>
                    <p className="text-gray-700 font-medium">Instant responses during business hours</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Quick Contact Form - Brighter styling */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Quick Contact</h2>
              <Card className="border-0 shadow-lg bg-white">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-3">
                        Name
                      </label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors font-medium"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-3">
                        Email
                      </label>
                      <input 
                        type="email" 
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors font-medium"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-3">
                        Phone
                      </label>
                      <input 
                        type="tel" 
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors font-medium"
                        placeholder="Your phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-3">
                        Message
                      </label>
                      <textarea 
                        rows={4}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors font-medium"
                        placeholder="How can we help you?"
                      />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                      Send Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations - Brighter background and cards */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Offices</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-200 bg-white hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <MapPin className="h-6 w-6 text-blue-500" />
                  <span className="text-gray-800 font-bold">New York Office</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 font-medium">
                  123 Business Avenue<br />
                  New York, NY 10001<br />
                  United States
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-200 bg-white hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <MapPin className="h-6 w-6 text-purple-500" />
                  <span className="text-gray-800 font-bold">London Office</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 font-medium">
                  456 Travel Street<br />
                  London, EC1A 1BB<br />
                  United Kingdom
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-200 bg-white hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <MapPin className="h-6 w-6 text-pink-500" />
                  <span className="text-gray-800 font-bold">Dubai Office</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 font-medium">
                  789 Global Plaza<br />
                  Dubai, UAE<br />
                  United Arab Emirates
                </p>
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
