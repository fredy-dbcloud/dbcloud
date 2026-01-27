import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { useLang } from '@/hooks/useLang';

type PlanType = 'starter' | 'growth';

interface PlanScopeSectionProps {
  plan: PlanType;
}

export function PlanScopeSection({ plan }: PlanScopeSectionProps) {
  const { t } = useLang();
  const onboarding = (t as any).onboarding;
  const planData = onboarding[plan];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className="font-display text-2xl font-bold mb-8 text-center">
        {onboarding.sections.scopeTitle}
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Included */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
              <Check className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-lg">{onboarding.labels.whatsIncluded}</h3>
          </div>
          <ul className="space-y-3">
            {planData.included.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Not Included */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
              <X className="h-5 w-5 text-red-600" />
            </div>
            <h3 className="font-semibold text-lg">{onboarding.labels.whatsNotIncluded}</h3>
          </div>
          <ul className="space-y-3">
            {planData.notIncluded.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                <X className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.section>
  );
}
