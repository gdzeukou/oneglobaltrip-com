
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// Lazy load components for better performance
const Index = lazy(() => import("./pages/Index"));
const Auth = lazy(() => import("./pages/Auth"));
const AuthCallback = lazy(() => import("./pages/AuthCallback"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const Bookings = lazy(() => import("./pages/Bookings"));
const Booking = lazy(() => import("./pages/Booking"));
const Concierge = lazy(() => import("./pages/Concierge"));
const Admin = lazy(() => import("./pages/Admin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

const queryClient = new QueryClient();

const LoadingSpinner = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
  </div>
);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <AuthProvider>
            <ErrorBoundary>
              <div className="min-h-screen bg-white flex flex-col">
                <Navigation />
                <main className="flex-1">
                  <Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/auth" element={<Auth />} />
                      <Route path="/auth/callback" element={<AuthCallback />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/bookings" element={<Bookings />} />
                      <Route path="/booking" element={<Booking />} />
                      <Route path="/concierge" element={<Concierge />} />
                      <Route path="/admin" element={<Admin />} />
                      <Route path="/admin-dashboard" element={<AdminDashboard />} />
                    </Routes>
                  </Suspense>
                </main>
                <Footer />
              </div>
            </ErrorBoundary>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
