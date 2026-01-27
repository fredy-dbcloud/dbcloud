import { motion } from 'framer-motion';
import { useLang } from '@/hooks/useLang';
import { 
  Shield, 
  Brain, 
  LayoutDashboard, 
  Clock, 
  Puzzle, 
  Globe
} from 'lucide-react';

/**
 * Enterprise Standards Section
 * Credibility-driven trust signals based on actual platform capabilities.
 * No fake metrics or unverifiable claims.
 */
export function EnterpriseStandardsSection() {
  const { lang } = useLang();

  const content = {
    en: {
      title: 'Built for Enterprise Standards',
      subtitle: 'Process-driven operations designed for transparency, not hype.',
      features: [
        {
          icon: Shield,
          title: 'Security & Compliance-Ready',
          description: 'Role-based access, encrypted communications, and infrastructure prepared for SOC 2, HIPAA, and GDPR.',
        },
        {
          icon: Brain,
          title: 'AI-Driven Request Triage',
          description: 'Automatic classification, risk detection, and intelligent prioritization for every client request.',
        },
        {
          icon: LayoutDashboard,
          title: 'Transparent Client Dashboards',
          description: 'Real-time visibility into hours used, request status, and monthly performance summaries.',
        },
        {
          icon: Clock,
          title: 'SLA-Based Workflows',
          description: 'Defined response times, clear scope boundaries, and structured delivery models.',
        },
        {
          icon: Puzzle,
          title: 'Modular Plans & Add-Ons',
          description: 'Prevent scope creep with structured packages. Pay only for what you need.',
        },
        {
          icon: Globe,
          title: 'US-Registered, Remote-First',
          description: 'US-based company operating remotely across the nation. No overhead, pure expertise.',
        },
      ],
    },
    es: {
      title: 'Construido para Estándares Empresariales',
      subtitle: 'Operaciones basadas en procesos diseñadas para transparencia, no exageración.',
      features: [
        {
          icon: Shield,
          title: 'Seguridad y Cumplimiento Listo',
          description: 'Acceso basado en roles, comunicaciones cifradas e infraestructura preparada para SOC 2, HIPAA y GDPR.',
        },
        {
          icon: Brain,
          title: 'Triage de Solicitudes con IA',
          description: 'Clasificación automática, detección de riesgos y priorización inteligente para cada solicitud.',
        },
        {
          icon: LayoutDashboard,
          title: 'Dashboards Transparentes',
          description: 'Visibilidad en tiempo real de horas usadas, estado de solicitudes y resúmenes mensuales.',
        },
        {
          icon: Clock,
          title: 'Flujos Basados en SLA',
          description: 'Tiempos de respuesta definidos, límites de alcance claros y modelos de entrega estructurados.',
        },
        {
          icon: Puzzle,
          title: 'Planes y Add-Ons Modulares',
          description: 'Previene el scope creep con paquetes estructurados. Paga solo por lo que necesitas.',
        },
        {
          icon: Globe,
          title: 'Empresa en EE.UU., Remota Primero',
          description: 'Empresa registrada en EE.UU. operando remotamente en todo el país. Sin overhead, pura experiencia.',
        },
      ],
    },
  };

  const c = content[lang];

  return (
    <section className="py-16 bg-muted/20 border-y border-border/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">
            {c.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {c.subtitle}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {c.features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border hover:border-primary/20 transition-colors"
            >
              <div className="flex-shrink-0 p-2.5 rounded-lg bg-primary/10">
                <feature.icon className="h-5 w-5 text-primary" />
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
