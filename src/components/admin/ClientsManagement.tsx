import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Search, Users } from 'lucide-react';
import { HealthScoreBadge } from '@/components/dashboard/HealthScoreBadge';

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

interface ClientsManagementProps {
  clients: Client[];
  lang?: 'en' | 'es';
}

export function ClientsManagement({ clients, lang = 'en' }: ClientsManagementProps) {
  const [search, setSearch] = useState('');
  const [planFilter, setPlanFilter] = useState<string>('all');
  const [healthFilter, setHealthFilter] = useState<string>('all');

  const labels = {
    en: {
      title: 'Clients Management',
      description: 'View all clients, their plans, usage, and health status',
      searchPlaceholder: 'Search by email, name, or company...',
      allPlans: 'All Plans',
      allHealth: 'All Health',
      healthy: 'Healthy',
      atRisk: 'At Risk',
      churnRisk: 'Churn Risk',
      expansionReady: 'Expansion Ready',
      marginRisk: 'Margin Risk',
      joined: 'Joined',
      hoursUsed: 'Hours Used',
      requests: 'Requests',
      churn: 'Churn Risk',
      expansion: 'Expansion',
      noClients: 'No clients found matching your filters.',
    },
    es: {
      title: 'Gestión de Clientes',
      description: 'Ver todos los clientes, sus planes, uso y estado de salud',
      searchPlaceholder: 'Buscar por email, nombre o empresa...',
      allPlans: 'Todos los Planes',
      allHealth: 'Toda la Salud',
      healthy: 'Saludable',
      atRisk: 'En Riesgo',
      churnRisk: 'Riesgo de Abandono',
      expansionReady: 'Listo para Expansión',
      marginRisk: 'Riesgo de Margen',
      joined: 'Desde',
      hoursUsed: 'Horas Usadas',
      requests: 'Solicitudes',
      churn: 'Riesgo Abandono',
      expansion: 'Expansión',
      noClients: 'No se encontraron clientes con los filtros aplicados.',
    },
  };

  const t = labels[lang];

  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      client.email.toLowerCase().includes(search.toLowerCase()) ||
      client.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      client.company?.toLowerCase().includes(search.toLowerCase());
    
    const matchesPlan = planFilter === 'all' || client.plan === planFilter;
    const matchesHealth = healthFilter === 'all' || client.health_status === healthFilter;

    return matchesSearch && matchesPlan && matchesHealth;
  });

  const getPlanBadgeColor = (plan: string) => {
    switch (plan) {
      case 'starter': return 'bg-blue-500/10 text-blue-700 border-blue-500/20';
      case 'growth': return 'bg-purple-500/10 text-purple-700 border-purple-500/20';
      case 'enterprise': return 'bg-amber-500/10 text-amber-700 border-amber-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const mapHealthStatus = (status: string): 'healthy' | 'at_risk' | 'inactive' => {
    if (status === 'healthy' || status === 'expansion_ready') return 'healthy';
    if (status === 'at_risk' || status === 'churn_risk' || status === 'margin_risk') return 'at_risk';
    return 'inactive';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
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
          <Select value={healthFilter} onValueChange={setHealthFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Health" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.allHealth}</SelectItem>
              <SelectItem value="healthy">{t.healthy}</SelectItem>
              <SelectItem value="at_risk">{t.atRisk}</SelectItem>
              <SelectItem value="churn_risk">{t.churnRisk}</SelectItem>
              <SelectItem value="expansion_ready">{t.expansionReady}</SelectItem>
              <SelectItem value="margin_risk">{t.marginRisk}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Client List */}
        <ScrollArea className="h-[500px]">
          <div className="space-y-3">
            {filteredClients.map((client) => {
              const usagePercent = client.hours_included > 0 
                ? Math.min((client.hours_used / client.hours_included) * 100, 100)
                : 0;

              return (
                <div key={client.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{client.email}</p>
                      <p className="text-sm text-muted-foreground">
                        {client.full_name && `${client.full_name} • `}
                        {client.company && `${client.company} • `}
                        {t.joined} {new Date(client.created_at).toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US')}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getPlanBadgeColor(client.plan)}>
                        {client.plan}
                      </Badge>
                      <HealthScoreBadge status={mapHealthStatus(client.health_status)} />
                    </div>
                  </div>

                  {/* Usage */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t.hoursUsed}</span>
                      <span className="font-medium">
                        {client.hours_used}h / {client.hours_included}h
                      </span>
                    </div>
                    <Progress value={usagePercent} className="h-2" />
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">{t.requests}</p>
                      <p className="font-medium">{client.requests_completed}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">{t.churn}</p>
                      <p className="font-medium text-red-600">
                        {(client.churn_probability * 100).toFixed(0)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">{t.expansion}</p>
                      <p className="font-medium text-green-600">
                        {(client.expansion_probability * 100).toFixed(0)}%
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            {filteredClients.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                {t.noClients}
              </p>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
