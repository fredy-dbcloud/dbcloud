import { ArrowRight, TrendingUp, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLang } from '@/hooks/useLang';

interface UpgradeSuggestionProps {
  currentPlan: 'starter' | 'growth';
  usagePercentage: number;
  hasExecutionRequests: boolean;
}

export function UpgradeSuggestion({ 
  currentPlan, 
  usagePercentage, 
  hasExecutionRequests 
}: UpgradeSuggestionProps) {
  const { getLocalizedPath, lang } = useLang();

  // Determine the suggested plan
  const suggestedPlan = currentPlan === 'starter' ? 'growth' : 'enterprise';

  // Choose message based on trigger
  let message: string;
  let icon = TrendingUp;

  if (usagePercentage > 80) {
    message = lang === 'es'
      ? `Has usado más del ${Math.round(usagePercentage)}% de tus horas mensuales. El plan ${suggestedPlan === 'growth' ? 'Growth' : 'Enterprise'} podría adaptarse mejor a tus necesidades.`
      : `You've used over ${Math.round(usagePercentage)}% of your monthly hours. The ${suggestedPlan === 'growth' ? 'Growth' : 'Enterprise'} plan may better fit your needs.`;
    icon = TrendingUp;
  } else if (hasExecutionRequests) {
    message = lang === 'es'
      ? 'Notamos varias solicitudes de ejecución. El plan Growth incluye implementación práctica además de asesoría.'
      : 'We noticed several execution requests. The Growth plan includes hands-on implementation along with advisory.';
    icon = Zap;
  } else {
    message = lang === 'es'
      ? 'Basado en tu uso reciente, podrías beneficiarte de un plan diferente.'
      : 'Based on your recent usage, you may benefit from a different plan.';
  }

  const Icon = icon;

  return (
    <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold mb-1">
            {lang === 'es' ? 'Sugerencia de Plan' : 'Plan Suggestion'}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">{message}</p>
          <div className="flex flex-wrap gap-3">
            <Button size="sm" asChild>
              <a href={getLocalizedPath('/pricing')}>
                {lang === 'es' ? 'Ver Planes' : 'View Plans'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button size="sm" variant="ghost" asChild>
              <a href={getLocalizedPath('/contact')}>
                {lang === 'es' ? 'Hablar con Ventas' : 'Talk to Sales'}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
