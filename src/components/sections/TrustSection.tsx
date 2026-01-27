import { motion } from 'framer-motion';
import { Shield, Award, Clock, Headphones } from 'lucide-react';
import { useLang } from '@/hooks/useLang';

/**
 * TrustSection - SMB-focused expertise and qualifications
 * No logo repetition - logos shown in TrustedTechnologiesSection
 * Focus on team expertise and practical outcomes
 */
export function TrustSection() {
  const { lang } = useLang();

  const content = {
    en: {
      title: "Why SMBs Trust Us",
      subtitle: "Senior engineers. Proven process. No enterprise overhead.",
    },
    es: {
      title: "Por Qué las PYMEs Confían en Nosotros",
      subtitle: "Ingenieros senior. Proceso probado. Sin complejidad empresarial.",
    },
  };

  const features = lang === 'es' ? [
    { icon: Award, title: 'Expertos Certificados', description: 'Equipo con certificaciones AWS, Azure y GCP' },
    { icon: Shield, title: 'Listo para Cumplimiento', description: 'Arquitectura alineada con SOC 2, HIPAA y GDPR' },
    { icon: Clock, title: 'Respuesta Rápida', description: 'SLAs claros y tiempos de respuesta definidos' },
    { icon: Headphones, title: 'Soporte Dedicado', description: 'Equipo experto disponible cuando lo necesitas' },
  ] : [
    { icon: Award, title: 'Certified Experts', description: 'Team with AWS, Azure, and GCP certifications' },
    { icon: Shield, title: 'Compliance-Ready', description: 'Architecture aligned with SOC 2, HIPAA, GDPR' },
    { icon: Clock, title: 'Fast Response', description: 'Clear SLAs and defined response times' },
    { icon: Headphones, title: 'Dedicated Support', description: 'Expert team available when you need us' },
  ];

  const text = content[lang];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">
            {text.title}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {text.subtitle}
          </p>
        </motion.div>

        {/* Trust badges - no logos, expertise focus */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
      </div>
    </section>
  );
}
