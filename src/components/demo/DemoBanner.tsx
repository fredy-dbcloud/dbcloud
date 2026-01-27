import { Eye, CheckCircle } from 'lucide-react';
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
      title: 'Demo Environment – Same Experience as Production',
      description: 'Explore the exact client dashboard you\'ll receive after purchase. All features are fully functional; sample data is used for demonstration.',
      cta: 'View Pricing',
      microcopy: 'Interactive preview with sample data. No real data is created or modified.',
    },
    es: {
      title: 'Entorno de Demostración – Misma Experiencia que Producción',
      description: 'Explora el panel de cliente exacto que recibirás después de la compra. Todas las funciones están activas; se usan datos de muestra para la demostración.',
      cta: 'Ver Precios',
      microcopy: 'Vista previa interactiva con datos de muestra. No se crean ni modifican datos reales.',
    },
  };

  const t = labels[lang as keyof typeof labels] || labels.en;

  return (
    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <div className="flex items-center gap-1">
              <Eye className="h-5 w-5 text-primary" />
              <CheckCircle className="h-4 w-4 text-primary" />
            </div>
          </div>
          <div>
            <p className="font-semibold text-foreground">{t.title}</p>
            <p className="text-sm text-muted-foreground">{t.description}</p>
            <p className="text-xs text-muted-foreground mt-1 italic">{t.microcopy}</p>
          </div>
        </div>
        <Button asChild size="sm" className="flex-shrink-0">
          <Link to={getLocalizedPath('/pricing')}>{t.cta}</Link>
        </Button>
      </div>
    </div>
  );
}

