
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navigation from "./components/Navigation";
import Index from "./pages/Index";
import Packages from "./pages/Packages";
import Visas from "./pages/Visas";
import ShortStayVisas from "./pages/ShortStayVisas";
import LongStayVisas from "./pages/LongStayVisas";
import GetStarted from "./pages/GetStarted";
import Booking from "./pages/Booking";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";

// Import all visa country pages
import SchengenShortStay from "./pages/visa-countries/SchengenShortStay";
import UKShortStay from "./pages/visa-countries/UKShortStay";
import CanadaShortStay from "./pages/visa-countries/CanadaShortStay";
import BrazilShortStay from "./pages/visa-countries/BrazilShortStay";
import UAEShortStay from "./pages/visa-countries/UAEShortStay";
import IndiaShortStay from "./pages/visa-countries/IndiaShortStay";
import NigeriaShortStay from "./pages/visa-countries/NigeriaShortStay";
import GermanyLongStay from "./pages/visa-countries/GermanyLongStay";
import FranceLongStay from "./pages/visa-countries/FranceLongStay";
import PortugalLongStay from "./pages/visa-countries/PortugalLongStay";
import NorwayLongStay from "./pages/visa-countries/NorwayLongStay";
import DenmarkLongStay from "./pages/visa-countries/DenmarkLongStay";
import FinlandLongStay from "./pages/visa-countries/FinlandLongStay";
import SwitzerlandLongStay from "./pages/visa-countries/SwitzerlandLongStay";
import NigeriaLongStay from "./pages/visa-countries/NigeriaLongStay";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-white">
              <Navigation />
              <main>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/packages" element={<Packages />} />
                  <Route path="/visas" element={<Visas />} />
                  <Route path="/visas/short-stay" element={<ShortStayVisas />} />
                  <Route path="/visas/long-stay" element={<LongStayVisas />} />
                  <Route path="/get-started" element={<GetStarted />} />
                  <Route path="/booking" element={<Booking />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/admin" element={<Admin />} />
                  
                  {/* Short-stay visa routes */}
                  <Route path="/visas/schengen/short-stay" element={<SchengenShortStay />} />
                  <Route path="/visas/uk/short-stay" element={<UKShortStay />} />
                  <Route path="/visas/canada/short-stay" element={<CanadaShortStay />} />
                  <Route path="/visas/brazil/short-stay" element={<BrazilShortStay />} />
                  <Route path="/visas/uae/short-stay" element={<UAEShortStay />} />
                  <Route path="/visas/india/short-stay" element={<IndiaShortStay />} />
                  <Route path="/visas/nigeria/short-stay" element={<NigeriaShortStay />} />
                  
                  {/* Long-stay visa routes */}
                  <Route path="/visas/germany/long-stay" element={<GermanyLongStay />} />
                  <Route path="/visas/france/long-stay" element={<FranceLongStay />} />
                  <Route path="/visas/portugal/long-stay" element={<PortugalLongStay />} />
                  <Route path="/visas/norway/long-stay" element={<NorwayLongStay />} />
                  <Route path="/visas/denmark/long-stay" element={<DenmarkLongStay />} />
                  <Route path="/visas/finland/long-stay" element={<FinlandLongStay />} />
                  <Route path="/visas/switzerland/long-stay" element={<SwitzerlandLongStay />} />
                  <Route path="/visas/nigeria/long-stay" element={<NigeriaLongStay />} />
                  
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
