/**
 * ============================================================================
 * INDEX.TSX - PÁGINA PRINCIPAL DO MARKETPLACE
 * ============================================================================
 *
 * Esta é a página inicial da aplicação, acessível pela rota "/" ou "/home".
 * É a primeira página que os usuários veem ao acessar o site.
 *
 * ESTRUTURA DA PÁGINA (de cima para baixo):
 * 1. Header - Cabeçalho com logo, navegação e botões de login/cart
 * 2. HeroSection - Banner principal com título, descrição e CTA
 * 3. CategoriesSection - Categorias de produtos/agentes disponíveis
 * 4. FreeAgentsSection - Seção destacando agentes gratuitos
 * 5. FeaturedProducts - Produtos/agentes em destaque
 * 6. TestimonialsSection - Depoimentos de clientes
 * 7. Footer - Rodapé com links e informações
 *
 * IMPORTANTE PARA AGENTES IA:
 * - Esta página é COMPLETA e inclui todos os componentes listados acima
 * - Se você está vendo apenas uma "página de busca simples", você NÃO está
 *   nesta página. Verifique a rota correta.
 * - IDs (categorias, free-agents, etc) permitem navegação por âncora (#categorias)
 * - Layout responsivo (funciona em mobile e desktop)
 *
 * ROTAS QUE RENDERIZAM ESTA PÁGINA:
 * - /
 * - /home
 * ============================================================================
 */

// ============================================================================
// IMPORTS DE COMPONENTES DE LAYOUT
// ============================================================================
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// ============================================================================
// IMPORTS DE SEÇÕES DA PÁGINA INICIAL
// ============================================================================
import HeroSection from "@/components/home/HeroSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import FreeAgentsSection from "@/components/home/FreeAgentsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";

/**
 * COMPONENTE INDEX
 * Renderiza a página principal completa do marketplace
 */
const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Cabeçalho - Sempre visível no topo */}
      <Header />

      {/* Conteúdo Principal */}
      <main>
        {/* Seção Hero - Banner principal com CTA */}
        <HeroSection />

        {/* Seção de Categorias - ID permite scroll direto via #categorias */}
        <div id="categorias">
          <CategoriesSection />
        </div>

        {/* Seção de Agentes Gratuitos - ID permite scroll direto via #free-agents */}
        <div id="free-agents">
          <FreeAgentsSection />
        </div>

        {/* Produtos em Destaque - ID permite scroll direto via #featured */}
        <div id="featured">
          <FeaturedProducts />
        </div>

        {/* Depoimentos de Clientes - ID permite scroll direto via #testimonials */}
        <div id="testimonials">
          <TestimonialsSection />
        </div>
      </main>

      {/* Rodapé - Sempre visível no final */}
      <Footer />
    </div>
  );
};

export default Index;
