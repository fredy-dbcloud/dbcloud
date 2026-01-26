import { useLocation } from 'react-router-dom';
import { Lang, defaultLang } from '@/config/site';
import { translations } from '@/config/translations';

export function useLang() {
  const location = useLocation();
  
  const lang: Lang = location.pathname.startsWith('/es') ? 'es' : 'en';
  
  const t = translations[lang];
  
  const getLocalizedPath = (path: string): string => {
    // Remove any existing language prefix
    const cleanPath = path.replace(/^\/(en|es)/, '');
    return `/${lang}${cleanPath || ''}`;
  };
  
  const switchLang = (newLang: Lang): string => {
    const currentPath = location.pathname.replace(/^\/(en|es)/, '');
    return `/${newLang}${currentPath || ''}`;
  };
  
  return { lang, t, getLocalizedPath, switchLang };
}
