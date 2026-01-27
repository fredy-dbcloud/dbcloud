import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Clock, 
  Send,
  Bot,
  Shield,
  Activity,
  DollarSign,
  RefreshCw,
  CheckCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';
import { supabase } from '@/integrations/supabase/client';

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

interface ClassifiedRequest {
  id: string;
  email: string;
  plan: string;
  request_type: string;
  description: string;
  priority: string;
  status: string;
  ai_classification: string;
  ai_effort_level: string;
  ai_estimated_hours: number;
  ai_risk_flags: string[];
  ai_reasoning: string;
  ai_classified_at: string;
  created_at: string;
}

interface HealthPrediction {
  id: string;
  email: string;
  health_status: string;
  churn_probability: number;
  expansion_probability: number;
  margin_risk_score: number;
  signals: any;
  ai_reasoning: string;
  updated_at: string;
}

interface CopilotMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function InternalDashboardPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [riskSummary, setRiskSummary] = useState<RiskSummary | null>(null);
  const [classifiedRequests, setClassifiedRequests] = useState<ClassifiedRequest[]>([]);
  const [healthPredictions, setHealthPredictions] = useState<HealthPrediction[]>([]);
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  
  // Copilot state
  const [copilotMessages, setCopilotMessages] = useState<CopilotMessage[]>([]);
  const [copilotInput, setCopilotInput] = useState('');
  const [isCopilotLoading, setIsCopilotLoading] = useState(false);

  // Load data on mount (AdminRoute already ensures auth)
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setIsLoading(true);
    try {
      await Promise.all([
        loadRiskSummary(),
        loadClassifiedRequests(),
        loadHealthPredictions(),
        loadPendingRequests(),
      ]);
    } catch (error) {
      console.error('Failed to load data:', error);
      toast.error('Failed to load dashboard data');
    }
    setIsLoading(false);
  };

  const loadRiskSummary = async () => {
    const { data, error } = await supabase.functions.invoke('internal-dashboard-data', {
      body: { action: 'risk_summary' },
    });
    if (!error && data?.success) setRiskSummary(data.data);
  };

  const loadClassifiedRequests = async () => {
    const { data, error } = await supabase.functions.invoke('internal-dashboard-data', {
      body: { action: 'classified_requests' },
    });
    if (!error && data?.success) setClassifiedRequests(data.data);
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
      toast.loading('Running AI triage...');
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
        toast.success('Request classified successfully');
        loadAllData();
      } else {
        toast.error(data?.error || 'Classification failed');
      }
    } catch (err) {
      toast.dismiss();
      toast.error('Failed to run AI triage');
    }
  };

  const sendCopilotMessage = async () => {
    if (!copilotInput.trim()) return;

    const userMessage: CopilotMessage = {
      role: 'user',
      content: copilotInput,
      timestamp: new Date(),
    };
    setCopilotMessages(prev => [...prev, userMessage]);
    setCopilotInput('');
    setIsCopilotLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-copilot', {
        body: { query: copilotInput },
      });
      
      const assistantMessage: CopilotMessage = {
        role: 'assistant',
        content: !error && data?.success ? data.answer : `Error: ${data?.error || error?.message || 'Unknown error'}`,
        timestamp: new Date(),
      };
      setCopilotMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: CopilotMessage = {
        role: 'assistant',
        content: 'Failed to get response from AI copilot.',
        timestamp: new Date(),
      };
      setCopilotMessages(prev => [...prev, errorMessage]);
    }
    setIsCopilotLoading(false);
  };

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-500/10 text-green-700 border-green-500/20';
      case 'at_risk': return 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20';
      case 'churn_risk': return 'bg-red-500/10 text-red-700 border-red-500/20';
      case 'expansion_ready': return 'bg-blue-500/10 text-blue-700 border-blue-500/20';
      case 'margin_risk': return 'bg-orange-500/10 text-orange-700 border-orange-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case 'advisory': return 'bg-blue-500/10 text-blue-700';
      case 'execution': return 'bg-purple-500/10 text-purple-700';
      case 'incident': return 'bg-red-500/10 text-red-700';
      case 'out_of_scope': return 'bg-orange-500/10 text-orange-700';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getRiskFlagColor = (flag: string) => {
    switch (flag) {
      case 'scope_creep': return 'bg-yellow-500/10 text-yellow-700';
      case 'potential_churn': return 'bg-red-500/10 text-red-700';
      case 'upgrade_signal': return 'bg-green-500/10 text-green-700';
      case 'margin_risk': return 'bg-orange-500/10 text-orange-700';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  // AdminRoute handles authentication and role check

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-primary" />
            <div>
              <h1 className="text-lg font-semibold">Internal Operations Dashboard</h1>
              <p className="text-xs text-muted-foreground">AI-Powered Decision Support</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={loadAllData} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </header>

      <main className="container py-6 space-y-6">
        {/* Risk Summary Cards */}
        {riskSummary && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Activity className="h-4 w-4" />
                  Tracked Clients
                </div>
                <p className="text-2xl font-bold mt-1">{riskSummary.total_clients_tracked}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Clock className="h-4 w-4" />
                  Classified Requests
                </div>
                <p className="text-2xl font-bold mt-1">{riskSummary.total_classified_requests}</p>
              </CardContent>
            </Card>
            <Card className="border-red-500/20 bg-red-500/5">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 text-red-700 text-sm">
                  <TrendingDown className="h-4 w-4" />
                  At Risk / Churn
                </div>
                <p className="text-2xl font-bold mt-1 text-red-700">{riskSummary.at_risk_clients}</p>
              </CardContent>
            </Card>
            <Card className="border-green-500/20 bg-green-500/5">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 text-green-700 text-sm">
                  <TrendingUp className="h-4 w-4" />
                  Expansion Ready
                </div>
                <p className="text-2xl font-bold mt-1 text-green-700">{riskSummary.expansion_ready_clients}</p>
              </CardContent>
            </Card>
            <Card className="border-orange-500/20 bg-orange-500/5">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 text-orange-700 text-sm">
                  <DollarSign className="h-4 w-4" />
                  Margin Risk
                </div>
                <p className="text-2xl font-bold mt-1 text-orange-700">{riskSummary.margin_risk_clients}</p>
              </CardContent>
            </Card>
          </div>
        )}

        <Tabs defaultValue="copilot" className="space-y-4">
          <TabsList>
            <TabsTrigger value="copilot" className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              AI Copilot
            </TabsTrigger>
            <TabsTrigger value="triage" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Request Triage
            </TabsTrigger>
            <TabsTrigger value="health" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Client Health
            </TabsTrigger>
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Pending ({pendingRequests.length})
            </TabsTrigger>
          </TabsList>

          {/* AI Copilot Tab */}
          <TabsContent value="copilot">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  Internal AI Copilot
                </CardTitle>
                <CardDescription>
                  Ask questions about clients at risk, upgrade opportunities, margin threats, and where to focus attention.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ScrollArea className="h-[400px] border rounded-lg p-4 bg-muted/30">
                  {copilotMessages.length === 0 ? (
                    <div className="text-center text-muted-foreground py-8">
                      <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p className="font-medium">Ask the AI Copilot</p>
                      <p className="text-sm mt-2">Try questions like:</p>
                      <ul className="text-sm mt-2 space-y-1">
                        <li>"Which clients are at risk this week?"</li>
                        <li>"Which clients should upgrade?"</li>
                        <li>"Which requests threaten margins?"</li>
                        <li>"Where should attention be focused?"</li>
                      </ul>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {copilotMessages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[80%] rounded-lg p-3 ${
                            msg.role === 'user' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-card border'
                          }`}>
                            {msg.role === 'assistant' ? (
                              <div className="prose prose-sm dark:prose-invert max-w-none">
                                <ReactMarkdown>{msg.content}</ReactMarkdown>
                              </div>
                            ) : (
                              <p className="text-sm">{msg.content}</p>
                            )}
                            <p className="text-xs opacity-70 mt-2">
                              {msg.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))}
                      {isCopilotLoading && (
                        <div className="flex justify-start">
                          <div className="bg-card border rounded-lg p-3">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <div className="animate-pulse">●</div>
                              <div className="animate-pulse delay-100">●</div>
                              <div className="animate-pulse delay-200">●</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </ScrollArea>
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Ask about client risks, upgrades, margins..."
                    value={copilotInput}
                    onChange={(e) => setCopilotInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendCopilotMessage();
                      }
                    }}
                    rows={2}
                    className="resize-none"
                  />
                  <Button 
                    onClick={sendCopilotMessage} 
                    disabled={isCopilotLoading || !copilotInput.trim()}
                    size="icon"
                    className="shrink-0"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Request Triage Tab */}
          <TabsContent value="triage">
            <Card>
              <CardHeader>
                <CardTitle>AI-Classified Requests</CardTitle>
                <CardDescription>View AI triage results for client requests</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px]">
                  <div className="space-y-3">
                    {classifiedRequests.map((req) => (
                      <div key={req.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium">{req.email}</p>
                            <p className="text-sm text-muted-foreground">{req.plan} plan</p>
                          </div>
                          <div className="flex gap-2">
                            <Badge className={getClassificationColor(req.ai_classification)}>
                              {req.ai_classification}
                            </Badge>
                            <Badge variant="outline">
                              {req.ai_effort_level} effort
                            </Badge>
                            <Badge variant="outline">
                              ~{req.ai_estimated_hours}h
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm">{req.description}</p>
                        {req.ai_risk_flags?.length > 0 && (
                          <div className="flex gap-2 flex-wrap">
                            {req.ai_risk_flags.map((flag, i) => (
                              <Badge key={i} className={getRiskFlagColor(flag)}>
                                <AlertTriangle className="h-3 w-3 mr-1" />
                                {flag.replace('_', ' ')}
                              </Badge>
                            ))}
                          </div>
                        )}
                        <p className="text-xs text-muted-foreground italic">
                          AI: {req.ai_reasoning}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Classified: {new Date(req.ai_classified_at).toLocaleString()}
                        </p>
                      </div>
                    ))}
                    {classifiedRequests.length === 0 && (
                      <p className="text-center text-muted-foreground py-8">
                        No classified requests yet.
                      </p>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Client Health Tab */}
          <TabsContent value="health">
            <Card>
              <CardHeader>
                <CardTitle>Client Health Predictions</CardTitle>
                <CardDescription>AI-driven health scores and predictions</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px]">
                  <div className="space-y-3">
                    {healthPredictions.map((pred) => (
                      <div key={pred.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium">{pred.email}</p>
                            <p className="text-xs text-muted-foreground">
                              Updated: {new Date(pred.updated_at).toLocaleString()}
                            </p>
                          </div>
                          <Badge className={getHealthStatusColor(pred.health_status)}>
                            {pred.health_status.replace('_', ' ')}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Churn Risk</p>
                            <p className="font-medium text-red-600">
                              {(pred.churn_probability * 100).toFixed(0)}%
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Expansion Ready</p>
                            <p className="font-medium text-green-600">
                              {(pred.expansion_probability * 100).toFixed(0)}%
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Margin Risk</p>
                            <p className="font-medium text-orange-600">
                              {(pred.margin_risk_score * 100).toFixed(0)}%
                            </p>
                          </div>
                        </div>
                        {pred.ai_reasoning && (
                          <p className="text-xs text-muted-foreground italic">
                            {pred.ai_reasoning}
                          </p>
                        )}
                      </div>
                    ))}
                    {healthPredictions.length === 0 && (
                      <p className="text-center text-muted-foreground py-8">
                        No health predictions yet. Submit and classify requests to generate predictions.
                      </p>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pending Requests Tab */}
          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Pending AI Classification</CardTitle>
                <CardDescription>Requests awaiting AI triage</CardDescription>
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
                              {req.plan} • {req.request_type} • {req.priority} priority
                            </p>
                          </div>
                          <Button size="sm" onClick={() => triggerAITriage(req)}>
                            <Bot className="h-4 w-4 mr-2" />
                            Run AI Triage
                          </Button>
                        </div>
                        <p className="text-sm">{req.description}</p>
                        <p className="text-xs text-muted-foreground">
                          Submitted: {new Date(req.created_at).toLocaleString()}
                        </p>
                      </div>
                    ))}
                    {pendingRequests.length === 0 && (
                      <div className="text-center py-8">
                        <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-4" />
                        <p className="text-muted-foreground">All requests have been classified!</p>
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
