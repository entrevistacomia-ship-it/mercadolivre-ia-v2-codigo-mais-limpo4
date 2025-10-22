import { Mail, MessageCircle, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-sm">ML</span>
              </div>
              <span className="text-lg font-bold">Mercado Livre-IA</span>
            </div>
            <p className="text-sm text-primary-foreground/80 mb-4">
              Marketplace de agentes de automação baseados em n8n. Automatize seu trabalho sem conhecimento técnico.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span>Pagamento seguro via Mercado Pago</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Navegação</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><Link to="/home" className="hover:text-accent transition-colors">Página Inicial</Link></li>
              <li><Link to="/agents" className="hover:text-accent transition-colors">Todos os Agentes</Link></li>
              <li><Link to="/about" className="hover:text-accent transition-colors">Sobre Nós</Link></li>
              <li><Link to="/seller" className="hover:text-accent transition-colors">Vendedores</Link></li>
              <li><Link to="/how-it-works" className="hover:text-accent transition-colors">Como Funciona</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Suporte</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><Link to="/help" className="hover:text-accent transition-colors">Central de Ajuda</Link></li>
              <li><Link to="/help" className="hover:text-accent transition-colors">Contato</Link></li>
              <li><Link to="/privacy" className="hover:text-accent transition-colors">Política de Privacidade</Link></li>
              <li><Link to="/help" className="hover:text-accent transition-colors">Termos de Uso</Link></li>
              <li><Link to="/add-product" className="hover:text-accent transition-colors">Vender na Plataforma</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-primary-foreground/80 mb-4">
              Receba novidades sobre automação e novos agentes.
            </p>
            <div className="flex gap-2 mb-4">
              <Input 
                type="email" 
                placeholder="Seu e-mail"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm text-primary-foreground/80">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp: +55 91 8469-8653</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>Fabricadeautomacoesia@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-primary-foreground/20" />

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-primary-foreground/80">
            © 2025 Mercado Livre-IA. Todos os direitos reservados.
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <span className="text-primary-foreground/80">Aceitos:</span>
            <div className="flex items-center gap-2">
              <div className="px-2 py-1 bg-accent rounded text-accent-foreground font-medium text-xs">PIX</div>
              <div className="px-2 py-1 bg-primary-foreground/10 rounded text-xs">Cartão</div>
              <div className="px-2 py-1 bg-primary-foreground/10 rounded text-xs">Boleto</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;