
import React from 'react';
import { Shield, Star, Users, Award } from 'lucide-react';

const TrustBadges = () => {
  const badges = [
    {
      icon: Shield,
      title: 'Secure & Safe',
      description: 'Your data is protected with industry-standard security'
    },
    {
      icon: Star,
      title: '4.9/5 Rating',
      description: 'Trusted by thousands of satisfied travelers'
    },
    {
      icon: Users,
      title: '50,000+ Customers',
      description: 'Join our community of happy travelers'
    },
    {
      icon: Award,
      title: 'Award Winning',
      description: 'Recognized for excellence in travel services'
    }
  ];

  return (
    <section className="py-12 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-3">
                <badge.icon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{badge.title}</h3>
              <p className="text-sm text-gray-600">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
