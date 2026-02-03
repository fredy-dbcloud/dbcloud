import { motion } from 'framer-motion';
import { Clock, AlertTriangle, FileSearch, Check, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ADDON_PRODUCTS, AddonKey } from '@/config/addons';
import { useLang } from '@/hooks/useLang';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AddonCardProps {
  addonKey: AddonKey;
  email?: string;
  plan?: 'starter' | 'growth';
  compact?: boolean;
}

const addonIcons: Record<AddonKey, React.ElementType> = {
  extraHours: Clock,
  incidentPack: AlertTriangle,
  assessment: FileSearch,
};

export function AddonCard({ addonKey, email, plan, compact = false }: AddonCardProps) {
  const { lang } = useLang();
  const [isLoading, setIsLoading] = useState(false);
  const addon = ADDON_PRODUCTS[addonKey];
  const Icon = addonIcons[addonKey];

  const name = lang === 'es' ? addon.name_es : addon.name;
  const description = lang === 'es' ? addon.description_es : addon.description;
  const features = lang === 'es' ? addon.features_es : addon.features;
  const upsellNote = 'upsellNote' in addon ? (lang === 'es' ? addon.upsellNote_es : addon.upsellNote) : null;

  const handlePurchase = async () => {
    if (!email) {
      toast.error(lang === 'es' ? 'Email requerido' : 'Email required');
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-addon-payment', {
        body: { addonId: addon.id, plan },
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error) {
      console.error('Addon purchase error:', error);
      toast.error(lang === 'es' ? 'Error al procesar. Intenta de nuevo.' : 'Failed to process. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (compact) {
    return (
      <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-card hover:border-primary/50 transition-colors">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="font-medium text-sm">{name}</p>
            <p className="text-xs text-muted-foreground">${addon.price}</p>
          </div>
        </div>
        <Button size="sm" variant="outline" onClick={handlePurchase} disabled={isLoading || !email}>
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : (
            lang === 'es' ? 'Comprar' : 'Purchase'
          )}
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full hover:border-primary/50 transition-colors">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{name}</CardTitle>
              <p className="text-2xl font-bold text-primary">${addon.price}</p>
            </div>
          </div>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="space-y-2">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>

          {upsellNote && (
            <p className="text-xs text-primary/80 italic border-l-2 border-primary/30 pl-2">
              {upsellNote}
            </p>
          )}

          <Button
            className="w-full" 
            onClick={handlePurchase} 
            disabled={isLoading || !email}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : null}
            {lang === 'es' ? 'Comprar Ahora' : 'Purchase Now'}
            {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            {lang === 'es' ? 'Compra única • Sin compromiso' : 'One-time purchase • No commitment'}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
