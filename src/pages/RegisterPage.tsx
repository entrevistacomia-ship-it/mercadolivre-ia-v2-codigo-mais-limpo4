import { useState } from "react";
import { ArrowLeft, User, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [selectedProfile, setSelectedProfile] = useState<'buyer' | 'seller' | null>(null);
  const navigate = useNavigate();

  const handleProfileSelect = (profile: 'buyer' | 'seller') => {
    setSelectedProfile(profile);
    // Navegar para o formulário específico do perfil
    navigate(`/register/${profile}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(120,119,198,0.1)_50%,transparent_75%)] bg-[length:20px_20px]" />
      
      <Card className="w-full max-w-lg relative z-10 shadow-2xl border-accent/20">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Button variant="ghost" size="icon" asChild className="absolute left-4 top-4">
              <Link to="/">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <CardTitle className="text-2xl font-bold text-primary">Criar uma Conta</CardTitle>
          <CardDescription>
            Escolha seu perfil para começar a automatizar
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-primary mb-2">
              Qual é o seu objetivo principal?
            </h3>
            <p className="text-sm text-muted-foreground">
              Selecione o perfil que melhor descreve como você pretende usar a plataforma
            </p>
          </div>

          <div className="grid gap-4">
            {/* Comprador */}
            <Card 
              className="cursor-pointer transition-all hover:shadow-lg hover:border-accent/50 group"
              onClick={() => handleProfileSelect('buyer')}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <User className="h-6 w-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-primary">Comprador</h4>
                      <Badge variant="secondary" className="text-xs">Recomendado</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Quero automatizar meus processos e comprar agentes prontos para usar
                    </p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Acesso a biblioteca completa de agentes</li>
                      <li>• Suporte técnico especializado</li>
                      <li>• Documentação e tutoriais inclusos</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Vendedor */}
            <Card 
              className="cursor-pointer transition-all hover:shadow-lg hover:border-accent/50 group"
              onClick={() => handleProfileSelect('seller')}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <ShoppingBag className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-primary">Vendedor</h4>
                      <Badge variant="outline" className="text-xs">Especialista</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Quero vender meus agentes de automação e monetizar meu conhecimento
                    </p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Dashboard completo de vendas</li>
                      <li>• Ferramentas de marketing incluídas</li>
                      <li>• Comissões competitivas</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center pt-4">
            <p className="text-xs text-muted-foreground">
              Você poderá alterar seu perfil a qualquer momento nas configurações da conta
            </p>
          </div>

          <div className="text-center text-sm text-muted-foreground border-t pt-4">
            Já tem uma conta?{" "}
            <Link to="/login" className="text-accent hover:underline font-medium">
              Fazer login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;