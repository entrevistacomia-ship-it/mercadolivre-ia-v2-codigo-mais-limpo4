import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Download, Sparkles, TrendingUp, Eye, Heart } from "lucide-react";
import { supabase, Agent } from "@/lib/supabase";

const FreeAgentsSection = () => {
  const [freeAgents, setFreeAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);

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
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 animate-pulse-slow">Agentes Gratuitos</h2>
            <div className="inline-block h-4 w-32 bg-muted rounded animate-shimmer bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%]"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-muted via-muted/50 to-muted animate-shimmer bg-[length:200%_100%]" />
                <CardContent className="p-6 space-y-3">
                  <div className="h-4 bg-muted rounded animate-pulse" />
                  <div className="h-3 bg-muted rounded w-3/4 animate-pulse" />
                  <div className="h-6 bg-muted rounded w-1/2 animate-pulse mt-4" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (freeAgents.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-4 bg-muted/30 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(34,197,94,0.08),transparent_50%)] pointer-events-none" />
      <div className="absolute top-20 right-20 w-32 h-32 bg-green-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-green-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 animate-fade-in-down">
            <Sparkles className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-600">100% Grátis</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary animate-fade-in-up">
            Agentes Gratuitos
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            Descubra e baixe fluxos de automação do n8n gratuitamente. Perfeito para começar!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {freeAgents.map((agent, index) => (
            <Card
              key={agent.id}
              className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 border-transparent hover:border-green-500/30 animate-fade-in-up relative overflow-hidden"
              style={{animationDelay: `${index * 0.1}s`}}
              onMouseEnter={() => setHoveredAgent(agent.id)}
              onMouseLeave={() => setHoveredAgent(null)}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardContent className="p-6 relative z-10">
                <div className="relative mb-4 aspect-video bg-gradient-to-br from-green-500/10 via-primary/5 to-green-500/5 rounded-lg overflow-hidden group-hover:scale-105 transition-transform duration-500">
                  {agent.images && agent.images.length > 0 ? (
                    <img
                      src={agent.images[0]}
                      alt={agent.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center relative">
                      <Download className="w-12 h-12 text-green-600/40 transition-all duration-300 group-hover:scale-110 group-hover:text-green-600/60" />
                      {hoveredAgent === agent.id && (
                        <>
                          <Sparkles className="absolute top-4 right-4 w-4 h-4 text-green-600 animate-pulse-slow" />
                          <Sparkles className="absolute bottom-4 left-4 w-3 h-3 text-green-600 animate-pulse-slow" style={{animationDelay: '0.5s'}} />
                        </>
                      )}
                    </div>
                  )}
                  <Badge className="absolute top-2 right-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg animate-scale-in border-0">
                    <Sparkles className="w-3 h-3 mr-1 inline" />
                    Grátis
                  </Badge>

                  {/* Quick Actions */}
                  <div className="absolute top-2 left-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-4 group-hover:translate-x-0">
                    <Button size="sm" variant="secondary" className="h-7 w-7 p-0 shadow-lg hover:scale-110 transition-transform backdrop-blur-md bg-background/80">
                      <Heart className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="secondary" className="h-7 w-7 p-0 shadow-lg hover:scale-110 transition-transform backdrop-blur-md bg-background/80">
                      <Eye className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">{agent.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                  {agent.description}
                </p>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-foreground">4.8</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    <span>120+ downloads</span>
                  </div>
                  <div className="flex items-center gap-1 text-green-600">
                    <TrendingUp className="w-3 h-3" />
                    <span className="font-medium">Popular</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0 relative z-10">
                <Link to={`/agente/${agent.id}`} className="w-full">
                  <Button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-xl group/btn relative overflow-hidden" size="lg">
                    <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
                    <Download className="w-4 h-4 mr-2 relative z-10 transition-transform group-hover/btn:scale-110" />
                    <span className="relative z-10">Acessar Agente</span>
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <Link to="/agentes-gratuitos">
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 transition-all duration-300 hover:scale-105 hover:shadow-lg group"
            >
              Ver Todos os Agentes Gratuitos
              <Sparkles className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FreeAgentsSection;
