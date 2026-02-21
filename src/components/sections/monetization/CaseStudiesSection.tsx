import { motion } from 'framer-motion';
import { TrendingDown, Clock, ShieldCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const cases = [
  {
    icon: TrendingDown,
    type: { en: 'SaaS Company', es: 'Empresa SaaS' },
    detail: '32 Employees',
    metrics: [
      { en: 'Reduced AWS costs by 38% in 60 days', es: 'Reducción del 38% en costos AWS en 60 días' },
      { en: 'Improved deployment reliability', es: 'Mayor confiabilidad en despliegues' },
    ],
  },
  {
    icon: Clock,
    type: { en: 'Retail Business', es: 'Comercio Minorista' },
    detail: '14 Locations',
    metrics: [
      { en: '99.99% uptime achieved', es: '99.99% de disponibilidad alcanzada' },
      { en: 'Centralized cloud infrastructure', es: 'Infraestructura cloud centralizada' },
    ],
  },
  {
    icon: ShieldCheck,
    type: { en: 'Healthcare Provider', es: 'Proveedor de Salud' },
    detail: '',
    metrics: [
      { en: 'SOC 2-ready architecture in 90 days', es: 'Arquitectura lista para SOC 2 en 90 días' },
      { en: 'Improved security posture', es: 'Postura de seguridad mejorada' },
    ],
  },
];

export function CaseStudiesSection() {
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
          Real Results for Growing Businesses
        </h3>
        <p className="text-base text-muted-foreground/50">
          Resultados Reales para Empresas en Crecimiento
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cases.map((c) => {
          const Icon = c.icon;
          return (
            <Card key={c.type.en} className="border-border shadow-card rounded-xl">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-primary/5">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-foreground">{c.type.en}</h4>
                    {c.detail && (
                      <p className="text-xs text-muted-foreground/60">{c.detail}</p>
                    )}
                  </div>
                </div>
                <ul className="space-y-3">
                  {c.metrics.map((m) => (
                    <li key={m.en} className="text-[0.95rem] text-muted-foreground">
                      <span className="font-semibold text-foreground">{m.en}</span>
                      <span className="block text-xs text-muted-foreground/40 mt-0.5">{m.es}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </motion.div>
  );
}
