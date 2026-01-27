import { useParams, Navigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { 
  Check, 
  X, 
  Clock, 
  Timer, 
  FileText, 
  AlertTriangle, 
  Calendar,
  ShieldCheck,
  Package,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLang } from '@/hooks/useLang';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';

type PlanType = 'starter' | 'growth';

export default function OnboardingPage() {
  const { plan } = useParams<{ plan: string }>();
  const { t, getLocalizedPath, lang } = useLang();

  // Validate plan parameter
  if (plan !== 'starter' && plan !== 'growth') {
    return <Navigate to={getLocalizedPath('/pricing')} replace />;
  }

  const onboarding = (t as any).onboarding;
  const planData = onboarding[plan as PlanType];
  const rules = onboarding.rulesOfEngagement;
  const first30 = onboarding.first30Days[plan as PlanType];
  const addons = onboarding.addons;

  const planColors = {
    starter: 'from-blue-600 to-blue-800',
    growth: 'from-accent to-accent/80',
  };

  return (
    <Layout>
      {/* Hero */}
      <section className={cn("pt-32 pb-16 bg-gradient-to-br text-white", planColors[plan as PlanType])}>
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

      <div className="container py-16">
        <div className="max-w-5xl mx-auto space-y-16">
          
          {/* What's Included & Not Included */}
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

          {/* How to Submit Requests */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-primary/5 border border-primary/20 rounded-xl p-8"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{onboarding.sections.howToSubmit}</h3>
                <p className="text-muted-foreground mb-4">{onboarding.requestNotice}</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-background border text-sm font-medium">
                  <FileText className="h-4 w-4" />
                  {onboarding.labels.clientPortal}
                </div>
              </div>
            </div>
          </motion.section>

          {/* Rules of Engagement */}
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

          {/* First 30 Days */}
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

          {/* Add-ons */}
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

          {/* CTA */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center bg-muted/50 rounded-xl p-8"
          >
            <h3 className="font-display text-xl font-bold mb-4">
              {onboarding.cta.title}
            </h3>
            <p className="text-muted-foreground mb-6">
              {onboarding.cta.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <a href={siteConfig.SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
                  {onboarding.cta.scheduleCall}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href={getLocalizedPath('/contact')}>
                  {onboarding.cta.contactUs}
                </a>
              </Button>
            </div>
          </motion.section>

        </div>
      </div>
    </Layout>
  );
}
