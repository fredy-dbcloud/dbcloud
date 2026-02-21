import { useRef, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, X, Send, ArrowRight, Calendar, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLang } from '@/hooks/useLang';
import { useAiAdvisor, type LeadData } from '@/hooks/useAiAdvisor';
import { cn } from '@/lib/utils';
import { AiAdvisorLeadForm } from './AiAdvisorLeadForm';
import type { AiLang } from '@/config/aiAdvisor';

/* ------------------------------------------------------------------ */
/*  Widget                                                             */
/* ------------------------------------------------------------------ */

export function AiAdvisorWidget() {
  const { lang } = useLang();
  const locale = lang as AiLang;
  const advisor = useAiAdvisor(locale);
  const { messages, isLoading, isOpen, open, close, sendMessage, showLeadForm, setShowLeadForm, leadSubmitted, submitLead, recommendation, leadData, scheduleUrl, copy } = advisor;
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, showLeadForm]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    sendMessage(input.trim());
    setInput('');
  };

  const handleScheduleClick = () => {
    console.info('[ai_advisor] ai_schedule_clicked');
    try {
      const dl = (window as unknown as { dataLayer?: unknown[] }).dataLayer;
      if (dl) dl.push({ event: 'ai_schedule_clicked' });
    } catch { /* noop */ }
  };

  const buildSummary = () => {
    if (!leadData) return '';
    return [
      `Name: ${leadData.name}`,
      `Email: ${leadData.email}`,
      `Company: ${leadData.company}`,
      `Cloud: ${leadData.cloudProvider}`,
      `Urgency: ${leadData.urgency}`,
      leadData.monthlySpend ? `Spend: ${leadData.monthlySpend}` : null,
      `Recommendation: ${recommendation ?? 'growth'}`,
    ].filter(Boolean).join('\n');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(buildSummary());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <AnimatePresence>
        {/* Floating button */}
        {!isOpen && (
          <motion.button
            key="ai-fab"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={open}
            className="fixed bottom-24 right-6 z-50 flex items-center gap-2 rounded-full bg-primary px-5 py-3.5 text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-[0.98]"
            aria-label={copy.floatingLabel}
          >
            <Bot className="h-5 w-5" />
            <span className="text-sm font-semibold hidden sm:inline">{copy.floatingLabel}</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="ai-panel"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className={cn(
              'fixed z-50 flex flex-col bg-card border border-border shadow-xl overflow-hidden',
              // Desktop
              'bottom-24 right-6 w-[400px] max-w-[calc(100vw-2rem)] rounded-2xl max-h-[600px]',
              // Mobile full-screen
              'max-sm:inset-0 max-sm:bottom-0 max-sm:right-0 max-sm:w-full max-sm:max-w-none max-sm:rounded-none max-sm:max-h-none'
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 px-5 py-4 bg-primary text-primary-foreground shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/20 shrink-0">
                  <Bot className="h-5 w-5 text-accent" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold truncate">{copy.headerTitle}</h3>
                  <p className="text-xs text-primary-foreground/70 truncate">{copy.headerSubtitle}</p>
                </div>
              </div>
              <button onClick={close} className="p-1.5 rounded-lg hover:bg-primary-foreground/10 transition-colors shrink-0">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Pre-sales notice */}
            <div className="px-5 pt-3 pb-1">
              <p className="text-[11px] text-muted-foreground/70 bg-muted/60 rounded-lg px-3 py-1.5">{copy.preSalesNotice}</p>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-3 space-y-3">
              {messages.map(msg => (
                <div key={msg.id} className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                  <div className={cn(
                    'max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-md'
                      : 'bg-muted text-foreground rounded-bl-md'
                  )}>
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Quick replies */}
              {messages.length > 0 && !showLeadForm && !isLoading && (() => {
                const last = messages[messages.length - 1];
                return last.role === 'assistant' && last.quickReplies?.length ? (
                  <div className="flex flex-wrap gap-1.5">
                    {last.quickReplies.map(qr => (
                      <button
                        key={qr}
                        onClick={() => sendMessage(qr)}
                        className="px-3 py-1.5 text-xs rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                      >
                        {qr}
                      </button>
                    ))}
                  </div>
                ) : null;
              })()}

              {/* Lead capture form */}
              {showLeadForm && !leadSubmitted && (
                <AiAdvisorLeadForm
                  copy={copy.leadForm}
                  onSubmit={submitLead}
                  onDismiss={() => setShowLeadForm(false)}
                />
              )}

              {/* Recommendation + Schedule CTA */}
              {leadSubmitted && recommendation && leadData && (
                <div className="space-y-3">
                  <a
                    href={scheduleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleScheduleClick}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-accent text-accent-foreground text-sm font-semibold hover:bg-accent/90 transition-colors"
                  >
                    <Calendar className="h-4 w-4" />
                    {copy.recommendation.scheduleCta}
                  </a>

                  {/* Summary box */}
                  <div className="bg-muted/60 rounded-xl p-3 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-foreground">{copy.recommendation.summaryHeading}</span>
                      <button onClick={handleCopy} className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                        {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        <span>{copied ? copy.recommendation.copiedLabel : copy.recommendation.copyLabel}</span>
                      </button>
                    </div>
                    <pre className="whitespace-pre-wrap text-muted-foreground font-mono text-[11px]">{buildSummary()}</pre>
                  </div>
                </div>
              )}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="px-5 py-3 border-t border-border shrink-0">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder={copy.placeholder}
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  size="icon"
                  className="bg-accent hover:bg-accent/90 shrink-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
