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

  // Subtitle focuses on HOW we work, not WHAT we do (already covered in hero)
  const content = {
    en: {
      title: "Why SMBs Trust Us",
      subtitle: "Transparent process, clear SLAs, and senior engineers who actually respond.",
    },
    es: {
      title: "Por Qué las PYMEs Confían en Nosotros",
      subtitle: "Proceso transparente, SLAs claros, e ingenieros senior que realmente responden.",
    },
  };

  const features = lang === 'es' ? [
    { icon: Award, title: 'Expertos Certificados', description: 'Equipo con certificaciones AWS, Azure, GCP y Oracle' },
    { icon: Shield, title: 'Listo para Cumplimiento', description: 'Arquitectura alineada con SOC 2, HIPAA y GDPR' },
    { icon: Clock, title: 'Respuesta Rápida', description: 'SLAs claros y tiempos de respuesta definidos' },
    { icon: Headphones, title: 'Soporte Dedicado', description: 'Equipo experto disponible cuando lo necesitas' },
  ] : [
    { icon: Award, title: 'Certified Experts', description: 'Team with AWS, Azure, GCP, and Oracle certifications' },
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
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            {text.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
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
              <div className="flex-shrink-0 p-3 rounded-lg bg-accent/10">
                <feature.icon className="h-7 w-7 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1.5">{feature.title}</h3>
                <p className="text-base text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
