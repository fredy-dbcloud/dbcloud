import { motion } from 'framer-motion';
import { ShieldCheck, Clock, Timer, FileText, Calendar } from 'lucide-react';
import { useLang } from '@/hooks/useLang';
import { cn } from '@/lib/utils';

type PlanType = 'starter' | 'growth';

interface OnboardingHeroProps {
  plan: PlanType;
}

export function OnboardingHero({ plan }: OnboardingHeroProps) {
  const { t } = useLang();
  const onboarding = (t as any).onboarding;
  const planData = onboarding[plan];

  const planColors = {
    starter: 'from-blue-600 to-blue-800',
    growth: 'from-accent to-accent/80',
  };

  return (
    <>
      {/* Hero */}
      <section className={cn("pt-32 pb-16 bg-gradient-to-br text-white", planColors[plan])}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-sm mb-6">
              <ShieldCheck className="h-4 w-4" />
              {onboarding.welcomeBadge}
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              {planData.title}
            </h1>
            <p className="text-lg text-white/80">
              {planData.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-muted/50 border-b">
        <div className="container">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4">
              <Clock className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-sm text-muted-foreground">{onboarding.labels.monthlyHours}</p>
              <p className="font-bold text-lg">{planData.hours}</p>
            </div>
            <div className="text-center p-4">
              <Timer className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-sm text-muted-foreground">{onboarding.labels.responseTime}</p>
              <p className="font-bold text-lg">{planData.responseTime}</p>
            </div>
            <div className="text-center p-4">
              <FileText className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-sm text-muted-foreground">{onboarding.labels.requestChannel}</p>
              <p className="font-bold text-lg">{onboarding.labels.clientPortal}</p>
            </div>
            <div className="text-center p-4">
              <Calendar className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-sm text-muted-foreground">{onboarding.labels.billing}</p>
              <p className="font-bold text-lg">{onboarding.labels.monthly}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
