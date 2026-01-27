import { Clock, CheckCircle2, Lightbulb, Target } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useLang } from '@/hooks/useLang';

interface MonthlySummary {
  month: number;
  year: number;
  hoursIncluded: number;
  hoursUsed: number;
  requestsCompleted: number;
  keyFindings: string[];
  recommendations: string[];
}

interface MonthlySummaryCardProps {
  summary: MonthlySummary;
}

const monthNames = {
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  es: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
};

export function MonthlySummaryCard({ summary }: MonthlySummaryCardProps) {
  const { lang } = useLang();
  const usagePercentage = (summary.hoursUsed / summary.hoursIncluded) * 100;
  const monthName = monthNames[lang as keyof typeof monthNames][summary.month - 1];

  const labels = {
    hoursUsed: lang === 'es' ? 'Horas Usadas' : 'Hours Used',
    requestsCompleted: lang === 'es' ? 'Solicitudes Completadas' : 'Requests Completed',
    keyFindings: lang === 'es' ? 'Hallazgos Clave' : 'Key Findings',
    recommendations: lang === 'es' ? 'Recomendaciones' : 'Recommendations',
  };

  return (
    <div className="space-y-5">
      {/* Period */}
      <div className="text-sm font-medium text-muted-foreground">
        {monthName} {summary.year}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <Clock className="h-3.5 w-3.5" />
            {labels.hoursUsed}
          </div>
          <p className="font-bold text-lg">
            {summary.hoursUsed}h <span className="text-sm font-normal text-muted-foreground">/ {summary.hoursIncluded}h</span>
          </p>
          <Progress value={usagePercentage} className="h-1.5 mt-2" />
        </div>
        <div className="p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <CheckCircle2 className="h-3.5 w-3.5" />
            {labels.requestsCompleted}
          </div>
          <p className="font-bold text-lg">{summary.requestsCompleted}</p>
        </div>
      </div>

      {/* Key Findings */}
      {summary.keyFindings.length > 0 && (
        <div>
          <div className="flex items-center gap-2 text-sm font-medium mb-2">
            <Lightbulb className="h-4 w-4 text-amber-500" />
            {labels.keyFindings}
          </div>
          <ul className="space-y-1.5">
            {summary.keyFindings.slice(0, 3).map((finding, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-amber-500 mt-1">•</span>
                {finding}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommendations */}
      {summary.recommendations.length > 0 && (
        <div>
          <div className="flex items-center gap-2 text-sm font-medium mb-2">
            <Target className="h-4 w-4 text-primary" />
            {labels.recommendations}
          </div>
          <ul className="space-y-1.5">
            {summary.recommendations.slice(0, 3).map((rec, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-primary mt-1">→</span>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
