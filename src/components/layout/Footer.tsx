import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Facebook, Instagram, ExternalLink } from 'lucide-react';
import { useLang } from '@/hooks/useLang';
import { siteConfig } from '@/config/site';

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
            <Link to={getLocalizedPath('/')} className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
                <span className="font-display text-lg font-bold text-accent-foreground">DB</span>
              </div>
              <span className="font-display text-xl font-bold">{siteConfig.name}</span>
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
                <Phone className="h-4 w-4 mt-0.5 text-accent" />
                <a href={`tel:${siteConfig.phone}`} className="text-primary-foreground/70 hover:text-accent transition-colors">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-accent" />
                <span className="text-primary-foreground/70">
                  {siteConfig.address.street}<br />
                  {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}
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
          </div>
        </div>
      </div>
    </footer>
  );
}
