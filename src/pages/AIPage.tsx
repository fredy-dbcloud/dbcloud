import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, BarChart3, Bot, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLang } from '@/hooks/useLang';
import { siteConfig } from '@/config/site';

export default function AIPage() {
  const { lang, getLocalizedPath } = useLang();

  const content = {
    en: {
      badge: 'Practical AI for SMBs',
      headline: 'AI that saves time, reduces costs, and supports daily operations',
      subheadline: 'AI solutions designed for small and mid-sized businesses. No complexity, no experiments—just results.',
      valueProps: [
        'No long-term contracts',
        'Setup in days, not months',
        'Predictable pricing',
        'Senior engineer support',
      ],
      bundles: {
        title: 'AI Bundles for Your Business',
        subtitle: 'Choose the solution that fits your needs',
        operations: {
          icon: Zap,
          title: 'AI for Operations',
          audience: 'For small teams',
          problem: 'Automate repetitive tasks and reduce manual work',
          benefits: ['Save 10+ hours/week', 'Reduce manual errors', 'Do more with less'],
          cta: 'Automate My Operations',
          link: '/ai/operations',
        },
        reporting: {
          icon: BarChart3,
          title: 'AI for Reporting',
          audience: 'For growing SMBs',
          problem: 'Get business insights without hiring analysts',
          benefits: ['Automated reports', 'Anomaly detection', 'Clear metrics'],
          cta: 'See My Business Insights',
          link: '/ai/reporting',
        },
        assistants: {
          icon: Bot,
          title: 'AI Assistants',
          audience: 'For teams of all sizes',
          problem: 'Private AI that works with your internal data',
          benefits: ['Chat with documents', 'Smart search', '100% private'],
          cta: 'Build My AI Assistant',
          link: '/ai/assistants',
        },
      },
      whySection: {
        title: 'Is AI right for my business?',
        desc: 'If your team spends hours on repetitive tasks, searches for information across systems, or needs faster answers—AI can help.',
        ideal: {
          title: '✓ Ideal for',
          items: ['Teams of 10-200 people', 'Repetitive manual processes', 'Need for fast reports'],
        },
        investment: {
          title: '$ Clear investment',
          items: ['Plans from $499/month', 'No long contracts', 'No surprises'],
        },
        results: {
          title: '⚡ Fast results',
          items: ['Start in 48 hours', 'First results in weeks', 'Ongoing support'],
        },
      },
      cta: {
        title: 'Ready to get started?',
        desc: 'Schedule a 30-minute call to evaluate how AI can help your business.',
        primary: 'Schedule a Call',
        secondary: 'Contact Us',
      },
    },
    es: {
      badge: 'IA Práctica para PyMEs',
      headline: 'IA que ahorra tiempo, reduce costos y apoya tus operaciones diarias',
      subheadline: 'Soluciones de IA diseñadas para pequeñas y medianas empresas. Sin complejidad innecesaria, sin experimentos—solo resultados.',
      valueProps: [
        'Sin contratos a largo plazo',
        'Onboarding en días, no meses',
        'Precios predecibles',
        'Soporte de ingenieros senior',
      ],
      bundles: {
        title: 'Paquetes de IA para tu Negocio',
        subtitle: 'Elige la solución que se adapta a tus necesidades',
        operations: {
          icon: Zap,
          title: 'IA para Operaciones',
          audience: 'Para equipos pequeños',
          problem: 'Automatiza tareas repetitivas y reduce trabajo manual',
          benefits: ['Ahorra 10+ horas/semana', 'Reduce errores manuales', 'Haz más con menos'],
          cta: 'Automatizar Mis Operaciones',
          link: '/ai/operations',
        },
        reporting: {
          icon: BarChart3,
          title: 'IA para Reportes',
          audience: 'Para PyMEs en crecimiento',
          problem: 'Obtén insights de negocio sin contratar analistas',
          benefits: ['Reportes automatizados', 'Detección de anomalías', 'Métricas claras'],
          cta: 'Ver Mis Insights',
          link: '/ai/reporting',
        },
        assistants: {
          icon: Bot,
          title: 'Asistentes IA',
          audience: 'Para equipos de todos los tamaños',
          problem: 'IA privada que trabaja con tus datos internos',
          benefits: ['Chatea con documentos', 'Búsqueda inteligente', '100% privado'],
          cta: 'Crear Mi Asistente IA',
          link: '/ai/assistants',
        },
      },
      whySection: {
        title: '¿Es la IA adecuada para mi empresa?',
        desc: 'Si tu equipo pasa horas en tareas repetitivas, busca información en múltiples sistemas, o necesita respuestas más rápidas—la IA puede ayudar.',
        ideal: {
          title: '✓ Ideal para',
          items: ['Equipos de 10-200 personas', 'Procesos manuales repetitivos', 'Necesidad de reportes rápidos'],
        },
        investment: {
          title: '$ Inversión clara',
          items: ['Planes desde $499/mes', 'Sin contratos largos', 'Sin sorpresas'],
        },
        results: {
          title: '⚡ Resultados rápidos',
          items: ['Inicio en 48 horas', 'Primeros resultados en semanas', 'Soporte continuo'],
        },
      },
      cta: {
        title: '¿Listo para empezar?',
        desc: 'Agenda una llamada de 30 minutos para evaluar cómo la IA puede ayudar a tu negocio.',
        primary: 'Agendar Llamada',
        secondary: 'Contáctanos',
      },
    },
  };

  const c = content[lang];
  const bundles = [c.bundles.operations, c.bundles.reporting, c.bundles.assistants];

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
              <Sparkles className="h-4 w-4 text-accent" />
              <span>{c.badge}</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              {c.headline}
            </h1>
            <p className="text-lg text-white/85 mb-8">
              {c.subheadline}
            </p>
            
            {/* Value props */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {c.valueProps.map((prop) => (
                <div key={prop} className="flex items-center gap-2 text-sm text-white/80">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <span>{prop}</span>
                </div>
              ))}
            </div>

            {/* Single Primary CTA */}
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg">
              <a href={siteConfig.SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
                {c.cta.primary}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* AI Bundles */}
      <section className="py-20 bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl font-bold mb-2">{c.bundles.title}</h2>
            <p className="text-muted-foreground">{c.bundles.subtitle}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {bundles.map((bundle, index) => (
              <motion.div
                key={bundle.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border shadow-card hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex p-3 rounded-xl bg-accent/10 mb-4">
                  <bundle.icon className="h-6 w-6 text-accent" />
                </div>
                
                <h3 className="font-display text-xl font-bold mb-1">{bundle.title}</h3>
                <p className="text-xs text-accent font-medium mb-3">{bundle.audience}</p>
                <p className="text-sm text-muted-foreground mb-4">{bundle.problem}</p>
                
                <ul className="space-y-2 mb-6">
                  {bundle.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>

                <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link to={getLocalizedPath(bundle.link)}>
                    {bundle.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Is AI Right For My Business */}
      <section className="py-16 bg-muted/30 border-y border-border">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-display text-2xl font-bold mb-4">{c.whySection.title}</h2>
            <p className="text-muted-foreground mb-8">{c.whySection.desc}</p>
            
            <div className="grid sm:grid-cols-3 gap-6 text-left">
              <div className="p-4 rounded-lg bg-card border border-border">
                <h4 className="font-semibold mb-2">{c.whySection.ideal.title}</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {c.whySection.ideal.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border">
                <h4 className="font-semibold mb-2">{c.whySection.investment.title}</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {c.whySection.investment.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border">
                <h4 className="font-semibold mb-2">{c.whySection.results.title}</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {c.whySection.results.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA - Single action, natural end point */}
      <section className="py-16 bg-background">
        <div className="container text-center max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-2xl font-bold mb-3">{c.cta.title}</h2>
            <p className="text-muted-foreground mb-6">{c.cta.desc}</p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg">
              <a href={siteConfig.SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
                {c.cta.primary}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            {/* Secondary as text link */}
            <p className="mt-4 text-sm text-muted-foreground">
              {lang === 'es' ? '¿Prefieres escribirnos?' : 'Prefer to write?'}{' '}
              <Link to={getLocalizedPath('/contact')} className="text-accent hover:underline">
                {c.cta.secondary}
              </Link>
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
