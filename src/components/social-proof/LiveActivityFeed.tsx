import React, { useState, useEffect } from 'react';
import { Check, X, Clock, TrendingUp, Users, Globe } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useLocalization } from '@/components/localization/LocalizationProvider';

interface LiveActivity {
  id: string;
  type: 'visa_approved' | 'application_started' | 'consultation_booked' | 'payment_completed';
  user: string;
  country: string;
  destination: string;
  timestamp: Date;
  amount?: string;
}

const LiveActivityFeed = () => {
  const [activities, setActivities] = useState<LiveActivity[]>([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const context = useLocalization();

  // Simulate live activities
  useEffect(() => {
    const generateActivity = (): LiveActivity => {
      const types: LiveActivity['type'][] = ['visa_approved', 'application_started', 'consultation_booked', 'payment_completed'];
      const users = ['John D.', 'Sarah M.', 'Ahmed K.', 'Maria L.', 'David O.', 'Fatima A.', 'James R.', 'Aisha N.'];
      const countries = ['Nigeria', 'Kenya', 'Ghana', 'South Africa', 'India', 'Pakistan', 'Philippines'];
      const destinations = ['Germany', 'UK', 'France', 'Canada', 'USA', 'Netherlands', 'Denmark'];
      const amounts = ['$85', '$125', '$150', '$200', '₦45,000', '₦65,000', '₹8,500'];

      const type = types[Math.floor(Math.random() * types.length)];
      return {
        id: crypto.randomUUID(),
        type,
        user: users[Math.floor(Math.random() * users.length)],
        country: countries[Math.floor(Math.random() * countries.length)],
        destination: destinations[Math.floor(Math.random() * destinations.length)],
        timestamp: new Date(),
        amount: type === 'payment_completed' ? amounts[Math.floor(Math.random() * amounts.length)] : undefined
      };
    };

    // Initial activities
    const initialActivities = Array.from({ length: 8 }, generateActivity);
    setActivities(initialActivities);

    // Add new activities periodically
    const interval = setInterval(() => {
      setActivities(prev => {
        const newActivity = generateActivity();
        return [newActivity, ...prev.slice(0, 15)]; // Keep only last 15
      });
    }, 4000 + Math.random() * 6000); // Random interval between 4-10 seconds

    return () => clearInterval(interval);
  }, []);

  const getActivityIcon = (type: LiveActivity['type']) => {
    switch (type) {
      case 'visa_approved':
        return <Check className="h-4 w-4 text-green-600" />;
      case 'application_started':
        return <TrendingUp className="h-4 w-4 text-blue-600" />;
      case 'consultation_booked':
        return <Users className="h-4 w-4 text-purple-600" />;
      case 'payment_completed':
        return <Globe className="h-4 w-4 text-orange-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getActivityMessage = (activity: LiveActivity) => {
    const timeAgo = Math.floor((Date.now() - activity.timestamp.getTime()) / 1000);
    const timeText = timeAgo < 60 ? 'just now' : `${Math.floor(timeAgo / 60)}m ago`;

    switch (activity.type) {
      case 'visa_approved':
        return `${activity.user} from ${activity.country} got ${activity.destination} visa approved`;
      case 'application_started':
        return `${activity.user} started ${activity.destination} visa application`;
      case 'consultation_booked':
        return `${activity.user} booked consultation for ${activity.destination}`;
      case 'payment_completed':
        return `${activity.user} completed payment ${activity.amount} for ${activity.destination} visa`;
    }
  };

  const getActivityColor = (type: LiveActivity['type']) => {
    switch (type) {
      case 'visa_approved':
        return 'border-l-green-500 bg-green-50/50';
      case 'application_started':
        return 'border-l-blue-500 bg-blue-50/50';
      case 'consultation_booked':
        return 'border-l-purple-500 bg-purple-50/50';
      case 'payment_completed':
        return 'border-l-orange-500 bg-orange-50/50';
      default:
        return 'border-l-gray-500 bg-gray-50/50';
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
            <h3 className="text-2xl font-bold text-gray-900">Live Activity</h3>
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-lg text-gray-600">
            See what's happening right now across our platform
          </p>
        </div>

        <Card className="p-6 shadow-luxury bg-white/80 backdrop-blur-sm border-0">
          <div className="space-y-4">
            {activities.slice(0, visibleCount).map((activity, index) => (
              <div
                key={activity.id}
                className={cn(
                  "flex items-center space-x-4 p-4 rounded-lg border-l-4 transition-all duration-500",
                  getActivityColor(activity.type),
                  "animate-fade-in-up"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex-shrink-0">
                  {getActivityIcon(activity.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {getActivityMessage(activity)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {Math.floor((Date.now() - activity.timestamp.getTime()) / 1000) < 60 
                      ? 'just now' 
                      : `${Math.floor((Date.now() - activity.timestamp.getTime()) / 60000)}m ago`
                    }
                  </p>
                </div>

                <div className="flex-shrink-0">
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>

          {activities.length > visibleCount && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setVisibleCount(prev => Math.min(prev + 3, activities.length))}
                className="text-primary hover:text-primary/80 font-medium text-sm transition-colors"
              >
                Show more activity
              </button>
            </div>
          )}

          {/* Summary stats */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">
                  {activities.filter(a => a.type === 'visa_approved').length + 156}
                </div>
                <div className="text-xs text-gray-500">Visas This Week</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {context.visaSuccessRate}
                </div>
                <div className="text-xs text-gray-500">Success Rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {activities.filter(a => a.timestamp.getTime() > Date.now() - 3600000).length + 12}
                </div>
                <div className="text-xs text-gray-500">Active Now</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">24/7</div>
                <div className="text-xs text-gray-500">Support</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default LiveActivityFeed;