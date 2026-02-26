import { motion } from 'framer-motion';
import { Check, TrendingUp, Shield, Server, BarChart3, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLang } from '@/hooks/useLang';
import { siteConfig } from '@/config/site';

const plans = [
  {
    icon: Server,
    name: 'Starter',
    subtitle: { en: 'For small teams with one cloud environment', es: 'Para equipos pequeños con un entorno cloud' },
    price: '$1,500',
    period: { en: '/mo', es: '/mes' },
    features: {
      en: ['1 Cloud environment', 'Managed database', 'SLA-backed response', 'Security baseline'],
      es: ['1 Entorno Cloud', 'Base de datos administrada', 'Respuesta con SLA', 'Línea base de seguridad'],
    },
    popular: false,
  },
  {
    icon: BarChart3,
    name: 'Growth',
    subtitle: { en: 'For scaling businesses with multi-cloud needs', es: 'Para empresas con necesidades multi-cloud' },
    price: '$2,900',
    period: { en: '/mo', es: '/mes' },
    features: {
      en: ['Multi-cloud support', '24/7 monitoring', 'Compliance-ready', 'Cost optimization'],
      es: ['Soporte multi-cloud', 'Monitoreo 24/7', 'Cumplimiento listo', 'Optimización de costos'],
    },
    popular: true,
    badge: { en: 'Most Popular', es: 'Más elegido' },
  },
  {
    icon: Shield,
    name: 'Enterprise',
    subtitle: { en: 'For regulated or high-complexity environments', es: 'Para entornos regulados o de alta complejidad' },
    price: { en: 'Custom', es: 'Personalizado' },
    period: { en: '', es: '' },
    features: {
      en: ['Dedicated support', 'SOC 2 / HIPAA / GDPR', 'AI-powered ops', 'Executive reporting'],
      es: ['Soporte dedicado', 'SOC 2 / HIPAA / GDPR', 'Operaciones con IA', 'Reportes ejecutivos'],
    },
    popular: false,
  },
];

export function MonetizationSection() {
  const { lang } = useLang();

  return (
    <section className="py-24 bg-background">
      <div className="container max-w-6xl">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3 leading-tight">
            {lang === 'es'
              ? 'Soporte Cloud Empresarial — Sin Nómina Empresarial'
              : 'Enterprise-Grade Cloud Support — Without Enterprise Payroll'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {lang === 'es'
              ? 'Desde $18,000/año vs. $185,000+ de un ingeniero cloud interno.'
              : 'Starting at $18,000/year vs. $185,000+ for an in-house cloud engineer.'}
          </p>
        </motion.div>

        {/* Price Anchor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const price = typeof plan.price === 'string' ? plan.price : plan.price[lang];
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
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <span className="bg-accent text-accent-foreground text-xs font-semibold px-4 py-1 rounded-full shadow-sm whitespace-nowrap">
                      {plan.badge[lang]}
                    </span>
                  </div>
                )}
                <CardContent className="p-6 pt-8">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="p-2 rounded-lg bg-primary/5">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
                      <p className="text-xs text-muted-foreground/60">{plan.subtitle[lang]}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="text-3xl font-bold text-foreground">{price}</span>
                    <span className="text-sm text-muted-foreground ml-1">{plan.period[lang]}</span>
                  </div>

                  <ul className="space-y-2">
                    {plan.features[lang].map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="h-3.5 w-3.5 text-accent flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Savings stat + risk reversal */}
        <div className="text-center space-y-3 mb-6">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-success/10 border border-success/20">
            <TrendingUp className="h-4 w-4 text-success" />
            <span className="text-sm font-semibold text-success">
              {lang === 'es' ? 'Ahorra $167,000+/año vs. contratación interna' : 'Save $167,000+/year vs. in-house hire'}
            </span>
          </div>
          <p className="text-xs text-muted-foreground/50">
            {lang === 'es'
              ? 'Sin costos de setup · Cancela cuando quieras · Inicia en 48 horas'
              : 'No setup fees · Cancel anytime · Start in 48 hours'}
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button asChild size="lg" className="shadow-cta px-10">
            <a href={siteConfig.SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
              {lang === 'es' ? 'Agenda tu evaluación gratuita' : 'Schedule My Free Assessment'}
            </a>
          </Button>
          <p className="text-xs text-muted-foreground/40 mt-2">
            {lang === 'es' ? 'El precio final depende del alcance y complejidad cloud.' : 'Final pricing depends on scope and cloud complexity.'}
          </p>
        </div>
      </div>
    </section>
  );
}
