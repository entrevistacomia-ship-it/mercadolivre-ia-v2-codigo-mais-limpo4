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
          <div className="flex justify-center items-center py-12">
            <div className="text-lg text-muted-foreground">Carregando produtos em destaque...</div>
          </div>
        ) : featuredProducts.length === 0 ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-lg text-muted-foreground">Nenhum produto em destaque no momento</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
            <Card key={product.id} className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 overflow-hidden">
              <div className="relative">
                {/* Product Image */}
                <div className="h-48 bg-gradient-to-br from-accent/10 to-primary/10 flex items-center justify-center">
                  <div className="text-6xl opacity-20">🤖</div>
                </div>
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  <Badge className="bg-accent text-accent-foreground">Destaque</Badge>
                </div>

                {/* Quick Actions */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <CardContent className="p-4">
                {/* Title & Description */}
                <h3 className="font-semibold text-primary mb-2 line-clamp-1 group-hover:text-accent transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {product.description}
                </p>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4 mt-6">
                  <span className="text-lg font-bold text-primary">
                    R$ {product.price.toFixed(2)}
                  </span>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <Button 
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
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
        <div className="text-center mt-12">
          <Button
            asChild
            variant="outline" 
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8"
          >
            <Link to="/agents">Ver Todos os Produtos</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;