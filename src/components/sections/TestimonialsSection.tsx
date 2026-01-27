import { motion } from 'framer-motion';
import { Star, Quote, Shield, Brain, LayoutDashboard, Globe } from 'lucide-react';
import { useLang } from '@/hooks/useLang';

/**
 * Testimonials Section
 * Enterprise B2B best practice: Show capability-based trust signals.
 * Using process-driven credibility instead of unverifiable metrics.
 */
export function TestimonialsSection() {
  const { lang } = useLang();

  // Value propositions (what clients will experience) - no fake testimonials
  const valueProps = lang === 'es' ? [
    {
      icon: Shield,
      title: 'Operaciones Listas para Seguridad',
      description: 'Infraestructura preparada para cumplimiento SOC 2, HIPAA y GDPR disponible para clientes Enterprise.',
    },
    {
      icon: Brain,
      title: 'Triage Impulsado por IA',
      description: 'Clasificación automática de solicitudes, detección de riesgos y priorización inteligente.',
    },
    {
      icon: LayoutDashboard,
      title: 'Dashboards Transparentes',
      description: 'Visibilidad en tiempo real de horas usadas, estado de solicitudes y resúmenes mensuales.',
    },
    {
      icon: Globe,
      title: 'Operaciones Remotas en EE.UU.',
      description: 'Empresa registrada en Estados Unidos con operaciones remotas a nivel nacional.',
    },
  ] : [
    {
      icon: Shield,
      title: 'Security-Ready Operations',
      description: 'SOC 2, HIPAA, and GDPR compliant infrastructure available for Enterprise clients.',
    },
    {
      icon: Brain,
      title: 'AI-Powered Triage',
      description: 'Automatic request classification, risk detection, and intelligent prioritization.',
    },
    {
      icon: LayoutDashboard,
      title: 'Transparent Dashboards',
      description: 'Real-time visibility into hours used, request status, and monthly summaries.',
    },
    {
      icon: Globe,
      title: 'US-Based Remote Operations',
      description: 'US-registered company with remote-first operations across the nation.',
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
            {lang === 'es' ? 'Por qué las empresas nos eligen' : 'Why Enterprises Choose Us'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {lang === 'es'
              ? 'Construido sobre principios de transparencia, procesos estructurados y excelencia operativa'
              : 'Built on principles of transparency, structured processes, and operational excellence'}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {valueProps.map((prop, index) => (
            <motion.div
              key={prop.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-card border border-border shadow-card text-center"
            >
              <div className="inline-flex items-center justify-center p-3 rounded-xl bg-accent/10 mb-4">
                <prop.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">{prop.title}</h3>
              <p className="text-sm text-muted-foreground">{prop.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Credibility statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-2xl bg-muted/30 border border-border text-center"
        >
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {lang === 'es'
              ? '"Diseñado utilizando los mismos principios operativos de confianza de consultorías empresariales de alto crecimiento."'
              : '"Designed using the same operational principles trusted by high-growth enterprise consultancies."'}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
