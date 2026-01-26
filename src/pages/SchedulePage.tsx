import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Calendar, Clock, CheckCircle, ExternalLink } from 'lucide-react';
import { useLang } from '@/hooks/useLang';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/button';

export default function SchedulePage() {
  const { lang } = useLang();

  const benefits = lang === 'es' ? [
    'Evaluación gratuita de tu infraestructura actual',
    'Recomendaciones personalizadas de nuestros expertos',
    'Demostración de nuestras capacidades',
    'Propuesta de valor sin compromiso',
  ] : [
    'Free assessment of your current infrastructure',
    'Personalized recommendations from our experts',
    'Demonstration of our capabilities',
    'No-obligation value proposal',
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
            <div className="inline-flex p-2 rounded-full bg-white/10 backdrop-blur-sm mb-6">
              <Calendar className="h-5 w-5 text-accent" />
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-6">
              {lang === 'es' ? 'Agenda una Llamada' : 'Schedule a Call'}
            </h1>
            <p className="text-lg text-white/80">
              {lang === 'es' 
                ? 'Habla con nuestros expertos en cloud y bases de datos. Sin compromiso.'
                : 'Talk to our cloud and database experts. No obligation.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Scheduling Section */}
      <section className="py-24 bg-background">
        <div className="container max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-display text-2xl font-bold mb-4">
                  {lang === 'es' ? '¿Qué incluye la llamada?' : 'What does the call include?'}
                </h2>
                <p className="text-muted-foreground">
                  {lang === 'es'
                    ? 'Una sesión de 30 minutos con uno de nuestros especialistas para entender tus necesidades y cómo podemos ayudarte.'
                    : 'A 30-minute session with one of our specialists to understand your needs and how we can help.'}
                </p>
              </div>

              <ul className="space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-3 text-muted-foreground">
                <Clock className="h-5 w-5" />
                <span>{lang === 'es' ? '30 minutos • Llamada en video' : '30 minutes • Video call'}</span>
              </div>
            </motion.div>

            {/* Booking CTA (Bookings blocks iframe embeds in many browsers) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-2xl bg-card border border-border shadow-card p-8">
                <h2 className="font-display text-2xl font-bold mb-3">
                  {lang === 'es' ? 'Reserva en línea' : 'Book online'}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {lang === 'es'
                    ? 'Por seguridad del navegador, el calendario de Bookings se abre en una nueva pestaña.'
                    : 'For browser security, the Bookings calendar opens in a new tab.'}
                </p>

                <Button
                  asChild
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground w-full"
                >
                  <a
                    href={siteConfig.SCHEDULE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={lang === 'es' ? 'Abrir calendario de Bookings' : 'Open Bookings calendar'}
                  >
                    {lang === 'es' ? 'Abrir calendario' : 'Open calendar'}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>

                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    {lang === 'es' ? '¿Prefieres contactarnos? ' : 'Prefer to contact us? '}
                    <a href={`mailto:${siteConfig.email}`} className="text-accent hover:underline">
                      {siteConfig.email}
                    </a>
                    {' | '}
                    <a href={`tel:${siteConfig.phoneRaw}`} className="text-accent hover:underline">
                      {siteConfig.phone}
                    </a>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
