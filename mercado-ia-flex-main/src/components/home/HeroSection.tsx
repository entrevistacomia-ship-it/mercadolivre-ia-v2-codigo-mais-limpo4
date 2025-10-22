import { Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted to-background py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(120,119,198,0.1)_50%,transparent_75%)] bg-[length:20px_20px]" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 leading-tight">
            Automatize seu trabalho com{" "}
            <span className="text-accent">agentes de automação</span>{" "}
            baseados em n8n
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Simplifique tarefas repetitivas e integre seus sistemas, sem precisar de conhecimento técnico. 
            Encontre soluções prontas para usar.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8 px-4 sm:px-0">
            <div className="relative">
              <Input
                type="text"
                placeholder="O que você quer automatizar hoje?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 sm:h-14 pl-12 sm:pl-14 pr-20 sm:pr-24 text-base sm:text-lg border-2 border-accent/20 focus:border-accent"
              />
              <Search className="absolute left-4 sm:left-5 top-3 sm:top-5 h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
              <Button 
                size="sm"
                className="absolute right-1 sm:right-2 top-1 sm:top-2 h-10 sm:h-10 px-3 sm:px-4 bg-accent hover:bg-accent/90 text-accent-foreground text-sm sm:text-base"
              >
                <span className="hidden sm:inline">Buscar</span>
                <span className="sm:hidden">🔍</span>
                <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4 hidden sm:inline" />
              </Button>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-8"
            >
              <Link to="/agents">Ver todos os agentes</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8"
            >
              <Link to="/how-it-works">Como funciona?</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-muted-foreground text-muted-foreground hover:bg-muted px-8"
            >
              <Link to="/add-product">Painel do Vendedor</Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span>Pagamento seguro via Mercado Pago</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span>Vendedores verificados</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span>Entrega imediata</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;