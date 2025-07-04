import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Users, Clock, MapPin } from 'lucide-react';

interface Notification {
  id: string;
  type: 'approval' | 'booking' | 'consultation';
  message: string;
  location: string;
  timeAgo: string;
  flag?: string;
  urgency?: 'low' | 'medium' | 'high';
}

const notificationTemplates = [
  {
    type: 'approval' as const,
    messages: [
      'Sarah from New York just got her Schengen visa approved! ✅',
      'Ahmed from Dubai received his Canada visa approval! 🎉',
      'Priya from Mumbai got approved for UK business visa! 🇬🇧',
      'Chen from Beijing just got his US tourist visa! 🇺🇸',
      'Sophie from Paris received her Australia work visa! 🇦🇺',
      'James from London got his Schengen business visa approved! ⭐'
    ],
    locations: ['New York', 'Dubai', 'Mumbai', 'Beijing', 'Paris', 'London'],
    flags: ['🇺🇸', '🇦🇪', '🇮🇳', '🇨🇳', '🇫🇷', '🇬🇧']
  },
  {
    type: 'booking' as const,
    messages: [
      'Maria just booked a premium visa package! 💼',
      'David secured an urgent visa processing slot! ⚡',
      'Lisa booked a family visa consultation! 👨‍👩‍👧‍👦',
      'Alex reserved a business visa package! 🏢',
      'Emma just started her visa application! 📄',
      'Michael booked express document review! 🚀'
    ],
    locations: ['London', 'Sydney', 'Toronto', 'Singapore', 'Berlin', 'Tokyo'],
    flags: ['🇬🇧', '🇦🇺', '🇨🇦', '🇸🇬', '🇩🇪', '🇯🇵']
  },
  {
    type: 'consultation' as const,
    messages: [
      'Anna just scheduled a free consultation! 📞',
      'Robert booked an expert visa review! 👨‍💼',
      'Nina reserved a travel planning session! ✈️',
      'Carlos scheduled urgent visa consultation! 🚨',
      'Yuki booked a document preparation call! 📋',
      'Omar reserved premium consultation slot! ⭐'
    ],
    locations: ['Madrid', 'São Paulo', 'Seoul', 'Cairo', 'Stockholm', 'Melbourne'],
    flags: ['🇪🇸', '🇧🇷', '🇰🇷', '🇪🇬', '🇸🇪', '🇦🇺']
  }
];

const RealtimeNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  const generateRandomNotification = (): Notification => {
    const template = notificationTemplates[Math.floor(Math.random() * notificationTemplates.length)];
    const messageIndex = Math.floor(Math.random() * template.messages.length);
    
    const timeVariations = ['2 minutes ago', '5 minutes ago', '8 minutes ago', '12 minutes ago', '15 minutes ago'];
    
    return {
      id: Date.now().toString() + Math.random(),
      type: template.type,
      message: template.messages[messageIndex],
      location: template.locations[messageIndex],
      timeAgo: timeVariations[Math.floor(Math.random() * timeVariations.length)],
      flag: template.flags[messageIndex],
      urgency: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low'
    };
  };

  useEffect(() => {
    // Initial notifications
    const initialNotifications = Array.from({ length: 3 }, generateRandomNotification);
    setNotifications(initialNotifications);

    // Add new notifications periodically
    const interval = setInterval(() => {
      const newNotification = generateRandomNotification();
      setNotifications(prev => [newNotification, ...prev.slice(0, 4)]); // Keep only 5 notifications
    }, 8000 + Math.random() * 12000); // Random interval between 8-20 seconds

    return () => clearInterval(interval);
  }, []);

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'approval':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'booking':
        return <Users className="h-4 w-4 text-blue-600" />;
      case 'consultation':
        return <Clock className="h-4 w-4 text-orange-600" />;
      default:
        return <MapPin className="h-4 w-4 text-gray-600" />;
    }
  };

  const getUrgencyBadge = (urgency?: string) => {
    if (!urgency || urgency === 'low') return null;
    
    return (
      <Badge 
        variant={urgency === 'high' ? 'destructive' : 'secondary'}
        className="text-xs"
      >
        {urgency === 'high' ? 'Urgent' : 'Popular'}
      </Badge>
    );
  };

  if (!isVisible || notifications.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 space-y-3 max-w-sm">
      {notifications.slice(0, 3).map((notification, index) => (
        <Card 
          key={notification.id}
          className={`bg-white shadow-lg border-l-4 transition-all duration-500 transform hover:scale-105 ${
            notification.type === 'approval' ? 'border-l-green-500' :
            notification.type === 'booking' ? 'border-l-blue-500' : 'border-l-orange-500'
          } ${index === 0 ? 'animate-slide-in-left' : ''}`}
          style={{
            animationDelay: `${index * 0.2}s`,
            opacity: 1 - (index * 0.2)
          }}
        >
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                {getNotificationIcon(notification.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {notification.flag && (
                      <span className="text-lg">{notification.flag}</span>
                    )}
                    {getUrgencyBadge(notification.urgency)}
                  </div>
                  <button
                    onClick={() => setIsVisible(false)}
                    className="text-gray-400 hover:text-gray-600 text-xs"
                  >
                    ✕
                  </button>
                </div>
                
                <p className="text-sm text-gray-800 font-medium leading-tight">
                  {notification.message}
                </p>
                
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500 flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {notification.location}
                  </span>
                  <span className="text-xs text-gray-400">
                    {notification.timeAgo}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {/* Toggle Button */}
      {!isVisible && (
        <button
          onClick={() => setIsVisible(true)}
          className="fixed bottom-6 left-6 bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700 transition-colors z-50"
        >
          <Users className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default RealtimeNotifications;