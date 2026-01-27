import { useParams, Navigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLang } from '@/hooks/useLang';
import { siteConfig } from '@/config/site';

// Refactored components
import { OnboardingHero } from '@/components/onboarding/OnboardingHero';
import { PlanScopeSection } from '@/components/onboarding/PlanScopeSection';
import { RulesOfEngagement } from '@/components/onboarding/RulesOfEngagement';
import { First30DaysSection } from '@/components/onboarding/First30DaysSection';
import { AddonsSection } from '@/components/onboarding/AddonsSection';
import { ClientRequestForm } from '@/components/onboarding/ClientRequestForm';
import { HoursTracker } from '@/components/onboarding/HoursTracker';

type PlanType = 'starter' | 'growth';

export default function OnboardingPage() {
  const { plan } = useParams<{ plan: string }>();
  const { t, getLocalizedPath, lang } = useLang();

  // Validate plan parameter
  if (plan !== 'starter' && plan !== 'growth') {
    return <Navigate to={getLocalizedPath('/pricing')} replace />;
  }

  const onboarding = (t as any).onboarding;
  const clientRequest = (t as any).clientRequest;

  return (
    <Layout>
      <OnboardingHero plan={plan as PlanType} />

      <div className="container py-16">
        <div className="max-w-5xl mx-auto space-y-16">
          
          {/* Client Request Form Section - Primary CTA */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            id="submit-request"
          >
            <div className="flex items-center gap-2 mb-2 justify-center">
              <Send className="h-5 w-5 text-primary" />
              <h2 className="font-display text-2xl font-bold text-center">
                {clientRequest?.submitCta || 'Submit Your First Request'}
              </h2>
            </div>
            <p className="text-center text-muted-foreground mb-8">
              {lang === 'es' 
                ? 'Usa el formulario a continuación para enviar tus solicitudes de trabajo.' 
                : 'Use the form below to submit your work requests.'}
            </p>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Form */}
              <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
                <ClientRequestForm plan={plan as PlanType} />
              </div>
              
              {/* Hours Tracker */}
              <div className="lg:col-span-1">
                <HoursTracker plan={plan as PlanType} usedHours={0} />
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

          <PlanScopeSection plan={plan as PlanType} />

          <RulesOfEngagement />

          <First30DaysSection plan={plan as PlanType} />

          <AddonsSection plan={plan as PlanType} />

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
