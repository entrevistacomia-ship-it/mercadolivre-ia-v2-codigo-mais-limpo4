import { Search, ArrowRight, Sparkles, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted/50 to-background py-20 md:py-32">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(242,159,5,0.1),transparent_50%)] animate-pulse-slow" />
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(120,119,198,0.08)_50%,transparent_75%)] bg-[length:20px_20px] animate-gradient-shift"
           style={{backgroundSize: "400% 400%"}} />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(242,159,5,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(242,159,5,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      {/* Floating Particles Enhanced */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-3 h-3 bg-gradient-to-br from-accent to-warning rounded-full animate-bounce-subtle blur-sm opacity-60" style={{animationDelay: "0s"}} />
        <div className="absolute top-40 right-20 w-4 h-4 bg-gradient-to-br from-primary to-accent rounded-full animate-bounce-subtle blur-sm opacity-50" style={{animationDelay: "0.5s"}} />
        <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-gradient-to-br from-warning to-accent rounded-full animate-bounce-subtle blur-sm opacity-60" style={{animationDelay: "1s"}} />
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-accent rounded-full animate-bounce-subtle opacity-70" style={{animationDelay: "1.5s"}} />
        <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-warning rounded-full animate-bounce-subtle opacity-60" style={{animationDelay: "2s"}} />
        <div className="absolute bottom-1/4 right-1/3 w-3 h-3 bg-primary/40 rounded-full animate-bounce-subtle blur-sm opacity-50" style={{animationDelay: "2.5s"}} />

        {/* Sparkle Effects */}
        <Sparkles className="absolute top-32 right-1/4 w-6 h-6 text-accent animate-pulse-slow opacity-30" style={{animationDelay: "0.3s"}} />
        <Sparkles className="absolute bottom-40 left-1/3 w-5 h-5 text-warning animate-pulse-slow opacity-40" style={{animationDelay: "1.2s"}} />
        <Zap className="absolute top-1/4 left-1/4 w-5 h-5 text-accent animate-bounce-subtle opacity-30" style={{animationDelay: "0.8s"}} />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 leading-tight animate-fade-in-up">
            Automatize seu trabalho com{" "}
            <span className="text-accent relative inline-block group">
              <span className="relative z-10">agentes de automação</span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-warning to-accent rounded animate-gradient-shift bg-[length:200%_100%]" />
              <span className="absolute -inset-1 bg-gradient-to-r from-accent/10 via-warning/10 to-accent/10 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            </span>{" "}
            baseados em n8n
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-up" style={{animationDelay: "0.2s"}}>
            Simplifique tarefas repetitivas e integre seus sistemas, sem precisar de conhecimento técnico.
            Encontre soluções prontas para usar.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8 px-4 sm:px-0 animate-fade-in-up" style={{animationDelay: "0.4s"}}>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-accent via-warning to-accent rounded-2xl blur-md opacity-0 group-hover:opacity-30 group-focus-within:opacity-30 transition-opacity duration-500 animate-gradient-shift bg-[length:200%_100%]"></div>
              <Input
                type="text"
                placeholder="O que você quer automatizar hoje?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="relative h-12 sm:h-14 pl-12 sm:pl-14 pr-20 sm:pr-24 text-base sm:text-lg border-2 border-accent/20 focus:border-accent transition-all duration-300 hover:border-accent/40 shadow-lg focus:shadow-2xl hover:shadow-xl bg-background/80 backdrop-blur-sm"
              />
              <Search className="absolute left-4 sm:left-5 top-3 sm:top-5 h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground group-hover:text-accent group-focus-within:text-accent transition-all duration-300 group-hover:scale-110" />
              <Button
                size="sm"
                className="absolute right-1 sm:right-2 top-1 sm:top-2 h-10 sm:h-10 px-3 sm:px-4 bg-gradient-to-r from-accent to-warning hover:from-accent/90 hover:to-warning/90 text-accent-foreground text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-md"
              >
                <span className="hidden sm:inline">Buscar</span>
                <span className="sm:hidden">🔍</span>
                <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4 hidden sm:inline transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{animationDelay: "0.6s"}}>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-accent to-warning hover:from-accent/90 hover:to-warning/90 text-accent-foreground px-8 transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg group relative overflow-hidden"
            >
              <Link to="/agents" className="relative z-10">
                <span className="absolute inset-0 bg-gradient-to-r from-warning to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative">Ver todos os agentes</span>
                <ArrowRight className="ml-2 h-4 w-4 inline transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 transition-all duration-300 hover:scale-105 hover:shadow-lg group"
            >
              <Link to="/how-it-works">
                Como funciona?
                <Sparkles className="ml-2 h-4 w-4 inline opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-muted-foreground text-muted-foreground hover:bg-muted hover:text-foreground px-8 transition-all duration-300 hover:scale-105 hover:shadow-lg group"
            >
              <Link to="/add-product">
                Painel do Vendedor
                <Zap className="ml-2 h-4 w-4 inline opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-6 sm:gap-8 text-sm text-muted-foreground animate-fade-in-up" style={{animationDelay: "0.8s"}}>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/60 backdrop-blur-sm border border-accent/20 transition-all duration-300 hover:border-accent hover:text-foreground hover:scale-105 hover:shadow-lg group">
              <Shield className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
              <span className="font-medium">Pagamento seguro via Mercado Pago</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/60 backdrop-blur-sm border border-accent/20 transition-all duration-300 hover:border-accent hover:text-foreground hover:scale-105 hover:shadow-lg group">
              <div className="w-2 h-2 bg-gradient-to-r from-accent to-warning rounded-full animate-pulse-slow group-hover:scale-125 transition-transform" />
              <span className="font-medium">Vendedores verificados</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/60 backdrop-blur-sm border border-accent/20 transition-all duration-300 hover:border-accent hover:text-foreground hover:scale-105 hover:shadow-lg group">
              <Zap className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
              <span className="font-medium">Entrega imediata</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;