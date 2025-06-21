
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Packages from "./pages/Packages";
import Visas from "./pages/Visas";
import ShortStayVisas from "./pages/ShortStayVisas";
import LongStayVisas from "./pages/LongStayVisas";
import Booking from "./pages/Booking";
import GetStarted from "./pages/GetStarted";
import NotFound from "./pages/NotFound";

// Short-stay country pages
import BrazilShortStay from "./pages/visa-countries/BrazilShortStay";
import SchengenShortStay from "./pages/visa-countries/SchengenShortStay";
import UKShortStay from "./pages/visa-countries/UKShortStay";
import CanadaShortStay from "./pages/visa-countries/CanadaShortStay";
import NigeriaShortStay from "./pages/visa-countries/NigeriaShortStay";
import IndiaShortStay from "./pages/visa-countries/IndiaShortStay";
import UAEShortStay from "./pages/visa-countries/UAEShortStay";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/visas" element={<Visas />} />
          <Route path="/visas/short-stay" element={<ShortStayVisas />} />
          <Route path="/visas/long-stay" element={<LongStayVisas />} />
          
          {/* Short-stay country pages */}
          <Route path="/visas/short-stay/brazil" element={<BrazilShortStay />} />
          <Route path="/visas/short-stay/schengen" element={<SchengenShortStay />} />
          <Route path="/visas/short-stay/uk" element={<UKShortStay />} />
          <Route path="/visas/short-stay/canada" element={<CanadaShortStay />} />
          <Route path="/visas/short-stay/nigeria" element={<NigeriaShortStay />} />
          <Route path="/visas/short-stay/india" element={<IndiaShortStay />} />
          <Route path="/visas/short-stay/uae" element={<UAEShortStay />} />
          
          <Route path="/booking" element={<Booking />} />
          <Route path="/get-started" element={<GetStarted />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
