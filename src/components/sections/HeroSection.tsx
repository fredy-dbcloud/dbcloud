import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLang } from '@/hooks/useLang';
import { siteConfig } from '@/config/site';
import logoHorizontalLight from '@/assets/logos/logo-dbcloud-horizontal-light.png';

export function HeroSection() {
  const { t, lang } = useLang();

  // SMB trust signals - practical, not enterprise-heavy
  const trustSignals = lang === 'es' 
    ? ['Empresa registrada en EE.UU.', 'Certificados AWS, Azure, GCP, Oracle', 'Sin contratos largos']
    : ['US-registered company', 'AWS, Azure, GCP, Oracle certified', 'No long-term contracts'];

  // Benefit bullets from translations (SMB practical outcomes)
  const benefitBullets = t.hero.benefits || (lang === 'es' 
    ? ['Inicia en 48 horas, no meses', 'Cuesta menos que un junior', 'No requiere departamento de TI']
    : ['Start in 48 hours, not months', 'Costs less than one junior hire', 'No IT department required']);

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

      <div className="container relative z-10 py-16 lg:py-20">
        <div className="max-w-3xl mx-auto text-center text-white">
          {/* Subtle Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <img 
              src={logoHorizontalLight} 
              alt={`${siteConfig.name} - Faster Higher Stronger`}
              className="h-12 w-auto mx-auto opacity-90"
            />
          </motion.div>
          
          {/* Trust badge - simple, not hype */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium mb-6 border border-white/20">
              {lang === 'es' ? '🇺🇸 Soporte Cloud para PyMEs' : '🇺🇸 Cloud Support for SMBs'}
            </span>
          </motion.div>

          {/* Headline - Outcome-focused, answers "What problem do you solve?" */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4"
          >
            {t.hero.title}
          </motion.h1>

          {/* Subheadline - Who is this for + scope */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-base sm:text-lg text-white/85 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* 3 Benefit Bullets - Practical, concrete */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-10"
          >
            {benefitBullets.map((benefit: string) => (
              <div key={benefit} className="flex items-center gap-2 text-sm text-white/90">
                <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </motion.div>

          {/* ONE Primary CTA - High-intent action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-col items-center gap-4"
          >
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground text-base px-10 py-6 shadow-lg hover:shadow-xl hover:bg-accent/90 active:scale-[0.98] transition-all"
            >
              <a href={siteConfig.SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
                {t.hero.cta}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            
            {/* Subtle trust reinforcement */}
            <span className="text-white/60 text-xs mt-2">
              {lang === 'es' ? '30 min gratis · Sin compromiso' : '30 min free · No commitment'}
            </span>
          </motion.div>
        </div>

        {/* Trust Signals - Below fold, minimal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-white/65 text-xs"
        >
          {trustSignals.map((signal) => (
            <div key={signal} className="flex items-center gap-1.5">
              <CheckCircle className="h-3.5 w-3.5 text-accent/70" />
              <span>{signal}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
