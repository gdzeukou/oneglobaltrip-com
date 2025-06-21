
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Packages from "./pages/Packages";
import Visas from "./pages/Visas";
import ShortStayVisas from "./pages/ShortStayVisas";
import LongStayVisas from "./pages/LongStayVisas";
import Booking from "./pages/Booking";
import GetStarted from "./pages/GetStarted";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

// Short-stay country pages
import BrazilShortStay from "./pages/visa-countries/BrazilShortStay";
import SchengenShortStay from "./pages/visa-countries/SchengenShortStay";
import UKShortStay from "./pages/visa-countries/UKShortStay";
import CanadaShortStay from "./pages/visa-countries/CanadaShortStay";
import NigeriaShortStay from "./pages/visa-countries/NigeriaShortStay";
import IndiaShortStay from "./pages/visa-countries/IndiaShortStay";
import UAEShortStay from "./pages/visa-countries/UAEShortStay";

// Long-stay country pages
import PortugalLongStay from "./pages/visa-countries/PortugalLongStay";
import NorwayLongStay from "./pages/visa-countries/NorwayLongStay";
import DenmarkLongStay from "./pages/visa-countries/DenmarkLongStay";
import FinlandLongStay from "./pages/visa-countries/FinlandLongStay";
import NigeriaLongStay from "./pages/visa-countries/NigeriaLongStay";
import FranceLongStay from "./pages/visa-countries/FranceLongStay";
import GermanyLongStay from "./pages/visa-countries/GermanyLongStay";
import SwitzerlandLongStay from "./pages/visa-countries/SwitzerlandLongStay";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/visas" element={<Visas />} />
            <Route path="/visas/short-stay" element={<ShortStayVisas />} />
            <Route path="/visas/long-stay" element={<LongStayVisas />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Short-stay country pages */}
            <Route path="/visas/short-stay/brazil" element={<BrazilShortStay />} />
            <Route path="/visas/short-stay/schengen" element={<SchengenShortStay />} />
            <Route path="/visas/short-stay/uk" element={<UKShortStay />} />
            <Route path="/visas/short-stay/canada" element={<CanadaShortStay />} />
            <Route path="/visas/short-stay/nigeria" element={<NigeriaShortStay />} />
            <Route path="/visas/short-stay/india" element={<IndiaShortStay />} />
            <Route path="/visas/short-stay/uae" element={<UAEShortStay />} />
            
            {/* Long-stay country pages */}
            <Route path="/visas/long-stay/portugal" element={<PortugalLongStay />} />
            <Route path="/visas/long-stay/norway" element={<NorwayLongStay />} />
            <Route path="/visas/long-stay/denmark" element={<DenmarkLongStay />} />
            <Route path="/visas/long-stay/finland" element={<FinlandLongStay />} />
            <Route path="/visas/long-stay/nigeria" element={<NigeriaLongStay />} />
            <Route path="/visas/long-stay/france" element={<FranceLongStay />} />
            <Route path="/visas/long-stay/germany" element={<GermanyLongStay />} />
            <Route path="/visas/long-stay/switzerland" element={<SwitzerlandLongStay />} />
            
            <Route path="/booking" element={<Booking />} />
            <Route path="/get-started" element={<GetStarted />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
