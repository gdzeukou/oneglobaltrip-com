import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Award, Users, Clock, CheckCircle, Star, Lock, Globe } from 'lucide-react';

interface TrustBadge {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  value?: string;
  verified?: boolean;
  color: string;
}

const trustBadges: TrustBadge[] = [
  {
    id: 'success-rate',
    icon: <CheckCircle className="h-8 w-8" />,
    title: '99.2% Success Rate',
    subtitle: 'Visa approvals',
    verified: true,
    color: 'text-green-600'
  },
  {
    id: 'customers',
    icon: <Users className="h-8 w-8" />,
    title: '15,000+',
    subtitle: 'Happy customers',
    value: 'Last 12 months',
    color: 'text-blue-600'
  },
  {
    id: 'processing',
    icon: <Clock className="h-8 w-8" />,
    title: '5.2 Days',
    subtitle: 'Average processing',
    value: 'Faster than embassy',
    verified: true,
    color: 'text-orange-600'
  },
  {
    id: 'security',
    icon: <Lock className="h-8 w-8" />,
    title: 'Bank-Level Security',
    subtitle: 'GDPR Compliant',
    verified: true,
    color: 'text-purple-600'
  },
  {
    id: 'rating',
    icon: <Star className="h-8 w-8" />,
    title: '4.9/5 Rating',
    subtitle: 'Customer satisfaction',
    value: '2,847 reviews',
    color: 'text-yellow-600'
  },
  {
    id: 'global',
    icon: <Globe className="h-8 w-8" />,
    title: '150+ Countries',
    subtitle: 'Visa services',
    value: 'Worldwide coverage',
    color: 'text-indigo-600'
  }
];

const certifications = [
  {
    name: 'McAfee Secure',
    badge: '🛡️',
    description: 'SSL Secured'
  },
  {
    name: 'GDPR Compliant',
    badge: '🇪🇺',
    description: 'Data Protection'
  },
  {
    name: 'ISO 27001',
    badge: '🏆',
    description: 'Security Standard'
  },
  {
    name: 'VFS Partner',
    badge: '🤝',
    description: 'Official Partner'
  },
  {
    name: 'IATA Verified',
    badge: '✈️',
    description: 'Travel Industry'
  },
  {
    name: '256-bit SSL',
    badge: '🔒',
    description: 'Encryption'
  }
];

interface EnhancedTrustBadgesProps {
  variant?: 'compact' | 'detailed' | 'minimal';
  showCertifications?: boolean;
  className?: string;
}

const EnhancedTrustBadges = ({ 
  variant = 'detailed', 
  showCertifications = true,
  className = '' 
}: EnhancedTrustBadgesProps) => {
  
  if (variant === 'minimal') {
    return (
      <div className={`flex flex-wrap justify-center gap-4 ${className}`}>
        {trustBadges.slice(0, 3).map((badge) => (
          <div key={badge.id} className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
            <div className={badge.color}>
              {badge.icon}
            </div>
            <div>
              <p className="font-bold text-sm">{badge.title}</p>
              <p className="text-xs text-gray-600">{badge.subtitle}</p>
            </div>
            {badge.verified && (
              <CheckCircle className="h-4 w-4 text-green-500" />
            )}
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 ${className}`}>
        {trustBadges.map((badge) => (
          <Card key={badge.id} className="bg-white border border-gray-100 hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <div className={`${badge.color} mb-2 flex justify-center`}>
                {badge.icon}
              </div>
              <h3 className="font-bold text-sm mb-1">{badge.title}</h3>
              <p className="text-xs text-gray-600">{badge.subtitle}</p>
              {badge.verified && (
                <Badge variant="secondary" className="mt-2 text-xs">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Main Trust Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trustBadges.map((badge) => (
          <Card key={badge.id} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0">
            <CardContent className="p-6 text-center">
              <div className={`${badge.color} mb-4 flex justify-center`}>
                {badge.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{badge.title}</h3>
              <p className="text-gray-600 mb-2">{badge.subtitle}</p>
              
              {badge.value && (
                <p className="text-sm text-gray-500">{badge.value}</p>
              )}
              
              {badge.verified && (
                <div className="flex items-center justify-center mt-4">
                  <Badge variant="secondary" className="bg-green-50 text-green-700 border border-green-200">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Certifications */}
      {showCertifications && (
        <div className="bg-gray-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Security & Certifications
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-2xl mb-2">{cert.badge}</div>
                <h4 className="font-medium text-sm text-gray-900 mb-1">{cert.name}</h4>
                <p className="text-xs text-gray-600">{cert.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Your data is protected with enterprise-grade security measures
            </p>
          </div>
        </div>
      )}

      {/* Real-time Trust Indicators */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-6">
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-sm font-medium text-gray-700">
              12 visas approved in the last hour
            </p>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <p className="text-sm font-medium text-gray-700">
              24/7 expert support online
            </p>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
            <p className="text-sm font-medium text-gray-700">
              Average response time: 2 minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedTrustBadges;