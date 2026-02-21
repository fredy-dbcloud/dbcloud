import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Sparkles, Clock, Timer, Shield, Zap, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLang } from '@/hooks/useLang';
import { cn } from '@/lib/utils';
import { CheckoutModal } from '@/components/pricing/CheckoutModal';
import { QualificationModal } from '@/components/pricing/QualificationModal';
import { EvaluationRequestModal } from '@/components/pricing/EvaluationRequestModal';
import { ComparisonSection } from '@/components/pricing/ComparisonSection';
import { ROICalculator } from '@/components/pricing/ROICalculator';
import { TierKey } from '@/config/stripe';

export default function PricingPage() {
  const { t, getLocalizedPath, lang } = useLang();
  const [isYearly, setIsYearly] = useState(false);

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
      contactSales: 'Talk to a Cloud Architect',
      requestEvaluation: 'Free Growth Readiness Review',
      startSecurely: 'Free Advisory Evaluation',
      growthMicrocopy: 'Most growing businesses choose this plan.',
      trustBenefits: [
        { icon: Shield, text: 'No lock-in contracts' },
        { icon: Zap, text: 'Start in 48 hours' },
        { icon: Users, text: 'Senior certified engineers' },
      ],
      exclusionStarter: 'Does not include 24/7 support, SLAs, or on-call incident response.',
      exclusionGrowth: 'Does not include 24/7 support or SLA guarantees.',
      overage: 'Additional scope billed separately upon approval.',
      estimatorIntro: 'Optional: calculate potential productivity impact.',
    },
    es: {
      mostPopular: 'Más Popular',
      contactSales: 'Hablar con Arquitecto Cloud',
      requestEvaluation: 'Revisión Gratuita Growth',
      startSecurely: 'Evaluación Gratuita',
      growthMicrocopy: 'La mayoría de empresas en crecimiento eligen este plan.',
      trustBenefits: [
        { icon: Shield, text: 'Sin contratos largos' },
        { icon: Zap, text: 'Inicio en 48 horas' },
        { icon: Users, text: 'Ingenieros senior certificados' },
      ],
      exclusionStarter: 'No incluye soporte 24/7, SLAs, ni respuesta a incidentes.',
      exclusionGrowth: 'No incluye soporte 24/7 ni garantías de SLA.',
      overage: 'Alcance adicional facturado por separado previa aprobación.',
      estimatorIntro: 'Opcional: calcula el impacto potencial en productividad.',
    },
  };

  const l = labels[lang];

  const plans = [
    {
      key: 'starter' as TierKey,
      name: lang === 'es' ? 'Starter Consulting' : 'Starter Consulting',
      subtitle: lang === 'es' ? 'Para equipos pequeños con un entorno cloud' : 'For small teams with one cloud environment',
      price: isYearly ? '$249' : '$299',
      period: isYearly ? '/mo (billed yearly)' : '/mo',
      hours: lang === 'es' ? '4 horas/mes' : '4 hours/month',
      responseTime: lang === 'es' ? '1-2 dias habiles' : '1-2 business days',
      features: lang === 'es'
        ? ['Consultoria Cloud & AI (4h/mes)', 'Revision de infraestructura y base de datos', 'Recomendaciones de optimizacion de costos', 'Plan de accion mensual priorizado']
        : ['Cloud & AI consulting (4h/mo)', 'Infrastructure & database review', 'Cost optimization recommendations', 'Monthly prioritized action plan'],
      exclusion: l.exclusionStarter,
      popular: false,
    },
    {
      key: 'growth' as TierKey,
      name: lang === 'es' ? 'Growth Consulting' : 'Growth Consulting',
      subtitle: lang === 'es' ? 'Para empresas que necesitan ejecucion, no solo asesoria' : 'For companies that need execution - not just advice',
      price: isYearly ? '$699' : '$899',
      period: isYearly ? '/mo (billed yearly)' : '/mo',
      hours: lang === 'es' ? '10 horas/mes' : '10 hours/month',
      responseTime: lang === 'es' ? 'Mismo o siguiente dia habil' : 'Same or next business day',
      features: lang === 'es'
        ? ['Consultoria & ejecucion Cloud & AI (10h/mes)', 'Gestion asistida de 1 entorno de base de datos', 'Acciones de optimizacion de rendimiento y costos', 'Configuracion avanzada de monitoreo']
        : ['Cloud & AI consulting & execution (10h/mo)', 'Assisted management of 1 database environment', 'Performance & cost optimization actions', 'Advanced monitoring configuration'],
      exclusion: l.exclusionGrowth,
      popular: true,
    },
    {
      key: 'enterprise' as TierKey,
      name: 'Enterprise',
      subtitle: lang === 'es' ? 'Para entornos regulados o de alta complejidad' : 'For regulated or high-complexity environments',
      price: lang === 'es' ? 'Personalizado' : 'Custom',
      period: '',
      hours: null,
      responseTime: null,
      features: lang === 'es'
        ? ['Horas personalizadas de consultoria & ejecucion', 'Gestion multi-entorno y multi-region', 'Soporte 24/7 on-call con SLAs', 'Cumplimiento SOC 2, HIPAA, PCI']
        : ['Custom consulting & execution hours', 'Multi-environment & multi-region management', '24/7 on-call support with SLAs', 'SOC 2, HIPAA, PCI compliance'],
      exclusion: null,
      popular: false,
    },
  ];

  const handleGetStarted = (plan: typeof plans[0]) => {
    if (plan.key === 'enterprise') {
      window.location.href = getLocalizedPath('/contact');
    } else if (plan.key === 'growth') {
      setEvaluationModal({ isOpen: true, tierName: plan.name, price: plan.price });
    } else {
      setQualificationModal({ isOpen: true, tier: plan.key, tierName: plan.name, price: plan.price });
    }
  };

  const handleQualified = () => {
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
      <section className="pt-40 pb-20 bg-hero-gradient">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {t.pricing.title}
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-10 leading-relaxed">
              {t.pricing.subtitle}
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-4 p-1.5 rounded-full bg-white/10 backdrop-blur-sm">
              <button
                onClick={() => setIsYearly(false)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-base font-medium transition-colors",
                  !isYearly ? "bg-white text-primary" : "text-white/70 hover:text-white"
                )}
              >
                {t.pricing.monthly}
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-base font-medium transition-colors flex items-center gap-1.5",
                  isYearly ? "bg-white text-primary" : "text-white/70 hover:text-white"
                )}
              >
                {t.pricing.yearly}
                <span className="text-accent font-semibold">Save</span>
                {isYearly && <Sparkles className="h-4 w-4 text-accent" />}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Benefits Strip */}
      <section className="py-8 bg-muted/40 border-b border-border">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
            {l.trustBenefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <div key={i} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <Icon className="h-4 w-4 text-accent flex-shrink-0" />
                  <span className="font-medium">{benefit.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "relative rounded-2xl bg-card border flex flex-col",
                  plan.popular
                    ? "border-accent shadow-glow p-8 md:p-9 md:scale-[1.03] z-10"
                    : "border-border shadow-card p-8"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium">
                    {l.mostPopular}
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="font-display text-2xl font-bold mb-1">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{plan.subtitle}</p>

                  <div className="flex items-baseline justify-center gap-1 pt-2">
                    <span className="font-display text-4xl sm:text-5xl font-bold leading-tight">{plan.price}</span>
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

                {/* Single condensed exclusion line */}
                {plan.exclusion && (
                  <p className="text-xs text-muted-foreground/60 mb-6 px-1 leading-relaxed">
                    {plan.exclusion}
                  </p>
                )}

                {/* CTA */}
                <div className="mt-auto">
                  <Button
                    onClick={() => handleGetStarted(plan)}
                    className={cn(
                      "w-full shadow-md hover:shadow-lg transition-all text-base py-6",
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
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>

                  {/* Growth microcopy */}
                  {plan.key === 'growth' && (
                    <p className="text-xs text-muted-foreground text-center mt-3">
                      {l.growthMicrocopy}
                    </p>
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

          {/* Overage microcopy */}
          <p className="text-center text-xs text-muted-foreground/50 mt-10">
            {l.overage}
          </p>
        </div>
      </section>

      {/* Comparison Section */}
      <ComparisonSection />

      {/* ROI Calculator - with intro */}
      <section className="py-6 bg-muted/30">
        <div className="container">
          <p className="text-center text-sm text-muted-foreground mb-2">{l.estimatorIntro}</p>
        </div>
      </section>
      <ROICalculator />

      {/* Industry Links */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg text-muted-foreground mb-5">
              {lang === 'es'
                ? 'Vea cómo empresas como la suya usan DBCloud'
                : 'See how businesses like yours use DBCloud'}
            </p>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-base">
              <Link to={getLocalizedPath('/industries/retail')} className="text-foreground hover:text-accent transition-colors">Retail SMB</Link>
              <Link to={getLocalizedPath('/industries/healthcare')} className="text-foreground hover:text-accent transition-colors">Healthcare SMB</Link>
              <Link to={getLocalizedPath('/industries/saas')} className="text-foreground hover:text-accent transition-colors">SaaS SMB</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <QualificationModal
        isOpen={qualificationModal.isOpen}
        onClose={() => setQualificationModal(prev => ({ ...prev, isOpen: false }))}
        onQualified={handleQualified}
        tierName={qualificationModal.tierName}
      />
      <CheckoutModal
        isOpen={checkoutModal.isOpen}
        onClose={() => setCheckoutModal(prev => ({ ...prev, isOpen: false }))}
        tier={checkoutModal.tier}
        tierName={checkoutModal.tierName}
        price={checkoutModal.price}
        isYearly={isYearly}
      />
      <EvaluationRequestModal
        isOpen={evaluationModal.isOpen}
        onClose={() => setEvaluationModal(prev => ({ ...prev, isOpen: false }))}
        tierName={evaluationModal.tierName}
        price={evaluationModal.price}
      />
    </Layout>
  );
}

