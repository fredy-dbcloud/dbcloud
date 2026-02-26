import { motion } from 'framer-motion';
import { ArrowRight, Clock, Shield, Cloud, Globe, Bot } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLang } from '@/hooks/useLang';
import { siteConfig } from '@/config/site';
import dbcloudIcon from '@/assets/logos/dbcloud-icon.png';

const packages = [
  {
    image: '/images/pkg-security.png',
    icon: Shield,
    name: { en: 'Security Health Check', es: 'Revisión de Seguridad' },
    hook: {
      en: 'Are you protected from today\'s cyber threats?',
      es: '¿Tu negocio está protegido contra las amenazas actuales?',
    },
    price: '$800 – $1,500',
    timeline: { en: '2 weeks', es: '2 semanas' },
    highlights: {
      en: ['Vulnerability scan & access review', 'HIPAA / NYDFS compliance gap analysis', 'Executive summary with prioritized fixes'],
      es: ['Escaneo de vulnerabilidades y acceso', 'Análisis de cumplimiento HIPAA / NYDFS', 'Resumen ejecutivo con correcciones priorizadas'],
    },
    result: {
      en: 'Reduce critical vulnerabilities in 30–60 days',
      es: 'Reduce vulnerabilidades críticas en 30–60 días',
    },
  },
  {
    image: '/images/pkg-cloud-cost.png',
    icon: Cloud,
    name: { en: 'Cloud Cost & Performance Audit', es: 'Auditoría de Costos Cloud' },
    hook: {
      en: 'Most companies overpay 20–40% on cloud.',
      es: 'La mayoría paga 20–40% de más en cloud.',
    },
    price: '$1,000 – $2,000',
    timeline: { en: '2 weeks', es: '2 semanas' },
    highlights: {
      en: ['Full resource inventory & cost breakdown', 'Idle/oversized resource identification', 'Concrete savings projection in dollars'],
      es: ['Inventario completo y desglose de costos', 'Identificación de recursos ociosos', 'Proyección concreta de ahorro en dólares'],
    },
    result: {
      en: 'Typically recovered in Month 1 savings',
      es: 'Generalmente se recupera en el mes 1',
    },
  },
  {
    image: '/images/pkg-digital.png',
    icon: Globe,
    name: { en: 'Digital Presence Audit', es: 'Auditoría de Presencia Digital' },
    hook: {
      en: '53% of visitors leave a slow website.',
      es: 'El 53% abandona sitios lentos.',
    },
    price: { en: 'FREE intro offer', es: 'GRATIS como oferta introductoria' },
    priceAlt: '$500 – $800',
    timeline: { en: '3–5 days', es: '3–5 días' },
    highlights: {
      en: ['Speed, mobile, SEO & security scores', 'Visual A–F scorecard (1 page)', 'Top 5 prioritized recommendations'],
      es: ['Velocidad, móvil, SEO y seguridad', 'Scorecard visual A–F (1 página)', 'Top 5 recomendaciones priorizadas'],
    },
    result: {
      en: 'Get your scorecard in 48 hours',
      es: 'Recibe tu scorecard en 48 horas',
    },
  },
  {
    image: '/images/pkg-chatbot.png',
    icon: Bot,
    name: { en: 'AI Chatbot Starter', es: 'Chatbot IA Starter' },
    hook: {
      en: 'Answer customers 24/7 — without hiring.',
      es: 'Responde clientes 24/7 — sin contratar.',
    },
    price: '$1,500 – $2,500',
    priceSub: { en: '+ $199–$399/mo', es: '+ $199–$399/mes' },
    timeline: { en: '2 weeks to launch', es: '2 semanas al aire' },
    highlights: {
      en: ['Custom AI trained on YOUR business', 'Website + WhatsApp integration', 'English & Spanish out of the box'],
      es: ['IA personalizada para TU negocio', 'Integración web + WhatsApp', 'Inglés y español incluidos'],
    },
    result: {
      en: '3.5x ROI on every $1 invested',
      es: '3.5x ROI por cada $1 invertido',
    },
  },
];

export function DiscoveryPackagesSection() {
  const { lang } = useLang();

  return (
    <section className="py-24 lg:py-32 bg-muted/20">
      <div className="container max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {lang === 'es' ? 'Paquetes Discovery' : 'Discovery Packages'}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
            {lang === 'es'
              ? 'Resultados Reales Desde la Primera Semana'
              : 'Real Results From Week One'}
          </h2>
          <p className="text-muted-foreground/60 text-sm max-w-xl mx-auto">
            {lang === 'es'
              ? 'Servicios de diagnóstico con entregables claros — sin compromiso a largo plazo.'
              : 'Diagnostic services with clear deliverables — no long-term commitment.'}
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.name.en}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="h-full border-border hover:border-accent/40 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                <CardContent className="p-0">
                  {/* Image + Logo Badge */}
                  <div className="relative h-36 bg-[hsl(var(--primary))] flex items-center justify-center overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={pkg.name[lang]}
                      className="h-24 w-24 object-contain opacity-90"
                      loading="lazy"
                    />
                    <div className="absolute top-3 right-3 bg-white/95 rounded-lg p-1.5 shadow-sm">
                      <img src={dbcloudIcon} alt="DBCloud" className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Name & Hook */}
                    <h3 className="font-display text-lg font-bold text-foreground mb-1">
                      {pkg.name[lang]}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {pkg.hook[lang]}
                    </p>

                    {/* Price + Timeline Row */}
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
                      <div>
                        <span className="text-xl font-bold text-foreground">
                          {typeof pkg.price === 'string' ? pkg.price : pkg.price[lang]}
                        </span>
                        {pkg.priceSub && (
                          <span className="text-xs text-muted-foreground ml-1.5">
                            {pkg.priceSub[lang]}
                          </span>
                        )}
                        {pkg.priceAlt && (
                          <span className="block text-xs text-muted-foreground/50 mt-0.5">
                            {lang === 'es' ? `Precio estándar: ${pkg.priceAlt}` : `Standard: ${pkg.priceAlt}`}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full">
                        <Clock className="h-3.5 w-3.5" />
                        {pkg.timeline[lang]}
                      </div>
                    </div>

                    {/* Highlights */}
                    <ul className="space-y-2 mb-4">
                      {pkg.highlights[lang].map((h) => (
                        <li key={h} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-accent mt-0.5">✓</span>
                          {h}
                        </li>
                      ))}
                    </ul>

                    {/* Result callout */}
                    <div className="bg-accent/5 rounded-lg px-4 py-2.5 text-sm font-medium text-accent">
                      {pkg.result[lang]}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            asChild
            size="lg"
            className="shadow-cta px-10 text-base"
          >
            <a href={siteConfig.SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
              {lang === 'es' ? 'Agenda tu llamada gratuita' : 'Schedule Your Free Intro Call'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
          <p className="text-xs text-muted-foreground/50 mt-3">
            {lang === 'es'
              ? '20 minutos · Sin compromiso · Precio fijo garantizado'
              : '20 minutes · No obligation · Fixed price guaranteed'}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
