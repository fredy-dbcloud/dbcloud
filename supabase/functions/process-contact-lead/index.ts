import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

type Lang = "en" | "es";

type ResendEmailPayload = {
  from: string;
  to: string[];
  subject: string;
  html: string;
  text: string;
  reply_to: string;
};

type ResendSendResult =
  | {
      ok: true;
      status: number;
      body: unknown;
      id?: string;
    }
  | {
      ok: false;
      status: number;
      body: unknown;
      error: string;
    };

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const sendResendEmailWithRetry = async (
  apiKey: string,
  payload: ResendEmailPayload,
  label: "internal" | "user"
): Promise<ResendSendResult> => {
  const maxAttempts = 3;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const res = await sendResendEmail(apiKey, payload);

    // Always log the full response for diagnostics
    console.log(`[RESEND][${label}][attempt:${attempt}]`, res);

    if (res.ok) return res;

    // Retry only for rate limiting or transient server errors
    const shouldRetry = res.status === 429 || res.status >= 500;
    if (!shouldRetry || attempt === maxAttempts) return res;

    // Exponential-ish backoff + jitter
    const base = res.status === 429 ? 800 : 400;
    const jitter = Math.floor(Math.random() * 250);
    const delayMs = base * attempt + jitter;
    await sleep(delayMs);
  }

  // Unreachable, but keeps TS happy
  return {
    ok: false,
    status: 500,
    body: null,
    error: "Unknown retry error",
  };
};

// Resend helper - using fetch API directly for Deno compatibility
const sendResendEmail = async (
  apiKey: string,
  payload: ResendEmailPayload
): Promise<ResendSendResult> => {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const rawText = await response.text();
  let body: unknown = rawText;
  try {
    body = rawText ? JSON.parse(rawText) : null;
  } catch {
    // keep rawText
  }

  if (!response.ok) {
    const error =
      typeof body === "string"
        ? body
        : JSON.stringify(body ?? { message: "Unknown Resend error" });
    return { ok: false, status: response.status, body, error };
  }

  const id =
    typeof body === "object" && body !== null && "id" in body
      ? String((body as { id?: unknown }).id ?? "")
      : undefined;

  return { ok: true, status: response.status, body, id };
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ContactLeadRequest {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  interest?: string;
  message?: string;
  lang?: Lang;
  language?: Lang;
}

const sanitizeHtml = (str: string) =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const toHtmlWithLineBreaks = (text: string) =>
  sanitizeHtml(text).replace(/\r?\n/g, "<br />");

const buildInternalEmail = (params: {
  lang: Lang;
  leadId: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  interest: string;
  message: string;
}) => {
  const {
    lang,
    leadId,
    name,
    email,
    phone,
    company,
    interest,
    message,
  } = params;

  const safe = {
    name: sanitizeHtml(name),
    email: sanitizeHtml(email),
    phone: sanitizeHtml(phone || "Not provided"),
    company: sanitizeHtml(company || "Not provided"),
    interest: sanitizeHtml(interest),
    message: toHtmlWithLineBreaks(message),
  };

  const subject = "New contact lead - DBCloud";

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${subject}</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f6f6f6;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
      <tr>
        <td align="center" style="padding:24px 12px;">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; width:600px; max-width:100%; background-color:#ffffff; border:1px solid #e5e7eb;">
            <tr>
              <td style="padding:18px 20px; background-color:#0f172a;">
                <div style="font-family:Arial, Helvetica, sans-serif; color:#ffffff; font-size:18px; font-weight:bold;">DBCloud</div>
                <div style="font-family:Arial, Helvetica, sans-serif; color:#cbd5e1; font-size:12px;">New Contact Form Submission</div>
              </td>
            </tr>
            <tr>
              <td style="padding:20px; font-family:Arial, Helvetica, sans-serif; color:#111827; font-size:14px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                  <tr><td style="padding:6px 0; width:160px; color:#374151;">Name</td><td style="padding:6px 0;">${safe.name}</td></tr>
                  <tr><td style="padding:6px 0; width:160px; color:#374151;">Email</td><td style="padding:6px 0;">${safe.email}</td></tr>
                  <tr><td style="padding:6px 0; width:160px; color:#374151;">Phone</td><td style="padding:6px 0;">${safe.phone}</td></tr>
                  <tr><td style="padding:6px 0; width:160px; color:#374151;">Company</td><td style="padding:6px 0;">${safe.company}</td></tr>
                  <tr><td style="padding:6px 0; width:160px; color:#374151;">Interest</td><td style="padding:6px 0;">${safe.interest}</td></tr>
                  <tr><td style="padding:6px 0; width:160px; color:#374151;">Language</td><td style="padding:6px 0;">${sanitizeHtml(lang.toUpperCase())}</td></tr>
                  <tr><td style="padding:6px 0; width:160px; color:#374151;">Lead ID</td><td style="padding:6px 0;">${sanitizeHtml(leadId)}</td></tr>
                </table>
                <div style="height:1px; background-color:#e5e7eb; margin:16px 0;"></div>
                <div style="font-weight:bold; color:#374151; margin:0 0 6px 0;">Message</div>
                <div style="color:#111827;">${safe.message}</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = `New Contact Form Submission (DBCloud)\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\nCompany: ${company || "Not provided"}\nInterest: ${interest}\nLanguage: ${lang.toUpperCase()}\nLead ID: ${leadId}\n\nMessage:\n${message}`;

  return { subject, html, text };
};

const buildUserConfirmationEmail = (params: {
  lang: Lang;
  name: string;
}) => {
  const { lang, name } = params;
  const safeName = sanitizeHtml(name);

  const subject =
    lang === "es"
      ? "Hemos recibido tu solicitud - DBCloud"
      : "We received your request - DBCloud";

  const previewLine =
    lang === "es"
      ? "Gracias por contactar a DBCloud. Hemos recibido tu mensaje."
      : "Thanks for contacting DBCloud. We received your message.";

  const bodyLine1 =
    lang === "es"
      ? `Hola ${safeName},`
      : `Hi ${safeName},`;

  const bodyLine2 =
    lang === "es"
      ? "Gracias por contactarnos. Hemos recibido tu mensaje y nuestro equipo lo revisara dentro de las proximas 24-48 horas habiles."
      : "Thanks for reaching out. We received your message and our team will review it within the next 24-48 business hours.";

  const bodyLine3 =
    lang === "es"
      ? "Si necesitas responder con mas contexto, simplemente responde a este correo."
      : "If you want to add more context, just reply to this email.";

  const scheduleText =
    lang === "es" ? "Agendar una llamada" : "Schedule a call";
  const scheduleUrl =
    lang === "es" ? "https://dbcloud.us/es/schedule" : "https://dbcloud.us/en/schedule";

  const footerLine =
    lang === "es" ? "Equipo DBCloud" : "DBCloud Team";

  const html = `<!doctype html>
<html lang="${lang}">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${subject}</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f6f6f6;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
      <tr>
        <td align="center" style="padding:24px 12px;">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; width:600px; max-width:100%; background-color:#ffffff; border:1px solid #e5e7eb;">
            <tr>
              <td style="padding:18px 20px; background-color:#0f172a;">
                <div style="font-family:Arial, Helvetica, sans-serif; color:#ffffff; font-size:18px; font-weight:bold;">DBCloud</div>
                <div style="font-family:Arial, Helvetica, sans-serif; color:#cbd5e1; font-size:12px;">${previewLine}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:20px; font-family:Arial, Helvetica, sans-serif; color:#111827; font-size:14px; line-height:20px;">
                <p style="margin:0 0 12px 0;">${bodyLine1}</p>
                <p style="margin:0 0 12px 0;">${bodyLine2}</p>
                <p style="margin:0 0 16px 0;">${bodyLine3}</p>
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; margin:0 0 16px 0;">
                  <tr>
                    <td bgcolor="#0ea5e9" style="padding:10px 14px;">
                      <a href="${scheduleUrl}" style="font-family:Arial, Helvetica, sans-serif; color:#ffffff; text-decoration:none; font-size:14px; font-weight:bold;">${scheduleText}</a>
                    </td>
                  </tr>
                </table>
                <p style="margin:0; color:#6b7280; font-size:12px;">${footerLine} • support@dbcloud.us</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text =
    lang === "es"
      ? `Hola ${name},\n\nGracias por contactarnos. Hemos recibido tu mensaje y nuestro equipo lo revisara dentro de las proximas 24-48 horas habiles.\n\nSi necesitas responder con mas contexto, simplemente responde a este correo.\n\nAgendar una llamada: ${scheduleUrl}\n\nEquipo DBCloud\nsupport@dbcloud.us`
      : `Hi ${name},\n\nThanks for reaching out. We received your message and our team will review it within the next 24-48 business hours.\n\nIf you want to add more context, just reply to this email.\n\nSchedule a call: ${scheduleUrl}\n\nDBCloud Team\nsupport@dbcloud.us`;

  return { subject, html, text };
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const SLACK_WEBHOOK_URL = Deno.env.get("SLACK_WEBHOOK_URL");
    // Slack is optional - will silently skip if not configured

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Supabase environment variables not configured");
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const body: ContactLeadRequest = await req.json();
    const name = body.name;
    const email = body.email;
    const phone = body.phone;
    const company = body.company;
    const interest = body.interest;
    const message = body.message;
    const lang: Lang | undefined = body.lang ?? body.language;

    // Validate required fields
    if (!name || !email || !interest || !message || !lang) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (lang !== "en" && lang !== "es") {
      return new Response(JSON.stringify({ error: "Invalid language" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: "Invalid email format" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Store lead in Supabase
    const { data: lead, error: insertError } = await supabase
      .from("leads")
      .insert({
        name,
        email,
        phone: phone || null,
        company: company || null,
        interest,
        message,
        lang,
        source: "contact_form",
        status: "new",
      })
      .select()
      .single();

    if (insertError) {
      console.error("Error inserting lead:", insertError);
      // Don't fail the request - RLS rate limiting might have kicked in
      if (insertError.message.includes("row-level security")) {
        return new Response(
          JSON.stringify({
            success: true,
            message:
              lang === "es"
                ? "Gracias. Hemos recibido tu mensaje."
                : "Thank you. We received your message.",
          }),
          {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      throw insertError;
    }

    const leadId = lead?.id || "unknown";
    let slackOk = false;
    let internalEmailOk = false;
    let userEmailOk = false;
    let internalEmailId: string | undefined;
    let userEmailId: string | undefined;

    // Send internal notification email
    try {
      const internal = buildInternalEmail({
        lang,
        leadId,
        name,
        email,
        phone,
        company,
        interest,
        message,
      });

      const internalRes = await sendResendEmailWithRetry(
        RESEND_API_KEY,
        {
        from: "DBCloud <support@dbcloud.us>",
        to: ["support@dbcloud.us"],
        subject: internal.subject,
        html: internal.html,
        text: internal.text,
        reply_to: "support@dbcloud.us",
        },
        "internal"
      );

      internalEmailOk = internalRes.ok;
      internalEmailId = internalRes.ok ? internalRes.id : undefined;
    } catch (emailError) {
      console.error("[RESEND][internal][exception]", emailError);
    }

    // Send user confirmation email (language-aware, deliverability-first)
    try {
      const userEmail = buildUserConfirmationEmail({ lang, name });

      const userRes = await sendResendEmailWithRetry(
        RESEND_API_KEY,
        {
        from: "DBCloud <support@dbcloud.us>",
        to: [email],
        subject: userEmail.subject,
        html: userEmail.html,
        text: userEmail.text,
        reply_to: "support@dbcloud.us",
        },
        "user"
      );

      userEmailOk = userRes.ok;
      userEmailId = userRes.ok ? userRes.id : undefined;
    } catch (emailError) {
      console.error("[RESEND][user][exception]", emailError);
    }

    // Send Slack notification (optional)
    if (SLACK_WEBHOOK_URL) {
      try {
        const slackPayload = {
          text: "🚀 New DBCloud Lead",
          blocks: [
            {
              type: "header",
              text: {
                type: "plain_text",
                text: "🚀 New DBCloud Lead",
                emoji: true,
              },
            },
            {
              type: "section",
              fields: [
                { type: "mrkdwn", text: `*Name:*\n${name}` },
                { type: "mrkdwn", text: `*Email:*\n${email}` },
                {
                  type: "mrkdwn",
                  text: `*Company:*\n${company || "Not provided"}`,
                },
                { type: "mrkdwn", text: `*Interest:*\n${interest}` },
                { type: "mrkdwn", text: `*Language:*\n${lang.toUpperCase()}` },
                {
                  type: "mrkdwn",
                  text: `*Phone:*\n${phone || "Not provided"}`,
                },
              ],
            },
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: `*Message:*\n${message.substring(0, 500)}${message.length > 500 ? "..." : ""}`,
              },
            },
          ],
        };

        const slackResponse = await fetch(SLACK_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(slackPayload),
        });

        if (!slackResponse.ok) {
          console.error("[SLACK] webhook failed:", await slackResponse.text());
        } else {
          slackOk = true;
          console.log("[SLACK] notification sent");
        }
      } catch (slackError) {
        console.error("[SLACK][exception]", slackError);
      }
    }

    // Status handling (do not block UI if notifications fail)
    // - notified: Slack OK + both emails OK
    // - partial_notified: Slack OK + one email OK
    // - email_failed: Slack OK + both emails failed
    if (leadId !== "unknown" && slackOk) {
      const nextStatus =
        internalEmailOk && userEmailOk
          ? "notified"
          : internalEmailOk || userEmailOk
            ? "partial_notified"
            : "email_failed";

      const { error: statusError } = await supabase
        .from("leads")
        .update({ status: nextStatus })
        .eq("id", leadId);

      if (statusError) {
        console.error("[LEAD] status update failed:", statusError);
      } else {
        console.log("[LEAD] status updated:", { leadId, status: nextStatus });
      }
    } else if (leadId !== "unknown" && !slackOk) {
      console.log("[LEAD] Slack not confirmed; leaving status as-is", {
        leadId,
        internalEmailOk,
        userEmailOk,
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        message:
          lang === "es"
            ? "¡Gracias! Nos pondremos en contacto pronto."
            : "Thank you! We'll be in touch soon.",
        debug: {
          leadId,
          slackOk,
          internalEmail: { ok: internalEmailOk, id: internalEmailId },
          userEmail: { ok: userEmailOk, id: userEmailId },
        },
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Error processing contact lead:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
};

serve(handler);
