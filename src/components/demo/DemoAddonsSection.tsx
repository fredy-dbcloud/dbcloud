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
      demoNote: 'Demo: Add-on purchases are disabled in demo mode',
      extraHours: {
        name: 'Extra Hours Pack',
        description: '5 additional consulting hours for urgent needs',
        price: '$299',
      },
      incident: {
        name: 'Incident Response Pack',
        description: 'One-time emergency support for production issues',
        price: '$499',
      },
      assessment: {
        name: 'One-Time Assessment',
        description: 'Deep-dive analysis for migrations or specific projects',
        price: '$799',
      },
      purchase: 'Purchase',
      oneTime: 'One-time',
    },
    es: {
      title: 'Add-ons Disponibles',
      subtitle: 'Extiende tu plan cuando necesites más soporte',
      demoNote: 'Demo: Las compras de add-ons están deshabilitadas en modo demo',
      extraHours: {
        name: 'Paquete de Horas Extra',
        description: '5 horas adicionales de consultoría para necesidades urgentes',
        price: '$299',
      },
      incident: {
        name: 'Paquete de Respuesta a Incidentes',
        description: 'Soporte de emergencia único para problemas de producción',
        price: '$499',
      },
      assessment: {
        name: 'Evaluación Única',
        description: 'Análisis profundo para migraciones o proyectos específicos',
        price: '$799',
      },
      purchase: 'Comprar',
      oneTime: 'Único',
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
      <CardContent className="space-y-4">
        <div className="grid sm:grid-cols-3 gap-4">
          {addons.map((addon) => (
            <div key={addon.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <h4 className="font-semibold text-sm">{addon.name}</h4>
                <Badge variant="secondary" className="text-xs">
                  {t.oneTime}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{addon.description}</p>
              <div className="flex items-center justify-between pt-2">
                <span className="font-bold">{addon.price}</span>
                <Button size="sm" variant="outline" disabled>
                  {t.purchase}
                </Button>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground text-center italic">
          {t.demoNote}
        </p>
      </CardContent>
    </Card>
  );
}
