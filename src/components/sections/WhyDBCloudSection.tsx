import { motion } from 'framer-motion';
import { Check, X, AlertCircle, Zap, Shield, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLang } from '@/hooks/useLang';
import { useIsMobile } from '@/hooks/use-mobile';
import { siteConfig } from '@/config/site';

interface ComparisonRow {
  feature: string;
  freelancer: { icon: 'yes' | 'no' | 'partial'; text: string };
  inhouse: { icon: 'yes' | 'no' | 'partial'; text: string };
  msp: { icon: 'yes' | 'no' | 'partial'; text: string };
  dbcloud: { icon: 'yes'; text: string };
}

const content = {
  en: {
    badge: "Why SMBs Choose DBCloud",
    title: "Not all cloud support is created equal",
    subtitle: "Here's how DBCloud compares to the most common alternatives SMBs consider",
    columns: {
      feature: "Feature",
      freelancer: "Freelancer",
      inhouse: "In-House IT",
      msp: "Traditional MSP",
      dbcloud: "DBCloud",
    },
    rows: [
      { feature: "Senior-level engineers", freelancer: { icon: "no", text: "Unpredictable" }, inhouse: { icon: "partial", text: "Skill-limited" }, msp: { icon: "partial", text: "Inconsistent" }, dbcloud: { icon: "yes", text: "Always senior" } },
      { feature: "Multi-cloud expertise", freelancer: { icon: "no", text: "One cloud only" }, inhouse: { icon: "no", text: "Availability-dependent" }, msp: { icon: "partial", text: "Gaps in coverage" }, dbcloud: { icon: "yes", text: "All major clouds" } },
      { feature: "SLA & response times", freelancer: { icon: "no", text: "No SLAs" }, inhouse: { icon: "partial", text: "Informal only" }, msp: { icon: "yes", text: "Standard" }, dbcloud: { icon: "yes", text: "Guaranteed SLAs" } },
      { feature: "Long-term contracts", freelancer: { icon: "yes", text: "None" }, inhouse: { icon: "no", text: "Payroll burden" }, msp: { icon: "no", text: "Lock-in required" }, dbcloud: { icon: "yes", text: "Cancel anytime" } },
      { feature: "Cost predictability", freelancer: { icon: "no", text: "Hourly surprises" }, inhouse: { icon: "no", text: "High fixed cost" }, msp: { icon: "partial", text: "Hidden fees" }, dbcloud: { icon: "yes", text: "Flat monthly" } },
      { feature: "Backup coverage", freelancer: { icon: "no", text: "Single point of failure" }, inhouse: { icon: "no", text: "Vacation gaps" }, msp: { icon: "partial", text: "Rotation delays" }, dbcloud: { icon: "yes", text: "Full team backup" } },
      { feature: "Compliance-ready", freelancer: { icon: "no", text: "Not compliant" }, inhouse: { icon: "partial", text: "DIY burden" }, msp: { icon: "partial", text: "Extra cost" }, dbcloud: { icon: "yes", text: "Audit-ready" } },
      { feature: "AI-assisted ops", freelancer: { icon: "no", text: "Manual only" }, inhouse: { icon: "no", text: "No AI" }, msp: { icon: "no", text: "Legacy tools" }, dbcloud: { icon: "yes", text: "AI-powered" } },
      { feature: "Transparency", freelancer: { icon: "no", text: "Black box" }, inhouse: { icon: "no", text: "No visibility" }, msp: { icon: "partial", text: "Monthly reports" }, dbcloud: { icon: "yes", text: "Live dashboards" } },
      { feature: "Time to start", freelancer: { icon: "partial", text: "Days to weeks" }, inhouse: { icon: "no", text: "Months to hire" }, msp: { icon: "partial", text: "Weeks" }, dbcloud: { icon: "yes", text: "48h onboarding" } },
    ] as ComparisonRow[],
    differenceTitle: "The DBCloud Difference",
    differences: [
      "Senior cloud engineers only — no juniors",
      "One team, multiple clouds (AWS, Azure, GCP, Oracle)",
      "No vendor lock-in, no hidden scope",
      "Built for SMBs who need enterprise-grade reliability without enterprise pricing",
    ],
    fitTitle: "When DBCloud Is the Right Fit",
    fitSubtitle: "DBCloud is ideal if you:",
    fitItems: [
      "Don't want to hire or manage an internal IT team",
      "Are tired of slow responses or unclear ownership",
      "Need cloud, databases, and AI under one accountable partner",
      "Want predictable monthly costs with zero long-term commitment",
    ],
    ctaTitle: "Ready to see if DBCloud is a fit for your business?",
    ctaSubtitle: "No commitment · Talk directly with a senior engineer",
    ctaButton: "Schedule a Free Cloud Review",
  },
  es: {
    badge: "Por Qué las PyMEs Eligen DBCloud",
    title: "No todo el soporte cloud es igual",
    subtitle: "Así se compara DBCloud con las alternativas más comunes que consideran las PyMEs",
    columns: {
      feature: "Característica",
      freelancer: "Freelancer",
      inhouse: "IT Interno",
      msp: "MSP Tradicional",
      dbcloud: "DBCloud",
    },
    rows: [
      { feature: "Ingenieros nivel senior", freelancer: { icon: "no", text: "Impredecible" }, inhouse: { icon: "partial", text: "Habilidades limitadas" }, msp: { icon: "partial", text: "Inconsistente" }, dbcloud: { icon: "yes", text: "Siempre senior" } },
      { feature: "Experiencia multi-cloud", freelancer: { icon: "no", text: "Solo una nube" }, inhouse: { icon: "no", text: "Depende de disponibilidad" }, msp: { icon: "partial", text: "Brechas de cobertura" }, dbcloud: { icon: "yes", text: "Todas las nubes" } },
      { feature: "SLA y tiempos de respuesta", freelancer: { icon: "no", text: "Sin SLAs" }, inhouse: { icon: "partial", text: "Solo informal" }, msp: { icon: "yes", text: "Estándar" }, dbcloud: { icon: "yes", text: "SLAs garantizados" } },
      { feature: "Contratos a largo plazo", freelancer: { icon: "yes", text: "Ninguno" }, inhouse: { icon: "no", text: "Carga de nómina" }, msp: { icon: "no", text: "Lock-in requerido" }, dbcloud: { icon: "yes", text: "Cancela cuando quieras" } },
      { feature: "Costos predecibles", freelancer: { icon: "no", text: "Sorpresas por hora" }, inhouse: { icon: "no", text: "Costo fijo alto" }, msp: { icon: "partial", text: "Costos ocultos" }, dbcloud: { icon: "yes", text: "Tarifa fija mensual" } },
      { feature: "Cobertura de respaldo", freelancer: { icon: "no", text: "Punto único de falla" }, inhouse: { icon: "no", text: "Vacaciones sin cobertura" }, msp: { icon: "partial", text: "Retrasos en rotación" }, dbcloud: { icon: "yes", text: "Equipo completo" } },
      { feature: "Listo para cumplimiento", freelancer: { icon: "no", text: "No cumple" }, inhouse: { icon: "partial", text: "Carga DIY" }, msp: { icon: "partial", text: "Costo extra" }, dbcloud: { icon: "yes", text: "Listo para auditoría" } },
      { feature: "Operaciones con IA", freelancer: { icon: "no", text: "Solo manual" }, inhouse: { icon: "no", text: "Sin IA" }, msp: { icon: "no", text: "Herramientas legacy" }, dbcloud: { icon: "yes", text: "Con IA integrada" } },
      { feature: "Transparencia", freelancer: { icon: "no", text: "Caja negra" }, inhouse: { icon: "no", text: "Sin visibilidad" }, msp: { icon: "partial", text: "Reportes mensuales" }, dbcloud: { icon: "yes", text: "Dashboards en vivo" } },
      { feature: "Tiempo para comenzar", freelancer: { icon: "partial", text: "Días a semanas" }, inhouse: { icon: "no", text: "Meses para contratar" }, msp: { icon: "partial", text: "Semanas" }, dbcloud: { icon: "yes", text: "Onboarding 48h" } },
    ] as ComparisonRow[],
    differenceTitle: "La Diferencia DBCloud",
    differences: [
      "Solo ingenieros senior — sin juniors",
      "Un equipo, múltiples nubes (AWS, Azure, GCP, Oracle)",
      "Sin dependencia de proveedor, sin alcances ocultos",
      "Diseñado para PyMEs que necesitan confiabilidad empresarial sin precios empresariales",
    ],
    fitTitle: "Cuándo DBCloud Es la Opción Correcta",
    fitSubtitle: "DBCloud es ideal si:",
    fitItems: [
      "No quieres contratar o gestionar un equipo de IT interno",
      "Estás cansado de respuestas lentas o falta de responsabilidad clara",
      "Necesitas cloud, bases de datos e IA bajo un solo partner responsable",
      "Quieres costos mensuales predecibles sin compromisos a largo plazo",
    ],
    ctaTitle: "¿Listo para ver si DBCloud es adecuado para tu negocio?",
    ctaSubtitle: "Sin compromiso · Habla directamente con un ingeniero senior",
    ctaButton: "Agenda una Revisión Cloud Gratis",
  },
};

function CellContent({ icon, text, isDbCloud = false }: { icon: 'yes' | 'no' | 'partial'; text: string; isDbCloud?: boolean }) {
  const iconElement = {
    yes: <Check className={`h-4 w-4 flex-shrink-0 ${isDbCloud ? 'text-accent' : 'text-green-500'}`} />,
    no: <X className="h-4 w-4 flex-shrink-0 text-red-400" />,
    partial: <AlertCircle className="h-4 w-4 flex-shrink-0 text-yellow-500" />,
  }[icon];

  return (
    <div className={`flex items-center gap-1.5 justify-center ${isDbCloud ? 'font-semibold text-accent' : ''}`}>
      {iconElement}
      <span className={`text-sm ${isDbCloud ? '' : 'text-muted-foreground'}`}>{text}</span>
    </div>
  );
}

export function WhyDBCloudSection() {
  const { lang } = useLang();
  const t = content[lang];
  const isMobile = useIsMobile();

  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-base font-medium mb-5">
            <Zap className="h-5 w-5" />
            {t.badge}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-5">
            {t.title}
          </h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="max-w-5xl mx-auto mb-16"
        >
          <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
            {/* Render ONLY ONE layout to avoid any duplicated/plain-text fallback below */}
            {isMobile ? (
              <div className="divide-y">
                {t.rows.map((row, idx) => (
                  <div key={idx} className="p-4">
                    <p className="font-semibold text-base mb-3">{row.feature}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2 p-2 rounded bg-muted/30">
                        {row.freelancer.icon === 'no' && <X className="h-4 w-4 text-red-400 flex-shrink-0" />}
                        {row.freelancer.icon === 'yes' && <Check className="h-4 w-4 text-green-500 flex-shrink-0" />}
                        {row.freelancer.icon === 'partial' && <AlertCircle className="h-4 w-4 text-yellow-500 flex-shrink-0" />}
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground">{t.columns.freelancer}</span>
                          <span className="text-xs">{row.freelancer.text}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-2 rounded bg-muted/30">
                        {row.inhouse.icon === 'no' && <X className="h-4 w-4 text-red-400 flex-shrink-0" />}
                        {row.inhouse.icon === 'yes' && <Check className="h-4 w-4 text-green-500 flex-shrink-0" />}
                        {row.inhouse.icon === 'partial' && <AlertCircle className="h-4 w-4 text-yellow-500 flex-shrink-0" />}
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground">{t.columns.inhouse}</span>
                          <span className="text-xs">{row.inhouse.text}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-2 rounded bg-muted/30">
                        {row.msp.icon === 'no' && <X className="h-4 w-4 text-red-400 flex-shrink-0" />}
                        {row.msp.icon === 'yes' && <Check className="h-4 w-4 text-green-500 flex-shrink-0" />}
                        {row.msp.icon === 'partial' && <AlertCircle className="h-4 w-4 text-yellow-500 flex-shrink-0" />}
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground">{t.columns.msp}</span>
                          <span className="text-xs">{row.msp.text}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-2 rounded bg-accent/10 border border-accent/30">
                        <Check className="h-4 w-4 text-accent flex-shrink-0" />
                        <div className="flex flex-col">
                          <span className="text-xs text-accent font-medium">{t.columns.dbcloud}</span>
                          <span className="text-xs font-semibold text-accent">{row.dbcloud.text}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50 border-b">
                      <th className="text-left p-4 font-semibold text-base">{t.columns.feature}</th>
                      <th className="text-center p-4 font-medium text-base text-muted-foreground">{t.columns.freelancer}</th>
                      <th className="text-center p-4 font-medium text-base text-muted-foreground">{t.columns.inhouse}</th>
                      <th className="text-center p-4 font-medium text-base text-muted-foreground">{t.columns.msp}</th>
                      <th className="text-center p-4 font-bold text-base text-accent bg-accent/10 border-l-2 border-accent">{t.columns.dbcloud}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {t.rows.map((row, idx) => (
                      <tr key={idx} className={idx !== t.rows.length - 1 ? 'border-b' : ''}>
                        <td className="p-4 text-base font-medium">{row.feature}</td>
                        <td className="p-4"><CellContent icon={row.freelancer.icon} text={row.freelancer.text} /></td>
                        <td className="p-4"><CellContent icon={row.inhouse.icon} text={row.inhouse.text} /></td>
                        <td className="p-4"><CellContent icon={row.msp.icon} text={row.msp.text} /></td>
                        <td className="p-4 bg-accent/10 border-l-2 border-accent">
                          <CellContent icon={row.dbcloud.icon} text={row.dbcloud.text} isDbCloud />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </motion.div>

        {/* The DBCloud Difference + When DBCloud Is Right Fit */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {/* Difference */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-xl border p-8"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="p-3 rounded-lg bg-accent/10">
                <Shield className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-display text-2xl font-bold">{t.differenceTitle}</h3>
            </div>
            <ul className="space-y-4">
              {t.differences.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-base">
                  <Check className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right Fit */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-xl border p-8"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 rounded-lg bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-2xl font-bold">{t.fitTitle}</h3>
            </div>
            <p className="text-muted-foreground text-base mb-5">{t.fitSubtitle}</p>
            <ul className="space-y-4">
              {t.fitItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-base">
                  <Check className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="font-display text-2xl sm:text-3xl font-bold mb-3">{t.ctaTitle}</h3>
          <p className="text-lg text-muted-foreground mb-8">{t.ctaSubtitle}</p>
          <Button
            size="lg"
            asChild
            className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg"
          >
            <a href={siteConfig.SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
              {t.ctaButton}
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
