
import { useState } from 'react';
import { CheckCircle, Clock, FileText, Shield, ArrowRight, AlertCircle, Users, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const Visas = () => {
  const [selectedVisa, setSelectedVisa] = useState('schengen');

  const visaServices = [
    {
      id: 'schengen',
      name: 'Schengen Visa Pack',
      countries: '27 European Countries',
      price: 299,
      processingTime: '10-15 days',
      validityPeriod: '90 days',
      description: 'Access to 27 European countries with a single visa',
      requirements: [
        'Valid passport (6+ months validity)',
        'Completed application form',
        'Recent passport photos',
        'Travel insurance',
        'Proof of accommodation',
        'Flight itinerary',
        'Bank statements',
        'Employment letter'
      ],
      included: [
        'Application review & submission',
        'Document preparation assistance',
        'Appointment scheduling',
        'Status tracking',
        'Guaranteed approval or full refund'
      ],
      timeline: [
        { step: 'Document Review', duration: '1-2 days', description: 'We review your documents for completeness' },
        { step: 'Application Prep', duration: '2-3 days', description: 'We prepare and organize your application' },
        { step: 'Submission', duration: '1 day', description: 'We submit your application to the consulate' },
        { step: 'Processing', duration: '10-15 days', description: 'Consulate processes your application' },
        { step: 'Collection', duration: '1-2 days', description: 'We collect and deliver your passport' }
      ]
    },
    {
      id: 'uk',
      name: 'UK Visa Pass',
      countries: 'United Kingdom',
      price: 399,
      processingTime: '15-20 days',
      validityPeriod: '6 months',
      description: 'Standard visitor visa for tourism and business',
      requirements: [
        'Valid passport (6+ months validity)',
        'Completed online application',
        'Biometric information',
        'Recent passport photos',
        'Travel insurance',
        'Proof of accommodation',
        'Flight itinerary',
        'Financial evidence',
        'Employment documentation'
      ],
      included: [
        'Online application assistance',
        'Document preparation',
        'Biometric appointment booking',
        'Priority processing option',
        'Application tracking',
        'Approval guarantee'
      ],
      timeline: [
        { step: 'Online Application', duration: '1-2 days', description: 'Complete online application form' },
        { step: 'Document Prep', duration: '2-3 days', description: 'Prepare supporting documents' },
        { step: 'Biometric Appointment', duration: '3-5 days', description: 'Schedule and attend biometric appointment' },
        { step: 'Processing', duration: '15-20 days', description: 'UKVI processes your application' },
        { step: 'Decision', duration: '1-2 days', description: 'Receive decision and passport' }
      ]
    },
    {
      id: 'brazil',
      name: 'Brazil eVisa',
      countries: 'Brazil',
      price: 199,
      processingTime: '5-10 days',
      validityPeriod: '90 days',
      description: 'Electronic visa for tourism purposes',
      requirements: [
        'Valid passport (6+ months validity)',
        'Digital passport photo',
        'Proof of accommodation',
        'Return flight ticket',
        'Bank statements',
        'Yellow fever certificate (if applicable)'
      ],
      included: [
        'Online application completion',
        'Document verification',
        'Application submission',
        'Status monitoring',
        'eVisa delivery'
      ],
      timeline: [
        { step: 'Application Start', duration: '1 day', description: 'Begin online application process' },
        { step: 'Document Upload', duration: '1-2 days', description: 'Upload required documents' },
        { step: 'Review & Submit', duration: '1 day', description: 'Final review and submission' },
        { step: 'Processing', duration: '5-10 days', description: 'Brazilian authorities process application' },
        { step: 'eVisa Issued', duration: '1 day', description: 'Receive eVisa via email' }
      ]
    }
  ];

  const currentVisa = visaServices.find(visa => visa.id === selectedVisa);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Visa Services
            <span className="block text-yellow-500">Guaranteed Approval</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Professional visa assistance with 100% approval guarantee or full refund
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
              <Shield className="h-5 w-5 text-yellow-500" />
              <span>100% Approval Rate</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
              <Clock className="h-5 w-5 text-yellow-500" />
              <span>Fast Processing</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
              <Users className="h-5 w-5 text-yellow-500" />
              <span>Expert Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Visa Services Overview */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {visaServices.map((visa) => (
              <Card key={visa.id} className="hover-lift cursor-pointer" onClick={() => setSelectedVisa(visa.id)}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-blue-900">{visa.name}</CardTitle>
                    <Badge className="bg-yellow-500 text-blue-900 font-bold">
                      ${visa.price}
                    </Badge>
                  </div>
                  <p className="text-gray-600">{visa.countries}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{visa.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Processing Time:</span>
                      <span className="font-medium">{visa.processingTime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Validity:</span>
                      <span className="font-medium">{visa.validityPeriod}</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-4 bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700"
                    asChild
                  >
                    <Link to={`/get-started?service=${visa.id}`}>
                      Apply Now
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Visa Information */}
      {currentVisa && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{currentVisa.name} Details</h2>
              <p className="text-xl text-gray-600">{currentVisa.description}</p>
            </div>

            <Tabs defaultValue="requirements" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                <TabsTrigger value="included">What's Included</TabsTrigger>
                <TabsTrigger value="timeline">Process Timeline</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>

              <TabsContent value="requirements" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="h-5 w-5" />
                      <span>Required Documents</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentVisa.requirements.map((req, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{req}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="included" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="h-5 w-5" />
                      <span>Service Includes</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentVisa.included.map((item, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="timeline" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Clock className="h-5 w-5" />
                      <span>Process Timeline</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {currentVisa.timeline.map((step, index) => (
                        <div key={index} className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-blue-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                              {index + 1}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">{step.step}</h4>
                            <p className="text-yellow-600 font-medium">{step.duration}</p>
                            <p className="text-gray-600 mt-1">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="faq" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <AlertCircle className="h-5 w-5" />
                      <span>Frequently Asked Questions</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">What if my visa is rejected?</h4>
                        <p className="text-gray-600">We offer a 100% money-back guarantee if your visa application is rejected when you follow our guidance completely.</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Can you help with urgent applications?</h4>
                        <p className="text-gray-600">Yes, we offer expedited processing for urgent travel needs. Additional fees may apply depending on the visa type.</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Do you handle group applications?</h4>
                        <p className="text-gray-600">Absolutely! We provide discounted rates for group applications of 5 or more people traveling together.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="text-center mt-12">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-blue-900 font-bold px-8 py-4"
                asChild
              >
                <Link to={`/get-started?service=${currentVisa.id}`}>
                  Start {currentVisa.name} Application
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Visas;
