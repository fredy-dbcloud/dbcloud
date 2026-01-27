import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Users, TrendingUp, CreditCard } from 'lucide-react';

interface RevenueData {
  plan_distribution: Record<string, number>;
  upgrade_signals: number;
  total_clients: number;
  mrr: number;
}

interface RevenueOverviewProps {
  data: RevenueData | null;
  lang?: 'en' | 'es';
}

export function RevenueOverview({ data, lang = 'en' }: RevenueOverviewProps) {
  const labels = {
    en: {
      loading: 'Loading revenue data...',
      title: 'Revenue Overview',
      description: 'Monthly recurring revenue and plan distribution',
      mrr: 'Monthly Recurring Revenue',
      fromClients: 'from {count} active clients',
      planDistribution: 'Plan Distribution',
      upgradeSignals: 'Upgrade Signals',
      upgradeSignalsDesc: 'Clients showing upgrade behavior',
      potentialUpgrades: 'potential upgrades',
      revenueBreakdown: 'Revenue Breakdown',
      totalMrr: 'Total MRR',
      projectedArr: 'Projected ARR',
    },
    es: {
      loading: 'Cargando datos de ingresos...',
      title: 'Resumen de Ingresos',
      description: 'Ingresos recurrentes mensuales y distribución de planes',
      mrr: 'Ingresos Recurrentes Mensuales',
      fromClients: 'de {count} clientes activos',
      planDistribution: 'Distribución de Planes',
      upgradeSignals: 'Señales de Upgrade',
      upgradeSignalsDesc: 'Clientes mostrando comportamiento de upgrade',
      potentialUpgrades: 'upgrades potenciales',
      revenueBreakdown: 'Desglose de Ingresos',
      totalMrr: 'MRR Total',
      projectedArr: 'ARR Proyectado',
    },
  };

  const t = labels[lang];

  if (!data) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          {t.loading}
        </CardContent>
      </Card>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(lang === 'es' ? 'es-ES' : 'en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const pricing = { starter: 499, growth: 1499, enterprise: 2999 };

  const planDetails = [
    { 
      name: 'Starter', 
      key: 'starter', 
      count: data.plan_distribution.starter || 0,
      price: pricing.starter,
      color: 'bg-blue-500',
    },
    { 
      name: 'Growth', 
      key: 'growth', 
      count: data.plan_distribution.growth || 0,
      price: pricing.growth,
      color: 'bg-purple-500',
    },
    { 
      name: 'Enterprise', 
      key: 'enterprise', 
      count: data.plan_distribution.enterprise || 0,
      price: pricing.enterprise,
      color: 'bg-amber-500',
    },
  ];

  const totalClients = planDetails.reduce((sum, p) => sum + p.count, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          {t.title}
        </CardTitle>
        <CardDescription>
          {t.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* MRR Card */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
          <p className="text-sm text-muted-foreground mb-1">{t.mrr}</p>
          <p className="text-4xl font-bold text-primary">{formatCurrency(data.mrr)}</p>
          <p className="text-sm text-muted-foreground mt-2">
            {t.fromClients.replace('{count}', String(data.total_clients))}
          </p>
        </div>

        {/* Plan Distribution */}
        <div className="space-y-4">
          <h4 className="font-medium flex items-center gap-2">
            <Users className="h-4 w-4" />
            {t.planDistribution}
          </h4>
          
          {/* Visual Bar */}
          <div className="flex h-4 rounded-full overflow-hidden bg-muted">
            {planDetails.map((plan) => {
              const percent = totalClients > 0 ? (plan.count / totalClients) * 100 : 0;
              return (
                <div
                  key={plan.key}
                  className={`${plan.color} transition-all`}
                  style={{ width: `${percent}%` }}
                  title={`${plan.name}: ${plan.count} clients (${percent.toFixed(0)}%)`}
                />
              );
            })}
          </div>

          {/* Plan Details */}
          <div className="grid grid-cols-3 gap-4">
            {planDetails.map((plan) => (
              <div key={plan.key} className="border rounded-lg p-4 text-center">
                <Badge className={`${plan.color} text-white mb-2`}>
                  {plan.name}
                </Badge>
                <p className="text-2xl font-bold">{plan.count}</p>
                <p className="text-sm text-muted-foreground">
                  {formatCurrency(plan.price)}/{lang === 'es' ? 'mes' : 'mo'}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  = {formatCurrency(plan.count * plan.price)}/{lang === 'es' ? 'mes' : 'mo'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Upgrade Signals */}
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium">{t.upgradeSignals}</p>
                <p className="text-sm text-muted-foreground">
                  {t.upgradeSignalsDesc}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-600">{data.upgrade_signals}</p>
              <p className="text-xs text-muted-foreground">{t.potentialUpgrades}</p>
            </div>
          </div>
        </div>

        {/* Revenue Breakdown */}
        <div className="border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <CreditCard className="h-4 w-4" />
            <h4 className="font-medium">{t.revenueBreakdown}</h4>
          </div>
          <div className="space-y-2 text-sm">
            {planDetails.map((plan) => (
              <div key={plan.key} className="flex justify-between">
                <span className="text-muted-foreground">{plan.name} ({plan.count} × {formatCurrency(plan.price)})</span>
                <span className="font-medium">{formatCurrency(plan.count * plan.price)}</span>
              </div>
            ))}
            <div className="border-t pt-2 flex justify-between font-medium">
              <span>{t.totalMrr}</span>
              <span className="text-primary">{formatCurrency(data.mrr)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>{t.projectedArr}</span>
              <span>{formatCurrency(data.mrr * 12)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
