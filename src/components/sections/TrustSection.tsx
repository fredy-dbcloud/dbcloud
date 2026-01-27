import { motion } from 'framer-motion';
import { Shield, Award, Clock, Headphones } from 'lucide-react';
import { useLang } from '@/hooks/useLang';

export function TrustSection() {
  const { lang } = useLang();

  const features = lang === 'es' ? [
    { icon: Shield, title: 'Listo para Seguridad', description: 'Infraestructura preparada para SOC 2, HIPAA y GDPR' },
    { icon: Award, title: 'Expertos Certificados', description: 'Equipo certificado en AWS, Azure, GCP' },
    { icon: Clock, title: 'Flujos Basados en SLA', description: 'Tiempos de respuesta definidos y entrega estructurada' },
    { icon: Headphones, title: 'Soporte Dedicado', description: 'Equipo de expertos disponible para clientes' },
  ] : [
    { icon: Shield, title: 'Security-Ready', description: 'SOC 2, HIPAA, and GDPR ready infrastructure' },
    { icon: Award, title: 'Certified Experts', description: 'AWS, Azure, GCP certified team' },
    { icon: Clock, title: 'SLA-Based Workflows', description: 'Defined response times and structured delivery' },
    { icon: Headphones, title: 'Dedicated Support', description: 'Expert team available for clients' },
  ];

  const logos = [
    { name: 'AWS', src: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg' },
    { name: 'Azure', src: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg' },
    { name: 'GCP', src: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg' },
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container">
        {/* Trust badges */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4 p-6 rounded-xl bg-card border border-border"
            >
              <div className="flex-shrink-0 p-2 rounded-lg bg-accent/10">
                <feature.icon className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cloud partner logos */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm text-muted-foreground mb-8">
            {lang === 'es' ? 'Socios certificados de' : 'Certified partners of'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12">
            {logos.map((logo) => (
              <img
                key={logo.name}
                src={logo.src}
                alt={logo.name}
                className="h-10 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
