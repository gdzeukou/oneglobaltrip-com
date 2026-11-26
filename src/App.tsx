
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";

/** Old long-stay country links land on the long-stay page with the country picked. */
const LongStayCountryRedirect = () => {
  const { country = "" } = useParams();
  return <Navigate replace to={`/visas/${country.toLowerCase()}-long-stay`} />;
};
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
import Home from "./pages/site/Home";
import Visas from "./pages/site/Visas";
import VisaDetail from "./pages/site/VisaDetail";
import ScoutPass from "./pages/site/ScoutPass";
import Pricing from "./pages/site/Pricing";
import Start from "./pages/site/Start";
import Plan from "./pages/site/Plan";
import Trip from "./pages/site/Trip";
import VisaFile from "./pages/site/File";
import ThankYou from "./pages/site/ThankYou";
import Packages from "./pages/Packages";
import PackageDetails from "./pages/PackageDetails";
import Contact from "./pages/Contact";

// Lazy load other components to improve initial load time
import { lazy, Suspense } from 'react';

const Account = lazy(() => import("./pages/site/Account"));
const Profile = lazy(() => import("./pages/Profile"));
const TestEmailDelivery = lazy(() => import("./pages/TestEmailDelivery"));
const Admin = lazy(() => import("./pages/Admin"));
const Concierge = lazy(() => import("./pages/Concierge"));
const Booking = lazy(() => import("./pages/Booking"));
const Bookings = lazy(() => import("./pages/Bookings"));
const AIChat = lazy(() => import("./pages/AIChat"));
const IntelligentApplication = lazy(() => import("./pages/IntelligentApplication"));
const StartMyTrip = lazy(() => import("./pages/StartMyTrip"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const DataDeletion = lazy(() => import("./pages/DataDeletion"));

// Keep only essential visa pages for MVP

// Lazy load remaining pages
const ParisExplorePackage = lazy(() => import("./pages/packages/ParisExplorePackage"));
const TravelModule = lazy(() => import("./pages/ogt/TravelModule"));
const MyTrip = lazy(() => import("./pages/ogt/MyTrip"));
// Removed AIAgentCreatorGate and AgentCreator - simplified for MVP
const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/Blog"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const Settings = lazy(() => import("./pages/Settings"));
const DiscoverGlobal = lazy(() => import("./pages/discover/DiscoverGlobal"));
const DiscoverNearby = lazy(() => import("./pages/discover/DiscoverNearby"));
const Destination = lazy(() => import("./pages/Destination"));

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
                      <Route path="/" element={<Home />} />
                      <Route path="/home" element={<Navigate replace to="/" />} />
                      <Route path="/plan" element={<Plan />} />
                      <Route path="/trip" element={<Trip />} />
                      <Route path="/globe" element={<SimplifiedHome />} />
                      <Route path="/file" element={<VisaFile />} />
                      {/* Stripe returns here: paid, or cancelled before paying */}
                      <Route path="/thank-you" element={<ThankYou />} />
                      <Route path="/checkout" element={<Navigate replace to="/scoutpass?payment=cancelled" />} />
                      <Route path="/start" element={<Start />} />
                      <Route path="/scoutpass" element={<ScoutPass />} />
                      <Route path="/auth" element={<Auth />} />
                      <Route path="/auth/callback" element={<AuthCallback />} />
                      <Route path="/startmytrip" element={<StartMyTrip />} />
                      <Route path="/destination/:country" element={<Destination />} />
                      <Route path="/destination/:country/:city" element={<Destination />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/services" element={<Navigate replace to="/visas" />} />
                      <Route path="/testimonials" element={<Testimonials />} />
                      <Route path="/pricing" element={<Pricing />} />
                      
                      {/* Core Services */}
                      <Route path="/visas" element={<Visas />} />
                      <Route path="/packages" element={<Packages />} />
                      <Route path="/packages/:id" element={<PackageDetails />} />
                      <Route path="/packages/paris-explore" element={<ParisExplorePackage />} />
                      
                      {/* OGT super-app modules — visas stay on their existing routes, ScoutPass is a module inside OGT */}
                      <Route path="/flights" element={<TravelModule kind="flights" />} />
                      <Route path="/stays" element={<TravelModule kind="stays" />} />
                      <Route path="/cars" element={<TravelModule kind="cars" />} />
                      <Route path="/cruises" element={<TravelModule kind="cruises" />} />
                      <Route path="/activities" element={<TravelModule kind="activities" />} />
                      <Route path="/trips" element={<MyTrip />} />
                      
                      {/* Visas: one catalogue, one page per visa */}
                      <Route path="/visas/:slug" element={<VisaDetail />} />

                      {/* Old visa addresses, kept alive so existing links and search results still land somewhere */}
                      <Route path="/visas/short-stay" element={<Navigate replace to="/visas#short-stay" />} />
                      <Route path="/visas/long-stay" element={<Navigate replace to="/visas#long-stay" />} />
                      <Route path="/visas/long-stay/:country" element={<LongStayCountryRedirect />} />
                      <Route path="/visas/pricing" element={<Navigate replace to="/pricing" />} />
                      <Route path="/schengen-visa" element={<Navigate replace to="/visas/schengen" />} />
                      <Route path="/visas/short-stay/uk" element={<Navigate replace to="/visas/uk" />} />
                      <Route path="/visas/short-stay/:country" element={<Navigate replace to="/visas/schengen" />} />

                      {/* Legal Pages */}
                      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                      <Route path="/terms-conditions" element={<TermsAndConditions />} />
                      <Route path="/data-deletion" element={<DataDeletion />} />
                      
                      {/* Protected routes */}
                      <Route path="/dashboard" element={
                        <ProtectedRoute requireEmailVerification={false}>
                          <Account />
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
                      
                      {/* Discover/Social Routes */}
                      <Route path="/discover" element={
                        <ProtectedRoute requireEmailVerification={false}>
                          <DiscoverGlobal />
                        </ProtectedRoute>
                      } />
                      <Route path="/discover/global" element={
                        <ProtectedRoute requireEmailVerification={false}>
                          <DiscoverGlobal />
                        </ProtectedRoute>
                      } />
                      <Route path="/discover/nearby" element={
                        <ProtectedRoute requireEmailVerification={false}>
                          <DiscoverNearby />
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
                      {/* The admin console checks the admin role itself, with no development bypass */}
                      <Route path="/admin" element={<Admin />} />
                      <Route path="/admin-dashboard" element={<Navigate replace to="/admin" />} />
                      <Route path="/admin/*" element={<Navigate replace to="/admin" />} />
                      
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
