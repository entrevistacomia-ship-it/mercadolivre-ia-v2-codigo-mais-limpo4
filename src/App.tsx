/**
 * ============================================================================
 * APP.TSX - COMPONENTE PRINCIPAL DA APLICAÇÃO
 * ============================================================================
 *
 * Este é o componente raiz que gerencia toda a aplicação React.
 *
 * RESPONSABILIDADES:
 * - Configurar provedores globais (QueryClient, Tooltips)
 * - Definir todas as rotas da aplicação usando React Router
 * - Gerenciar notificações (Toaster e Sonner)
 * - Implementar scroll automático ao topo
 *
 * ESTRUTURA:
 * 1. QueryClientProvider - Gerencia cache e requisições async (React Query)
 * 2. TooltipProvider - Habilita tooltips em toda aplicação
 * 3. Toaster/Sonner - Sistemas de notificação
 * 4. BrowserRouter - Gerenciamento de rotas
 * 5. Routes - Define todas as páginas e seus caminhos
 *
 * IMPORTANTE PARA AGENTES IA:
 * - Para adicionar nova rota: Importe o componente e adicione <Route> antes do path="*"
 * - Rota "/" é a página principal (Index.tsx)
 * - Rota "*" deve sempre ser a última (404 NotFound)
 * - Rotas com parâmetros usam ":param" (ex: /product/:id)
 * ============================================================================
 */

// ============================================================================
// IMPORTS DE COMPONENTES UI
// ============================================================================
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

// ============================================================================
// IMPORTS DE BIBLIOTECAS EXTERNAS
// ============================================================================
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ============================================================================
// IMPORTS DE PÁGINAS
// ============================================================================
// Página Principal
import Index from "./pages/Index";

// Páginas de Autenticação
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RegisterBuyerPage from "./pages/RegisterBuyerPage";
import RegisterSellerPage from "./pages/RegisterSellerPage";
import ConfirmEmailPage from "./pages/ConfirmEmailPage";

// Páginas de Produtos e Compras
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AllAgentsPage from "./pages/AllAgentsPage";
import FreeAgentsPage from "./pages/FreeAgentsPage";
import FreeAgentPage from "./pages/FreeAgentPage";

// Páginas de Vendedor
import SellerDashboard from "./pages/SellerDashboard";
import AddProductPage from "./pages/AddProductPage";

// Páginas de Usuário
import ProfilePage from "./pages/ProfilePage";

// Páginas Informativas
import AboutPage from "./pages/AboutPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import HelpCenterPage from "./pages/HelpCenterPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";

// Página 404
import NotFound from "./pages/NotFound";

// ============================================================================
// CONFIGURAÇÃO DO REACT QUERY
// ============================================================================
// QueryClient gerencia cache de dados e estado de requisições assíncronas
const queryClient = new QueryClient();

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================
const App = () => (
  // QueryClientProvider: Fornece acesso ao React Query em toda aplicação
  <QueryClientProvider client={queryClient}>
    {/* TooltipProvider: Habilita tooltips em todos os componentes */}
    <TooltipProvider>
      {/* Toaster: Sistema de notificações padrão */}
      <Toaster />
      {/* Sonner: Sistema de notificações alternativo (toast messages) */}
      <Sonner />
      {/* ScrollToTop: Scroll automático ao topo ao mudar de rota */}
      <ScrollToTop />

      {/* BrowserRouter: Gerencia navegação da aplicação */}
      <BrowserRouter>
        <Routes>
          {/* ========================================
              ROTAS PRINCIPAIS
              ======================================== */}

          {/* Página Inicial - Exibe Hero, Categorias, Produtos, etc */}
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Index />} />

          {/* ========================================
              ROTAS DE AUTENTICAÇÃO
              ======================================== */}

          {/* Login de usuários */}
          <Route path="/login" element={<LoginPage />} />

          {/* Registro - Escolha entre Comprador ou Vendedor */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/register/buyer" element={<RegisterBuyerPage />} />
          <Route path="/register/seller" element={<RegisterSellerPage />} />

          {/* Confirmação de email */}
          <Route path="/confirm-email" element={<ConfirmEmailPage />} />

          {/* ========================================
              ROTAS DE PRODUTOS E COMPRAS
              ======================================== */}

          {/* Detalhes de um produto específico (ID dinâmico) */}
          <Route path="/product/:id" element={<ProductPage />} />

          {/* Carrinho de compras */}
          <Route path="/cart" element={<CartPage />} />

          {/* Finalização de compra */}
          <Route path="/checkout" element={<CheckoutPage />} />

          {/* Listagem de todos os agentes */}
          <Route path="/agents" element={<AllAgentsPage />} />

          {/* Agentes gratuitos */}
          <Route path="/agentes-gratuitos" element={<FreeAgentsPage />} />

          {/* Detalhes de um agente gratuito específico */}
          <Route path="/agente/:id" element={<FreeAgentPage />} />

          {/* ========================================
              ROTAS DE VENDEDOR
              ======================================== */}

          {/* Dashboard do vendedor - Gerencia produtos e vendas */}
          <Route path="/seller/dashboard" element={<SellerDashboard />} />

          {/* Adicionar novo produto/agente */}
          <Route path="/add-product" element={<AddProductPage />} />

          {/* ========================================
              ROTAS DE USUÁRIO
              ======================================== */}

          {/* Perfil do usuário */}
          <Route path="/profile" element={<ProfilePage />} />

          {/* ========================================
              ROTAS INFORMATIVAS
              ======================================== */}

          {/* Sobre nós */}
          <Route path="/about" element={<AboutPage />} />

          {/* Como funciona */}
          <Route path="/how-it-works" element={<HowItWorksPage />} />

          {/* Central de ajuda */}
          <Route path="/help" element={<HelpCenterPage />} />

          {/* Política de privacidade */}
          <Route path="/privacy" element={<PrivacyPolicyPage />} />

          {/* ========================================
              ROTA 404 - SEMPRE POR ÚLTIMO
              ======================================== */}

          {/* IMPORTANTE: Adicione novas rotas ACIMA desta linha */}
          {/* Esta rota captura qualquer caminho não definido */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
