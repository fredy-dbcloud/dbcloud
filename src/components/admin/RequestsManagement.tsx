import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, FileText, AlertTriangle } from 'lucide-react';

interface ClientRequest {
  id: string;
  email: string;
  plan: string;
  request_type: string;
  description: string;
  priority: string;
  status: string;
  ai_classification: string | null;
  ai_effort_level: string | null;
  ai_estimated_hours: number | null;
  ai_risk_flags: string[] | null;
  ai_reasoning: string | null;
  created_at: string;
}

interface RequestsManagementProps {
  requests: ClientRequest[];
  lang?: 'en' | 'es';
}

export function RequestsManagement({ requests, lang = 'en' }: RequestsManagementProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [planFilter, setPlanFilter] = useState<string>('all');
  const [classificationFilter, setClassificationFilter] = useState<string>('all');
  const [riskFilter, setRiskFilter] = useState<string>('all');

  const labels = {
    en: {
      title: 'Requests Management',
      description: 'View and filter all client requests by status, plan, and risk flags',
      searchPlaceholder: 'Search by email or description...',
      allStatus: 'All Status',
      pending: 'Pending',
      inProgress: 'In Progress',
      completed: 'Completed',
      cancelled: 'Cancelled',
      allPlans: 'All Plans',
      allTypes: 'All Types',
      advisory: 'Advisory',
      execution: 'Execution',
      incident: 'Incident',
      outOfScope: 'Out of Scope',
      allFlags: 'All Flags',
      scopeCreep: 'Scope Creep',
      churnRisk: 'Churn Risk',
      upgradeSignal: 'Upgrade Signal',
      marginRisk: 'Margin Risk',
      priority: 'priority',
      effort: 'effort',
      submitted: 'Submitted',
      noRequests: 'No requests found matching your filters.',
    },
    es: {
      title: 'Gestión de Solicitudes',
      description: 'Ver y filtrar todas las solicitudes por estado, plan y banderas de riesgo',
      searchPlaceholder: 'Buscar por email o descripción...',
      allStatus: 'Todos los Estados',
      pending: 'Pendiente',
      inProgress: 'En Progreso',
      completed: 'Completado',
      cancelled: 'Cancelado',
      allPlans: 'Todos los Planes',
      allTypes: 'Todos los Tipos',
      advisory: 'Asesoría',
      execution: 'Ejecución',
      incident: 'Incidente',
      outOfScope: 'Fuera de Alcance',
      allFlags: 'Todas las Banderas',
      scopeCreep: 'Scope Creep',
      churnRisk: 'Riesgo Abandono',
      upgradeSignal: 'Señal Upgrade',
      marginRisk: 'Riesgo Margen',
      priority: 'prioridad',
      effort: 'esfuerzo',
      submitted: 'Enviado',
      noRequests: 'No se encontraron solicitudes con los filtros aplicados.',
    },
  };

  const t = labels[lang];

  const filteredRequests = requests.filter(req => {
    const matchesSearch = 
      req.email.toLowerCase().includes(search.toLowerCase()) ||
      req.description.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || req.status === statusFilter;
    const matchesPlan = planFilter === 'all' || req.plan === planFilter;
    const matchesClassification = classificationFilter === 'all' || req.ai_classification === classificationFilter;
    const matchesRisk = riskFilter === 'all' || req.ai_risk_flags?.includes(riskFilter);

    return matchesSearch && matchesStatus && matchesPlan && matchesClassification && matchesRisk;
  });

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20';
      case 'in_progress': return 'bg-blue-500/10 text-blue-700 border-blue-500/20';
      case 'completed': return 'bg-green-500/10 text-green-700 border-green-500/20';
      case 'cancelled': return 'bg-red-500/10 text-red-700 border-red-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getClassificationColor = (classification: string | null) => {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          {t.title}
        </CardTitle>
        <CardDescription>
          {t.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t.searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.allStatus}</SelectItem>
              <SelectItem value="pending">{t.pending}</SelectItem>
              <SelectItem value="in_progress">{t.inProgress}</SelectItem>
              <SelectItem value="completed">{t.completed}</SelectItem>
              <SelectItem value="cancelled">{t.cancelled}</SelectItem>
            </SelectContent>
          </Select>
          <Select value={planFilter} onValueChange={setPlanFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.allPlans}</SelectItem>
              <SelectItem value="starter">Starter</SelectItem>
              <SelectItem value="growth">Growth</SelectItem>
              <SelectItem value="enterprise">Enterprise</SelectItem>
            </SelectContent>
          </Select>
          <Select value={classificationFilter} onValueChange={setClassificationFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Classification" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.allTypes}</SelectItem>
              <SelectItem value="advisory">{t.advisory}</SelectItem>
              <SelectItem value="execution">{t.execution}</SelectItem>
              <SelectItem value="incident">{t.incident}</SelectItem>
              <SelectItem value="out_of_scope">{t.outOfScope}</SelectItem>
            </SelectContent>
          </Select>
          <Select value={riskFilter} onValueChange={setRiskFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Risk Flag" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.allFlags}</SelectItem>
              <SelectItem value="scope_creep">{t.scopeCreep}</SelectItem>
              <SelectItem value="potential_churn">{t.churnRisk}</SelectItem>
              <SelectItem value="upgrade_signal">{t.upgradeSignal}</SelectItem>
              <SelectItem value="margin_risk">{t.marginRisk}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Requests List */}
        <ScrollArea className="h-[500px]">
          <div className="space-y-3">
            {filteredRequests.map((req) => (
              <div key={req.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">{req.email}</p>
                    <p className="text-sm text-muted-foreground">
                      {req.plan} • {req.request_type} • {req.priority} {t.priority}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-wrap justify-end">
                    <Badge className={getStatusBadgeColor(req.status)}>
                      {req.status}
                    </Badge>
                    {req.ai_classification && (
                      <Badge className={getClassificationColor(req.ai_classification)}>
                        {req.ai_classification}
                      </Badge>
                    )}
                    {req.ai_effort_level && (
                      <Badge variant="outline">
                        {req.ai_effort_level} {t.effort}
                      </Badge>
                    )}
                    {req.ai_estimated_hours && (
                      <Badge variant="outline">
                        ~{req.ai_estimated_hours}h
                      </Badge>
                    )}
                  </div>
                </div>
                
                <p className="text-sm line-clamp-2">{req.description}</p>
                
                {req.ai_risk_flags && req.ai_risk_flags.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {req.ai_risk_flags.map((flag, i) => (
                      <Badge key={i} className={getRiskFlagColor(flag)}>
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        {flag.replace('_', ' ')}
                      </Badge>
                    ))}
                  </div>
                )}

                {req.ai_reasoning && (
                  <p className="text-xs text-muted-foreground italic">
                    AI: {req.ai_reasoning}
                  </p>
                )}
                
                <p className="text-xs text-muted-foreground">
                  {t.submitted}: {new Date(req.created_at).toLocaleString(lang === 'es' ? 'es-ES' : 'en-US')}
                </p>
              </div>
            ))}
            {filteredRequests.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                {t.noRequests}
              </p>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
