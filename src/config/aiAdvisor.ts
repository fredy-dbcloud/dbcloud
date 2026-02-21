/**
 * AI Advisor Configuration
 *
 * ENV variables for AWS Amplify migration:
 *   VITE_AI_API_BASE_URL  – Base URL of the AI chat backend (e.g. https://api.example.com)
 *   VITE_AI_MOCK_MODE     – "true" to use deterministic mock replies (default: true)
 *
 * When deploying to Amplify, set:
 *   VITE_AI_API_BASE_URL → your Amplify Function / API Gateway endpoint
 *   VITE_AI_MOCK_MODE    → false
 */

export const aiAdvisorConfig = {
  /** Base URL for the AI backend. Empty string = no backend configured. */
  apiBaseUrl: import.meta.env.VITE_AI_API_BASE_URL ?? '',
  /** Chat endpoint path appended to apiBaseUrl */
  chatPath: import.meta.env.VITE_AI_CHAT_PATH ?? '/chat',
  /** When true, use local mock responses (no network calls) */
  mockMode: (import.meta.env.VITE_AI_MOCK_MODE ?? 'true') === 'true',
} as const;

/* ------------------------------------------------------------------ */
/*  Bilingual copy                                                     */
/* ------------------------------------------------------------------ */

export const aiAdvisorCopy = {
  en: {
    floatingLabel: 'AI Advisor',
    headerTitle: 'DBCloud AI Advisor (24/7)',
    headerSubtitle: 'Ask about plans, pricing, onboarding, and what to choose.',
    placeholder: 'Type your question…',
    sendLabel: 'Send',
    quickReplies: [
      'Which plan fits me?',
      "What's included in Growth?",
      'How fast can we start?',
      'Can you estimate my monthly cost?',
    ],
    leadForm: {
      heading: 'Get a personalized recommendation',
      name: 'Name',
      email: 'Work email',
      company: 'Company',
      cloudProvider: 'Cloud provider',
      cloudOptions: ['AWS', 'Azure', 'GCP', 'Oracle', 'Not sure'],
      urgency: 'When do you need to start?',
      urgencyOptions: ['Today', 'This week', 'This month'],
      spend: 'Monthly cloud spend (optional)',
      spendOptions: ['< $1k', '$1k–$5k', '$5k–$20k', '$20k+', 'Not sure'],
      submit: 'Send & Get My Recommendation',
    },
    recommendation: {
      heading: 'Our recommendation',
      starter: 'Based on your needs, **Starter Consulting** ($299/mo) gives you strategic direction without execution overhead.',
      growth: 'Based on your needs, **Growth Consulting** ($899/mo) is the best fit — hands-on execution + advisory for active production workloads.',
      enterprise: 'Your environment requires **Enterprise** — custom SLAs, 24/7 support, and compliance certifications.',
      scheduleCta: 'Schedule My Free Assessment',
      summaryHeading: 'Summary for our engineer',
      copyLabel: 'Copy',
      copiedLabel: 'Copied!',
    },
    offline: "We're offline for a moment — please schedule a call or use Contact.",
    ctaInline: 'Chat with AI Advisor 24/7',
    preSalesNotice: 'For active clients, all support is handled via the Client Portal.',
  },
  es: {
    floatingLabel: 'Asistente IA',
    headerTitle: 'Asistente IA DBCloud (24/7)',
    headerSubtitle: 'Pregunta sobre planes, precios, onboarding y cuál elegir.',
    placeholder: 'Escribe tu pregunta…',
    sendLabel: 'Enviar',
    quickReplies: [
      '¿Qué plan me conviene?',
      '¿Qué incluye Growth?',
      '¿Qué tan rápido empezamos?',
      '¿Puedes estimar mi costo mensual?',
    ],
    leadForm: {
      heading: 'Recibe una recomendación personalizada',
      name: 'Nombre',
      email: 'Email corporativo',
      company: 'Empresa',
      cloudProvider: 'Proveedor cloud',
      cloudOptions: ['AWS', 'Azure', 'GCP', 'Oracle', 'No estoy seguro'],
      urgency: '¿Cuándo necesitas empezar?',
      urgencyOptions: ['Hoy', 'Esta semana', 'Este mes'],
      spend: 'Gasto cloud mensual (opcional)',
      spendOptions: ['< $1k', '$1k–$5k', '$5k–$20k', '$20k+', 'No estoy seguro'],
      submit: 'Enviar y Recibir Recomendación',
    },
    recommendation: {
      heading: 'Nuestra recomendación',
      starter: 'Según tus necesidades, **Starter Consulting** ($299/mes) te da dirección estratégica sin carga de ejecución.',
      growth: 'Según tus necesidades, **Growth Consulting** ($899/mes) es la mejor opción — ejecución práctica + asesoría para cargas de producción activas.',
      enterprise: 'Tu entorno requiere **Enterprise** — SLAs personalizados, soporte 24/7 y certificaciones de cumplimiento.',
      scheduleCta: 'Agendar Evaluación Gratuita',
      summaryHeading: 'Resumen para nuestro ingeniero',
      copyLabel: 'Copiar',
      copiedLabel: '¡Copiado!',
    },
    offline: 'Estamos offline por un momento — agenda una llamada o usa Contacto.',
    ctaInline: 'Chatea con Asistente IA 24/7',
    preSalesNotice: 'Para clientes activos, el soporte se gestiona vía Portal de Clientes.',
  },
} as const;

export type AiLang = keyof typeof aiAdvisorCopy;

/* ------------------------------------------------------------------ */
/*  Types for the backend contract                                     */
/* ------------------------------------------------------------------ */

export interface AiChatRequest {
  message: string;
  locale: 'en' | 'es';
  pageUrl: string;
  sessionId: string;
  lead?: {
    name?: string;
    email?: string;
    company?: string;
    cloudProvider?: string;
    urgency?: string;
    monthlySpend?: string;
  };
}

export interface AiChatResponse {
  reply: string;
  suggestedQuickReplies?: string[];
  leadCapture?: boolean;
  planRecommendation?: 'starter' | 'growth' | 'enterprise';
}
