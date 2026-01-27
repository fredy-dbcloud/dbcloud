import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Calendar,
  ArrowLeft,
  FileText,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useLang } from '@/hooks/useLang';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { siteConfig } from '@/config/site';
import { MonthlySummaryReport } from '@/components/dashboard/MonthlySummaryReport';
import { useUpgradeSignals } from '@/hooks/useUpgradeSignals';
import type { PlanType } from '@/hooks/useUpgradeSignals';

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
  plan: string;
}

interface ClientRequest {
  id: string;
  request_type: string;
  description: string;
  status: string;
  priority: string;
  estimated_hours: number | null;
  created_at: string;
}

export default function PortalSummaryPage() {
  const { lang, getLocalizedPath } = useLang();
  const { user, profile, isLoading: authLoading } = useAuth();
  const [summaries, setSummaries] = useState<MonthlySummary[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [requests, setRequests] = useState<ClientRequest[]>([]);

  const content = {
    en: {
      title: 'Monthly Summaries',
      subtitle: 'Track your consulting engagement progress over time',
      backToPortal: 'Back to Portal',
      noSummaries: 'No summaries available yet',
      noSummariesDesc: 'Monthly summaries will appear here after your first month of service.',
      submitRequest: 'Submit a Request',
      scheduleCall: 'Schedule Call',
      previousMonth: 'Previous Month',
      nextMonth: 'Next Month',
    },
    es: {
      title: 'Resúmenes Mensuales',
      subtitle: 'Sigue el progreso de tu consultoría a lo largo del tiempo',
      backToPortal: 'Volver al Portal',
      noSummaries: 'No hay resúmenes disponibles',
      noSummariesDesc: 'Los resúmenes mensuales aparecerán aquí después de tu primer mes de servicio.',
      submitRequest: 'Enviar Solicitud',
      scheduleCall: 'Agendar Llamada',
      previousMonth: 'Mes Anterior',
      nextMonth: 'Mes Siguiente',
    },
  };

  const c = content[lang];

  useEffect(() => {
    if (!user || authLoading) return;

    async function fetchData() {
      setIsLoading(true);

      try {
        // Fetch summaries
        const { data: summariesData, error: summariesError } = await supabase
          .from('client_summaries')
          .select('*')
          .eq('user_id', user.id)
          .order('year', { ascending: false })
          .order('month', { ascending: false })
          .limit(12);

        if (summariesError) throw summariesError;
        setSummaries((summariesData || []) as MonthlySummary[]);

        // Fetch requests for upgrade analysis
        const { data: requestsData, error: requestsError } = await supabase
          .from('client_requests')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(50);

        if (requestsError) throw requestsError;
        setRequests((requestsData || []) as ClientRequest[]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [user, authLoading]);

  const selectedSummary = summaries[selectedIndex];
  const plan = profile?.plan || 'starter';
  const isEnterprise = plan === 'enterprise';
  const upgradePlan: PlanType = isEnterprise ? 'growth' : (plan as PlanType);

  // Calculate metrics for the selected summary period
  const selectedPeriodRequests = selectedSummary
    ? requests.filter(r => {
        const requestDate = new Date(r.created_at);
        return requestDate.getMonth() + 1 === selectedSummary.month &&
               requestDate.getFullYear() === selectedSummary.year;
      })
    : [];

  const requestsSubmitted = selectedPeriodRequests.length;
  const requestsPending = selectedPeriodRequests.filter(r => 
    r.status === 'pending' || r.status === 'in_progress'
  ).length;

  // Calculate upgrade signals
  const currentUsage = selectedSummary 
    ? (selectedSummary.hours_used / selectedSummary.hours_included) * 100 
    : 0;

  const upgradeAnalysis = useUpgradeSignals({
    currentPlan: upgradePlan,
    currentUsagePercentage: currentUsage,
    requests: requests.map(r => ({
      request_type: r.request_type,
      description: r.description,
      priority: r.priority,
      status: r.status,
      estimated_hours: r.estimated_hours,
    })),
    summaries: summaries.map(s => ({
      hoursUsed: s.hours_used,
      hoursIncluded: s.hours_included,
      month: s.month,
      year: s.year,
    })),
    addonPurchases: [],
  });

  if (authLoading || isLoading) {
    return (
      <Layout>
        <div className="container py-12">
          <div className="max-w-4xl mx-auto space-y-6">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-96" />
            <div className="space-y-4">
              <Skeleton className="h-48" />
              <Skeleton className="h-64" />
              <Skeleton className="h-48" />
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Month Navigation */}
              {summaries.length > 1 && (
                <div className="flex items-center justify-between bg-muted/30 rounded-lg p-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedIndex(prev => Math.min(prev + 1, summaries.length - 1))}
                    disabled={selectedIndex >= summaries.length - 1}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    {c.previousMonth}
                  </Button>
                  <span className="text-sm font-medium text-muted-foreground">
                    {selectedIndex + 1} / {summaries.length}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedIndex(prev => Math.max(prev - 1, 0))}
                    disabled={selectedIndex <= 0}
                  >
                    {c.nextMonth}
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              )}

              {/* Summary Report */}
              {selectedSummary && (
                <MonthlySummaryReport
                  summary={selectedSummary}
                  requestsSubmitted={requestsSubmitted}
                  requestsPending={requestsPending}
                  upgradeAnalysis={!isEnterprise ? upgradeAnalysis : undefined}
                  currentPlan={upgradePlan}
                  email={user?.email || ''}
                />
              )}
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
}
