
import { Suspense, lazy } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from '@/components/ErrorBoundary';
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const Visas = lazy(() => import("./pages/Visas"));
const Packages = lazy(() => import("./pages/Packages"));
const PackageDetails = lazy(() => import("./pages/PackageDetails"));
const Booking = lazy(() => import("./pages/Booking"));
const GetStarted = lazy(() => import("./pages/GetStarted"));
const ShortStayVisas = lazy(() => import("./pages/ShortStayVisas"));
const LongStayVisas = lazy(() => import("./pages/LongStayVisas"));
const Auth = lazy(() => import("./pages/Auth"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const Admin = lazy(() => import("./pages/Admin"));
const Concierge = lazy(() => import("./pages/Concierge"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Visa country pages
const SchengenShortStay = lazy(() => import("./pages/visa-countries/SchengenShortStay"));
const IndiaShortStay = lazy(() => import("./pages/visa-countries/IndiaShortStay"));
const UAEShortStay = lazy(() => import("./pages/visa-countries/UAEShortStay"));
const CanadaShortStay = lazy(() => import("./pages/visa-countries/CanadaShortStay"));
const BrazilShortStay = lazy(() => import("./pages/visa-countries/BrazilShortStay"));
const NigeriaShortStay = lazy(() => import("./pages/visa-countries/NigeriaShortStay"));
const UKShortStay = lazy(() => import("./pages/visa-countries/UKShortStay"));
const UK5YearShortStay = lazy(() => import("./pages/visa-countries/UK5YearShortStay"));

// New special country pages
const FranceShortStay = lazy(() => import("./pages/visa-countries/FranceShortStay"));
const NetherlandsShortStay = lazy(() => import("./pages/visa-countries/NetherlandsShortStay"));
const ItalyShortStay = lazy(() => import("./pages/visa-countries/ItalyShortStay"));
const GreeceShortStay = lazy(() => import("./pages/visa-countries/GreeceShortStay"));

// Long-stay visa pages
const FranceLongStay = lazy(() => import("./pages/visa-countries/FranceLongStay"));
const GermanyLongStay = lazy(() => import("./pages/visa-countries/GermanyLongStay"));
const PortugalLongStay = lazy(() => import("./pages/visa-countries/PortugalLongStay"));
const DenmarkLongStay = lazy(() => import("./pages/visa-countries/DenmarkLongStay"));
const FinlandLongStay = lazy(() => import("./pages/visa-countries/FinlandLongStay"));
const NorwayLongStay = lazy(() => import("./pages/visa-countries/NorwayLongStay"));
const SwitzerlandLongStay = lazy(() => import("./pages/visa-countries/SwitzerlandLongStay"));
const NigeriaLongStay = lazy(() => import("./pages/visa-countries/NigeriaLongStay"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ErrorBoundary>
            <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-white">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                  <p className="text-lg font-medium text-gray-700">Loading...</p>
                </div>
              </div>
            }>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/visas" element={<Visas />} />
                <Route path="/packages" element={<Packages />} />
                <Route path="/packages/:id" element={<PackageDetails />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/get-started" element={<GetStarted />} />
                <Route path="/visas/short-stay" element={<ShortStayVisas />} />
                <Route path="/visas/long-stay" element={<LongStayVisas />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/admin" element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/admin-v2" element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                } />
                <Route path="/concierge" element={
                  <ProtectedRoute>
                    <Concierge />
                  </ProtectedRoute>
                } />
                
                {/* Short-stay visa country routes */}
                <Route path="/visas/short-stay/schengen" element={<SchengenShortStay />} />
                <Route path="/visas/short-stay/france" element={<FranceShortStay />} />
                <Route path="/visas/short-stay/netherlands" element={<NetherlandsShortStay />} />
                <Route path="/visas/short-stay/italy" element={<ItalyShortStay />} />
                <Route path="/visas/short-stay/greece" element={<GreeceShortStay />} />
                <Route path="/visas/short-stay/india" element={<IndiaShortStay />} />
                <Route path="/visas/short-stay/uae" element={<UAEShortStay />} />
                <Route path="/visas/short-stay/canada" element={<CanadaShortStay />} />
                <Route path="/visas/short-stay/brazil" element={<BrazilShortStay />} />
                <Route path="/visas/short-stay/nigeria" element={<NigeriaShortStay />} />
                <Route path="/visas/short-stay/uk" element={<UKShortStay />} />
                <Route path="/visas/short-stay/uk-5-year" element={<UK5YearShortStay />} />
                
                {/* Legacy routes for compatibility */}
                <Route path="/visa-countries/IndiaShortStay" element={<IndiaShortStay />} />
                <Route path="/visa-countries/UAEShortStay" element={<UAEShortStay />} />
                <Route path="/visa-countries/CanadaShortStay" element={<CanadaShortStay />} />
                <Route path="/visa-countries/BrazilShortStay" element={<BrazilShortStay />} />
                <Route path="/visa-countries/NigeriaShortStay" element={<NigeriaShortStay />} />
                
                {/* Long-stay visa routes */}
                <Route path="/visas/long-stay/france" element={<FranceLongStay />} />
                <Route path="/visas/long-stay/germany" element={<GermanyLongStay />} />
                <Route path="/visas/long-stay/portugal" element={<PortugalLongStay />} />
                <Route path="/visas/long-stay/denmark" element={<DenmarkLongStay />} />
                <Route path="/visas/long-stay/finland" element={<FinlandLongStay />} />
                <Route path="/visas/long-stay/norway" element={<NorwayLongStay />} />
                <Route path="/visas/long-stay/switzerland" element={<SwitzerlandLongStay />} />
                <Route path="/visa-countries/NigeriaLongStay" element={<NigeriaLongStay />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
