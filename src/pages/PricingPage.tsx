import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLang } from '@/hooks/useLang';
import { cn } from '@/lib/utils';

export default function PricingPage() {
  const { t, getLocalizedPath } = useLang();
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: t.pricing.starter.name,
      price: isYearly ? '$399' : '$499',
      period: isYearly ? '/mo (billed yearly)' : '/mo',
      description: t.pricing.starter.description,
      features: t.pricing.starter.features,
      popular: false,
    },
    {
      name: t.pricing.growth.name,
      price: isYearly ? '$1,199' : '$1,499',
      period: isYearly ? '/mo (billed yearly)' : '/mo',
      description: t.pricing.growth.description,
      features: t.pricing.growth.features,
      popular: true,
    },
    {
      name: t.pricing.enterprise.name,
      price: t.pricing.enterprise.price,
      period: '',
      description: t.pricing.enterprise.description,
      features: t.pricing.enterprise.features,
      popular: false,
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-hero-gradient">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-6">
              {t.pricing.title}
            </h1>
            <p className="text-lg text-white/80 mb-8">
              {t.pricing.subtitle}
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-4 p-1 rounded-full bg-white/10 backdrop-blur-sm">
              <button
                onClick={() => setIsYearly(false)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  !isYearly ? "bg-white text-primary" : "text-white/70 hover:text-white"
                )}
              >
                {t.pricing.monthly}
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  isYearly ? "bg-white text-primary" : "text-white/70 hover:text-white"
                )}
              >
                {t.pricing.yearly} <span className="text-accent">-20%</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24 bg-background -mt-12">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "relative p-8 rounded-2xl bg-card border shadow-card",
                  plan.popular ? "border-accent shadow-glow" : "border-border"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-accent-foreground text-sm font-medium">
                    Most Popular
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="font-display text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="font-display text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground text-sm">{plan.period}</span>
                  </div>
                  <p className="text-muted-foreground text-sm mt-2">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className={cn(
                    "w-full",
                    plan.popular 
                      ? "bg-accent hover:bg-accent/90 text-accent-foreground" 
                      : "bg-primary hover:bg-primary/90"
                  )}
                >
                  <Link to={getLocalizedPath('/contact')}>
                    {t.cta.getStarted}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
