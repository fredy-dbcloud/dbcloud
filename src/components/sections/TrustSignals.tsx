import { Shield, Users, MapPin } from 'lucide-react';
import { useLang } from '@/hooks/useLang';
import { cn } from '@/lib/utils';

interface TrustSignalsProps {
  variant?: 'light' | 'dark';
}

/**
 * Lightweight trust signals bar for placement below hero sections
 * SMB-focused: US-based, senior engineers, small business expertise
 */
export function TrustSignals({ variant = 'light' }: TrustSignalsProps) {
  const { lang } = useLang();

  // Removed "Cloud, databases & AI" - already communicated in hero
  // Focus on trust differentiators only
  const signals = lang === 'es' 
    ? [
        { icon: MapPin, text: 'Empresa registrada en EE.UU.' },
        { icon: Users, text: 'Ingenieros senior, +10 años' },
        { icon: Shield, text: 'Especialistas en PyMEs' },
      ]
    : [
        { icon: MapPin, text: 'US-registered company' },
        { icon: Users, text: 'Senior engineers, 10+ years' },
        { icon: Shield, text: 'SMB specialists' },
      ];

  return (
    <div className={cn(
      "flex flex-wrap items-center justify-center gap-6 py-4 text-sm",
      variant === 'dark' 
        ? "text-white/80" 
        : "text-muted-foreground"
    )}>
      {signals.map(({ icon: Icon, text }) => (
        <div key={text} className="flex items-center gap-2">
          <Icon className={cn(
            "h-4 w-4",
            variant === 'dark' ? "text-accent" : "text-accent/70"
          )} />
          <span>{text}</span>
        </div>
      ))}
    </div>
  );
}
