
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

// Visa country pages
import SchengenShortStay from "./pages/visa-countries/SchengenShortStay";
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
                <Route path="/ai-chat" element={<AIChat />} />
                <Route path="/long-stay-visas" element={<LongStayVisas />} />
                <Route path="/short-stay-visas" element={<ShortStayVisas />} />
                <Route path="/intelligent-application" element={<IntelligentApplication />} />
                
                {/* Visa country routes */}
                <Route path="/visa/schengen-short-stay" element={<SchengenShortStay />} />
                <Route path="/schengen-visa" element={<SchengenShortStayLanding />} />
                <Route path="/visa/france-short-stay" element={<FranceShortStay />} />
                <Route path="/visa/germany-short-stay" element={<GermanyShortStay />} />
                <Route path="/visa/italy-short-stay" element={<ItalyShortStay />} />
                <Route path="/visa/netherlands-short-stay" element={<NetherlandsShortStay />} />
                <Route path="/visa/denmark-short-stay" element={<DenmarkShortStay />} />
                <Route path="/visa/sweden-short-stay" element={<SwedenShortStay />} />
                <Route path="/visa/greece-short-stay" element={<GreeceShortStay />} />
                <Route path="/visa/uk-short-stay" element={<UKShortStay />} />
                <Route path="/visa/uk-5-year-short-stay" element={<UK5YearShortStay />} />
                <Route path="/visa/uae-short-stay" element={<UAEShortStay />} />
                <Route path="/visa/canada-short-stay" element={<CanadaShortStay />} />
                <Route path="/visa/india-short-stay" element={<IndiaShortStay />} />
                <Route path="/visa/brazil-short-stay" element={<BrazilShortStay />} />
                <Route path="/visa/nigeria-short-stay" element={<NigeriaShortStay />} />
                
                {/* Long stay visa routes */}
                <Route path="/visa/france-long-stay" element={<FranceLongStay />} />
                <Route path="/visa/germany-long-stay" element={<GermanyLongStay />} />
                <Route path="/visa/denmark-long-stay" element={<DenmarkLongStay />} />
                <Route path="/visa/finland-long-stay" element={<FinlandLongStay />} />
                <Route path="/visa/portugal-long-stay" element={<PortugalLongStay />} />
                <Route path="/visa/switzerland-long-stay" element={<SwitzerlandLongStay />} />
                <Route path="/visa/norway-long-stay" element={<NorwayLongStay />} />
                <Route path="/visa/nigeria-long-stay" element={<NigeriaLongStay />} />
                
                {/* Package specific routes */}
                <Route path="/package/paris-explore" element={<ParisExplorePackage />} />
                
                {/* Pricing routes */}
                <Route path="/visa-pricing" element={<VisaPricingPage />} />

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
