import { motion } from 'framer-motion';
import { Check, TrendingDown, TrendingUp, Shield, Server, BarChart3, MapPin, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLang } from '@/hooks/useLang';

/* ─── Bilingual content (EN primary, ES secondary) ─── */

const plans = [
  {
    name: 'Starter',
    price: { en: 'Starting at $1,500/month', es: 'Desde $1,500/mes' },
    features: {
      en: ['1 Cloud environment', 'Managed database', 'SLA-backed response times', 'Security baseline'],
      es: ['1 Entorno Cloud', 'Base de datos administrada', 'Tiempos de respuesta con SLA', 'Línea base de seguridad'],
    },
    popular: false,
  },
  {
    name: 'Growth',
    price: { en: 'Starting at $2,900/month', es: 'Desde $2,900/mes' },
    features: {
      en: ['Multi-cloud support', '24/7 monitoring', 'Compliance-ready architecture', 'Cost optimization'],
      es: ['Soporte multi-cloud', 'Monitoreo 24/7', 'Arquitectura lista para cumplimiento', 'Optimización de costos'],
    },
    popular: true,
    badge: { en: 'Most Popular', es: 'Más elegido' },
  },
  {
    name: 'Enterprise',
    price: { en: 'Custom Pricing', es: 'Precio personalizado' },
    features: {
      en: ['Dedicated support structure', 'Advanced compliance (SOC 2 / HIPAA / GDPR)', 'AI-powered operations', 'Executive reporting'],
      es: ['Estructura de soporte dedicada', 'Cumplimiento avanzado (SOC 2 / HIPAA / GDPR)', 'Operaciones con IA', 'Reportes ejecutivos'],
    },
    popular: false,
  },
];

const planIcons = [Server, BarChart3, Shield];

const inhouseItems = [
  { label: { en: 'Average Salary', es: 'Salario promedio' }, value: '$140,000+' },
  { label: { en: 'Benefits & Taxes', es: 'Beneficios e impuestos' }, value: '$30,000+' },
  { label: { en: 'Recruiting & Onboarding', es: 'Reclutamiento y onboarding' }, value: '$15,000+' },
  { label: { en: 'Vacation / Gaps / Single Point of Failure', es: 'Vacaciones / Brechas / Punto único de falla' }, value: '' },
];

const dbcloudItems = {
  en: [
    'Starting at $18,000/year',
    'Senior-level engineers only',
    'Multi-cloud coverage',
    'Backup team structure',
    'Built-in compliance readiness',
  ],
  es: [
    'Desde $18,000/año',
    'Solo ingenieros senior',
    'Cobertura multi-cloud',
    'Estructura de equipo de respaldo',
    'Cumplimiento integrado',
  ],
};

/* ─── Bilingual label helper ─── */
function BiLabel({ en, es, esClass = 'text-sm text-muted-foreground/70' }: { en: React.ReactNode; es: React.ReactNode; esClass?: string }) {
  return (
    <>
      <span className="block">{en}</span>
      <span className={`block ${esClass}`}>{es}</span>
    </>
  );
}

export function MonetizationSection() {
  const { lang } = useLang();

  const scrollToSchedule = () => {
    const el = document.getElementById('schedule') || document.querySelector('a[href*="schedule"]');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      if (el instanceof HTMLAnchorElement) el.click();
    } else {
      window.location.href = `/${lang}/schedule`;
    }
  };

  const goToContact = () => {
    window.location.href = `/${lang}/contact`;
  };

  return (
    <section className="py-24 lg:py-28 bg-background">
      <div className="container max-w-6xl">

        {/* ── Headline ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-2 leading-tight">
            Enterprise-Grade Cloud Support — Without Enterprise Payroll
          </h2>
          <p className="text-xl sm:text-2xl text-muted-foreground/60 font-medium mb-6">
            Soporte Cloud de Nivel Empresarial — Sin Nómina Empresarial
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-1">
            Most SMBs overspend on internal hiring before realizing they only needed the right cloud partner.
          </p>
          <p className="text-base text-muted-foreground/60 max-w-3xl mx-auto leading-relaxed">
            La mayoría de las PYMEs invierten demasiado en contratación interna antes de darse cuenta de que solo necesitaban el socio cloud correcto.
          </p>
        </motion.div>

        {/* ── PART 1 — Price Anchor Grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4"
        >
          {plans.map((plan, i) => {
            const Icon = planIcons[i];
            return (
              <Card
                key={plan.name}
                className={`relative transition-shadow duration-300 ${
                  plan.popular
                    ? 'border-accent shadow-lg ring-1 ring-accent/20'
                    : 'border-border shadow-sm hover:shadow-md'
                }`}
              >
                {plan.popular && plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
                      <BiLabel en={plan.badge.en} es={plan.badge.es} esClass="text-[0.65rem] text-accent-foreground/70" />
                    </span>
                  </div>
                )}
                <CardContent className="p-8 pt-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/5">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                  </div>
                  {/* Price */}
                  <p className="text-lg font-semibold text-accent mb-1">{plan.price.en}</p>
                  <p className="text-sm text-muted-foreground/60 mb-2">{plan.price.es}</p>
                  {/* Scope microcopy */}
                  <p className="text-xs text-muted-foreground/50 mb-6 leading-snug">
                    Final pricing depends on scope and cloud complexity.
                    <br />
                    <span className="text-muted-foreground/40">El precio final depende del alcance y complejidad cloud.</span>
                  </p>
                  <ul className="space-y-3">
                    {plan.features.en.map((f, fi) => (
                      <li key={f} className="flex items-start gap-2 text-base text-muted-foreground">
                        <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span>
                          <span className="block">{f}</span>
                          <span className="block text-sm text-muted-foreground/50">{plan.features.es[fi]}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </motion.div>

        {/* Risk-reversal microcopy */}
        <div className="text-center mb-24 space-y-1">
          <p className="text-sm text-muted-foreground">
            No setup fees. Cancel anytime. Start in 48 hours.
          </p>
          <p className="text-xs text-muted-foreground/50">
            Sin costos de implementación. Cancela cuando quieras. Inicia en 48 horas.
          </p>
        </div>

        {/* ── PART 2 — ROI Comparison ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mb-6"
        >
          <div className="text-center mb-10">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-1">
              Why Outsource Beats In-House
            </h3>
            <p className="text-lg text-muted-foreground/60">
              Por qué externalizar supera a la contratación interna
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* In-House Card */}
            <Card className="border-border shadow-sm">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-destructive/10">
                    <TrendingDown className="h-5 w-5 text-destructive" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">In-House Cloud Engineer</h3>
                    <p className="text-sm text-muted-foreground/60">Ingeniero Cloud Interno</p>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  {inhouseItems.map((item) => (
                    <li key={item.label.en} className="flex items-center justify-between text-base">
                      <span className="text-muted-foreground">
                        <span className="block">{item.label.en}</span>
                        <span className="block text-sm text-muted-foreground/50">{item.label.es}</span>
                      </span>
                      {item.value && <span className="font-semibold text-foreground">{item.value}</span>}
                    </li>
                  ))}
                </ul>
                <div className="pt-6 border-t border-border">
                  <p className="text-2xl font-bold text-destructive text-center">$185,000+</p>
                  <p className="text-sm text-muted-foreground text-center mt-1">per year</p>
                  <p className="text-xs text-muted-foreground/50 text-center">al año</p>
                </div>
              </CardContent>
            </Card>

            {/* DBCloud Card */}
            <Card className="border-accent/30 shadow-md ring-1 ring-accent/10">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <TrendingUp className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">DBCloud Managed Team</h3>
                    <p className="text-sm text-muted-foreground/60">Equipo Gestionado DBCloud</p>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  {dbcloudItems.en.map((item, i) => (
                    <li key={item} className="flex items-center gap-2 text-base text-muted-foreground">
                      <Check className="h-5 w-5 text-accent flex-shrink-0" />
                      <span>
                        <span className="block">{item}</span>
                        <span className="block text-sm text-muted-foreground/50">{dbcloudItems.es[i]}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="pt-6 border-t border-border text-center">
                  <p className="text-4xl font-bold text-accent">$167,000+</p>
                  <p className="text-sm text-muted-foreground mt-1">Estimated annual savings vs internal hire</p>
                  <p className="text-xs text-muted-foreground/50">Ahorro anual estimado frente a contratación interna</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Micro-proof: compliance */}
        <div className="text-center mb-6 space-y-1">
          <p className="text-sm text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Most clients reduce cloud-related operational costs by 60–80% within the first year.
          </p>
          <p className="text-xs text-muted-foreground/50 max-w-3xl mx-auto">
            La mayoría de nuestros clientes reducen costos operativos cloud entre un 60% y 80% durante el primer año.
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground/70 mb-24">
          <Shield className="h-4 w-4 text-accent/60" />
          <span>Built for SOC 2, HIPAA, and GDPR-aligned operations.</span>
        </div>
        <p className="text-xs text-muted-foreground/40 text-center -mt-20 mb-24">
          Diseñado para operaciones alineadas con SOC 2, HIPAA y GDPR.
        </p>

        {/* ── PART 3 — Dual CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center bg-muted/40 rounded-2xl p-10 lg:p-14 border border-border"
        >
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-1">
            Get a Free Cloud Cost & Risk Assessment
          </h3>
          <p className="text-lg text-muted-foreground/60 mb-4">
            Obtén una Evaluación Gratuita de Costos y Riesgos Cloud
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-2 leading-relaxed">
            In one short call, we'll identify cost leaks, risk exposure, and optimization opportunities.
          </p>
          <p className="text-base text-muted-foreground/50 max-w-2xl mx-auto mb-10 leading-relaxed">
            En una breve llamada identificaremos fugas de costos, riesgos y oportunidades de optimización.
          </p>

          {/* Primary CTA */}
          <div className="mb-4">
            <Button size="lg" onClick={scrollToSchedule}>
              Schedule My Free Assessment
            </Button>
            <p className="text-sm text-muted-foreground/50 mt-2">Agendar Evaluación Gratuita</p>
          </div>

          {/* Secondary CTA */}
          <div className="mb-6">
            <Button variant="outline" size="default" onClick={goToContact}>
              Get the Cost Optimization Checklist
            </Button>
            <p className="text-xs text-muted-foreground/40 mt-1">Recibir Checklist de Optimización</p>
          </div>

          <p className="text-sm text-muted-foreground">No commitment. No sales pressure. Just clarity.</p>
          <p className="text-xs text-muted-foreground/40 mt-1">Sin compromiso. Sin presión comercial. Solo claridad.</p>
        </motion.div>

        {/* ── LATAM Trust Signal ── */}
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground/60 mt-10">
          <Globe className="h-4 w-4 text-accent/50" />
          <span>Serving businesses across the United States and Latin America.</span>
        </div>
        <p className="text-xs text-muted-foreground/40 text-center mt-1">
          Atendiendo empresas en Estados Unidos y Latinoamérica.
        </p>
      </div>
    </section>
  );
}
