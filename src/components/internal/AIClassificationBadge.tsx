import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Bot, Clock, CheckCircle } from 'lucide-react';

interface AIClassificationBadgeProps {
  classification?: string | null;
  effortLevel?: string | null;
  estimatedHours?: number | null;
  riskFlags?: string[] | null;
  reasoning?: string | null;
  isClassifying?: boolean;
}

export function AIClassificationBadge({
  classification,
  effortLevel,
  estimatedHours,
  riskFlags,
  reasoning,
  isClassifying,
}: AIClassificationBadgeProps) {
  if (isClassifying) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground animate-pulse">
        <Bot className="h-4 w-4" />
        <span>AI analyzing request...</span>
      </div>
    );
  }

  if (!classification) {
    return null;
  }

  const getClassificationColor = (cls: string) => {
    switch (cls) {
      case 'advisory': return 'bg-blue-500/10 text-blue-700 border-blue-500/20';
      case 'execution': return 'bg-purple-500/10 text-purple-700 border-purple-500/20';
      case 'incident': return 'bg-red-500/10 text-red-700 border-red-500/20';
      case 'out_of_scope': return 'bg-orange-500/10 text-orange-700 border-orange-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'low': return 'bg-green-500/10 text-green-700';
      case 'medium': return 'bg-yellow-500/10 text-yellow-700';
      case 'high': return 'bg-red-500/10 text-red-700';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getRiskFlagColor = (flag: string) => {
    switch (flag) {
      case 'scope_creep': return 'bg-yellow-500/10 text-yellow-700';
      case 'potential_churn': return 'bg-red-500/10 text-red-700';
      case 'upgrade_signal': return 'bg-green-500/10 text-green-700';
      case 'margin_risk': return 'bg-orange-500/10 text-orange-700';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader className="py-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Bot className="h-4 w-4 text-primary" />
          AI Classification
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        <div className="flex flex-wrap gap-2">
          <Badge className={getClassificationColor(classification)}>
            {classification.replace('_', ' ')}
          </Badge>
          {effortLevel && (
            <Badge className={getEffortColor(effortLevel)}>
              {effortLevel} effort
            </Badge>
          )}
          {estimatedHours && (
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              ~{estimatedHours}h
            </Badge>
          )}
        </div>

        {riskFlags && riskFlags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {riskFlags.map((flag, i) => (
              <Badge key={i} className={getRiskFlagColor(flag)}>
                <AlertTriangle className="h-3 w-3 mr-1" />
                {flag.replace('_', ' ')}
              </Badge>
            ))}
          </div>
        )}

        {reasoning && (
          <p className="text-xs text-muted-foreground italic">
            {reasoning}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

interface AIClassificationInlineProps {
  classification?: string | null;
  effortLevel?: string | null;
  estimatedHours?: number | null;
}

export function AIClassificationInline({
  classification,
  effortLevel,
  estimatedHours,
}: AIClassificationInlineProps) {
  if (!classification) return null;

  const getClassificationColor = (cls: string) => {
    switch (cls) {
      case 'advisory': return 'bg-blue-500/10 text-blue-700';
      case 'execution': return 'bg-purple-500/10 text-purple-700';
      case 'incident': return 'bg-red-500/10 text-red-700';
      case 'out_of_scope': return 'bg-orange-500/10 text-orange-700';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="flex items-center gap-2 text-xs">
      <Badge className={`${getClassificationColor(classification)} text-xs`}>
        {classification.replace('_', ' ')}
      </Badge>
      {estimatedHours && (
        <span className="text-muted-foreground">~{estimatedHours}h</span>
      )}
    </div>
  );
}
