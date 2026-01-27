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
          <Route path="/en/dashboard" element={<ClientDashboardPage />} />
          <Route path="/en/addon-success" element={<AddonSuccessPage />} />
          
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
          <Route path="/es/dashboard" element={<ClientDashboardPage />} />
          <Route path="/es/addon-success" element={<AddonSuccessPage />} />
          
          {/* Language-agnostic routes for Stripe redirects */}
          <Route path="/checkout-success" element={<CheckoutSuccessPage />} />
          <Route path="/addon-success" element={<AddonSuccessPage />} />
          <Route path="/pricing" element={<Navigate to="/en/pricing" replace />} />
          <Route path="/dashboard" element={<Navigate to="/en/dashboard" replace />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
