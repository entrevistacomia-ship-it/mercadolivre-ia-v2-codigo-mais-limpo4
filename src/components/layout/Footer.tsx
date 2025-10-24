import { Mail, MessageCircle, MapPin, Phone, Send, Facebook, Twitter, Instagram, Linkedin, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(242,159,5,0.03)_50%,transparent_75%)] bg-[length:20px_20px] pointer-events-none" />
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="animate-fade-in-up">
            <Link to="/home" className="flex items-center space-x-2 mb-4 group">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-accent to-warning flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg">
                <span className="text-accent-foreground font-bold text-sm">ML</span>
              </div>
              <span className="text-lg font-bold group-hover:text-accent transition-colors">Mercado Livre-IA</span>
            </Link>
            <p className="text-sm text-primary-foreground/80 mb-4 leading-relaxed">
              Marketplace de agentes de automação baseados em n8n. Automatize seu trabalho sem conhecimento técnico.
            </p>
            <div className="flex items-center gap-2 text-sm mb-4 px-3 py-2 rounded-lg bg-primary-foreground/5 border border-accent/20 hover:border-accent/40 transition-colors">
              <div className="w-2 h-2 bg-gradient-to-r from-accent to-warning rounded-full animate-pulse-slow" />
              <span>Pagamento seguro via Mercado Pago</span>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-3 mt-6">
              <Button size="icon" variant="ghost" className="h-9 w-9 rounded-full hover:bg-accent/20 hover:text-accent transition-all hover:scale-110">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="h-9 w-9 rounded-full hover:bg-accent/20 hover:text-accent transition-all hover:scale-110">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="h-9 w-9 rounded-full hover:bg-accent/20 hover:text-accent transition-all hover:scale-110">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="h-9 w-9 rounded-full hover:bg-accent/20 hover:text-accent transition-all hover:scale-110">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <h3 className="font-semibold mb-4 text-lg flex items-center gap-2">
              Navegação
              <div className="h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent"></div>
            </h3>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li><Link to="/home" className="hover:text-accent transition-all duration-300 hover:translate-x-2 inline-flex items-center gap-2 group"><span className="w-0 h-px bg-accent transition-all group-hover:w-3"></span>Página Inicial</Link></li>
              <li><Link to="/agents" className="hover:text-accent transition-all duration-300 hover:translate-x-2 inline-flex items-center gap-2 group"><span className="w-0 h-px bg-accent transition-all group-hover:w-3"></span>Todos os Agentes</Link></li>
              <li><Link to="/about" className="hover:text-accent transition-all duration-300 hover:translate-x-2 inline-flex items-center gap-2 group"><span className="w-0 h-px bg-accent transition-all group-hover:w-3"></span>Sobre Nós</Link></li>
              <li><Link to="/seller" className="hover:text-accent transition-all duration-300 hover:translate-x-2 inline-flex items-center gap-2 group"><span className="w-0 h-px bg-accent transition-all group-hover:w-3"></span>Vendedores</Link></li>
              <li><Link to="/how-it-works" className="hover:text-accent transition-all duration-300 hover:translate-x-2 inline-flex items-center gap-2 group"><span className="w-0 h-px bg-accent transition-all group-hover:w-3"></span>Como Funciona</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <h3 className="font-semibold mb-4 text-lg flex items-center gap-2">
              Suporte
              <div className="h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent"></div>
            </h3>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li><Link to="/help" className="hover:text-accent transition-all duration-300 hover:translate-x-2 inline-flex items-center gap-2 group"><span className="w-0 h-px bg-accent transition-all group-hover:w-3"></span>Central de Ajuda</Link></li>
              <li><Link to="/help" className="hover:text-accent transition-all duration-300 hover:translate-x-2 inline-flex items-center gap-2 group"><span className="w-0 h-px bg-accent transition-all group-hover:w-3"></span>Contato</Link></li>
              <li><Link to="/privacy" className="hover:text-accent transition-all duration-300 hover:translate-x-2 inline-flex items-center gap-2 group"><span className="w-0 h-px bg-accent transition-all group-hover:w-3"></span>Política de Privacidade</Link></li>
              <li><Link to="/help" className="hover:text-accent transition-all duration-300 hover:translate-x-2 inline-flex items-center gap-2 group"><span className="w-0 h-px bg-accent transition-all group-hover:w-3"></span>Termos de Uso</Link></li>
              <li><Link to="/add-product" className="hover:text-accent transition-all duration-300 hover:translate-x-2 inline-flex items-center gap-2 group"><span className="w-0 h-px bg-accent transition-all group-hover:w-3"></span>Vender na Plataforma</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <h3 className="font-semibold mb-4 text-lg flex items-center gap-2">
              Newsletter
              <div className="h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent"></div>
            </h3>
            <p className="text-sm text-primary-foreground/80 mb-4 leading-relaxed">
              Receba novidades sobre automação e novos agentes.
            </p>
            <form onSubmit={handleSubscribe} className="mb-6">
              <div className="flex gap-2 relative group">
                <div className="relative flex-1">
                  <Input
                    type="email"
                    placeholder="Seu e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 focus:border-accent transition-all duration-300 pr-10"
                  />
                  {isSubscribed && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-accent animate-scale-in">✓</span>
                  )}
                </div>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-accent to-warning hover:from-accent/90 hover:to-warning/90 text-accent-foreground hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg group"
                >
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
              {isSubscribed && (
                <p className="text-xs text-accent mt-2 animate-fade-in">Inscrito com sucesso!</p>
              )}
            </form>

            {/* Contact Info */}
            <div className="space-y-3 text-sm text-primary-foreground/80">
              <div className="flex items-center gap-2 hover:text-accent transition-colors group">
                <MessageCircle className="h-4 w-4 transition-transform group-hover:scale-110" />
                <span>WhatsApp: +55 91 8469-8653</span>
              </div>
              <div className="flex items-center gap-2 hover:text-accent transition-colors group">
                <Mail className="h-4 w-4 transition-transform group-hover:scale-110" />
                <span className="break-all">Fabricadeautomacoesia@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-primary-foreground/20" />

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 py-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-primary-foreground/80">
            © 2025 Mercado Livre-IA. Todos os direitos reservados.
          </div>

          <div className="flex items-center gap-4 text-sm flex-wrap justify-center">
            <span className="text-primary-foreground/80">Aceitos:</span>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1.5 bg-gradient-to-r from-accent to-warning rounded-lg text-accent-foreground font-medium text-xs shadow-md hover:shadow-lg transition-all hover:scale-105">PIX</div>
              <div className="px-3 py-1.5 bg-primary-foreground/10 rounded-lg text-xs hover:bg-primary-foreground/20 transition-all hover:scale-105">Cartão</div>
              <div className="px-3 py-1.5 bg-primary-foreground/10 rounded-lg text-xs hover:bg-primary-foreground/20 transition-all hover:scale-105">Boleto</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <Button
        onClick={scrollToTop}
        size="icon"
        className="fixed bottom-8 right-8 h-12 w-12 rounded-full bg-gradient-to-r from-accent to-warning hover:from-accent/90 hover:to-warning/90 text-accent-foreground shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 z-50 group"
      >
        <ArrowUp className="h-5 w-5 transition-transform group-hover:-translate-y-1" />
      </Button>
    </footer>
  );
};

export default Footer;