import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, Shield, BarChart3, Bot, Sparkles, CheckCircle, ArrowRight, Zap, FileText, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLang } from '@/hooks/useLang';
import { siteConfig } from '@/config/site';

export default function AIPage() {
  const { lang, t, getLocalizedPath } = useLang();

  // SMB-focused AI services - practical, not experimental
  const services = [
    {
      icon: Zap,
      title: lang === 'es' ? 'Automatización de Operaciones' : 'Operations Automation',
      description: lang === 'es'
        ? 'Automatiza tareas repetitivas y reduce trabajo manual. Ideal para equipos pequeños que necesitan hacer más con menos.'
        : 'Automate repetitive tasks and reduce manual work. Perfect for small teams that need to do more with less.',
      features: lang === 'es'
        ? ['Flujos de trabajo automatizados', 'Reducción de errores manuales', 'Ahorro de tiempo del equipo', 'Integración con herramientas existentes']
        : ['Automated workflows', 'Reduced manual errors', 'Team time savings', 'Integration with existing tools'],
    },
    {
      icon: BarChart3,
      title: lang === 'es' ? 'Reportes e Insights con IA' : 'AI-Powered Reporting & Insights',
      description: lang === 'es'
        ? 'Dashboards inteligentes que muestran lo que importa. Obtén insights sin necesitar un equipo de analistas.'
        : 'Smart dashboards that show what matters. Get insights without needing a team of analysts.',
      features: lang === 'es'
        ? ['Reportes automatizados', 'Detección de anomalías', 'Alertas proactivas', 'Métricas de negocio claras']
        : ['Automated reports', 'Anomaly detection', 'Proactive alerts', 'Clear business metrics'],
    },
    {
      icon: Bot,
      title: lang === 'es' ? 'Asistentes IA para tu Equipo' : 'AI Assistants for Your Team',
      description: lang === 'es'
        ? 'Asistentes de IA privados que trabajan con tus datos internos. Responde preguntas y ejecuta tareas sin exponer información.'
        : 'Private AI assistants that work with your internal data. Answer questions and execute tasks without exposing information.',
      features: lang === 'es'
        ? ['Chat con tus documentos', 'Búsqueda inteligente interna', 'Automatización de respuestas', 'Datos 100% privados']
        : ['Chat with your documents', 'Smart internal search', 'Response automation', '100% private data'],
    },
    {
      icon: Shield,
      title: lang === 'es' ? 'IA Segura y Privada' : 'Secure & Private AI',
      description: lang === 'es'
        ? 'Tus datos nunca salen de tu ambiente. IA que cumple con regulaciones sin comprometer seguridad.'
        : 'Your data never leaves your environment. AI that meets regulations without compromising security.',
      features: lang === 'es'
        ? ['Datos en tu infraestructura', 'Sin exposición a terceros', 'Cumplimiento regulatorio', 'Control total de acceso']
        : ['Data in your infrastructure', 'No third-party exposure', 'Regulatory compliance', 'Full access control'],
    },
  ];

  // SMB-focused value propositions
  const valueProps = lang === 'es' ? [
    'Sin contratos a largo plazo',
    'Onboarding en días, no meses',
    'Precios claros y predecibles',
    'Soporte de ingenieros senior',
  ] : [
    'No long-term contracts',
    'Onboarding in days, not months',
    'Clear, predictable pricing',
    'Senior engineer support',
  ];

  return (
    <Layout>
      {/* Hero - SMB-focused messaging */}
      <section className="pt-32 pb-20 bg-hero-gradient">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm mb-6 text-sm">
              <Sparkles className="h-4 w-4 text-accent" />
              <span>{lang === 'es' ? 'IA Práctica para PyMEs' : 'Practical AI for SMBs'}</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-6">
              {lang === 'es' 
                ? 'IA que ahorra tiempo, reduce costos y apoya tus operaciones diarias'
                : 'AI that saves time, reduces costs, and supports daily operations'}
            </h1>
            <p className="text-lg text-white/80 mb-8">
              {lang === 'es' 
                ? 'Soluciones de IA diseñadas para pequeñas y medianas empresas. Sin complejidad innecesaria, sin experimentos—solo resultados.'
                : 'AI solutions designed for small and mid-sized businesses. No unnecessary complexity, no experiments—just results.'}
            </p>
            
            {/* Value props */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {valueProps.map((prop) => (
                <div key={prop} className="flex items-center gap-2 text-sm text-white/70">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <span>{prop}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <a href={siteConfig.SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
                  {t.cta.schedule}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Link to={getLocalizedPath('/pricing')}>
                  {lang === 'es' ? 'Ver Planes' : 'View Plans'}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SMB Use Cases Banner */}
      <section className="py-8 bg-accent/5 border-b border-border">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              {lang === 'es' ? 'Automatización de documentos' : 'Document automation'}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {lang === 'es' ? 'Ahorro de tiempo' : 'Time savings'}
            </span>
            <span className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              {lang === 'es' ? 'Para equipos pequeños' : 'For small teams'}
            </span>
            <span className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              {lang === 'es' ? 'Datos seguros' : 'Secure data'}
            </span>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl font-bold mb-4">
              {lang === 'es' ? 'Cómo la IA puede ayudar a tu negocio' : 'How AI can help your business'}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {lang === 'es'
                ? 'Soluciones enfocadas en resultados tangibles para pequeñas y medianas empresas'
                : 'Solutions focused on tangible results for small and mid-sized businesses'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-card border border-border shadow-card"
              >
                <div className="inline-flex p-3 rounded-xl bg-accent/10 mb-4">
                  <service.icon className="h-8 w-8 text-accent" />
                </div>
                
                <h3 className="font-display text-xl font-bold mb-3">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground mb-6">
                  {service.description}
                </p>
                
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SMB-specific messaging section */}
      <section className="py-16 bg-muted/30 border-y border-border">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-display text-2xl font-bold mb-4">
              {lang === 'es' 
                ? '¿Es la IA adecuada para mi empresa?' 
                : 'Is AI right for my business?'}
            </h2>
            <p className="text-muted-foreground mb-8">
              {lang === 'es'
                ? 'Si tu equipo pasa horas en tareas repetitivas, busca información en múltiples sistemas, o necesita respuestas más rápidas—la IA puede ayudar.'
                : 'If your team spends hours on repetitive tasks, searches for information across multiple systems, or needs faster answers—AI can help.'}
            </p>
            
            <div className="grid sm:grid-cols-3 gap-6 text-left mb-8">
              <div className="p-4 rounded-lg bg-card border border-border">
                <h4 className="font-semibold mb-2">
                  {lang === 'es' ? '✓ Ideal para' : '✓ Ideal for'}
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>{lang === 'es' ? 'Equipos de 10-200 personas' : 'Teams of 10-200 people'}</li>
                  <li>{lang === 'es' ? 'Procesos manuales repetitivos' : 'Repetitive manual processes'}</li>
                  <li>{lang === 'es' ? 'Necesidad de reportes rápidos' : 'Need for fast reports'}</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border">
                <h4 className="font-semibold mb-2">
                  {lang === 'es' ? '$ Inversión clara' : '$ Clear investment'}
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>{lang === 'es' ? 'Planes desde $499/mes' : 'Plans from $499/month'}</li>
                  <li>{lang === 'es' ? 'Sin contratos largos' : 'No long contracts'}</li>
                  <li>{lang === 'es' ? 'Sin sorpresas' : 'No surprises'}</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border">
                <h4 className="font-semibold mb-2">
                  {lang === 'es' ? '⚡ Resultados rápidos' : '⚡ Fast results'}
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>{lang === 'es' ? 'Inicio en 48 horas' : 'Start in 48 hours'}</li>
                  <li>{lang === 'es' ? 'Primeros resultados en semanas' : 'First results in weeks'}</li>
                  <li>{lang === 'es' ? 'Soporte continuo' : 'Ongoing support'}</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-display text-2xl font-bold mb-4">
              {lang === 'es' ? '¿Listo para empezar?' : 'Ready to get started?'}
            </h2>
            <p className="text-muted-foreground mb-8">
              {lang === 'es'
                ? 'Agenda una llamada de 30 minutos para evaluar cómo la IA puede ayudar a tu negocio.'
                : 'Schedule a 30-minute call to evaluate how AI can help your business.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <a href={siteConfig.SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
                  {t.cta.schedule}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to={getLocalizedPath('/contact')}>
                  {t.cta.contact}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
