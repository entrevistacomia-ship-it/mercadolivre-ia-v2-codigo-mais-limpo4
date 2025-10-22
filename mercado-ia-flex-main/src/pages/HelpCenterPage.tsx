import { Search, MessageCircle, Mail, Phone, Book, Video, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const HelpCenterPage = () => {
  const categories = [
    {
      icon: Book,
      title: "Primeiros Passos",
      description: "Guias básicos para começar",
      articles: 12
    },
    {
      icon: Video,
      title: "Tutoriais",
      description: "Vídeos explicativos",
      articles: 8
    },
    {
      icon: Users,
      title: "Para Vendedores",
      description: "Como vender na plataforma",
      articles: 15
    },
    {
      icon: MessageCircle,
      title: "Suporte Técnico",
      description: "Resolução de problemas",
      articles: 23
    }
  ];

  const faqs = [
    {
      question: "Como faço para comprar um agente de automação?",
      answer: "É muito simples! Navegue pela nossa biblioteca, escolha o agente desejado, adicione ao carrinho e finalize a compra. Após a confirmação do pagamento, você receberá o acesso imediatamente."
    },
    {
      question: "Preciso ter conhecimento técnico para usar os agentes?",
      answer: "Não necessariamente. Nossos agentes são desenvolvidos para serem o mais user-friendly possível. Cada produto vem com documentação detalhada e oferecemos suporte técnico por 6 meses."
    },
    {
      question: "Como funciona a garantia de 30 dias?",
      answer: "Se você não ficar satisfeito com sua compra por qualquer motivo, pode solicitar o reembolso em até 30 dias. Devolvemos 100% do valor pago, sem complicações."
    },
    {
      question: "Posso vender meus próprios agentes na plataforma?",
      answer: "Sim! Temos um programa para vendedores. Você pode se cadastrar, passar por nossa verificação e começar a vender seus agentes de automação para nossa comunidade."
    },
    {
      question: "Os agentes funcionam com qualquer versão do n8n?",
      answer: "Nossos agentes são testados com as versões mais recentes do n8n. Sempre indicamos a versão mínima necessária na descrição do produto."
    },
    {
      question: "Como recebo suporte técnico?",
      answer: "Oferecemos suporte através de chat, email e nossa comunidade. Vendedores premium também têm acesso a suporte por videochamada."
    },
    {
      question: "Posso personalizar os agentes após a compra?",
      answer: "Sim! Todos os agentes vêm com código fonte e documentação para que você possa personalizar conforme suas necessidades específicas."
    },
    {
      question: "Como funciona o sistema de avaliações?",
      answer: "Após a compra, você pode avaliar o produto e deixar comentários. Isso ajuda outros usuários a tomar decisões informadas e melhora a qualidade geral da plataforma."
    }
  ];

  const contactOptions = [
    {
      icon: MessageCircle,
      title: "Chat ao Vivo",
      description: "Resposta em até 5 minutos",
      action: "Iniciar Chat",
      available: "24/7"
    },
    {
      icon: Mail,
      title: "Email",
      description: "contato@mercadolivre-ia.com",
      action: "Enviar Email",
      available: "Resposta em 24h"
    },
    {
      icon: Phone,
      title: "WhatsApp",
      description: "(11) 99999-9999",
      action: "Chamar no WhatsApp",
      available: "Seg-Sex 9h-18h"
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
              <Badge className="mb-4 bg-accent text-accent-foreground">Central de Ajuda</Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
                Como podemos{" "}
                <span className="text-accent">ajudar você?</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Encontre respostas rápidas para suas dúvidas ou entre em contato 
                com nossa equipe de suporte especializada.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Digite sua dúvida aqui..."
                    className="h-14 pl-14 pr-4 text-lg border-2 border-accent/20 focus:border-accent"
                  />
                  <Search className="absolute left-5 top-5 h-6 w-6 text-muted-foreground" />
                  <Button 
                    size="lg" 
                    className="absolute right-2 top-2 h-10 bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    Buscar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Categorias de Ajuda
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Navegue pelas categorias para encontrar o que precisa
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <Card key={index} className="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1">
                    <CardHeader className="text-center">
                      <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-accent/10 flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-accent" />
                      </div>
                      <CardTitle className="text-xl">{category.title}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <Badge variant="secondary">{category.articles} artigos</Badge>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Perguntas Frequentes
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Respostas para as dúvidas mais comuns dos nossos usuários
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                    <AccordionTrigger className="text-left hover:no-underline">
                      <span className="font-semibold">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pt-2 pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Ainda precisa de ajuda?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Nossa equipe está pronta para ajudar você
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {contactOptions.map((option, index) => {
                const IconComponent = option.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-accent/10 flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-accent" />
                      </div>
                      <CardTitle className="text-xl">{option.title}</CardTitle>
                      <CardDescription>{option.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Badge variant="outline">{option.available}</Badge>
                      <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                        {option.action}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Junte-se à nossa comunidade
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              Conecte-se com outros usuários, compartilhe experiências e aprenda 
              com especialistas em automação.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Discord da Comunidade
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Fórum de Discussões
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HelpCenterPage;