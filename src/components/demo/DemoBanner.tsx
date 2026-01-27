import { AlertTriangle } from 'lucide-react';
import { useLang } from '@/hooks/useLang';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import type { DemoPlan } from '@/config/demoData';

interface DemoBannerProps {
  plan: DemoPlan;
}

export function DemoBanner({ plan }: DemoBannerProps) {
  const { lang, getLocalizedPath } = useLang();

  const labels = {
    en: {
      title: 'Demo Environment – Sample Data Only',
      description: 'This is an interactive preview. No real data is being created or modified.',
      cta: 'View Pricing',
    },
    es: {
      title: 'Entorno de Demostración – Solo Datos de Muestra',
      description: 'Esta es una vista previa interactiva. No se crean ni modifican datos reales.',
      cta: 'Ver Precios',
    },
  };

  const t = labels[lang as keyof typeof labels] || labels.en;

  return (
    <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-800 dark:text-amber-200">{t.title}</p>
            <p className="text-sm text-amber-700 dark:text-amber-300">{t.description}</p>
          </div>
        </div>
        <Button asChild size="sm" className="flex-shrink-0">
          <Link to={getLocalizedPath('/pricing')}>{t.cta}</Link>
        </Button>
      </div>
    </div>
  );
}
