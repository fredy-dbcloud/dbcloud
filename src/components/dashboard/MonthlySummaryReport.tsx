import { 
  Clock, 
  CheckCircle2, 
  Lightbulb, 
  Target,
  TrendingUp,
  ShieldCheck,
  DollarSign,
  Info
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLang } from '@/hooks/useLang';
import { UpgradeRecommendation } from './UpgradeRecommendation';
import type { UpgradeAnalysis, PlanType } from '@/hooks/useUpgradeSignals';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface MonthlySummaryData {
  id: string;
  month: number;
  year: number;
  hours_included: number;
  hours_used: number;
  requests_completed: number;
  key_findings: string[] | null;
  recommendations: string[] | null;
  health_status: string;
  plan: string;
}

interface ValueDelivered {
  performanceImprovements?: string[];
  costOptimizations?: string[];
  risksDetected?: string[];
}

interface MonthlySummaryReportProps {
  summary: MonthlySummaryData;
  requestsPending?: number;
  requestsSubmitted?: number;
  valueDelivered?: ValueDelivered;
  upgradeAnalysis?: UpgradeAnalysis;
  currentPlan?: PlanType;
  email?: string;
}

const MONTH_NAMES = {
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  es: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
};

export function MonthlySummaryReport({ 
  summary, 
  requestsPending = 0,
  requestsSubmitted = 0,
  valueDelivered,
  upgradeAnalysis, 
  currentPlan, 
  email 
}: MonthlySummaryReportProps) {
  const { lang } = useLang();
  const usagePercentage = Math.min((summary.hours_used / summary.hours_included) * 100, 100);
  const remainingHours = Math.max(summary.hours_included - summary.hours_used, 0);
  const monthName = MONTH_NAMES[lang as keyof typeof MONTH_NAMES]?.[summary.month - 1] || '';

  const labels = {
    en: {
      accountOverview: 'Account Overview',
      plan: 'Plan',
      billingPeriod: 'Billing Period',
      hoursIncluded: 'Hours Included',
      hoursUsed: 'Hours Used',
      hoursRemaining: 'Hours Remaining',
      workActivity: 'Work Activity',
      requestsSubmitted: 'Requests Submitted',
      requestsCompleted: 'Requests Completed',
      requestsPending: 'Requests Pending',
      valueDelivered: 'Value Delivered',
      performanceImprovements: 'Performance Improvements',
      costOptimizations: 'Cost Optimizations',
      risksDetected: 'Risks Detected & Prevented',
      recommendations: 'Recommendations (Optional)',
      keyFindings: 'Key Findings',
      transparencyNotice: 'This summary is informational and reflects work performed during the stated period.',
      noValue: 'Value metrics will be available after work is completed.',
    },
    es: {
      accountOverview: 'Resumen de Cuenta',
      plan: 'Plan',
      billingPeriod: 'Período de Facturación',
      hoursIncluded: 'Horas Incluidas',
      hoursUsed: 'Horas Usadas',
      hoursRemaining: 'Horas Restantes',
      workActivity: 'Actividad de Trabajo',
      requestsSubmitted: 'Solicitudes Enviadas',
      requestsCompleted: 'Solicitudes Completadas',
      requestsPending: 'Solicitudes Pendientes',
      valueDelivered: 'Valor Entregado',
      performanceImprovements: 'Mejoras de Rendimiento',
      costOptimizations: 'Optimizaciones de Costos',
      risksDetected: 'Riesgos Detectados y Prevenidos',
      recommendations: 'Recomendaciones (Opcional)',
      keyFindings: 'Hallazgos Clave',
      transparencyNotice: 'Este resumen es informativo y refleja el trabajo realizado durante el período indicado.',
      noValue: 'Las métricas de valor estarán disponibles después de completar el trabajo.',
    },
  };

  const l = labels[lang as keyof typeof labels] || labels.en;

  const hasValueDelivered = valueDelivered && (
    (valueDelivered.performanceImprovements?.length ?? 0) > 0 ||
    (valueDelivered.costOptimizations?.length ?? 0) > 0 ||
    (valueDelivered.risksDetected?.length ?? 0) > 0
  );

  return (
    <div className="space-y-6">
      {/* Section 1: Account Overview */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            {l.accountOverview}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">{l.plan}</p>
              <p className="font-semibold capitalize">{summary.plan}</p>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">{l.billingPeriod}</p>
              <p className="font-semibold">{monthName} {summary.year}</p>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg col-span-2 md:col-span-1">
              <p className="text-xs text-muted-foreground mb-1">{l.hoursIncluded}</p>
              <p className="font-semibold">{summary.hours_included}h</p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{l.hoursUsed}</span>
              <span className="font-semibold">{summary.hours_used}h / {summary.hours_included}h</span>
            </div>
            <Progress value={usagePercentage} className="h-2" />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{l.hoursRemaining}</span>
              <span className="font-medium text-primary">{remainingHours}h</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 2: Work Activity */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            {l.workActivity}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-3xl font-bold text-primary">{requestsSubmitted || summary.requests_completed}</p>
              <p className="text-xs text-muted-foreground mt-1">{l.requestsSubmitted}</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-3xl font-bold text-green-600">{summary.requests_completed}</p>
              <p className="text-xs text-muted-foreground mt-1">{l.requestsCompleted}</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-3xl font-bold text-amber-600">{requestsPending}</p>
              <p className="text-xs text-muted-foreground mt-1">{l.requestsPending}</p>
            </div>
          </div>

          {/* Key Findings */}
          {summary.key_findings && summary.key_findings.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-medium flex items-center gap-2 mb-3">
                <Lightbulb className="h-4 w-4 text-amber-500" />
                {l.keyFindings}
              </h4>
              <ul className="space-y-2">
                {summary.key_findings.map((finding, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    {finding}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Section 3: Value Delivered */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            {l.valueDelivered}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {hasValueDelivered ? (
            <div className="space-y-4">
              {valueDelivered?.performanceImprovements && valueDelivered.performanceImprovements.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    {l.performanceImprovements}
                  </h4>
                  <ul className="space-y-1.5">
                    {valueDelivered.performanceImprovements.map((item, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {valueDelivered?.costOptimizations && valueDelivered.costOptimizations.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
                    <DollarSign className="h-4 w-4 text-blue-500" />
                    {l.costOptimizations}
                  </h4>
                  <ul className="space-y-1.5">
                    {valueDelivered.costOptimizations.map((item, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {valueDelivered?.risksDetected && valueDelivered.risksDetected.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
                    <ShieldCheck className="h-4 w-4 text-purple-500" />
                    {l.risksDetected}
                  </h4>
                  <ul className="space-y-1.5">
                    {valueDelivered.risksDetected.map((item, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <ShieldCheck className="h-4 w-4 text-purple-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground italic">{l.noValue}</p>
          )}
        </CardContent>
      </Card>

      {/* Section 4: Recommendations */}
      {summary.recommendations && summary.recommendations.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              {l.recommendations}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {summary.recommendations.map((rec, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-primary mt-1">→</span>
                  {rec}
                </li>
              ))}
            </ul>

            {/* Upgrade Recommendation if applicable */}
            {upgradeAnalysis && currentPlan && email && (
              <div className="mt-4">
                <UpgradeRecommendation
                  analysis={upgradeAnalysis}
                  currentPlan={currentPlan}
                  email={email}
                  variant="inline"
                />
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Section 5: Transparency Notice */}
      <Alert variant="default" className="bg-muted/30 border-muted">
        <Info className="h-4 w-4" />
        <AlertDescription className="text-sm text-muted-foreground">
          {l.transparencyNotice}
        </AlertDescription>
      </Alert>
    </div>
  );
}
