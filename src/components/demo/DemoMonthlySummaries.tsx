import { Calendar, Clock, CheckCircle2, Lightbulb, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useLang } from '@/hooks/useLang';
import { monthNames } from '@/config/demoData';

interface Summary {
  month: number;
  year: number;
  hoursIncluded: number;
  hoursUsed: number;
  requestsCompleted: number;
  keyFindings: string[];
  recommendations: string[];
}

interface DemoMonthlySummariesProps {
  summaries: Summary[];
}

export function DemoMonthlySummaries({ summaries }: DemoMonthlySummariesProps) {
  const { lang } = useLang();

  const labels = {
    en: {
      title: 'Historical Monthly Summaries',
      hoursUsed: 'Hours Used',
      requestsCompleted: 'Requests Completed',
      keyFindings: 'Key Improvements',
      recommendations: 'Recommendations',
    },
    es: {
      title: 'Resúmenes Mensuales Históricos',
      hoursUsed: 'Horas Usadas',
      requestsCompleted: 'Solicitudes Completadas',
      keyFindings: 'Mejoras Clave',
      recommendations: 'Recomendaciones',
    },
  };

  const t = labels[lang as keyof typeof labels] || labels.en;
  const months = monthNames[lang as keyof typeof monthNames] || monthNames.en;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          {t.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {summaries.map((summary, index) => {
            const usagePercentage = (summary.hoursUsed / summary.hoursIncluded) * 100;
            const monthName = months[summary.month - 1];

            return (
              <div 
                key={`${summary.year}-${summary.month}`}
                className={`p-4 rounded-lg border border-border ${index === 0 ? 'bg-muted/30' : ''}`}
              >
                {/* Month Header */}
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold">
                    {monthName} {summary.year}
                  </h4>
                  {index === 0 && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                      {lang === 'es' ? 'Más Reciente' : 'Most Recent'}
                    </span>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-3 bg-background rounded-lg">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                      <Clock className="h-3.5 w-3.5" />
                      {t.hoursUsed}
                    </div>
                    <p className="font-bold">
                      {summary.hoursUsed}h <span className="text-sm font-normal text-muted-foreground">/ {summary.hoursIncluded}h</span>
                    </p>
                    <Progress value={usagePercentage} className="h-1.5 mt-2" />
                  </div>
                  <div className="p-3 bg-background rounded-lg">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      {t.requestsCompleted}
                    </div>
                    <p className="font-bold text-lg">{summary.requestsCompleted}</p>
                  </div>
                </div>

                {/* Findings & Recommendations */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Key Findings */}
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium mb-2">
                      <Lightbulb className="h-4 w-4 text-amber-500" />
                      {t.keyFindings}
                    </div>
                    <ul className="space-y-1">
                      {summary.keyFindings.slice(0, 2).map((finding, fIndex) => (
                        <li key={fIndex} className="text-xs text-muted-foreground flex items-start gap-2">
                          <span className="text-amber-500 mt-0.5">•</span>
                          <span className="line-clamp-2">{finding}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium mb-2">
                      <Target className="h-4 w-4 text-primary" />
                      {t.recommendations}
                    </div>
                    <ul className="space-y-1">
                      {summary.recommendations.slice(0, 2).map((rec, rIndex) => (
                        <li key={rIndex} className="text-xs text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-0.5">→</span>
                          <span className="line-clamp-2">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
