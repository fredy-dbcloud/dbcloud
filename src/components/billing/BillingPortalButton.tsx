import { ExternalLink, Loader2 } from 'lucide-react';
import { useStripePortal } from '@/hooks/useStripePortal';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

interface BillingPortalButtonProps {
  className?: string;
  variant?: 'link' | 'button';
  children: React.ReactNode;
}

export function BillingPortalButton({ 
  className, 
  variant = 'link',
  children 
}: BillingPortalButtonProps) {
  const { openCustomerPortal, isLoading, isDisabled } = useStripePortal();
  const { isAuthenticated } = useAuth();

  // For unauthenticated users, show a disabled state or redirect to login
  if (!isAuthenticated) {
    return (
      <span 
        className={cn(
          'text-primary-foreground/50 cursor-not-allowed inline-flex items-center gap-1',
          className
        )}
        title="Please log in to access billing"
      >
        {children}
        <ExternalLink className="h-3 w-3" />
      </span>
    );
  }

  if (variant === 'link') {
    return (
      <button
        onClick={openCustomerPortal}
        disabled={isLoading || isDisabled}
        className={cn(
          'text-primary-foreground/70 hover:text-accent transition-colors inline-flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed',
          className
        )}
      >
        {children}
        {isLoading ? (
          <Loader2 className="h-3 w-3 animate-spin" />
        ) : (
          <ExternalLink className="h-3 w-3" />
        )}
      </button>
    );
  }

  return (
    <button
      onClick={openCustomerPortal}
      disabled={isLoading || isDisabled}
      className={cn(
        'inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors',
        className
      )}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : null}
      {children}
    </button>
  );
}
