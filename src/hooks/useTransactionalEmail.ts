import { supabase } from '@/integrations/supabase/client';

type EmailType = 'purchase_confirmation' | 'request_submitted' | 'request_status_update' | 'monthly_summary';
type Language = 'en' | 'es';

interface EmailData {
  [key: string]: unknown;
}

interface SendEmailResult {
  success: boolean;
  error?: string;
}

export function useTransactionalEmail() {
  const sendEmail = async (
    type: EmailType,
    to: string,
    lang: Language,
    data: EmailData
  ): Promise<SendEmailResult> => {
    try {
      const { data: response, error } = await supabase.functions.invoke('send-transactional-email', {
        body: { type, to, lang, data },
      });

      if (error) {
        console.error('Error sending transactional email:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('Error sending transactional email:', errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const sendPurchaseConfirmation = async (
    to: string,
    lang: Language,
    planName: string,
    billingCycle: string,
    portalUrl: string
  ) => {
    return sendEmail('purchase_confirmation', to, lang, {
      planName,
      billingCycle,
      portalUrl,
    });
  };

  const sendRequestSubmitted = async (
    to: string,
    lang: Language,
    requestId: string,
    requestType: string,
    responseTime: string,
    portalUrl: string
  ) => {
    return sendEmail('request_submitted', to, lang, {
      requestId,
      requestType,
      responseTime,
      portalUrl,
    });
  };

  const sendRequestStatusUpdate = async (
    to: string,
    lang: Language,
    requestId: string,
    oldStatus: string,
    newStatus: string,
    statusMessage: string,
    nextAction: string,
    portalUrl: string
  ) => {
    return sendEmail('request_status_update', to, lang, {
      requestId,
      oldStatus,
      newStatus,
      statusMessage,
      nextAction,
      portalUrl,
    });
  };

  const sendMonthlySummary = async (
    to: string,
    lang: Language,
    month: string,
    year: number,
    hoursUsed: number,
    hoursIncluded: number,
    requestsCompleted: number,
    portalUrl: string
  ) => {
    return sendEmail('monthly_summary', to, lang, {
      month,
      year,
      hoursUsed,
      hoursIncluded,
      requestsCompleted,
      portalUrl,
    });
  };

  return {
    sendEmail,
    sendPurchaseConfirmation,
    sendRequestSubmitted,
    sendRequestStatusUpdate,
    sendMonthlySummary,
  };
}
