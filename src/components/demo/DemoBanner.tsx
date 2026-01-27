import { AlertTriangle, Eye } from 'lucide-react';
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
      description: 'Explore the exact client dashboard you will get after purchase. All features shown; write actions disabled.',
      cta: 'View Pricing',
      microcopy: 'This is an interactive preview with sample data. No real data is created or modified.',
    },
    es: {
      title: 'Entorno de Demostración – Solo Datos de Muestra',
      description: 'Explora el panel de cliente exacto que obtendrás después de la compra. Todas las funciones mostradas; acciones de escritura deshabilitadas.',
      cta: 'Ver Precios',
      microcopy: 'Esta es una vista previa interactiva con datos de muestra. No se crean ni modifican datos reales.',
    },
  };

  const t = labels[lang as keyof typeof labels] || labels.en;

  return (
    <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <div className="flex items-center gap-1">
              <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              <Eye className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
          <div>
            <p className="font-semibold text-amber-800 dark:text-amber-200">{t.title}</p>
            <p className="text-sm text-amber-700 dark:text-amber-300">{t.description}</p>
            <p className="text-xs text-amber-600 dark:text-amber-400 mt-1 italic">{t.microcopy}</p>
          </div>
        </div>
        <Button asChild size="sm" className="flex-shrink-0">
          <Link to={getLocalizedPath('/pricing')}>{t.cta}</Link>
        </Button>
      </div>
    </div>
  );
}

