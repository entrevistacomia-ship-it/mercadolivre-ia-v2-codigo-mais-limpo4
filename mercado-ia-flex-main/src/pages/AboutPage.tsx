import { ArrowRight, Target, Users, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const AboutPage = () => {
  const values = [
    {
      icon: Target,
      title: "Missão",
      description: "Democratizar a automação, tornando-a acessível para todos os tipos de negócios, independente do conhecimento técnico."
    },
    {
      icon: Users,
      title: "Comunidade",
      description: "Construir uma comunidade forte de vendedores e compradores que se ajudam mutuamente a crescer."
    },
    {
      icon: Zap,
      title: "Inovação",
      description: "Estar sempre na vanguarda das tecnologias de automação, oferecendo soluções modernas e eficientes."
    },
    {
      icon: Shield,
      title: "Confiança",
      description: "Garantir segurança e qualidade em todas as transações e produtos disponibilizados na plataforma."
    }
  ];

  const timeline = [
    {
      year: "2024",
      title: "Lançamento da Plataforma",
      description: "Início das operações com foco em agentes de automação baseados em n8n."
    },
    {
      year: "2024",
      title: "Primeiros Vendedores",
      description: "Onboarding dos primeiros vendedores especialistas em automação."
    },
    {
      year: "2024",
      title: "Expansão de Categorias",
      description: "Ampliação para diferentes categorias de automação e integração."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-background via-muted to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-accent text-accent-foreground">Sobre Nós</Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
                Transformando negócios através da{" "}
                <span className="text-accent">automação inteligente</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                O Mercado Livre-IA é a primeira plataforma brasileira dedicada exclusivamente 
                à venda de agentes de automação baseados em n8n, conectando especialistas 
                em automação com empresas que buscam otimizar seus processos.
              </p>
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Conheça Nossa História
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Nossos Valores
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Os princípios que guiam nossa missão de democratizar a automação
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-accent/10 flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-accent" />
                      </div>
                      <CardTitle className="text-xl">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Nossa Jornada
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Acompanhe os principais marcos da nossa trajetória
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              {timeline.map((item, index) => (
                <div key={index} className="flex gap-6 mb-8 last:mb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    {index < timeline.length - 1 && (
                      <div className="w-0.5 h-16 bg-accent/30 mt-4" />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <Badge variant="outline" className="mb-2">{item.year}</Badge>
                    <h3 className="text-xl font-semibold text-primary mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pronto para automatizar seu negócio?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              Junte-se a centenas de empresas que já transformaram seus processos 
              com nossos agentes de automação.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Explorar Produtos
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Tornar-se Vendedor
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;