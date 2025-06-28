
import { FileText, Calendar, Plane, CheckCircle, Shield, Clock } from 'lucide-react';

const processSteps = [
  {
    id: 1,
    icon: FileText,
    title: 'Create Account & Upload Docs',
    description: 'AI Visa Officer verifies files with 99% accuracy',
    features: [
      'Instant document verification',
      'AI-powered accuracy check',
      'Secure encrypted storage',
      'Real-time feedback'
    ]
  },
  {
    id: 2,
    icon: Calendar,
    title: 'We Book Your Appointment',
    description: 'Priority scheduling at VFS/BLS/TLS centers',
    features: [
      'Priority appointment slots',
      'Multiple location options',
      'Flexible scheduling',
      'Automatic confirmations'
    ]
  },
  {
    id: 3,
    icon: Plane,
    title: 'Travel With Confidence',
    description: 'Real-time tracking plus full trip planning',
    features: [
      'Live application tracking',
      'Expert trip planning',
      '24/7 customer support',
      'Travel insurance included'
    ]
  }
];

const SchengenProcessSteps = () => {
  return (
    <div className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How to Get Your Visa with One Global Trip
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our streamlined 3-step process makes getting your Schengen visa simple and stress-free
          </p>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8">
          {processSteps.map((step, index) => (
            <div key={step.id} className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                    {step.id}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {step.description}
                  </p>
                </div>
                
                <div className="space-y-3">
                  {step.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Connector Arrow */}
              {index < processSteps.length - 1 && (
                <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-white rotate-90"></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Layout - Horizontal Scroll */}
        <div className="lg:hidden">
          <div className="flex space-x-6 overflow-x-auto pb-4">
            {processSteps.map((step) => (
              <div key={step.id} className="flex-shrink-0 w-80">
                <div className="bg-white rounded-2xl p-6 shadow-lg h-full">
                  <div className="text-center mb-4">
                    <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <step.icon className="w-7 h-7 text-blue-600" />
                    </div>
                    <div className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                      {step.id}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {step.description}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    {step.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-xs text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Elements */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h4 className="font-semibold text-gray-900">Secure & Confidential</h4>
            <p className="text-sm text-gray-600">Bank-level encryption for all documents</p>
          </div>
          <div className="text-center">
            <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h4 className="font-semibold text-gray-900">Fast Processing</h4>
            <p className="text-sm text-gray-600">Average 7-10 days faster than DIY</p>
          </div>
          <div className="text-center">
            <CheckCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h4 className="font-semibold text-gray-900">97% Success Rate</h4>
            <p className="text-sm text-gray-600">Highest approval rate in the industry</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchengenProcessSteps;
