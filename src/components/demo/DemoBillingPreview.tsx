import { CreditCard, Calendar, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLang } from '@/hooks/useLang';
import type { DemoPlan } from '@/config/demoData';

interface DemoBillingPreviewProps {
  plan: DemoPlan;
}

export function DemoBillingPreview({ plan }: DemoBillingPreviewProps) {
  const { lang, getLocalizedPath } = useLang();

  const labels = {
    en: {
      title: 'Billing & Subscription',
      subtitle: 'Manage your subscription and payment methods',
      currentPlan: 'Current Plan',
      billingCycle: 'Billing Cycle',
      monthly: 'Monthly',
      nextBilling: 'Next Billing Date',
      amount: 'Amount',
      paymentMethod: 'Payment Method',
      cardEnding: 'Card ending in',
      manageBilling: 'Manage Billing',
      demoNote: 'Demo: Billing portal is disabled in demo mode',
    },
    es: {
      title: 'Facturación y Suscripción',
      subtitle: 'Gestiona tu suscripción y métodos de pago',
      currentPlan: 'Plan Actual',
      billingCycle: 'Ciclo de Facturación',
      monthly: 'Mensual',
      nextBilling: 'Próxima Fecha de Cobro',
      amount: 'Monto',
      paymentMethod: 'Método de Pago',
      cardEnding: 'Tarjeta terminada en',
      manageBilling: 'Gestionar Facturación',
      demoNote: 'Demo: El portal de facturación está deshabilitado en modo demo',
    },
  };

  const t = labels[lang as keyof typeof labels] || labels.en;

  const planPrices = {
    starter: '$499',
    growth: '$1,499',
    enterprise: 'Custom',
  };

  const planNames = {
    en: {
      starter: 'Starter Consulting',
      growth: 'Growth Consulting',
      enterprise: 'Enterprise',
    },
    es: {
      starter: 'Starter Consulting',
      growth: 'Growth Consulting',
      enterprise: 'Enterprise',
    },
  };

  // Mock next billing date (15 days from now)
  const nextBillingDate = new Date();
  nextBillingDate.setDate(nextBillingDate.getDate() + 15);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-primary" />
          {t.title}
        </CardTitle>
        <CardDescription>{t.subtitle}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">{t.currentPlan}</p>
            <p className="font-semibold">{planNames[lang as keyof typeof planNames]?.[plan] || planNames.en[plan]}</p>
            <Badge variant="outline" className="mt-1">{t.monthly}</Badge>
          </div>
          
          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">{t.amount}</p>
            <p className="font-semibold text-lg">{planPrices[plan]}<span className="text-sm text-muted-foreground">/mo</span></p>
          </div>
          
          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">{t.nextBilling}</p>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <p className="font-medium">
                {nextBillingDate.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>
          
          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">{t.paymentMethod}</p>
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <p className="font-medium">{t.cardEnding} •••• 4242</p>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <Button variant="outline" className="w-full" disabled>
            <ExternalLink className="h-4 w-4 mr-2" />
            {t.manageBilling}
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-2 italic">
            {t.demoNote}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
