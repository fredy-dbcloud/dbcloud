import { motion } from 'framer-motion';
import { ClipboardCheck, Zap, Headphones } from 'lucide-react';

const steps = [
  {
    icon: ClipboardCheck,
    title: { en: 'Assessment', es: 'Evaluación' },
    desc: { en: 'Cloud cost, risk & architecture review', es: 'Revisión de costos, riesgos y arquitectura cloud' },
  },
  {
    icon: Zap,
    title: { en: 'Optimization', es: 'Optimización' },
    desc: { en: 'Cost reduction, performance tuning, compliance alignment', es: 'Reducción de costos, ajuste de rendimiento, alineación de cumplimiento' },
  },
  {
    icon: Headphones,
    title: { en: 'Ongoing Managed Support', es: 'Soporte Gestionado Continuo' },
    desc: { en: 'Proactive monitoring, SLA-backed response, strategic guidance', es: 'Monitoreo proactivo, respuesta con SLA, orientación estratégica' },
  },
];

export function HowItWorksSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="mb-28"
    >
      <div className="text-center mb-14">
        <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
          How It Works
        </h3>
        <p className="text-base text-muted-foreground/50">
          Cómo Funciona
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={step.title.en} className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/5 mb-5">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <div className="text-xs font-semibold text-muted-foreground/50 uppercase tracking-wider mb-2">
                Step {i + 1}
              </div>
              <h4 className="text-lg font-bold text-foreground mb-1">{step.title.en}</h4>
              <p className="text-xs text-muted-foreground/50 mb-3">{step.title.es}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc.en}</p>
              <p className="text-xs text-muted-foreground/40 mt-1">{step.desc.es}</p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
