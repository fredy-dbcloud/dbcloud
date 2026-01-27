import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, ArrowRight, Calendar, X, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLang } from '@/hooks/useLang';
import { siteConfig } from '@/config/site';

export default function CheckoutSuccessPage() {
  const { getLocalizedPath, lang } = useLang();
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
        'Begin your cloud consulting engagement',
      ],
      cta: 'Return to Homepage',
      scheduleCall: 'Schedule Your Kickoff Call',
      contactUs: 'Contact Support',
      // Expectation setting
      includesTitle: 'What this plan includes',
      includes: [
        'Expert consulting within your monthly hours',
        'Email support during business hours',
        'Monthly action plans and recommendations',
        'Scheduled architecture reviews',
      ],
      excludesTitle: 'What this plan does NOT include',
      excludes: [
        'No 24/7 support',
        'No SLAs or guaranteed uptime',
        'No incident response or on-call coverage',
        'No guaranteed recovery times',
        'Work limited to monthly included hours',
      ],
      acknowledgment: 'By continuing, you acknowledge and accept these limitations.',
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
        'Comienza tu compromiso de consultoría cloud',
      ],
      cta: 'Volver al Inicio',
      scheduleCall: 'Agenda tu Llamada de Inicio',
      contactUs: 'Contactar Soporte',
      // Expectation setting
      includesTitle: 'Qué incluye este plan',
      includes: [
        'Consultoría experta dentro de tus horas mensuales',
        'Soporte por email en horario laboral',
        'Planes de acción mensuales y recomendaciones',
        'Revisiones de arquitectura programadas',
      ],
      excludesTitle: 'Qué NO incluye este plan',
      excludes: [
        'Sin soporte 24/7',
        'Sin SLAs o tiempo de actividad garantizado',
        'Sin respuesta a incidentes o cobertura de guardia',
        'Sin tiempos de recuperación garantizados',
        'Trabajo limitado a las horas mensuales incluidas',
      ],
      acknowledgment: 'Al continuar, reconoces y aceptas estas limitaciones.',
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
            className="max-w-3xl mx-auto"
          >
            {/* Success Header */}
            <div className="text-center mb-8">
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
              <p className="text-muted-foreground">{c.description}</p>
            </div>

            {/* Expectations Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid md:grid-cols-2 gap-4 mb-8"
            >
              {/* What's Included */}
              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-xl p-5">
                <h3 className="font-semibold text-green-800 dark:text-green-300 mb-3 flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  {c.includesTitle}
                </h3>
                <ul className="space-y-2">
                  {c.includes.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-green-700 dark:text-green-400">
                      <Check className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What's NOT Included */}
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl p-5">
                <h3 className="font-semibold text-amber-800 dark:text-amber-300 mb-3 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  {c.excludesTitle}
                </h3>
                <ul className="space-y-2">
                  {c.excludes.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-amber-700 dark:text-amber-400">
                      <X className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Acknowledgment */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-muted/50 border rounded-lg p-4 mb-8 text-center"
            >
              <p className="text-sm text-muted-foreground italic">
                {c.acknowledgment}
              </p>
            </motion.div>

            {/* Next Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-card border rounded-xl p-6 mb-8"
            >
              <h3 className="font-semibold mb-4">{c.nextSteps}</h3>
              <ul className="space-y-3">
                {c.steps.map((step, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <span className="w-6 h-6 rounded-full bg-accent/20 text-accent text-sm font-medium flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-sm">{step}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

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
            <p className="mt-8 text-sm text-muted-foreground text-center">
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
