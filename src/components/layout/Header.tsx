import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, ChevronDown, LogOut, LayoutDashboard, FileText, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLang } from '@/hooks/useLang';
import { useAuth } from '@/hooks/useAuth';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import logoHorizontalDark from '@/assets/logos/logo-dbcloud-horizontal-dark.png';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  const { lang, t, getLocalizedPath, switchLang } = useLang();
  const { user, signOut, isAuthenticated } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const demoContent = {
    en: {
      viewDemo: 'View Demo',
      starter: 'Starter Demo',
      growth: 'Growth Demo',
      enterprise: 'Enterprise Demo',
      microcopy: 'Explore the exact client dashboard you will get after purchase',
    },
    es: {
      viewDemo: 'Ver Demo',
      starter: 'Demo Starter',
      growth: 'Demo Growth',
      enterprise: 'Demo Enterprise',
      microcopy: 'Explora el panel de cliente exacto que obtendrás después de la compra',
    },
  };

  const dc = demoContent[lang];

  const navItems = [
    { href: getLocalizedPath('/'), label: t.nav.home },
    { href: getLocalizedPath('/services'), label: t.nav.services },
    { href: getLocalizedPath('/ai'), label: t.nav.ai },
    { href: getLocalizedPath('/pricing'), label: t.nav.pricing },
    { href: getLocalizedPath('/demo/growth'), label: dc.viewDemo },
    { href: getLocalizedPath('/faq'), label: t.nav.faq },
    { href: getLocalizedPath('/contact'), label: t.nav.contact },
  ];

  const isActive = (href: string) => location.pathname === href;

  const portalContent = {
    en: {
      clientLogin: 'Client Login',
      portal: 'Portal',
      dashboard: 'Dashboard',
      requests: 'Requests',
      summary: 'Summary',
      logout: 'Log out',
    },
    es: {
      clientLogin: 'Acceso clientes',
      portal: 'Portal',
      dashboard: 'Panel',
      requests: 'Solicitudes',
      summary: 'Resumen',
      logout: 'Cerrar sesión',
    },
  };

  const pc = portalContent[lang];

  const handleLogout = async () => {
    await signOut();
    navigate(getLocalizedPath('/'));
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      {/* Top bar with phone (enterprise pattern) */}
      <div className="hidden lg:block bg-primary text-primary-foreground py-1.5">
        <div className="container flex items-center justify-end gap-6 text-xs">
          <a href={`tel:${siteConfig.phoneRaw}`} className="hover:text-accent transition-colors">
            {siteConfig.phone}
          </a>
          <a href={`mailto:${siteConfig.email}`} className="hover:text-accent transition-colors">
            {siteConfig.email}
          </a>
        </div>
      </div>
      
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to={getLocalizedPath('/')} className="flex items-center">
          <img 
            src={logoHorizontalDark} 
            alt={`${siteConfig.name} - Faster Higher Stronger`}
            className="h-8 w-auto"
          />
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
          {/* Client Portal - Secondary link or Dropdown */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {pc.portal}
                <ChevronDown className="h-3 w-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-background border border-border shadow-lg">
                <DropdownMenuItem asChild>
                  <Link to={getLocalizedPath('/portal')} className="flex items-center gap-2 cursor-pointer">
                    <LayoutDashboard className="h-4 w-4" />
                    {pc.dashboard}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to={getLocalizedPath('/portal/requests')} className="flex items-center gap-2 cursor-pointer">
                    <FileText className="h-4 w-4" />
                    {pc.requests}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to={getLocalizedPath('/portal/summary')} className="flex items-center gap-2 cursor-pointer">
                    <BarChart3 className="h-4 w-4" />
                    {pc.summary}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 cursor-pointer text-destructive">
                  <LogOut className="h-4 w-4" />
                  {pc.logout}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              to={getLocalizedPath('/login')}
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {pc.clientLogin}
            </Link>
          )}

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
            <a href={siteConfig.SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
              {t.nav.schedule}
            </a>
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

              {/* Mobile Portal Section */}
              <div className="pt-4 border-t border-border/50">
                {isAuthenticated ? (
                <div className="space-y-2">
                    <p className="px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {pc.portal}
                    </p>
                    <Link
                      to={getLocalizedPath('/portal')}
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {pc.dashboard}
                    </Link>
                    <Link
                      to={getLocalizedPath('/portal/requests')}
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {pc.requests}
                    </Link>
                    <Link
                      to={getLocalizedPath('/portal/summary')}
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {pc.summary}
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      {pc.logout}
                    </button>
                  </div>
                ) : (
                  <Link
                    to={getLocalizedPath('/login')}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {pc.clientLogin}
                  </Link>
                )}
              </div>

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
                  <a href={siteConfig.SCHEDULE_URL} target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)}>
                    {t.nav.schedule}
                  </a>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
