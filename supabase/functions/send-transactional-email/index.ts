import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: Record<string, unknown>) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[SEND-EMAIL] ${step}${detailsStr}`);
};

// Email templates
const templates = {
  purchase_confirmation: {
    en: {
      subject: "Welcome to DBCloud — Your Client Portal Access",
      getBody: (data: { planName: string; billingCycle: string; portalUrl: string }) => `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #0f172a; font-size: 24px; margin: 0;">Welcome to DBCloud</h1>
          </div>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            Thank you for choosing DBCloud. Your subscription is now active.
          </p>
          
          <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin: 24px 0;">
            <p style="margin: 0 0 8px; color: #64748b; font-size: 14px;">Plan</p>
            <p style="margin: 0; color: #0f172a; font-size: 18px; font-weight: 600;">${data.planName}</p>
            <p style="margin: 16px 0 0; color: #64748b; font-size: 14px;">Billing Cycle</p>
            <p style="margin: 0; color: #0f172a; font-size: 16px;">${data.billingCycle}</p>
          </div>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            All work requests, status updates, and monthly summaries are managed exclusively through your Client Portal. This ensures proper tracking, response time adherence, and full visibility into your engagement.
          </p>
          
          <div style="text-align: center; margin: 32px 0;">
            <a href="${data.portalUrl}" style="display: inline-block; background: #3b82f6; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
              Access Client Portal
            </a>
          </div>
          
          <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 32px;">
            <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin: 0;">
              All operational requests are handled exclusively through the Client Portal to ensure traceability and compliance.
            </p>
          </div>
          
          <p style="color: #64748b; font-size: 14px; margin-top: 24px;">
            — The DBCloud Team
          </p>
        </div>
      `,
    },
    es: {
      subject: "Bienvenido a DBCloud — Acceso a tu Portal de Clientes",
      getBody: (data: { planName: string; billingCycle: string; portalUrl: string }) => `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #0f172a; font-size: 24px; margin: 0;">Bienvenido a DBCloud</h1>
          </div>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            Gracias por elegir DBCloud. Tu suscripción está activa.
          </p>
          
          <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin: 24px 0;">
            <p style="margin: 0 0 8px; color: #64748b; font-size: 14px;">Plan</p>
            <p style="margin: 0; color: #0f172a; font-size: 18px; font-weight: 600;">${data.planName}</p>
            <p style="margin: 16px 0 0; color: #64748b; font-size: 14px;">Ciclo de Facturación</p>
            <p style="margin: 0; color: #0f172a; font-size: 16px;">${data.billingCycle}</p>
          </div>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            Todas las solicitudes de trabajo, actualizaciones de estado y resúmenes mensuales se gestionan exclusivamente a través del Portal de Clientes. Esto garantiza seguimiento adecuado, cumplimiento de tiempos de respuesta y visibilidad total de tu engagement.
          </p>
          
          <div style="text-align: center; margin: 32px 0;">
            <a href="${data.portalUrl}" style="display: inline-block; background: #3b82f6; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
              Acceder al Portal de Clientes
            </a>
          </div>
          
          <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 32px;">
            <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin: 0;">
              Todas las solicitudes operativas se gestionan exclusivamente a través del Portal de Clientes para garantizar trazabilidad y cumplimiento.
            </p>
          </div>
          
          <p style="color: #64748b; font-size: 14px; margin-top: 24px;">
            — El Equipo de DBCloud
          </p>
        </div>
      `,
    },
  },

  request_submitted: {
    en: {
      subject: "Request received — DBCloud",
      getBody: (data: { requestId: string; requestType: string; responseTime: string; portalUrl: string }) => `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #0f172a; font-size: 24px; margin: 0;">Request Received</h1>
          </div>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            We've received your request and it's now being reviewed by our team.
          </p>
          
          <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin: 24px 0;">
            <p style="margin: 0 0 8px; color: #64748b; font-size: 14px;">Request ID</p>
            <p style="margin: 0; color: #0f172a; font-size: 16px; font-family: monospace;">${data.requestId.slice(0, 8).toUpperCase()}</p>
            <p style="margin: 16px 0 8px; color: #64748b; font-size: 14px;">Type</p>
            <p style="margin: 0; color: #0f172a; font-size: 16px;">${data.requestType}</p>
            <p style="margin: 16px 0 8px; color: #64748b; font-size: 14px;">Expected Response Time</p>
            <p style="margin: 0; color: #0f172a; font-size: 16px;">${data.responseTime}</p>
          </div>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            <strong>What happens next:</strong>
          </p>
          <ul style="color: #374151; font-size: 15px; line-height: 1.8; padding-left: 20px;">
            <li>Our team will review your request and assess scope</li>
            <li>You'll receive status updates as work progresses</li>
            <li>Track all updates in real-time via your Portal</li>
          </ul>
          
          <div style="text-align: center; margin: 32px 0;">
            <a href="${data.portalUrl}" style="display: inline-block; background: #3b82f6; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
              View Request in Portal
            </a>
          </div>
          
          <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 32px;">
            <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin: 0;">
              All operational requests are handled exclusively through the Client Portal to ensure traceability and compliance.
            </p>
          </div>
          
          <p style="color: #64748b; font-size: 14px; margin-top: 24px;">
            — The DBCloud Team
          </p>
        </div>
      `,
    },
    es: {
      subject: "Solicitud recibida — DBCloud",
      getBody: (data: { requestId: string; requestType: string; responseTime: string; portalUrl: string }) => `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #0f172a; font-size: 24px; margin: 0;">Solicitud Recibida</h1>
          </div>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            Hemos recibido tu solicitud y está siendo revisada por nuestro equipo.
          </p>
          
          <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin: 24px 0;">
            <p style="margin: 0 0 8px; color: #64748b; font-size: 14px;">ID de Solicitud</p>
            <p style="margin: 0; color: #0f172a; font-size: 16px; font-family: monospace;">${data.requestId.slice(0, 8).toUpperCase()}</p>
            <p style="margin: 16px 0 8px; color: #64748b; font-size: 14px;">Tipo</p>
            <p style="margin: 0; color: #0f172a; font-size: 16px;">${data.requestType}</p>
            <p style="margin: 16px 0 8px; color: #64748b; font-size: 14px;">Tiempo de Respuesta Esperado</p>
            <p style="margin: 0; color: #0f172a; font-size: 16px;">${data.responseTime}</p>
          </div>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            <strong>Próximos pasos:</strong>
          </p>
          <ul style="color: #374151; font-size: 15px; line-height: 1.8; padding-left: 20px;">
            <li>Nuestro equipo revisará tu solicitud y evaluará el alcance</li>
            <li>Recibirás actualizaciones de estado conforme avance el trabajo</li>
            <li>Sigue todas las actualizaciones en tiempo real desde tu Portal</li>
          </ul>
          
          <div style="text-align: center; margin: 32px 0;">
            <a href="${data.portalUrl}" style="display: inline-block; background: #3b82f6; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
              Ver Solicitud en el Portal
            </a>
          </div>
          
          <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 32px;">
            <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin: 0;">
              Todas las solicitudes operativas se gestionan exclusivamente a través del Portal de Clientes para garantizar trazabilidad y cumplimiento.
            </p>
          </div>
          
          <p style="color: #64748b; font-size: 14px; margin-top: 24px;">
            — El Equipo de DBCloud
          </p>
        </div>
      `,
    },
  },

  request_status_update: {
    en: {
      subject: "Your request has been updated — DBCloud",
      getBody: (data: { requestId: string; oldStatus: string; newStatus: string; statusMessage: string; nextAction: string; portalUrl: string }) => `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #0f172a; font-size: 24px; margin: 0;">Request Updated</h1>
          </div>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            There's an update on your request <strong>${data.requestId.slice(0, 8).toUpperCase()}</strong>.
          </p>
          
          <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin: 24px 0;">
            <p style="margin: 0 0 8px; color: #64748b; font-size: 14px;">Status Changed</p>
            <p style="margin: 0; color: #0f172a; font-size: 16px;">
              <span style="color: #94a3b8;">${data.oldStatus}</span> → <strong style="color: #22c55e;">${data.newStatus}</strong>
            </p>
            ${data.statusMessage ? `
            <p style="margin: 16px 0 8px; color: #64748b; font-size: 14px;">Update</p>
            <p style="margin: 0; color: #0f172a; font-size: 15px;">${data.statusMessage}</p>
            ` : ''}
            ${data.nextAction ? `
            <p style="margin: 16px 0 8px; color: #64748b; font-size: 14px;">Next Expected Action</p>
            <p style="margin: 0; color: #0f172a; font-size: 15px;">${data.nextAction}</p>
            ` : ''}
          </div>
          
          <div style="text-align: center; margin: 32px 0;">
            <a href="${data.portalUrl}" style="display: inline-block; background: #3b82f6; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
              Track Progress
            </a>
          </div>
          
          <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 32px;">
            <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin: 0;">
              All operational requests are handled exclusively through the Client Portal to ensure traceability and compliance.
            </p>
          </div>
          
          <p style="color: #64748b; font-size: 14px; margin-top: 24px;">
            — The DBCloud Team
          </p>
        </div>
      `,
    },
    es: {
      subject: "Actualización de tu solicitud — DBCloud",
      getBody: (data: { requestId: string; oldStatus: string; newStatus: string; statusMessage: string; nextAction: string; portalUrl: string }) => `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #0f172a; font-size: 24px; margin: 0;">Solicitud Actualizada</h1>
          </div>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            Hay una actualización en tu solicitud <strong>${data.requestId.slice(0, 8).toUpperCase()}</strong>.
          </p>
          
          <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin: 24px 0;">
            <p style="margin: 0 0 8px; color: #64748b; font-size: 14px;">Cambio de Estado</p>
            <p style="margin: 0; color: #0f172a; font-size: 16px;">
              <span style="color: #94a3b8;">${data.oldStatus}</span> → <strong style="color: #22c55e;">${data.newStatus}</strong>
            </p>
            ${data.statusMessage ? `
            <p style="margin: 16px 0 8px; color: #64748b; font-size: 14px;">Actualización</p>
            <p style="margin: 0; color: #0f172a; font-size: 15px;">${data.statusMessage}</p>
            ` : ''}
            ${data.nextAction ? `
            <p style="margin: 16px 0 8px; color: #64748b; font-size: 14px;">Próxima Acción Esperada</p>
            <p style="margin: 0; color: #0f172a; font-size: 15px;">${data.nextAction}</p>
            ` : ''}
          </div>
          
          <div style="text-align: center; margin: 32px 0;">
            <a href="${data.portalUrl}" style="display: inline-block; background: #3b82f6; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
              Seguir Progreso
            </a>
          </div>
          
          <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 32px;">
            <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin: 0;">
              Todas las solicitudes operativas se gestionan exclusivamente a través del Portal de Clientes para garantizar trazabilidad y cumplimiento.
            </p>
          </div>
          
          <p style="color: #64748b; font-size: 14px; margin-top: 24px;">
            — El Equipo de DBCloud
          </p>
        </div>
      `,
    },
  },

  monthly_summary: {
    en: {
      subject: "Your Monthly Account Summary — DBCloud",
      getBody: (data: { month: string; year: number; hoursUsed: number; hoursIncluded: number; requestsCompleted: number; portalUrl: string }) => `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #0f172a; font-size: 24px; margin: 0;">Monthly Summary</h1>
            <p style="color: #64748b; font-size: 16px; margin: 8px 0 0;">${data.month} ${data.year}</p>
          </div>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            Your monthly summary is ready. Here's a quick overview of your account activity.
          </p>
          
          <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin: 24px 0;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 16px;">
              <div>
                <p style="margin: 0 0 4px; color: #64748b; font-size: 14px;">Hours Used</p>
                <p style="margin: 0; color: #0f172a; font-size: 24px; font-weight: 700;">${data.hoursUsed}h <span style="font-size: 16px; color: #64748b; font-weight: 400;">/ ${data.hoursIncluded}h</span></p>
              </div>
              <div style="text-align: right;">
                <p style="margin: 0 0 4px; color: #64748b; font-size: 14px;">Requests Completed</p>
                <p style="margin: 0; color: #0f172a; font-size: 24px; font-weight: 700;">${data.requestsCompleted}</p>
              </div>
            </div>
            <div style="background: #e2e8f0; border-radius: 4px; height: 8px; overflow: hidden;">
              <div style="background: #3b82f6; height: 100%; width: ${Math.min((data.hoursUsed / data.hoursIncluded) * 100, 100)}%;"></div>
            </div>
          </div>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            View the full summary in your Client Portal for detailed insights, value delivered, and recommendations.
          </p>
          
          <div style="text-align: center; margin: 32px 0;">
            <a href="${data.portalUrl}" style="display: inline-block; background: #3b82f6; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
              View Full Summary
            </a>
          </div>
          
          <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 32px;">
            <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin: 0;">
              All operational requests are handled exclusively through the Client Portal to ensure traceability and compliance.
            </p>
          </div>
          
          <p style="color: #64748b; font-size: 14px; margin-top: 24px;">
            — The DBCloud Team
          </p>
        </div>
      `,
    },
    es: {
      subject: "Resumen mensual de tu cuenta — DBCloud",
      getBody: (data: { month: string; year: number; hoursUsed: number; hoursIncluded: number; requestsCompleted: number; portalUrl: string }) => `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #0f172a; font-size: 24px; margin: 0;">Resumen Mensual</h1>
            <p style="color: #64748b; font-size: 16px; margin: 8px 0 0;">${data.month} ${data.year}</p>
          </div>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            Tu resumen mensual está listo. Aquí tienes un resumen rápido de la actividad de tu cuenta.
          </p>
          
          <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin: 24px 0;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 16px;">
              <div>
                <p style="margin: 0 0 4px; color: #64748b; font-size: 14px;">Horas Usadas</p>
                <p style="margin: 0; color: #0f172a; font-size: 24px; font-weight: 700;">${data.hoursUsed}h <span style="font-size: 16px; color: #64748b; font-weight: 400;">/ ${data.hoursIncluded}h</span></p>
              </div>
              <div style="text-align: right;">
                <p style="margin: 0 0 4px; color: #64748b; font-size: 14px;">Solicitudes Completadas</p>
                <p style="margin: 0; color: #0f172a; font-size: 24px; font-weight: 700;">${data.requestsCompleted}</p>
              </div>
            </div>
            <div style="background: #e2e8f0; border-radius: 4px; height: 8px; overflow: hidden;">
              <div style="background: #3b82f6; height: 100%; width: ${Math.min((data.hoursUsed / data.hoursIncluded) * 100, 100)}%;"></div>
            </div>
          </div>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            Consulta el resumen completo en tu Portal de Clientes para ver insights detallados, valor entregado y recomendaciones.
          </p>
          
          <div style="text-align: center; margin: 32px 0;">
            <a href="${data.portalUrl}" style="display: inline-block; background: #3b82f6; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
              Ver Resumen Completo
            </a>
          </div>
          
          <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 32px;">
            <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin: 0;">
              Todas las solicitudes operativas se gestionan exclusivamente a través del Portal de Clientes para garantizar trazabilidad y cumplimiento.
            </p>
          </div>
          
          <p style="color: #64748b; font-size: 14px; margin-top: 24px;">
            — El Equipo de DBCloud
          </p>
        </div>
      `,
    },
  },
};

type EmailType = keyof typeof templates;
type Language = 'en' | 'es';

interface EmailRequest {
  type: EmailType;
  to: string;
  lang: Language;
  data: Record<string, unknown>;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const { type, to, lang, data }: EmailRequest = await req.json();
    logStep("Request received", { type, to, lang });

    if (!type || !to || !lang || !data) {
      throw new Error("Missing required fields: type, to, lang, data");
    }

    const template = templates[type];
    if (!template) {
      throw new Error(`Unknown email type: ${type}`);
    }

    const langTemplate = template[lang] || template.en;
    const subject = langTemplate.subject;
    const html = langTemplate.getBody(data as any);

    logStep("Sending email", { type, to, subject });

    const emailResponse = await resend.emails.send({
      from: "DBCloud <noreply@dbcloud.io>",
      to: [to],
      subject,
      html,
    });

    const responseData = emailResponse as { data?: { id?: string }; error?: unknown };
    logStep("Email sent successfully", { id: responseData.data?.id });

    return new Response(JSON.stringify({ success: true, id: responseData.data?.id }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
};

serve(handler);
