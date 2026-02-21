import { motion } from 'framer-motion';
import { Check, TrendingDown, TrendingUp, Shield, Server, BarChart3, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLang } from '@/hooks/useLang';

/* ─── Data ─── */

const plans = [
  {
    name: 'Starter',
    price: { en: '$1,500', es: '/mes' },
    period: { en: '/month', es: '' },
    features: {
      en: ['1 Cloud environment', 'Managed database', 'SLA-backed response times', 'Security baseline'],
      es: ['1 Entorno Cloud', 'Base de datos administrada', 'Tiempos de respuesta con SLA', 'Línea base de seguridad'],
    },
    popular: false,
  },
  {
    name: 'Growth',
    price: { en: '$2,900', es: '/mes' },
    period: { en: '/month', es: '' },
    features: {
      en: ['Multi-cloud support', '24/7 monitoring', 'Compliance-ready architecture', 'Cost optimization'],
      es: ['Soporte multi-cloud', 'Monitoreo 24/7', 'Arquitectura lista para cumplimiento', 'Optimización de costos'],
    },
    popular: true,
    badge: { en: 'Most Popular', es: 'Más elegido' },
  },
  {
    name: 'Enterprise',
    price: { en: 'Custom', es: '' },
    period: { en: 'Pricing', es: 'Precio personalizado' },
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
    <section className="py-28 lg:py-36 bg-background">
      <div className="container max-w-6xl">

        {/* ── Headline ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3 leading-tight">
            Enterprise-Grade Cloud Support — Without Enterprise Payroll
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground/50 font-medium mb-8">
            Soporte Cloud de Nivel Empresarial — Sin Nómina Empresarial
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Most SMBs overspend on internal hiring before realizing they only needed the right cloud partner.
          </p>
          <p className="text-sm text-muted-foreground/50 max-w-3xl mx-auto mt-1">
            La mayoría de las PYMEs invierten demasiado en contratación interna antes de darse cuenta de que solo necesitaban el socio cloud correcto.
          </p>
        </motion.div>

        {/* ── PART 1 — Price Anchor Grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-6"
        >
          {plans.map((plan, i) => {
            const Icon = planIcons[i];
            return (
              <Card
                key={plan.name}
                className={`relative rounded-xl transition-all duration-300 ${
                  plan.popular
                    ? 'border-accent shadow-lg ring-1 ring-accent/20 scale-[1.02]'
                    : 'border-border shadow-card hover:shadow-lg'
                }`}
              >
                {plan.popular && plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                    <span className="bg-accent text-accent-foreground text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm whitespace-nowrap">
                      {plan.badge.en}
                      <span className="text-accent-foreground/70 ml-1 text-[0.65rem]">· {plan.badge.es}</span>
                    </span>
                  </div>
                )}
                <CardContent className="p-8 pt-10">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2.5 rounded-xl bg-primary/5">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                  </div>

                  {/* Price */}
                  <div className="mb-2">
                    <span className="text-3xl font-bold text-foreground">{plan.price.en}</span>
                    <span className="text-base text-muted-foreground font-medium ml-1">{plan.period.en}</span>
                  </div>
                  {plan.period.es && (
                    <p className="text-sm text-muted-foreground/50 mb-1">{plan.price.es ? `Desde ${plan.price.en}${plan.price.es}` : plan.period.es}</p>
                  )}

                  {/* Scope microcopy */}
                  <p className="text-xs text-muted-foreground/40 mb-7 leading-snug">
                    Final pricing depends on scope and cloud complexity.
                    <br />
                    <span className="text-muted-foreground/30">El precio final depende del alcance y complejidad cloud.</span>
                  </p>

                  <ul className="space-y-3">
                    {plan.features.en.map((f, fi) => (
                      <li key={f} className="flex items-start gap-2.5 text-[0.95rem] text-muted-foreground">
                        <Check className="h-4.5 w-4.5 text-accent flex-shrink-0 mt-0.5" />
                        <span>
                          {f}
                          <span className="block text-xs text-muted-foreground/40 mt-0.5">{plan.features.es[fi]}</span>
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
        <div className="text-center mb-28 space-y-1">
          <p className="text-sm text-muted-foreground/70">
            No setup fees · Cancel anytime · Start in 48 hours
          </p>
          <p className="text-xs text-muted-foreground/40">
            Sin costos de implementación · Cancela cuando quieras · Inicia en 48 horas
          </p>
        </div>

        {/* ── Divider ── */}
        <div className="w-16 h-px bg-border mx-auto mb-28" />

        {/* ── PART 2 — ROI Comparison ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mb-8"
        >
          <div className="text-center mb-14">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Why Outsource Beats In-House
            </h3>
            <p className="text-base text-muted-foreground/50">
              Por qué externalizar supera a la contratación interna
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* In-House Card */}
            <Card className="border-border shadow-card rounded-xl">
              <CardContent className="p-8 lg:p-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2.5 rounded-xl bg-destructive/8">
                    <TrendingDown className="h-5 w-5 text-destructive" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">In-House Cloud Engineer</h3>
                    <p className="text-sm text-muted-foreground/50">Ingeniero Cloud Interno</p>
                  </div>
                </div>
                <ul className="space-y-5 mb-10">
                  {inhouseItems.map((item) => (
                    <li key={item.label.en} className="flex items-center justify-between text-[0.95rem]">
                      <span className="text-muted-foreground">
                        {item.label.en}
                        <span className="block text-xs text-muted-foreground/40 mt-0.5">{item.label.es}</span>
                      </span>
                      {item.value && <span className="font-semibold text-foreground tabular-nums">{item.value}</span>}
                    </li>
                  ))}
                </ul>
                <div className="pt-8 border-t border-border text-center">
                  <p className="text-3xl font-bold text-destructive tabular-nums">$185,000+</p>
                  <p className="text-sm text-muted-foreground mt-2">per year</p>
                  <p className="text-xs text-muted-foreground/40">al año</p>
                </div>
              </CardContent>
            </Card>

            {/* DBCloud Card */}
            <Card className="border-accent/20 shadow-lg rounded-xl ring-1 ring-accent/10">
              <CardContent className="p-8 lg:p-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2.5 rounded-xl bg-accent/8">
                    <TrendingUp className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">DBCloud Managed Team</h3>
                    <p className="text-sm text-muted-foreground/50">Equipo Gestionado DBCloud</p>
                  </div>
                </div>
                <ul className="space-y-5 mb-10">
                  {dbcloudItems.en.map((item, i) => (
                    <li key={item} className="flex items-center gap-2.5 text-[0.95rem] text-muted-foreground">
                      <Check className="h-4.5 w-4.5 text-accent flex-shrink-0" />
                      <span>
                        {item}
                        <span className="block text-xs text-muted-foreground/40 mt-0.5">{dbcloudItems.es[i]}</span>
                      </span>
                    </li>
                  ))}
                </ul>

                {/* ── Savings Hero ── */}
                <div className="pt-8 border-t border-border text-center">
                  <p className="text-5xl sm:text-6xl font-bold text-success tabular-nums tracking-tight">
                    $167,000+
                  </p>
                  <p className="text-base text-muted-foreground mt-3 font-medium">
                    Estimated annual savings vs internal hire
                  </p>
                  <p className="text-sm text-muted-foreground/45 mt-1">
                    Ahorro anual estimado frente a contratación interna
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Micro-proof */}
        <div className="text-center mb-8 space-y-1">
          <p className="text-sm text-muted-foreground max-w-3xl mx-auto">
            Most clients reduce cloud-related operational costs by 60–80% within the first year.
          </p>
          <p className="text-xs text-muted-foreground/40 max-w-3xl mx-auto">
            La mayoría de nuestros clientes reducen costos operativos cloud entre un 60% y 80% durante el primer año.
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground/60 mb-28">
          <Shield className="h-4 w-4 text-accent/50" />
          <span>Built for SOC 2, HIPAA, and GDPR-aligned operations.</span>
        </div>

        {/* ── PART 3 — Dual CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center bg-muted/30 rounded-2xl p-12 lg:p-16 border border-border"
        >
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Get a Free Cloud Cost & Risk Assessment
          </h3>
          <p className="text-base text-muted-foreground/50 mb-6">
            Obtén una Evaluación Gratuita de Costos y Riesgos Cloud
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-2 leading-relaxed">
            In one short call, we'll identify cost leaks, risk exposure, and optimization opportunities.
          </p>
          <p className="text-sm text-muted-foreground/45 max-w-2xl mx-auto mb-12">
            En una breve llamada identificaremos fugas de costos, riesgos y oportunidades de optimización.
          </p>

          {/* Primary CTA */}
          <div className="mb-5">
            <Button
              size="lg"
              onClick={scrollToSchedule}
              className="shadow-cta px-12 text-base"
            >
              Schedule My Free Assessment
            </Button>
            <p className="text-sm text-muted-foreground/40 mt-2.5">Agendar Evaluación Gratuita</p>
          </div>

          {/* Secondary CTA */}
          <div className="mb-8">
            <Button variant="outline" size="default" onClick={goToContact} className="text-sm">
              Get the Cost Optimization Checklist
            </Button>
            <p className="text-xs text-muted-foreground/35 mt-1.5">Recibir Checklist de Optimización</p>
          </div>

          <p className="text-sm text-muted-foreground/60">No commitment. No sales pressure. Just clarity.</p>
          <p className="text-xs text-muted-foreground/35 mt-1">Sin compromiso. Sin presión comercial. Solo claridad.</p>
        </motion.div>

        {/* ── LATAM Trust Signal ── */}
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground/50 mt-12">
          <Globe className="h-4 w-4 text-accent/40" />
          <span>Serving businesses across the United States and Latin America.</span>
        </div>
        <p className="text-xs text-muted-foreground/35 text-center mt-1">
          Atendiendo empresas en Estados Unidos y Latinoamérica.
        </p>
      </div>
    </section>
  );
}
