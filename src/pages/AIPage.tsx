import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Brain, Shield, Cpu, BarChart3, Bot, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLang } from '@/hooks/useLang';
import { siteConfig } from '@/config/site';

export default function AIPage() {
  const { lang, t } = useLang();

  const services = [
    {
      icon: Brain,
      title: lang === 'es' ? 'Evaluación de Preparación para IA' : 'AI Readiness Assessment',
      description: lang === 'es'
        ? 'Evaluamos tu infraestructura, datos y procesos para determinar tu preparación para IA.'
        : 'We evaluate your infrastructure, data, and processes to determine your AI readiness.',
      features: lang === 'es'
        ? ['Análisis de calidad de datos', 'Evaluación de infraestructura', 'Hoja de ruta personalizada', 'Identificación de casos de uso']
        : ['Data quality analysis', 'Infrastructure evaluation', 'Custom roadmap', 'Use case identification'],
    },
    {
      icon: Bot,
      title: lang === 'es' ? 'Agentes de IA Privados' : 'Private AI Agents',
      description: lang === 'es'
        ? 'Agentes de IA personalizados que se ejecutan dentro de tu infraestructura segura.'
        : 'Custom AI agents that run within your secure infrastructure.',
      features: lang === 'es'
        ? ['Despliegue on-premise', 'Integración con sistemas existentes', 'Sin exposición de datos', 'Personalización completa']
        : ['On-premise deployment', 'Integration with existing systems', 'No data exposure', 'Full customization'],
    },
    {
      icon: Shield,
      title: lang === 'es' ? 'IA Segura y Compliant' : 'Secure & Compliant AI',
      description: lang === 'es'
        ? 'Soluciones de IA que cumplen con HIPAA, SOC 2, GDPR y otras normativas.'
        : 'AI solutions compliant with HIPAA, SOC 2, GDPR, and other regulations.',
      features: lang === 'es'
        ? ['Encriptación de extremo a extremo', 'Control de acceso granular', 'Auditoría completa', 'Cumplimiento normativo']
        : ['End-to-end encryption', 'Granular access control', 'Complete auditing', 'Regulatory compliance'],
    },
    {
      icon: BarChart3,
      title: lang === 'es' ? 'Analítica e Inteligencia de Negocios' : 'Analytics & Business Intelligence',
      description: lang === 'es'
        ? 'Dashboards inteligentes y análisis predictivo para tomar mejores decisiones.'
        : 'Intelligent dashboards and predictive analytics for better decision-making.',
      features: lang === 'es'
        ? ['Dashboards en tiempo real', 'Análisis predictivo', 'Detección de anomalías', 'Reportes automatizados']
        : ['Real-time dashboards', 'Predictive analytics', 'Anomaly detection', 'Automated reporting'],
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
            <div className="inline-flex p-2 rounded-full bg-white/10 backdrop-blur-sm mb-6">
              <Sparkles className="h-5 w-5 text-accent" />
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-6">
              {lang === 'es' ? 'Soluciones de IA Empresarial' : 'Enterprise AI Solutions'}
            </h1>
            <p className="text-lg text-white/80">
              {lang === 'es' 
                ? 'Transforma tu negocio con inteligencia artificial segura, privada y escalable.'
                : 'Transform your business with secure, private, and scalable artificial intelligence.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-background">
        <div className="container">
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
                <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-violet-500 to-purple-400 mb-4">
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                
                <h2 className="font-display text-2xl font-bold mb-3">
                  {service.title}
                </h2>
                
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

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <a href={siteConfig.SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
                {t.cta.schedule}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
