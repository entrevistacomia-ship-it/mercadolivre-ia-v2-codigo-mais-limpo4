import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Star, Users, ChevronRight, ExternalLink } from "lucide-react";
import { supabase, Agent } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";

const FreeAgentPage = () => {
  const { id } = useParams<{ id: string }>();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgent = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from("agents")
          .select("*")
          .eq("id", id)
          .eq("is_free", true)
          .single();

        if (error) throw error;
        setAgent(data);
      } catch (error) {
        console.error("Erro ao carregar agente:", error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar o agente gratuito.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAgent();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <p className="text-center">Carregando...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <p className="text-center">Agente não encontrado.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/" className="hover:text-foreground">
            Agentes Gratuitos
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">{agent.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Imagem do Agente */}
          <div className="space-y-4">
            <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg overflow-hidden">
              {agent.images && agent.images.length > 0 ? (
                <img
                  src={agent.images[0]}
                  alt={agent.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Download className="w-24 h-24 text-primary/40" />
                </div>
              )}
            </div>
          </div>

          {/* Informações do Agente */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-3 bg-green-600 hover:bg-green-700">
                Agente Gratuito
              </Badge>
              <h1 className="text-4xl font-bold mb-4">{agent.name}</h1>
              <p className="text-lg text-muted-foreground mb-6">
                {agent.description}
              </p>

              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">4.8</span>
                  <span className="text-muted-foreground">(120 avaliações)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-muted-foreground" />
                  <span className="text-muted-foreground">500+ downloads</span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Pronto para usar?</h3>
              <p className="text-muted-foreground">
                Clique no botão abaixo para acessar o fluxo de automação do n8n e começar a usar imediatamente.
              </p>
              
              {agent.n8n_url ? (
                <a
                  href={agent.n8n_url}
                  download="fluxo-n8n.json"
                  className="inline-flex items-center justify-center w-full bg-green-600 hover:bg-green-700 text-white text-lg py-6 px-8 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download do Fluxo n8n
                </a>
              ) : (
                <Button
                  size="lg"
                  className="w-full bg-green-600 hover:bg-green-700 text-lg py-6"
                  disabled
                >
                  <Download className="w-5 h-5 mr-2" />
                  Link não disponível
                </Button>
              )}
            </div>

            <Card className="bg-muted/50">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-3">✨ O que você vai receber:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ Fluxo de automação completo do n8n</li>
                  <li>✓ Pronto para importar e usar</li>
                  <li>✓ Documentação incluída</li>
                  <li>✓ 100% gratuito, sem custos ocultos</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detalhes em Tabs */}
        <Tabs defaultValue="description" className="mb-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Descrição</TabsTrigger>
            <TabsTrigger value="features">Recursos</TabsTrigger>
            <TabsTrigger value="reviews">Avaliações</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Sobre este Agente</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {agent.description}
                </p>
                <div className="mt-6">
                  <h4 className="font-semibold mb-3">Como usar:</h4>
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li>Clique no botão "Download do Fluxo n8n"</li>
                    <li>Importe o arquivo JSON no seu n8n</li>
                    <li>Configure as credenciais necessárias</li>
                    <li>Ative o fluxo e comece a usar!</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Recursos Incluídos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-600/10 flex items-center justify-center flex-shrink-0">
                      <Download className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Fácil Importação</h4>
                      <p className="text-sm text-muted-foreground">
                        Importação com um clique no n8n
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-600/10 flex items-center justify-center flex-shrink-0">
                      <Star className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Testado e Aprovado</h4>
                      <p className="text-sm text-muted-foreground">
                        Fluxo verificado e otimizado
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Avaliações dos Usuários</h3>
                <p className="text-muted-foreground">
                  Em breve você verá avaliações de outros usuários aqui.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default FreeAgentPage;
