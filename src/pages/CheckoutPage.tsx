import { useState } from "react";
import { CreditCard, Lock, ArrowLeft, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuthRequired } from "@/hooks/useAuthRequired";
import { useCart } from "@/contexts/CartContext";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

const CheckoutPage = () => {
  useAuthRequired();
  const { items, loading } = useCart();
  const [showPixDialog, setShowPixDialog] = useState(false);
  const [pixData, setPixData] = useState<any>(null);
  const [loadingPix, setLoadingPix] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    cpf: "",
  });

  const subtotal = items.reduce((acc, item) => acc + (item.agent?.price || 0), 0);
  const total = subtotal;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreatePixPayment = async () => {
    if (!formData.name || !formData.phone || !formData.email || !formData.cpf) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos",
        variant: "destructive",
      });
      return;
    }

    setLoadingPix(true);
    try {
      const itemsDescription = items.map(item => item.agent?.name).join(", ");
      
      const { data, error } = await supabase.functions.invoke("create-pix-payment", {
        body: {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          cpf: formData.cpf,
          amount: total,
          description: itemsDescription,
        },
      });

      if (error) throw error;

      if (data?.success && data?.payment?.data) {
        setPixData(data.payment.data);
        setShowPixDialog(true);
        toast({
          title: "QR Code gerado!",
          description: "Escaneie o QR Code para realizar o pagamento",
        });
      } else {
        throw new Error(data?.error || "Erro ao criar pagamento");
      }
    } catch (error: any) {
      console.error("Erro ao criar pagamento PIX:", error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao gerar QR Code. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoadingPix(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/cart">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao Carrinho
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Finalizar Compra</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-accent text-accent-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                  Informações de Contato
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Nome</Label>
                    <Input id="firstName" placeholder="Seu nome" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Sobrenome</Label>
                    <Input id="lastName" placeholder="Seu sobrenome" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" placeholder="seu@email.com" />
                </div>
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" placeholder="(11) 99999-9999" />
                </div>
              </CardContent>
            </Card>

            {/* Billing Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-accent text-accent-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                  Endereço de Cobrança
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address">Endereço</Label>
                  <Input id="address" placeholder="Rua, número" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">Cidade</Label>
                    <Input id="city" placeholder="Cidade" />
                  </div>
                  <div>
                    <Label htmlFor="state">Estado</Label>
                    <Input id="state" placeholder="Estado" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="zipCode">CEP</Label>
                  <Input id="zipCode" placeholder="00000-000" />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-accent text-accent-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                  Método de Pagamento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup defaultValue="mercado-pago">
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="mercado-pago" id="mercado-pago" />
                    <Label htmlFor="mercado-pago" className="flex items-center gap-2 cursor-pointer">
                      <CreditCard className="h-4 w-4" />
                      Mercado Pago
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label htmlFor="credit-card" className="flex items-center gap-2 cursor-pointer">
                      <CreditCard className="h-4 w-4" />
                      Cartão de Crédito
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="pix" id="pix" />
                    <Label htmlFor="pix" className="cursor-pointer">
                      PIX (Desconto de 5%)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="boleto" id="boleto" />
                    <Label htmlFor="boleto" className="cursor-pointer">
                      Boleto Bancário
                    </Label>
                  </div>
                </RadioGroup>

                {/* Credit Card Form */}
                <div className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="cardNumber">Número do Cartão</Label>
                    <Input id="cardNumber" placeholder="0000 0000 0000 0000" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Validade</Label>
                      <Input id="expiry" placeholder="MM/AA" />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="000" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="cardName">Nome no Cartão</Label>
                    <Input id="cardName" placeholder="Nome como no cartão" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Terms */}
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="text-sm">
                Concordo com os{" "}
                <Link to="#" className="text-accent hover:underline">
                  termos de uso
                </Link>{" "}
                e{" "}
                <Link to="#" className="text-accent hover:underline">
                  política de privacidade
                </Link>
              </Label>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {loading ? (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground">Carregando...</p>
                  </div>
                ) : items.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground">Seu carrinho está vazio</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{item.agent?.name}</p>
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {item.agent?.description}
                            </p>
                          </div>
                          <span className="font-medium">R$ {item.agent?.price?.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>R$ {subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Taxas</span>
                        <span>R$ 0</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-accent">R$ {total.toFixed(2)}</span>
                    </div>
                  </>
                )}
                
                <Button 
                  size="lg" 
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground mt-6"
                  onClick={() => setShowPixDialog(true)}
                  disabled={items.length === 0}
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Finalizar Compra
                </Button>
                
                <div className="text-xs text-muted-foreground text-center">
                  <Lock className="h-3 w-3 inline mr-1" />
                  Pagamento 100% seguro via Mercado Pago
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />

      {/* PIX Payment Dialog */}
      <Dialog open={showPixDialog} onOpenChange={setShowPixDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Pagamento via PIX</DialogTitle>
            <DialogDescription>
              Preencha seus dados para gerar o QR Code do pagamento
            </DialogDescription>
          </DialogHeader>

          {!pixData ? (
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Seu nome completo"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="(11) 99999-9999"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  name="cpf"
                  placeholder="000.000.000-00"
                  value={formData.cpf}
                  onChange={handleInputChange}
                />
              </div>

              <div className="pt-2">
                <div className="flex justify-between mb-4 text-sm">
                  <span className="text-muted-foreground">Total a pagar:</span>
                  <span className="font-bold text-accent text-lg">R$ {total.toFixed(2)}</span>
                </div>
                <Button
                  className="w-full"
                  onClick={handleCreatePixPayment}
                  disabled={loadingPix}
                >
                  {loadingPix ? (
                    "Gerando QR Code..."
                  ) : (
                    <>
                      <QrCode className="h-4 w-4 mr-2" />
                      Gerar QR Code
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 py-4">
              <div className="text-center">
                <div className="bg-white p-4 rounded-lg inline-block">
                  {pixData.brCodeBase64 && (
                    <img
                      src={pixData.brCodeBase64}
                      alt="QR Code PIX"
                      className="w-64 h-64 mx-auto"
                    />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Escaneie o QR Code acima com o app do seu banco
                </p>
              </div>

              {pixData.brCode && (
                <div>
                  <Label>Ou copie o código PIX:</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      value={pixData.brCode}
                      readOnly
                      className="font-mono text-xs"
                    />
                    <Button
                      variant="outline"
                      onClick={() => {
                        navigator.clipboard.writeText(pixData.brCode);
                        toast({
                          title: "Copiado!",
                          description: "Código PIX copiado para a área de transferência",
                        });
                      }}
                    >
                      Copiar
                    </Button>
                  </div>
                </div>
              )}

              <div className="text-center pt-4">
                <p className="text-sm font-semibold text-accent">
                  Total: R$ {total.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Pagamento expira em: {pixData.expiresAt && new Date(pixData.expiresAt).toLocaleString('pt-BR')}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CheckoutPage;