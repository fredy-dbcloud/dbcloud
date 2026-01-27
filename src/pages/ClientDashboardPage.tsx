import { useState, useEffect } from 'react';
import { useSearchParams, Navigate, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { 
  Clock, 
  FileText, 
  Calendar,
  ArrowRight,
  BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useLang } from '@/hooks/useLang';
import { supabase } from '@/integrations/supabase/client';
import { HoursTracker } from '@/components/onboarding/HoursTracker';
import { HealthScoreBadge } from '@/components/dashboard/HealthScoreBadge';
import { UpgradeRecommendation } from '@/components/dashboard/UpgradeRecommendation';
import { MonthlySummaryCard } from '@/components/dashboard/MonthlySummaryCard';
import { RecentRequestsList } from '@/components/dashboard/RecentRequestsList';
import { AddonsGrid } from '@/components/addons/AddonsGrid';
import { siteConfig } from '@/config/site';
import { useUpgradeSignals } from '@/hooks/useUpgradeSignals';

type PlanType = 'starter' | 'growth';
type HealthStatus = 'healthy' | 'at_risk' | 'inactive';

interface ClientData {
  email: string;
  plan: PlanType;
  hoursUsed: number;
  requestsCompleted: number;
  lastRequestDate: string | null;
  healthStatus: HealthStatus;
}

interface MonthlySummary {
  month: number;
  year: number;
  hoursIncluded: number;
  hoursUsed: number;
  requestsCompleted: number;
  keyFindings: string[];
  recommendations: string[];
}

interface MonthlySummaryData {
  month: number;
  year: number;
  hours_included: number;
  hours_used: number;
  requests_completed: number;
  key_findings: string[] | null;
  recommendations: string[] | null;
}

interface ClientRequest {
  id: string;
  request_type: string;
  description: string;
  status: string;
  priority: string;
  environment: string;
  created_at: string;
  plan: string;
  estimated_hours: number | null;
  ai_classification?: string | null;
  ai_effort_level?: string | null;
  ai_estimated_hours?: number | null;
}

function calculateHealthStatus(
  plan: PlanType,
  hoursUsed: number,
  requestCount: number,
  lastRequestDate: string
): HealthStatus {
  const planHours = plan === 'starter' ? 4 : 10;
  const utilizationRate = hoursUsed / planHours;
  const daysSinceLastRequest = Math.floor(
    (Date.now() - new Date(lastRequestDate).getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysSinceLastRequest > 30) {
    return 'inactive';
  }

  if (utilizationRate < 0.25 || daysSinceLastRequest > 14) {
    return 'at_risk';
  }

  return 'healthy';
}

function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-3 gap-6">
        <Skeleton className="h-48" />
        <Skeleton className="h-48 md:col-span-2" />
      </div>
      <div className="grid lg:grid-cols-2 gap-8">
        <Skeleton className="h-72" />
        <Skeleton className="h-72" />
      </div>
    </div>
  );
}

export default function ClientDashboardPage() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const { t, getLocalizedPath, lang } = useLang();
  const tAny = t as any;
  
  const [isLoading, setIsLoading] = useState(true);
  const [clientData, setClientData] = useState<ClientData | null>(null);
  const [summary, setSummary] = useState<MonthlySummary | null>(null);
  const [allSummaries, setAllSummaries] = useState<{ hoursUsed: number; hoursIncluded: number; month: number; year: number }[]>([]);
  const [requests, setRequests] = useState<ClientRequest[]>([]);
  const [upgradeDismissed, setUpgradeDismissed] = useState(false);

  const dashboard = tAny.dashboard || {
    title: 'Client Dashboard',
    subtitle: 'Track your plan usage and requests',
    currentPlan: 'Current Plan',
    monthlyStatus: 'Monthly Status',
    recentRequests: 'Recent Requests',
    lastSummary: 'Last Monthly Summary',
    noRequests: 'No requests submitted yet',
    noSummary: 'No summary available yet',
    viewOnboarding: 'View Onboarding Guide',
    submitRequest: 'Submit Request',
  };

  useEffect(() => {
    if (!email) return;

    async function fetchClientData() {
      setIsLoading(true);
      
      try {
        // Fetch requests
        const { data: requestsData, error: requestsError } = await supabase
          .from('client_requests')
          .select('*')
          .eq('email', email)
          .order('created_at', { ascending: false })
          .limit(10);

        if (requestsError) throw requestsError;
        const typedRequests = (requestsData || []) as ClientRequest[];
        setRequests(typedRequests);

        // Calculate stats from requests
        if (typedRequests.length > 0) {
          const plan = typedRequests[0].plan as PlanType;
          const completedRequests = typedRequests.filter(r => r.status === 'completed');
          const hoursUsed = completedRequests.reduce((sum, r) => sum + (r.estimated_hours || 0), 0);
          const lastRequest = typedRequests[0];

          const healthStatus = calculateHealthStatus(
            plan,
            hoursUsed,
            typedRequests.length,
            lastRequest.created_at
          );

          setClientData({
            email,
            plan,
            hoursUsed,
            requestsCompleted: completedRequests.length,
            lastRequestDate: lastRequest.created_at,
            healthStatus,
          });
        } else {
          setClientData({
            email,
            plan: 'starter',
            hoursUsed: 0,
            requestsCompleted: 0,
            lastRequestDate: null,
            healthStatus: 'inactive',
          });
        }

        // Fetch summaries for upgrade signal analysis (last 3 months)
        const { data: summariesData } = await (supabase as any)
          .from('client_summaries')
          .select('month, year, hours_included, hours_used, requests_completed, key_findings, recommendations')
          .eq('email', email)
          .order('year', { ascending: false })
          .order('month', { ascending: false })
          .limit(3);

        if (summariesData && summariesData.length > 0) {
          const typedSummaries = summariesData as MonthlySummaryData[];
          
          // Set latest summary for display
          const latest = typedSummaries[0];
          setSummary({
            month: latest.month,
            year: latest.year,
            hoursIncluded: latest.hours_included,
            hoursUsed: latest.hours_used,
            requestsCompleted: latest.requests_completed,
            keyFindings: latest.key_findings || [],
            recommendations: latest.recommendations || [],
          });

          // Set all summaries for upgrade signal analysis
          setAllSummaries(typedSummaries.map(s => ({
            month: s.month,
            year: s.year,
            hoursUsed: s.hours_used,
            hoursIncluded: s.hours_included
          })));
        }
      } catch (error) {
        console.error('Error fetching client data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchClientData();
  }, [email]);

  if (!email) {
    return <Navigate to={getLocalizedPath('/pricing')} replace />;
  }

  const planHours = clientData?.plan === 'starter' ? 4 : 10;
  const usagePercentage = clientData ? (clientData.hoursUsed / planHours) * 100 : 0;

  // Calculate upgrade signals using the new hook
  const upgradeAnalysis = useUpgradeSignals({
    currentPlan: clientData?.plan || 'starter',
    currentUsagePercentage: usagePercentage,
    requests: requests.map(r => ({
      request_type: r.request_type,
      description: r.description,
      priority: r.priority,
      status: r.status,
      estimated_hours: r.estimated_hours
    })),
    summaries: allSummaries,
    addonPurchases: []
  });

  const showUpgradeRecommendation = clientData && 
    upgradeAnalysis.shouldShowUpgrade && 
    !upgradeDismissed;

  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-display text-3xl font-bold mb-2">{dashboard.title}</h1>
            <p className="text-muted-foreground">{dashboard.subtitle}</p>
          </motion.div>

          {isLoading ? (
            <DashboardSkeleton />
          ) : clientData ? (
            <div className="space-y-8">
              {/* Top Stats Row */}
              <div className="grid md:grid-cols-3 gap-6">
                {/* Plan Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card>
                    <CardHeader className="pb-3">
                      <CardDescription>{dashboard.currentPlan}</CardDescription>
                      <CardTitle className="flex items-center justify-between">
                        <span className="capitalize">{clientData.plan}</span>
                        <HealthScoreBadge status={clientData.healthStatus} />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{planHours}h/{lang === 'es' ? 'mes' : 'month'}</span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-4 w-full"
                        asChild
                      >
                        <Link to={getLocalizedPath(`/onboarding/${clientData.plan}`)}>
                          {dashboard.viewOnboarding}
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Hours Tracker */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="md:col-span-2"
                >
                  <HoursTracker plan={clientData.plan} usedHours={clientData.hoursUsed} />
                </motion.div>
              </div>

              {/* Upgrade Recommendation */}
              {showUpgradeRecommendation && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <UpgradeRecommendation 
                    analysis={upgradeAnalysis}
                    currentPlan={clientData.plan}
                    email={email}
                    onDismiss={() => setUpgradeDismissed(true)}
                    variant="card"
                  />
                </motion.div>
              )}

              {/* Main Content Grid */}
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Recent Requests */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        {dashboard.recentRequests}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {requests.length > 0 ? (
                        <RecentRequestsList requests={requests.slice(0, 5)} />
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                          <p>{dashboard.noRequests}</p>
                          <Button 
                            size="sm" 
                            className="mt-4"
                            asChild
                          >
                            <Link to={getLocalizedPath(`/onboarding/${clientData.plan}#submit-request`)}>
                              {dashboard.submitRequest}
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Monthly Summary */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        {dashboard.lastSummary}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {summary ? (
                        <MonthlySummaryCard 
                          summary={summary}
                          upgradeAnalysis={upgradeAnalysis}
                          currentPlan={clientData.plan}
                          email={email}
                        />
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                          <p>{dashboard.noSummary}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Add-ons Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <AddonsGrid 
                  email={email || ''} 
                  plan={clientData.plan} 
                  showTitle={true}
                />
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap gap-4 justify-center"
              >
                <Button asChild>
                  <Link to={getLocalizedPath(`/onboarding/${clientData.plan}#submit-request`)}>
                    {dashboard.submitRequest}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <a href={siteConfig.SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
                    <Calendar className="mr-2 h-4 w-4" />
                    {lang === 'es' ? 'Agendar Llamada' : 'Schedule Call'}
                  </a>
                </Button>
              </motion.div>
            </div>
          ) : null}
        </div>
      </div>
    </Layout>
  );
}
