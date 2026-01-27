import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import AIPage from "./pages/AIPage";
import PricingPage from "./pages/PricingPage";
import FAQPage from "./pages/FAQPage";
import ContactPage from "./pages/ContactPage";
import SchedulePage from "./pages/SchedulePage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import CheckoutSuccessPage from "./pages/CheckoutSuccessPage";
import OnboardingPage from "./pages/OnboardingPage";
import ClientDashboardPage from "./pages/ClientDashboardPage";
import AddonSuccessPage from "./pages/AddonSuccessPage";
import InternalDashboardPage from "./pages/InternalDashboardPage";
import DemoPage from "./pages/DemoPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import PortalPage from "./pages/PortalPage";
import PortalRequestsPage from "./pages/PortalRequestsPage";
import PortalSummaryPage from "./pages/PortalSummaryPage";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Redirect root to English */}
          <Route path="/" element={<Navigate to="/en" replace />} />
          
          {/* English Routes */}
          <Route path="/en" element={<HomePage />} />
          <Route path="/en/services" element={<ServicesPage />} />
          <Route path="/en/ai" element={<AIPage />} />
          <Route path="/en/pricing" element={<PricingPage />} />
          <Route path="/en/faq" element={<FAQPage />} />
          <Route path="/en/contact" element={<ContactPage />} />
          <Route path="/en/schedule" element={<SchedulePage />} />
          <Route path="/en/privacy" element={<PrivacyPage />} />
          <Route path="/en/terms" element={<TermsPage />} />
          <Route path="/en/checkout-success" element={<CheckoutSuccessPage />} />
          <Route path="/en/onboarding/:plan" element={<OnboardingPage />} />
          <Route path="/en/addon-success" element={<AddonSuccessPage />} />
          <Route path="/en/demo/:plan" element={<DemoPage />} />
          <Route path="/en/login" element={<LoginPage />} />
          <Route path="/en/signup" element={<SignUpPage />} />
          {/* Protected Portal Routes - English */}
          <Route path="/en/portal" element={<ProtectedRoute><PortalPage /></ProtectedRoute>} />
          <Route path="/en/portal/requests" element={<ProtectedRoute><PortalRequestsPage /></ProtectedRoute>} />
          <Route path="/en/portal/summary" element={<ProtectedRoute><PortalSummaryPage /></ProtectedRoute>} />
          
          {/* Spanish Routes */}
          <Route path="/es" element={<HomePage />} />
          <Route path="/es/services" element={<ServicesPage />} />
          <Route path="/es/ai" element={<AIPage />} />
          <Route path="/es/pricing" element={<PricingPage />} />
          <Route path="/es/faq" element={<FAQPage />} />
          <Route path="/es/contact" element={<ContactPage />} />
          <Route path="/es/schedule" element={<SchedulePage />} />
          <Route path="/es/privacy" element={<PrivacyPage />} />
          <Route path="/es/terms" element={<TermsPage />} />
          <Route path="/es/checkout-success" element={<CheckoutSuccessPage />} />
          <Route path="/es/onboarding/:plan" element={<OnboardingPage />} />
          <Route path="/es/addon-success" element={<AddonSuccessPage />} />
          <Route path="/es/demo/:plan" element={<DemoPage />} />
          <Route path="/es/login" element={<LoginPage />} />
          <Route path="/es/signup" element={<SignUpPage />} />
          {/* Protected Portal Routes - Spanish */}
          <Route path="/es/portal" element={<ProtectedRoute><PortalPage /></ProtectedRoute>} />
          <Route path="/es/portal/requests" element={<ProtectedRoute><PortalRequestsPage /></ProtectedRoute>} />
          <Route path="/es/portal/summary" element={<ProtectedRoute><PortalSummaryPage /></ProtectedRoute>} />
          
          {/* Language-agnostic routes - redirect to English portal equivalents */}
          <Route path="/checkout-success" element={<CheckoutSuccessPage />} />
          <Route path="/addon-success" element={<AddonSuccessPage />} />
          <Route path="/pricing" element={<Navigate to="/en/pricing" replace />} />
          
          {/* Legacy client routes -> redirect to portal */}
          <Route path="/dashboard" element={<Navigate to="/en/portal" replace />} />
          <Route path="/summary" element={<Navigate to="/en/portal/summary" replace />} />
          <Route path="/requests/new" element={<Navigate to="/en/portal/requests" replace />} />
          <Route path="/en/summary" element={<Navigate to="/en/portal/summary" replace />} />
          <Route path="/es/summary" element={<Navigate to="/es/portal/summary" replace />} />
          <Route path="/en/requests/new" element={<Navigate to="/en/portal/requests" replace />} />
          <Route path="/es/requests/new" element={<Navigate to="/es/portal/requests" replace />} />
          <Route path="/en/dashboard" element={<Navigate to="/en/portal" replace />} />
          <Route path="/es/dashboard" element={<Navigate to="/es/portal" replace />} />
          
          {/* Onboarding redirects to portal for existing users */}
          <Route path="/onboarding/starter" element={<Navigate to="/en/portal" replace />} />
          <Route path="/onboarding/growth" element={<Navigate to="/en/portal" replace />} />
          
          {/* Auth redirects */}
          <Route path="/login" element={<Navigate to="/en/login" replace />} />
          <Route path="/signup" element={<Navigate to="/en/signup" replace />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/portal" element={<Navigate to="/en/portal" replace />} />
          <Route path="/portal/requests" element={<Navigate to="/en/portal/requests" replace />} />
          <Route path="/portal/summary" element={<Navigate to="/en/portal/summary" replace />} />
          
          {/* Demo routes - keep public */}
          <Route path="/demo/:plan" element={<DemoPage />} />
          
          {/* Internal routes (not public) */}
          <Route path="/internal" element={<InternalDashboardPage />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
