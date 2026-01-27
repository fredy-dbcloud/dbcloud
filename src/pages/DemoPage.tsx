import { useParams, Navigate, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { 
  Clock, 
  FileText, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLang } from '@/hooks/useLang';
import { HoursTracker } from '@/components/onboarding/HoursTracker';
import { HealthScoreBadge } from '@/components/dashboard/HealthScoreBadge';
import { RecentRequestsList } from '@/components/dashboard/RecentRequestsList';
import { DemoBanner } from '@/components/demo/DemoBanner';
import { DemoAIInsights } from '@/components/demo/DemoAIInsights';
import { DemoMonthlySummaries } from '@/components/demo/DemoMonthlySummaries';
import { DemoPlanLimitations } from '@/components/demo/DemoPlanLimitations';
import { getDemoData, type DemoPlan } from '@/config/demoData';
import { formatDistanceToNow } from 'date-fns';
import { es, enUS } from 'date-fns/locale';

export default function DemoPage() {
  const { plan } = useParams<{ plan: string }>();
  const { lang, getLocalizedPath } = useLang();
  const locale = lang === 'es' ? es : enUS;

  // Validate plan parameter
  if (!plan || !['starter', 'growth', 'enterprise'].includes(plan)) {
    return <Navigate to={getLocalizedPath('/pricing')} replace />;
  }

  const demoData = getDemoData(plan as DemoPlan);

  const labels = {
    en: {
      title: `${demoData.planName} Plan Demo`,
      subtitle: 'Interactive demonstration with sample data',
      currentPlan: 'Active Plan',
      lastActivity: 'Last Activity',
      recentRequests: 'Recent Requests',
      submitRequest: 'Submit Request (Demo)',
      viewPricing: 'Get Started for Real',
    },
    es: {
      title: `Demo del Plan ${demoData.planName_es}`,
      subtitle: 'Demostración interactiva con datos de muestra',
      currentPlan: 'Plan Activo',
      lastActivity: 'Última Actividad',
      recentRequests: 'Solicitudes Recientes',
      submitRequest: 'Enviar Solicitud (Demo)',
      viewPricing: 'Comenzar de Verdad',
    },
  };

  const t = labels[lang as keyof typeof labels] || labels.en;

  const lastActivityLabel = formatDistanceToNow(new Date(demoData.lastActivityDate), {
    addSuffix: true,
    locale,
  });

  // Enterprise needs different hours handling
  const isEnterprise = plan === 'enterprise';

  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-6xl mx-auto">
          {/* Demo Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <DemoBanner plan={plan as DemoPlan} />
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <h1 className="font-display text-3xl font-bold">{t.title}</h1>
            </div>
            <p className="text-muted-foreground">{t.subtitle}</p>
          </motion.div>

          <div className="space-y-8">
            {/* Top Stats Row */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Plan Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>{t.currentPlan}</CardDescription>
                    <CardTitle className="flex items-center justify-between">
                      <span>{lang === 'es' ? demoData.planName_es : demoData.planName}</span>
                      <HealthScoreBadge status={demoData.healthStatus} />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{demoData.hoursIncluded}h/{lang === 'es' ? 'mes' : 'month'}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {t.lastActivity}: {lastActivityLabel}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Hours Tracker */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="md:col-span-2"
              >
                {isEnterprise ? (
                  <Card className="h-full">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-primary" />
                        {lang === 'es' ? 'Horas Mensuales' : 'Monthly Hours'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">
                            {lang === 'es' ? 'Asignadas' : 'Allocated'}
                          </p>
                          <p className="font-bold text-lg">{demoData.hoursIncluded}h</p>
                        </div>
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">
                            {lang === 'es' ? 'Usadas' : 'Used'}
                          </p>
                          <p className="font-bold text-lg">{demoData.hoursUsed}h</p>
                        </div>
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">
                            {lang === 'es' ? 'Disponibles' : 'Available'}
                          </p>
                          <p className="font-bold text-lg">{demoData.hoursIncluded - demoData.hoursUsed}h</p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-4 text-center">
                        {lang === 'es' 
                          ? 'Asignación de horas personalizada con revisiones trimestrales'
                          : 'Custom hours allocation with quarterly reviews'}
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <HoursTracker plan={plan as 'starter' | 'growth'} usedHours={demoData.hoursUsed} />
                )}
              </motion.div>
            </div>

            {/* Plan Limitations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <DemoPlanLimitations 
                plan={plan as DemoPlan} 
                limitations={lang === 'es' ? demoData.limitations_es : demoData.limitations} 
              />
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Recent Requests */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      {t.recentRequests}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RecentRequestsList requests={demoData.requests} />
                  </CardContent>
                </Card>
              </motion.div>

              {/* AI Insights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <DemoAIInsights insights={demoData.aiInsights} />
              </motion.div>
            </div>

            {/* Monthly Summaries */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <DemoMonthlySummaries summaries={demoData.summaries} />
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4 justify-center pt-4"
            >
              <Button size="lg" asChild>
                <Link to={getLocalizedPath('/pricing')}>
                  {t.viewPricing}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" disabled>
                {t.submitRequest}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
