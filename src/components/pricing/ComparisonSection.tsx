import { useLang } from '@/hooks/useLang';
import { Check, Minus } from 'lucide-react';
import { motion } from 'framer-motion';

const comparisonData = {
  en: {
    title: "DBCloud vs In-House Support for Small Businesses",
    subtitle: "A practical comparison to help you decide",
    dbcloud: "DBCloud",
    inhouse: "In-House Hire",
    dimensions: [
      {
        label: "Cost Predictability",
        dbcloud: "Fixed monthly fee, no surprises",
        inhouse: "Salary + benefits + tools + training",
        dbcloudBetter: true,
      },
      {
        label: "Time to Start",
        dbcloud: "48 hours to onboard",
        inhouse: "2–4 months to hire & train",
        dbcloudBetter: true,
      },
      {
        label: "Coverage During Absences",
        dbcloud: "Team-based, always covered",
        inhouse: "Vacation = no coverage",
        dbcloudBetter: true,
      },
      {
        label: "Multi-Cloud Expertise",
        dbcloud: "AWS, Azure, GCP, Oracle — one team",
        inhouse: "Limited to one person's skills",
        dbcloudBetter: true,
      },
      {
        label: "Scalability",
        dbcloud: "Upgrade plan as you grow",
        inhouse: "Hire more people",
        dbcloudBetter: true,
      },
    ],
    note: "DBCloud complements or replaces fragile in-house setups — without requiring full-time hires.",
  },
  es: {
    title: "DBCloud vs Soporte Interno para PyMEs",
    subtitle: "Una comparación práctica para ayudarte a decidir",
    dbcloud: "DBCloud",
    inhouse: "Contratación Interna",
    dimensions: [
      {
        label: "Predictibilidad de Costos",
        dbcloud: "Tarifa mensual fija, sin sorpresas",
        inhouse: "Salario + beneficios + herramientas + capacitación",
        dbcloudBetter: true,
      },
      {
        label: "Tiempo para Iniciar",
        dbcloud: "48 horas para comenzar",
        inhouse: "2–4 meses para contratar y capacitar",
        dbcloudBetter: true,
      },
      {
        label: "Cobertura Durante Ausencias",
        dbcloud: "Equipo dedicado, siempre cubierto",
        inhouse: "Vacaciones = sin cobertura",
        dbcloudBetter: true,
      },
      {
        label: "Experiencia Multi-Cloud",
        dbcloud: "AWS, Azure, GCP, Oracle — un equipo",
        inhouse: "Limitado a las habilidades de una persona",
        dbcloudBetter: true,
      },
      {
        label: "Escalabilidad",
        dbcloud: "Mejora tu plan conforme creces",
        inhouse: "Contratar más personas",
        dbcloudBetter: true,
      },
    ],
    note: "DBCloud complementa o reemplaza configuraciones internas frágiles — sin requerir contrataciones de tiempo completo.",
  },
};

export function ComparisonSection() {
  const { lang } = useLang();
  const data = comparisonData[lang];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">
              {data.title}
            </h2>
            <p className="text-muted-foreground">{data.subtitle}</p>
          </div>

          {/* Comparison Table */}
          <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-3 bg-muted/50 border-b">
              <div className="p-4 font-medium text-muted-foreground text-sm"></div>
              <div className="p-4 text-center font-semibold text-primary border-l">
                {data.dbcloud}
              </div>
              <div className="p-4 text-center font-medium text-muted-foreground border-l">
                {data.inhouse}
              </div>
            </div>

            {/* Rows */}
            {data.dimensions.map((dim, index) => (
              <div
                key={dim.label}
                className={`grid grid-cols-3 ${index !== data.dimensions.length - 1 ? 'border-b' : ''}`}
              >
                <div className="p-4 font-medium text-sm flex items-center">
                  {dim.label}
                </div>
                <div className="p-4 text-sm border-l bg-accent/5 flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent flex-shrink-0" />
                  <span>{dim.dbcloud}</span>
                </div>
                <div className="p-4 text-sm border-l text-muted-foreground flex items-center gap-2">
                  <Minus className="h-4 w-4 text-muted-foreground/50 flex-shrink-0" />
                  <span>{dim.inhouse}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Note */}
          <p className="text-center text-sm text-muted-foreground mt-6 max-w-2xl mx-auto">
            {data.note}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
