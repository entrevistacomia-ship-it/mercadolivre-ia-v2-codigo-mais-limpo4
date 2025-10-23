import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import FreeAgentsSection from "@/components/home/FreeAgentsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <div id="categorias">
          <CategoriesSection />
        </div>
        <div id="free-agents">
          <FreeAgentsSection />
        </div>
        <div id="featured">
          <FeaturedProducts />
        </div>
        <div id="testimonials">
          <TestimonialsSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
