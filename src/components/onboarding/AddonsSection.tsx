import { useSearchParams } from 'react-router-dom';
import { AddonsGrid } from '@/components/addons/AddonsGrid';

interface AddonsSectionProps {
  plan?: 'starter' | 'growth';
  email?: string;
}

export function AddonsSection({ plan, email }: AddonsSectionProps) {
  const [searchParams] = useSearchParams();
  const emailFromParams = searchParams.get('email') || email;

  return (
    <AddonsGrid 
      email={emailFromParams} 
      plan={plan} 
      showTitle={true} 
    />
  );
}
