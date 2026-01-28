import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export function useStripePortal() {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const openCustomerPortal = async () => {
    if (!user?.email) {
      toast.error('Please log in to access billing');
      return;
    }

    setIsLoading(true);
    try {
      // Auth token is automatically included by Supabase client
      const { data, error } = await supabase.functions.invoke('customer-portal', {
        body: {},
      });

      if (error) {
        throw new Error(error.message || 'Failed to create portal session');
      }

      if (data?.error) {
        // Handle case where customer doesn't exist in Stripe
        if (data.error.includes('No customer found')) {
          toast.error('No billing account found. Please contact support.');
          return;
        }
        throw new Error(data.error);
      }

      if (data?.url) {
        window.open(data.url, '_blank');
      } else {
        throw new Error('No portal URL returned');
      }
    } catch (err) {
      console.error('Stripe portal error:', err);
      toast.error('Unable to open billing portal. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    openCustomerPortal,
    isLoading,
    isDisabled: !user?.email,
  };
}
