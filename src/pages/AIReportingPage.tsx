import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BarChart3, CheckCircle, ArrowRight, TrendingUp, Eye, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLang } from '@/hooks/useLang';
import { siteConfig } from '@/config/site';

export default function AIReportingPage() {
  const { lang, t, getLocalizedPath } = useLang();

  const content = {
    en: {
      badge: 'AI for Reporting',
      headline: 'See your business clearly. No analysts required.',
      subheadline: 'AI-powered dashboards that turn your data into actionable insights—automatically.',
      cta: 'See My Business Insights',
      ctaSecondary: 'View Pricing',
      benefits: [
        { icon: Eye, title: 'Instant visibility', desc: 'Know exactly how your business is performing right now.' },
        { icon: TrendingUp, title: 'Spot trends early', desc: 'AI detects patterns before they become problems.' },
        { icon: Bell, title: 'Proactive alerts', desc: 'Get notified when metrics move outside normal ranges.' },
      ],
      features: [
        'Automated daily/weekly/monthly reports',
        'Anomaly detection and alerts',
        'Clear, non-technical dashboards',
        'Custom metrics for your business',
      ],
      bestFor: 'Best for: Business owners who need clarity without building a data team.',
      pricing: {
        title: 'Simple Pricing',
        starter: 'From $499/mo',
        desc: 'No hidden fees. Cancel anytime.',
      },
    },
    es: {
      badge: 'IA para Reportes',
      headline: 'Ve tu negocio con claridad. Sin analistas.',
      subheadline: 'Dashboards con IA que convierten tus datos en insights accionables—automáticamente.',
      cta: 'Ver Mis Insights de Negocio',
      ctaSecondary: 'Ver Precios',
      benefits: [
        { icon: Eye, title: 'Visibilidad instantánea', desc: 'Conoce exactamente cómo está funcionando tu negocio ahora.' },
        { icon: TrendingUp, title: 'Detecta tendencias', desc: 'La IA detecta patrones antes de que se vuelvan problemas.' },
        { icon: Bell, title: 'Alertas proactivas', desc: 'Recibe notificaciones cuando las métricas salen del rango normal.' },
      ],
      features: [
        'Reportes automatizados diarios/semanales/mensuales',
        'Detección de anomalías y alertas',
        'Dashboards claros y no técnicos',
        'Métricas personalizadas para tu negocio',
      ],
      bestFor: 'Ideal para: Dueños de negocios que necesitan claridad sin armar un equipo de datos.',
      pricing: {
        title: 'Precios Simples',
        starter: 'Desde $499/mes',
        desc: 'Sin costos ocultos. Cancela cuando quieras.',
      },
    },
  };

  const c = content[lang];

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-hero-gradient">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm mb-6 text-sm">
              <BarChart3 className="h-4 w-4 text-accent" />
              <span>{c.badge}</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              {c.headline}
            </h1>
            <p className="text-lg text-white/80 mb-8">
              {c.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <a href={siteConfig.SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
                  {c.cta}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Link to={getLocalizedPath('/pricing')}>
                  {c.ctaSecondary}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {c.benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="inline-flex p-3 rounded-xl bg-accent/10 mb-4">
                  <benefit.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-display text-lg font-bold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-muted/30 border-y border-border">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <ul className="grid sm:grid-cols-2 gap-4 text-left">
              {c.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted-foreground italic">{c.bestFor}</p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-12 bg-background">
        <div className="container max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold mb-2">{c.pricing.title}</h2>
          <p className="text-3xl font-bold text-accent mb-2">{c.pricing.starter}</p>
          <p className="text-sm text-muted-foreground mb-6">{c.pricing.desc}</p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <a href={siteConfig.SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
              {c.cta}
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
