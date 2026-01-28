import { Shield, Users, MapPin } from 'lucide-react';
import { useLang } from '@/hooks/useLang';

/**
 * Lightweight trust signals bar for placement below hero sections
 * SMB-focused: US-based, senior engineers, small business expertise
 */
export function TrustSignals() {
  const { lang } = useLang();

  const signals = lang === 'es' 
    ? [
        { icon: MapPin, text: 'Empresa registrada en EE.UU.' },
        { icon: Users, text: 'Ingenieros senior con +10 años' },
        { icon: Shield, text: 'Especialistas en PyMEs' },
      ]
    : [
        { icon: MapPin, text: 'US-registered company' },
        { icon: Users, text: 'Senior engineers, 10+ years' },
        { icon: Shield, text: 'SMB specialists' },
      ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-6 py-4 text-muted-foreground text-sm">
      {signals.map(({ icon: Icon, text }) => (
        <div key={text} className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-accent/70" />
          <span>{text}</span>
        </div>
      ))}
    </div>
  );
}
