import { useState, useEffect } from "react";
import { Search, Filter, Grid2x2 as Grid, List, Star, Download, Eye, ShoppingCart } from "lucide-react";
import { supabase, Agent, Category } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const AllAgentsPage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadAgents();
    loadCategories();
  }, []);

  const loadAgents = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .eq('is_free', false)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setAgents(data);
    }
    setLoading(false);
  };

  const loadCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('name')
      .order('name');

    if (!error && data) {
      setCategories(['Todos', ...data.map(c => c.name)]);
    }
  };

  const handleAddToCart = async (agentId: string) => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Você precisa estar logado para adicionar ao carrinho",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    try {
      await addToCart(agentId);
      toast({
        title: "Item adicionado!",
        description: "O item foi adicionado ao carrinho",
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = agent.price >= priceRange[0] && agent.price <= priceRange[1];
    return matchesSearch && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Todos os Agentes de Automação
          </h1>
          <p className="text-lg text-muted-foreground">
            Descubra nossa biblioteca completa com mais de 200 agentes de automação
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-80 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Filtros</h3>
                
                {/* Search */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Buscar</label>
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

                  {/* Categories */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Categoria</label>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox id={category} />
                          <label htmlFor={category} className="text-sm cursor-pointer">
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Faixa de Preço: R$ {priceRange[0]} - R$ {priceRange[1]}
                    </label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={500}
                      step={10}
                      className="mt-2"
                    />
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Avaliação Mínima</label>
                    <div className="space-y-2">
                      {[4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center space-x-2">
                          <Checkbox id={`rating-${rating}`} />
                          <label htmlFor={`rating-${rating}`} className="text-sm cursor-pointer flex items-center">
                            {[...Array(rating)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-accent text-accent" />
                            ))}
                            <span className="ml-1">& acima</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  {filteredAgents.length} agentes encontrados
                </span>
              </div>
              
              <div className="flex items-center gap-4">
                <Select defaultValue="relevance">
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Mais Relevantes</SelectItem>
                    <SelectItem value="price-low">Menor Preço</SelectItem>
                    <SelectItem value="price-high">Maior Preço</SelectItem>
                    <SelectItem value="rating">Melhor Avaliação</SelectItem>
                    <SelectItem value="newest">Mais Recentes</SelectItem>
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

            {/* Products Grid/List */}
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="text-lg text-muted-foreground">Carregando agentes...</div>
              </div>
            ) : filteredAgents.length === 0 ? (
              <div className="flex justify-center items-center py-12">
                <div className="text-lg text-muted-foreground">Nenhum agente encontrado</div>
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" 
                : "space-y-4"
              }>
                {filteredAgents.map((agent) => (
                <Card 
                  key={agent.id} 
                  className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 overflow-hidden ${
                    viewMode === 'list' ? 'flex flex-row' : ''
                  }`}
                  onClick={() => navigate(`/product/${agent.id}`)}
                >
                  <div className={viewMode === 'list' ? 'w-48 flex-shrink-0' : 'relative'}>
                    {/* Product Image */}
                    <div className={`bg-gradient-to-br from-accent/10 to-primary/10 flex items-center justify-center overflow-hidden ${
                      viewMode === 'list' ? 'h-full' : 'h-48'
                    }`}>
                      {agent.images && agent.images.length > 0 ? (
                        <img 
                          src={agent.images[0]} 
                          alt={agent.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-6xl opacity-20">🤖</div>
                      )}
                    </div>
                    
                    {/* Badges */}
                    {viewMode === 'grid' && agent.is_featured && (
                      <div className="absolute top-3 left-3 flex flex-col gap-1">
                        <Badge className="bg-accent text-accent-foreground">Destaque</Badge>
                      </div>
                    )}

                    {/* Quick Actions */}
                    {viewMode === 'grid' && (
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>

                  <CardContent className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className={viewMode === 'list' ? 'flex justify-between h-full' : ''}>
                      <div className={viewMode === 'list' ? 'flex-1' : ''}>
                        {/* Title & Description */}
                        <h3 className="font-semibold text-primary mb-2 line-clamp-1 group-hover:text-accent transition-colors">
                          {agent.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {agent.description}
                        </p>

                        {/* Category Badge */}
                        {agent.category_id && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            <Badge variant="outline" className="text-xs">
                              Agente Pago
                            </Badge>
                          </div>
                        )}
                      </div>

                      <div className={viewMode === 'list' ? 'flex flex-col justify-between items-end ml-4' : ''}>
                        {/* Price */}
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-lg font-bold text-primary">
                            R$ {agent.price.toFixed(2)}
                          </span>
                        </div>

                        {/* Badges for list view */}
                        {viewMode === 'list' && agent.is_featured && (
                          <div className="flex gap-1 mb-4">
                            <Badge className="bg-accent text-accent-foreground text-xs">Destaque</Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className={`p-4 pt-0 ${viewMode === 'list' ? 'flex items-end' : ''}`}>
                    <Button
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(agent.id);
                      }}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Adicionar ao Carrinho
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center gap-2">
                <Button variant="outline" disabled>Anterior</Button>
                <Button variant="default">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">Próximo</Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AllAgentsPage;