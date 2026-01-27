import { motion } from 'framer-motion';
import { useLang } from '@/hooks/useLang';
import { 
  Shield, 
  Brain, 
  LayoutDashboard, 
  Clock, 
  Puzzle, 
  CheckCircle 
} from 'lucide-react';

/**
 * Enterprise Standards Section
 * Replaces fake client logos with credibility-driven trust signals.
 * Shows architectural and operational principles that build trust.
 */
export function EnterpriseStandardsSection() {
  const { lang } = useLang();

  const content = {
    en: {
      title: 'Built for Enterprise Standards',
      subtitle: 'Designed using the same operational principles trusted by high-growth enterprise consultancies.',
      features: [
        {
          icon: Shield,
          title: 'Security-First Architecture',
          description: 'Role-based access control, encrypted communications, and audit-ready infrastructure.',
        },
        {
          icon: Brain,
          title: 'AI-Driven Operations',
          description: 'Automated request triage, intelligent prioritization, and predictive health monitoring.',
        },
        {
          icon: LayoutDashboard,
          title: 'Transparent Dashboards',
          description: 'Real-time visibility into hours used, requests status, and monthly summaries.',
        },
        {
          icon: Clock,
          title: 'SLA-Based Workflows',
          description: 'Defined response times, clear scope boundaries, and structured delivery models.',
        },
        {
          icon: Puzzle,
          title: 'Modular Add-ons',
          description: 'Prevent scope creep with structured add-on packages for out-of-scope work.',
        },
        {
          icon: CheckCircle,
          title: 'Enterprise Compliance Ready',
          description: 'SOC 2, HIPAA, and GDPR compliant infrastructure available for Enterprise tier.',
        },
      ],
    },
    es: {
      title: 'Construido para Estándares Empresariales',
      subtitle: 'Diseñado utilizando los mismos principios operativos de confianza de consultorías empresariales de alto crecimiento.',
      features: [
        {
          icon: Shield,
          title: 'Arquitectura de Seguridad Primero',
          description: 'Control de acceso basado en roles, comunicaciones cifradas e infraestructura lista para auditorías.',
        },
        {
          icon: Brain,
          title: 'Operaciones Impulsadas por IA',
          description: 'Triage automatizado de solicitudes, priorización inteligente y monitoreo predictivo de salud.',
        },
        {
          icon: LayoutDashboard,
          title: 'Paneles Transparentes',
          description: 'Visibilidad en tiempo real de horas usadas, estado de solicitudes y resúmenes mensuales.',
        },
        {
          icon: Clock,
          title: 'Flujos de Trabajo Basados en SLA',
          description: 'Tiempos de respuesta definidos, límites de alcance claros y modelos de entrega estructurados.',
        },
        {
          icon: Puzzle,
          title: 'Complementos Modulares',
          description: 'Previene el scope creep con paquetes de complementos estructurados para trabajo fuera de alcance.',
        },
        {
          icon: CheckCircle,
          title: 'Listo para Cumplimiento Empresarial',
          description: 'Infraestructura compatible con SOC 2, HIPAA y GDPR disponible para el nivel Enterprise.',
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
