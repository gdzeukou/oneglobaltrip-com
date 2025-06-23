
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import Index from '@/pages/Index';
import Auth from '@/pages/Auth';
import Dashboard from '@/pages/Dashboard';
import Packages from '@/pages/Packages';
import Booking from '@/pages/Booking';
import NotFound from '@/pages/NotFound';
import GetStarted from '@/pages/GetStarted';
import Admin from '@/pages/Admin';
import AdminDashboard from '@/pages/AdminDashboard';
import Visas from '@/pages/Visas';
import ShortStayVisas from '@/pages/ShortStayVisas';
import LongStayVisas from '@/pages/LongStayVisas';
import Concierge from '@/pages/Concierge';

// Visa country pages
import SchengenShortStay from '@/pages/visa-countries/SchengenShortStay';
import UKShortStay from '@/pages/visa-countries/UKShortStay';
import UK5YearShortStay from '@/pages/visa-countries/UK5YearShortStay';
import CanadaShortStay from '@/pages/visa-countries/CanadaShortStay';
import BrazilShortStay from '@/pages/visa-countries/BrazilShortStay';
import NigeriaShortStay from '@/pages/visa-countries/NigeriaShortStay';
import UAEShortStay from '@/pages/visa-countries/UAEShortStay';
import IndiaShortStay from '@/pages/visa-countries/IndiaShortStay';
import PortugalLongStay from '@/pages/visa-countries/PortugalLongStay';
import NorwayLongStay from '@/pages/visa-countries/NorwayLongStay';
import DenmarkLongStay from '@/pages/visa-countries/DenmarkLongStay';
import FinlandLongStay from '@/pages/visa-countries/FinlandLongStay';
import GermanyLongStay from '@/pages/visa-countries/GermanyLongStay';
import FranceLongStay from '@/pages/visa-countries/FranceLongStay';
import SwitzerlandLongStay from '@/pages/visa-countries/SwitzerlandLongStay';
import NigeriaLongStay from '@/pages/visa-countries/NigeriaLongStay';

import { AuthProvider } from '@/contexts/AuthContext';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/packages" element={<Packages />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/get-started" element={<GetStarted />} />
              <Route path="/concierge" element={<Concierge />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/visas" element={<Visas />} />
              <Route path="/visas/short-stay" element={<ShortStayVisas />} />
              <Route path="/visas/long-stay" element={<LongStayVisas />} />
              
              {/* Short-stay visa country routes */}
              <Route path="/visas/short-stay/schengen" element={<SchengenShortStay />} />
              <Route path="/visas/short-stay/uk" element={<UKShortStay />} />
              <Route path="/visas/short-stay/uk-5year" element={<UK5YearShortStay />} />
              <Route path="/visas/short-stay/canada" element={<CanadaShortStay />} />
              <Route path="/visas/short-stay/brazil" element={<BrazilShortStay />} />
              <Route path="/visas/short-stay/nigeria" element={<NigeriaShortStay />} />
              <Route path="/visas/short-stay/uae" element={<UAEShortStay />} />
              <Route path="/visas/short-stay/india" element={<IndiaShortStay />} />
              
              {/* Long-stay visa country routes */}
              <Route path="/visas/long-stay/portugal" element={<PortugalLongStay />} />
              <Route path="/visas/long-stay/norway" element={<NorwayLongStay />} />
              <Route path="/visas/long-stay/denmark" element={<DenmarkLongStay />} />
              <Route path="/visas/long-stay/finland" element={<FinlandLongStay />} />
              <Route path="/visas/long-stay/germany" element={<GermanyLongStay />} />
              <Route path="/visas/long-stay/france" element={<FranceLongStay />} />
              <Route path="/visas/long-stay/switzerland" element={<SwitzerlandLongStay />} />
              <Route path="/visas/long-stay/nigeria" element={<NigeriaLongStay />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
