import { useSearchParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useLang } from '@/hooks/useLang';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Clock, CheckCircle2, Lightbulb, Target, Calendar, TrendingUp, ExternalLink } from 'lucide-react';
import { siteConfig } from '@/config/site';

const translations = {
  en: {
    title: 'Monthly Summary',
    subtitle: 'Your consulting engagement at a glance',
    planLabel: 'Active Plan',
    hoursTitle: 'Hours Utilization',
    hoursIncluded: 'Included',
    hoursUsed: 'Used',
    hoursRemaining: 'Remaining',
    requestsTitle: 'Requests This Month',
    submitted: 'Submitted',
    completed: 'Completed',
    inProgress: 'In Progress',
    keyWins: 'Key Wins This Month',
    recommendations: 'Next Month Recommendations',
    submitRequest: 'Submit a Request',
    scheduleCall: 'Schedule a Call',
    trend: '+12% vs last month',
    starter: {
      name: 'Starter Consulting',
      hours: 4,
      hoursUsed: 2.5,
    },
    growth: {
      name: 'Growth Consulting',
      hours: 10,
      hoursUsed: 7,
    },
    wins: [
      'Completed infrastructure baseline assessment',
      'Identified 3 cost optimization opportunities ($450/mo potential savings)',
      'Established monitoring dashboard for key metrics',
    ],
    nextRecs: [
      'Implement recommended caching strategy for database queries',
      'Schedule quarterly architecture review session',
      'Evaluate staging environment security posture',
    ],
    requestStats: {
      submitted: 5,
      completed: 4,
      inProgress: 1,
    },
  },
  es: {
    title: 'Resumen Mensual',
    subtitle: 'Tu compromiso de consultoría de un vistazo',
    planLabel: 'Plan Activo',
    hoursTitle: 'Utilización de Horas',
    hoursIncluded: 'Incluidas',
    hoursUsed: 'Usadas',
    hoursRemaining: 'Restantes',
    requestsTitle: 'Solicitudes Este Mes',
    submitted: 'Enviadas',
    completed: 'Completadas',
    inProgress: 'En Progreso',
    keyWins: 'Logros Clave Este Mes',
    recommendations: 'Recomendaciones Próximo Mes',
    submitRequest: 'Enviar Solicitud',
    scheduleCall: 'Agendar Llamada',
    trend: '+12% vs mes anterior',
    starter: {
      name: 'Consultoría Starter',
      hours: 4,
      hoursUsed: 2.5,
    },
    growth: {
      name: 'Consultoría Growth',
      hours: 10,
      hoursUsed: 7,
    },
    wins: [
      'Evaluación base de infraestructura completada',
      'Identificadas 3 oportunidades de optimización de costos ($450/mes de ahorro potencial)',
      'Dashboard de monitoreo establecido para métricas clave',
    ],
    nextRecs: [
      'Implementar estrategia de caché recomendada para consultas de base de datos',
      'Programar sesión de revisión de arquitectura trimestral',
      'Evaluar postura de seguridad del entorno de staging',
    ],
    requestStats: {
      submitted: 5,
      completed: 4,
      inProgress: 1,
    },
  },
};

export default function SummaryPage() {
  const { lang, getLocalizedPath } = useLang();
  const [searchParams] = useSearchParams();
  const planParam = searchParams.get('plan') || 'starter';
  const plan = planParam === 'growth' ? 'growth' : 'starter';
  
  const t = translations[lang as keyof typeof translations] || translations.en;
  const planData = t[plan as keyof typeof t] as { name: string; hours: number; hoursUsed: number };
  
  const hoursRemaining = planData.hours - planData.hoursUsed;
  const usagePercentage = (planData.hoursUsed / planData.hours) * 100;
  
  const currentMonth = new Date().toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', { 
    month: 'long', 
    year: 'numeric' 
  });

  return (
    <Layout>
      <div className="min-h-screen bg-background py-12">
        <div className="container max-w-5xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Calendar className="h-4 w-4" />
              <span className="capitalize">{currentMonth}</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
            <p className="text-muted-foreground mt-1">{t.subtitle}</p>
          </div>

          {/* Plan Badge */}
          <Card className="mb-6 border-primary/20 bg-primary/5">
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t.planLabel}</p>
                  <p className="text-lg font-semibold text-primary">{planData.name}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <TrendingUp className="h-4 w-4" />
                  {t.trend}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Hours Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="h-5 w-5 text-primary" />
                  {t.hoursTitle}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t.hoursIncluded}</span>
                    <span className="font-medium">{planData.hours}h</span>
                  </div>
                  <Progress value={usagePercentage} className="h-2" />
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-foreground">{planData.hoursUsed}h</p>
                      <p className="text-xs text-muted-foreground">{t.hoursUsed}</p>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">{hoursRemaining}h</p>
                      <p className="text-xs text-muted-foreground">{t.hoursRemaining}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Requests Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  {t.requestsTitle}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold text-foreground">{t.requestStats.submitted}</p>
                    <p className="text-xs text-muted-foreground">{t.submitted}</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{t.requestStats.completed}</p>
                    <p className="text-xs text-muted-foreground">{t.completed}</p>
                  </div>
                  <div className="text-center p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg">
                    <p className="text-2xl font-bold text-amber-600">{t.requestStats.inProgress}</p>
                    <p className="text-xs text-muted-foreground">{t.inProgress}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Key Wins & Recommendations */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Key Wins */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Lightbulb className="h-5 w-5 text-amber-500" />
                  {t.keyWins}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {t.wins.map((win, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <span className="text-muted-foreground">{win}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="h-5 w-5 text-primary" />
                  {t.recommendations}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {t.nextRecs.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-primary mt-0.5">→</span>
                      <span className="text-muted-foreground">{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to={getLocalizedPath('/requests/new')}>
                {t.submitRequest}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={siteConfig.SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
                {t.scheduleCall}
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
