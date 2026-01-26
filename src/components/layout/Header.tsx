import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLang } from '@/hooks/useLang';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

export function Header() {
  const { lang, t, getLocalizedPath, switchLang } = useLang();
  const [mobileOpen, setMobileOpen] = useState(false);
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
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to={getLocalizedPath('/')} className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <span className="font-display text-lg font-bold text-primary-foreground">DB</span>
          </div>
          <span className="font-display text-xl font-bold text-foreground">{siteConfig.name}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                isActive(item.href)
                  ? "text-accent bg-accent/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {item.label}
            </Link>
          ))}
          
          {/* Academy Link - Secondary */}
          <a
            href={siteConfig.ACADEMY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t.nav.academy}
          </a>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Language Switcher */}
          <div className="flex items-center gap-1 text-sm">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <Link
              to={switchLang('en')}
              className={cn(
                "px-2 py-1 rounded transition-colors",
                lang === 'en' ? "text-accent font-medium" : "text-muted-foreground hover:text-foreground"
              )}
            >
              EN
            </Link>
            <span className="text-muted-foreground/50">|</span>
            <Link
              to={switchLang('es')}
              className={cn(
                "px-2 py-1 rounded transition-colors",
                lang === 'es' ? "text-accent font-medium" : "text-muted-foreground hover:text-foreground"
              )}
            >
              ES
            </Link>
          </div>

          <Button asChild variant="outline" size="sm">
            <Link to={getLocalizedPath('/contact')}>{t.cta.contact}</Link>
          </Button>
          
          <Button asChild size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link to={getLocalizedPath('/schedule')}>{t.nav.schedule}</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border/50 bg-background"
          >
            <nav className="container py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block px-4 py-2 rounded-md transition-colors",
                    isActive(item.href)
                      ? "text-accent bg-accent/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              
              <a
                href={siteConfig.ACADEMY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {t.nav.academy}
              </a>

              <div className="pt-4 border-t border-border/50 flex items-center gap-3">
                <Link
                  to={switchLang(lang === 'en' ? 'es' : 'en')}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <Globe className="h-4 w-4" />
                  {lang === 'en' ? 'Español' : 'English'}
                </Link>
              </div>

              <div className="pt-4 flex flex-col gap-2">
                <Button asChild variant="outline" className="w-full">
                  <Link to={getLocalizedPath('/contact')} onClick={() => setMobileOpen(false)}>
                    {t.cta.contact}
                  </Link>
                </Button>
                <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link to={getLocalizedPath('/schedule')} onClick={() => setMobileOpen(false)}>
                    {t.nav.schedule}
                  </Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
