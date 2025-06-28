
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, FileX, MapPin, HelpCircle, FileImage } from 'lucide-react';

const SchengenWarnings = () => {
  const denialReasons = [
    {
      icon: FileX,
      title: 'Missing Documents',
      description: 'Incomplete application packages are the #1 cause of visa rejection',
      examples: ['Bank statements older than 3 months', 'No travel insurance proof', 'Missing employment verification'],
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      icon: MapPin,
      title: 'Weak Travel Plans',
      description: 'Vague or unrealistic itineraries raise red flags with consular officers',
      examples: ['No hotel bookings', 'Unrealistic daily budgets', 'Missing return flight details'],
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      icon: HelpCircle,
      title: 'Unclear Purpose of Trip',
      description: 'Inability to clearly explain your visit reason leads to immediate rejection',
      examples: ['Conflicting statements', 'Business vs. tourism confusion', 'No supporting invitations'],
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      icon: FileImage,
      title: 'Poor Document Formatting',
      description: 'Even correct documents can be rejected due to poor presentation',
      examples: ['Blurry photos/scans', 'Wrong document sizes', 'Missing translations'],
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Being Unprepared Gets Your Visa Denied
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Don't let these common mistakes cost you time, money, and your dream trip
          </p>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 inline-block">
            <div className="text-red-800 font-semibold">
              <span className="text-3xl font-bold">23%</span> of Schengen visa applications are rejected annually
            </div>
            <div className="text-red-600 text-sm mt-1">That's nearly 1 in 4 applications!</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {denialReasons.map((reason, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-full ${reason.bgColor}`}>
                    <reason.icon className={`h-8 w-8 ${reason.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{reason.title}</h3>
                    <p className="text-gray-600 mb-4">{reason.description}</p>
                    <div className="space-y-2">
                      <div className="text-sm font-semibold text-gray-800">Common Examples:</div>
                      {reason.examples.map((example, exampleIndex) => (
                        <div key={exampleIndex} className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-gray-600">{example}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Statistics Section */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-center mb-8">The Cost of Rejection</h3>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">€80</div>
              <div className="text-gray-600">Lost visa fee (non-refundable)</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">30+ days</div>
              <div className="text-gray-600">Wasted time in reapplication</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">$2,000+</div>
              <div className="text-gray-600">Potential lost bookings</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8">
          <h3 className="text-3xl font-bold mb-4">Avoid Costly Mistakes</h3>
          <p className="text-xl mb-6 opacity-90">
            Let our visa experts handle your application with a 99% approval rate
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Get Expert Help Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Book Free Consultation
            </Button>
          </div>
          <div className="mt-6 text-sm opacity-80">
            ✓ 99% approval rate • ✓ Money-back guarantee • ✓ 24/7 support
          </div>
        </div>
      </div>
    </section>
  );
};

export default SchengenWarnings;
