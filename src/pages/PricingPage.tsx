import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Check, X, ArrowRight, Sparkles, Info, Clock, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLang } from '@/hooks/useLang';
import { cn } from '@/lib/utils';
import { CheckoutModal } from '@/components/pricing/CheckoutModal';
import { QualificationModal } from '@/components/pricing/QualificationModal';
import { EvaluationRequestModal } from '@/components/pricing/EvaluationRequestModal';
import { ClientPortalNotice, EmergencyExclusionNotice } from '@/components/pricing/DeliveryModelSection';
import { ComparisonSection } from '@/components/pricing/ComparisonSection';
import { ROICalculator } from '@/components/pricing/ROICalculator';
import { TierKey } from '@/config/stripe';

export default function PricingPage() {
  const { t, getLocalizedPath, lang } = useLang();
  const [isYearly, setIsYearly] = useState(false);
  
  // Qualification modal state (for Starter only)
  const [qualificationModal, setQualificationModal] = useState<{
    isOpen: boolean;
    tier: TierKey;
    tierName: string;
    price: string;
  }>({
    isOpen: false,
    tier: 'starter',
    tierName: '',
    price: '',
  });

  // Checkout modal state (for Starter only)
  const [checkoutModal, setCheckoutModal] = useState<{
    isOpen: boolean;
    tier: TierKey;
    tierName: string;
    price: string;
  }>({
    isOpen: false,
    tier: 'starter',
    tierName: '',
    price: '',
  });

  // Evaluation request modal state (for Growth)
  const [evaluationModal, setEvaluationModal] = useState<{
    isOpen: boolean;
    tierName: string;
    price: string;
  }>({
    isOpen: false,
    tierName: '',
    price: '',
  });

  const labels = {
    en: {
      mostPopular: 'Most Popular',
      contactSales: 'Talk to an Architect',
      limitations: 'Scope',
      scopeLimitations: 'Scope',
      bestFor: 'Best for',
      requestEvaluation: 'Request Growth Evaluation',
      startSecurely: 'Start Advisory Plan',
    },
    es: {
      mostPopular: 'Más Popular',
      contactSales: 'Hablar con un Arquitecto',
      limitations: 'Alcance',
      scopeLimitations: 'Alcance',
      bestFor: 'Ideal para',
      requestEvaluation: 'Solicitar Evaluación Growth',
      startSecurely: 'Iniciar Plan Asesor',
    },
  };

  const l = labels[lang];

  const dm = (t.pricing as any).deliveryModel;

  const plans: Array<{
    key: TierKey;
    name: string;
    subtitle: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    scopeLimitations?: string[];
    limitations?: string[];
    bestFor?: string;
    hours?: string;
    responseTime?: string;
    popular: boolean;
  }> = [
    {
      key: 'starter',
      name: t.pricing.starter.name,
      subtitle: (t.pricing.starter as any).subtitle || '',
      price: isYearly ? '$399' : '$499',
      period: isYearly ? '/mo (billed yearly)' : '/mo',
      description: t.pricing.starter.description,
      features: t.pricing.starter.features as unknown as string[],
      limitations: (t.pricing.starter as any).limitations as string[] | undefined,
      bestFor: (t.pricing.starter as any).bestFor as string | undefined,
      hours: (t.pricing.starter as any).hours as string | undefined,
      responseTime: (t.pricing.starter as any).responseTime as string | undefined,
      popular: false,
    },
    {
      key: 'growth',
      name: t.pricing.growth.name,
      subtitle: (t.pricing.growth as any).subtitle || '',
      price: isYearly ? '$1,199' : '$1,499',
      period: isYearly ? '/mo (billed yearly)' : '/mo',
      description: t.pricing.growth.description,
      features: t.pricing.growth.features as unknown as string[],
      scopeLimitations: (t.pricing.growth as any).scopeLimitations as string[] | undefined,
      limitations: (t.pricing.growth as any).limitations as string[] | undefined,
      bestFor: (t.pricing.growth as any).bestFor as string | undefined,
      hours: (t.pricing.growth as any).hours as string | undefined,
      responseTime: (t.pricing.growth as any).responseTime as string | undefined,
      popular: true,
    },
    {
      key: 'enterprise',
      name: t.pricing.enterprise.name,
      subtitle: (t.pricing.enterprise as any).subtitle || '',
      price: t.pricing.enterprise.price,
      period: '',
      description: t.pricing.enterprise.description,
      features: t.pricing.enterprise.features as unknown as string[],
      popular: false,
    },
  ];

  const handleGetStarted = (plan: typeof plans[0]) => {
    if (plan.key === 'enterprise') {
      window.location.href = getLocalizedPath('/contact');
    } else if (plan.key === 'growth') {
      // Growth uses evaluation request flow (no direct checkout)
      setEvaluationModal({
        isOpen: true,
        tierName: plan.name,
        price: plan.price,
      });
    } else {
      // Starter uses qualification → checkout flow
      setQualificationModal({
        isOpen: true,
        tier: plan.key,
        tierName: plan.name,
        price: plan.price,
      });
    }
  };

  const handleQualified = () => {
    // Close qualification modal and open checkout modal (Starter only)
    setQualificationModal(prev => ({ ...prev, isOpen: false }));
    setCheckoutModal({
      isOpen: true,
      tier: qualificationModal.tier,
      tierName: qualificationModal.tierName,
      price: qualificationModal.price,
    });
  };

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
            <p className="text-lg text-white/85 mb-8">
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
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1",
                  isYearly ? "bg-white text-primary" : "text-white/70 hover:text-white"
                )}
              >
                {t.pricing.yearly} 
                <span className="text-accent font-semibold">-20%</span>
                {isYearly && <Sparkles className="h-3 w-3 text-accent" />}
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
                key={plan.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "relative p-8 rounded-2xl bg-card border shadow-card flex flex-col",
                  plan.popular ? "border-accent shadow-glow" : "border-border"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-accent-foreground text-sm font-medium">
                    {l.mostPopular}
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="font-display text-xl font-bold mb-1">{plan.name}</h3>
                  {plan.subtitle && (
                    <p className="text-sm text-accent font-medium mb-3">{plan.subtitle}</p>
                  )}
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="font-display text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground text-sm">{plan.period}</span>
                  </div>
                  <p className="text-muted-foreground text-sm mt-2">{plan.description}</p>

                  {/* Hours and Response Time for Starter/Growth */}
                  {plan.hours && plan.responseTime && (
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <div className="bg-accent/10 rounded-lg p-2 text-center">
                        <Clock className="h-4 w-4 mx-auto mb-1 text-accent" />
                        <p className="text-[10px] text-muted-foreground">{dm.hoursLabel}</p>
                        <p className="font-semibold text-xs">{plan.hours}</p>
                      </div>
                      <div className="bg-accent/10 rounded-lg p-2 text-center">
                        <Timer className="h-4 w-4 mx-auto mb-1 text-accent" />
                        <p className="text-[10px] text-muted-foreground">{dm.responseLabel}</p>
                        <p className="font-semibold text-xs">{plan.responseTime}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* No Rollover Notice */}
                {plan.hours && (
                  <p className="text-[10px] text-muted-foreground text-center italic mb-4 -mt-2">
                    {dm.noRollover}
                  </p>
                )}

                {/* Features */}
                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Scope Limitations (Growth only) */}
                {plan.scopeLimitations && plan.scopeLimitations.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Info className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        {l.scopeLimitations}
                      </span>
                    </div>
                    <ul className="space-y-1.5">
                      {plan.scopeLimitations.map((limitation) => (
                        <li key={limitation} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <span className="text-muted-foreground/60">•</span>
                          {limitation}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Limitations */}
                {plan.limitations && plan.limitations.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center gap-1.5 mb-2">
                      <X className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        {l.limitations}
                      </span>
                    </div>
                    <ul className="space-y-1.5">
                      {plan.limitations.map((limitation) => (
                        <li key={limitation} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <span className="text-destructive">×</span>
                          {limitation}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Best For */}
                {plan.bestFor && (
                  <div className="mb-6 p-3 rounded-lg bg-muted/50">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      {l.bestFor}:
                    </span>
                    <p className="text-xs text-foreground mt-1">{plan.bestFor}</p>
                  </div>
                )}

                {/* Single Primary CTA per card */}
                <div className="mt-auto">
                  <Button
                    onClick={() => handleGetStarted(plan)}
                    className={cn(
                      "w-full shadow-md hover:shadow-lg transition-all",
                      plan.popular 
                        ? "bg-accent hover:bg-accent/90 text-accent-foreground" 
                        : "bg-primary hover:bg-primary/90"
                    )}
                  >
                    {plan.key === 'enterprise' 
                      ? l.contactSales 
                      : plan.key === 'growth' 
                        ? l.requestEvaluation 
                        : l.startSecurely}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  {/* Secondary as text link - reduced visual weight */}
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

          {/* Important Notices */}
          <div className="max-w-3xl mx-auto mt-12 space-y-4">
            <ClientPortalNotice />
            <EmergencyExclusionNotice />
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <ComparisonSection />

      {/* ROI Calculator */}
      <ROICalculator />

      {/* Industry Links - Post-Decision Support */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-muted-foreground mb-4">
              {lang === 'es' 
                ? 'Vea cómo empresas como la suya usan DBCloud' 
                : 'See how businesses like yours use DBCloud'}
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <Link 
                to={getLocalizedPath('/industries/retail')} 
                className="text-foreground hover:text-accent transition-colors"
              >
                Retail SMB
              </Link>
              <Link 
                to={getLocalizedPath('/industries/healthcare')} 
                className="text-foreground hover:text-accent transition-colors"
              >
                Healthcare SMB
              </Link>
              <Link 
                to={getLocalizedPath('/industries/saas')} 
                className="text-foreground hover:text-accent transition-colors"
              >
                SaaS SMB
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Qualification Modal (Starter only) */}
      <QualificationModal
        isOpen={qualificationModal.isOpen}
        onClose={() => setQualificationModal(prev => ({ ...prev, isOpen: false }))}
        onQualified={handleQualified}
        tierName={qualificationModal.tierName}
      />

      {/* Checkout Modal (Starter only - after qualification) */}
      <CheckoutModal
        isOpen={checkoutModal.isOpen}
        onClose={() => setCheckoutModal(prev => ({ ...prev, isOpen: false }))}
        tier={checkoutModal.tier}
        tierName={checkoutModal.tierName}
        price={checkoutModal.price}
        isYearly={isYearly}
      />

      {/* Evaluation Request Modal (Growth only - no direct checkout) */}
      <EvaluationRequestModal
        isOpen={evaluationModal.isOpen}
        onClose={() => setEvaluationModal(prev => ({ ...prev, isOpen: false }))}
        tierName={evaluationModal.tierName}
        price={evaluationModal.price}
      />
    </Layout>
  );
}
