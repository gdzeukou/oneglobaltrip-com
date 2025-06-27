
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Packages from "./pages/Packages";
import ParisExplorePackage from "./pages/packages/ParisExplorePackage";
import PackageDetails from "./pages/PackageDetails";
import Visas from "./pages/Visas";
import GetStarted from "./pages/GetStarted";
import Contact from "./pages/Contact";
import Pricing from "./pages/Pricing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Bookings from "./pages/Bookings";
import Booking from "./pages/Booking";
import Concierge from "./pages/Concierge";
import Admin from "./pages/Admin";
import AdminDashboard from "./pages/AdminDashboard";
import AuthCallback from "./pages/AuthCallback";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ErrorPage from "./pages/ErrorPage";
import { ShortStayVisas, LongStayVisas } from "./utils/lazyImports";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Visa country pages
import SchengenShortStay from "./pages/visa-countries/SchengenShortStay";
import FranceShortStay from "./pages/visa-countries/FranceShortStay";
import GreeceShortStay from "./pages/visa-countries/GreeceShortStay";
import ItalyShortStay from "./pages/visa-countries/ItalyShortStay";
import NetherlandsShortStay from "./pages/visa-countries/NetherlandsShortStay";
import UKShortStay from "./pages/visa-countries/UKShortStay";
import UK5YearShortStay from "./pages/visa-countries/UK5YearShortStay";
import UAEShortStay from "./pages/visa-countries/UAEShortStay";
import CanadaShortStay from "./pages/visa-countries/CanadaShortStay";
import BrazilShortStay from "./pages/visa-countries/BrazilShortStay";
import IndiaShortStay from "./pages/visa-countries/IndiaShortStay";
import NigeriaShortStay from "./pages/visa-countries/NigeriaShortStay";

// Long stay visa pages
import FranceLongStay from "./pages/visa-countries/FranceLongStay";
import GermanyLongStay from "./pages/visa-countries/GermanyLongStay";
import PortugalLongStay from "./pages/visa-countries/PortugalLongStay";
import FinlandLongStay from "./pages/visa-countries/FinlandLongStay";
import DenmarkLongStay from "./pages/visa-countries/DenmarkLongStay";
import NorwayLongStay from "./pages/visa-countries/NorwayLongStay";
import SwitzerlandLongStay from "./pages/visa-countries/SwitzerlandLongStay";
import NigeriaLongStay from "./pages/visa-countries/NigeriaLongStay";

// Visa pricing page
import VisaPricingPage from "./pages/visas/VisaPricingPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/home" element={<Home />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/packages/paris-explore-package" element={<ParisExplorePackage />} />
            <Route path="/packages/:id" element={<PackageDetails />} />
            <Route path="/visas" element={<Visas />} />
            <Route path="/visas/short-stay" element={<ShortStayVisas />} />
            <Route path="/visas/long-stay" element={<LongStayVisas />} />
            <Route path="/visas/pricing" element={<VisaPricingPage />} />
            
            {/* Short Stay Visa Routes */}
            <Route path="/visas/schengen-short-stay" element={<SchengenShortStay />} />
            <Route path="/visas/france-short-stay" element={<FranceShortStay />} />
            <Route path="/visas/greece-short-stay" element={<GreeceShortStay />} />
            <Route path="/visas/italy-short-stay" element={<ItalyShortStay />} />
            <Route path="/visas/netherlands-short-stay" element={<NetherlandsShortStay />} />
            <Route path="/visas/uk-short-stay" element={<UKShortStay />} />
            <Route path="/visas/uk-5-year-short-stay" element={<UK5YearShortStay />} />
            <Route path="/visas/uae-short-stay" element={<UAEShortStay />} />
            <Route path="/visas/canada-short-stay" element={<CanadaShortStay />} />
            <Route path="/visas/brazil-short-stay" element={<BrazilShortStay />} />
            <Route path="/visas/india-short-stay" element={<IndiaShortStay />} />
            <Route path="/visas/nigeria-short-stay" element={<NigeriaShortStay />} />
            
            {/* Long Stay Visa Routes */}
            <Route path="/visas/france-long-stay" element={<FranceLongStay />} />
            <Route path="/visas/germany-long-stay" element={<GermanyLongStay />} />
            <Route path="/visas/portugal-long-stay" element={<PortugalLongStay />} />
            <Route path="/visas/finland-long-stay" element={<FinlandLongStay />} />
            <Route path="/visas/denmark-long-stay" element={<DenmarkLongStay />} />
            <Route path="/visas/norway-long-stay" element={<NorwayLongStay />} />
            <Route path="/visas/switzerland-long-stay" element={<SwitzerlandLongStay />} />
            <Route path="/visas/nigeria-long-stay" element={<NigeriaLongStay />} />
            
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
            <Route path="/booking" element={<ProtectedRoute><Booking /></ProtectedRoute>} />
            <Route path="/concierge" element={<ProtectedRoute><Concierge /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
            <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
