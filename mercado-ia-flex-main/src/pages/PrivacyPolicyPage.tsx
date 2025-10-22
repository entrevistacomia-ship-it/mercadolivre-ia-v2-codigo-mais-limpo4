import { Shield, Eye, Lock, Users, FileText, CircleAlert as AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const PrivacyPolicyPage = () => {
  const lastUpdated = "15 de Janeiro de 2024";

  const sections = [
    {
      icon: FileText,
      title: "1. Informações que Coletamos",
      content: [
        {
          subtitle: "Informações Pessoais",
          text: "Coletamos informações que você nos fornece diretamente, como nome, e-mail, telefone e endereço quando você se cadastra, faz uma compra ou entra em contato conosco."
        },
        {
          subtitle: "Informações de Uso",
          text: "Coletamos automaticamente informações sobre como você usa nossa plataforma, incluindo páginas visitadas, tempo de permanência e interações com o conteúdo."
        },
        {
          subtitle: "Informações de Pagamento",
          text: "Processamos informações de pagamento através do Mercado Pago. Não armazenamos dados completos de cartão de crédito em nossos servidores."
        }
      ]
    },
    {
      icon: Eye,
      title: "2. Como Usamos suas Informações",
      content: [
        {
          subtitle: "Prestação de Serviços",
          text: "Utilizamos suas informações para processar pedidos, fornecer suporte ao cliente e melhorar nossos serviços."
        },
        {
          subtitle: "Comunicação",
          text: "Enviamos e-mails sobre pedidos, atualizações de produtos e, com seu consentimento, materiais promocionais."
        },
        {
          subtitle: "Segurança",
          text: "Usamos suas informações para detectar e prevenir fraudes, proteger nossa plataforma e garantir a segurança dos usuários."
        }
      ]
    },
    {
      icon: Users,
      title: "3. Compartilhamento de Informações",
      content: [
        {
          subtitle: "Vendedores",
          text: "Compartilhamos informações necessárias com vendedores para processar pedidos e fornecer suporte pós-venda."
        },
        {
          subtitle: "Prestadores de Serviços",
          text: "Compartilhamos informações com terceiros que nos ajudam a operar nossa plataforma, como processadores de pagamento e serviços de e-mail."
        },
        {
          subtitle: "Requisitos Legais",
          text: "Podemos divulgar informações quando exigido por lei ou para proteger nossos direitos e os de nossos usuários."
        }
      ]
    },
    {
      icon: Lock,
      title: "4. Segurança dos Dados",
      content: [
        {
          subtitle: "Medidas de Proteção",
          text: "Implementamos medidas técnicas e organizacionais apropriadas para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição."
        },
        {
          subtitle: "Criptografia",
          text: "Utilizamos criptografia SSL/TLS para proteger dados em trânsito e criptografia para dados armazenados."
        },
        {
          subtitle: "Acesso Limitado",
          text: "Limitamos o acesso às suas informações pessoais apenas aos funcionários e prestadores de serviços que precisam dessas informações para desempenhar suas funções."
        }
      ]
    },
    {
      icon: Shield,
      title: "5. Seus Direitos",
      content: [
        {
          subtitle: "Acesso e Correção",
          text: "Você tem o direito de acessar, corrigir ou atualizar suas informações pessoais a qualquer momento através de sua conta."
        },
        {
          subtitle: "Exclusão",
          text: "Você pode solicitar a exclusão de suas informações pessoais, sujeito a certas limitações legais e contratuais."
        },
        {
          subtitle: "Portabilidade",
          text: "Você tem o direito de receber suas informações pessoais em um formato estruturado e legível por máquina."
        }
      ]
    },
    {
      icon: AlertCircle,
      title: "6. Cookies e Tecnologias Similares",
      content: [
        {
          subtitle: "Uso de Cookies",
          text: "Utilizamos cookies e tecnologias similares para melhorar sua experiência, analisar o uso da plataforma e personalizar conteúdo."
        },
        {
          subtitle: "Controle de Cookies",
          text: "Você pode controlar e gerenciar cookies através das configurações do seu navegador."
        },
        {
          subtitle: "Cookies Essenciais",
          text: "Alguns cookies são essenciais para o funcionamento da plataforma e não podem ser desabilitados."
        }
      ]
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
              <Badge className="mb-4 bg-accent text-accent-foreground">Política de Privacidade</Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
                Sua privacidade é nossa{" "}
                <span className="text-accent">prioridade</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Entenda como coletamos, usamos e protegemos suas informações pessoais 
                na plataforma Mercado Livre-IA.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <span>Última atualização:</span>
                <Badge variant="outline">{lastUpdated}</Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="mb-12">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Shield className="h-6 w-6 text-accent" />
                    Compromisso com a Privacidade
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    O Mercado Livre-IA está comprometido em proteger e respeitar sua privacidade. 
                    Esta Política de Privacidade explica como coletamos, usamos, divulgamos e 
                    protegemos suas informações quando você usa nossa plataforma.
                  </p>
                  <p className="text-muted-foreground">
                    Ao usar nossos serviços, você concorda com a coleta e uso de informações 
                    de acordo com esta política. Recomendamos que você leia este documento 
                    cuidadosamente para entender nossas práticas.
                  </p>
                </CardContent>
              </Card>

              {/* Sections */}
              <div className="space-y-8">
                {sections.map((section, index) => {
                  const IconComponent = section.icon;
                  return (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                          <IconComponent className="h-6 w-6 text-accent" />
                          {section.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {section.content.map((item, itemIndex) => (
                          <div key={itemIndex}>
                            <h4 className="font-semibold text-primary mb-2">{item.subtitle}</h4>
                            <p className="text-muted-foreground">{item.text}</p>
                            {itemIndex < section.content.length - 1 && (
                              <Separator className="mt-4" />
                            )}
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Contact Information */}
              <Card className="mt-12">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <FileText className="h-6 w-6 text-accent" />
                    Contato sobre Privacidade
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Se você tiver dúvidas sobre esta Política de Privacidade ou sobre como 
                    tratamos suas informações pessoais, entre em contato conosco:
                  </p>
                  <div className="space-y-2 text-muted-foreground">
                    <p><strong>E-mail:</strong> privacidade@mercadolivre-ia.com</p>
                    <p><strong>Telefone:</strong> (11) 99999-9999</p>
                    <p><strong>Endereço:</strong> São Paulo, SP - Brasil</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Responderemos às suas solicitações dentro de 30 dias úteis.
                  </p>
                </CardContent>
              </Card>

              {/* Updates */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <AlertCircle className="h-6 w-6 text-accent" />
                    Atualizações desta Política
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Podemos atualizar nossa Política de Privacidade periodicamente. 
                    Notificaremos você sobre quaisquer mudanças publicando a nova 
                    Política de Privacidade nesta página e atualizando a data de 
                    "última atualização". Recomendamos que você revise esta política 
                    periodicamente para se manter informado sobre como protegemos suas informações.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;