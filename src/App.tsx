import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ROUTES } from "@/constants/routes";
import { shouldBypassAuth } from "@/utils/developmentMode";

// Lazy load components
const Index = lazy(() => import("./pages/Index"));
const Visas = lazy(() => import("./pages/Visas"));
const ShortStayVisas = lazy(() => import("./pages/ShortStayVisas"));
const LongStayVisas = lazy(() => import("./pages/LongStayVisas"));
const Packages = lazy(() => import("./pages/Packages"));
const Contact = lazy(() => import("./pages/Contact"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Auth = lazy(() => import("./pages/Auth"));
const AuthCallback = lazy(() => import("./pages/AuthCallback"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const Bookings = lazy(() => import("./pages/Bookings"));
const Booking = lazy(() => import("./pages/Booking"));
const Concierge = lazy(() => import("./pages/Concierge"));
const Admin = lazy(() => import("./pages/Admin"));
const IntelligentApplication = lazy(() => import("./pages/IntelligentApplication"));

// Visa country pages
const SchengenShortStayLanding = lazy(() => import("./pages/visa-countries/SchengenShortStayLanding"));
const FranceShortStay = lazy(() => import("./pages/visa-countries/FranceShortStay"));
const GreeceShortStay = lazy(() => import("./pages/visa-countries/GreeceShortStay"));
const ItalyShortStay = lazy(() => import("./pages/visa-countries/ItalyShortStay"));
const NetherlandsShortStay = lazy(() => import("./pages/visa-countries/NetherlandsShortStay"));
const GermanyShortStay = lazy(() => import("./pages/visa-countries/GermanyShortStay"));
const DenmarkShortStay = lazy(() => import("./pages/visa-countries/DenmarkShortStay"));
const SwedenShortStay = lazy(() => import("./pages/visa-countries/SwedenShortStay"));
const UKShortStay = lazy(() => import("./pages/visa-countries/UKShortStay"));
const UK5YearShortStay = lazy(() => import("./pages/visa-countries/UK5YearShortStay"));
const UAEShortStay = lazy(() => import("./pages/visa-countries/UAEShortStay"));
const CanadaShortStay = lazy(() => import("./pages/visa-countries/CanadaShortStay"));
const BrazilShortStay = lazy(() => import("./pages/visa-countries/BrazilShortStay"));
const IndiaShortStay = lazy(() => import("./pages/visa-countries/IndiaShortStay"));
const NigeriaShortStay = lazy(() => import("./pages/visa-countries/NigeriaShortStay"));

// Long stay visa pages
const FranceLongStay = lazy(() => import("./pages/visa-countries/FranceLongStay"));
const GermanyLongStay = lazy(() => import("./pages/visa-countries/GermanyLongStay"));
const PortugalLongStay = lazy(() => import("./pages/visa-countries/PortugalLongStay"));
const FinlandLongStay = lazy(() => import("./pages/visa-countries/FinlandLongStay"));
const DenmarkLongStay = lazy(() => import("./pages/visa-countries/DenmarkLongStay"));
const NorwayLongStay = lazy(() => import("./pages/visa-countries/NorwayLongStay"));
const SwitzerlandLongStay = lazy(() => import("./pages/visa-countries/SwitzerlandLongStay"));
const NigeriaLongStay = lazy(() => import("./pages/visa-countries/NigeriaLongStay"));

// Package pages
const ParisExplorePackage = lazy(() => import("./pages/packages/ParisExplorePackage"));

// Visa pricing page
const VisaPricingPage = lazy(() => import("./pages/visas/VisaPricingPage"));
const PackageDetails = lazy(() => import("./pages/PackageDetails"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            }>
              <Routes>
                {/* Main pages */}
                <Route path={ROUTES.HOME} element={<Index />} />
                <Route path={ROUTES.PACKAGES} element={<Packages />} />
                <Route path={ROUTES.VISAS} element={<Visas />} />
                <Route path={ROUTES.CONTACT} element={<Contact />} />
                <Route path={ROUTES.PRICING} element={<Pricing />} />
                <Route path={ROUTES.AUTH} element={<Auth />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                
                {/* Protected routes */}
                <Route 
                  path={ROUTES.DASHBOARD} 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path={ROUTES.PROFILE} 
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path={ROUTES.BOOKINGS} 
                  element={
                    <ProtectedRoute>
                      <Bookings />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path={ROUTES.BOOKING} 
                  element={
                    <ProtectedRoute>
                      <Booking />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path={ROUTES.CONCIERGE} 
                  element={
                    <ProtectedRoute>
                      <Concierge />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path={ROUTES.ADMIN} 
                  element={
                    shouldBypassAuth(ROUTES.ADMIN) ? (
                      <Admin />
                    ) : (
                      <ProtectedRoute>
                        <Admin />
                      </ProtectedRoute>
                    )
                  } 
                />
                <Route 
                  path="/apply" 
                  element={
                    <ProtectedRoute>
                      <IntelligentApplication />
                    </ProtectedRoute>
                  } 
                />

                {/* Visa categories */}
                <Route path={ROUTES.SHORT_STAY_VISAS} element={<ShortStayVisas />} />
                <Route path={ROUTES.LONG_STAY_VISAS} element={<LongStayVisas />} />
                <Route path={ROUTES.VISAS_PRICING} element={<VisaPricingPage />} />

                {/* Short stay visa countries */}
                <Route path={ROUTES.SCHENGEN_SHORT_STAY_LANDING} element={<SchengenShortStayLanding />} />
                <Route path={ROUTES.FRANCE_SHORT_STAY} element={<FranceShortStay />} />
                <Route path={ROUTES.GREECE_SHORT_STAY} element={<GreeceShortStay />} />
                <Route path={ROUTES.ITALY_SHORT_STAY} element={<ItalyShortStay />} />
                <Route path={ROUTES.NETHERLANDS_SHORT_STAY} element={<NetherlandsShortStay />} />
                <Route path={ROUTES.GERMANY_SHORT_STAY} element={<GermanyShortStay />} />
                <Route path={ROUTES.DENMARK_SHORT_STAY} element={<DenmarkShortStay />} />
                <Route path={ROUTES.SWEDEN_SHORT_STAY} element={<SwedenShortStay />} />
                <Route path={ROUTES.UK_SHORT_STAY} element={<UKShortStay />} />
                <Route path={ROUTES.UK_5_YEAR_SHORT_STAY} element={<UK5YearShortStay />} />
                <Route path={ROUTES.UAE_SHORT_STAY} element={<UAEShortStay />} />
                <Route path={ROUTES.CANADA_SHORT_STAY} element={<CanadaShortStay />} />
                <Route path={ROUTES.BRAZIL_SHORT_STAY} element={<BrazilShortStay />} />
                <Route path={ROUTES.INDIA_SHORT_STAY} element={<IndiaShortStay />} />
                <Route path={ROUTES.NIGERIA_SHORT_STAY} element={<NigeriaShortStay />} />

                {/* Long stay visa countries */}
                <Route path={ROUTES.FRANCE_LONG_STAY} element={<FranceLongStay />} />
                <Route path={ROUTES.GERMANY_LONG_STAY} element={<GermanyLongStay />} />
                <Route path={ROUTES.PORTUGAL_LONG_STAY} element={<PortugalLongStay />} />
                <Route path={ROUTES.FINLAND_LONG_STAY} element={<FinlandLongStay />} />
                <Route path={ROUTES.DENMARK_LONG_STAY} element={<DenmarkLongStay />} />
                <Route path={ROUTES.NORWAY_LONG_STAY} element={<NorwayLongStay />} />
                <Route path={ROUTES.SWITZERLAND_LONG_STAY} element={<SwitzerlandLongStay />} />
                <Route path={ROUTES.NIGERIA_LONG_STAY} element={<NigeriaLongStay />} />

                {/* Package routes */}
                <Route path={ROUTES.PARIS_EXPLORE_PACKAGE} element={<ParisExplorePackage />} />
                <Route path="/packages/:id" element={<PackageDetails />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ErrorBoundary>
  </QueryClientProvider>
);

export default App;
