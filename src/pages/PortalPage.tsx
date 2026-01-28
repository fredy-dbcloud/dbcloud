import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { 
  Clock, 
  FileText, 
  Calendar,
  ArrowRight,
  BarChart3,
  LogOut,
  User
} from 'lucide-react';
import logoVerticalDark from '@/assets/logos/logo-dbcloud-vertical-dark.png';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useLang } from '@/hooks/useLang';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { HoursTracker } from '@/components/onboarding/HoursTracker';
import { HealthScoreBadge } from '@/components/dashboard/HealthScoreBadge';
import { UpgradeRecommendation } from '@/components/dashboard/UpgradeRecommendation';
import { MonthlySummaryCard } from '@/components/dashboard/MonthlySummaryCard';
import { RecentRequestsList } from '@/components/dashboard/RecentRequestsList';
import { AddonsGrid } from '@/components/addons/AddonsGrid';
import { OnboardingWizard } from '@/components/onboarding/OnboardingWizard';
import { OnboardingChecklist } from '@/components/dashboard/OnboardingChecklist';
import { siteConfig } from '@/config/site';
import { useUpgradeSignals } from '@/hooks/useUpgradeSignals';
import { toast } from 'sonner';

type PlanType = 'starter' | 'growth' | 'enterprise';
type UpgradePlanType = 'starter' | 'growth'; // For useUpgradeSignals compatibility
type HealthStatus = 'healthy' | 'at_risk' | 'inactive';

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
  lastRequestDate: string | null
): HealthStatus {
  if (!lastRequestDate) return 'inactive';
  
  const planHours = plan === 'starter' ? 4 : plan === 'growth' ? 10 : 20;
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

export default function PortalPage() {
  const { t, getLocalizedPath, lang } = useLang();
  const { user, profile, signOut, isLoading: authLoading } = useAuth();
  const tAny = t as any;
  
  const [isLoading, setIsLoading] = useState(true);
  const [hoursUsed, setHoursUsed] = useState(0);
  const [summary, setSummary] = useState<MonthlySummary | null>(null);
  const [allSummaries, setAllSummaries] = useState<{ hoursUsed: number; hoursIncluded: number; month: number; year: number }[]>([]);
  const [requests, setRequests] = useState<ClientRequest[]>([]);
  const [upgradeDismissed, setUpgradeDismissed] = useState(false);
  const [healthStatus, setHealthStatus] = useState<HealthStatus>('inactive');
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Check if onboarding is needed
  useEffect(() => {
    if (user && !authLoading) {
      const onboardingComplete = localStorage.getItem(`onboarding_complete_${user.id}`);
      if (!onboardingComplete && profile?.plan !== 'enterprise') {
        setShowOnboarding(true);
      }
    }
  }, [user, authLoading, profile]);

  const dashboard = tAny.dashboard || {
    title: 'Client Portal',
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
    if (!user || authLoading) return;

    async function fetchClientData() {
      setIsLoading(true);
      
      try {
        // Fetch requests for this user
        const { data: requestsData, error: requestsError } = await supabase
          .from('client_requests')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(10);

        if (requestsError) throw requestsError;
        const typedRequests = (requestsData || []) as ClientRequest[];
        setRequests(typedRequests);

        // Calculate stats from requests
        const completedRequests = typedRequests.filter(r => r.status === 'completed');
        const calculatedHoursUsed = completedRequests.reduce((sum, r) => sum + (r.estimated_hours || 0), 0);
        setHoursUsed(calculatedHoursUsed);

        const lastRequest = typedRequests[0] || null;
        const plan = (profile?.plan || 'starter') as PlanType;
        
        const status = calculateHealthStatus(
          plan,
          calculatedHoursUsed,
          typedRequests.length,
          lastRequest?.created_at || null
        );
        setHealthStatus(status);

        // Fetch summaries for this user
        const { data: summariesData } = await supabase
          .from('client_summaries')
          .select('month, year, hours_included, hours_used, requests_completed, key_findings, recommendations')
          .eq('user_id', user.id)
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
  }, [user, authLoading, profile]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success(lang === 'es' ? 'Sesión cerrada' : 'Signed out successfully');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const plan = (profile?.plan || 'starter') as PlanType;
  const planHours = plan === 'starter' ? 4 : plan === 'growth' ? 10 : 20;
  const usagePercentage = (hoursUsed / planHours) * 100;

  // Calculate upgrade signals (only for non-enterprise plans)
  const upgradePlan: UpgradePlanType = plan === 'enterprise' ? 'growth' : plan;
  const upgradeAnalysis = useUpgradeSignals({
    currentPlan: upgradePlan,
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

  const showUpgradeRecommendation = plan !== 'enterprise' && 
    upgradeAnalysis.shouldShowUpgrade && 
    !upgradeDismissed;

  if (authLoading) {
    return (
      <Layout>
        <div className="container py-12">
          <DashboardSkeleton />
        </div>
      </Layout>
    );
  }

  const hasSubmittedRequest = requests.length > 0;

  return (
    <Layout>
      {/* Onboarding Wizard for first-time users */}
      {showOnboarding && user && (
        <OnboardingWizard
          userId={user.id}
          userEmail={user.email || ''}
          plan={upgradePlan}
          onComplete={() => setShowOnboarding(false)}
        />
      )}

      <div className="container py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <img 
                src={logoVerticalDark} 
                alt="DBCloud"
                className="h-14 w-auto hidden sm:block"
              />
              <div>
                <h1 className="font-display text-3xl font-bold mb-2">{dashboard.title}</h1>
                <p className="text-muted-foreground">{dashboard.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <User className="h-4 w-4" />
                {user?.email}
              </div>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                {lang === 'es' ? 'Cerrar Sesión' : 'Sign Out'}
              </Button>
            </div>
          </motion.div>

          {isLoading ? (
            <DashboardSkeleton />
          ) : (
            <div className="space-y-8">
              {/* Onboarding Checklist */}
              {!showOnboarding && user && plan !== 'enterprise' && (
                <OnboardingChecklist
                  userId={user.id}
                  hasSubmittedRequest={hasSubmittedRequest}
                  hasScheduledCall={false}
                  hasViewedBilling={false}
                />
              )}

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
                        <span className="capitalize">{plan}</span>
                        <HealthScoreBadge status={healthStatus} />
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
                        <Link to={getLocalizedPath(`/onboarding/${plan}`)}>
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
                  <HoursTracker plan={upgradePlan} usedHours={hoursUsed} />
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
                    currentPlan={upgradePlan}
                    email={user?.email || ''}
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
                            <Link to={getLocalizedPath('/portal/requests')}>
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
                          currentPlan={upgradePlan}
                          email={user?.email || ''}
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

              {/* Add-ons Section (only for non-enterprise) */}
              {plan !== 'enterprise' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <AddonsGrid 
                  email={user?.email || ''} 
                  plan={upgradePlan} 
                  showTitle={true}
                />
              </motion.div>
              )}

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap gap-4 justify-center"
              >
                <Button asChild>
                  <Link to={getLocalizedPath('/portal/requests')}>
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
          )}
        </div>
      </div>
    </Layout>
  );
}
