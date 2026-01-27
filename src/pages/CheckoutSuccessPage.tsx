import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, ArrowRight, Calendar, X, Check, AlertCircle, FileText, Clock, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useLang } from '@/hooks/useLang';
import { siteConfig } from '@/config/site';

export default function CheckoutSuccessPage() {
  const { getLocalizedPath, lang } = useLang();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);

  // Get plan from URL params if available (passed from checkout)
  const planParam = searchParams.get('plan') as 'starter' | 'growth' | null;
  const plan = planParam || 'starter';

  const welcomeContent = {
    en: {
      modalTitle: 'Welcome to DBCloud',
      modalSubtitle: 'Your Client Portal access is ready.',
      goToPortal: 'Go to Portal',
      createAccount: 'Create Portal Account',
      orSchedule: 'Or schedule your kickoff call first',
    },
    es: {
      modalTitle: 'Bienvenido a DBCloud',
      modalSubtitle: 'Tu acceso al Portal de Clientes está listo.',
      goToPortal: 'Ir al Portal',
      createAccount: 'Crear Cuenta de Portal',
      orSchedule: 'O agenda primero tu llamada de inicio',
    },
  };

  const content = {
    en: {
      title: 'Welcome to DBCloud!',
      subtitle: 'Your subscription is now active',
      description: 'Thank you for choosing DBCloud. Our team will reach out within 24 hours to schedule your onboarding call.',
      nextSteps: 'What happens next:',
      steps: [
        'You\'ll receive a confirmation email shortly',
        'Our team will contact you within 24 hours',
        'We\'ll schedule your kickoff call and grant portal access',
        'Begin your cloud consulting engagement',
      ],
      cta: 'Return to Homepage',
      scheduleCall: 'Schedule Your Kickoff Call',
      viewOnboarding: 'View Onboarding Guide',
      viewDashboard: 'Go to Dashboard',
      contactUs: 'Contact Support',
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
      portalNoticeTitle: 'Important: How to Request Work',
      portalNotice: 'To ensure proper tracking and response times, all work requests are submitted through the Client Portal.',
      hoursNotice: 'Unused hours do not roll over to the next month.',
    },
    es: {
      title: '¡Bienvenido a DBCloud!',
      subtitle: 'Tu suscripción está ahora activa',
      description: 'Gracias por elegir DBCloud. Nuestro equipo te contactará dentro de 24 horas para agendar tu llamada de onboarding.',
      nextSteps: 'Qué sigue:',
      steps: [
        'Recibirás un correo de confirmación en breve',
        'Nuestro equipo te contactará en 24 horas',
        'Agendaremos tu llamada de inicio y te daremos acceso al portal',
        'Comienza tu compromiso de consultoría cloud',
      ],
      cta: 'Volver al Inicio',
      scheduleCall: 'Agenda tu Llamada de Inicio',
      viewOnboarding: 'Ver Guía de Onboarding',
      viewDashboard: 'Ir al Panel',
      contactUs: 'Contactar Soporte',
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
      portalNoticeTitle: 'Importante: Cómo Solicitar Trabajo',
      portalNotice: 'Para asegurar un seguimiento adecuado y tiempos de respuesta, todas las solicitudes se envían a través del Portal de Cliente.',
      hoursNotice: 'Las horas no utilizadas no se acumulan para el siguiente mes.',
    },
  };

  const c = content[lang];
  const w = welcomeContent[lang];

  return (
    <Layout>
      {/* Welcome Modal */}
      <Dialog open={showWelcomeModal} onOpenChange={setShowWelcomeModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center"
            >
              <Sparkles className="h-8 w-8 text-green-600 dark:text-green-400" />
            </motion.div>
            <DialogTitle className="text-2xl">{w.modalTitle}</DialogTitle>
            <DialogDescription className="text-base">
              {w.modalSubtitle}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <Button asChild className="w-full bg-accent hover:bg-accent/90" size="lg">
              <Link to={`${getLocalizedPath('/signup')}?plan=${plan}`}>
                <User className="mr-2 h-4 w-4" />
                {w.createAccount}
              </Link>
            </Button>
            <Button asChild variant="secondary" className="w-full" size="lg">
              <Link to={getLocalizedPath('/portal')}>
                <ArrowRight className="mr-2 h-4 w-4" />
                {w.goToPortal}
              </Link>
            </Button>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">{w.orSchedule}</p>
              <Button variant="outline" size="sm" asChild>
                <a href={siteConfig.SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
                  <Calendar className="mr-2 h-4 w-4" />
                  {c.scheduleCall}
                </a>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
              
              {/* Demo-to-Product Continuity Notice */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium"
              >
                <CheckCircle className="h-4 w-4" />
                {lang === 'es' 
                  ? 'Este es el mismo panel que viste en la demo, ahora con tus datos reales'
                  : 'This is the same dashboard you saw in the demo, now with your real data'}
              </motion.div>
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

            {/* Client Portal Notice */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="bg-primary/10 border border-primary/20 rounded-xl p-5 mb-6"
            >
              <h3 className="font-semibold text-primary mb-2 flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {c.portalNoticeTitle}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                {c.portalNotice}
              </p>
              <p className="text-xs text-muted-foreground flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {c.hoursNotice}
              </p>
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to={`${getLocalizedPath('/signup')}?plan=${plan}`}>
                  <User className="mr-2 h-4 w-4" />
                  {lang === 'es' ? 'Crear Cuenta de Portal' : 'Create Portal Account'}
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link to={getLocalizedPath('/portal')}>
                  <ArrowRight className="mr-2 h-4 w-4" />
                  {lang === 'es' ? 'Ir al Portal' : 'Go to Portal'}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={siteConfig.SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
                  <Calendar className="mr-2 h-4 w-4" />
                  {c.scheduleCall}
                </a>
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
