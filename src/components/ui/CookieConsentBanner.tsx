import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLang } from '@/hooks/useLang';

const COOKIE_CONSENT_KEY = 'dbcloud_cookie_consent';

const copy = {
  en: {
    message: 'We use cookies to improve your experience. By continuing to browse, you agree to our',
    policy: 'Cookie Policy',
    accept: 'Accept',
    decline: 'Decline',
  },
  es: {
    message: 'Usamos cookies para mejorar tu experiencia. Al continuar navegando, aceptas nuestra',
    policy: 'Política de Cookies',
    accept: 'Aceptar',
    decline: 'Rechazar',
  },
};

export function CookieConsentBanner() {
  const { lang, getLocalizedPath } = useLang();
  const [visible, setVisible] = useState(false);
  const t = copy[lang];

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (accepted: boolean) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, accepted ? 'accepted' : 'declined');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6"
        >
          <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card/95 backdrop-blur-md shadow-xl px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Cookie className="h-5 w-5 text-accent shrink-0 mt-0.5 sm:mt-0" />
            <p className="text-sm text-muted-foreground flex-1">
              {t.message}{' '}
              <Link
                to={getLocalizedPath('/cookies')}
                className="text-accent hover:underline font-medium"
              >
                {t.policy}
              </Link>
              .
            </p>
            <div className="flex gap-2 shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleConsent(false)}
                className="text-muted-foreground"
              >
                {t.decline}
              </Button>
              <Button
                size="sm"
                onClick={() => handleConsent(true)}
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                {t.accept}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
