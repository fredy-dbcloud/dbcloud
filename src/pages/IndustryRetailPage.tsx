import { useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLang } from '@/hooks/useLang';
import { siteConfig } from '@/config/site';
import { ShoppingCart, Clock, Shield, CheckCircle, XCircle } from 'lucide-react';

const pageData = {
  en: {
    meta: {
      title: "Cloud & Database Support for Retail SMBs | DBCloud",
      description: "Affordable cloud and database support designed for retail businesses. Keep your systems running without hiring full IT teams.",
    },
    hero: {
      title: "How Retail SMBs Reduce Downtime Without Hiring Full IT Teams",
      subtitle: "Your POS, inventory, and e-commerce systems need to work. We help you keep them running — affordably.",
    },
    painPoints: {
      title: "Common Retail IT Challenges",
      items: [
        "POS system slowdowns during peak hours",
        "Inventory database sync issues",
        "E-commerce site performance problems",
        "No IT staff available nights or weekends",
      ],
    },
    solution: {
      title: "How DBCloud Supports Retail Businesses",
      items: [
        "Proactive database monitoring before issues impact sales",
        "Optimization to keep your systems fast during peak times",
        "Cost analysis to reduce your cloud spend",
        "Monthly reviews to prevent future problems",
      ],
    },
    included: {
      title: "What's Included",
      items: [
        "Monthly database health checks",
        "Performance optimization recommendations",
        "Cost reduction analysis",
        "Email support during business hours",
      ],
    },
    notIncluded: {
      title: "What's NOT Included",
      items: [
        "24/7 emergency response (available via add-ons)",
        "On-site support",
        "Hardware procurement",
      ],
    },
    trust: {
      title: "Why Retail SMBs Choose Us",
      items: [
        "Fixed monthly pricing — no surprise bills",
        "Start in 48 hours, not months",
        "US-based team, business hours support",
        "No long-term contracts required",
      ],
    },
    cta: "Talk to a Specialist",
  },
  es: {
    meta: {
      title: "Soporte Cloud y Bases de Datos para Retail | DBCloud",
      description: "Soporte cloud y bases de datos accesible diseñado para negocios de retail. Mantén tus sistemas funcionando sin contratar equipos de TI completos.",
    },
    hero: {
      title: "Cómo las PyMEs de Retail Reducen el Tiempo de Inactividad Sin Equipos de TI Completos",
      subtitle: "Tu punto de venta, inventario y sistemas de e-commerce necesitan funcionar. Te ayudamos a mantenerlos operando — de forma accesible.",
    },
    painPoints: {
      title: "Desafíos Comunes de TI en Retail",
      items: [
        "Lentitud del sistema de punto de venta en horas pico",
        "Problemas de sincronización de inventario",
        "Problemas de rendimiento del sitio de e-commerce",
        "Sin personal de TI disponible noches o fines de semana",
      ],
    },
    solution: {
      title: "Cómo DBCloud Apoya a Negocios de Retail",
      items: [
        "Monitoreo proactivo de bases de datos antes de que los problemas impacten ventas",
        "Optimización para mantener tus sistemas rápidos en horas pico",
        "Análisis de costos para reducir tu gasto en cloud",
        "Revisiones mensuales para prevenir problemas futuros",
      ],
    },
    included: {
      title: "Qué Está Incluido",
      items: [
        "Revisiones mensuales de salud de base de datos",
        "Recomendaciones de optimización de rendimiento",
        "Análisis de reducción de costos",
        "Soporte por email en horario laboral",
      ],
    },
    notIncluded: {
      title: "Qué NO Está Incluido",
      items: [
        "Respuesta de emergencia 24/7 (disponible vía add-ons)",
        "Soporte en sitio",
        "Adquisición de hardware",
      ],
    },
    trust: {
      title: "Por Qué las PyMEs de Retail Nos Eligen",
      items: [
        "Precio mensual fijo — sin facturas sorpresa",
        "Inicia en 48 horas, no meses",
        "Equipo en EE.UU., soporte en horario laboral",
        "Sin contratos a largo plazo requeridos",
      ],
    },
    cta: "Hablar con un Especialista",
  },
};

export default function IndustryRetailPage() {
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
              <ShoppingCart className="h-6 w-6 text-white" />
              <span className="text-sm font-medium uppercase tracking-wide text-white/90">Retail</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              {data.hero.title}
            </h1>
            <p className="text-lg text-white/85 mb-8">
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
                  <Clock className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
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
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
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
