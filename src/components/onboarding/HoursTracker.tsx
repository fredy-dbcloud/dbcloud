import { Clock, TrendingDown } from 'lucide-react';
import { useLang } from '@/hooks/useLang';
import { cn } from '@/lib/utils';

type PlanType = 'starter' | 'growth';

interface HoursTrackerProps {
  plan: PlanType;
  usedHours?: number;
}

export function HoursTracker({ plan, usedHours = 0 }: HoursTrackerProps) {
  const { t, lang } = useLang();
  const tAny = t as any;

  const planHours = plan === 'starter' ? 4 : 10;
  const remainingHours = Math.max(0, planHours - usedHours);
  const usagePercentage = (usedHours / planHours) * 100;

  const tracker = tAny.clientRequest?.hoursTracker || {
    title: 'Monthly Hours',
    included: 'Included',
    estimated: 'Estimated Used',
    remaining: 'Remaining',
    note: 'Hours are estimated and subject to final review. Unused hours do not roll over.',
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">{tracker.title}</h3>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500",
              usagePercentage > 80
                ? "bg-red-500"
                : usagePercentage > 50
                ? "bg-amber-500"
                : "bg-green-500"
            )}
            style={{ width: `${Math.min(100, usagePercentage)}%` }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="p-3 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">{tracker.included}</p>
          <p className="font-bold text-lg">{planHours}h</p>
        </div>
        <div className="p-3 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">{tracker.estimated}</p>
          <p className="font-bold text-lg">{usedHours}h</p>
        </div>
        <div className={cn(
          "p-3 rounded-lg",
          remainingHours <= 1 ? "bg-red-100 dark:bg-red-950/30" : "bg-muted/50"
        )}>
          <p className="text-xs text-muted-foreground mb-1">{tracker.remaining}</p>
          <p className={cn(
            "font-bold text-lg",
            remainingHours <= 1 && "text-red-600 dark:text-red-400"
          )}>
            {remainingHours}h
          </p>
        </div>
      </div>

      {/* Note */}
      <div className="flex items-start gap-2 mt-4 pt-4 border-t border-border">
        <TrendingDown className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground">{tracker.note}</p>
      </div>
    </div>
  );
}
