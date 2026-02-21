import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Sparkles, Shield, Zap, Users } from 'lucide-react';
import { useLang } from '@/hooks/useLang';
import { cn } from '@/lib/utils';
import { CheckoutModal } from '@/components/pricing/CheckoutModal';
import { QualificationModal } from '@/components/pricing/QualificationModal';
import { EvaluationRequestModal } from '@/components/pricing/EvaluationRequestModal';
import { PricingCards } from '@/components/pricing/PricingCards';
import { ComparisonSection } from '@/components/pricing/ComparisonSection';
import { ROICalculator } from '@/components/pricing/ROICalculator';
import { TierKey } from '@/config/stripe';

const pageLabels = {
  en: {
    mostPopular: 'Most Popular',
    contactSales: 'Talk to a Cloud Architect',
    requestEvaluation: 'Free Growth Readiness Review',
    startSecurely: 'Free Advisory Evaluation',
    growthMicrocopy: 'Most growing businesses choose this plan.',
    growthROI: 'Recover plan cost in 30–60 days in most cases.',
    trustBenefits: [
      { icon: Shield, text: 'No lock-in contracts' },
      { icon: Zap, text: 'Start in 48 hours' },
      { icon: Users, text: 'Senior certified engineers' },
    ],
    exclusionStarter: 'Does not include 24/7 support, SLAs, or on-call incident response.',
    exclusionGrowth: 'Does not include 24/7 support or SLA guarantees.',
    overage: 'Additional scope billed separately upon approval.',
    estimatorIntro: 'Optional: calculate potential productivity impact.',
    riskReversal: [
      'Start with confidence. Cancel anytime.',
      'No setup fees. No lock-in contracts. Transparent monthly billing.',
    ],
  },
  es: {
    mostPopular: 'Más Elegido',
    contactSales: 'Hablar con Arquitecto Cloud',
    requestEvaluation: 'Revisión Gratuita Growth',
    startSecurely: 'Evaluación Gratuita',
    growthMicrocopy: 'La mayoría de empresas en crecimiento eligen este plan.',
    growthROI: 'Recupera el costo del plan en 30–60 días en la mayoría de casos.',
    trustBenefits: [
      { icon: Shield, text: 'Sin contratos largos' },
      { icon: Zap, text: 'Inicio en 48 horas' },
      { icon: Users, text: 'Ingenieros senior certificados' },
    ],
    exclusionStarter: 'No incluye soporte 24/7, SLAs, ni respuesta a incidentes.',
    exclusionGrowth: 'No incluye soporte 24/7 ni garantías de SLA.',
    overage: 'Alcance adicional facturado por separado previa aprobación.',
    estimatorIntro: 'Opcional: calcula el impacto potencial en productividad.',
    riskReversal: [
      'Empieza con confianza. Cancela cuando quieras.',
      'Sin costos de implementación. Sin contratos forzosos. Facturación mensual transparente.',
    ],
  },
};

export default function PricingPage() {
  const { t, getLocalizedPath, lang } = useLang();
  const [isYearly, setIsYearly] = useState(false);

  const [qualificationModal, setQualificationModal] = useState<{
    isOpen: boolean; tier: TierKey; tierName: string; price: string;
  }>({ isOpen: false, tier: 'starter', tierName: '', price: '' });

  const [checkoutModal, setCheckoutModal] = useState<{
    isOpen: boolean; tier: TierKey; tierName: string; price: string;
  }>({ isOpen: false, tier: 'starter', tierName: '', price: '' });

  const [evaluationModal, setEvaluationModal] = useState<{
    isOpen: boolean; tierName: string; price: string;
  }>({ isOpen: false, tierName: '', price: '' });

  const l = pageLabels[lang];

  const plans = [
    {
      key: 'starter' as TierKey,
      name: lang === 'es' ? 'Starter Consulting' : 'Starter Consulting',
      subtitle: lang === 'es'
        ? 'Ideal para empresas que necesitan dirección estratégica sin ejecución activa.'
        : 'For small teams that need strategic direction without active execution.',
      price: isYearly ? '$249' : '$299',
      period: isYearly ? '/mo (billed yearly)' : '/mo',
      hours: lang === 'es' ? '4 horas/mes' : '4 hours/month',
      responseTime: lang === 'es' ? '1-2 días hábiles' : '1-2 business days',
      features: lang === 'es'
        ? ['Consultoría Cloud & AI (4h/mes)', 'Revisión de infraestructura y base de datos', 'Recomendaciones de optimización de costos', 'Plan de acción mensual priorizado']
        : ['Cloud & AI consulting (4h/mo)', 'Infrastructure & database review', 'Cost optimization recommendations', 'Monthly prioritized action plan'],
      exclusion: l.exclusionStarter,
      popular: false,
    },
    {
      key: 'growth' as TierKey,
      name: lang === 'es' ? 'Growth Consulting' : 'Growth Consulting',
      subtitle: lang === 'es'
        ? 'Para empresas con producción activa que necesitan ejecución y estabilidad continua.'
        : 'For companies with active production that need execution and ongoing stability.',
      price: isYearly ? '$699' : '$899',
      period: isYearly ? '/mo (billed yearly)' : '/mo',
      hours: lang === 'es' ? '10 horas/mes' : '10 hours/month',
      responseTime: lang === 'es' ? 'Mismo o siguiente día hábil' : 'Same or next business day',
      features: lang === 'es'
        ? ['Consultoría & ejecución Cloud & AI (10h/mes)', 'Gestión asistida de 1 entorno de base de datos', 'Acciones de optimización de rendimiento y costos', 'Configuración avanzada de monitoreo']
        : ['Cloud & AI consulting & execution (10h/mo)', 'Assisted management of 1 database environment', 'Performance & cost optimization actions', 'Advanced monitoring configuration'],
      exclusion: l.exclusionGrowth,
      popular: true,
    },
    {
      key: 'enterprise' as TierKey,
      name: 'Enterprise',
      subtitle: lang === 'es'
        ? 'Para entornos críticos, regulados o de alta complejidad.'
        : 'For regulated or high-complexity critical environments.',
      price: lang === 'es' ? 'Personalizado' : 'Custom',
      period: '',
      hours: null,
      responseTime: null,
      features: lang === 'es'
        ? ['Horas personalizadas de consultoría & ejecución', 'Gestión multi-entorno y multi-región', 'Soporte 24/7 on-call con SLAs', 'Cumplimiento SOC 2, HIPAA, PCI']
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

      {/* Pricing Cards + Feature Comparison Strip */}
      <PricingCards
        plans={plans}
        labels={l}
        lang={lang}
        getLocalizedPath={getLocalizedPath}
        onGetStarted={handleGetStarted}
      />

      {/* Comparison Section */}
      <ComparisonSection />

      {/* ROI Calculator */}
      <section className="py-6 bg-muted/30">
        <div className="container">
          <p className="text-center text-sm text-muted-foreground mb-2">{l.estimatorIntro}</p>
        </div>
      </section>
      <ROICalculator />

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
