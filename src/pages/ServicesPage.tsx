import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cloud, Database, Server, Zap, Shield, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLang } from '@/hooks/useLang';

export default function ServicesPage() {
  const { lang, t, getLocalizedPath } = useLang();

  const services = [
    {
      icon: Cloud,
      title: lang === 'es' ? 'Infraestructura Cloud' : 'Cloud Infrastructure',
      description: lang === 'es' 
        ? 'Diseño, implementación y gestión de arquitecturas cloud en AWS, Azure y GCP.'
        : 'Design, implementation, and management of cloud architectures on AWS, Azure, and GCP.',
      features: lang === 'es' 
        ? ['Arquitectura multi-nube', 'Optimización de costos', 'Seguridad empresarial', 'Cumplimiento normativo']
        : ['Multi-cloud architecture', 'Cost optimization', 'Enterprise security', 'Compliance management'],
    },
    {
      icon: Database,
      title: lang === 'es' ? 'Bases de Datos Administradas' : 'Managed Databases',
      description: lang === 'es'
        ? 'Administración completa 24/7 de PostgreSQL, MySQL, MongoDB, Redis y más.'
        : 'Complete 24/7 administration of PostgreSQL, MySQL, MongoDB, Redis, and more.',
      features: lang === 'es'
        ? ['Monitoreo proactivo', 'Respaldos automatizados', 'Optimización de rendimiento', 'Alta disponibilidad']
        : ['Proactive monitoring', 'Automated backups', 'Performance optimization', 'High availability'],
    },
    {
      icon: Zap,
      title: lang === 'es' ? 'Migración a la Nube' : 'Cloud Migration',
      description: lang === 'es'
        ? 'Migraciones sin tiempo de inactividad con planificación completa y soporte.'
        : 'Zero-downtime migrations with comprehensive planning and support.',
      features: lang === 'es'
        ? ['Evaluación de infraestructura', 'Plan de migración detallado', 'Ejecución sin interrupciones', 'Validación post-migración']
        : ['Infrastructure assessment', 'Detailed migration plan', 'Seamless execution', 'Post-migration validation'],
    },
    {
      icon: Shield,
      title: lang === 'es' ? 'DR & Alta Disponibilidad' : 'DR & High Availability',
      description: lang === 'es'
        ? 'Soluciones de recuperación ante desastres y arquitecturas de alta disponibilidad.'
        : 'Disaster recovery solutions and high availability architectures.',
      features: lang === 'es'
        ? ['Failover automático', 'Respaldos geo-redundantes', 'Recuperación punto en el tiempo', 'Runbooks completos']
        : ['Automatic failover', 'Geo-redundant backups', 'Point-in-time recovery', 'Comprehensive runbooks'],
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
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-6">
              {t.services.title}
            </h1>
            <p className="text-lg text-white/80">
              {t.services.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
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
                <div className="inline-flex p-3 rounded-xl bg-accent/10 mb-4">
                  <service.icon className="h-8 w-8 text-accent" />
                </div>
                
                <h2 className="font-display text-2xl font-bold mb-3">
                  {service.title}
                </h2>
                
                <p className="text-muted-foreground mb-6">
                  {service.description}
                </p>
                
                <ul className="space-y-3 mb-6">
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
              <Link to={getLocalizedPath('/contact')}>
                {t.cta.contact}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
