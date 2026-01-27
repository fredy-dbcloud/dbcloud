import { motion } from 'framer-motion';
import { Package } from 'lucide-react';
import { AddonCard } from './AddonCard';
import { ADDON_PRODUCTS, AddonKey } from '@/config/addons';
import { useLang } from '@/hooks/useLang';

interface AddonsGridProps {
  email?: string;
  plan?: 'starter' | 'growth';
  showTitle?: boolean;
}

export function AddonsGrid({ email, plan, showTitle = true }: AddonsGridProps) {
  const { lang } = useLang();

  const addonKeys = Object.keys(ADDON_PRODUCTS) as AddonKey[];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="space-y-6"
    >
      {showTitle && (
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Package className="h-5 w-5 text-primary" />
            <h2 className="font-display text-2xl font-bold">
              {lang === 'es' ? 'Complementos Opcionales' : 'Optional Add-ons'}
            </h2>
          </div>
          <p className="text-muted-foreground">
            {lang === 'es' 
              ? 'Extiende tu plan cuando lo necesites con compras únicas' 
              : 'Extend your plan when needed with one-time purchases'}
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {addonKeys.map((key) => (
          <AddonCard 
            key={key} 
            addonKey={key} 
            email={email} 
            plan={plan}
          />
        ))}
      </div>

      <p className="text-center text-xs text-muted-foreground">
        {lang === 'es' 
          ? 'Todos los complementos son compras únicas y no modifican tu suscripción base.' 
          : 'All add-ons are one-time purchases and do not modify your base subscription.'}
      </p>
    </motion.section>
  );
}
