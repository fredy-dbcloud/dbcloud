import { motion } from 'framer-motion';
import { ArrowRight, Cloud, Database, Brain, Shield, Clock, Users, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLang } from '@/hooks/useLang';
import { siteConfig } from '@/config/site';

export function HeroSection() {
  const { t, getLocalizedPath, lang } = useLang();

  // Capability-based trust signals (no fake metrics)
  const capabilities = [
    { 
      icon: Shield, 
      label: lang === 'es' ? 'Seguridad Empresarial' : 'Enterprise Security' 
    },
    { 
      icon: Brain, 
      label: lang === 'es' ? 'Operaciones con IA' : 'AI-Powered Operations' 
    },
    { 
      icon: Clock, 
      label: lang === 'es' ? 'Flujos SLA' : 'SLA-Based Workflows' 
    },
    { 
      icon: Database, 
      label: lang === 'es' ? 'Multi-Cloud' : 'Multi-Cloud Ready' 
    },
  ];

  // Enterprise hero features (like MongoDB, Snowflake)
  const heroFeatures = lang === 'es' ? [
    'Empresa registrada en EE.UU.',
    'Operaciones remotas en todo el país',
    'Expertos certificados AWS, Azure, GCP',
  ] : [
    'US-Registered Company',
    'Remote-first operations nationwide',
    'AWS, Azure, GCP certified experts',
  ];

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 animate-float opacity-20">
        <Cloud className="h-24 w-24 text-white" />
      </div>
      <div className="absolute bottom-1/4 right-10 animate-float opacity-20" style={{ animationDelay: '2s' }}>
        <Database className="h-20 w-20 text-white" />
      </div>
      <div className="absolute top-1/3 right-1/4 animate-float opacity-20" style={{ animationDelay: '4s' }}>
        <Brain className="h-16 w-16 text-white" />
      </div>

      <div className="container relative z-10 py-20">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium mb-6 border border-white/20">
              🚀 {lang === 'es' ? 'Soluciones Cloud & IA Empresariales' : 'Enterprise Cloud & AI Solutions'}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          >
            {t.hero.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl mx-auto"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* Hero feature bullets (enterprise pattern) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-10"
          >
            {heroFeatures.map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-sm text-white/90">
                <CheckCircle className="h-4 w-4 text-accent" />
                {feature}
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-base px-8 shadow-glow"
            >
              <a href={siteConfig.SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
                {t.hero.cta}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 text-base px-8"
            >
              <a href={`tel:${siteConfig.phoneRaw}`}>
                {siteConfig.phone}
              </a>
            </Button>
          </motion.div>
        </div>

        {/* Capability badges (no fake metrics) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {capabilities.map((cap) => (
            <div
              key={cap.label}
              className="flex items-center justify-center gap-3 p-5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <cap.icon className="h-6 w-6 text-accent" />
              <span className="text-sm font-medium text-white">{cap.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
