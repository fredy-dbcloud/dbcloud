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
      title: lang === 'es' ? 'Infraestructura Cloud Multi-Nube' : 'Multi-Cloud Infrastructure',
      description: lang === 'es' 
        ? 'Diseño, implementación y gestión de arquitecturas cloud en AWS, Azure y GCP con seguridad de nivel empresarial, optimización de costos y cumplimiento regulatorio.'
        : 'Design, implementation, and management of cloud architectures on AWS, Azure, and GCP with enterprise-grade security, cost optimization, and regulatory compliance.',
      features: lang === 'es' 
        ? ['AWS, Azure, GCP', 'Kubernetes & Docker', 'Terraform IaC', 'VMware & OpenShift', 'Seguridad Zero Trust', 'Cumplimiento SOC 2/HIPAA']
        : ['AWS, Azure, GCP', 'Kubernetes & Docker', 'Terraform IaC', 'VMware & OpenShift', 'Zero Trust Security', 'SOC 2/HIPAA Compliance'],
    },
    {
      icon: Database,
      title: lang === 'es' ? 'Bases de Datos Administradas 24/7' : '24/7 Managed Databases',
      description: lang === 'es'
        ? 'Administración completa de PostgreSQL, MySQL, Oracle, SQL Server, MongoDB, Redis y más. Monitoreo proactivo, respaldos automatizados y optimización de rendimiento.'
        : 'Complete administration of PostgreSQL, MySQL, Oracle, SQL Server, MongoDB, Redis, and more. Proactive monitoring, automated backups, and performance optimization.',
      features: lang === 'es'
        ? ['PostgreSQL & MySQL', 'Oracle & SQL Server', 'MongoDB & Redis', 'Amazon Aurora', 'Azure SQL & Cloud SQL', 'Alta disponibilidad & DR']
        : ['PostgreSQL & MySQL', 'Oracle & SQL Server', 'MongoDB & Redis', 'Amazon Aurora', 'Azure SQL & Cloud SQL', 'High Availability & DR'],
    },
    {
      icon: Zap,
      title: lang === 'es' ? 'Migración Cloud Sin Inactividad' : 'Zero-Downtime Cloud Migration',
      description: lang === 'es'
        ? 'Migraciones desde on-premises a AWS, Azure o GCP sin tiempo de inactividad. Evaluación completa, planificación detallada, ejecución y soporte post-migración.'
        : 'Migrations from on-premises to AWS, Azure, or GCP with zero downtime. Complete assessment, detailed planning, execution, and post-migration support.',
      features: lang === 'es'
        ? ['Migración on-prem a cloud', 'Replicación lógica & CDC', 'Despliegues blue-green', 'Optimización de costos', 'Validación post-migración', 'Runbooks completos']
        : ['On-prem to cloud migration', 'Logical replication & CDC', 'Blue-green deployments', 'Cost optimization', 'Post-migration validation', 'Comprehensive runbooks'],
    },
    {
      icon: Shield,
      title: lang === 'es' ? 'DR & Alta Disponibilidad' : 'DR & High Availability',
      description: lang === 'es'
        ? 'Soluciones de recuperación ante desastres y alta disponibilidad con failover automático, respaldos geo-redundantes y SLAs personalizados hasta 99.99%.'
        : 'Disaster recovery and high availability solutions with automatic failover, geo-redundant backups, and custom SLAs up to 99.99%.',
      features: lang === 'es'
        ? ['Failover automático', 'Respaldos geo-redundantes', 'Recuperación punto en tiempo', 'Réplicas de lectura', 'SLAs hasta 99.99%', 'Runbooks documentados']
        : ['Automatic failover', 'Geo-redundant backups', 'Point-in-time recovery', 'Read replicas', 'SLAs up to 99.99%', 'Documented runbooks'],
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
