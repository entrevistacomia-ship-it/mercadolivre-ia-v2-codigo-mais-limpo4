import { useState, useEffect } from "react";
import { Search, Filter, Grid2x2 as Grid, List, Star, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { supabase, Agent } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const FreeAgentsPage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFreeAgents = async () => {
      try {
        const { data, error } = await supabase
          .from("agents")
          .select("*")
          .eq("is_free", true)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setAgents(data || []);
      } catch (error) {
        console.error("Erro ao carregar agentes gratuitos:", error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar os agentes gratuitos.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFreeAgents();
  }, []);

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Agentes Gratuitos
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore nossa coleção de agentes de automação totalmente gratuitos
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-80 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Buscar</h3>

                <div className="space-y-4">
                  <div>
                    <div className="relative">
                      <Input
                        placeholder="Nome do agente..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  {filteredAgents.length} agentes encontrados
                </span>
              </div>

              <div className="flex items-center gap-4">
                <Select defaultValue="newest">
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Mais Recentes</SelectItem>
                    <SelectItem value="oldest">Mais Antigos</SelectItem>
                    <SelectItem value="name">Nome A-Z</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Carregando agentes...</p>
              </div>
            ) : filteredAgents.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Nenhum agente gratuito encontrado.</p>
              </div>
            ) : (
              <div className={viewMode === 'grid'
                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                : "space-y-4"
              }>
                {filteredAgents.map((agent) => (
                  <Card key={agent.id} className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 overflow-hidden ${
                    viewMode === 'list' ? 'flex flex-row' : ''
                  }`}>
                    <div className={viewMode === 'list' ? 'w-48 flex-shrink-0' : 'relative'}>
                      <div className={`bg-gradient-to-br from-green-600/10 to-green-600/5 flex items-center justify-center ${
                        viewMode === 'list' ? 'h-full' : 'h-48'
                      }`}>
                        {agent.images && agent.images.length > 0 ? (
                          <img
                            src={agent.images[0]}
                            alt={agent.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-6xl opacity-20">🎁</div>
                        )}
                      </div>

                      {viewMode === 'grid' && (
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-green-600 hover:bg-green-700">Gratuito</Badge>
                        </div>
                      )}
                    </div>

                    <CardContent className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                      <div className={viewMode === 'list' ? 'flex justify-between h-full' : ''}>
                        <div className={viewMode === 'list' ? 'flex-1' : ''}>
                          <h3 className="font-semibold text-primary mb-2 line-clamp-1 group-hover:text-accent transition-colors">
                            {agent.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {agent.description}
                          </p>

                          <div className="flex items-center gap-4 mb-3 text-sm">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-warning text-warning" />
                              <span className="font-medium">4.8</span>
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Download className="h-3 w-3" />
                              <span className="text-xs">500+</span>
                            </div>
                          </div>
                        </div>

                        {viewMode === 'list' && (
                          <div className="flex flex-col justify-between items-end ml-4">
                            <Badge className="bg-green-600 hover:bg-green-700">Gratuito</Badge>
                          </div>
                        )}
                      </div>
                    </CardContent>

                    <CardFooter className={`p-4 pt-0 ${viewMode === 'list' ? 'flex items-end' : ''}`}>
                      <Button
                        asChild
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                        size="sm"
                      >
                        <Link to={`/agente/${agent.id}`}>
                          <Download className="h-4 w-4 mr-2" />
                          Download Gratuito
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FreeAgentsPage;
