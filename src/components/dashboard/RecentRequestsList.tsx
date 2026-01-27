import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useLang } from '@/hooks/useLang';
import { formatDistanceToNow } from 'date-fns';
import { es, enUS } from 'date-fns/locale';
import { Bot, Clock } from 'lucide-react';

interface Request {
  id: string;
  request_type: string;
  description: string;
  status: string;
  priority: string;
  environment: string;
  created_at: string;
  ai_classification?: string | null;
  ai_effort_level?: string | null;
  ai_estimated_hours?: number | null;
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

  const getAIClassificationColor = (classification: string) => {
    switch (classification) {
      case 'advisory': return 'bg-blue-500/10 text-blue-700 border-blue-500/20';
      case 'execution': return 'bg-purple-500/10 text-purple-700 border-purple-500/20';
      case 'incident': return 'bg-red-500/10 text-red-700 border-red-500/20';
      case 'out_of_scope': return 'bg-orange-500/10 text-orange-700 border-orange-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
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
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <Badge variant="outline" className="text-xs">
                    {typeLabels[request.request_type] || request.request_type}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className={cn('text-xs border-0', status.className)}
                  >
                    {status.label}
                  </Badge>
                  {request.ai_classification && (
                    <Badge 
                      variant="outline" 
                      className={cn('text-xs flex items-center gap-1', getAIClassificationColor(request.ai_classification))}
                    >
                      <Bot className="h-3 w-3" />
                      {request.ai_classification.replace('_', ' ')}
                    </Badge>
                  )}
                  {request.ai_estimated_hours && (
                    <Badge variant="outline" className="text-xs flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      ~{request.ai_estimated_hours}h
                    </Badge>
                  )}
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
