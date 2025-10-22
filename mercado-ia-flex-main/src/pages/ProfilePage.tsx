import { useState, useEffect, useRef } from "react";
import { User, Package, Heart, Settings, FileText, Shield, Bell, Globe, CreditCard, History, Camera } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { useAuthRequired } from "@/hooks/useAuthRequired";

const ProfilePage = () => {
  useAuthRequired();
  const { user, profile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [sellerAgents, setSellerAgents] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [purchases, setPurchases] = useState([]);

  const [profileData, setProfileData] = useState({
    full_name: profile?.full_name || "",
    email: profile?.email || "",
    avatar_url: profile?.avatar_url || "",
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    if (!user) return;

    const promises = [
      supabase
        .from("purchases")
        .select(`*, agent:agents(*)`)
        .eq("buyer_id", user.id)
        .order("purchased_at", { ascending: false }),
      supabase
        .from("favorites")
        .select(`*, agent:agents(*)`)
        .eq("user_id", user.id),
    ];

    // Se for vendedor, busca também os agentes criados por ele
    if (profile?.user_type === 'seller') {
      promises.push(
        supabase
          .from("agents")
          .select("*")
          .eq("seller_id", user.id)
          .order("created_at", { ascending: false })
      );
    }

    const results = await Promise.all(promises);
    
    if (results[0].data) setPurchases(results[0].data);
    if (results[1].data) setFavorites(results[1].data);
    if (results[2]?.data) setSellerAgents(results[2].data);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Arquivo muito grande",
          description: "O tamanho máximo é 5MB",
          variant: "destructive",
        });
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast({
          title: "Formato inválido",
          description: "Por favor, selecione uma imagem",
          variant: "destructive",
        });
        return;
      }

      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadAvatar = async (): Promise<string | null> => {
    if (!avatarFile || !user) return null;

    const fileExt = avatarFile.name.split('.').pop();
    const fileName = `${user.id}/${Date.now()}.${fileExt}`;

    const { error: uploadError, data } = await supabase.storage
      .from('avatars')
      .upload(fileName, avatarFile, {
        cacheControl: '3600',
        upsert: true
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const handleUpdateProfile = async () => {
    if (!user) return;
    setLoading(true);

    try {
      let avatarUrl = profileData.avatar_url;

      if (avatarFile) {
        const uploadedUrl = await uploadAvatar();
        if (uploadedUrl) {
          avatarUrl = uploadedUrl;
        }
      }

      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: profileData.full_name,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) throw error;

      await refreshProfile();
      setAvatarFile(null);
      setAvatarPreview(null);
      toast({
        title: "Perfil atualizado!",
        description: "Suas informações foram salvas com sucesso",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar perfil",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Meu Perfil</h1>
            <p className="text-muted-foreground">Gerencie sua conta e preferências</p>
          </div>

          <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className={`grid w-full ${profile?.user_type === 'seller' ? 'grid-cols-3 sm:grid-cols-4 lg:grid-cols-7' : 'grid-cols-3 sm:grid-cols-4 lg:grid-cols-6'} gap-1`}>
              <TabsTrigger value="personal" className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-2">
                <User className="h-4 w-4" />
                <span className="text-xs sm:text-sm">Perfil</span>
              </TabsTrigger>
              <TabsTrigger value="agents" className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-2">
                <Package className="h-4 w-4" />
                <span className="text-xs sm:text-sm hidden xs:inline">Meus Produtos</span>
                <span className="text-xs sm:text-sm xs:hidden">Produtos</span>
              </TabsTrigger>
              <TabsTrigger value="favorites" className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-2">
                <Heart className="h-4 w-4" />
                <span className="text-xs sm:text-sm">Favoritos</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-2">
                <History className="h-4 w-4" />
                <span className="text-xs sm:text-sm">Histórico</span>
              </TabsTrigger>
              {profile?.user_type === 'seller' && (
                <TabsTrigger value="seller-dashboard" className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-2">
                  <Settings className="h-4 w-4" />
                  <span className="text-xs sm:text-sm">Dashboard</span>
                </TabsTrigger>
              )}
              <TabsTrigger value="settings" className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-2">
                <Settings className="h-4 w-4" />
                <span className="text-xs sm:text-sm hidden sm:inline">Configurações</span>
                <span className="text-xs xs:inline sm:hidden">Config</span>
              </TabsTrigger>
              <TabsTrigger value="help" className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-2">
                <FileText className="h-4 w-4" />
                <span className="text-xs sm:text-sm">Ajuda</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Informações Pessoais</CardTitle>
                  <CardDescription>Atualize seus dados pessoais</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                    <div className="relative group flex-shrink-0">
                      <div className="w-24 h-24 sm:w-20 sm:h-20 rounded-full bg-accent flex items-center justify-center text-2xl font-bold text-accent-foreground overflow-hidden">
                        {avatarPreview || profile.avatar_url ? (
                          <img
                            src={avatarPreview || profile.avatar_url || ""}
                            alt="Avatar"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          profile.full_name?.charAt(0) || "U"
                        )}
                      </div>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        <Camera className="h-6 w-6 text-white" />
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-lg sm:text-xl font-semibold">{profile.full_name}</h3>
                      <p className="text-sm text-muted-foreground break-all">{profile.email}</p>
                      <div className="flex flex-wrap gap-2 mt-2 justify-center sm:justify-start">
                        <Badge variant="secondary">
                          {profile.user_type === 'seller' ? 'Vendedor' : 'Comprador'}
                        </Badge>
                        <Badge variant="outline">
                          {profile.user_level}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="full_name">Nome Completo</Label>
                        <Input
                          id="full_name"
                          value={profileData.full_name}
                          onChange={(e) => setProfileData({ ...profileData, full_name: e.target.value })}
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          disabled
                          className="w-full"
                        />
                        <p className="text-xs text-muted-foreground">
                          O e-mail não pode ser alterado
                        </p>
                      </div>
                    </div>

                    <Button onClick={handleUpdateProfile} disabled={loading} className="w-full sm:w-auto">
                      {loading ? "Salvando..." : "Salvar Alterações"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="agents">
              <Card>
                <CardHeader>
                  <CardTitle>{profile?.user_type === 'seller' ? 'Agentes Criados' : 'Meus Agentes'}</CardTitle>
                  <CardDescription>
                    {profile?.user_type === 'seller' 
                      ? 'Agentes que você cadastrou para venda' 
                      : 'Agentes que você adquiriu'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {profile?.user_type === 'seller' ? (
                    sellerAgents.length === 0 ? (
                      <div className="text-center py-12">
                        <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Nenhum agente cadastrado</h3>
                        <p className="text-muted-foreground mb-4">
                          Você ainda não cadastrou nenhum agente para venda
                        </p>
                        <Button onClick={() => navigate("/add-product")} className="w-full sm:w-auto">
                          Criar Agente
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {sellerAgents.map((agent: any) => (
                          <Card key={agent.id}>
                            <CardContent className="p-4 flex justify-between items-center">
                              <div>
                                <h4 className="font-semibold">{agent.name}</h4>
                                <p className="text-sm text-muted-foreground">{agent.description}</p>
                              </div>
                              <Badge variant={agent.is_free ? "secondary" : "default"}>
                                {agent.is_free ? "Gratuito" : `R$ ${agent.price}`}
                              </Badge>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )
                  ) : (
                    purchases.length === 0 ? (
                      <div className="text-center py-12">
                        <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Nenhum agente ainda</h3>
                        <p className="text-muted-foreground mb-4">
                          Você ainda não adquiriu nenhum agente de automação
                        </p>
                        <Button onClick={() => navigate("/agents")} className="w-full sm:w-auto">
                          Explorar Agentes
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {purchases.map((purchase: any) => (
                          <Card key={purchase.id}>
                            <CardContent className="p-4">
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                                <div className="flex gap-4">
                                  {purchase.agent?.images && purchase.agent.images.length > 0 && (
                                    <img
                                      src={purchase.agent.images[0]}
                                      alt={purchase.agent.name}
                                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                                    />
                                  )}
                                  <div>
                                    <h4 className="font-semibold">{purchase.agent?.name}</h4>
                                    <p className="text-sm text-muted-foreground mb-2">
                                      Adquirido em {new Date(purchase.purchased_at).toLocaleDateString()}
                                    </p>
                                    <Badge variant={purchase.price_paid === 0 ? "secondary" : "default"}>
                                      {purchase.price_paid === 0 ? "Gratuito" : `R$ ${purchase.price_paid}`}
                                    </Badge>
                                  </div>
                                </div>
                                {purchase.agent?.n8n_url && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full sm:w-auto"
                                    onClick={() => window.open(purchase.agent.n8n_url, '_blank')}
                                  >
                                    Baixar Novamente
                                  </Button>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="favorites">
              <Card>
                <CardHeader>
                  <CardTitle>Favoritos</CardTitle>
                  <CardDescription>Agentes salvos para mais tarde</CardDescription>
                </CardHeader>
                <CardContent>
                  {favorites.length === 0 ? (
                    <div className="text-center py-12">
                      <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Nenhum favorito</h3>
                      <p className="text-muted-foreground">
                        Adicione agentes aos favoritos para acessá-los rapidamente
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {favorites.map((fav: any) => (
                        <Card key={fav.id}>
                          <CardContent className="p-4">
                            <h4 className="font-semibold">{fav.agent?.name}</h4>
                            <p className="text-sm text-muted-foreground">{fav.agent?.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Histórico de Compras</CardTitle>
                  <CardDescription>Todas as suas transações</CardDescription>
                </CardHeader>
                <CardContent>
                  {purchases.length === 0 ? (
                    <div className="text-center py-12">
                      <History className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Nenhuma compra realizada</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {purchases.map((purchase: any) => (
                        <div key={purchase.id} className="flex justify-between items-center border-b pb-4">
                          <div>
                            <p className="font-semibold">{purchase.agent?.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(purchase.purchased_at).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge>R$ {purchase.price_paid}</Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="seller-dashboard">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Dashboard do Vendedor</CardTitle>
                    <CardDescription>Visão geral dos seus agentes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 border rounded-lg">
                        <p className="text-sm text-muted-foreground">Total de Agentes</p>
                        <p className="text-2xl font-bold">{sellerAgents.length}</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <p className="text-sm text-muted-foreground">Agentes Gratuitos</p>
                        <p className="text-2xl font-bold">
                          {sellerAgents.filter((a: any) => a.is_free).length}
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <p className="text-sm text-muted-foreground">Agentes Pagos</p>
                        <p className="text-2xl font-bold">
                          {sellerAgents.filter((a: any) => !a.is_free).length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Ações Rápidas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button 
                      onClick={() => navigate("/add-product")} 
                      className="w-full justify-start"
                      variant="outline"
                    >
                      <Package className="mr-2 h-4 w-4" />
                      Criar Novo Agente
                    </Button>
                    <Button 
                      onClick={() => navigate("/add-product")} 
                      className="w-full justify-start"
                      variant="outline"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Gerenciar Agentes
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="settings">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notificações</CardTitle>
                    <CardDescription>Gerencie suas preferências de notificação</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">E-mail de novidades</p>
                        <p className="text-sm text-muted-foreground">Receba novidades sobre novos agentes</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Notificações de atualizações</p>
                        <p className="text-sm text-muted-foreground">Seja avisado sobre atualizações dos seus agentes</p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Privacidade e Segurança</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full sm:w-auto">Alterar Senha</Button>
                    <Button variant="outline" className="w-full sm:w-auto">Configurar Autenticação de Dois Fatores</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="help">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Central de Ajuda</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="mr-2 h-4 w-4" />
                      FAQ - Perguntas Frequentes
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Shield className="mr-2 h-4 w-4" />
                      Termos de Uso
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="mr-2 h-4 w-4" />
                      Política de Privacidade
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Sobre o App</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Versão 1.0.0</p>
                    <p className="text-sm">© 2025 Mercado Livre-IA</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
