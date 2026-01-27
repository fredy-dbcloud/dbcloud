import { useSearchParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Clock, AlertTriangle, FileSearch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLang } from '@/hooks/useLang';
import { ADDON_PRODUCTS, AddonKey } from '@/config/addons';

const addonIcons: Record<string, React.ElementType> = {
  extra_hours: Clock,
  incident_pack: AlertTriangle,
  assessment: FileSearch,
};

export default function AddonSuccessPage() {
  const [searchParams] = useSearchParams();
  const addonId = searchParams.get('addon');
  const { lang, getLocalizedPath } = useLang();

  // Find the addon by ID
  const addonKey = Object.keys(ADDON_PRODUCTS).find(
    (key) => ADDON_PRODUCTS[key as AddonKey].id === addonId
  ) as AddonKey | undefined;

  const addon = addonKey ? ADDON_PRODUCTS[addonKey] : null;
  const Icon = addonId ? (addonIcons[addonId] || CheckCircle) : CheckCircle;

  return (
    <Layout>
      <div className="container py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg mx-auto text-center"
        >
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="font-display text-3xl font-bold mb-4">
              {lang === 'es' ? '¡Compra Exitosa!' : 'Purchase Successful!'}
            </h1>
            {addon && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
                <Icon className="h-4 w-4" />
                <span className="font-medium">
                  {lang === 'es' ? addon.name_es : addon.name}
                </span>
              </div>
            )}
            <p className="text-muted-foreground">
              {lang === 'es'
                ? 'Tu complemento ha sido activado. Recibirás un recibo por correo electrónico.'
                : 'Your add-on has been activated. You will receive a receipt via email.'}
            </p>
          </div>

          {addon && (
            <div className="bg-muted/50 border rounded-xl p-6 mb-8 text-left">
              <h3 className="font-semibold mb-4">
                {lang === 'es' ? 'Lo que incluye:' : 'What\'s included:'}
              </h3>
              <ul className="space-y-2">
                {(lang === 'es' ? addon.features_es : addon.features).map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-4">
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <p className="text-sm text-amber-800 dark:text-amber-300">
                {lang === 'es'
                  ? 'Este es un complemento único. No modifica tu suscripción base ni se renueva automáticamente.'
                  : 'This is a one-time add-on. It does not modify your base subscription or auto-renew.'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link to={getLocalizedPath('/dashboard')}>
                  {lang === 'es' ? 'Ir al Panel' : 'Go to Dashboard'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to={getLocalizedPath('/contact')}>
                  {lang === 'es' ? 'Contáctanos' : 'Contact Us'}
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
