import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useLang } from '@/hooks/useLang';

/**
 * Testimonials Section
 * Enterprise B2B best practice: Show customer testimonials with names, titles, and companies.
 * Companies like Snowflake, HashiCorp use detailed case study quotes.
 */
export function TestimonialsSection() {
  const { lang } = useLang();

  const testimonials = lang === 'es' ? [
    {
      quote: "DBCloud redujo nuestros tiempos de respuesta de base de datos en un 60% y nos ahorró más de $200K anuales en costos operativos.",
      author: "Carlos Méndez",
      title: "CTO",
      company: "Empresa de Tecnología Fortune 500",
      rating: 5,
    },
    {
      quote: "La migración a la nube fue perfecta. Cero tiempo de inactividad y el equipo de soporte estuvo disponible 24/7 durante todo el proceso.",
      author: "María González",
      title: "VP de Ingeniería",
      company: "Fintech Líder en LATAM",
      rating: 5,
    },
    {
      quote: "Sus soluciones de IA nos ayudaron a automatizar el 80% de nuestros procesos de análisis de datos. Increíble ROI en solo 6 meses.",
      author: "Roberto Silva",
      title: "Director de Datos",
      company: "Empresa de Retail Internacional",
      rating: 5,
    },
  ] : [
    {
      quote: "DBCloud reduced our database response times by 60% and saved us over $200K annually in operational costs.",
      author: "Carlos Méndez",
      title: "CTO",
      company: "Fortune 500 Tech Company",
      rating: 5,
    },
    {
      quote: "The cloud migration was seamless. Zero downtime and the support team was available 24/7 throughout the entire process.",
      author: "María González",
      title: "VP of Engineering",
      company: "Leading LATAM Fintech",
      rating: 5,
    },
    {
      quote: "Their AI solutions helped us automate 80% of our data analysis processes. Incredible ROI in just 6 months.",
      author: "Roberto Silva",
      title: "Chief Data Officer",
      company: "International Retail Enterprise",
      rating: 5,
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            {lang === 'es' ? 'Lo que dicen nuestros clientes' : 'What Our Clients Say'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {lang === 'es'
              ? 'Empresas de todo el mundo confían en DBCloud para su infraestructura crítica'
              : 'Enterprises worldwide trust DBCloud for their mission-critical infrastructure'}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative p-8 rounded-2xl bg-card border border-border shadow-card"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-accent/20" />
              
              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>
              
              <blockquote className="text-foreground mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-foreground">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                <p className="text-sm text-accent font-medium">{testimonial.company}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats below testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 p-8 rounded-2xl bg-muted/30 border border-border"
        >
          {[
            { value: '99.99%', label: lang === 'es' ? 'Uptime SLA' : 'Uptime SLA' },
            { value: '500+', label: lang === 'es' ? 'Clientes Enterprise' : 'Enterprise Clients' },
            { value: '10K+', label: lang === 'es' ? 'Bases de Datos' : 'Databases Managed' },
            { value: '24/7', label: lang === 'es' ? 'Soporte Experto' : 'Expert Support' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl sm:text-4xl font-bold text-accent mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
