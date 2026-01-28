import { Link } from 'react-router-dom';
import { useLang } from '@/hooks/useLang';
import dbcloudIcon from '@/assets/logos/dbcloud-icon.png';

interface HeaderLogoProps {
  className?: string;
  isScrolled?: boolean;
}

export function HeaderLogo({ className = '', isScrolled = false }: HeaderLogoProps) {
  const { getLocalizedPath } = useLang();
  
  return (
    <Link 
      to={getLocalizedPath('/')} 
      className={`flex items-center gap-2 transition-all duration-300 ${className}`}
      aria-label="DBCloud - Home"
    >
      <img
        src={dbcloudIcon}
        alt="DBCloud"
        className={`transition-all duration-300 ${isScrolled ? 'h-7' : 'h-8'} w-auto`}
      />
      <span className={`font-semibold text-foreground transition-all duration-300 ${isScrolled ? 'text-lg' : 'text-xl'}`}>
        DBCloud
      </span>
    </Link>
  );
}
