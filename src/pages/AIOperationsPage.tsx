import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, CheckCircle, ArrowRight, Clock, DollarSign, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLang } from '@/hooks/useLang';
import { siteConfig } from '@/config/site';

export default function AIOperationsPage() {
  const { lang, t, getLocalizedPath } = useLang();

  const content = {
    en: {
      badge: 'AI for Operations',
      headline: 'Automate repetitive tasks. Do more with the same team.',
      subheadline: 'AI automation designed for small businesses that need to scale without hiring.',
      cta: 'Automate My Operations',
      ctaSecondary: 'See How It Works',
      benefits: [
        { icon: Clock, title: 'Save 10+ hours/week', desc: 'Automate data entry, reports, and routine workflows.' },
        { icon: DollarSign, title: 'Cut operational costs', desc: 'Reduce manual work without new hires.' },
        { icon: Users, title: 'Built for small teams', desc: 'No DevOps or AI expertise required.' },
      ],
      features: [
        'Automated data workflows',
        'Integration with your existing tools',
        'Scheduled reports and alerts',
        'Error reduction in manual processes',
      ],
      bestFor: 'Best for: Teams spending hours on repetitive data tasks.',
      pricing: {
        title: 'Simple Pricing',
        starter: 'From $499/mo',
        desc: 'Predictable monthly cost. No long-term contracts.',
      },
    },
    es: {
      badge: 'IA para Operaciones',
      headline: 'Automatiza tareas repetitivas. Haz más con el mismo equipo.',
      subheadline: 'Automatización con IA diseñada para pequeñas empresas que necesitan escalar sin contratar.',
      cta: 'Automatizar Mis Operaciones',
      ctaSecondary: 'Ver Cómo Funciona',
      benefits: [
        { icon: Clock, title: 'Ahorra 10+ horas/semana', desc: 'Automatiza entrada de datos, reportes y flujos rutinarios.' },
        { icon: DollarSign, title: 'Reduce costos operativos', desc: 'Reduce trabajo manual sin nuevas contrataciones.' },
        { icon: Users, title: 'Hecho para equipos pequeños', desc: 'No requiere expertos en DevOps o IA.' },
      ],
      features: [
        'Flujos de datos automatizados',
        'Integración con tus herramientas actuales',
        'Reportes y alertas programados',
        'Reducción de errores en procesos manuales',
      ],
      bestFor: 'Ideal para: Equipos que pasan horas en tareas de datos repetitivas.',
      pricing: {
        title: 'Precios Simples',
        starter: 'Desde $499/mes',
        desc: 'Costo mensual predecible. Sin contratos a largo plazo.',
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
              <Zap className="h-4 w-4 text-accent" />
              <span>{c.badge}</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              {c.headline}
            </h1>
            <p className="text-lg text-white/80 mb-8">
              {c.subheadline}
            </p>
            {/* Single Primary CTA */}
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg">
              <a href={siteConfig.SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
                {c.cta}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
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

      {/* Pricing Preview - Single CTA at natural end */}
      <section className="py-16 bg-background">
        <div className="container max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold mb-2">{c.pricing.title}</h2>
          <p className="text-3xl font-bold text-accent mb-2">{c.pricing.starter}</p>
          <p className="text-sm text-muted-foreground mb-6">{c.pricing.desc}</p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg">
            <a href={siteConfig.SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
              {c.cta}
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
          {/* Secondary as text link */}
          <p className="mt-4 text-sm text-muted-foreground">
            <Link to={getLocalizedPath('/pricing')} className="text-accent hover:underline">
              {c.ctaSecondary}
            </Link>
          </p>
        </div>
      </section>
    </Layout>
  );
}
