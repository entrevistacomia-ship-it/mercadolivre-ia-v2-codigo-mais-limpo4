import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RegisterBuyerPage from "./pages/RegisterBuyerPage";
import RegisterSellerPage from "./pages/RegisterSellerPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import SellerDashboard from "./pages/SellerDashboard";
import AboutPage from "./pages/AboutPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import HelpCenterPage from "./pages/HelpCenterPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import AllAgentsPage from "./pages/AllAgentsPage";
import AddProductPage from "./pages/AddProductPage";
import ProfilePage from "./pages/ProfilePage";
import FreeAgentPage from "./pages/FreeAgentPage";
import FreeAgentsPage from "./pages/FreeAgentsPage";
import ConfirmEmailPage from "./pages/ConfirmEmailPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ScrollToTop />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/register/buyer" element={<RegisterBuyerPage />} />
          <Route path="/register/seller" element={<RegisterSellerPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/help" element={<HelpCenterPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/agents" element={<AllAgentsPage />} />
          <Route path="/agentes-gratuitos" element={<FreeAgentsPage />} />
          <Route path="/add-product" element={<AddProductPage />} />
          <Route path="/agente/:id" element={<FreeAgentPage />} />
          <Route path="/confirm-email" element={<ConfirmEmailPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
