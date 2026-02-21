import { useState, useCallback, useRef, useEffect } from 'react';
import { aiAdvisorConfig, aiAdvisorCopy, type AiChatRequest, type AiChatResponse, type AiLang } from '@/config/aiAdvisor';
import { siteConfig } from '@/config/site';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface AdvisorMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  quickReplies?: string[];
  leadCapture?: boolean;
  planRecommendation?: 'starter' | 'growth' | 'enterprise';
}

export interface LeadData {
  name: string;
  email: string;
  company: string;
  cloudProvider: string;
  urgency: string;
  monthlySpend: string;
}

/* ------------------------------------------------------------------ */
/*  Analytics (console / dataLayer — no external dependency)           */
/* ------------------------------------------------------------------ */

function track(event: string, data?: Record<string, unknown>) {
  console.info(`[ai_advisor] ${event}`, data);
  try {
    const dl = (window as unknown as { dataLayer?: unknown[] }).dataLayer;
    if (dl) dl.push({ event, ...data });
  } catch { /* noop */ }
}

/* ------------------------------------------------------------------ */
/*  Session ID                                                         */
/* ------------------------------------------------------------------ */

function getSessionId(): string {
  const KEY = 'dbcloud_ai_session';
  let id = localStorage.getItem(KEY);
  if (!id) {
    id = crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem(KEY, id);
  }
  return id;
}

/* ------------------------------------------------------------------ */
/*  Mock engine                                                        */
/* ------------------------------------------------------------------ */

const INTENT_KEYWORDS = ['pricing', 'precio', 'contact', 'contacto', 'schedule', 'agendar', 'start', 'empezar', 'comenzar'];

function mockReply(message: string, locale: AiLang, msgCount: number): AiChatResponse {
  const lower = message.toLowerCase();
  const copy = aiAdvisorCopy[locale];
  const hasIntent = INTENT_KEYWORDS.some(k => lower.includes(k));
  const shouldCapture = hasIntent || msgCount >= 3;

  // Plan-specific replies
  if (lower.includes('growth') || lower.includes('incluye') || lower.includes('included')) {
    return {
      reply: locale === 'es'
        ? 'Growth Consulting ($899/mes) incluye 10 horas/mes de consultoría y ejecución, gestión asistida de 1 entorno de base de datos, optimización de rendimiento y costos, y monitoreo avanzado. Respuesta el mismo o siguiente día hábil.'
        : 'Growth Consulting ($899/mo) includes 10 hours/month of consulting & execution, assisted management of 1 database environment, performance & cost optimization, and advanced monitoring. Same or next business day response.',
      suggestedQuickReplies: shouldCapture ? undefined : [copy.quickReplies[0], copy.quickReplies[3]],
      leadCapture: shouldCapture,
    };
  }

  if (lower.includes('plan') || lower.includes('conviene') || lower.includes('fit')) {
    return {
      reply: locale === 'es'
        ? '¡Buena pregunta! Depende de si necesitas solo asesoría (Starter, $299/mes) o ejecución activa (Growth, $899/mes). La mayoría de empresas con producción activa eligen Growth. ¿Tienes cargas de producción activas?'
        : 'Great question! It depends on whether you need advisory only (Starter, $299/mo) or active execution (Growth, $899/mo). Most companies with active production choose Growth. Do you have active production workloads?',
      suggestedQuickReplies: shouldCapture ? undefined : [
        locale === 'es' ? 'Sí, tenemos producción activa' : 'Yes, we have active production',
        locale === 'es' ? 'Solo necesitamos dirección' : 'We just need direction',
      ],
      leadCapture: shouldCapture,
    };
  }

  if (lower.includes('fast') || lower.includes('rápido') || lower.includes('empezar') || lower.includes('start')) {
    return {
      reply: locale === 'es'
        ? 'Podemos iniciar en 48 horas después de la evaluación gratuita. Sin contratos largos — facturación mensual transparente.'
        : 'We can start within 48 hours after your free assessment. No long-term contracts — transparent monthly billing.',
      leadCapture: shouldCapture,
    };
  }

  if (lower.includes('cost') || lower.includes('costo') || lower.includes('estim') || lower.includes('price') || lower.includes('precio')) {
    return {
      reply: locale === 'es'
        ? 'Starter es $299/mes (4h), Growth es $899/mes (10h), y Enterprise es personalizado. La mayoría de empresas en crecimiento recuperan el costo del plan en 30-60 días. ¿Quieres que te recomiende el mejor plan?'
        : 'Starter is $299/mo (4h), Growth is $899/mo (10h), and Enterprise is custom. Most growing companies recover the plan cost in 30-60 days. Want me to recommend the best plan for you?',
      leadCapture: shouldCapture,
    };
  }

  // Default / generic reply
  return {
    reply: locale === 'es'
      ? 'Puedo ayudarte a elegir el plan ideal para tu empresa. ¿Cuál es tu principal necesidad: asesoría estratégica, ejecución activa, o soporte gestionado completo?'
      : "I can help you choose the right plan for your company. What's your main need: strategic advisory, active execution, or full managed support?",
    suggestedQuickReplies: copy.quickReplies.slice(0, 4),
    leadCapture: shouldCapture,
  };
}

/* ------------------------------------------------------------------ */
/*  Hook                                                               */
/* ------------------------------------------------------------------ */

export function useAiAdvisor(locale: AiLang) {
  const copy = aiAdvisorCopy[locale];
  const sessionId = useRef(getSessionId());
  const [messages, setMessages] = useState<AdvisorMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [recommendation, setRecommendation] = useState<'starter' | 'growth' | 'enterprise' | null>(null);
  const [leadData, setLeadData] = useState<LeadData | null>(null);
  const msgCountRef = useRef(0);

  // Initial greeting
  useEffect(() => {
    setMessages([{
      id: 'greeting',
      role: 'assistant',
      content: copy.headerSubtitle,
      quickReplies: copy.quickReplies.slice(0, 4),
    }]);
  }, [locale]);

  const open = useCallback(() => {
    setIsOpen(true);
    track('ai_opened');
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  // Listen for custom event from inline CTAs
  useEffect(() => {
    const handler = () => open();
    window.addEventListener('open-ai-advisor', handler);
    return () => window.removeEventListener('open-ai-advisor', handler);
  }, [open]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: AdvisorMessage = {
      id: `u_${Date.now()}`,
      role: 'user',
      content: text.trim(),
    };
    setMessages(prev => [...prev, userMsg]);
    msgCountRef.current += 1;
    track('ai_message_sent', { message: text.trim() });
    setIsLoading(true);

    let response: AiChatResponse;

    if (aiAdvisorConfig.mockMode || !aiAdvisorConfig.apiBaseUrl) {
      // Mock mode
      await new Promise(r => setTimeout(r, 400 + Math.random() * 300));
      response = mockReply(text, locale, msgCountRef.current);
    } else {
      // Live backend call
      try {
        const payload: AiChatRequest = {
          message: text.trim(),
          locale,
          pageUrl: window.location.href,
          sessionId: sessionId.current,
        };
        const res = await fetch(`${aiAdvisorConfig.apiBaseUrl}${aiAdvisorConfig.chatPath}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        response = await res.json();
      } catch {
        // Graceful fallback
        response = {
          reply: copy.offline,
          leadCapture: false,
        };
      }
    }

    const assistantMsg: AdvisorMessage = {
      id: `a_${Date.now()}`,
      role: 'assistant',
      content: response.reply,
      quickReplies: response.suggestedQuickReplies,
      leadCapture: response.leadCapture,
      planRecommendation: response.planRecommendation,
    };

    setMessages(prev => [...prev, assistantMsg]);
    if (response.leadCapture && !leadSubmitted) {
      setShowLeadForm(true);
    }
    if (response.planRecommendation) {
      setRecommendation(response.planRecommendation);
    }
    setIsLoading(false);
  }, [isLoading, locale, copy, leadSubmitted]);

  const submitLead = useCallback(async (data: LeadData) => {
    setLeadData(data);
    setLeadSubmitted(true);
    setShowLeadForm(false);
    track('ai_lead_submitted', { ...data });

    // Determine recommendation
    const lower = (data.urgency + ' ' + (data.monthlySpend || '')).toLowerCase();
    let rec: 'starter' | 'growth' | 'enterprise' = 'growth';
    if (lower.includes('$20k') || lower.includes('enterprise')) rec = 'enterprise';
    else if (lower.includes('< $1k') && !lower.includes('today')) rec = 'starter';
    setRecommendation(rec);

    const recCopy = copy.recommendation[rec];
    const assistantMsg: AdvisorMessage = {
      id: `rec_${Date.now()}`,
      role: 'assistant',
      content: recCopy,
      planRecommendation: rec,
    };
    setMessages(prev => [...prev, assistantMsg]);

    // Also try to send to backend
    if (!aiAdvisorConfig.mockMode && aiAdvisorConfig.apiBaseUrl) {
      try {
        const payload: AiChatRequest = {
          message: '__lead_submitted__',
          locale,
          pageUrl: window.location.href,
          sessionId: sessionId.current,
          lead: data,
        };
        await fetch(`${aiAdvisorConfig.apiBaseUrl}${aiAdvisorConfig.chatPath}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch { /* best-effort */ }
    }

    // Save to existing leads table via supabase
    try {
      const { supabase } = await import('@/integrations/supabase/client');
      await supabase.from('leads').insert({
        email: data.email,
        name: data.name,
        company: data.company,
        interest: `ai_advisor_${rec}`,
        source: 'ai_advisor',
        lang: locale,
        message: `Cloud: ${data.cloudProvider}, Urgency: ${data.urgency}, Spend: ${data.monthlySpend || 'N/A'}`,
      });
    } catch { /* best-effort */ }
  }, [locale, copy, leadSubmitted]);

  const scheduleUrl = siteConfig.SCHEDULE_URL;

  return {
    messages,
    isLoading,
    isOpen,
    open,
    close,
    sendMessage,
    showLeadForm,
    setShowLeadForm,
    leadSubmitted,
    submitLead,
    recommendation,
    leadData,
    scheduleUrl,
    copy,
  };
}
