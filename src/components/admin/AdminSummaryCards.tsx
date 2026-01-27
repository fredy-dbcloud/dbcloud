import { Card, CardContent } from '@/components/ui/card';
import { 
  Activity, 
  Clock, 
  TrendingDown, 
  TrendingUp, 
  DollarSign,
  Users,
  CreditCard,
} from 'lucide-react';

interface RiskSummary {
  total_classified_requests: number;
  total_clients_tracked: number;
  at_risk_clients: number;
  expansion_ready_clients: number;
  margin_risk_clients: number;
}

interface RevenueOverview {
  plan_distribution: Record<string, number>;
  upgrade_signals: number;
  total_clients: number;
  mrr: number;
}

interface AdminSummaryCardsProps {
  riskSummary: RiskSummary | null;
  revenueOverview: RevenueOverview | null;
}

export function AdminSummaryCards({ riskSummary, revenueOverview }: AdminSummaryCardsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
      {/* Client Stats */}
      <Card>
        <CardContent className="pt-4">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Users className="h-4 w-4" />
            Total Clients
          </div>
          <p className="text-2xl font-bold mt-1">{revenueOverview?.total_clients || 0}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-4">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Activity className="h-4 w-4" />
            Tracked
          </div>
          <p className="text-2xl font-bold mt-1">{riskSummary?.total_clients_tracked || 0}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-4">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Clock className="h-4 w-4" />
            Classified
          </div>
          <p className="text-2xl font-bold mt-1">{riskSummary?.total_classified_requests || 0}</p>
        </CardContent>
      </Card>

      {/* Revenue */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-4">
          <div className="flex items-center gap-2 text-primary text-sm">
            <CreditCard className="h-4 w-4" />
            MRR
          </div>
          <p className="text-2xl font-bold mt-1 text-primary">
            {formatCurrency(revenueOverview?.mrr || 0)}
          </p>
        </CardContent>
      </Card>

      {/* Risk Indicators */}
      <Card className="border-red-500/20 bg-red-500/5">
        <CardContent className="pt-4">
          <div className="flex items-center gap-2 text-red-700 dark:text-red-400 text-sm">
            <TrendingDown className="h-4 w-4" />
            At Risk
          </div>
          <p className="text-2xl font-bold mt-1 text-red-700 dark:text-red-400">
            {riskSummary?.at_risk_clients || 0}
          </p>
        </CardContent>
      </Card>

      <Card className="border-green-500/20 bg-green-500/5">
        <CardContent className="pt-4">
          <div className="flex items-center gap-2 text-green-700 dark:text-green-400 text-sm">
            <TrendingUp className="h-4 w-4" />
            Expansion
          </div>
          <p className="text-2xl font-bold mt-1 text-green-700 dark:text-green-400">
            {riskSummary?.expansion_ready_clients || 0}
          </p>
        </CardContent>
      </Card>

      <Card className="border-orange-500/20 bg-orange-500/5">
        <CardContent className="pt-4">
          <div className="flex items-center gap-2 text-orange-700 dark:text-orange-400 text-sm">
            <DollarSign className="h-4 w-4" />
            Margin Risk
          </div>
          <p className="text-2xl font-bold mt-1 text-orange-700 dark:text-orange-400">
            {riskSummary?.margin_risk_clients || 0}
          </p>
        </CardContent>
      </Card>

      <Card className="border-blue-500/20 bg-blue-500/5">
        <CardContent className="pt-4">
          <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 text-sm">
            <TrendingUp className="h-4 w-4" />
            Upgrade Signals
          </div>
          <p className="text-2xl font-bold mt-1 text-blue-700 dark:text-blue-400">
            {revenueOverview?.upgrade_signals || 0}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
