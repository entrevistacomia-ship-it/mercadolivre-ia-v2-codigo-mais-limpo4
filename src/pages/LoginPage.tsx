import { useState } from "react";
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signIn } = useAuth();
  const { toast } = useToast();

  const returnUrl = searchParams.get("returnUrl") || "/home";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signIn(email, password);

      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user && !session.user.email_confirmed_at) {
        navigate("/confirm-email");
        toast({
          title: "Confirme seu e-mail",
          description: "Por favor, verifique seu e-mail para continuar",
          variant: "default",
        });
        return;
      }

      toast({
        title: "Login realizado!",
        description: "Bem-vindo de volta ao Mercado Livre-IA",
      });
      navigate(returnUrl);
    } catch (error: any) {
      toast({
        title: "Erro ao fazer login",
        description: error.message || "Verifique suas credenciais e tente novamente",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(120,119,198,0.1)_50%,transparent_75%)] bg-[length:20px_20px] animate-gradient-shift" style={{backgroundSize: "400% 400%"}} />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-accent/30 rounded-full animate-bounce-subtle" style={{animationDelay: "0s"}} />
        <div className="absolute top-40 right-20 w-3 h-3 bg-primary/20 rounded-full animate-bounce-subtle" style={{animationDelay: "0.5s"}} />
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-accent/40 rounded-full animate-bounce-subtle" style={{animationDelay: "1s"}} />
      </div>

      <Card className="w-full max-w-md relative z-10 shadow-2xl border-2 border-accent/20 animate-scale-in">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Button variant="ghost" size="icon" asChild className="absolute left-4 top-4 hover:scale-110 transition-transform">
              <Link to="/">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <CardTitle className="text-3xl font-bold text-primary mb-2">Entrar na Conta</CardTitle>
          <CardDescription className="text-base">
            Acesse sua conta para continuar automatizando
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <div className="relative group">
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 transition-all focus:shadow-lg"
                  required
                />
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative group">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 transition-all focus:shadow-lg"
                  required
                />
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1 h-8 w-8 hover:scale-110 transition-transform"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="remember" className="text-sm">
                  Lembrar de mim
                </Label>
              </div>
              <Link 
                to="/forgot-password" 
                className="text-sm text-accent hover:underline"
              >
                Esqueci a senha
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-accent hover:bg-accent/90 text-accent-foreground transition-all hover:scale-105 hover:shadow-xl"
              disabled={loading}
            >
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            Não tem uma conta?{" "}
            <Link to="/register" className="text-accent hover:underline font-medium">
              Criar conta
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;