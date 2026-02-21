import { Bot } from 'lucide-react';
import { useLang } from '@/hooks/useLang';
import { aiAdvisorCopy, type AiLang } from '@/config/aiAdvisor';

/**
 * Small inline CTA to open the AI Advisor widget.
 * Place near primary CTAs on home + pricing pages.
 * Dispatches a custom event that the widget listens for.
 */
export function AiAdvisorInlineCTA() {
  const { lang } = useLang();
  const copy = aiAdvisorCopy[lang as AiLang];

  const handleClick = () => {
    window.dispatchEvent(new CustomEvent('open-ai-advisor'));
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent/80 transition-colors font-medium group"
    >
      <Bot className="h-4 w-4 group-hover:scale-110 transition-transform" />
      {copy.ctaInline}
    </button>
  );
}
