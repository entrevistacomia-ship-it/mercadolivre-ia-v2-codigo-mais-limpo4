import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Download, Eye, ShoppingCart, Heart, TrendingUp, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase, Agent } from "@/lib/supabase";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [favorited, setFavorited] = useState<Set<string>>(new Set());
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const toggleFavorite = (id: string) => {
    setFavorited(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .eq('is_featured', true)
      .eq('is_free', false)
      .order('created_at', { ascending: false })
      .limit(4);

    if (!error && data) {
      setFeaturedProducts(data);
    }
    setLoading(false);
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
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Produtos em Destaque
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Os agentes de automação mais vendidos e bem avaliados da nossa plataforma
          </p>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-muted via-muted/50 to-muted animate-shimmer bg-[length:200%_100%]" />
                <CardContent className="p-4 space-y-3">
                  <div className="h-4 bg-muted rounded animate-pulse" />
                  <div className="h-3 bg-muted rounded w-3/4 animate-pulse" />
                  <div className="h-6 bg-muted rounded w-1/2 animate-pulse mt-4" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : featuredProducts.length === 0 ? (
          <div className="flex flex-col justify-center items-center py-16 animate-fade-in">
            <div className="text-6xl mb-4 opacity-20">📦</div>
            <div className="text-lg text-muted-foreground">Nenhum produto em destaque no momento</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
            <Card
              key={product.id}
              className="group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-4 overflow-hidden border-2 border-transparent hover:border-accent/30 animate-fade-in-up relative"
              style={{animationDelay: `${index * 0.1}s`}}
              onMouseEnter={() => setHoveredCard(product.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="relative overflow-hidden">
                {/* Product Image */}
                <div className="h-48 bg-gradient-to-br from-accent/10 via-primary/5 to-warning/10 flex items-center justify-center transition-all duration-500 group-hover:scale-110 relative">
                  <div className="text-6xl opacity-20 group-hover:opacity-30 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">🤖</div>

                  {/* Animated Sparkles */}
                  {hoveredCard === product.id && (
                    <>
                      <Sparkles className="absolute top-4 right-4 w-4 h-4 text-accent animate-pulse-slow" />
                      <Sparkles className="absolute bottom-4 left-4 w-3 h-3 text-warning animate-pulse-slow" style={{animationDelay: '0.5s'}} />
                    </>
                  )}
                </div>

                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                  <Badge className="bg-gradient-to-r from-accent to-warning text-accent-foreground shadow-lg animate-scale-in backdrop-blur-sm border border-accent/20">
                    <TrendingUp className="w-3 h-3 mr-1 inline" />
                    Destaque
                  </Badge>
                </div>

                {/* Quick Actions */}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0 z-10">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8 w-8 p-0 shadow-lg hover:scale-110 transition-all duration-300 backdrop-blur-md bg-background/80"
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <Heart className={`h-4 w-4 transition-all duration-300 ${
                      favorited.has(product.id) ? 'fill-red-500 text-red-500 scale-110' : ''
                    }`} />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8 w-8 p-0 shadow-lg hover:scale-110 transition-all duration-300 backdrop-blur-md bg-background/80"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <CardContent className="p-4 relative z-10">
                {/* Title & Description */}
                <h3 className="font-semibold text-primary mb-2 line-clamp-1 group-hover:text-accent transition-colors duration-300 text-base">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>

                {/* Rating & Stats */}
                <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-warning text-warning" />
                    <span className="font-medium text-foreground">4.8</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    <span>120+ vendas</span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4 mt-4">
                  <div>
                    <span className="text-2xl font-bold text-primary group-hover:text-accent transition-colors duration-300 bg-gradient-to-r from-accent to-warning bg-clip-text group-hover:text-transparent">
                      R$ {product.price.toFixed(2)}
                    </span>
                    <div className="text-xs text-muted-foreground">ou 3x sem juros</div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0 relative z-10">
                <Button
                  className="w-full bg-gradient-to-r from-accent to-warning hover:from-accent/90 hover:to-warning/90 text-accent-foreground transition-all duration-300 hover:scale-105 shadow-md hover:shadow-xl group/btn relative overflow-hidden"
                  size="sm"
                  onClick={() => handleAddToCart(product.id)}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-warning to-accent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
                  <ShoppingCart className="h-4 w-4 mr-2 relative z-10 transition-transform group-hover/btn:scale-110" />
                  <span className="relative z-10">Adicionar ao Carrinho</span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        )}

        {/* View All Button */}
        {!loading && featuredProducts.length > 0 && (
          <div className="text-center mt-12 animate-fade-in-up" style={{animationDelay: "0.5s"}}>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 transition-all hover:scale-105 hover:shadow-lg"
            >
              <Link to="/agents">Ver Todos os Produtos</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;