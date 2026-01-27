import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Calendar,
  Clock,
  CheckCircle,
  TrendingUp,
  ArrowLeft,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { useLang } from '@/hooks/useLang';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { siteConfig } from '@/config/site';

interface MonthlySummary {
  id: string;
  month: number;
  year: number;
  hours_included: number;
  hours_used: number;
  requests_completed: number;
  key_findings: string[] | null;
  recommendations: string[] | null;
  health_status: string;
}

export default function PortalSummaryPage() {
  const { lang, getLocalizedPath } = useLang();
  const { user, profile, isLoading: authLoading } = useAuth();
  const [summaries, setSummaries] = useState<MonthlySummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const content = {
    en: {
      title: 'Monthly Summaries',
      subtitle: 'Track your consulting engagement progress over time',
      backToPortal: 'Back to Portal',
      noSummaries: 'No summaries available yet',
      noSummariesDesc: 'Monthly summaries will appear here after your first month of service.',
      submitRequest: 'Submit a Request',
      hoursLabel: 'Hours Used',
      requestsLabel: 'Requests Completed',
      keyWins: 'Key Wins',
      recommendations: 'Recommendations',
      scheduleCall: 'Schedule Call',
      months: ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    },
    es: {
      title: 'Resúmenes Mensuales',
      subtitle: 'Sigue el progreso de tu consultoría a lo largo del tiempo',
      backToPortal: 'Volver al Portal',
      noSummaries: 'No hay resúmenes disponibles',
      noSummariesDesc: 'Los resúmenes mensuales aparecerán aquí después de tu primer mes de servicio.',
      submitRequest: 'Enviar Solicitud',
      hoursLabel: 'Horas Usadas',
      requestsLabel: 'Solicitudes Completadas',
      keyWins: 'Logros Clave',
      recommendations: 'Recomendaciones',
      scheduleCall: 'Agendar Llamada',
      months: ['', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    },
  };

  const c = content[lang];

  useEffect(() => {
    if (!user || authLoading) return;

    async function fetchSummaries() {
      setIsLoading(true);

      try {
        const { data, error } = await supabase
          .from('client_summaries')
          .select('*')
          .eq('user_id', user.id)
          .order('year', { ascending: false })
          .order('month', { ascending: false })
          .limit(12);

        if (error) throw error;
        setSummaries(data || []);
      } catch (error) {
        console.error('Error fetching summaries:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSummaries();
  }, [user, authLoading]);

  if (authLoading || isLoading) {
    return (
      <Layout>
        <div className="container py-12">
          <div className="max-w-4xl mx-auto space-y-6">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-96" />
            <div className="grid gap-6">
              <Skeleton className="h-64" />
              <Skeleton className="h-64" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <Button variant="ghost" size="sm" asChild>
              <Link to={getLocalizedPath('/portal')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                {c.backToPortal}
              </Link>
            </Button>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-display text-3xl font-bold mb-2">{c.title}</h1>
            <p className="text-muted-foreground">{c.subtitle}</p>
          </motion.div>

          {summaries.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardContent className="py-12 text-center">
                  <BarChart3 className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                  <h3 className="text-lg font-semibold mb-2">{c.noSummaries}</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    {c.noSummariesDesc}
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <Button asChild>
                      <Link to={getLocalizedPath('/portal/requests')}>
                        <FileText className="mr-2 h-4 w-4" />
                        {c.submitRequest}
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href={siteConfig.SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
                        <Calendar className="mr-2 h-4 w-4" />
                        {c.scheduleCall}
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {summaries.map((summary, index) => {
                const usagePercent = Math.min((summary.hours_used / summary.hours_included) * 100, 100);
                
                return (
                  <motion.div
                    key={summary.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Calendar className="h-5 w-5" />
                          {c.months[summary.month]} {summary.year}
                        </CardTitle>
                        <CardDescription className="capitalize">
                          {profile?.plan} Plan
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {/* Stats Row */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-muted/50 rounded-lg p-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                              <Clock className="h-4 w-4" />
                              {c.hoursLabel}
                            </div>
                            <div className="text-2xl font-bold mb-2">
                              {summary.hours_used} / {summary.hours_included}h
                            </div>
                            <Progress value={usagePercent} className="h-2" />
                          </div>

                          <div className="bg-muted/50 rounded-lg p-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                              <CheckCircle className="h-4 w-4" />
                              {c.requestsLabel}
                            </div>
                            <div className="text-2xl font-bold">
                              {summary.requests_completed}
                            </div>
                          </div>
                        </div>

                        {/* Key Findings */}
                        {summary.key_findings && summary.key_findings.length > 0 && (
                          <div>
                            <h4 className="font-medium mb-3 flex items-center gap-2">
                              <TrendingUp className="h-4 w-4 text-green-500" />
                              {c.keyWins}
                            </h4>
                            <ul className="space-y-2">
                              {summary.key_findings.map((finding, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm">
                                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                                  <span>{finding}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Recommendations */}
                        {summary.recommendations && summary.recommendations.length > 0 && (
                          <div>
                            <h4 className="font-medium mb-3">{c.recommendations}</h4>
                            <ul className="space-y-2">
                              {summary.recommendations.map((rec, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                  <span className="text-accent">→</span>
                                  <span>{rec}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
