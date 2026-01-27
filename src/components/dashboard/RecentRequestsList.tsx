import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useLang } from '@/hooks/useLang';
import { formatDistanceToNow } from 'date-fns';
import { es, enUS } from 'date-fns/locale';

interface Request {
  id: string;
  request_type: string;
  description: string;
  status: string;
  priority: string;
  environment: string;
  created_at: string;
}

interface RecentRequestsListProps {
  requests: Request[];
}

export function RecentRequestsList({ requests }: RecentRequestsListProps) {
  const { lang } = useLang();
  const locale = lang === 'es' ? es : enUS;

  const statusConfig: Record<string, { label: string; className: string }> = {
    pending: {
      label: lang === 'es' ? 'Pendiente' : 'Pending',
      className: 'bg-muted text-muted-foreground',
    },
    in_progress: {
      label: lang === 'es' ? 'En Progreso' : 'In Progress',
      className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    },
    completed: {
      label: lang === 'es' ? 'Completado' : 'Completed',
      className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    },
    rejected: {
      label: lang === 'es' ? 'Rechazado' : 'Rejected',
      className: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    },
  };

  const typeLabels: Record<string, string> = {
    advisory: lang === 'es' ? 'Asesoría' : 'Advisory',
    optimization: lang === 'es' ? 'Optimización' : 'Optimization',
    change_request: lang === 'es' ? 'Cambio' : 'Change',
  };

  return (
    <div className="space-y-3">
      {requests.map((request) => {
        const status = statusConfig[request.status] || statusConfig.pending;
        const timeAgo = formatDistanceToNow(new Date(request.created_at), { 
          addSuffix: true, 
          locale 
        });

        return (
          <div 
            key={request.id}
            className="p-3 border border-border rounded-lg hover:bg-muted/30 transition-colors"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-xs">
                    {typeLabels[request.request_type] || request.request_type}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className={cn('text-xs border-0', status.className)}
                  >
                    {status.label}
                  </Badge>
                </div>
                <p className="text-sm line-clamp-2">{request.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{timeAgo}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
