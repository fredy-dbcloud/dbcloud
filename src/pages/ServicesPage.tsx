import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cloud, Database, Server, Zap, Shield, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLang } from '@/hooks/useLang';

export default function ServicesPage() {
  const { lang, t, getLocalizedPath } = useLang();

  const servicesData = t.services as any;

  const services = [
    {
      icon: Cloud,
      title: lang === 'es' ? 'Infraestructura Cloud Multi-Nube' : 'Multi-Cloud Infrastructure',
      benefit: servicesData.cloud.benefit,
      description: lang === 'es' 
        ? 'Diseño, implementación y gestión de arquitecturas cloud en AWS, Azure, GCP y Oracle Cloud con seguridad de nivel empresarial, optimización de costos y cumplimiento regulatorio.'
        : 'Design, implementation, and management of cloud architectures on AWS, Azure, GCP, and Oracle Cloud with enterprise-grade security, cost optimization, and regulatory compliance.',
      features: lang === 'es' 
        ? ['AWS, Azure, GCP, Oracle Cloud', 'Kubernetes & Docker', 'Terraform IaC', 'Seguridad & cumplimiento']
        : ['AWS, Azure, GCP, Oracle Cloud', 'Kubernetes & Docker', 'Terraform IaC', 'Security & compliance'],
    },
    {
      icon: Database,
      title: lang === 'es' ? 'Bases de Datos Administradas 24/7' : '24/7 Managed Databases',
      benefit: servicesData.databases.benefit,
      description: lang === 'es'
        ? 'Administración completa de PostgreSQL, MySQL, Oracle, SQL Server, MongoDB, Redis y más. Monitoreo proactivo, respaldos automatizados y optimización de rendimiento.'
        : 'Complete administration of PostgreSQL, MySQL, Oracle, SQL Server, MongoDB, Redis, and more. Proactive monitoring, automated backups, and performance optimization.',
      features: lang === 'es'
        ? ['PostgreSQL, MySQL, Oracle, SQL Server', 'MongoDB & Redis', 'Amazon Aurora & Azure SQL', 'Alta disponibilidad & DR']
        : ['PostgreSQL, MySQL, Oracle, SQL Server', 'MongoDB & Redis', 'Amazon Aurora & Azure SQL', 'High Availability & DR'],
    },
    {
      icon: Zap,
      title: lang === 'es' ? 'Migración Cloud Sin Inactividad' : 'Zero-Downtime Cloud Migration',
      benefit: servicesData.migration.benefit,
      description: lang === 'es'
        ? 'Migraciones desde on-premises a AWS, Azure, GCP u Oracle Cloud sin tiempo de inactividad. Evaluación completa, planificación detallada, ejecución y soporte post-migración.'
        : 'Migrations from on-premises to AWS, Azure, GCP, or Oracle Cloud with zero downtime. Complete assessment, detailed planning, execution, and post-migration support.',
      features: lang === 'es'
        ? ['Migración on-prem a cloud', 'Despliegues blue-green', 'Optimización de costos', 'Validación post-migración']
        : ['On-prem to cloud migration', 'Blue-green deployments', 'Cost optimization', 'Post-migration validation'],
    },
    {
      icon: Shield,
      title: lang === 'es' ? 'DR & Alta Disponibilidad' : 'DR & High Availability',
      benefit: lang === 'es' 
        ? 'Cuando algo falla, tu negocio sigue funcionando.'
        : 'When something breaks, your business keeps running.',
      description: lang === 'es'
        ? 'Soluciones de recuperación ante desastres y alta disponibilidad con failover automático, respaldos geo-redundantes y SLAs personalizados hasta 99.99%.'
        : 'Disaster recovery and high availability solutions with automatic failover, geo-redundant backups, and custom SLAs up to 99.99%.',
      features: lang === 'es'
        ? ['Failover automático', 'Respaldos geo-redundantes', 'SLAs hasta 99.99%', 'Runbooks documentados']
        : ['Automatic failover', 'Geo-redundant backups', 'SLAs up to 99.99%', 'Documented runbooks'],
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
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {t.services.title}
            </h1>
            <p className="text-lg sm:text-xl text-white/90 leading-relaxed">
              {t.services.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-10">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-card border border-border shadow-card"
              >
                <div className="inline-flex p-4 rounded-xl bg-accent/10 mb-5">
                  <service.icon className="h-8 w-8 text-accent" />
                </div>
                
                <h2 className="font-display text-2xl font-bold mb-3">
                  {service.title}
                </h2>
                
                {/* Benefit headline - the key selling point */}
                <p className="text-accent font-medium text-base mb-5">
                  {service.benefit}
                </p>
                
                <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-base">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Who These Services Are For - Lead qualification */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 max-w-3xl mx-auto"
          >
            <div className="p-8 rounded-2xl bg-muted/50 border border-border">
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-center mb-8">
                {servicesData.whoFor.title}
              </h3>
              <ul className="grid sm:grid-cols-2 gap-5">
                {servicesData.whoFor.items.map((item: string) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-base text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Industries We Support - Simple Text Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <h3 className="font-display text-lg font-semibold text-muted-foreground mb-5">
              {lang === 'es' ? 'Industrias que apoyamos frecuentemente' : 'Industries we commonly support'}
            </h3>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-base">
              <Link 
                to={getLocalizedPath('/industries/retail')} 
                className="text-foreground hover:text-accent transition-colors"
              >
                {lang === 'es' ? 'Retail SMB' : 'Retail SMB'}
              </Link>
              <Link 
                to={getLocalizedPath('/industries/healthcare')} 
                className="text-foreground hover:text-accent transition-colors"
              >
                {lang === 'es' ? 'Healthcare SMB' : 'Healthcare SMB'}
              </Link>
              <Link 
                to={getLocalizedPath('/industries/saas')} 
                className="text-foreground hover:text-accent transition-colors"
              >
                {lang === 'es' ? 'SaaS SMB' : 'SaaS SMB'}
              </Link>
            </div>
          </motion.div>

          {/* CTA - Evaluation-focused */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-6 text-base">
              <Link to={getLocalizedPath('/contact')}>
                {servicesData.cta}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            {/* Micro-bridge to pricing */}
            <p className="mt-5 text-base text-muted-foreground">
              {lang === 'es' 
                ? '¿No sabes qué nivel de soporte necesitas? ' 
                : 'Not sure what level of support you need? '}
              <Link 
                to={getLocalizedPath('/pricing')} 
                className="text-accent hover:underline"
              >
                {lang === 'es' ? 'Ver planes para PYMEs →' : 'See our pricing plans for SMBs →'}
              </Link>
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
