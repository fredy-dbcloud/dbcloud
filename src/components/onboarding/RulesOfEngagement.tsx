import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
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
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="h-5 w-5 text-primary" />
          <span className="font-semibold text-foreground">
            {onboarding.sections.importantRules}
          </span>
        </div>
        <ul className="space-y-3">
          {rules.map((rule: string, i: number) => (
            <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
              <span className="text-primary font-bold">✓</span>
              {rule}
            </li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
}
