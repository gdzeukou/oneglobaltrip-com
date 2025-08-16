
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from '@/contexts/AuthContext';
import { AuthGuard } from '@/components/auth/AuthGuard';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import ErrorBoundary from '@/components/ErrorBoundary';

// Lazy imports for better performance - CRITICAL components loaded immediately
import Index from "./pages/Index";
import SimplifiedHome from "./pages/SimplifiedHome";
import Auth from "./pages/Auth";
import AuthCallback from "./pages/AuthCallback";
import NotFound from "./pages/NotFound";
import ErrorPage from "./pages/ErrorPage";

// Load critical pages immediately to fix "pages down" issue
import Visas from "./pages/Visas";
import Packages from "./pages/Packages";
import PackageDetails from "./pages/PackageDetails";
import Contact from "./pages/Contact";
import ShortStayVisas from "./pages/ShortStayVisas";

// Lazy load other components to improve initial load time
import { lazy, Suspense } from 'react';

const SimplifiedDashboard = lazy(() => import("./pages/SimplifiedDashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const TestEmailDelivery = lazy(() => import("./pages/TestEmailDelivery"));
const Admin = lazy(() => import("./pages/Admin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Concierge = lazy(() => import("./pages/Concierge"));
const Booking = lazy(() => import("./pages/Booking"));
const Bookings = lazy(() => import("./pages/Bookings"));
const AIChat = lazy(() => import("./pages/AIChat"));
const LongStayVisas = lazy(() => import("./pages/LongStayVisas"));
const IntelligentApplication = lazy(() => import("./pages/IntelligentApplication"));
const StartMyTrip = lazy(() => import("./pages/StartMyTrip"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const DataDeletion = lazy(() => import("./pages/DataDeletion"));

// Keep only essential visa pages for MVP
const SchengenShortStayLanding = lazy(() => import("./pages/visa-countries/SchengenShortStayLanding"));
const GermanyShortStay = lazy(() => import("./pages/visa-countries/GermanyShortStay"));
const DenmarkShortStay = lazy(() => import("./pages/visa-countries/DenmarkShortStay"));
const SwedenShortStay = lazy(() => import("./pages/visa-countries/SwedenShortStay"));
const UKShortStay = lazy(() => import("./pages/visa-countries/UKShortStay"));

// Lazy load remaining pages
const ParisExplorePackage = lazy(() => import("./pages/packages/ParisExplorePackage"));
const VisaPricingPage = lazy(() => import("./pages/visas/VisaPricingPage"));
// Removed AIAgentCreatorGate and AgentCreator - simplified for MVP
const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/Blog"));
const Services = lazy(() => import("./pages/Services"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const Settings = lazy(() => import("./pages/Settings"));

import "./App.css";
import AgentProtectedRoute from "./components/auth/AgentProtectedRoute";
import LoadingBoundary from "./components/LoadingBoundary";
import GlobalChatWidget from "./components/ai/GlobalChatWidget";

const queryClient = new QueryClient();

function App() {
  return (
    <ErrorBoundary>
      <LoadingBoundary>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <AuthProvider>
              <AuthGuard>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <GlobalChatWidget />
                  <Suspense fallback={
                    <div className="min-h-screen flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                  }>
                    <Routes>
                      {/* Public routes - Core MVP */}
                      <Route path="/" element={<SimplifiedHome />} />
                      <Route path="/home" element={<SimplifiedHome />} />
                      <Route path="/auth" element={<Auth />} />
                      <Route path="/auth/callback" element={<AuthCallback />} />
                      <Route path="/startmytrip" element={<StartMyTrip />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/testimonials" element={<Testimonials />} />
                      <Route path="/pricing" element={<Pricing />} />
                      
                      {/* Core Services */}
                      <Route path="/visas" element={<Visas />} />
                      <Route path="/packages" element={<Packages />} />
                      <Route path="/packages/:id" element={<PackageDetails />} />
                      <Route path="/packages/paris-explore" element={<ParisExplorePackage />} />
                      
                      {/* Visa Category Pages */}
                      <Route path="/visas/short-stay" element={<ShortStayVisas />} />
                      <Route path="/visas/long-stay" element={<LongStayVisas />} />
                      <Route path="/visas/pricing" element={<VisaPricingPage />} />
                      
                       {/* Essential Visa Pages for MVP */}
                       <Route path="/schengen-visa" element={<SchengenShortStayLanding />} />
                       <Route path="/visas/short-stay/germany" element={<GermanyShortStay />} />
                       <Route path="/visas/short-stay/denmark" element={<DenmarkShortStay />} />
                       <Route path="/visas/short-stay/sweden" element={<SwedenShortStay />} />
                       <Route path="/visas/short-stay/uk" element={<UKShortStay />} />
                       
                       {/* Dynamic visa route - Future implementation */}
                       {/* <Route path="/visa/:country" element={<DynamicVisaPage />} /> */}
                      
                      {/* Legal Pages */}
                      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                      <Route path="/terms-conditions" element={<TermsAndConditions />} />
                      <Route path="/data-deletion" element={<DataDeletion />} />
                      
                      {/* Protected routes */}
                      <Route path="/dashboard" element={
                        <ProtectedRoute requireEmailVerification={false}>
                          <SimplifiedDashboard />
                        </ProtectedRoute>
                      } />
                      <Route path="/profile" element={
                        <ProtectedRoute requireEmailVerification={false}>
                          <Profile />
                        </ProtectedRoute>
                      } />
                      <Route path="/ai-chat" element={
                        <ProtectedRoute requireEmailVerification={false}>
                          <AgentProtectedRoute>
                            <AIChat />
                          </AgentProtectedRoute>
                        </ProtectedRoute>
                      } />
                      <Route path="/bookings" element={
                        <ProtectedRoute requireEmailVerification={false}>
                          <Bookings />
                        </ProtectedRoute>
                      } />
                      <Route path="/booking" element={
                        <ProtectedRoute requireEmailVerification={false}>
                          <Booking />
                        </ProtectedRoute>
                      } />
                      <Route path="/concierge" element={
                        <ProtectedRoute requireEmailVerification={false}>
                          <Concierge />
                        </ProtectedRoute>
                      } />
                      <Route path="/settings" element={
                        <ProtectedRoute requireEmailVerification={false}>
                          <Settings />
                        </ProtectedRoute>
                      } />
                      
                      {/* Intelligent Application */}
                      <Route path="/intelligent-application" element={
                        <ProtectedRoute requireEmailVerification={false}>
                          <IntelligentApplication />
                        </ProtectedRoute>
                      } />
                      
                       {/* Agent Creator routes removed for MVP simplification */}
                      
                      {/* Admin routes */}
                      <Route path="/admin" element={
                        <ProtectedRoute>
                          <Admin />
                        </ProtectedRoute>
                      } />
                      <Route path="/admin-dashboard" element={
                        <ProtectedRoute>
                          <AdminDashboard />
                        </ProtectedRoute>
                      } />
                      
                      {/* Test routes (development) */}
                      <Route path="/test-email" element={
                        <ProtectedRoute>
                          <TestEmailDelivery />
                        </ProtectedRoute>
                      } />

                      {/* Error routes */}
                      <Route path="/error" element={<ErrorPage />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </BrowserRouter>
              </AuthGuard>
            </AuthProvider>
          </TooltipProvider>
        </QueryClientProvider>
      </LoadingBoundary>
    </ErrorBoundary>
  );
}

export default App;
