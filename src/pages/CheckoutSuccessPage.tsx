import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, ArrowRight, Mail, Calendar, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLang } from '@/hooks/useLang';
import { siteConfig } from '@/config/site';

export default function CheckoutSuccessPage() {
  const { t, getLocalizedPath, lang } = useLang();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const content = {
    en: {
      title: 'Welcome to DBCloud!',
      subtitle: 'Your subscription is now active',
      description: 'Thank you for choosing DBCloud. Our team will reach out within 24 hours to schedule your onboarding call.',
      nextSteps: 'What happens next:',
      steps: [
        'You\'ll receive a confirmation email shortly',
        'Our team will contact you within 24 hours',
        'We\'ll schedule your kickoff call',
        'Begin your cloud transformation journey',
      ],
      cta: 'Return to Homepage',
      scheduleCall: 'Schedule Your Kickoff Call',
      contactUs: 'Contact Support',
    },
    es: {
      title: '¡Bienvenido a DBCloud!',
      subtitle: 'Tu suscripción está ahora activa',
      description: 'Gracias por elegir DBCloud. Nuestro equipo te contactará dentro de 24 horas para agendar tu llamada de onboarding.',
      nextSteps: 'Qué sigue:',
      steps: [
        'Recibirás un correo de confirmación en breve',
        'Nuestro equipo te contactará en 24 horas',
        'Agendaremos tu llamada de inicio',
        'Comienza tu transformación en la nube',
      ],
      cta: 'Volver al Inicio',
      scheduleCall: 'Agenda tu Llamada de Inicio',
      contactUs: 'Contactar Soporte',
    },
  };

  const c = content[lang];

  return (
    <Layout>
      <section className="min-h-[80vh] flex items-center justify-center py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center"
            >
              <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
            </motion.div>

            <h1 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              {c.title}
            </h1>
            <p className="text-xl text-accent font-medium mb-2">{c.subtitle}</p>
            <p className="text-muted-foreground mb-8">{c.description}</p>

            {/* Next Steps */}
            <div className="bg-card border rounded-xl p-6 mb-8 text-left">
              <h3 className="font-semibold mb-4">{c.nextSteps}</h3>
              <ul className="space-y-3">
                {c.steps.map((step, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <span className="w-6 h-6 rounded-full bg-accent/20 text-accent text-sm font-medium flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-sm">{step}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <a href={siteConfig.SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
                  <Calendar className="mr-2 h-4 w-4" />
                  {c.scheduleCall}
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to={getLocalizedPath('/')}>
                  {c.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Support Contact */}
            <p className="mt-8 text-sm text-muted-foreground">
              {c.contactUs}:{' '}
              <a href={`mailto:${siteConfig.supportEmail}`} className="text-accent hover:underline">
                {siteConfig.supportEmail}
              </a>
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
