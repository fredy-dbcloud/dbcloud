import { useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLang } from '@/hooks/useLang';
import { siteConfig } from '@/config/site';
import { Code, Zap, Database, Shield, CheckCircle, XCircle } from 'lucide-react';

const pageData = {
  en: {
    meta: {
      title: "Cloud & Database Support for SaaS Startups | DBCloud",
      description: "Affordable cloud and database support for growing SaaS companies. Scale your infrastructure without hiring a full DevOps team.",
    },
    hero: {
      title: "How SaaS Startups Scale Infrastructure Without Hiring DevOps Full-Time",
      subtitle: "Your product is growing. Your database needs attention. Get senior engineering support without the full-time salary.",
    },
    painPoints: {
      title: "Common SaaS Infrastructure Challenges",
      items: [
        "Database performance degrades as users grow",
        "Cloud costs increase faster than revenue",
        "No dedicated DevOps or DBA on the team",
        "Firefighting instead of building features",
      ],
    },
    solution: {
      title: "How DBCloud Supports SaaS Companies",
      items: [
        "Database optimization to handle growth",
        "Cloud cost analysis and reduction strategies",
        "Infrastructure reviews to prevent bottlenecks",
        "Hands-on execution for configuration and tuning",
      ],
    },
    included: {
      title: "What's Included",
      items: [
        "PostgreSQL, MySQL, MongoDB expertise",
        "AWS, Azure, GCP infrastructure support",
        "Performance monitoring setup",
        "Priority email support",
      ],
    },
    notIncluded: {
      title: "What's NOT Included",
      items: [
        "24/7 on-call (available via Enterprise)",
        "Unlimited incident response",
        "Multi-region architecture (Enterprise)",
      ],
    },
    trust: {
      title: "Why SaaS Teams Choose Us",
      items: [
        "Senior engineers, not junior support staff",
        "Fixed monthly cost — budget predictability",
        "Start in 48 hours — no long hiring process",
        "Month-to-month — cancel anytime",
      ],
    },
    cta: "Talk to a Specialist",
  },
  es: {
    meta: {
      title: "Soporte Cloud y Bases de Datos para SaaS | DBCloud",
      description: "Soporte cloud y bases de datos accesible para empresas SaaS en crecimiento. Escala tu infraestructura sin contratar un equipo DevOps completo.",
    },
    hero: {
      title: "Cómo las Startups SaaS Escalan Infraestructura Sin Contratar DevOps de Tiempo Completo",
      subtitle: "Tu producto está creciendo. Tu base de datos necesita atención. Obtén soporte de ingenieros senior sin el salario de tiempo completo.",
    },
    painPoints: {
      title: "Desafíos Comunes de Infraestructura SaaS",
      items: [
        "El rendimiento de la base de datos se degrada con el crecimiento de usuarios",
        "Los costos de cloud aumentan más rápido que los ingresos",
        "Sin DevOps o DBA dedicado en el equipo",
        "Apagando incendios en lugar de construir funcionalidades",
      ],
    },
    solution: {
      title: "Cómo DBCloud Apoya a Empresas SaaS",
      items: [
        "Optimización de base de datos para manejar el crecimiento",
        "Análisis de costos de cloud y estrategias de reducción",
        "Revisiones de infraestructura para prevenir cuellos de botella",
        "Ejecución práctica para configuración y ajuste",
      ],
    },
    included: {
      title: "Qué Está Incluido",
      items: [
        "Experiencia en PostgreSQL, MySQL, MongoDB",
        "Soporte de infraestructura AWS, Azure, GCP",
        "Configuración de monitoreo de rendimiento",
        "Soporte prioritario por email",
      ],
    },
    notIncluded: {
      title: "Qué NO Está Incluido",
      items: [
        "Guardia 24/7 (disponible vía Enterprise)",
        "Respuesta ilimitada a incidentes",
        "Arquitectura multi-región (Enterprise)",
      ],
    },
    trust: {
      title: "Por Qué los Equipos SaaS Nos Eligen",
      items: [
        "Ingenieros senior, no staff de soporte junior",
        "Costo mensual fijo — predictibilidad de presupuesto",
        "Inicia en 48 horas — sin largo proceso de contratación",
        "Mes a mes — cancela cuando quieras",
      ],
    },
    cta: "Hablar con un Especialista",
  },
};

export default function IndustrySaaSPage() {
  const { lang } = useLang();
  const data = pageData[lang];

  useEffect(() => {
    document.title = data.meta.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', data.meta.description);
  }, [data.meta]);

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
            <div className="inline-flex items-center gap-2 mb-4">
              <Code className="h-6 w-6" />
              <span className="text-sm font-medium uppercase tracking-wide text-white/80">SaaS</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              {data.hero.title}
            </h1>
            <p className="text-lg text-white/80 mb-8">
              {data.hero.subtitle}
            </p>
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg"
              asChild
            >
              <a href={siteConfig.SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
                {data.cta}
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl font-bold mb-6 text-center">
              {data.painPoints.title}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {data.painPoints.items.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-destructive/5 border border-destructive/10">
                  <Zap className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl font-bold mb-6 text-center">
              {data.solution.title}
            </h2>
            <div className="space-y-3">
              {data.solution.items.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-card border">
                  <Database className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Included / Not Included */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-accent" />
                {data.included.title}
              </h3>
              <ul className="space-y-2">
                {data.included.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-accent">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
                <XCircle className="h-5 w-5 text-muted-foreground" />
                {data.notIncluded.title}
              </h3>
              <ul className="space-y-2">
                {data.notIncluded.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span>×</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-2xl font-bold mb-6">
              {data.trust.title}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {data.trust.items.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-lg bg-card border">
                  <Shield className="h-5 w-5 text-primary flex-shrink-0" />
                  <p className="text-sm text-left">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg"
            asChild
          >
            <a href={siteConfig.SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
              {data.cta}
            </a>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
