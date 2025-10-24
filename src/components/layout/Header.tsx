import { Search, ShoppingCart, User, Menu, LogOut, Settings, Package, Heart, LayoutDashboard, ShoppingBag, Bell, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, profile, signOut } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  // Scroll effect
  useState(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const scrollToSection = (sectionId: string) => {
    if (window.location.pathname !== '/home') {
      navigate('/home');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setSidebarOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 w-full border-b transition-all duration-500 ${
      isScrolled
        ? 'bg-background/98 backdrop-blur-xl shadow-lg border-accent/10'
        : 'bg-background/95 backdrop-blur-md shadow-sm border-border'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/home" className="flex items-center space-x-2 group relative">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-accent to-warning flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:rotate-6 animate-gradient-shift bg-[length:200%_200%]">
              <span className="text-accent-foreground font-bold text-sm">ML</span>
            </div>
            <span className="text-lg font-bold text-primary hidden sm:inline group-hover:text-accent transition-all duration-300 relative">
              Mercado Livre-IA
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
            </span>
          </Link>

          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full group">
              <Input
                type="text"
                placeholder="Buscar agentes de automação..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10 h-10 transition-all duration-300 focus:shadow-xl focus:scale-[1.02] border-2 focus:border-accent/50"
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-hover:text-accent transition-all duration-300 group-hover:scale-110" />
              {searchQuery && (
                <TrendingUp className="absolute right-3 top-3 h-4 w-4 text-accent animate-pulse-slow" />
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:scale-110 transition-all duration-300 hover:bg-accent/10 hover:rotate-180 relative group">
                  <Menu className="h-5 w-5 transition-transform duration-300" />
                  <span className="absolute inset-0 rounded-md bg-accent/20 scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-4 mt-8">
                  <Button variant="ghost" className="justify-start" onClick={() => scrollToSection('categorias')}>
                    Categorias Populares
                  </Button>
                  <Button variant="ghost" className="justify-start" onClick={() => scrollToSection('featured')}>
                    Agentes em Destaque
                  </Button>
                  <Button variant="ghost" className="justify-start" onClick={() => scrollToSection('testimonials')}>
                    O que nossos clientes dizem
                  </Button>
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link to="/agents" onClick={() => setSidebarOpen(false)}>Ver todos os agentes</Link>
                  </Button>
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link to="/how-it-works" onClick={() => setSidebarOpen(false)}>Como funciona</Link>
                  </Button>
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link to="/about" onClick={() => setSidebarOpen(false)}>Sobre Nós</Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>

            <Button asChild variant="ghost" size="icon" className="relative hover:scale-110 transition-all duration-300 hover:bg-accent/10 group">
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                {itemCount > 0 && (
                  <Badge
                    variant="secondary"
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-gradient-to-br from-accent to-warning text-accent-foreground animate-bounce-subtle shadow-lg ring-2 ring-accent/30"
                  >
                    {itemCount}
                  </Badge>
                )}
              </Link>
            </Button>

            <Button variant="ghost" size="icon" className="relative hover:scale-110 transition-all duration-300 hover:bg-accent/10 group hidden md:flex">
              <Bell className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-accent rounded-full animate-pulse-slow"></span>
            </Button>

            {user && profile ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{profile.full_name}</p>
                      <p className="text-xs text-muted-foreground">{profile.email}</p>
                      <Badge variant="secondary" className="w-fit text-xs">
                        {profile.user_type === 'seller' ? 'Vendedor' : 'Comprador'}
                      </Badge>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Perfil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      <Package className="mr-2 h-4 w-4" />
                      Meus Agentes
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      <Heart className="mr-2 h-4 w-4" />
                      Favoritos
                    </Link>
                  </DropdownMenuItem>
                  {profile.user_type === 'seller' && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/seller/dashboard" className="cursor-pointer">
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          Painel do Vendedor
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/login" className="cursor-pointer">
                        Entrar
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setRegisterDialogOpen(true)} className="cursor-pointer">
                      Criar conta
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Dialog open={registerDialogOpen} onOpenChange={setRegisterDialogOpen}>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Escolha seu tipo de conta</DialogTitle>
                      <DialogDescription>
                        Selecione como você deseja usar a plataforma
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-4 py-4">
                      <Button
                        onClick={() => {
                          setRegisterDialogOpen(false);
                          navigate('/register/buyer');
                        }}
                        className="h-auto py-4 flex-col items-start"
                        variant="outline"
                      >
                        <div className="font-semibold text-base">Comprador</div>
                        <div className="text-xs text-muted-foreground font-normal text-left">
                          Quero comprar agentes de automação
                        </div>
                      </Button>
                      <Button
                        onClick={() => {
                          setRegisterDialogOpen(false);
                          navigate('/register/seller');
                        }}
                        className="h-auto py-4 flex-col items-start"
                        variant="outline"
                      >
                        <div className="font-semibold text-base">Vendedor</div>
                        <div className="text-xs text-muted-foreground font-normal text-left">
                          Quero vender meus agentes de automação
                        </div>
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </>
            )}

            {profile?.user_type === 'seller' && (
              <>
                <Button asChild variant="ghost" size="icon" title="Painel do Vendedor">
                  <Link to="/add-product">
                    <ShoppingBag className="h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild className="hidden md:flex bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link to="/add-product">Vender Agentes</Link>
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="md:hidden pb-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Buscar agentes de automação..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
