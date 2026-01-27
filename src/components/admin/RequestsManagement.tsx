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
}

export function RequestsManagement({ requests }: RequestsManagementProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [planFilter, setPlanFilter] = useState<string>('all');
  const [classificationFilter, setClassificationFilter] = useState<string>('all');
  const [riskFilter, setRiskFilter] = useState<string>('all');

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
          Requests Management
        </CardTitle>
        <CardDescription>
          View and filter all client requests by status, plan, and risk flags
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by email or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Select value={planFilter} onValueChange={setPlanFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Plans</SelectItem>
              <SelectItem value="starter">Starter</SelectItem>
              <SelectItem value="growth">Growth</SelectItem>
              <SelectItem value="enterprise">Enterprise</SelectItem>
            </SelectContent>
          </Select>
          <Select value={classificationFilter} onValueChange={setClassificationFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Classification" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="advisory">Advisory</SelectItem>
              <SelectItem value="execution">Execution</SelectItem>
              <SelectItem value="incident">Incident</SelectItem>
              <SelectItem value="out_of_scope">Out of Scope</SelectItem>
            </SelectContent>
          </Select>
          <Select value={riskFilter} onValueChange={setRiskFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Risk Flag" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Flags</SelectItem>
              <SelectItem value="scope_creep">Scope Creep</SelectItem>
              <SelectItem value="potential_churn">Churn Risk</SelectItem>
              <SelectItem value="upgrade_signal">Upgrade Signal</SelectItem>
              <SelectItem value="margin_risk">Margin Risk</SelectItem>
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
                      {req.plan} • {req.request_type} • {req.priority} priority
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
                        {req.ai_effort_level} effort
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
                  Submitted: {new Date(req.created_at).toLocaleString()}
                </p>
              </div>
            ))}
            {filteredRequests.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No requests found matching your filters.
              </p>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
