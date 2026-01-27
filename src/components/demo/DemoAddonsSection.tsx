import { Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLang } from '@/hooks/useLang';
import type { DemoPlan } from '@/config/demoData';

interface DemoAddonsSectionProps {
  plan: DemoPlan;
}

export function DemoAddonsSection({ plan }: DemoAddonsSectionProps) {
  const { lang } = useLang();

  const labels = {
    en: {
      title: 'Available Add-ons',
      subtitle: 'Extend your plan when you need more support',
      extraHours: {
        name: 'Additional Hours Pack',
        description: 'Additional consulting for planned work, optimizations, continuous improvements, or tasks outside the monthly plan scope.',
        features: [
          'Up to 2 hours of Cloud & AI consulting',
          'Non-urgent work only',
          'Applied to current billing cycle only',
          'Subject to standard availability',
        ],
        price: '$399',
      },
      incident: {
        name: 'Critical Incident Response (Urgent)',
        description: 'Priority intervention for initial diagnosis and stabilization of a critical production incident.',
        features: [
          'Up to 60 minutes of priority intervention',
          'Focus on containment and diagnosis',
          'Does not include full resolution or continuous monitoring',
        ],
        upsellNote: 'For environments requiring 24/7 SLA and continuous support, we recommend Enterprise.',
        price: '$599',
      },
      assessment: {
        name: 'One-Time Technical Assessment',
        description: 'Deep technical analysis for migrations, Cloud architecture, databases, or specific projects with clear deliverables.',
        features: [
          'Pre-defined scope',
          'Documented deliverables',
          'Actionable recommendations',
          'Outcome-based service, not hourly',
        ],
        price: '$799',
      },
      purchase: 'Purchase',
      oneTime: 'One-time',
      infoNote: 'Additional hours are designed for planned work. Critical incident response is offered as a separate specialized service.',
      warningNote: 'Production incidents with 24/7 SLA requirements are not included in Starter or Growth and require advanced plans.',
    },
    es: {
      title: 'Add-ons Disponibles',
      subtitle: 'Extiende tu plan cuando necesites más soporte',
      extraHours: {
        name: 'Paquete de Horas Adicionales',
        description: 'Consultoría adicional para trabajo planificado, optimizaciones, mejoras continuas o tareas fuera del alcance mensual del plan.',
        features: [
          'Hasta 2 horas de consultoría Cloud & AI',
          'Trabajo no urgente',
          'Aplicable solo al ciclo de facturación actual',
          'Sujeto a disponibilidad estándar',
        ],
        price: '$399',
      },
      incident: {
        name: 'Atención de Incidente Crítico (Urgente)',
        description: 'Intervención prioritaria para diagnóstico inicial y estabilización de un incidente crítico en producción.',
        features: [
          'Hasta 60 minutos de intervención prioritaria',
          'Enfoque en contención y diagnóstico',
          'No incluye resolución completa ni monitoreo continuo',
        ],
        upsellNote: 'Para entornos con SLA 24/7 y soporte continuo, recomendamos el plan Enterprise.',
        price: '$599',
      },
      assessment: {
        name: 'Evaluación Técnica Única',
        description: 'Análisis técnico profundo para migraciones, arquitectura Cloud, bases de datos o proyectos específicos con entregables claros.',
        features: [
          'Alcance definido previamente',
          'Entregables documentados',
          'Recomendaciones accionables',
          'Servicio basado en resultados, no en horas',
        ],
        price: '$799',
      },
      purchase: 'Comprar',
      oneTime: 'Único',
      infoNote: 'Las horas adicionales están diseñadas para trabajo planificado. La atención de incidentes críticos se ofrece como un servicio especializado independiente.',
      warningNote: 'Los incidentes de producción con requerimientos de SLA 24/7 no están incluidos en Starter o Growth y requieren planes avanzados.',
    },
  };

  const t = labels[lang as keyof typeof labels] || labels.en;

  // Only show addons for non-enterprise plans
  if (plan === 'enterprise') {
    return null;
  }

  const addons = [
    { ...t.extraHours, id: 'extra_hours' },
    { ...t.incident, id: 'incident' },
    { ...t.assessment, id: 'assessment' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5 text-primary" />
          {t.title}
        </CardTitle>
        <CardDescription>{t.subtitle}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid sm:grid-cols-3 gap-4">
          {addons.map((addon) => (
            <div key={addon.id} className="border rounded-lg p-4 space-y-3 flex flex-col">
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-semibold text-sm leading-tight">{addon.name}</h4>
                <Badge variant="secondary" className="text-xs flex-shrink-0">
                  {t.oneTime}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{addon.description}</p>
              {'features' in addon && addon.features && (
                <ul className="text-xs text-muted-foreground space-y-1">
                  {addon.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
              {'upsellNote' in addon && addon.upsellNote && (
                <p className="text-xs text-primary/80 italic border-l-2 border-primary/30 pl-2">
                  {addon.upsellNote}
                </p>
              )}
              <div className="flex items-center justify-between pt-2 mt-auto">
                <span className="font-bold text-lg">{addon.price}</span>
                <Button size="sm" variant="outline" disabled>
                  {t.purchase}
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Info Note */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
          <p className="text-xs text-primary">
            {t.infoNote}
          </p>
        </div>
        
        {/* Warning Note */}
        <div className="bg-muted/50 border border-border rounded-lg p-3">
          <p className="text-xs text-muted-foreground">
            {t.warningNote}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
