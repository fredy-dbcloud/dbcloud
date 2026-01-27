import { Bot, TrendingUp, TrendingDown, Minus, Shield, Zap, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLang } from '@/hooks/useLang';
import { cn } from '@/lib/utils';

interface AIInsights {
  upgradeReadiness: string;
  churnRisk: string;
  usageTrend: string;
  signals: string[];
}

interface DemoAIInsightsProps {
  insights: AIInsights;
}

export function DemoAIInsights({ insights }: DemoAIInsightsProps) {
  const { lang } = useLang();

  const labels = {
    en: {
      title: 'AI-Powered Insights',
      subtitle: 'Automated analysis of account health and trends',
      upgradeReadiness: 'Upgrade Readiness',
      churnRisk: 'Engagement Risk',
      usageTrend: 'Usage Trend',
      signals: 'Key Signals',
      demoNote: 'Demo: AI insights shown for demonstration purposes only',
    },
    es: {
      title: 'Insights Impulsados por IA',
      subtitle: 'Análisis automatizado de salud de cuenta y tendencias',
      upgradeReadiness: 'Preparación para Upgrade',
      churnRisk: 'Riesgo de Engagement',
      usageTrend: 'Tendencia de Uso',
      signals: 'Señales Clave',
      demoNote: 'Demo: Los insights de IA se muestran solo con fines demostrativos',
    },
  };

  const t = labels[lang as keyof typeof labels] || labels.en;

  const getReadinessConfig = (value: string) => {
    switch (value) {
      case 'high':
        return { label: lang === 'es' ? 'Alto' : 'High', className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400', icon: Zap };
      case 'moderate':
        return { label: lang === 'es' ? 'Moderado' : 'Moderate', className: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400', icon: Minus };
      case 'low':
        return { label: lang === 'es' ? 'Bajo' : 'Low', className: 'bg-muted text-muted-foreground', icon: Minus };
      default:
        return { label: 'N/A', className: 'bg-muted text-muted-foreground', icon: Minus };
    }
  };

  const getRiskConfig = (value: string) => {
    switch (value) {
      case 'low':
        return { label: lang === 'es' ? 'Bajo' : 'Low', className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400', icon: Shield };
      case 'medium':
        return { label: lang === 'es' ? 'Medio' : 'Medium', className: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400', icon: AlertTriangle };
      case 'high':
        return { label: lang === 'es' ? 'Alto' : 'High', className: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400', icon: AlertTriangle };
      default:
        return { label: value, className: 'bg-muted text-muted-foreground', icon: Minus };
    }
  };

  const getTrendConfig = (value: string) => {
    switch (value) {
      case 'increasing':
        return { label: lang === 'es' ? 'Aumentando' : 'Increasing', className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400', icon: TrendingUp };
      case 'stable':
      case 'consistent':
        return { label: lang === 'es' ? 'Estable' : 'Stable', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400', icon: Minus };
      case 'decreasing':
        return { label: lang === 'es' ? 'Disminuyendo' : 'Decreasing', className: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400', icon: TrendingDown };
      default:
        return { label: value, className: 'bg-muted text-muted-foreground', icon: Minus };
    }
  };

  const readiness = getReadinessConfig(insights.upgradeReadiness);
  const risk = getRiskConfig(insights.churnRisk);
  const trend = getTrendConfig(insights.usageTrend);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          {t.title}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{t.subtitle}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-3 bg-muted/50 rounded-lg text-center">
            <p className="text-xs text-muted-foreground mb-2">{t.upgradeReadiness}</p>
            <Badge className={cn('gap-1', readiness.className)}>
              <readiness.icon className="h-3 w-3" />
              {readiness.label}
            </Badge>
          </div>
          <div className="p-3 bg-muted/50 rounded-lg text-center">
            <p className="text-xs text-muted-foreground mb-2">{t.churnRisk}</p>
            <Badge className={cn('gap-1', risk.className)}>
              <risk.icon className="h-3 w-3" />
              {risk.label}
            </Badge>
          </div>
          <div className="p-3 bg-muted/50 rounded-lg text-center">
            <p className="text-xs text-muted-foreground mb-2">{t.usageTrend}</p>
            <Badge className={cn('gap-1', trend.className)}>
              <trend.icon className="h-3 w-3" />
              {trend.label}
            </Badge>
          </div>
        </div>

        {/* Key Signals */}
        <div>
          <p className="text-sm font-medium mb-3">{t.signals}</p>
          <ul className="space-y-2">
            {insights.signals.map((signal, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Bot className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                {signal}
              </li>
            ))}
          </ul>
        </div>

        {/* Demo Note */}
        <p className="text-xs text-muted-foreground italic pt-2 border-t border-border">
          {t.demoNote}
        </p>
      </CardContent>
    </Card>
  );
}
