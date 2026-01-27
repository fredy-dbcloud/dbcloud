import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { STRIPE_PRODUCTS, TierKey } from '@/config/stripe';
import { toast } from 'sonner';

interface CheckoutOptions {
  tier: TierKey;
  isYearly: boolean;
  email: string;
}

export function useStripeCheckout() {
  const [isLoading, setIsLoading] = useState(false);

  const createCheckout = async ({ tier, isYearly, email }: CheckoutOptions) => {
    if (tier === 'enterprise') {
      // Redirect to contact page for enterprise
      window.location.href = '/contact';
      return;
    }

    const product = STRIPE_PRODUCTS[tier];
    const priceId = isYearly ? product.yearly.price_id : product.monthly.price_id;

    if (!priceId || priceId.includes('PLACEHOLDER')) {
      toast.error('Pricing not configured yet. Please contact us directly.');
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId, email, isYearly },
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to start checkout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const openCustomerPortal = async (email: string) => {
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('customer-portal', {
        body: { email },
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      } else {
        throw new Error('No portal URL returned');
      }
    } catch (error) {
      console.error('Portal error:', error);
      toast.error('Failed to open subscription management. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createCheckout,
    openCustomerPortal,
    isLoading,
  };
}
