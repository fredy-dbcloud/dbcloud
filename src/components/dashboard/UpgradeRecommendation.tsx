import { useState } from 'react';
import { ArrowRight, Calendar, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useLang } from '@/hooks/useLang';
import { useStripeCheckout } from '@/hooks/useStripeCheckout';
import { siteConfig } from '@/config/site';
import type { UpgradeAnalysis, PlanType } from '@/hooks/useUpgradeSignals';

interface UpgradeRecommendationProps {
  analysis: UpgradeAnalysis;
  currentPlan: PlanType;
  email: string;
  onDismiss?: () => void;
  variant?: 'card' | 'inline' | 'minimal';
}

const labels = {
  en: {
    title: 'Plan Recommendation',
    basedOnUsage: 'Based on your recent usage, your needs may exceed the scope of your current plan.',
    viewDetails: 'View Details',
    upgradeToGrowth: 'Upgrade to Growth',
    scheduleCall: 'Schedule a Call',
    dismiss: 'Not Now',
    confirmTitle: 'Upgrade to Growth Plan',
    confirmDescription: 'Your subscription will be upgraded with prorated billing. You\'ll immediately get access to:',
    growthBenefits: [
      '10 hours/month (up from 4)',
      'Same/next day response time',
      'Hands-on implementation support',
      'Priority request handling'
    ],
    confirmUpgrade: 'Confirm Upgrade',
    cancel: 'Cancel',
    signals: 'Usage signals detected:'
  },
  es: {
    title: 'Recomendación de Plan',
    basedOnUsage: 'Basado en tu uso reciente, tus necesidades pueden exceder el alcance de tu plan actual.',
    viewDetails: 'Ver Detalles',
    upgradeToGrowth: 'Cambiar a Growth',
    scheduleCall: 'Agendar Llamada',
    dismiss: 'Ahora No',
    confirmTitle: 'Cambiar a Plan Growth',
    confirmDescription: 'Tu suscripción se actualizará con facturación prorrateada. Tendrás acceso inmediato a:',
    growthBenefits: [
      '10 horas/mes (antes 4)',
      'Tiempo de respuesta mismo/siguiente día',
      'Soporte de implementación práctica',
      'Manejo prioritario de solicitudes'
    ],
    confirmUpgrade: 'Confirmar Cambio',
    cancel: 'Cancelar',
    signals: 'Señales de uso detectadas:'
  }
};

export function UpgradeRecommendation({ 
  analysis, 
  currentPlan, 
  email,
  onDismiss,
  variant = 'card' 
}: UpgradeRecommendationProps) {
  const { lang, getLocalizedPath } = useLang();
  const { createCheckout, isLoading } = useStripeCheckout();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const t = labels[lang as keyof typeof labels];

  if (!analysis.shouldShowUpgrade || !analysis.upgradeTarget) {
    return null;
  }

  const handleUpgradeClick = () => {
    if (analysis.upgradeTarget === 'enterprise') {
      // Pre-fill context and redirect to schedule
      const contextParams = new URLSearchParams({
        email,
        current_plan: currentPlan,
        signals: analysis.signals.map(s => s.type).join(','),
        source: 'upgrade_recommendation'
      });
      window.open(`${siteConfig.SCHEDULE_URL}&${contextParams.toString()}`, '_blank');
    } else {
      // Show confirmation modal for Growth upgrade
      setShowConfirmModal(true);
    }
  };

  const handleConfirmUpgrade = async () => {
    await createCheckout({
      tier: 'growth',
      isYearly: false, // Default to monthly, could be enhanced to detect current billing
      email
    });
    setShowConfirmModal(false);
  };

  const containerClasses = {
    card: 'bg-muted/50 border border-border rounded-xl p-6',
    inline: 'bg-muted/30 border-l-2 border-primary/50 pl-4 py-3',
    minimal: ''
  };

  return (
    <>
      <div className={containerClasses[variant]}>
        <div className="flex items-start gap-4">
          <div className="flex-1">
            {variant !== 'minimal' && (
              <h3 className="font-medium text-sm text-muted-foreground mb-1">
                {t.title}
              </h3>
            )}
            <p className="text-sm text-foreground mb-4">
              {t.basedOnUsage}
            </p>
            <div className="flex flex-wrap gap-2">
              {analysis.upgradeTarget === 'growth' ? (
                <Button 
                  size="sm" 
                  onClick={handleUpgradeClick}
                  disabled={isLoading}
                >
                  {t.upgradeToGrowth}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button 
                  size="sm" 
                  onClick={handleUpgradeClick}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {t.scheduleCall}
                </Button>
              )}
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => setShowDetailsModal(true)}
              >
                {t.viewDetails}
              </Button>
              {onDismiss && (
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={onDismiss}
                  className="text-muted-foreground"
                >
                  {t.dismiss}
                </Button>
              )}
            </div>
          </div>
          {onDismiss && variant === 'card' && (
            <button 
              onClick={onDismiss}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Upgrade Confirmation Modal (Starter → Growth) */}
      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.confirmTitle}</DialogTitle>
            <DialogDescription>
              {t.confirmDescription}
            </DialogDescription>
          </DialogHeader>
          <ul className="space-y-2 my-4">
            {t.growthBenefits.map((benefit, index) => (
              <li key={index} className="flex items-center gap-2 text-sm">
                <span className="text-primary">✓</span>
                {benefit}
              </li>
            ))}
          </ul>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmModal(false)}>
              {t.cancel}
            </Button>
            <Button onClick={handleConfirmUpgrade} disabled={isLoading}>
              {t.confirmUpgrade}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Details Modal */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.title}</DialogTitle>
            <DialogDescription>
              {t.signals}
            </DialogDescription>
          </DialogHeader>
          <ul className="space-y-3 my-4">
            {analysis.signals.map((signal, index) => (
              <li key={index} className="flex items-start gap-3 text-sm">
                <span className={`mt-0.5 w-2 h-2 rounded-full ${
                  signal.priority === 'high' ? 'bg-destructive' : 
                  signal.priority === 'medium' ? 'bg-amber-500' : 'bg-muted-foreground'
                }`} />
                <span>{signal.description[lang as keyof typeof signal.description]}</span>
              </li>
            ))}
          </ul>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailsModal(false)}>
              {t.cancel}
            </Button>
            <Button onClick={() => {
              setShowDetailsModal(false);
              handleUpgradeClick();
            }}>
              {analysis.upgradeTarget === 'growth' ? t.upgradeToGrowth : t.scheduleCall}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
