
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Globe, FileText, Clock, DollarSign, Download, MapPin } from 'lucide-react';

const SchengenVisaInfo = () => {
  const countries = [
    'Austria', 'Belgium', 'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France',
    'Germany', 'Greece', 'Hungary', 'Iceland', 'Italy', 'Latvia', 'Liechtenstein',
    'Lithuania', 'Luxembourg', 'Malta', 'Netherlands', 'Norway', 'Poland', 'Portugal',
    'Slovakia', 'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Croatia'
  ];

  const requiredDocuments = [
    'Valid passport (minimum 6 months validity)',
    'Completed visa application form',
    'Recent passport-sized photographs',
    'Travel insurance (minimum €30,000 coverage)',
    'Flight reservations',
    'Hotel bookings or accommodation proof',
    'Bank statements (last 3 months)',
    'Employment letter or business registration',
    'Invitation letter (if applicable)',
    'Travel itinerary'
  ];

  const servicePrices = [
    {
      name: 'Basic Package',
      price: '$193',
      features: [
        '✓ **Application review** with smart AI checklist',
        '✓ **Form completion & VAC submission**',
        '✓ **Real-time tracking portal**',
        '✓ **48 h email SLA** (two-business-day replies)'
      ]
    },
    {
      name: 'Premium Package',
      price: '$295',
      features: [
        '✓ **Everything in Visa Assist**',
        '✓ **Guaranteed 4-star hotel** in prime location',
        '✓ **Premium flight + lounge access***',
        '✓ **OGT TripGift credit** to spend however you like',
        '✓ **Comprehensive travel insurance** deals(medical, baggage, cancellation)',
        '✓ **24/7 WhatsApp & phone support** (12 h SLA)'
      ],
      popular: true
    },
    {
      name: 'VIP Package',
      price: '$495',
      features: [
        '✓ **Everything in Trip Bundle**',
        '✓ **Dedicated human agent of your choice**',
        '✓ **Priority biometric appointment slot hunt**',
        '✓ **Airport transfer service**',
        '✓ **Restaurant / event reservations**',
        '✓ **2 h SLA & 24/7 emergency helpline**'
      ]
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Complete Schengen Visa Guide
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about getting your Schengen visa approved
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="what-is-schengen">
            <AccordionTrigger className="text-left">
              <div className="flex items-center gap-3">
                <Globe className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-semibold">What is a Schengen Visa?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardContent className="p-6">
                  <div className="prose max-w-none">
                    <p className="text-lg mb-4">
                      A Schengen visa is a short-stay visa that allows you to travel freely within the Schengen Area for up to 90 days within a 180-day period. This single visa gives you access to 27 European countries without border controls between them.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Key Benefits:</h4>
                        <ul className="space-y-2">
                          <li>• Visit 27 countries with one visa</li>
                          <li>• No border checks between Schengen countries</li>
                          <li>• Valid for tourism, business, or family visits</li>
                          <li>• Multiple entry options available</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">Important Notes:</h4>
                        <ul className="space-y-2">
                          <li>• Maximum 90 days in any 180-day period</li>
                          <li>• Apply to the country of main destination</li>
                          <li>• Cannot work or study on this visa</li>
                          <li>• Must have travel insurance</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="required-documents">
            <AccordionTrigger className="text-left">
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-green-600" />
                <span className="text-xl font-semibold">Required Documents</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardContent className="p-6">
                  <div className="mb-6">
                    <Button className="mb-4">
                      <Download className="h-4 w-4 mr-2" />
                      Download Complete Checklist
                    </Button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    {requiredDocuments.map((doc, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-green-600 text-sm font-semibold">{index + 1}</span>
                        </div>
                        <span className="text-gray-700">{doc}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="processing-time">
            <AccordionTrigger className="text-left">
              <div className="flex items-center gap-3">
                <Clock className="h-6 w-6 text-orange-600" />
                <span className="text-xl font-semibold">Processing Time</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3">
                        <Clock className="h-8 w-8 text-red-600" />
                      </div>
                      <h4 className="font-semibold mb-2">Standard Processing</h4>
                      <p className="text-2xl font-bold text-red-600 mb-2">15 days</p>
                      <p className="text-gray-600 text-sm">Official processing time from embassy</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-3">
                        <Clock className="h-8 w-8 text-orange-600" />
                      </div>
                      <h4 className="font-semibold mb-2">With Our Help</h4>
                      <p className="text-2xl font-bold text-orange-600 mb-2">10-12 days</p>
                      <p className="text-gray-600 text-sm">Expedited with proper preparation</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                        <Clock className="h-8 w-8 text-green-600" />
                      </div>
                      <h4 className="font-semibold mb-2">Rush Service</h4>
                      <p className="text-2xl font-bold text-green-600 mb-2">5-7 days</p>
                      <p className="text-gray-600 text-sm">VIP package with express processing</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="countries-included">
            <AccordionTrigger className="text-left">
              <div className="flex items-center gap-3">
                <MapPin className="h-6 w-6 text-purple-600" />
                <span className="text-xl font-semibold">27 Countries Included</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {countries.map((country, index) => (
                      <Badge key={index} variant="outline" className="justify-center py-2">
                        {country}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="pricing-packages">
            <AccordionTrigger className="text-left">
              <div className="flex items-center gap-3">
                <DollarSign className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-semibold">Pricing & Service Packages</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid md:grid-cols-3 gap-6">
                {servicePrices.map((service, index) => (
                  <Card key={index} className={`relative ${service.popular ? 'ring-2 ring-blue-500' : ''}`}>
                    {service.popular && (
                      <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500">
                        Most Popular
                      </Badge>
                    )}
                    <CardHeader className="text-center">
                      <CardTitle className="text-xl">{service.name}</CardTitle>
                      <div className="text-3xl font-bold text-blue-600">{service.price}</div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full mt-4" variant={service.popular ? 'default' : 'outline'}>
                        Choose {service.name}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default SchengenVisaInfo;
