import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLang } from '@/hooks/useLang';
import { siteConfig } from '@/config/site';

export function CTASection() {
  const { lang, t, getLocalizedPath } = useLang();
  
  const whatsappUrl = siteConfig.WHATSAPP[lang]?.url || siteConfig.WHATSAPP.en.url;

  return (
    <section className="py-24 bg-hero-gradient relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center text-white"
        >
          <div className="inline-flex p-2 rounded-full bg-white/10 backdrop-blur-sm mb-6">
            <Sparkles className="h-5 w-5 text-accent" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            {t.hero.title}
          </h2>

          <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground px-10 shadow-lg hover:shadow-xl hover:bg-accent/90 active:scale-[0.98] transition-all"
            >
              <a href={siteConfig.SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
                {t.cta.schedule}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-white/40 text-white hover:bg-white/15 hover:border-white/60 px-10"
            >
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                {t.cta.whatsapp}
              </a>
            </Button>
          </div>

          {/* Academy Link */}
          <div className="pt-8 border-t border-white/10">
            <p className="text-white/70 mb-2">{t.footer.academy.title}</p>
            <a
              href={siteConfig.ACADEMY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent hover:underline font-medium"
            >
              {t.footer.academy.link}
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
