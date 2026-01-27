import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield,
  RefreshCw,
  Users,
  FileText,
  DollarSign,
  Brain,
  BarChart3,
  Bot,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { AdminSummaryCards } from '@/components/admin/AdminSummaryCards';
import { ClientsManagement } from '@/components/admin/ClientsManagement';
import { RequestsManagement } from '@/components/admin/RequestsManagement';
import { RevenueOverview } from '@/components/admin/RevenueOverview';
import { AIInsightsPanel } from '@/components/admin/AIInsightsPanel';
import { AdminCharts } from '@/components/admin/AdminCharts';
import { AICopilotChat } from '@/components/admin/AICopilotChat';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface RiskSummary {
  total_classified_requests: number;
  total_clients_tracked: number;
  at_risk_clients: number;
  expansion_ready_clients: number;
  margin_risk_clients: number;
  risk_flag_distribution: Record<string, number>;
  at_risk_emails: string[];
  expansion_ready_emails: string[];
  margin_risk_emails: string[];
}

interface RevenueData {
  plan_distribution: Record<string, number>;
  upgrade_signals: number;
  total_clients: number;
  mrr: number;
}

interface ChartsData {
  monthly_signups: Record<string, number>;
  requests_by_plan: Record<string, number>;
  hours_data: Array<{
    month: string;
    plan: string;
    hours_used: number;
    hours_included: number;
  }>;
}

interface Client {
  id: string;
  email: string;
  full_name: string | null;
  company: string | null;
  plan: string;
  created_at: string;
  hours_used: number;
  hours_included: number;
  requests_completed: number;
  health_status: string;
  churn_probability: number;
  expansion_probability: number;
}

interface HealthPrediction {
  id: string;
  email: string;
  health_status: string;
  churn_probability: number;
  expansion_probability: number;
  margin_risk_score: number;
  signals: any;
  ai_reasoning: string | null;
  updated_at: string;
}

export default function InternalDashboardPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [riskSummary, setRiskSummary] = useState<RiskSummary | null>(null);
  const [revenueData, setRevenueData] = useState<RevenueData | null>(null);
  const [chartsData, setChartsData] = useState<ChartsData | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [allRequests, setAllRequests] = useState<any[]>([]);
  const [healthPredictions, setHealthPredictions] = useState<HealthPrediction[]>([]);
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);

  // Detect language from URL
  const pathname = window.location.pathname;
  const lang = pathname.startsWith('/es') ? 'es' : 'en';

  const labels = {
    en: {
      title: 'Admin Operations Dashboard',
      subtitle: 'Enterprise Client Management & AI Insights',
      refresh: 'Refresh',
      clients: 'Clients',
      requests: 'Requests',
      revenue: 'Revenue',
      aiInsights: 'AI Insights',
      charts: 'Charts',
      copilot: 'Copilot',
      pending: 'Pending',
      pendingClassification: 'Pending AI Classification',
      pendingDesc: 'Requests awaiting AI triage',
      runTriage: 'Run AI Triage',
      allClassified: 'All requests have been classified!',
      runningTriage: 'Running AI triage...',
      classifiedSuccess: 'Request classified successfully',
      classificationFailed: 'Classification failed',
      triageFailed: 'Failed to run AI triage',
      loadFailed: 'Failed to load dashboard data',
    },
    es: {
      title: 'Panel de Operaciones Admin',
      subtitle: 'Gestión de Clientes Empresariales e Insights de IA',
      refresh: 'Actualizar',
      clients: 'Clientes',
      requests: 'Solicitudes',
      revenue: 'Ingresos',
      aiInsights: 'Insights IA',
      charts: 'Gráficos',
      copilot: 'Copiloto',
      pending: 'Pendientes',
      pendingClassification: 'Clasificación de IA Pendiente',
      pendingDesc: 'Solicitudes esperando triage de IA',
      runTriage: 'Ejecutar Triage IA',
      allClassified: '¡Todas las solicitudes han sido clasificadas!',
      runningTriage: 'Ejecutando triage de IA...',
      classifiedSuccess: 'Solicitud clasificada exitosamente',
      classificationFailed: 'Falló la clasificación',
      triageFailed: 'Falló el triage de IA',
      loadFailed: 'Falló la carga de datos del panel',
    },
  };

  const t = labels[lang];

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setIsLoading(true);
    try {
      await Promise.all([
        loadRiskSummary(),
        loadRevenueData(),
        loadChartsData(),
        loadClients(),
        loadAllRequests(),
        loadHealthPredictions(),
        loadPendingRequests(),
      ]);
    } catch (error) {
      console.error('Failed to load data:', error);
      toast.error(t.loadFailed);
    }
    setIsLoading(false);
  };

  const loadRiskSummary = async () => {
    const { data, error } = await supabase.functions.invoke('internal-dashboard-data', {
      body: { action: 'risk_summary' },
    });
    if (!error && data?.success) setRiskSummary(data.data);
  };

  const loadRevenueData = async () => {
    const { data, error } = await supabase.functions.invoke('internal-dashboard-data', {
      body: { action: 'revenue_overview' },
    });
    if (!error && data?.success) setRevenueData(data.data);
  };

  const loadChartsData = async () => {
    const { data, error } = await supabase.functions.invoke('internal-dashboard-data', {
      body: { action: 'charts_data' },
    });
    if (!error && data?.success) setChartsData(data.data);
  };

  const loadClients = async () => {
    const { data, error } = await supabase.functions.invoke('internal-dashboard-data', {
      body: { action: 'all_clients' },
    });
    if (!error && data?.success) setClients(data.data);
  };

  const loadAllRequests = async () => {
    const { data, error } = await supabase.functions.invoke('internal-dashboard-data', {
      body: { action: 'all_requests' },
    });
    if (!error && data?.success) setAllRequests(data.data);
  };

  const loadHealthPredictions = async () => {
    const { data, error } = await supabase.functions.invoke('internal-dashboard-data', {
      body: { action: 'health_predictions' },
    });
    if (!error && data?.success) setHealthPredictions(data.data);
  };

  const loadPendingRequests = async () => {
    const { data, error } = await supabase.functions.invoke('internal-dashboard-data', {
      body: { action: 'pending_requests' },
    });
    if (!error && data?.success) setPendingRequests(data.data);
  };

  const triggerAITriage = async (request: any) => {
    try {
      toast.loading(t.runningTriage);
      const { data, error } = await supabase.functions.invoke('ai-triage', {
        body: {
          request_id: request.id,
          request_type: request.request_type,
          description: request.description,
          environment: request.environment,
          priority: request.priority,
          plan: request.plan,
          email: request.email,
        },
      });
      toast.dismiss();
      if (!error && data?.success) {
        toast.success(t.classifiedSuccess);
        loadAllData();
      } else {
        toast.error(data?.error || t.classificationFailed);
      }
    } catch (err) {
      toast.dismiss();
      toast.error(t.triageFailed);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-primary" />
            <div>
              <h1 className="text-lg font-semibold">{t.title}</h1>
              <p className="text-xs text-muted-foreground">{t.subtitle}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={loadAllData} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            {t.refresh}
          </Button>
        </div>
      </header>

      <main className="container py-6 space-y-6">
        {/* Summary Cards */}
        <AdminSummaryCards riskSummary={riskSummary} revenueOverview={revenueData} lang={lang} />

        {/* Main Tabs */}
        <Tabs defaultValue="clients" className="space-y-4">
          <TabsList className="flex-wrap h-auto gap-1">
            <TabsTrigger value="clients" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              {t.clients}
            </TabsTrigger>
            <TabsTrigger value="requests" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              {t.requests}
            </TabsTrigger>
            <TabsTrigger value="revenue" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              {t.revenue}
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              {t.aiInsights}
            </TabsTrigger>
            <TabsTrigger value="charts" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              {t.charts}
            </TabsTrigger>
            <TabsTrigger value="copilot" className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              {t.copilot}
            </TabsTrigger>
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {t.pending} ({pendingRequests.length})
            </TabsTrigger>
          </TabsList>

          {/* Clients Management */}
          <TabsContent value="clients">
            <ClientsManagement clients={clients} />
          </TabsContent>

          {/* Requests Management */}
          <TabsContent value="requests">
            <RequestsManagement requests={allRequests} />
          </TabsContent>

          {/* Revenue Overview */}
          <TabsContent value="revenue">
            <RevenueOverview data={revenueData} />
          </TabsContent>

          {/* AI Insights */}
          <TabsContent value="insights">
            <AIInsightsPanel 
              healthPredictions={healthPredictions} 
              riskSummary={riskSummary}
            />
          </TabsContent>

          {/* Charts */}
          <TabsContent value="charts">
            <AdminCharts data={chartsData} />
          </TabsContent>

          {/* AI Copilot */}
          <TabsContent value="copilot">
            <AICopilotChat />
          </TabsContent>

          {/* Pending Requests */}
          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  {t.pendingClassification}
                </CardTitle>
                <CardDescription>{t.pendingDesc}</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px]">
                  <div className="space-y-3">
                    {pendingRequests.map((req) => (
                      <div key={req.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium">{req.email}</p>
                            <p className="text-sm text-muted-foreground">
                              {req.plan} • {req.request_type} • {req.priority} {lang === 'es' ? 'prioridad' : 'priority'}
                            </p>
                          </div>
                          <Button size="sm" onClick={() => triggerAITriage(req)}>
                            <Bot className="h-4 w-4 mr-2" />
                            {t.runTriage}
                          </Button>
                        </div>
                        <p className="text-sm">{req.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {lang === 'es' ? 'Enviado:' : 'Submitted:'} {new Date(req.created_at).toLocaleString(lang === 'es' ? 'es-ES' : 'en-US')}
                        </p>
                      </div>
                    ))}
                    {pendingRequests.length === 0 && (
                      <div className="text-center py-8">
                        <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-4" />
                        <p className="text-muted-foreground">{t.allClassified}</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
