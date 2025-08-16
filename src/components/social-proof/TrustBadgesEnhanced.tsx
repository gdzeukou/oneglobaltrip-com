import React from 'react';
import { Card } from '@/components/ui/card';
import { Shield, Award, Star, Clock, Lock, CheckCircle } from 'lucide-react';

const TrustBadgesEnhanced = () => {
  const badges = [
    {
      icon: Shield,
      title: 'Embassy Verified',
      description: 'Direct partnerships with consulates',
      color: 'text-blue-600 bg-blue-50'
    },
    {
      icon: Award,
      title: '98% Success Rate',
      description: 'Industry-leading approval rate',
      color: 'text-green-600 bg-green-50'
    },
    {
      icon: Star,
      title: '4.9/5 Rating',
      description: 'From 10,000+ happy travelers',
      color: 'text-yellow-600 bg-yellow-50'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock assistance',
      color: 'text-purple-600 bg-purple-50'
    },
    {
      icon: Lock,
      title: 'Secure & Private',
      description: 'Bank-level data encryption',
      color: 'text-gray-600 bg-gray-50'
    },
    {
      icon: CheckCircle,
      title: 'Money-Back Guarantee',
      description: 'Full refund if visa denied',
      color: 'text-emerald-600 bg-emerald-50'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Why 50,000+ Travelers Choose Us
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We've built the most trusted visa assistance platform with AI-powered guidance and human expertise
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${badge.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {badge.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {badge.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Partnership logos */}
        <div className="mt-12 pt-8 border-t">
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500 font-medium">TRUSTED BY EMBASSIES & CONSULATES</p>
          </div>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <div className="text-lg font-bold text-gray-400">🇩🇪 German Embassy</div>
            <div className="text-lg font-bold text-gray-400">🇬🇧 UK Consulate</div>
            <div className="text-lg font-bold text-gray-400">🇫🇷 French Embassy</div>
            <div className="text-lg font-bold text-gray-400">🇪🇺 EU Partners</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBadgesEnhanced;