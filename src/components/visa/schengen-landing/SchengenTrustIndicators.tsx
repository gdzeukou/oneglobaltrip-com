
import { useState, useEffect, useRef } from 'react';
import { CheckCircle, Clock, Shield, Users } from 'lucide-react';

const trustMetrics = [
  {
    id: 1,
    icon: CheckCircle,
    value: 97,
    suffix: '%',
    title: 'Approval-Ready Applications',
    description: 'Success rate with our expert review'
  },
  {
    id: 2,
    icon: Clock,
    value: 2,
    suffix: ' min',
    title: 'Avg Biometrics Time',
    description: 'Fastest appointment processing'
  },
  {
    id: 3,
    icon: Shield,
    value: 24,
    suffix: '/7',
    title: 'AI & Human Support',
    description: 'Round-the-clock assistance'
  },
  {
    id: 4,
    icon: Users,
    value: 15000,
    suffix: '+',
    title: 'Secure GDPR-Compliant Portal',
    description: 'Customers trust our platform'
  }
];

const partnerLogos = [
  { name: 'VFS Global', logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=120&h=60&fit=crop&crop=center' },
  { name: 'Thales', logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=120&h=60&fit=crop&crop=center' },
  { name: 'RushMyPassport', logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=120&h=60&fit=crop&crop=center' },
  { name: 'Europe Express', logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=120&h=60&fit=crop&crop=center' },
  { name: 'Stripe', logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=120&h=60&fit=crop&crop=center' },
  { name: 'VisaHQ', logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=120&h=60&fit=crop&crop=center' }
];

const AnimatedCounter = ({ value, suffix, duration = 2000 }: { value: number; suffix: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      const increment = value / (duration / 16);
      const timer = setInterval(() => {
        setCount(prev => {
          const next = prev + increment;
          if (next >= value) {
            clearInterval(timer);
            return value;
          }
          return next;
        });
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isVisible, value, duration]);

  return (
    <div ref={elementRef} className="text-3xl font-bold text-blue-600">
      {Math.floor(count)}{suffix}
    </div>
  );
};

const SchengenTrustIndicators = () => {
  return (
    <div className="py-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Thousands Choose OGT
          </h2>
          <p className="text-xl text-gray-600">
            Trusted by travelers worldwide for visa success
          </p>
        </div>

        {/* Trust Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {trustMetrics.map((metric) => (
            <div key={metric.id} className="text-center">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <metric.icon className="w-8 h-8 text-blue-600" />
                </div>
                <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                <h3 className="text-lg font-semibold text-gray-900 mt-2 mb-1">
                  {metric.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {metric.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Partner Logos */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Trusted Partners & Certifications
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {partnerLogos.map((partner, index) => (
              <div key={index} className="flex items-center justify-center">
                <div className="w-24 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600 text-center">
                    {partner.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Badges */}
        <div className="flex justify-center space-x-8 mt-8">
          <div className="flex items-center space-x-2 bg-white rounded-lg px-4 py-2 shadow-md">
            <Shield className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-700">GDPR Compliant</span>
          </div>
          <div className="flex items-center space-x-2 bg-white rounded-lg px-4 py-2 shadow-md">
            <Shield className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">McAfee Secure</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchengenTrustIndicators;
