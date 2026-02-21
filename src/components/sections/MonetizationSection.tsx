import { motion } from 'framer-motion';
import { Check, TrendingDown, TrendingUp, Shield, Clock, Users, Server, BarChart3, Bot, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLang } from '@/hooks/useLang';

const content = {
  en: {
    headline: 'Enterprise-Grade Cloud Support — Without Enterprise Payroll',
    subheadline: 'Most SMBs overspend on internal hiring before realizing they only needed the right cloud partner.',
    // Price Anchor
    plans: [
      {
        name: 'Starter',
        price: 'Starting at $2,000/month',
        features: ['1 Cloud environment', 'Managed database', 'SLA-backed response times', 'Security baseline'],
        popular: false,
      },
      {
        name: 'Growth',
        price: 'Starting at $3,500/month',
        features: ['Multi-cloud support', '24/7 monitoring', 'Compliance-ready architecture', 'Cost optimization'],
        popular: true,
        badge: 'Most Popular',
      },
      {
        name: 'Enterprise',
        price: 'Custom Pricing',
        features: ['Dedicated support structure', 'Advanced compliance (SOC 2 / HIPAA / GDPR)', 'AI-powered operations', 'Executive reporting'],
        popular: false,
      },
    ],
    noContract: 'No long-term contracts. Cancel anytime.',
    // ROI Comparison
    inhouseTitle: 'In-House Cloud Engineer',
    inhouseItems: [
      { label: 'Average Salary', value: '$140,000+' },
      { label: 'Benefits & Taxes', value: '$30,000+' },
      { label: 'Recruiting & Onboarding', value: '$15,000+' },
      { label: 'Vacation / Gaps / Single Point of Failure', value: '' },
    ],
    inhouseTotal: '$185,000+ per year',
    dbcloudTitle: 'DBCloud Managed Team',
    dbcloudItems: [
      'Starting at $24,000/year',
      'Senior-level engineers only',
      'Multi-cloud coverage',
      'Backup team structure',
      'Built-in compliance readiness',
    ],
    savings: 'Save $160,000+ annually',
    roiNote: 'Most clients reduce cloud-related operational costs by 60–80% within the first year.',
    // CTA
    ctaHeadline: 'Get a Free Cloud Cost & Risk Assessment',
    ctaDescription: "In one short call, we'll identify cost leaks, risk exposure, and optimization opportunities.",
    ctaButton: 'Show Me My Savings',
    ctaMicrocopy: 'No commitment. No sales pressure. Just clarity.',
  },
  es: {
    headline: 'Soporte Cloud de Nivel Empresarial — Sin Nómina Empresarial',
    subheadline: 'La mayoría de las PYMEs invierten demasiado en contratación interna antes de darse cuenta de que solo necesitaban el socio cloud correcto.',
    plans: [
      {
        name: 'Starter',
        price: 'Desde $2,000/mes',
        features: ['1 Entorno Cloud', 'Base de datos administrada', 'Tiempos de respuesta con SLA', 'Línea base de seguridad'],
        popular: false,
      },
      {
        name: 'Growth',
        price: 'Desde $3,500/mes',
        features: ['Soporte multi-cloud', 'Monitoreo 24/7', 'Arquitectura lista para cumplimiento', 'Optimización de costos'],
        popular: true,
        badge: 'Más elegido',
      },
      {
        name: 'Enterprise',
        price: 'Precio personalizado',
        features: ['Estructura de soporte dedicada', 'Cumplimiento avanzado (SOC 2 / HIPAA / GDPR)', 'Operaciones con IA', 'Reportes ejecutivos'],
        popular: false,
      },
    ],
    noContract: 'Sin contratos a largo plazo. Cancela en cualquier momento.',
    inhouseTitle: 'Ingeniero Cloud Interno',
    inhouseItems: [
      { label: 'Salario promedio', value: '$140,000+' },
      { label: 'Beneficios e impuestos', value: '$30,000+' },
      { label: 'Reclutamiento y onboarding', value: '$15,000+' },
      { label: 'Vacaciones / Brechas / Punto único de falla', value: '' },
    ],
    inhouseTotal: '$185,000+ al año',
    dbcloudTitle: 'Equipo Gestionado DBCloud',
    dbcloudItems: [
      'Desde $24,000/año',
      'Solo ingenieros senior',
      'Cobertura multi-cloud',
      'Estructura de equipo de respaldo',
      'Cumplimiento integrado',
    ],
    savings: 'Ahorra $160,000+ al año',
    roiNote: 'La mayoría de nuestros clientes reducen costos operativos cloud entre un 60% y 80% durante el primer año.',
    ctaHeadline: 'Obtén una Evaluación Gratuita de Costos y Riesgos Cloud',
    ctaDescription: 'En una breve llamada identificaremos fugas de costos, riesgos y oportunidades de optimización.',
    ctaButton: 'Muéstrame Mi Ahorro',
    ctaMicrocopy: 'Sin compromiso. Sin presión comercial. Solo claridad.',
  },
};

const planIcons = [Server, BarChart3, Shield];

export function MonetizationSection() {
  const { lang } = useLang();
  const c = content[lang];

  const scrollToSchedule = () => {
    const el = document.getElementById('schedule') || document.querySelector('a[href*="schedule"]');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      if (el instanceof HTMLAnchorElement) el.click();
    } else {
      window.location.href = `/${lang}/schedule`;
    }
  };

  return (
    <section className="py-20 lg:py-24 bg-background">
      <div className="container max-w-6xl">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
            {c.headline}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {c.subheadline}
          </p>
        </motion.div>

        {/* PART 1 — Price Anchor Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
        >
          {c.plans.map((plan, i) => {
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
                      {plan.badge}
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
                  <p className="text-lg font-semibold text-accent mb-6">{plan.price}</p>
                  <ul className="space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-base text-muted-foreground">
                        <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </motion.div>

        <p className="text-center text-sm text-muted-foreground mb-20">
          {c.noContract}
        </p>

        {/* PART 2 — ROI Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
        >
          {/* In-House Card */}
          <Card className="border-border shadow-sm">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-destructive/10">
                  <TrendingDown className="h-5 w-5 text-destructive" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{c.inhouseTitle}</h3>
              </div>
              <ul className="space-y-4 mb-8">
                {c.inhouseItems.map((item) => (
                  <li key={item.label} className="flex items-center justify-between text-base">
                    <span className="text-muted-foreground">{item.label}</span>
                    {item.value && <span className="font-semibold text-foreground">{item.value}</span>}
                  </li>
                ))}
              </ul>
              <div className="pt-6 border-t border-border">
                <p className="text-2xl font-bold text-destructive text-center">{c.inhouseTotal}</p>
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
                <h3 className="text-xl font-bold text-foreground">{c.dbcloudTitle}</h3>
              </div>
              <ul className="space-y-4 mb-8">
                {c.dbcloudItems.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-base text-muted-foreground">
                    <Check className="h-5 w-5 text-accent flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-6 border-t border-border">
                <p className="text-2xl font-bold text-center" style={{ color: 'hsl(160 84% 35%)' }}>
                  {c.savings}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <p className="text-center text-base text-muted-foreground mb-20 max-w-3xl mx-auto">
          {c.roiNote}
        </p>

        {/* PART 3 — Conversion Trigger */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center bg-muted/40 rounded-2xl p-10 lg:p-14 border border-border"
        >
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4">
            {c.ctaHeadline}
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            {c.ctaDescription}
          </p>
          <Button size="lg" onClick={scrollToSchedule} className="mb-4">
            {c.ctaButton}
          </Button>
          <p className="text-sm text-muted-foreground">{c.ctaMicrocopy}</p>
        </motion.div>
      </div>
    </section>
  );
}
