import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Carlos Silva",
    role: "Dono de E-commerce",
    company: "Loja Virtual Plus",
    rating: 5,
    comment: "Este agente de automação economizou 5 horas do meu dia! Agora minha loja sincroniza automaticamente com todos os marketplaces.",
    avatar: "CS"
  },
  {
    id: 2,
    name: "Marina Santos",
    role: "Gerente de Marketing",
    company: "Digital Growth",
    rating: 5,
    comment: "Impressionante como consegui automatizar toda nossa estratégia de email marketing. Os resultados melhoraram 300%!",
    avatar: "MS"
  },
  {
    id: 3,
    name: "Roberto Lima",
    role: "CEO",
    company: "TechStart",
    rating: 5,
    comment: "Sem conhecimento técnico consegui integrar nossos sistemas. A produtividade da equipe aumentou significativamente.",
    avatar: "RL"
  },
  {
    id: 4,
    name: "Ana Oliveira",
    role: "Consultora",
    company: "Freelancer",
    rating: 5,
    comment: "Os agentes de WhatsApp transformaram meu atendimento. Agora posso focar no estratégico enquanto as respostas são automáticas.",
    avatar: "AO"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Histórias reais de pessoas que transformaram seus negócios com nossos agentes de automação
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className="h-full border-2 border-transparent hover:border-accent/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in-up"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <CardContent className="p-6">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning text-warning animate-scale-in" style={{animationDelay: `${index * 0.1 + i * 0.05}s`}} />
                  ))}
                </div>

                {/* Comment */}
                <div className="relative mb-6">
                  <span className="absolute -top-2 -left-2 text-4xl text-accent/20 font-serif">"</span>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-4">
                    {testimonial.comment}
                  </p>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-muted">
                  <Avatar className="h-10 w-10 bg-gradient-to-br from-accent to-accent/70 ring-2 ring-accent/20">
                    <AvatarImage src={`/api/placeholder/40/40`} />
                    <AvatarFallback className="bg-accent text-accent-foreground text-sm font-medium">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-primary text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role} • {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="animate-fade-in-up" style={{animationDelay: "0.5s"}}>
            <div className="text-4xl font-bold text-accent mb-2 transition-transform hover:scale-110">2,500+</div>
            <div className="text-sm text-muted-foreground">Agentes Vendidos</div>
          </div>
          <div className="animate-fade-in-up" style={{animationDelay: "0.6s"}}>
            <div className="text-4xl font-bold text-accent mb-2 transition-transform hover:scale-110">98%</div>
            <div className="text-sm text-muted-foreground">Clientes Satisfeitos</div>
          </div>
          <div className="animate-fade-in-up" style={{animationDelay: "0.7s"}}>
            <div className="text-4xl font-bold text-accent mb-2 transition-transform hover:scale-110">24h</div>
            <div className="text-sm text-muted-foreground">Suporte Disponível</div>
          </div>
          <div className="animate-fade-in-up" style={{animationDelay: "0.8s"}}>
            <div className="text-4xl font-bold text-accent mb-2 transition-transform hover:scale-110">150+</div>
            <div className="text-sm text-muted-foreground">Vendedores Ativos</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;