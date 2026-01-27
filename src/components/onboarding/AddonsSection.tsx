import { motion } from 'framer-motion';
import { Package } from 'lucide-react';
import { useLang } from '@/hooks/useLang';

export function AddonsSection() {
  const { t } = useLang();
  const onboarding = (t as any).onboarding;
  const addons = onboarding.addons;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className="font-display text-2xl font-bold mb-2 text-center">
        {onboarding.sections.addonsTitle}
      </h2>
      <p className="text-center text-muted-foreground mb-8">
        {onboarding.sections.addonsSubtitle}
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        {addons.map((addon: { name: string; description: string; note: string }, i: number) => (
          <div key={i} className="bg-card border border-border rounded-xl p-6 hover:border-accent/50 transition-colors">
            <div className="flex items-center gap-2 mb-3">
              <Package className="h-5 w-5 text-accent" />
              <h3 className="font-semibold">{addon.name}</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{addon.description}</p>
            <p className="text-xs text-accent font-medium">{addon.note}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
