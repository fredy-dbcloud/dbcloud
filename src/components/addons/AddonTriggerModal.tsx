import { useState } from 'react';
import { AlertTriangle, Clock, FileSearch, ArrowRight, Loader2, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ADDON_PRODUCTS, AddonKey } from '@/config/addons';
import { supabase } from '@/integrations/supabase/client';
import { useLang } from '@/hooks/useLang';
import { siteConfig } from '@/config/site';
import { toast } from 'sonner';

export type TriggerReason = 'hours_exhausted' | 'urgent_request' | 'out_of_scope';

interface AddonTriggerModalProps {
  isOpen: boolean;
  onClose: () => void;
  reason: TriggerReason;
  email: string;
  plan: 'starter' | 'growth';
}

const reasonConfig: Record<TriggerReason, {
  icon: React.ElementType;
  suggestedAddon: AddonKey | 'enterprise';
  titleEn: string;
  titleEs: string;
  descriptionEn: string;
  descriptionEs: string;
}> = {
  hours_exhausted: {
    icon: Clock,
    suggestedAddon: 'extraHours',
    titleEn: 'Hours Running Low',
    titleEs: 'Horas Agotándose',
    descriptionEn: 'You\'ve used most of your monthly hours. Consider adding extra hours to continue your work.',
    descriptionEs: 'Has usado la mayoría de tus horas mensuales. Considera agregar horas extra para continuar.',
  },
  urgent_request: {
    icon: AlertTriangle,
    suggestedAddon: 'incidentPack',
    titleEn: 'Urgent Request Detected',
    titleEs: 'Solicitud Urgente Detectada',
    descriptionEn: 'This request requires urgent handling. Your current plan doesn\'t include incident response.',
    descriptionEs: 'Esta solicitud requiere manejo urgente. Tu plan actual no incluye respuesta a incidentes.',
  },
  out_of_scope: {
    icon: FileSearch,
    suggestedAddon: 'enterprise',
    titleEn: 'Request Outside Current Scope',
    titleEs: 'Solicitud Fuera del Alcance Actual',
    descriptionEn: 'This request requires SLA guarantees or 24/7 support. These are available in our Enterprise plan.',
    descriptionEs: 'Esta solicitud requiere garantías de SLA o soporte 24/7. Estos están disponibles en nuestro plan Enterprise.',
  },
};

export function AddonTriggerModal({ isOpen, onClose, reason, email, plan }: AddonTriggerModalProps) {
  const { lang, getLocalizedPath } = useLang();
  const [isLoading, setIsLoading] = useState(false);

  const config = reasonConfig[reason];
  const Icon = config.icon;
  const title = lang === 'es' ? config.titleEs : config.titleEn;
  const description = lang === 'es' ? config.descriptionEs : config.descriptionEn;

  const isEnterprise = config.suggestedAddon === 'enterprise';
  const addon = !isEnterprise ? ADDON_PRODUCTS[config.suggestedAddon] : null;

  const handlePurchaseAddon = async () => {
    if (!addon) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-addon-payment', {
        body: { addonId: addon.id, email, plan },
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
        onClose();
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error) {
      console.error('Addon purchase error:', error);
      toast.error(lang === 'es' ? 'Error al procesar' : 'Failed to process');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
              <Icon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            {title}
          </DialogTitle>
          <DialogDescription className="pt-2">
            {description}
          </DialogDescription>
        </DialogHeader>

        {addon && (
          <div className="bg-muted/50 border rounded-lg p-4 my-2">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">
                {lang === 'es' ? addon.name_es : addon.name}
              </span>
              <span className="text-lg font-bold text-primary">${addon.price}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {lang === 'es' ? addon.description_es : addon.description}
            </p>
          </div>
        )}

        <p className="text-sm text-muted-foreground">
          {lang === 'es' 
            ? 'Basado en tu uso reciente, esto podría beneficiarte.' 
            : 'Based on your recent usage, this may benefit you.'}
        </p>

        <DialogFooter className="flex-col sm:flex-row gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            {lang === 'es' ? 'Ahora No' : 'Not Now'}
          </Button>
          
          {isEnterprise ? (
            <>
              <Button variant="secondary" asChild>
                <a href={getLocalizedPath('/contact')}>
                  {lang === 'es' ? 'Contactar Ventas' : 'Contact Sales'}
                </a>
              </Button>
              <Button asChild>
                <a href={siteConfig.SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
                  <Phone className="mr-2 h-4 w-4" />
                  {lang === 'es' ? 'Agendar Llamada' : 'Schedule Call'}
                </a>
              </Button>
            </>
          ) : (
            <Button onClick={handlePurchaseAddon} disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              {lang === 'es' ? 'Comprar Complemento' : 'Purchase Add-on'}
              {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
