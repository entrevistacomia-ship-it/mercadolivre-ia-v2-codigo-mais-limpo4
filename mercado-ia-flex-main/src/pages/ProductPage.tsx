import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Star, ShoppingCart, Heart, Share2, Shield, Truck, RotateCcw, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { supabase, Agent, Profile } from "@/lib/supabase";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [seller, setSeller] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAgent = async () => {
      if (!id) return;

      try {
        const { data: agentData, error: agentError } = await supabase
          .from("agents")
          .select("*")
          .eq("id", id)
          .eq("is_free", false)
          .single();

        if (agentError) throw agentError;
        setAgent(agentData);

        // Buscar informações do vendedor
        if (agentData.seller_id) {
          const { data: sellerData } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", agentData.seller_id)
            .single();

          if (sellerData) setSeller(sellerData);
        }
      } catch (error) {
        console.error("Erro ao carregar agente:", error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar o agente.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAgent();
  }, [id]);

  const handleAddToCart = async () => {
    if (!agent) return;
    
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
      await addToCart(agent.id);
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
            Início
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/agents" className="hover:text-foreground">
            Agentes Pagos
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">{agent.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg bg-muted overflow-hidden">
              {agent.images && agent.images.length > 0 ? (
                <img 
                  src={agent.images[selectedImage]} 
                  alt={agent.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/10 to-primary/10">
                  <div className="text-9xl opacity-20">🤖</div>
                </div>
              )}
            </div>
            {agent.images && agent.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {agent.images.map((image, index) => (
                  <div 
                    key={index} 
                    className={`aspect-square rounded-lg bg-muted overflow-hidden cursor-pointer hover:opacity-80 transition-opacity ${
                      selectedImage === index ? 'ring-2 ring-accent' : ''
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${agent.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-2 bg-accent text-accent-foreground">Agente Premium</Badge>
              <h1 className="text-3xl font-bold text-foreground mb-4">{agent.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`h-4 w-4 ${star <= 4 ? 'fill-accent text-accent' : 'text-muted-foreground'}`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  4.8 (127 avaliações)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-accent">R$ {agent.price.toFixed(2)}</span>
                {agent.is_featured && (
                  <Badge variant="default" className="bg-accent text-accent-foreground">
                    Destaque
                  </Badge>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button 
                size="lg" 
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Adicionar ao Carrinho
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="lg" className="flex-1">
                  <Heart className="h-5 w-5 mr-2" />
                  Favoritar
                </Button>
                <Button variant="outline" size="lg" className="flex-1">
                  <Share2 className="h-5 w-5 mr-2" />
                  Compartilhar
                </Button>
              </div>
            </div>

            {/* Seller Info */}
            {seller && (
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={seller.avatar_url || undefined} />
                      <AvatarFallback>{seller.full_name?.[0] || 'V'}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{seller.full_name || 'Vendedor'}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        <span>4.9</span>
                        <span>•</span>
                        <span>Vendedor verificado</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            )}

            {/* Guarantees */}
            <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-5 w-5 text-accent" />
                <span>Garantia de 30 dias ou seu dinheiro de volta</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Truck className="h-5 w-5 text-accent" />
                <span>Entrega imediata após aprovação do pagamento</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <RotateCcw className="h-5 w-5 text-accent" />
                <span>Suporte técnico por 6 meses</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Descrição</TabsTrigger>
              <TabsTrigger value="features">Características</TabsTrigger>
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
                    <h4 className="font-semibold mb-3">O que você receberá:</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-accent rounded-full" />
                        Fluxo de automação completo do n8n
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-accent rounded-full" />
                        Documentação detalhada
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-accent rounded-full" />
                        Suporte técnico por 6 meses
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-accent rounded-full" />
                        Atualizações gratuitas
                      </li>
                    </ul>
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
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Shield className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Garantia de Qualidade</h4>
                        <p className="text-sm text-muted-foreground">
                          30 dias ou seu dinheiro de volta
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Truck className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Entrega Imediata</h4>
                        <p className="text-sm text-muted-foreground">
                          Acesso instantâneo após pagamento
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <RotateCcw className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Atualizações</h4>
                        <p className="text-sm text-muted-foreground">
                          Todas as melhorias incluídas
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Star className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Suporte Premium</h4>
                        <p className="text-sm text-muted-foreground">
                          6 meses de assistência técnica
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
                  <p className="text-muted-foreground">
                    Avaliações dos clientes aparecerão aqui em breve.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductPage;