import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { useLang } from '@/hooks/useLang';

type PlanType = 'starter' | 'growth';

interface First30DaysSectionProps {
  plan: PlanType;
}

export function First30DaysSection({ plan }: First30DaysSectionProps) {
  const { t } = useLang();
  const onboarding = (t as any).onboarding;
  const first30 = onboarding.first30Days[plan];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className="font-display text-2xl font-bold mb-8 text-center">
        {onboarding.sections.first30Title}
      </h2>
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="h-5 w-5 text-accent" />
          <span className="font-semibold">{onboarding.sections.first30Subtitle}</span>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {first30.map((item: { week: string; task: string }, i: number) => (
            <div key={i} className="p-4 bg-muted/50 rounded-lg">
              <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-2">
                {item.week}
              </p>
              <p className="text-sm">{item.task}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
