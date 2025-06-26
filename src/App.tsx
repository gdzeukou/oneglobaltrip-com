
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { queryClient } from '@/integrations/reactQuery';
import Home from '@/pages/Home';
import Pricing from '@/pages/Pricing';
import Contact from '@/pages/Contact';
import Dashboard from '@/pages/Dashboard';
import Auth from '@/pages/Auth';
import { AuthProvider } from '@/contexts/AuthContext';
import VisaPricingPage from '@/pages/visas/VisaPricingPage';
import NotFound from '@/pages/NotFound';
import ErrorPage from '@/pages/ErrorPage';
import Bookings from '@/pages/Bookings';
import Profile from '@/pages/Profile';
import Admin from '@/pages/Admin';
import AuthCallback from '@/pages/AuthCallback';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <ErrorBoundary fallback={<ErrorPage />}>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/visas/:visaType" element={<VisaPricingPage />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </QueryClientProvider>  
        </ErrorBoundary>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
