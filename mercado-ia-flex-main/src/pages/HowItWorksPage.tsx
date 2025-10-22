import { ArrowRight, Search, ShoppingCart, Download, Headphones, CircleCheck as CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const HowItWorksPage = () => {
  const steps = [
    {
      icon: Search,
      title: "1. Encontre o Agente Ideal",
      description: "Navegue por nossa extensa biblioteca de agentes de automação ou use nossa busca inteligente para encontrar exatamente o que precisa.",
      details: [
        "Mais de 200+ agentes disponíveis",
        "Categorias organizadas por função",
        "Filtros avançados de busca",
        "Avaliações e comentários reais"
      ]
    },
    {
      icon: ShoppingCart,
      title: "2. Compre com Segurança",
      description: "Adicione ao carrinho e finalize sua compra com total segurança através do Mercado Pago.",
      details: [
        "Pagamento via PIX, cartão ou boleto",
        "Transações 100% seguras",
        "Garantia de 30 dias",
        "Suporte durante todo o processo"
      ]
    },
    {
      icon: Download,
      title: "3. Receba Instantaneamente",
      description: "Após a confirmação do pagamento, receba imediatamente o acesso ao seu agente de automação.",
      details: [
        "Download imediato",
        "Arquivos organizados e documentados",
        "Instruções de instalação incluídas",
        "Vídeos tutoriais quando disponíveis"
      ]
    },
    {
      icon: Headphones,
      title: "4. Suporte Completo",
      description: "Conte com nosso suporte técnico especializado para implementar e otimizar sua automação.",
      details: [
        "Suporte técnico por 6 meses",
        "Documentação detalhada",
        "Comunidade ativa de usuários",
        "Atualizações gratuitas"
      ]
    }
  ];

  const benefits = [
    {
      icon: CheckCircle,
      title: "Economia de Tempo",
      description: "Automatize tarefas repetitivas e foque no que realmente importa para seu negócio."
    },
    {
      icon: CheckCircle,
      title: "Redução de Custos",
      description: "Diminua custos operacionais eliminando trabalho manual desnecessário."
    },
    {
      icon: CheckCircle,
      title: "Maior Precisão",
      description: "Elimine erros humanos com processos automatizados e confiáveis."
    },
    {
      icon: CheckCircle,
      title: "Escalabilidade",
      description: "Cresça seu negócio sem aumentar proporcionalmente sua equipe."
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
              <Badge className="mb-4 bg-accent text-accent-foreground">Como Funciona</Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
                Automatize seu negócio em{" "}
                <span className="text-accent">4 passos simples</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Descubra como é fácil transformar seus processos manuais em automações 
                inteligentes que trabalham 24/7 para você.
              </p>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="space-y-16">
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                const isEven = index % 2 === 0;
                
                return (
                  <div key={index} className={`flex flex-col lg:flex-row items-center gap-12 ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center">
                          <IconComponent className="h-8 w-8" />
                        </div>
                        <div>
                          <h2 className="text-3xl font-bold text-primary">{step.title}</h2>
                        </div>
                      </div>
                      
                      <p className="text-lg text-muted-foreground mb-6">
                        {step.description}
                      </p>
                      
                      <ul className="space-y-3">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                            <span className="text-muted-foreground">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex-1">
                      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <IconComponent className="h-24 w-24 text-muted-foreground/50 mx-auto mb-4" />
                          <p className="text-muted-foreground">Demonstração Visual</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Por que escolher automação?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Descubra os benefícios que a automação pode trazer para seu negócio
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-accent/10 flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-accent" />
                      </div>
                      <CardTitle className="text-xl">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Perguntas Frequentes
              </h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Preciso ter conhecimento técnico para usar os agentes?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Não! Nossos agentes são desenvolvidos para serem plug-and-play. 
                    Cada produto vem com documentação detalhada e suporte técnico incluso.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Como funciona a garantia?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Oferecemos garantia de 30 dias. Se não ficar satisfeito com sua compra, 
                    devolvemos 100% do valor pago, sem perguntas.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Os agentes recebem atualizações?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Sim! Todos os agentes recebem atualizações gratuitas por pelo menos 6 meses, 
                    incluindo melhorias e correções.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pronto para começar?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              Explore nossa biblioteca de agentes e encontre a automação perfeita para seu negócio.
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link to="/agents">
                Explorar Agentes
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HowItWorksPage;