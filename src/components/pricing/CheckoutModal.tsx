import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useStripeCheckout } from '@/hooks/useStripeCheckout';
import { TierKey } from '@/config/stripe';
import { useLang } from '@/hooks/useLang';
import { Loader2, CreditCard, Shield } from 'lucide-react';
import { z } from 'zod';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  tier: TierKey;
  tierName: string;
  price: string;
  isYearly: boolean;
}

const emailSchema = z.string().trim().email('Please enter a valid email address');

export function CheckoutModal({ isOpen, onClose, tier, tierName, price, isYearly }: CheckoutModalProps) {
  const { t, lang } = useLang();
  const { createCheckout, isLoading } = useStripeCheckout();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      emailSchema.parse(email);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
        return;
      }
    }

    await createCheckout({ tier, isYearly });
  };

  const labels = {
    en: {
      title: 'Complete Your Purchase',
      description: `Subscribe to ${tierName} plan`,
      emailLabel: 'Email Address',
      emailPlaceholder: 'you@company.com',
      subscribe: 'Start Securely',
      secure: 'Secure checkout powered by Stripe',
      billing: isYearly ? 'Billed annually' : 'Billed monthly',
      noContract: 'No long-term contract. Cancel anytime.',
    },
    es: {
      title: 'Completa tu Compra',
      description: `Suscríbete al plan ${tierName}`,
      emailLabel: 'Correo Electrónico',
      emailPlaceholder: 'tu@empresa.com',
      subscribe: 'Comenzar con Seguridad',
      secure: 'Pago seguro con Stripe',
      billing: isYearly ? 'Facturado anualmente' : 'Facturado mensualmente',
      noContract: 'Sin contrato a largo plazo. Cancela cuando quieras.',
    },
  };

  const l = labels[lang];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            {l.title}
          </DialogTitle>
          <DialogDescription>{l.description}</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {/* Price Summary */}
          <div className="bg-muted/50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-lg">{tierName}</p>
                <p className="text-sm text-muted-foreground">{l.billing}</p>
              </div>
              <div className="text-right">
                <p className="font-display text-2xl font-bold">{price}</p>
                <p className="text-sm text-muted-foreground">/month</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{l.emailLabel}</Label>
              <Input
                id="email"
                type="email"
                placeholder={l.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>

            <Button 
              type="submit" 
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" 
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-4 w-4" />
                  {l.subscribe}
                </>
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
              <Shield className="h-3 w-3" />
              {l.secure}
            </p>
            <p className="text-xs text-center text-muted-foreground mt-1">
              {l.noContract}
            </p>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
