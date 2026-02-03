import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { BarChart3, CheckCircle, ArrowRight, TrendingUp, Eye, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLang } from '@/hooks/useLang';
import { siteConfig } from '@/config/site';

export default function AIReportingPage() {
  const { lang } = useLang();

  // Unified CTA across all AI pages
  const unifiedCTA = lang === 'es' ? 'Hablar con un Especialista' : 'Talk to a Specialist';

  const content = {
    en: {
      badge: 'AI for Reporting',
      headline: 'See your business clearly. No analysts required.',
      subheadline: 'AI-powered dashboards that turn your data into actionable insights—automatically.',
      whoFor: 'Built for US small business owners and finance teams who need clarity without building a data team.',
      benefits: [
        { icon: Eye, title: 'Instant visibility', desc: 'Know exactly how your business is performing right now.' },
        { icon: TrendingUp, title: 'Spot trends early', desc: 'AI detects patterns before they become problems.' },
        { icon: Bell, title: 'Proactive alerts', desc: 'Get notified when metrics move outside normal ranges.' },
      ],
      painPoints: [
        'Drowning in spreadsheets with no clear picture',
        'Making decisions based on outdated reports',
        "Can't afford a dedicated analyst",
        'Spending hours pulling data from multiple tools',
      ],
      howItWorks: [
        { step: '1', title: 'Connect your data', desc: 'We integrate with your existing tools and databases.' },
        { step: '2', title: 'We build your dashboard', desc: 'Custom metrics that matter to your business.' },
        { step: '3', title: 'You get clarity', desc: 'Daily insights delivered automatically.' },
      ],
      included: [
        'Automated daily/weekly/monthly reports',
        'Anomaly detection and alerts',
        'Clear, non-technical dashboards',
        'Custom metrics for your business',
      ],
      notIncluded: [
        'Real-time streaming analytics',
        'Multi-terabyte data warehouses',
        'Custom ML predictive models',
      ],
      pricing: {
        title: 'Simple Pricing',
        price: 'From $499/mo',
        desc: 'No hidden fees. Cancel anytime. Start in 48 hours.',
      },
    },
    es: {
      badge: 'IA para Reportes',
      headline: 'Ve tu negocio con claridad. Sin analistas.',
      subheadline: 'Dashboards con IA que convierten tus datos en insights accionables—automáticamente.',
      whoFor: 'Diseñado para dueños de PyMEs y equipos de finanzas que necesitan claridad sin armar un equipo de datos.',
      benefits: [
        { icon: Eye, title: 'Visibilidad instantánea', desc: 'Conoce exactamente cómo está funcionando tu negocio ahora.' },
        { icon: TrendingUp, title: 'Detecta tendencias', desc: 'La IA detecta patrones antes de que se vuelvan problemas.' },
        { icon: Bell, title: 'Alertas proactivas', desc: 'Recibe notificaciones cuando las métricas salen del rango normal.' },
      ],
      painPoints: [
        'Ahogándote en hojas de cálculo sin panorama claro',
        'Tomando decisiones con reportes desactualizados',
        'No puedes pagar un analista dedicado',
        'Gastando horas sacando datos de múltiples herramientas',
      ],
      howItWorks: [
        { step: '1', title: 'Conecta tus datos', desc: 'Nos integramos con tus herramientas y bases de datos.' },
        { step: '2', title: 'Construimos tu dashboard', desc: 'Métricas personalizadas que importan a tu negocio.' },
        { step: '3', title: 'Obtienes claridad', desc: 'Insights diarios entregados automáticamente.' },
      ],
      included: [
        'Reportes automatizados diarios/semanales/mensuales',
        'Detección de anomalías y alertas',
        'Dashboards claros y no técnicos',
        'Métricas personalizadas para tu negocio',
      ],
      notIncluded: [
        'Analíticas de streaming en tiempo real',
        'Data warehouses multi-terabyte',
        'Modelos ML predictivos personalizados',
      ],
      pricing: {
        title: 'Precios Simples',
        price: 'Desde $499/mes',
        desc: 'Sin costos ocultos. Cancela cuando quieras. Inicia en 48 horas.',
      },
    },
  };

  const c = content[lang];

  return (
    <Layout>
      {/* Hero - Problem → Outcome */}
      <section className="pt-32 pb-20 bg-hero-gradient">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm mb-6 text-base font-medium">
              <BarChart3 className="h-5 w-5 text-accent" />
              <span>{c.badge}</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {c.headline}
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-5 leading-relaxed">
              {c.subheadline}
            </p>
            <p className="text-base text-white/75 mb-10">
              {c.whoFor}
            </p>
            {/* ONE Primary CTA */}
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg px-10 py-6 text-base">
              <a href={siteConfig.SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
                {unifiedCTA}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {c.benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8"
              >
                <div className="inline-flex p-4 rounded-xl bg-accent/10 mb-5">
                  <benefit.icon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="font-display text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-base text-muted-foreground leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-16 bg-muted/30 border-y border-border">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8">
              {lang === 'es' ? '¿Te suena familiar?' : 'Sound familiar?'}
            </h2>
            <ul className="grid sm:grid-cols-2 gap-5 text-left">
              {c.painPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-base leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-background">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-10">
              {lang === 'es' ? 'Cómo Funciona' : 'How It Works'}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {c.howItWorks.map((step) => (
                <div key={step.step} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 text-accent font-bold text-lg mb-4">
                    {step.step}
                  </div>
                  <h3 className="font-display text-lg font-bold mb-3">{step.title}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* What's Included / Not Included */}
      <section className="py-16 bg-muted/30 border-y border-border">
        <div className="container max-w-4xl">
          <div className="grid md:grid-cols-2 gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="font-display text-xl font-bold mb-5 text-foreground">
                {lang === 'es' ? '✓ Incluido' : '✓ Included'}
              </h3>
              <ul className="space-y-4">
                {c.included.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="font-display text-xl font-bold mb-5 text-muted-foreground">
                {lang === 'es' ? '○ No Incluido' : '○ Not Included'}
              </h3>
              <ul className="space-y-4">
                {c.notIncluded.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base text-muted-foreground">
                    <span className="h-5 w-5 flex-shrink-0 mt-0.5">○</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing - ONE CTA */}
      <section className="py-20 bg-background">
        <div className="container max-w-2xl text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">{c.pricing.title}</h2>
          <p className="text-4xl font-bold text-accent mb-3">{c.pricing.price}</p>
          <p className="text-base text-muted-foreground mb-10">{c.pricing.desc}</p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg px-10 py-6 text-base">
            <a href={siteConfig.SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
              {unifiedCTA}
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
          <p className="mt-5 text-sm text-muted-foreground">
            {lang === 'es' ? '30 min gratis · Sin compromiso' : '30 min free · No commitment'}
          </p>
        </div>
      </section>
    </Layout>
  );
}
