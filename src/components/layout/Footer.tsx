import { Link } from 'react-router-dom';
import { Mail, MapPin, Linkedin, Facebook, Instagram, ExternalLink } from 'lucide-react';
import { useLang } from '@/hooks/useLang';
import { siteConfig } from '@/config/site';
import { BillingPortalButton } from '@/components/billing/BillingPortalButton';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import logoHorizontalLight from '@/assets/logos/logo-dbcloud-horizontal-light.png';

export function Footer() {
  const { lang, t, getLocalizedPath } = useLang();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Academy Banner */}
      <div className="border-b border-primary-foreground/10">
        <div className="container py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-primary-foreground/80">
              {t.footer.academy.title}
            </p>
            <a
              href={siteConfig.ACADEMY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent hover:underline font-medium"
            >
              {t.footer.academy.link}
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="container py-12 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to={getLocalizedPath('/')} className="inline-block mb-4">
              <img 
                src={logoHorizontalLight} 
                alt={`${siteConfig.name} - Faster Higher Stronger`}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-primary-foreground/70 text-sm mb-6">
              {siteConfig.meta[lang].description.slice(0, 120)}...
            </p>
            <div className="flex gap-4">
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/60 hover:text-accent transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/60 hover:text-accent transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/60 hover:text-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/60 hover:text-accent transition-colors"
                aria-label="TikTok"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">{t.footer.company}</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to={getLocalizedPath('/services')} className="text-primary-foreground/70 hover:text-accent transition-colors">
                  {t.nav.services}
                </Link>
              </li>
              <li>
                <Link to={getLocalizedPath('/ai')} className="text-primary-foreground/70 hover:text-accent transition-colors">
                  {t.nav.ai}
                </Link>
              </li>
              <li>
                <Link to={getLocalizedPath('/pricing')} className="text-primary-foreground/70 hover:text-accent transition-colors">
                  {t.nav.pricing}
                </Link>
              </li>
              <li>
                <Link to={getLocalizedPath('/contact')} className="text-primary-foreground/70 hover:text-accent transition-colors">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Clients Section */}
          <div>
            <h4 className="font-display font-semibold mb-4">
              {lang === 'en' ? 'Clients' : 'Clientes'}
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to={getLocalizedPath('/login')} className="text-primary-foreground/70 hover:text-accent transition-colors">
                  {lang === 'en' ? 'Client Portal' : 'Portal de Clientes'}
                </Link>
              </li>
              <li>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link to={getLocalizedPath('/portal/requests')} className="text-primary-foreground/70 hover:text-accent transition-colors inline-flex items-center gap-1">
                      {lang === 'en' ? 'Support Requests (via Portal)' : 'Solicitudes y Soporte (vía Portal)'}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-xs text-center">
                    {lang === 'en' 
                      ? 'All operational requests are handled exclusively through the Client Portal to ensure traceability and compliance.'
                      : 'Todas las solicitudes operativas se gestionan exclusivamente a través del Portal de Clientes para garantizar trazabilidad y cumplimiento.'}
                  </TooltipContent>
                </Tooltip>
              </li>
              <li>
                <BillingPortalButton>
                  {lang === 'en' ? 'Billing & Subscriptions' : 'Facturación y Suscripciones'}
                </BillingPortalButton>
              </li>
            </ul>
          </div>

          {/* Industries Section */}
          <div>
            <h4 className="font-display font-semibold mb-4">
              {lang === 'en' ? 'Industries' : 'Industrias'}
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to={getLocalizedPath('/industries/retail')} className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Retail SMB
                </Link>
              </li>
              <li>
                <Link to={getLocalizedPath('/industries/healthcare')} className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Healthcare SMB
                </Link>
              </li>
              <li>
                <Link to={getLocalizedPath('/industries/saas')} className="text-primary-foreground/70 hover:text-accent transition-colors">
                  SaaS SMB
                </Link>
              </li>
            </ul>
          </div>

          {/* Demos Section */}
          <div>
            <h4 className="font-display font-semibold mb-4">
              {lang === 'en' ? 'Demos' : 'Demostraciones'}
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to={getLocalizedPath('/demo/starter')} className="text-primary-foreground/70 hover:text-accent transition-colors">
                  {lang === 'en' ? 'Starter Demo' : 'Demo Starter'}
                </Link>
              </li>
              <li>
                <Link to={getLocalizedPath('/demo/growth')} className="text-primary-foreground/70 hover:text-accent transition-colors">
                  {lang === 'en' ? 'Growth Demo' : 'Demo Growth'}
                </Link>
              </li>
              <li>
                <Link to={getLocalizedPath('/demo/enterprise')} className="text-primary-foreground/70 hover:text-accent transition-colors">
                  {lang === 'en' ? 'Enterprise Demo' : 'Demo Enterprise'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display font-semibold mb-4">{t.footer.resources}</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to={getLocalizedPath('/faq')} className="text-primary-foreground/70 hover:text-accent transition-colors">
                  {t.nav.faq}
                </Link>
              </li>
              <li>
                <a
                  href={siteConfig.ACADEMY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/70 hover:text-accent transition-colors inline-flex items-center gap-1"
                >
                  {t.nav.academy}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-semibold mb-4">{t.nav.contact}</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 mt-0.5 text-accent" />
                <a href={`mailto:${siteConfig.email}`} className="text-primary-foreground/70 hover:text-accent transition-colors">
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <svg viewBox="0 0 24 24" className="h-4 w-4 mt-0.5 text-accent fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <a
                  href={(siteConfig.WHATSAPP[lang] || siteConfig.WHATSAPP.en).url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-accent" />
                <span className="text-primary-foreground/70">
                  {lang === 'es' 
                    ? 'Empresa registrada y en cumplimiento para operar en EE.UU.'
                    : 'Registered and compliant to operate in the US'}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p className="text-primary-foreground/60">
            © {currentYear} {siteConfig.name}. {t.footer.rights}
          </p>
          <div className="flex gap-6">
            <Link to={getLocalizedPath('/privacy')} className="text-primary-foreground/60 hover:text-accent transition-colors">
              {t.footer.privacy}
            </Link>
            <Link to={getLocalizedPath('/terms')} className="text-primary-foreground/60 hover:text-accent transition-colors">
              {t.footer.terms}
            </Link>
            <Link to={getLocalizedPath('/cookies')} className="text-primary-foreground/60 hover:text-accent transition-colors">
              {lang === 'en' ? 'Cookie Policy' : 'Política de Cookies'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
