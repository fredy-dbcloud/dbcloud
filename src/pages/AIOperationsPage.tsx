import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Zap, CheckCircle, ArrowRight, Clock, DollarSign, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLang } from '@/hooks/useLang';
import { siteConfig } from '@/config/site';

export default function AIOperationsPage() {
  const { lang } = useLang();

  // Unified CTA across all AI pages
  const unifiedCTA = lang === 'es' ? 'Hablar con un Especialista' : 'Talk to a Specialist';

  const content = {
    en: {
      badge: 'AI for Operations',
      headline: 'Automate repetitive tasks. Do more with the same team.',
      subheadline: 'AI automation designed for small businesses that need to scale without hiring.',
      whoFor: 'Built for US small businesses (10-200 employees) without dedicated DevOps or IT teams.',
      benefits: [
        { icon: Clock, title: 'Save 10+ hours/week', desc: 'Automate data entry, reports, and routine workflows.' },
        { icon: DollarSign, title: 'Cut operational costs', desc: 'Reduce manual work without new hires.' },
        { icon: Users, title: 'Built for small teams', desc: 'No DevOps or AI expertise required.' },
      ],
      painPoints: [
        'Spending hours on data entry and manual reports',
        'Too many spreadsheets, too little visibility',
        'Small team stretched across too many tasks',
        "Need to scale but can't afford more hires",
      ],
      howItWorks: [
        { step: '1', title: 'We assess your workflows', desc: 'Identify repetitive tasks eating your time.' },
        { step: '2', title: 'We build your automation', desc: 'Custom AI workflows that fit your tools.' },
        { step: '3', title: 'You save hours weekly', desc: 'Focus on growth, not grunt work.' },
      ],
      included: [
        'Automated data workflows',
        'Integration with your existing tools',
        'Scheduled reports and alerts',
        'Error reduction in manual processes',
      ],
      notIncluded: [
        'Custom ML model training',
        'Enterprise-scale data pipelines',
        '24/7 on-call support (available on Enterprise)',
      ],
      pricing: {
        title: 'Simple Pricing',
        price: 'From $499/mo',
        desc: 'Predictable monthly cost. No long-term contracts. Start in 48 hours.',
      },
    },
    es: {
      badge: 'IA para Operaciones',
      headline: 'Automatiza tareas repetitivas. Haz más con el mismo equipo.',
      subheadline: 'Automatización con IA diseñada para pequeñas empresas que necesitan escalar sin contratar.',
      whoFor: 'Diseñado para PyMEs en EE.UU. (10-200 empleados) sin equipos DevOps o TI dedicados.',
      benefits: [
        { icon: Clock, title: 'Ahorra 10+ horas/semana', desc: 'Automatiza entrada de datos, reportes y flujos rutinarios.' },
        { icon: DollarSign, title: 'Reduce costos operativos', desc: 'Reduce trabajo manual sin nuevas contrataciones.' },
        { icon: Users, title: 'Hecho para equipos pequeños', desc: 'No requiere expertos en DevOps o IA.' },
      ],
      painPoints: [
        'Gastas horas en entrada de datos y reportes manuales',
        'Demasiadas hojas de cálculo, poca visibilidad',
        'Equipo pequeño estirado en demasiadas tareas',
        'Necesitas escalar pero no puedes pagar más contrataciones',
      ],
      howItWorks: [
        { step: '1', title: 'Evaluamos tus flujos', desc: 'Identificamos tareas repetitivas que consumen tu tiempo.' },
        { step: '2', title: 'Construimos tu automatización', desc: 'Flujos IA personalizados que se integran con tus herramientas.' },
        { step: '3', title: 'Ahorras horas semanalmente', desc: 'Enfócate en crecer, no en trabajo tedioso.' },
      ],
      included: [
        'Flujos de datos automatizados',
        'Integración con tus herramientas actuales',
        'Reportes y alertas programados',
        'Reducción de errores en procesos manuales',
      ],
      notIncluded: [
        'Entrenamiento de modelos ML personalizados',
        'Pipelines de datos a escala enterprise',
        'Soporte 24/7 de guardia (disponible en Enterprise)',
      ],
      pricing: {
        title: 'Precios Simples',
        price: 'Desde $499/mes',
        desc: 'Costo mensual predecible. Sin contratos largos. Inicia en 48 horas.',
      },
    },
  };

  const c = content[lang];

  return (
    <Layout>
      {/* Hero - Problem → Outcome */}
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
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              {c.headline}
            </h1>
            <p className="text-base sm:text-lg text-white/85 mb-4">
              {c.subheadline}
            </p>
            <p className="text-sm text-white/70 mb-8">
              {c.whoFor}
            </p>
            {/* ONE Primary CTA */}
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg px-10">
              <a href={siteConfig.SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
                {unifiedCTA}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Benefits - What it solves */}
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

      {/* Pain Points - What problems this solves */}
      <section className="py-12 bg-muted/30 border-y border-border">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-display text-xl font-bold mb-6">
              {lang === 'es' ? '¿Te suena familiar?' : 'Sound familiar?'}
            </h2>
            <ul className="grid sm:grid-cols-2 gap-4 text-left">
              {c.painPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* How It Works - Simple steps */}
      <section className="py-16 bg-background">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-display text-xl font-bold mb-8">
              {lang === 'es' ? 'Cómo Funciona' : 'How It Works'}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {c.howItWorks.map((step) => (
                <div key={step.step} className="text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 text-accent font-bold mb-3">
                    {step.step}
                  </div>
                  <h3 className="font-display text-base font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* What's Included / Not Included */}
      <section className="py-12 bg-muted/30 border-y border-border">
        <div className="container max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="font-display text-lg font-bold mb-4 text-foreground">
                {lang === 'es' ? '✓ Incluido' : '✓ Included'}
              </h3>
              <ul className="space-y-3">
                {c.included.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <CheckCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
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
              <h3 className="font-display text-lg font-bold mb-4 text-muted-foreground">
                {lang === 'es' ? '○ No Incluido' : '○ Not Included'}
              </h3>
              <ul className="space-y-3">
                {c.notIncluded.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="h-4 w-4 flex-shrink-0 mt-0.5">○</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing - ONE CTA */}
      <section className="py-16 bg-background">
        <div className="container max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold mb-2">{c.pricing.title}</h2>
          <p className="text-3xl font-bold text-accent mb-2">{c.pricing.price}</p>
          <p className="text-sm text-muted-foreground mb-8">{c.pricing.desc}</p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg px-10">
            <a href={siteConfig.SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
              {unifiedCTA}
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
          <p className="mt-4 text-xs text-muted-foreground">
            {lang === 'es' ? '30 min gratis · Sin compromiso' : '30 min free · No commitment'}
          </p>
        </div>
      </section>
    </Layout>
  );
}
