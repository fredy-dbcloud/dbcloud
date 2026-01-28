import { Link } from 'react-router-dom';
import { useLang } from '@/hooks/useLang';

interface HeaderLogoProps {
  className?: string;
  isScrolled?: boolean;
}

// DBCloud cloud icon - extracted from brand assets
// Clean, minimal cloud with circuit nodes (matches brand identity)
export function HeaderLogo({ className = '', isScrolled = false }: HeaderLogoProps) {
  const { getLocalizedPath } = useLang();
  
  return (
    <Link 
      to={getLocalizedPath('/')} 
      className={`flex items-center transition-all duration-300 ${className}`}
      aria-label="DBCloud - Home"
    >
      <svg
        viewBox="0 0 120 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`transition-all duration-300 ${isScrolled ? 'h-8' : 'h-10'} w-auto`}
      >
        {/* Cloud outline */}
        <path
          d="M95 35c0-13.807-11.193-25-25-25-10.494 0-19.5 6.473-23.214 15.636C44.907 24.229 42.517 23.5 40 23.5c-6.627 0-12 5.373-12 12 0 .847.088 1.673.254 2.47C19.41 40.33 13 48.42 13 58c0 11.598 9.402 21 21 21h60c9.941 0 18-8.059 18-18 0-9.389-7.19-17.096-16.364-17.907C95.87 40.61 96 38.33 96 36c0-.338-.003-.675-.01-1h-.99z"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        />
        {/* Circuit nodes and lines - brand identity element */}
        <circle cx="45" cy="45" r="4" fill="currentColor" className="text-primary" />
        <circle cx="70" cy="40" r="4" fill="currentColor" className="text-primary" />
        <circle cx="85" cy="52" r="4" fill="currentColor" className="text-primary" />
        <circle cx="55" cy="58" r="4" fill="currentColor" className="text-primary" />
        <path
          d="M45 45h20M70 40l15 12M55 58h-10"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          className="text-primary"
        />
      </svg>
    </Link>
  );
}
