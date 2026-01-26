import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLang } from '@/hooks/useLang';
import { siteConfig } from '@/config/site';

export function PageMeta() {
  const { lang, t } = useLang();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    // Update html lang attribute
    document.documentElement.lang = lang;

    // Get page-specific meta
    const getPageMeta = () => {
      const basePath = pathname.replace(`/${lang}`, '');
      
      switch (basePath) {
        case '':
        case '/':
          return {
            title: siteConfig.meta[lang].title,
            description: siteConfig.meta[lang].description,
          };
        case '/services':
          return {
            title: lang === 'es' 
              ? 'Servicios | DBCloud - Cloud y Bases de Datos'
              : 'Services | DBCloud - Cloud & Database Solutions',
            description: lang === 'es'
              ? 'Servicios empresariales de infraestructura cloud, bases de datos administradas y migración.'
              : 'Enterprise cloud infrastructure, managed database services, and migration solutions.',
          };
        case '/ai':
          return {
            title: lang === 'es'
              ? 'Soluciones de IA | DBCloud - IA Empresarial'
              : 'AI Solutions | DBCloud - Enterprise AI',
            description: lang === 'es'
              ? 'Agentes de IA privados, evaluaciones de preparación para IA y soluciones de ML empresariales.'
              : 'Private AI agents, AI readiness assessments, and enterprise ML solutions.',
          };
        case '/pricing':
          return {
            title: lang === 'es'
              ? 'Precios | DBCloud - Planes y Tarifas'
              : 'Pricing | DBCloud - Plans & Rates',
            description: lang === 'es'
              ? 'Precios transparentes para servicios de bases de datos administradas. Desde $499/mes.'
              : 'Transparent pricing for managed database services. Starting at $499/month.',
          };
        case '/faq':
          return {
            title: lang === 'es'
              ? 'Preguntas Frecuentes | DBCloud'
              : 'FAQ | DBCloud - Frequently Asked Questions',
            description: lang === 'es'
              ? 'Encuentra respuestas sobre servicios de bases de datos administradas, migración cloud y soluciones de IA.'
              : 'Find answers about managed database services, cloud migration, and AI solutions.',
          };
        case '/contact':
          return {
            title: lang === 'es'
              ? 'Contacto | DBCloud - Habla con Nosotros'
              : 'Contact | DBCloud - Get in Touch',
            description: lang === 'es'
              ? 'Contáctanos para discutir tus necesidades de infraestructura cloud y bases de datos.'
              : 'Contact us to discuss your cloud infrastructure and database needs.',
          };
        case '/schedule':
          return {
            title: lang === 'es'
              ? 'Agendar Llamada | DBCloud'
              : 'Schedule a Call | DBCloud',
            description: lang === 'es'
              ? 'Agenda una llamada con nuestros expertos en cloud y bases de datos.'
              : 'Schedule a call with our cloud and database experts.',
          };
        default:
          return {
            title: siteConfig.meta[lang].title,
            description: siteConfig.meta[lang].description,
          };
      }
    };

    const { title, description } = getPageMeta();
    const fullUrl = `${siteConfig.url}${pathname}`;
    const alternateUrl = `${siteConfig.url}${pathname.replace(`/${lang}`, `/${lang === 'en' ? 'es' : 'en'}`)}`;

    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMeta = (name: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        if (isProperty) {
          meta.setAttribute('property', name);
        } else {
          meta.name = name;
        }
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Basic meta
    updateMeta('description', description);
    updateMeta('keywords', siteConfig.meta[lang].keywords);

    // Open Graph
    updateMeta('og:title', title, true);
    updateMeta('og:description', description, true);
    updateMeta('og:url', fullUrl, true);
    updateMeta('og:type', 'website', true);
    updateMeta('og:image', siteConfig.ogImage, true);
    updateMeta('og:locale', lang === 'es' ? 'es_ES' : 'en_US', true);
    updateMeta('og:site_name', siteConfig.name, true);

    // Twitter
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', siteConfig.ogImage);

    // Update canonical and alternate links
    const updateLink = (rel: string, href: string, hreflang?: string) => {
      let selector = `link[rel="${rel}"]`;
      if (hreflang) selector += `[hreflang="${hreflang}"]`;
      
      let link = document.querySelector(selector) as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = rel;
        if (hreflang) link.hreflang = hreflang;
        document.head.appendChild(link);
      }
      link.href = href;
    };

    updateLink('canonical', fullUrl);
    updateLink('alternate', fullUrl, lang);
    updateLink('alternate', alternateUrl, lang === 'en' ? 'es' : 'en');

  }, [lang, pathname]);

  return null;
}
