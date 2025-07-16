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
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import AuthCallback from "./pages/AuthCallback";
import NotFound from "./pages/NotFound";
import ErrorPage from "./pages/ErrorPage";

// Lazy load other components to improve initial load time
import { lazy, Suspense } from 'react';

const Visas = lazy(() => import("./pages/Visas"));
const Packages = lazy(() => import("./pages/Packages"));
const PackageDetails = lazy(() => import("./pages/PackageDetails"));
const Contact = lazy(() => import("./pages/Contact"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
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
import SessionTracker from "./components/SessionTracker";

const queryClient = new QueryClient();

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <AuthGuard>
              <Toaster />
              <Sonner />
              <SessionTracker />
              <BrowserRouter>
              <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              }>
                <Routes>
                  {/* Public routes - immediately loaded */}
                  <Route path="/" element={<Index />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/auth/callback" element={<AuthCallback />} />
                  
                  {/* Lazy loaded routes */}
                  <Route path="/visas" element={<Visas />} />
                  <Route path="/packages" element={<Packages />} />
                  <Route path="/packages/:id" element={<PackageDetails />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/concierge" element={<Concierge />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/testimonials" element={<Testimonials />} />
                  <Route path="/visas/long-stay" element={<LongStayVisas />} />
                  <Route path="/visas/short-stay" element={<ShortStayVisas />} />
                  <Route path="/intelligent-application" element={<IntelligentApplication />} />
                  <Route path="/startmytrip" element={<StartMyTrip />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-conditions" element={<TermsAndConditions />} />
                  <Route path="/data-deletion" element={<DataDeletion />} />
                
                {/* AI Agent Auth Gate - shown to unauthenticated users trying to access AI agent */}
                <Route path="/ai-agent-auth" element={<AIAgentCreatorGate />} />
                
                {/* Agent Creation - for authenticated users without an agent */}
                <Route path="/agent/new" element={<AgentCreator />} />
                
                {/* Visa country routes */}
                <Route path="/visas/short-stay/schengen" element={<SchengenShortStay />} />
                <Route path="/visas/short-stay/schengen/apply" element={<SchengenShortStayApply />} />
                <Route path="/schengen-visa" element={<SchengenShortStayLanding />} />
                <Route path="/visas/short-stay/france" element={<FranceShortStay />} />
                <Route path="/visas/short-stay/germany" element={<GermanyShortStay />} />
                <Route path="/visas/short-stay/italy" element={<ItalyShortStay />} />
                <Route path="/visas/short-stay/netherlands" element={<NetherlandsShortStay />} />
                <Route path="/visas/short-stay/denmark" element={<DenmarkShortStay />} />
                <Route path="/visas/short-stay/sweden" element={<SwedenShortStay />} />
                <Route path="/visas/short-stay/greece" element={<GreeceShortStay />} />
                <Route path="/visas/short-stay/uk" element={<UKShortStay />} />
                <Route path="/visas/short-stay/uk-5-year" element={<UK5YearShortStay />} />
                <Route path="/visas/short-stay/uae" element={<UAEShortStay />} />
                <Route path="/visas/short-stay/canada" element={<CanadaShortStay />} />
                <Route path="/visas/short-stay/india" element={<IndiaShortStay />} />
                <Route path="/visas/short-stay/brazil" element={<BrazilShortStay />} />
                <Route path="/visas/short-stay/nigeria" element={<NigeriaShortStay />} />
                
                {/* Long stay visa routes */}
                <Route path="/visas/long-stay/france" element={<FranceLongStay />} />
                <Route path="/visas/long-stay/germany" element={<GermanyLongStay />} />
                <Route path="/visas/long-stay/denmark" element={<DenmarkLongStay />} />
                <Route path="/visas/long-stay/finland" element={<FinlandLongStay />} />
                <Route path="/visas/long-stay/portugal" element={<PortugalLongStay />} />
                <Route path="/visas/long-stay/switzerland" element={<SwitzerlandLongStay />} />
                <Route path="/visas/long-stay/norway" element={<NorwayLongStay />} />
                <Route path="/visas/long-stay/nigeria" element={<NigeriaLongStay />} />
                
                {/* Package specific routes */}
                <Route path="/package/paris-explore" element={<ParisExplorePackage />} />
                
                {/* Pricing routes */}
                <Route path="/visas/pricing" element={<VisaPricingPage />} />
                <Route path="/visa-pricing" element={<VisaPricingPage />} />
                
                {/* Testing routes */}
                <Route path="/test-email" element={<TestEmailDelivery />} />

                {/* Protected routes requiring authentication only */}
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="/booking" element={
                  <ProtectedRoute>
                    <Booking />
                  </ProtectedRoute>
                } />
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
                
                {/* Protected routes requiring AI agent setup */}
                <Route path="/dashboard" element={
                  <AgentProtectedRoute>
                    <Dashboard />
                  </AgentProtectedRoute>
                } />
                <Route path="/bookings" element={
                  <AgentProtectedRoute>
                    <Bookings />
                  </AgentProtectedRoute>
                } />
                <Route path="/ai-chat" element={
                  <AgentProtectedRoute>
                    <AIChat />
                  </AgentProtectedRoute>
                } />
                <Route path="/startmytrip" element={
                  <AgentProtectedRoute>
                    <StartMyTrip />
                  </AgentProtectedRoute>
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
    </ErrorBoundary>
  );
}

export default App;
