import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLang } from '@/hooks/useLang';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

export function HeaderActions() {
  const { lang, t, getLocalizedPath, switchLang } = useLang();

  return (
    <div className="hidden lg:flex items-center gap-3">
      {/* Client Login - Low emphasis utility link */}
      <Link 
        to={getLocalizedPath('/login')}
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        {lang === 'es' ? 'Iniciar Sesión' : 'Client Login'}
      </Link>

      {/* Secondary CTA - Contact Us */}
      <Button asChild variant="outline" size="sm" className="border-primary/30 hover:border-primary">
        <Link to={getLocalizedPath('/contact')}>
          {lang === 'es' ? 'Contáctanos' : 'Contact Us'}
        </Link>
      </Button>
      
      {/* Primary CTA - Schedule a Call */}
      <Button asChild size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-sm">
        <a href={siteConfig.SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
          {t.nav.schedule}
        </a>
      </Button>

      {/* Language Switcher - After CTAs */}
      <div className="flex items-center text-sm border-l border-border/50 pl-3 ml-1">
        <Link
          to={switchLang('en')}
          className={cn(
            "px-2 py-1 rounded transition-colors",
            lang === 'en' 
              ? "text-primary font-medium" 
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          EN
        </Link>
        <span className="text-muted-foreground/30">|</span>
        <Link
          to={switchLang('es')}
          className={cn(
            "px-2 py-1 rounded transition-colors",
            lang === 'es' 
              ? "text-primary font-medium" 
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          ES
        </Link>
      </div>
    </div>
  );
}
