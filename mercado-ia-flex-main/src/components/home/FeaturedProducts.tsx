import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Download, Eye, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase, Agent } from "@/lib/supabase";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

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
              className="group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-3 overflow-hidden border-2 border-transparent hover:border-accent/20 animate-fade-in-up"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="relative overflow-hidden">
                {/* Product Image */}
                <div className="h-48 bg-gradient-to-br from-accent/10 via-primary/5 to-warning/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <div className="text-6xl opacity-20 group-hover:opacity-30 transition-opacity">🤖</div>
                </div>

                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                  <Badge className="bg-accent text-accent-foreground shadow-lg animate-scale-in">Destaque</Badge>
                </div>

                {/* Quick Actions */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 z-10">
                  <Button size="sm" variant="secondary" className="h-8 w-8 p-0 shadow-lg hover:scale-110 transition-transform">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <CardContent className="p-4">
                {/* Title & Description */}
                <h3 className="font-semibold text-primary mb-2 line-clamp-1 group-hover:text-accent transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {product.description}
                </p>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4 mt-6">
                  <span className="text-2xl font-bold text-primary group-hover:text-accent transition-colors">
                    R$ {product.price.toFixed(2)}
                  </span>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <Button
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground transition-all hover:scale-105 shadow-md hover:shadow-xl"
                  size="sm"
                  onClick={() => handleAddToCart(product.id)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Adicionar ao Carrinho
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