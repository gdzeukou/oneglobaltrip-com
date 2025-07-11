import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import ErrorBoundary from '@/components/ErrorBoundary';

// Lazy imports for better performance
import Index from "./pages/Index";
import Home from "./pages/Home";
import Visas from "./pages/Visas";
import Packages from "./pages/Packages";
import PackageDetails from "./pages/PackageDetails";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import AuthCallback from "./pages/AuthCallback";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import TestEmailDelivery from "./pages/TestEmailDelivery";
import Admin from "./pages/Admin";
import AdminDashboard from "./pages/AdminDashboard";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";
import ErrorPage from "./pages/ErrorPage";
import Concierge from "./pages/Concierge";
import Booking from "./pages/Booking";
import Bookings from "./pages/Bookings";
import AIChat from "./pages/AIChat";
import LongStayVisas from "./pages/LongStayVisas";
import ShortStayVisas from "./pages/ShortStayVisas";
import IntelligentApplication from "./pages/IntelligentApplication";
import StartMyTrip from "./pages/StartMyTrip";

// Visa country pages
import SchengenShortStay from "./pages/visa-countries/SchengenShortStay";
import SchengenShortStayApply from "./pages/visa-countries/SchengenShortStayApply";
import SchengenShortStayLanding from "./pages/visa-countries/SchengenShortStayLanding";
import FranceShortStay from "./pages/visa-countries/FranceShortStay";
import GermanyShortStay from "./pages/visa-countries/GermanyShortStay";
import ItalyShortStay from "./pages/visa-countries/ItalyShortStay";
import NetherlandsShortStay from "./pages/visa-countries/NetherlandsShortStay";
import DenmarkShortStay from "./pages/visa-countries/DenmarkShortStay";
import SwedenShortStay from "./pages/visa-countries/SwedenShortStay";
import GreeceShortStay from "./pages/visa-countries/GreeceShortStay";
import UKShortStay from "./pages/visa-countries/UKShortStay";
import UK5YearShortStay from "./pages/visa-countries/UK5YearShortStay";
import UAEShortStay from "./pages/visa-countries/UAEShortStay";
import CanadaShortStay from "./pages/visa-countries/CanadaShortStay";
import IndiaShortStay from "./pages/visa-countries/IndiaShortStay";
import BrazilShortStay from "./pages/visa-countries/BrazilShortStay";
import NigeriaShortStay from "./pages/visa-countries/NigeriaShortStay";

// Long stay visa pages
import FranceLongStay from "./pages/visa-countries/FranceLongStay";
import GermanyLongStay from "./pages/visa-countries/GermanyLongStay";
import DenmarkLongStay from "./pages/visa-countries/DenmarkLongStay";
import FinlandLongStay from "./pages/visa-countries/FinlandLongStay";
import PortugalLongStay from "./pages/visa-countries/PortugalLongStay";
import SwitzerlandLongStay from "./pages/visa-countries/SwitzerlandLongStay";
import NorwayLongStay from "./pages/visa-countries/NorwayLongStay";
import NigeriaLongStay from "./pages/visa-countries/NigeriaLongStay";

// Package specific pages
import ParisExplorePackage from "./pages/packages/ParisExplorePackage";

// Pricing page
import VisaPricingPage from "./pages/visas/VisaPricingPage";

import "./App.css";
import MayaAuthGate from "./components/auth/MayaAuthGate";
import MayaProtectedRoute from "./components/auth/MayaProtectedRoute";

// New pages
import About from "./pages/About";
import Blog from "./pages/Blog";
import Services from "./pages/Services";
import Testimonials from "./pages/Testimonials";

const queryClient = new QueryClient();

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Index />} />
                <Route path="/home" element={<Home />} />
                <Route path="/visas" element={<Visas />} />
                <Route path="/packages" element={<Packages />} />
                <Route path="/packages/:id" element={<PackageDetails />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
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
                
                {/* Maya Auth Gate - shown to unauthenticated users trying to access Maya */}
                <Route path="/maya-auth" element={<MayaAuthGate />} />
                
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

                {/* Protected routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
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
                <Route path="/bookings" element={
                  <ProtectedRoute>
                    <Bookings />
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
                
                {/* Maya - Now Protected with Maya-specific auth gate */}
                <Route path="/ai-chat" element={
                  <MayaProtectedRoute>
                    <AIChat />
                  </MayaProtectedRoute>
                } />

                {/* Error routes */}
                <Route path="/error" element={<ErrorPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
