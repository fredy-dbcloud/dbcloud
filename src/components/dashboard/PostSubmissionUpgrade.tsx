import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLang } from '@/hooks/useLang';
import { siteConfig } from '@/config/site';
import type { UpgradeAnalysis, PlanType } from '@/hooks/useUpgradeSignals';

interface PostSubmissionUpgradeProps {
  analysis: UpgradeAnalysis;
  currentPlan: PlanType;
  email: string;
  onUpgradeClick: () => void;
}

const labels = {
  en: {
    message: 'Based on your recent usage, your needs may exceed the scope of your current plan.',
    upgradeToGrowth: 'View Growth Plan',
    scheduleCall: 'Schedule a Call',
    learnMore: 'Learn More'
  },
  es: {
    message: 'Basado en tu uso reciente, tus necesidades pueden exceder el alcance de tu plan actual.',
    upgradeToGrowth: 'Ver Plan Growth',
    scheduleCall: 'Agendar Llamada',
    learnMore: 'Más Información'
  }
};

export function PostSubmissionUpgrade({ 
  analysis, 
  currentPlan, 
  email,
  onUpgradeClick 
}: PostSubmissionUpgradeProps) {
  const { lang, getLocalizedPath } = useLang();
  const t = labels[lang as keyof typeof labels];

  if (!analysis.shouldShowUpgrade || !analysis.upgradeTarget) {
    return null;
  }

  const handleClick = () => {
    if (analysis.upgradeTarget === 'enterprise') {
      const contextParams = new URLSearchParams({
        email,
        current_plan: currentPlan,
        signals: analysis.signals.map(s => s.type).join(','),
        source: 'post_submission'
      });
      window.open(`${siteConfig.SCHEDULE_URL}&${contextParams.toString()}`, '_blank');
    } else {
      onUpgradeClick();
    }
  };

  return (
    <div className="mt-4 pt-4 border-t border-border/50">
      <p className="text-sm text-muted-foreground mb-3">
        {t.message}
      </p>
      <Button 
        size="sm" 
        variant="outline"
        onClick={handleClick}
      >
        {analysis.upgradeTarget === 'enterprise' ? (
          <>
            <Calendar className="mr-2 h-4 w-4" />
            {t.scheduleCall}
          </>
        ) : (
          <>
            {t.upgradeToGrowth}
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
}
