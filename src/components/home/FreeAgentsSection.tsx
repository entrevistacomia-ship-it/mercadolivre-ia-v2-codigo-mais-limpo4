import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Download } from "lucide-react";
import { supabase, Agent } from "@/lib/supabase";

const FreeAgentsSection = () => {
  const [freeAgents, setFreeAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFreeAgents = async () => {
      try {
        const { data, error } = await supabase
          .from("agents")
          .select("*")
          .eq("is_free", true)
          .limit(6);

        if (error) throw error;
        setFreeAgents(data || []);
      } catch (error) {
        console.error("Erro ao carregar agentes gratuitos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFreeAgents();
  }, []);

  if (loading) {
    return (
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Agentes Gratuitos</h2>
            <p className="text-muted-foreground">Carregando...</p>
          </div>
        </div>
      </section>
    );
  }

  if (freeAgents.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Agentes Gratuitos</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Descubra e baixe fluxos de automação do n8n gratuitamente. Perfeito para começar!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {freeAgents.map((agent) => (
            <Card key={agent.id} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="relative mb-4 aspect-video bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg overflow-hidden">
                  {agent.images && agent.images.length > 0 ? (
                    <img
                      src={agent.images[0]}
                      alt={agent.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Download className="w-12 h-12 text-primary/40" />
                    </div>
                  )}
                  <Badge className="absolute top-2 right-2 bg-green-500 hover:bg-green-600">
                    Grátis
                  </Badge>
                </div>

                <h3 className="text-xl font-semibold mb-2 line-clamp-2">{agent.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {agent.description}
                </p>

                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">4.8</span>
                  <span>(120+ downloads)</span>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <Link to={`/agente/${agent.id}`} className="w-full">
                  <Button className="w-full bg-green-600 hover:bg-green-700" size="lg">
                    <Download className="w-4 h-4 mr-2" />
                    Acessar
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/agentes-gratuitos">
            <Button variant="outline" size="lg">
              Ver Todos os Agentes Gratuitos
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FreeAgentsSection;
