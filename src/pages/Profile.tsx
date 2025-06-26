
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Profile</h1>
          {user ? (
            <p className="text-xl text-gray-600">
              Welcome, {user.email}
            </p>
          ) : (
            <p className="text-xl text-gray-600">
              Please log in to view your profile
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
