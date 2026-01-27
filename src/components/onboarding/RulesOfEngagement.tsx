import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { useLang } from '@/hooks/useLang';

export function RulesOfEngagement() {
  const { t } = useLang();
  const onboarding = (t as any).onboarding;
  const rules = onboarding.rulesOfEngagement;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className="font-display text-2xl font-bold mb-8 text-center">
        {onboarding.sections.rulesTitle}
      </h2>
      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="h-5 w-5 text-amber-600" />
          <span className="font-semibold text-amber-800 dark:text-amber-400">
            {onboarding.sections.importantRules}
          </span>
        </div>
        <ul className="space-y-3">
          {rules.map((rule: string, i: number) => (
            <li key={i} className="flex items-start gap-3 text-sm text-amber-900 dark:text-amber-200">
              <span className="text-amber-600 font-bold">•</span>
              {rule}
            </li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
}
