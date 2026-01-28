import { Link, useLocation } from 'react-router-dom';
import { useLang } from '@/hooks/useLang';
import { cn } from '@/lib/utils';

interface NavItem {
  href: string;
  label: string;
}

export function HeaderNav() {
  const { lang, t, getLocalizedPath } = useLang();
  const location = useLocation();

  // Navigation order optimized for SMB buying intent
  const navItems: NavItem[] = [
    { href: getLocalizedPath('/'), label: t.nav.home },
    { href: getLocalizedPath('/services'), label: t.nav.services },
    { href: getLocalizedPath('/ai'), label: t.nav.ai },
    { href: getLocalizedPath('/pricing'), label: t.nav.pricing },
    { href: getLocalizedPath('/demo/growth'), label: lang === 'es' ? 'Ver Demo' : 'View Demo' },
    { href: getLocalizedPath('/faq'), label: t.nav.faq },
    { href: getLocalizedPath('/contact'), label: t.nav.contact },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav className="hidden lg:flex items-center gap-1">
      {navItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            "px-3 py-2 text-sm font-normal rounded-md transition-colors",
            isActive(item.href)
              ? "text-primary bg-primary/5"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
