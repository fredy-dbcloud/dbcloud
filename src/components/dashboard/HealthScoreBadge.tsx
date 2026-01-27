import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLang } from '@/hooks/useLang';

type HealthStatus = 'healthy' | 'at_risk' | 'inactive';

interface HealthScoreBadgeProps {
  status: HealthStatus;
  showIcon?: boolean;
}

export function HealthScoreBadge({ status, showIcon = true }: HealthScoreBadgeProps) {
  const { lang } = useLang();

  const config = {
    healthy: {
      label: lang === 'es' ? 'Activo' : 'Healthy',
      icon: CheckCircle2,
      className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800',
    },
    at_risk: {
      label: lang === 'es' ? 'En Riesgo' : 'At Risk',
      icon: AlertTriangle,
      className: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800',
    },
    inactive: {
      label: lang === 'es' ? 'Inactivo' : 'Inactive',
      icon: XCircle,
      className: 'bg-muted text-muted-foreground border-border',
    },
  };

  const { label, icon: Icon, className } = config[status];

  return (
    <Badge 
      variant="outline" 
      className={cn('gap-1.5 font-medium', className)}
    >
      {showIcon && <Icon className="h-3.5 w-3.5" />}
      {label}
    </Badge>
  );
}
