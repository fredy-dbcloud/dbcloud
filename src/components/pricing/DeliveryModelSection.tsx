import { motion } from 'framer-motion';
import { Clock, Timer, CheckCircle, MessageSquare, ArrowRight, FileText, Info } from 'lucide-react';
import { useLang } from '@/hooks/useLang';

interface PlanDeliveryProps {
  planKey: 'starter' | 'growth';
}

export function DeliveryModelSection({ planKey }: PlanDeliveryProps) {
  const { t, lang } = useLang();

  const plan = t.pricing[planKey] as any;
  const dm = (t.pricing as any).deliveryModel;

  if (!plan.hours || !plan.responseTime) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-8 space-y-4"
    >
      {/* Hours and Response Time */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-accent/10 rounded-lg p-3 text-center">
          <Clock className="h-5 w-5 mx-auto mb-1 text-accent" />
          <p className="text-xs text-muted-foreground">{dm.hoursLabel}</p>
          <p className="font-semibold text-sm">{plan.hours}</p>
        </div>
        <div className="bg-accent/10 rounded-lg p-3 text-center">
          <Timer className="h-5 w-5 mx-auto mb-1 text-accent" />
          <p className="text-xs text-muted-foreground">{dm.responseLabel}</p>
          <p className="font-semibold text-sm">{plan.responseTime}</p>
        </div>
      </div>

      {/* No Rollover Notice */}
      <p className="text-xs text-muted-foreground text-center italic">
        {dm.noRollover}
      </p>
    </motion.div>
  );
}

export function ScopeBoundariesSection({ planKey }: PlanDeliveryProps) {
  const { t } = useLang();

  const plan = t.pricing[planKey] as any;
  const dm = (t.pricing as any).deliveryModel;

  if (!plan.includedWork) return null;

  return (
    <div className="space-y-3 mt-4">
      {/* Included Work */}
      <div>
        <div className="flex items-center gap-1.5 mb-2">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <span className="text-xs font-semibold text-green-700 dark:text-green-400 uppercase tracking-wide">
            {dm.includedWork}
          </span>
        </div>
        <ul className="space-y-1">
          {plan.includedWork.map((item: string) => (
            <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
              <span className="text-green-600">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Advisory Only */}
      <div>
        <div className="flex items-center gap-1.5 mb-2">
          <MessageSquare className="h-4 w-4 text-blue-600" />
          <span className="text-xs font-semibold text-blue-700 dark:text-blue-400 uppercase tracking-wide">
            {dm.advisoryOnly}
          </span>
        </div>
        <ul className="space-y-1">
          {plan.advisoryOnly.map((item: string) => (
            <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
              <span className="text-blue-600">→</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Out of Scope - now framed as available upgrades */}
      <div>
        <div className="flex items-center gap-1.5 mb-2">
          <ArrowRight className="h-4 w-4 text-primary" />
          <span className="text-xs font-semibold text-primary uppercase tracking-wide">
            {dm.outOfScope}
          </span>
        </div>
        <ul className="space-y-1">
          {plan.outOfScope.map((item: string) => (
            <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
              <span className="text-primary">→</span>
              {item}
            </li>
          ))}
        </ul>
        <p className="text-xs text-muted-foreground/70 mt-1 italic">
          ({dm.requiresQuote})
        </p>
      </div>
    </div>
  );
}

export function ClientPortalNotice() {
  const { t } = useLang();
  const dm = (t.pricing as any).deliveryModel;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-muted/50 border border-border rounded-lg p-4 flex items-start gap-3"
    >
      <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
      <p className="text-sm text-muted-foreground">
        {dm.requestNotice}
      </p>
    </motion.div>
  );
}

export function EmergencyExclusionNotice() {
  const { t } = useLang();
  const dm = (t.pricing as any).deliveryModel;

  return (
    <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 mt-4">
      <p className="text-xs text-foreground font-medium flex items-center gap-2">
        <Info className="h-4 w-4 flex-shrink-0 text-primary" />
        {dm.outOfScopeNote}
      </p>
    </div>
  );
}
