import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Calendar, MessageCircle, FileText, Phone, Mail, MapPin, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CalendlyWidget from '@/components/CalendlyWidget';

const GetStarted = () => {
  const [searchParams] = useSearchParams();
  const service = searchParams.get('service');
  const [activeTab, setActiveTab] = useState(service ? 'visa-form' : 'consultation');
  const [formData, setFormData] = useState({
    // Consultation Form
    name: '',
    email: '',
    phone: '',
    travelDates: '',
    destinations: '',
    travelers: '',
    budget: '',
    interests: '',
    
    // Visa Form
    visaType: service || '',
    nationality: '',
    travelPurpose: 'tourism',
    departureDate: '',
    returnDate: '',
    previousVisas: '',
    specialCircumstances: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would submit to Supabase
    console.log('Consultation request:', formData);
    alert('Consultation request submitted! We\'ll contact you within 4 hours.');
  };

  const handleVisaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would submit to Supabase
    console.log('Visa application:', formData);
    alert('Visa application submitted! We\'ll review and contact you within 24 hours.');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Let's Plan Your
            <span className="block text-yellow-500">Dream Trip</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Schedule a free consultation or start your visa application
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="consultation" className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Free Consultation</span>
              </TabsTrigger>
              <TabsTrigger value="visa-form" className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Visa Application</span>
              </TabsTrigger>
              <TabsTrigger value="contact" className="flex items-center space-x-2">
                <MessageCircle className="h-4 w-4" />
                <span>Contact Us</span>
              </TabsTrigger>
            </TabsList>

            {/* Free Consultation Tab */}
            <TabsContent value="consultation">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-blue-900">
                      <Calendar className="h-5 w-5" />
                      <span>Schedule Your Free Consultation</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleConsultationSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="travelers">Number of Travelers</Label>
                          <select
                            id="travelers"
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            value={formData.travelers}
                            onChange={(e) => handleInputChange('travelers', e.target.value)}
                          >
                            <option value="">Select...</option>
                            <option value="1">1 Traveler</option>
                            <option value="2">2 Travelers</option>
                            <option value="3-4">3-4 Travelers</option>
                            <option value="5+">5+ Travelers</option>
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="budget">Budget Range</Label>
                          <select
                            id="budget"
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            value={formData.budget}
                            onChange={(e) => handleInputChange('budget', e.target.value)}
                          >
                            <option value="">Select...</option>
                            <option value="under-5000">Under $5,000</option>
                            <option value="5000-10000">$5,000 - $10,000</option>
                            <option value="10000-20000">$10,000 - $20,000</option>
                            <option value="over-20000">Over $20,000</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="destinations">Interested Destinations</Label>
                        <Input
                          id="destinations"
                          placeholder="e.g., Paris, Rome, Barcelona..."
                          value={formData.destinations}
                          onChange={(e) => handleInputChange('destinations', e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="travelDates">Travel Dates (if known)</Label>
                        <Input
                          id="travelDates"
                          placeholder="e.g., June 2024, Summer 2024, Flexible"
                          value={formData.travelDates}
                          onChange={(e) => handleInputChange('travelDates', e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="interests">Special Interests</Label>
                        <Textarea
                          id="interests"
                          placeholder="Tell us about your interests, preferences, special occasions..."
                          value={formData.interests}
                          onChange={(e) => handleInputChange('interests', e.target.value)}
                        />
                      </div>

                      <Button 
                        type="submit"
                        className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-blue-900 font-bold"
                      >
                        Schedule Free Consultation
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-blue-900">What to Expect</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <Clock className="h-5 w-5 text-yellow-500 mt-1" />
                          <div>
                            <h4 className="font-semibold">15-Minute Call</h4>
                            <p className="text-gray-600 text-sm">Quick, focused discussion about your travel goals</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-yellow-500 mt-1" />
                          <div>
                            <h4 className="font-semibold">Personalized Recommendations</h4>
                            <p className="text-gray-600 text-sm">Custom itinerary suggestions based on your preferences</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <FileText className="h-5 w-5 text-yellow-500 mt-1" />
                          <div>
                            <h4 className="font-semibold">Visa Guidance</h4>
                            <p className="text-gray-600 text-sm">Clear explanation of visa requirements and process</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Calendly Widget */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-blue-900">Schedule Directly</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center space-y-4">
                        <p className="text-gray-600 mb-4">
                          Ready to get started? Book your free consultation instantly
                        </p>
                        <CalendlyWidget 
                          url="https://calendly.com/admin-oneglobaltrip/planmytrip"
                          buttonText="Book Free Consultation"
                        />
                        <p className="text-sm text-gray-500">
                          15-minute call • No commitment required
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Visa Application Tab */}
            <TabsContent value="visa-form">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-blue-900">
                    <FileText className="h-5 w-5" />
                    <span>Visa Application Form</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleVisaSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="visa-name">Full Name *</Label>
                        <Input
                          id="visa-name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="visa-email">Email *</Label>
                        <Input
                          id="visa-email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="visaType">Visa Type *</Label>
                        <select
                          id="visaType"
                          className="w-full p-2 border border-gray-300 rounded-lg"
                          value={formData.visaType}
                          onChange={(e) => handleInputChange('visaType', e.target.value)}
                          required
                        >
                          <option value="">Select visa type...</option>
                          <option value="schengen">Schengen Visa Pack</option>
                          <option value="uk">UK Visa Pass</option>
                          <option value="brazil">Brazil eVisa</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="nationality">Nationality *</Label>
                        <Input
                          id="nationality"
                          value={formData.nationality}
                          onChange={(e) => handleInputChange('nationality', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="departureDate">Planned Departure Date</Label>
                        <Input
                          id="departureDate"
                          type="date"
                          value={formData.departureDate}
                          onChange={(e) => handleInputChange('departureDate', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="returnDate">Planned Return Date</Label>
                        <Input
                          id="returnDate"
                          type="date"
                          value={formData.returnDate}
                          onChange={(e) => handleInputChange('returnDate', e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="travelPurpose">Purpose of Travel</Label>
                      <select
                        id="travelPurpose"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        value={formData.travelPurpose}
                        onChange={(e) => handleInputChange('travelPurpose', e.target.value)}
                      >
                        <option value="tourism">Tourism</option>
                        <option value="business">Business</option>
                        <option value="family">Family Visit</option>
                        <option value="conference">Conference/Event</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="previousVisas">Previous Visa History</Label>
                      <Textarea
                        id="previousVisas"
                        placeholder="Have you applied for visas to these countries before? Any rejections or special circumstances?"
                        value={formData.previousVisas}
                        onChange={(e) => handleInputChange('previousVisas', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="specialCircumstances">Special Circumstances</Label>
                      <Textarea
                        id="specialCircumstances"
                        placeholder="Any special circumstances we should know about? Urgent travel, complex itinerary, etc."
                        value={formData.specialCircumstances}
                        onChange={(e) => handleInputChange('specialCircumstances', e.target.value)}
                      />
                    </div>

                    <Button 
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700"
                    >
                      Submit Visa Application
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Contact Tab */}
            <TabsContent value="contact">
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
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GetStarted;
