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
}

export function RevenueOverview({ data }: RevenueOverviewProps) {
  if (!data) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          Loading revenue data...
        </CardContent>
      </Card>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
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
          Revenue Overview
        </CardTitle>
        <CardDescription>
          Monthly recurring revenue and plan distribution
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* MRR Card */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
          <p className="text-sm text-muted-foreground mb-1">Monthly Recurring Revenue</p>
          <p className="text-4xl font-bold text-primary">{formatCurrency(data.mrr)}</p>
          <p className="text-sm text-muted-foreground mt-2">
            from {data.total_clients} active clients
          </p>
        </div>

        {/* Plan Distribution */}
        <div className="space-y-4">
          <h4 className="font-medium flex items-center gap-2">
            <Users className="h-4 w-4" />
            Plan Distribution
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
                  {formatCurrency(plan.price)}/mo
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  = {formatCurrency(plan.count * plan.price)}/mo
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
                <p className="font-medium">Upgrade Signals</p>
                <p className="text-sm text-muted-foreground">
                  Clients showing upgrade behavior
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-600">{data.upgrade_signals}</p>
              <p className="text-xs text-muted-foreground">potential upgrades</p>
            </div>
          </div>
        </div>

        {/* Revenue Breakdown */}
        <div className="border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <CreditCard className="h-4 w-4" />
            <h4 className="font-medium">Revenue Breakdown</h4>
          </div>
          <div className="space-y-2 text-sm">
            {planDetails.map((plan) => (
              <div key={plan.key} className="flex justify-between">
                <span className="text-muted-foreground">{plan.name} ({plan.count} × {formatCurrency(plan.price)})</span>
                <span className="font-medium">{formatCurrency(plan.count * plan.price)}</span>
              </div>
            ))}
            <div className="border-t pt-2 flex justify-between font-medium">
              <span>Total MRR</span>
              <span className="text-primary">{formatCurrency(data.mrr)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Projected ARR</span>
              <span>{formatCurrency(data.mrr * 12)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
