import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useLang } from '@/hooks/useLang';
import { faqData } from '@/config/faq';

export default function FAQPage() {
  const { lang, t, getLocalizedPath } = useLang();
  const faqs = faqData[lang];

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

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center p-8 rounded-2xl bg-muted/50"
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
                <Link to={getLocalizedPath('/schedule')}>
                  {t.cta.schedule}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
