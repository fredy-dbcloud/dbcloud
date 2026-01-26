import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight, Calendar, Clock, CheckCircle, Phone, Mail, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useLang } from '@/hooks/useLang';
import { faqData } from '@/config/faq';
import { siteConfig } from '@/config/site';

export default function FAQPage() {
  const { lang, t, getLocalizedPath } = useLang();
  const faqs = faqData[lang];

  const scheduleBenefits = lang === 'es' ? [
    'Evaluación gratuita de 30 minutos con un experto',
    'Análisis personalizado de tu infraestructura actual',
    'Recomendaciones específicas para tu industria',
    'Propuesta de valor sin compromiso',
    'Acceso a casos de éxito relevantes',
  ] : [
    'Free 30-minute assessment with an expert',
    'Personalized analysis of your current infrastructure',
    'Industry-specific recommendations',
    'No-obligation value proposal',
    'Access to relevant case studies',
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
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-6">
              {t.faq.title}
            </h1>
            <p className="text-lg text-white/80">
              {t.faq.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-background">
        <div className="container max-w-4xl">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="border border-border rounded-xl px-6 bg-card shadow-sm data-[state=open]:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="text-left font-medium hover:no-underline py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">
                    <p className="mb-4">{faq.answer}</p>
                    <Link
                      to={faq.link}
                      className="inline-flex items-center text-sm font-medium text-accent hover:underline"
                    >
                      {t.cta.learnMore}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Enterprise Scheduling Section - Like major IT consultancies */}
      <section className="py-24 bg-muted/30 border-t border-border">
        <div className="container max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Value Proposition */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                <Calendar className="h-4 w-4" />
                {lang === 'es' ? 'Consulta Gratuita' : 'Free Consultation'}
              </div>
              
              <h2 className="font-display text-3xl sm:text-4xl font-bold">
                {lang === 'es' 
                  ? '¿Listo para transformar tu infraestructura?' 
                  : 'Ready to transform your infrastructure?'}
              </h2>
              
              <p className="text-lg text-muted-foreground">
                {lang === 'es'
                  ? 'Agenda una llamada con nuestros especialistas certificados. Sin compromiso, sin presión de venta.'
                  : 'Schedule a call with our certified specialists. No commitment, no sales pressure.'}
              </p>

              <ul className="space-y-3">
                {scheduleBenefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="flex items-center gap-4 pt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>30 min</span>
                </div>
                <div className="h-4 w-px bg-border" />
                <span>{lang === 'es' ? 'Video llamada' : 'Video call'}</span>
                <div className="h-4 w-px bg-border" />
                <span>{lang === 'es' ? 'Inglés / Español' : 'English / Spanish'}</span>
              </div>
            </motion.div>

            {/* Right: Booking Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="rounded-2xl bg-card border border-border shadow-card p-8 space-y-6">
                <div className="text-center space-y-2">
                  <h3 className="font-display text-xl font-bold">
                    {lang === 'es' ? 'Reserva tu llamada' : 'Book your call'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {lang === 'es'
                      ? 'Selecciona el horario que mejor te convenga'
                      : 'Select the time that works best for you'}
                  </p>
                </div>

                {/* Primary CTA - Opens Microsoft Bookings */}
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-base py-6"
                >
                  <a
                    href={siteConfig.SCHEDULE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    {lang === 'es' ? 'Ver disponibilidad' : 'View availability'}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      {lang === 'es' ? 'o contáctanos directamente' : 'or contact us directly'}
                    </span>
                  </div>
                </div>

                {/* Alternative Contact Methods */}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full"
                  >
                    <a href={`tel:${siteConfig.phoneRaw}`}>
                      <Phone className="mr-2 h-4 w-4" />
                      {lang === 'es' ? 'Llamar' : 'Call'}
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full"
                  >
                    <a href={`mailto:${siteConfig.email}`}>
                      <Mail className="mr-2 h-4 w-4" />
                      Email
                    </a>
                  </Button>
                </div>

                {/* Trust badges */}
                <div className="pt-4 border-t border-border">
                  <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3 text-accent" />
                      SOC 2
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3 text-accent" />
                      HIPAA
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3 text-accent" />
                      GDPR
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3 text-accent" />
                      {lang === 'es' ? 'Respuesta 24h' : '24h Response'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Contact CTA */}
      <section className="py-16 bg-background">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center p-8 rounded-2xl bg-muted/50"
          >
            <h3 className="font-display text-xl font-bold mb-2">
              {lang === 'es' ? '¿No encontraste tu respuesta?' : "Didn't find your answer?"}
            </h3>
            <p className="text-muted-foreground mb-6">
              {lang === 'es' 
                ? 'Nuestro equipo está listo para ayudarte con cualquier pregunta.'
                : 'Our team is ready to help you with any questions.'}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to={getLocalizedPath('/contact')}>
                  {t.cta.contact}
                </Link>
              </Button>
              <Button asChild variant="outline">
                <a 
                  href={siteConfig.WHATSAPP[lang]?.url || siteConfig.WHATSAPP.en.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {t.cta.whatsapp}
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
