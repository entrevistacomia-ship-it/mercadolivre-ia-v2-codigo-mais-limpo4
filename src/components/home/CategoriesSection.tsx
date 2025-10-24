import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Mail, ShoppingBag, ChartBar as BarChart3, Database, MessageSquare, Zap, FileText, Settings, ArrowRight, TrendingUp } from "lucide-react";
import { useState } from "react";

const categories = [
  {
    icon: Mail,
    title: "Automação de Marketing",
    slug: "marketing",
    description: "Email marketing, leads, campanhas",
    count: "45+ agentes",
    color: "text-accent"
  },
  {
    icon: ShoppingBag,
    title: "Integração de E-commerce",
    slug: "vendas",
    description: "Lojas online, inventário, pedidos",
    count: "32+ agentes",
    color: "text-primary"
  },
  {
    icon: BarChart3,
    title: "Análise de Dados",
    slug: "analise-dados",
    description: "Relatórios, dashboards, métricas",
    count: "28+ agentes",
    color: "text-secondary"
  },
  {
    icon: Database,
    title: "Integração de Dados",
    slug: "desenvolvimento",
    description: "APIs, bancos de dados, sync",
    count: "41+ agentes",
    color: "text-warning"
  },
  {
    icon: MessageSquare,
    title: "Comunicação",
    slug: "assistentes-virtuais",
    description: "WhatsApp, Slack, notificações",
    count: "23+ agentes",
    color: "text-accent"
  },
  {
    icon: FileText,
    title: "Documentação",
    slug: "design",
    description: "PDFs, contratos, formulários",
    count: "19+ agentes",
    color: "text-primary"
  },
  {
    icon: Settings,
    title: "Produtividade",
    slug: "assistentes-virtuais",
    description: "Tarefas, calendário, lembretes",
    count: "35+ agentes",
    color: "text-secondary"
  },
  {
    icon: Zap,
    title: "Automação Geral",
    slug: "desenvolvimento",
    description: "Workflows customizados",
    count: "52+ agentes",
    color: "text-warning"
  }
];

const CategoriesSection = () => {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  return (
    <section className="py-16 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(242,159,5,0.05),transparent_50%)] pointer-events-none" />
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 relative z-10">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 animate-fade-in-down">
            <TrendingUp className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Mais Populares</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 animate-fade-in-up">
            Categorias Populares
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            Explore nossas categorias e encontre o agente de automação perfeito para suas necessidades
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Link
                key={index}
                to={`/agents?category=${category.slug}`}
                className="animate-fade-in-up block"
                style={{animationDelay: `${index * 0.1}s`}}
                onMouseEnter={() => setHoveredCategory(index)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <Card
                  className="group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 border-2 border-transparent hover:border-accent/30 h-full relative overflow-hidden"
                >
                  {/* Animated Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-warning/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <CardContent className="p-6 text-center relative z-10">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center group-hover:from-accent/20 group-hover:to-warning/10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-sm group-hover:shadow-xl relative ${category.color}`}>
                      <IconComponent className="h-8 w-8 transition-all duration-500 group-hover:scale-125" />

                      {/* Icon Glow Effect */}
                      {hoveredCategory === index && (
                        <div className="absolute inset-0 bg-accent/30 rounded-2xl blur-xl animate-pulse-slow" />
                      )}
                    </div>

                    <h3 className="font-semibold text-primary mb-2 group-hover:text-accent transition-colors duration-300 text-base relative">
                      {category.title}
                      <ArrowRight className="inline-block ml-1 w-0 h-4 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all duration-300" />
                    </h3>

                    <p className="text-sm text-muted-foreground mb-4 min-h-[40px] leading-relaxed">
                      {category.description}
                    </p>

                    <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-accent/10 to-warning/10 text-xs font-medium text-accent group-hover:from-accent group-hover:to-warning group-hover:text-accent-foreground transition-all duration-300 shadow-sm group-hover:shadow-md">
                      <span>{category.count}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;