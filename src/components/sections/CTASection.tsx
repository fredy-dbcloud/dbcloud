import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLang } from '@/hooks/useLang';
import { siteConfig } from '@/config/site';

export function CTASection() {
  const { lang, getLocalizedPath } = useLang();

  return (
    <section className="py-28 bg-hero-gradient relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center text-white"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3">
            {lang === 'es'
              ? '¿Listo para simplificar tu cloud?'
              : 'Ready to simplify your cloud?'}
          </h2>

          <p className="text-lg text-white/80 mb-10">
            {lang === 'es'
              ? 'Habla directamente con un ingeniero senior.'
              : 'Talk directly with a senior engineer.'}
          </p>

          <div className="flex flex-col items-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground px-10 py-6 text-base shadow-lg hover:shadow-xl hover:bg-accent/90 active:scale-[0.98] transition-all"
            >
              <a href={siteConfig.SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
                {lang === 'es'
                  ? 'Agenda tu revisión gratuita'
                  : 'Schedule your free review'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>

            <Link
              to={getLocalizedPath('/contact')}
              className="text-sm text-white/60 hover:text-accent transition-colors underline-offset-4 hover:underline"
            >
              {lang === 'es' ? 'Contáctanos' : 'Contact us'}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
