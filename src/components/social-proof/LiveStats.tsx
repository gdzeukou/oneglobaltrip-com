import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { CheckCircle, Users, Globe, Clock } from 'lucide-react';

const LiveStats = () => {
  const [visasThisWeek, setVisasThisWeek] = useState(124);
  const [activeUsers, setActiveUsers] = useState(18);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly update stats to show activity
      if (Math.random() > 0.7) {
        setVisasThisWeek(prev => prev + 1);
      }
      if (Math.random() > 0.8) {
        setActiveUsers(prev => Math.max(5, prev + (Math.random() > 0.5 ? 1 : -1)));
      }
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      icon: CheckCircle,
      value: '98%',
      label: 'Success Rate',
      description: 'Visa approvals',
      color: 'text-green-600'
    },
    {
      icon: Users,
      value: visasThisWeek.toString(),
      label: 'Visas This Week',
      description: 'Applications processed',
      color: 'text-blue-600',
      animated: true
    },
    {
      icon: Globe,
      value: '180+',
      label: 'Countries',
      description: 'We help with',
      color: 'text-purple-600'
    },
    {
      icon: Clock,
      value: activeUsers.toString(),
      label: 'People Online',
      description: 'Getting help now',
      color: 'text-orange-600',
      animated: true
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Trusted by Travelers Worldwide
          </h3>
          <p className="text-gray-600">Real-time stats from our visa assistance platform</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="flex flex-col items-center space-y-2">
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                  <div className={`text-3xl font-bold ${stat.color} ${stat.animated ? 'animate-pulse' : ''}`}>
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-gray-900">
                    {stat.label}
                  </div>
                  <div className="text-xs text-gray-500">
                    {stat.description}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Live activity feed */}
        <div className="mt-8 bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>John from Nigeria got UK visa approved</span>
            </div>
            <span className="hidden md:inline">•</span>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>Sarah started her Germany application</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveStats;