import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star, Quote, TrendingUp, Award } from "lucide-react";
import { useState } from "react";

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
  const [hoveredTestimonial, setHoveredTestimonial] = useState<number | null>(null);

  return (
    <section className="py-16 bg-background relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(242,159,5,0.08),transparent_70%)] pointer-events-none" />
      <div className="absolute top-20 left-10 w-32 h-32 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-warning/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 animate-fade-in-down">
            <Award className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Avaliações Verificadas</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 animate-fade-in-up">
            O que nossos clientes dizem
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            Histórias reais de pessoas que transformaram seus negócios com nossos agentes de automação
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className="h-full border-2 border-transparent hover:border-accent/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 animate-fade-in-up relative overflow-hidden group"
              style={{animationDelay: `${index * 0.1}s`}}
              onMouseEnter={() => setHoveredTestimonial(testimonial.id)}
              onMouseLeave={() => setHoveredTestimonial(null)}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-warning/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <CardContent className="p-6 relative z-10">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-warning text-warning animate-scale-in transition-transform hover:scale-125"
                      style={{animationDelay: `${index * 0.1 + i * 0.05}s`}}
                    />
                  ))}
                  {hoveredTestimonial === testimonial.id && (
                    <span className="text-xs text-warning font-medium ml-2 animate-fade-in">Excelente!</span>
                  )}
                </div>

                {/* Comment */}
                <div className="relative mb-6">
                  <Quote className="absolute -top-2 -left-2 h-8 w-8 text-accent/20 transition-all group-hover:text-accent/30 group-hover:scale-110" />
                  <p className="text-sm text-muted-foreground leading-relaxed pl-4 relative z-10">
                    {testimonial.comment}
                  </p>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-muted/50 group-hover:border-accent/20 transition-colors">
                  <Avatar className="h-10 w-10 bg-gradient-to-br from-accent to-warning ring-2 ring-accent/20 group-hover:ring-accent/40 transition-all group-hover:scale-110">
                    <AvatarImage src={`/api/placeholder/40/40`} />
                    <AvatarFallback className="bg-gradient-to-br from-accent to-warning text-accent-foreground text-sm font-medium">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-primary text-sm group-hover:text-accent transition-colors">{testimonial.name}</p>
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
          <div className="animate-fade-in-up group" style={{animationDelay: "0.5s"}}>
            <div className="p-6 rounded-xl bg-gradient-to-br from-accent/10 to-transparent hover:from-accent/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-accent to-warning bg-clip-text text-transparent mb-2 transition-transform group-hover:scale-110">2,500+</div>
              <div className="text-sm text-muted-foreground font-medium">Agentes Vendidos</div>
            </div>
          </div>
          <div className="animate-fade-in-up group" style={{animationDelay: "0.6s"}}>
            <div className="p-6 rounded-xl bg-gradient-to-br from-accent/10 to-transparent hover:from-accent/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-accent to-warning bg-clip-text text-transparent mb-2 transition-transform group-hover:scale-110">98%</div>
              <div className="text-sm text-muted-foreground font-medium">Clientes Satisfeitos</div>
            </div>
          </div>
          <div className="animate-fade-in-up group" style={{animationDelay: "0.7s"}}>
            <div className="p-6 rounded-xl bg-gradient-to-br from-accent/10 to-transparent hover:from-accent/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-accent to-warning bg-clip-text text-transparent mb-2 transition-transform group-hover:scale-110">24h</div>
              <div className="text-sm text-muted-foreground font-medium">Suporte Disponível</div>
            </div>
          </div>
          <div className="animate-fade-in-up group" style={{animationDelay: "0.8s"}}>
            <div className="p-6 rounded-xl bg-gradient-to-br from-accent/10 to-transparent hover:from-accent/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-accent to-warning bg-clip-text text-transparent mb-2 transition-transform group-hover:scale-110">150+</div>
              <div className="text-sm text-muted-foreground font-medium">Vendedores Ativos</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
