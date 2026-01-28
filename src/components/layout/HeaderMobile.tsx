import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLang } from '@/hooks/useLang';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

interface HeaderMobileProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function HeaderMobileToggle({ isOpen, onToggle }: HeaderMobileProps) {
  return (
    <button
      className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors"
      onClick={onToggle}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
    >
      {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </button>
  );
}

interface HeaderMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HeaderMobileMenu({ isOpen, onClose }: HeaderMobileMenuProps) {
  const { lang, t, getLocalizedPath, switchLang } = useLang();
  const location = useLocation();

  const navItems = [
    { href: getLocalizedPath('/'), label: t.nav.home },
    { href: getLocalizedPath('/services'), label: t.nav.services },
    { href: getLocalizedPath('/ai'), label: t.nav.ai },
    { href: getLocalizedPath('/pricing'), label: t.nav.pricing },
    { href: getLocalizedPath('/faq'), label: t.nav.faq },
    { href: getLocalizedPath('/contact'), label: t.nav.contact },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden border-t border-border/50 bg-background"
        >
          <nav className="container py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={onClose}
                className={cn(
                  "block px-4 py-2.5 rounded-md transition-colors text-sm",
                  isActive(item.href)
                    ? "text-primary bg-primary/5 font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {item.label}
              </Link>
            ))}

            {/* Language Switcher */}
            <div className="pt-3 mt-3 border-t border-border/50">
              <Link
                to={switchLang(lang === 'en' ? 'es' : 'en')}
                onClick={onClose}
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {lang === 'en' ? '🇪🇸 Español' : '🇺🇸 English'}
              </Link>
            </div>

            {/* Primary CTA inside menu */}
            <div className="pt-3 mt-3 border-t border-border/50 px-4">
              <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                <a 
                  href={siteConfig.SCHEDULE_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={onClose}
                >
                  {t.nav.schedule}
                </a>
              </Button>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
