import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Mail, ShoppingBag, ChartBar as BarChart3, Database, MessageSquare, Zap, FileText, Settings } from "lucide-react";

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
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Categorias Populares
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
              >
                <Card
                  className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-muted hover:border-accent/50"
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 mx-auto mb-4 rounded-lg bg-muted flex items-center justify-center group-hover:bg-accent/10 transition-colors ${category.color}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>

                    <h3 className="font-semibold text-primary mb-2 group-hover:text-accent transition-colors">
                      {category.title}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-3">
                      {category.description}
                    </p>

                    <div className="text-xs font-medium text-accent">
                      {category.count}
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