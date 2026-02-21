import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Clock, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { TierKey } from '@/config/stripe';

interface Plan {
  key: TierKey;
  name: string;
  subtitle: string;
  price: string;
  period: string;
  hours: string | null;
  responseTime: string | null;
  features: string[];
  exclusion: string | null;
  popular: boolean;
}

interface Labels {
  mostPopular: string;
  contactSales: string;
  requestEvaluation: string;
  startSecurely: string;
  growthMicrocopy: string;
  growthROI: string;
  overage: string;
  riskReversal: string[];
}

interface PricingCardsProps {
  plans: Plan[];
  labels: Labels;
  lang: 'en' | 'es';
  getLocalizedPath: (path: string) => string;
  onGetStarted: (plan: Plan) => void;
}

const tierLabels = {
  starter: { en: 'GOOD', es: 'BUENO' },
  growth: { en: 'BETTER', es: 'MEJOR' },
  enterprise: { en: 'BEST', es: 'ÓPTIMO' },
};

const comparisonFeatures = {
  en: [
    { label: 'Execution included', starter: false, growth: true, enterprise: true },
    { label: 'Production support', starter: false, growth: true, enterprise: true },
    { label: 'SLA-backed uptime', starter: false, growth: false, enterprise: true },
    { label: '24/7 coverage', starter: false, growth: false, enterprise: true },
    { label: 'Compliance support', starter: false, growth: false, enterprise: true },
  ],
  es: [
    { label: 'Ejecución incluida', starter: false, growth: true, enterprise: true },
    { label: 'Soporte en producción', starter: false, growth: true, enterprise: true },
    { label: 'Uptime con SLA', starter: false, growth: false, enterprise: true },
    { label: 'Cobertura 24/7', starter: false, growth: false, enterprise: true },
    { label: 'Soporte de cumplimiento', starter: false, growth: false, enterprise: true },
  ],
};

export function PricingCards({ plans, labels, lang, getLocalizedPath, onGetStarted }: PricingCardsProps) {
  const l = labels;
  const features = comparisonFeatures[lang];

  // Mobile: Growth first
  const mobileOrder: Record<TierKey, string> = {
    growth: 'order-first md:order-none',
    starter: 'order-2 md:order-none',
    enterprise: 'order-3 md:order-none',
  };

  return (
    <>
      {/* Pricing Cards */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-start">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "relative rounded-2xl bg-card border flex flex-col",
                  mobileOrder[plan.key],
                  plan.popular
                    ? "border-primary/40 shadow-lg ring-1 ring-primary/10 p-8 md:p-10 md:scale-[1.04] z-10"
                    : "border-border shadow-card p-7 md:p-8"
                )}
              >
                {/* Tier Label */}
                <div className={cn(
                  "text-[11px] font-bold uppercase tracking-[0.15em] mb-3",
                  plan.popular ? "text-primary" : "text-muted-foreground/50"
                )}>
                  {tierLabels[plan.key][lang]}
                </div>

                {/* Most Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium whitespace-nowrap">
                    {l.mostPopular}
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="font-display text-2xl font-bold mb-1">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground leading-snug">{plan.subtitle}</p>

                  <div className="flex items-baseline justify-center gap-1 pt-4">
                    <span className={cn(
                      "font-display font-bold leading-tight",
                      plan.popular ? "text-5xl sm:text-6xl" : "text-4xl sm:text-5xl"
                    )}>
                      {plan.price}
                    </span>
                    {plan.period && <span className="text-muted-foreground text-base">{plan.period}</span>}
                  </div>

                  {/* Hours & Response Time */}
                  {plan.hours && plan.responseTime && (
                    <div className="grid grid-cols-2 gap-3 mt-5">
                      <div className="bg-accent/10 rounded-lg p-3 text-center">
                        <Clock className="h-4 w-4 mx-auto mb-1 text-accent" />
                        <p className="font-semibold text-sm">{plan.hours}</p>
                      </div>
                      <div className="bg-accent/10 rounded-lg p-3 text-center">
                        <Timer className="h-4 w-4 mx-auto mb-1 text-accent" />
                        <p className="font-semibold text-sm">{plan.responseTime}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* 4 Key Features */}
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Single exclusion line */}
                {plan.exclusion && (
                  <p className="text-xs text-muted-foreground/60 mb-6 px-1 leading-relaxed">
                    {plan.exclusion}
                  </p>
                )}

                {/* CTA */}
                <div className="mt-auto">
                  <Button
                    onClick={() => onGetStarted(plan)}
                    className={cn(
                      "w-full transition-all text-base py-6",
                      plan.popular
                        ? "bg-accent hover:bg-accent/90 text-accent-foreground shadow-md hover:shadow-lg"
                        : "bg-primary hover:bg-primary/90 shadow-sm"
                    )}
                  >
                    {plan.key === 'enterprise'
                      ? l.contactSales
                      : plan.key === 'growth'
                        ? l.requestEvaluation
                        : l.startSecurely}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>

                  {/* Growth decision reinforcement */}
                  {plan.key === 'growth' && (
                    <div className="mt-3 text-center space-y-1">
                      <p className="text-xs text-muted-foreground font-medium">
                        {l.growthMicrocopy}
                      </p>
                      <p className="text-[11px] text-muted-foreground/50">
                        {l.growthROI}
                      </p>
                    </div>
                  )}

                  {/* Demo link */}
                  <p className="mt-3 text-center">
                    <Link
                      to={getLocalizedPath(`/demo/${plan.key}`)}
                      className="text-sm text-muted-foreground hover:text-accent transition-colors"
                    >
                      {lang === 'es' ? 'Ver Demo →' : 'View Demo →'}
                    </Link>
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Risk Reversal */}
          <div className="text-center mt-12 space-y-1">
            {l.riskReversal.map((line, i) => (
              <p key={i} className={cn(
                "text-sm",
                i === 0 ? "text-foreground font-medium" : "text-muted-foreground/60 text-xs"
              )}>
                {line}
              </p>
            ))}
          </div>

          {/* Overage microcopy */}
          <p className="text-center text-xs text-muted-foreground/50 mt-6">
            {l.overage}
          </p>
        </div>
      </section>

      {/* Feature Comparison Strip */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-4 bg-muted/50 border-b">
                <div className="p-3 sm:p-4" />
                {plans.map((plan) => (
                  <div key={plan.key} className={cn(
                    "p-3 sm:p-4 text-center text-xs sm:text-sm font-semibold border-l",
                    plan.popular ? "text-primary" : "text-muted-foreground"
                  )}>
                    {plan.name.split(' ')[0]}
                  </div>
                ))}
              </div>

              {/* Rows */}
              {features.map((feat, i) => (
                <div key={feat.label} className={cn("grid grid-cols-4", i !== features.length - 1 && "border-b")}>
                  <div className="p-3 sm:p-4 text-xs sm:text-sm font-medium flex items-center">
                    {feat.label}
                  </div>
                  {(['starter', 'growth', 'enterprise'] as const).map((tier) => (
                    <div key={tier} className={cn(
                      "p-3 sm:p-4 text-center border-l flex items-center justify-center",
                      tier === 'growth' && "bg-accent/5"
                    )}>
                      {feat[tier] ? (
                        <Check className="h-4 w-4 text-accent" />
                      ) : (
                        <span className="text-muted-foreground/30">—</span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
