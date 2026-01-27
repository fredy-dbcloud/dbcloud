import { Info, Check, ArrowRight } from 'lucide-react';
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
      title: 'Plan Scope & Capabilities',
      included: "What's Included",
      available: "Available via Add-ons or Enterprise",
    },
    es: {
      title: 'Alcance y Capacidades del Plan',
      included: 'Qué Está Incluido',
      available: 'Disponible vía Add-ons o Enterprise',
    },
  };

  const t = labels[lang as keyof typeof labels] || labels.en;

  // Define available add-ons per plan with positive framing
  const availableUpgrades = {
    starter: lang === 'es' ? [
      'Ejecución directa de cambios → disponible en Growth',
      'Soporte de incidentes críticos → paquetes add-on',
      'Certificaciones de cumplimiento → Enterprise',
      'SLAs garantizados → Enterprise',
    ] : [
      'Direct execution of changes → available in Growth',
      'Critical incident support → add-on packs',
      'Compliance certifications → Enterprise',
      'Guaranteed SLAs → Enterprise',
    ],
    growth: lang === 'es' ? [
      'SLAs formales garantizados → Enterprise',
      'Soporte 24/7 → Enterprise',
      'Soporte de cumplimiento dedicado → Enterprise',
      'Respuesta garantizada a incidentes → Enterprise',
    ] : [
      'Formal guaranteed SLAs → Enterprise',
      '24/7 on-call support → Enterprise',
      'Dedicated compliance support → Enterprise',
      'Guaranteed incident response → Enterprise',
    ],
    enterprise: lang === 'es' ? [
      'Cobertura completa incluida',
    ] : [
      'Full coverage included',
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

          {/* Available Upgrades */}
          <div>
            <h4 className="text-sm font-semibold mb-3 text-primary">
              {t.available}
            </h4>
            <ul className="space-y-2">
              {availableUpgrades[plan].map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <ArrowRight className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
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
