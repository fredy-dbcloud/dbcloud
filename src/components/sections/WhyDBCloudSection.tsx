import { motion } from 'framer-motion';
import { Check, X, AlertCircle, Zap, Shield, Clock, Users, DollarSign, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLang } from '@/hooks/useLang';
import { siteConfig } from '@/config/site';

type CellValue = 'yes' | 'no' | 'partial' | 'limited';

interface ComparisonRow {
  feature: string;
  freelancer: CellValue;
  inhouse: CellValue;
  msp: CellValue;
  dbcloud: CellValue;
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
      { feature: "Senior-level engineers", freelancer: "no", inhouse: "limited", msp: "partial", dbcloud: "yes" },
      { feature: "AWS, Azure, GCP & Oracle expertise", freelancer: "partial", inhouse: "no", msp: "limited", dbcloud: "yes" },
      { feature: "SLA & response times", freelancer: "no", inhouse: "partial", msp: "yes", dbcloud: "yes" },
      { feature: "Long-term contracts", freelancer: "no", inhouse: "no", msp: "no", dbcloud: "yes" },
      { feature: "Cost predictability", freelancer: "partial", inhouse: "no", msp: "partial", dbcloud: "yes" },
      { feature: "Coverage if someone is unavailable", freelancer: "no", inhouse: "no", msp: "partial", dbcloud: "yes" },
      { feature: "Compliance-ready (SOC 2, HIPAA, GDPR)", freelancer: "no", inhouse: "partial", msp: "partial", dbcloud: "yes" },
      { feature: "AI-assisted operations", freelancer: "no", inhouse: "no", msp: "no", dbcloud: "yes" },
      { feature: "Transparency & dashboards", freelancer: "no", inhouse: "no", msp: "partial", dbcloud: "yes" },
      { feature: "Time to get started", freelancer: "partial", inhouse: "no", msp: "partial", dbcloud: "yes" },
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
      { feature: "Ingenieros nivel senior", freelancer: "no", inhouse: "limited", msp: "partial", dbcloud: "yes" },
      { feature: "Experiencia AWS, Azure, GCP y Oracle", freelancer: "partial", inhouse: "no", msp: "limited", dbcloud: "yes" },
      { feature: "SLA y tiempos de respuesta", freelancer: "no", inhouse: "partial", msp: "yes", dbcloud: "yes" },
      { feature: "Contratos a largo plazo", freelancer: "no", inhouse: "no", msp: "no", dbcloud: "yes" },
      { feature: "Costos predecibles", freelancer: "partial", inhouse: "no", msp: "partial", dbcloud: "yes" },
      { feature: "Cobertura si alguien no está disponible", freelancer: "no", inhouse: "no", msp: "partial", dbcloud: "yes" },
      { feature: "Listo para cumplimiento (SOC 2, HIPAA, GDPR)", freelancer: "no", inhouse: "partial", msp: "partial", dbcloud: "yes" },
      { feature: "Operaciones asistidas por IA", freelancer: "no", inhouse: "no", msp: "no", dbcloud: "yes" },
      { feature: "Transparencia y dashboards", freelancer: "no", inhouse: "no", msp: "partial", dbcloud: "yes" },
      { feature: "Tiempo para comenzar", freelancer: "partial", inhouse: "no", msp: "partial", dbcloud: "yes" },
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

function CellIcon({ value }: { value: CellValue }) {
  switch (value) {
    case 'yes':
      return <Check className="h-5 w-5 text-accent" />;
    case 'no':
      return <X className="h-5 w-5 text-muted-foreground/40" />;
    case 'partial':
      return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    case 'limited':
      return <AlertCircle className="h-4 w-4 text-orange-400" />;
    default:
      return null;
  }
}

export function WhyDBCloudSection() {
  const { lang } = useLang();
  const t = content[lang];

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
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50 border-b">
                    <th className="text-left p-4 font-semibold text-base">{t.columns.feature}</th>
                    <th className="text-center p-4 font-medium text-base text-muted-foreground">{t.columns.freelancer}</th>
                    <th className="text-center p-4 font-medium text-base text-muted-foreground">{t.columns.inhouse}</th>
                    <th className="text-center p-4 font-medium text-base text-muted-foreground">{t.columns.msp}</th>
                    <th className="text-center p-4 font-semibold text-base text-primary bg-primary/5">{t.columns.dbcloud}</th>
                  </tr>
                </thead>
                <tbody>
                  {t.rows.map((row, idx) => (
                    <tr key={idx} className={idx !== t.rows.length - 1 ? 'border-b' : ''}>
                      <td className="p-4 text-base font-medium">{row.feature}</td>
                      <td className="p-4 text-center"><CellIcon value={row.freelancer} /></td>
                      <td className="p-4 text-center"><CellIcon value={row.inhouse} /></td>
                      <td className="p-4 text-center"><CellIcon value={row.msp} /></td>
                      <td className="p-4 text-center bg-primary/5"><CellIcon value={row.dbcloud} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y">
              {t.rows.map((row, idx) => (
                <div key={idx} className="p-5">
                  <p className="font-medium text-base mb-4">{row.feature}</p>
                  <div className="grid grid-cols-4 gap-3 text-sm">
                    <div className="flex flex-col items-center gap-1.5">
                      <CellIcon value={row.freelancer} />
                      <span className="text-muted-foreground">{t.columns.freelancer}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5">
                      <CellIcon value={row.inhouse} />
                      <span className="text-muted-foreground">{t.columns.inhouse}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5">
                      <CellIcon value={row.msp} />
                      <span className="text-muted-foreground">{t.columns.msp}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5 bg-primary/5 rounded-lg py-2">
                      <CellIcon value={row.dbcloud} />
                      <span className="text-primary font-medium">{t.columns.dbcloud}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
