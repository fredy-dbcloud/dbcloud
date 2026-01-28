import { useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLang } from '@/hooks/useLang';
import { siteConfig } from '@/config/site';
import { Heart, AlertTriangle, Shield, CheckCircle, XCircle } from 'lucide-react';

const pageData = {
  en: {
    meta: {
      title: "Cloud & Database Support for Healthcare SMBs | DBCloud",
      description: "Reliable cloud and database support for small healthcare practices. Keep patient data secure and systems running smoothly.",
    },
    hero: {
      title: "How Small Healthcare Practices Keep Systems Running Without Full IT Staff",
      subtitle: "Your patient management and scheduling systems are critical. We help you maintain them — without the overhead of a full IT department.",
    },
    painPoints: {
      title: "Common Healthcare IT Challenges",
      items: [
        "Patient management system slowdowns",
        "Appointment scheduling reliability issues",
        "Data backup and recovery concerns",
        "Limited IT budget for security best practices",
      ],
    },
    solution: {
      title: "How DBCloud Supports Healthcare Practices",
      items: [
        "Database monitoring to catch issues before they affect patients",
        "Performance optimization for faster system response",
        "Security best practices guidance for patient data",
        "Cost-effective cloud infrastructure recommendations",
      ],
    },
    included: {
      title: "What's Included",
      items: [
        "Monthly database health assessments",
        "Performance and cost optimization",
        "Security posture recommendations",
        "Business hours email support",
      ],
    },
    notIncluded: {
      title: "What's NOT Included",
      items: [
        "HIPAA compliance certification (Enterprise only)",
        "24/7 on-call support (available via add-ons)",
        "On-site visits",
      ],
    },
    trust: {
      title: "Why Healthcare SMBs Choose Us",
      items: [
        "Security-conscious approach to patient data",
        "Predictable monthly costs for budget planning",
        "No long-term contracts — month-to-month flexibility",
        "US-based team understands healthcare priorities",
      ],
    },
    cta: "Talk to a Specialist",
    note: "For practices requiring HIPAA compliance certification, our Enterprise plan offers dedicated compliance support.",
  },
  es: {
    meta: {
      title: "Soporte Cloud y Bases de Datos para Salud | DBCloud",
      description: "Soporte cloud y bases de datos confiable para consultorios de salud pequeños. Mantén los datos de pacientes seguros y los sistemas funcionando.",
    },
    hero: {
      title: "Cómo los Consultorios de Salud Pequeños Mantienen Sus Sistemas Sin Personal de TI Completo",
      subtitle: "Tus sistemas de gestión de pacientes y citas son críticos. Te ayudamos a mantenerlos — sin el costo de un departamento de TI completo.",
    },
    painPoints: {
      title: "Desafíos Comunes de TI en Salud",
      items: [
        "Lentitud del sistema de gestión de pacientes",
        "Problemas de confiabilidad en agendamiento de citas",
        "Preocupaciones sobre respaldo y recuperación de datos",
        "Presupuesto limitado de TI para mejores prácticas de seguridad",
      ],
    },
    solution: {
      title: "Cómo DBCloud Apoya a Consultorios de Salud",
      items: [
        "Monitoreo de bases de datos para detectar problemas antes de que afecten pacientes",
        "Optimización de rendimiento para respuestas más rápidas del sistema",
        "Guía de mejores prácticas de seguridad para datos de pacientes",
        "Recomendaciones de infraestructura cloud costo-efectivas",
      ],
    },
    included: {
      title: "Qué Está Incluido",
      items: [
        "Evaluaciones mensuales de salud de base de datos",
        "Optimización de rendimiento y costos",
        "Recomendaciones de postura de seguridad",
        "Soporte por email en horario laboral",
      ],
    },
    notIncluded: {
      title: "Qué NO Está Incluido",
      items: [
        "Certificación de cumplimiento HIPAA (solo Enterprise)",
        "Soporte de guardia 24/7 (disponible vía add-ons)",
        "Visitas en sitio",
      ],
    },
    trust: {
      title: "Por Qué los Consultorios de Salud Nos Eligen",
      items: [
        "Enfoque consciente de seguridad para datos de pacientes",
        "Costos mensuales predecibles para planificación de presupuesto",
        "Sin contratos a largo plazo — flexibilidad mes a mes",
        "Equipo en EE.UU. entiende las prioridades de salud",
      ],
    },
    cta: "Hablar con un Especialista",
    note: "Para consultorios que requieren certificación de cumplimiento HIPAA, nuestro plan Enterprise ofrece soporte de cumplimiento dedicado.",
  },
};

export default function IndustryHealthcarePage() {
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
              <Heart className="h-6 w-6 text-white" />
              <span className="text-sm font-medium uppercase tracking-wide text-white/90">Healthcare</span>
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
                  <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
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
          {/* HIPAA Note */}
          <p className="text-center text-sm text-muted-foreground mt-8 max-w-2xl mx-auto">
            {data.note}
          </p>
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
