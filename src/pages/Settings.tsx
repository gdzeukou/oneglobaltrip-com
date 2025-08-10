import React from 'react';
import SimplifiedNavigation from '@/components/SimplifiedNavigation';
import Footer from '@/components/Footer';
import MySettings from '@/components/dashboard/MySettings';

const SettingsPage: React.FC = () => {
  React.useEffect(() => {
    document.title = 'AI Agent Settings | OneGlobalTrip';
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <SimplifiedNavigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <MySettings />
      </div>
      <Footer />
    </div>
  );
};

export default SettingsPage;
