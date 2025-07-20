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

// Lazy load other components to improve initial load time
import { lazy, Suspense } from 'react';

// Load critical pages immediately to fix "pages down" issue
import Visas from "./pages/Visas";
import Packages from "./pages/Packages";
import PackageDetails from "./pages/PackageDetails";
import Contact from "./pages/Contact";
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
const ShortStayVisas = lazy(() => import("./pages/ShortStayVisas"));
const IntelligentApplication = lazy(() => import("./pages/IntelligentApplication"));
const StartMyTrip = lazy(() => import("./pages/StartMyTrip"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const DataDeletion = lazy(() => import("./pages/DataDeletion"));

// Lazy load visa country pages
const SchengenShortStay = lazy(() => import("./pages/visa-countries/SchengenShortStay"));
const SchengenShortStayApply = lazy(() => import("./pages/visa-countries/SchengenShortStayApply"));
const SchengenShortStayLanding = lazy(() => import("./pages/visa-countries/SchengenShortStayLanding"));
const FranceShortStay = lazy(() => import("./pages/visa-countries/FranceShortStay"));
const GermanyShortStay = lazy(() => import("./pages/visa-countries/GermanyShortStay"));
const ItalyShortStay = lazy(() => import("./pages/visa-countries/ItalyShortStay"));
const NetherlandsShortStay = lazy(() => import("./pages/visa-countries/NetherlandsShortStay"));
const DenmarkShortStay = lazy(() => import("./pages/visa-countries/DenmarkShortStay"));
const SwedenShortStay = lazy(() => import("./pages/visa-countries/SwedenShortStay"));
const GreeceShortStay = lazy(() => import("./pages/visa-countries/GreeceShortStay"));
const UKShortStay = lazy(() => import("./pages/visa-countries/UKShortStay"));
const UK5YearShortStay = lazy(() => import("./pages/visa-countries/UK5YearShortStay"));
const UAEShortStay = lazy(() => import("./pages/visa-countries/UAEShortStay"));
const CanadaShortStay = lazy(() => import("./pages/visa-countries/CanadaShortStay"));
const IndiaShortStay = lazy(() => import("./pages/visa-countries/IndiaShortStay"));
const BrazilShortStay = lazy(() => import("./pages/visa-countries/BrazilShortStay"));
const NigeriaShortStay = lazy(() => import("./pages/visa-countries/NigeriaShortStay"));

// Lazy load long stay visa pages
const FranceLongStay = lazy(() => import("./pages/visa-countries/FranceLongStay"));
const GermanyLongStay = lazy(() => import("./pages/visa-countries/GermanyLongStay"));
const DenmarkLongStay = lazy(() => import("./pages/visa-countries/DenmarkLongStay"));
const FinlandLongStay = lazy(() => import("./pages/visa-countries/FinlandLongStay"));
const PortugalLongStay = lazy(() => import("./pages/visa-countries/PortugalLongStay"));
const SwitzerlandLongStay = lazy(() => import("./pages/visa-countries/SwitzerlandLongStay"));
const NorwayLongStay = lazy(() => import("./pages/visa-countries/NorwayLongStay"));
const NigeriaLongStay = lazy(() => import("./pages/visa-countries/NigeriaLongStay"));

// Lazy load remaining pages
const ParisExplorePackage = lazy(() => import("./pages/packages/ParisExplorePackage"));
const VisaPricingPage = lazy(() => import("./pages/visas/VisaPricingPage"));
const AIAgentCreatorGate = lazy(() => import("./components/auth/AIAgentCreatorGate"));
const AgentCreator = lazy(() => import("./pages/AgentCreator"));
const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/Blog"));
const Services = lazy(() => import("./pages/Services"));
const Testimonials = lazy(() => import("./pages/Testimonials"));

import "./App.css";
import AgentProtectedRoute from "./components/auth/AgentProtectedRoute";
import LoadingBoundary from "./components/LoadingBoundary";
// import SessionTracker from "./components/SessionTracker"; // Temporarily disabled

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
                {/* <SessionTracker /> Temporarily disabled for performance */}
                <BrowserRouter>
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
                  <Route path="/pricing" element={<Pricing />} />
                  
                  {/* Core Services - Keep Essential Only */}
                  <Route path="/visas" element={<Visas />} />
                  <Route path="/packages" element={<Packages />} />
                  <Route path="/packages/:id" element={<PackageDetails />} />
                  
                  {/* Essential Visa Routes - Keep Top 5 Only */}
                  <Route path="/visas/short-stay/schengen" element={<SchengenShortStay />} />
                  <Route path="/schengen-visa" element={<SchengenShortStayLanding />} />
                  <Route path="/visas/short-stay/uk" element={<UKShortStay />} />
                  <Route path="/visas/short-stay/canada" element={<CanadaShortStay />} />
                  <Route path="/visas/short-stay/uae" element={<UAEShortStay />} />
                  
                  {/* Legal Pages */}
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-conditions" element={<TermsAndConditions />} />
                  
                  {/* Protected routes - Simplified */}
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
                      <AIChat />
                    </ProtectedRoute>
                  } />
                  <Route path="/bookings" element={
                    <ProtectedRoute requireEmailVerification={false}>
                      <Bookings />
                    </ProtectedRoute>
                  } />
                  
                  {/* Admin routes */}
                  <Route path="/admin" element={
                    <ProtectedRoute>
                      <Admin />
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
