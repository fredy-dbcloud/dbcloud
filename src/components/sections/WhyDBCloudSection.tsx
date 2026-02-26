import { motion } from 'framer-motion';
import { Check, X, AlertCircle, Zap, Users, Globe, FileText, Shield } from 'lucide-react';
import { useLang } from '@/hooks/useLang';
import { useIsMobile } from '@/hooks/use-mobile';

interface ComparisonRow {
  feature: string;
  freelancer: { icon: 'yes' | 'no' | 'partial'; text: string };
  inhouse: { icon: 'yes' | 'no' | 'partial'; text: string };
  msp: { icon: 'yes' | 'no' | 'partial'; text: string };
  dbcloud: { icon: 'yes'; text: string };
}

const differentiators = {
  en: [
    { icon: Users, text: 'Senior engineers only' },
    { icon: Globe, text: 'AWS, Azure, GCP, Oracle' },
    { icon: FileText, text: 'No long-term contracts' },
    { icon: Shield, text: 'Team structure — no SPOF' },
  ],
  es: [
    { icon: Users, text: 'Solo ingenieros senior' },
    { icon: Globe, text: 'AWS, Azure, GCP, Oracle' },
    { icon: FileText, text: 'Sin contratos largos' },
    { icon: Shield, text: 'Equipo — sin punto único de falla' },
  ],
};

const content = {
  en: {
    badge: 'Why SMBs Choose DBCloud',
    title: 'Not all cloud support is equal',
    columns: {
      feature: 'Feature',
      freelancer: 'Freelancer',
      inhouse: 'In-House IT',
      msp: 'Traditional MSP',
      dbcloud: 'DBCloud',
    },
    rows: [
      { feature: 'Senior-level engineers', freelancer: { icon: 'no', text: 'Unpredictable' }, inhouse: { icon: 'partial', text: 'Skill-limited' }, msp: { icon: 'partial', text: 'Inconsistent' }, dbcloud: { icon: 'yes', text: 'Always senior' } },
      { feature: 'Multi-cloud expertise', freelancer: { icon: 'no', text: 'One cloud only' }, inhouse: { icon: 'no', text: 'Availability-dependent' }, msp: { icon: 'partial', text: 'Gaps in coverage' }, dbcloud: { icon: 'yes', text: 'All major clouds' } },
      { feature: 'SLA & response times', freelancer: { icon: 'no', text: 'No SLAs' }, inhouse: { icon: 'partial', text: 'Informal only' }, msp: { icon: 'yes', text: 'Standard' }, dbcloud: { icon: 'yes', text: 'Guaranteed SLAs' } },
      { feature: 'Long-term contracts', freelancer: { icon: 'yes', text: 'None' }, inhouse: { icon: 'no', text: 'Payroll burden' }, msp: { icon: 'no', text: 'Lock-in required' }, dbcloud: { icon: 'yes', text: 'Cancel anytime' } },
      { feature: 'Time to start', freelancer: { icon: 'partial', text: 'Days to weeks' }, inhouse: { icon: 'no', text: 'Months to hire' }, msp: { icon: 'partial', text: 'Weeks' }, dbcloud: { icon: 'yes', text: '48h onboarding' } },
    ] as ComparisonRow[],
  },
  es: {
    badge: 'Por Qué las PyMEs Eligen DBCloud',
    title: 'No todo el soporte cloud es igual',
    columns: {
      feature: 'Característica',
      freelancer: 'Freelancer',
      inhouse: 'IT Interno',
      msp: 'MSP Tradicional',
      dbcloud: 'DBCloud',
    },
    rows: [
      { feature: 'Ingenieros senior', freelancer: { icon: 'no', text: 'Impredecible' }, inhouse: { icon: 'partial', text: 'Limitado' }, msp: { icon: 'partial', text: 'Inconsistente' }, dbcloud: { icon: 'yes', text: 'Siempre senior' } },
      { feature: 'Experiencia multi-cloud', freelancer: { icon: 'no', text: 'Solo una nube' }, inhouse: { icon: 'no', text: 'Depende' }, msp: { icon: 'partial', text: 'Brechas' }, dbcloud: { icon: 'yes', text: 'Todas las nubes' } },
      { feature: 'SLAs y tiempos', freelancer: { icon: 'no', text: 'Sin SLAs' }, inhouse: { icon: 'partial', text: 'Informal' }, msp: { icon: 'yes', text: 'Estándar' }, dbcloud: { icon: 'yes', text: 'SLAs garantizados' } },
      { feature: 'Contratos', freelancer: { icon: 'yes', text: 'Ninguno' }, inhouse: { icon: 'no', text: 'Nómina' }, msp: { icon: 'no', text: 'Lock-in' }, dbcloud: { icon: 'yes', text: 'Cancela cuando quieras' } },
      { feature: 'Tiempo para iniciar', freelancer: { icon: 'partial', text: 'Días-semanas' }, inhouse: { icon: 'no', text: 'Meses' }, msp: { icon: 'partial', text: 'Semanas' }, dbcloud: { icon: 'yes', text: 'Onboarding 48h' } },
    ] as ComparisonRow[],
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
  const diffs = differentiators[lang];
  const isMobile = useIsMobile();

  return (
    <section className="py-24 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-5">
            <Zap className="h-4 w-4" />
            {t.badge}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold">
            {t.title}
          </h2>
        </motion.div>

        {/* Differentiators strip */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mb-12">
          {diffs.map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
              <item.icon className="h-4 w-4 text-accent flex-shrink-0" />
              <span className="font-medium">{item.text}</span>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
            {isMobile ? (
              <div className="divide-y">
                {t.rows.map((row, idx) => (
                  <div key={idx} className="p-4">
                    <p className="font-semibold text-sm mb-3">{row.feature}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2 p-2 rounded bg-muted/30">
                        {row.freelancer.icon === 'no' && <X className="h-3.5 w-3.5 text-red-400 flex-shrink-0" />}
                        {row.freelancer.icon === 'yes' && <Check className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />}
                        {row.freelancer.icon === 'partial' && <AlertCircle className="h-3.5 w-3.5 text-yellow-500 flex-shrink-0" />}
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground">{t.columns.freelancer}</span>
                          <span className="text-xs">{row.freelancer.text}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-2 rounded bg-muted/30">
                        {row.inhouse.icon === 'no' && <X className="h-3.5 w-3.5 text-red-400 flex-shrink-0" />}
                        {row.inhouse.icon === 'yes' && <Check className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />}
                        {row.inhouse.icon === 'partial' && <AlertCircle className="h-3.5 w-3.5 text-yellow-500 flex-shrink-0" />}
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground">{t.columns.inhouse}</span>
                          <span className="text-xs">{row.inhouse.text}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-2 rounded bg-muted/30">
                        {row.msp.icon === 'no' && <X className="h-3.5 w-3.5 text-red-400 flex-shrink-0" />}
                        {row.msp.icon === 'yes' && <Check className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />}
                        {row.msp.icon === 'partial' && <AlertCircle className="h-3.5 w-3.5 text-yellow-500 flex-shrink-0" />}
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground">{t.columns.msp}</span>
                          <span className="text-xs">{row.msp.text}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-2 rounded bg-accent/10 border border-accent/30">
                        <Check className="h-3.5 w-3.5 text-accent flex-shrink-0" />
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
                      <th className="text-left p-4 font-semibold text-sm">{t.columns.feature}</th>
                      <th className="text-center p-4 font-medium text-sm text-muted-foreground">{t.columns.freelancer}</th>
                      <th className="text-center p-4 font-medium text-sm text-muted-foreground">{t.columns.inhouse}</th>
                      <th className="text-center p-4 font-medium text-sm text-muted-foreground">{t.columns.msp}</th>
                      <th className="text-center p-4 font-bold text-sm text-accent bg-accent/10 border-l-2 border-accent">{t.columns.dbcloud}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {t.rows.map((row, idx) => (
                      <tr key={idx} className={idx !== t.rows.length - 1 ? 'border-b' : ''}>
                        <td className="p-4 text-sm font-medium">{row.feature}</td>
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
      </div>
    </section>
  );
}
