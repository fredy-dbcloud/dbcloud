import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line,
} from 'recharts';
import { BarChart3, PieChart as PieChartIcon, TrendingUp, Clock } from 'lucide-react';

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

interface AdminChartsProps {
  data: ChartsData | null;
  lang?: 'en' | 'es';
}

const PLAN_COLORS = {
  starter: 'hsl(var(--chart-1))',
  growth: 'hsl(var(--chart-2))',
  enterprise: 'hsl(var(--chart-3))',
};

export function AdminCharts({ data, lang = 'en' }: AdminChartsProps) {
  const labels = {
    en: {
      loading: 'Loading charts...',
      monthlySignups: 'Monthly Client Signups',
      newClients: 'New clients per month',
      requestsByPlan: 'Requests by Plan',
      requestsDistribution: 'Distribution of requests across plans',
      hoursConsumed: 'Hours Consumed vs Included',
      hoursDescription: 'Monthly hours utilization across all clients',
      hoursUsed: 'Hours Used',
      hoursIncluded: 'Hours Included',
      clients: 'Clients',
    },
    es: {
      loading: 'Cargando gráficos...',
      monthlySignups: 'Registros Mensuales de Clientes',
      newClients: 'Nuevos clientes por mes',
      requestsByPlan: 'Solicitudes por Plan',
      requestsDistribution: 'Distribución de solicitudes entre planes',
      hoursConsumed: 'Horas Consumidas vs Incluidas',
      hoursDescription: 'Utilización mensual de horas entre todos los clientes',
      hoursUsed: 'Horas Usadas',
      hoursIncluded: 'Horas Incluidas',
      clients: 'Clientes',
    },
  };

  const t = labels[lang];

  if (!data) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            {t.loading}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Transform monthly signups for chart
  const signupsData = Object.entries(data.monthly_signups)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6) // Last 6 months
    .map(([month, count]) => ({
      month: month.slice(5), // MM format
      clients: count,
    }));

  // Transform requests by plan for pie chart
  const requestsPieData = Object.entries(data.requests_by_plan).map(([plan, count]) => ({
    name: plan.charAt(0).toUpperCase() + plan.slice(1),
    value: count,
    fill: PLAN_COLORS[plan as keyof typeof PLAN_COLORS] || 'hsl(var(--muted))',
  }));

  // Aggregate hours data by month
  const hoursAggregated = data.hours_data.reduce((acc, item) => {
    if (!acc[item.month]) {
      acc[item.month] = { month: item.month, hours_used: 0, hours_included: 0 };
    }
    acc[item.month].hours_used += item.hours_used;
    acc[item.month].hours_included += item.hours_included;
    return acc;
  }, {} as Record<string, { month: string; hours_used: number; hours_included: number }>);

  const hoursChartData = Object.values(hoursAggregated)
    .sort((a, b) => a.month.localeCompare(b.month))
    .slice(-6);

  const chartConfig = {
    clients: { label: t.clients, color: 'hsl(var(--chart-1))' },
    hours_used: { label: t.hoursUsed, color: 'hsl(var(--chart-2))' },
    hours_included: { label: t.hoursIncluded, color: 'hsl(var(--chart-3))' },
    starter: { label: 'Starter', color: 'hsl(var(--chart-1))' },
    growth: { label: 'Growth', color: 'hsl(var(--chart-2))' },
    enterprise: { label: 'Enterprise', color: 'hsl(var(--chart-3))' },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Monthly Active Clients */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingUp className="h-4 w-4" />
            {t.monthlySignups}
          </CardTitle>
          <CardDescription>{t.newClients}</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px]">
            <BarChart data={signupsData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar 
                dataKey="clients" 
                fill="hsl(var(--primary))" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Requests by Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <PieChartIcon className="h-4 w-4" />
            {t.requestsByPlan}
          </CardTitle>
          <CardDescription>{t.requestsDistribution}</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px]">
            <PieChart>
              <Pie
                data={requestsPieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {requestsPieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Hours Consumed vs Included */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Clock className="h-4 w-4" />
            {t.hoursConsumed}
          </CardTitle>
          <CardDescription>{t.hoursDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px]">
            <LineChart data={hoursChartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Line 
                type="monotone" 
                dataKey="hours_used" 
                stroke="hsl(var(--chart-2))" 
                strokeWidth={2}
                dot={{ r: 4 }}
                name={t.hoursUsed}
              />
              <Line 
                type="monotone" 
                dataKey="hours_included" 
                stroke="hsl(var(--chart-3))" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 4 }}
                name={t.hoursIncluded}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
