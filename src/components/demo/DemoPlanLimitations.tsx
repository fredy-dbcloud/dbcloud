import { Info, Check, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLang } from '@/hooks/useLang';
import type { DemoPlan } from '@/config/demoData';

interface DemoPlanLimitationsProps {
  plan: DemoPlan;
  limitations: string[];
}

export function DemoPlanLimitations({ plan, limitations }: DemoPlanLimitationsProps) {
  const { lang } = useLang();

  const labels = {
    en: {
      title: 'Plan Scope & Boundaries',
      included: "What's Included",
      excluded: "What's Not Included",
    },
    es: {
      title: 'Alcance y Límites del Plan',
      included: 'Qué Está Incluido',
      excluded: 'Qué No Está Incluido',
    },
  };

  const t = labels[lang as keyof typeof labels] || labels.en;

  // Define exclusions per plan
  const exclusions = {
    starter: lang === 'es' ? [
      'Ejecución directa de cambios',
      'Soporte de incidentes de producción',
      'Soporte de cumplimiento',
      'Garantías de SLA',
    ] : [
      'Direct execution of changes',
      'Production incident support',
      'Compliance support',
      'SLA guarantees',
    ],
    growth: lang === 'es' ? [
      'Garantías de SLA formales',
      'Soporte 24/7',
      'Soporte de cumplimiento dedicado',
      'Respuesta garantizada a incidentes',
    ] : [
      'Formal SLA guarantees',
      '24/7 on-call support',
      'Dedicated compliance support',
      'Guaranteed incident response',
    ],
    enterprise: lang === 'es' ? [
      'Ninguna exclusión - cobertura completa',
    ] : [
      'No exclusions - full coverage',
    ],
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="h-5 w-5 text-primary" />
          {t.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Included */}
          <div>
            <h4 className="text-sm font-semibold mb-3 text-green-700 dark:text-green-400">
              {t.included}
            </h4>
            <ul className="space-y-2">
              {limitations.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Excluded */}
          <div>
            <h4 className="text-sm font-semibold mb-3 text-muted-foreground">
              {t.excluded}
            </h4>
            <ul className="space-y-2">
              {exclusions[plan].map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <X className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
