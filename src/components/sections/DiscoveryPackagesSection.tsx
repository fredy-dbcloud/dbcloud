import { motion } from 'framer-motion';
import { ArrowRight, Clock, Shield, Cloud, Globe, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLang } from '@/hooks/useLang';
import { siteConfig } from '@/config/site';
import dbcloudIcon from '@/assets/logos/dbcloud-icon.png';

const packages = [
  {
    image: '/images/pkg-security.png',
    icon: Shield,
    name: { en: 'Security Health Check', es: 'Revisión de Seguridad' },
    price: '$800+',
    timeline: { en: '2 wks', es: '2 sem' },
    pitch: { en: 'Find vulnerabilities before attackers do.', es: 'Encuentra vulnerabilidades antes que los atacantes.' },
    result: { en: '↓ Critical risks in 30 days', es: '↓ Riesgos críticos en 30 días' },
  },
  {
    image: '/images/pkg-cloud-cost.png',
    icon: Cloud,
    name: { en: 'Cloud Cost Audit', es: 'Auditoría Cloud' },
    price: '$1,000+',
    timeline: { en: '2 wks', es: '2 sem' },
    pitch: { en: 'Stop overpaying 20–40% on cloud.', es: 'Deja de pagar 20–40% de más en cloud.' },
    result: { en: 'ROI in Month 1', es: 'ROI en el mes 1' },
  },
  {
    image: '/images/pkg-digital.png',
    icon: Globe,
    name: { en: 'Digital Presence Audit', es: 'Auditoría Digital' },
    price: { en: 'FREE', es: 'GRATIS' },
    timeline: { en: '48 hrs', es: '48 hrs' },
    pitch: { en: 'Your website is losing customers — see why.', es: 'Tu sitio pierde clientes — descubre por qué.' },
    result: { en: 'A–F scorecard in 48h', es: 'Scorecard A–F en 48h' },
    highlight: true,
  },
  {
    image: '/images/pkg-chatbot.png',
    icon: Bot,
    name: { en: 'AI Chatbot Starter', es: 'Chatbot IA Starter' },
    price: '$1,500+',
    priceSub: { en: '+ $199/mo', es: '+ $199/mes' },
    timeline: { en: '2 wks', es: '2 sem' },
    pitch: { en: 'Answer customers 24/7 — no new hires.', es: 'Responde clientes 24/7 — sin contratar.' },
    result: { en: '3.5x ROI per $1', es: '3.5x ROI por $1' },
  },
];

export function DiscoveryPackagesSection() {
  const { lang } = useLang();

  return (
    <section className="py-20 bg-muted/20">
      <div className="container max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-1">
            {lang === 'es' ? 'Resultados Desde la Semana 1' : 'Results From Week 1'}
          </h2>
          <p className="text-sm text-muted-foreground/60">
            {lang === 'es' ? 'Precio fijo · Sin compromiso · Entregables claros' : 'Fixed price · No commitment · Clear deliverables'}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {packages.map((pkg, i) => {
            const Icon = pkg.icon;
            return (
              <motion.div
                key={pkg.name.en}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className={`group relative rounded-xl border bg-card p-4 shadow-sm hover:shadow-md hover:border-accent/40 transition-all duration-300 flex flex-col ${
                  pkg.highlight ? 'ring-1 ring-accent/30' : 'border-border'
                }`}
              >
                {/* Image */}
                <div className="relative h-20 rounded-lg bg-primary/5 flex items-center justify-center mb-3 overflow-hidden">
                  <img src={pkg.image} alt={pkg.name[lang]} className="h-14 w-14 object-contain" loading="lazy" />
                  <img src={dbcloudIcon} alt="" className="absolute top-1.5 right-1.5 h-4 w-4 opacity-60" />
                </div>

                {/* Name */}
                <h3 className="font-display text-sm font-bold text-foreground leading-tight mb-1">
                  {pkg.name[lang]}
                </h3>

                {/* Pitch */}
                <p className="text-xs text-muted-foreground leading-snug mb-3 flex-1">
                  {pkg.pitch[lang]}
                </p>

                {/* Price + Timeline */}
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-foreground text-base">
                    {typeof pkg.price === 'string' ? pkg.price : pkg.price[lang]}
                  </span>
                  <span className="text-muted-foreground/60 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {pkg.timeline[lang]}
                  </span>
                </div>
                {pkg.priceSub && (
                  <p className="text-[0.65rem] text-muted-foreground/50 -mt-1 mb-2">{pkg.priceSub[lang]}</p>
                )}

                {/* Result */}
                <div className="text-xs font-semibold text-accent bg-accent/5 rounded-md px-2.5 py-1.5 text-center">
                  {pkg.result[lang]}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Single CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <Button asChild size="default" className="shadow-cta px-8">
            <a href={siteConfig.SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
              {lang === 'es' ? 'Agenda tu llamada gratuita' : 'Get Your Free Intro Call'}
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </a>
          </Button>
          <p className="text-[0.65rem] text-muted-foreground/40 mt-2">
            {lang === 'es' ? '20 min · Sin compromiso' : '20 min · No obligation'}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
