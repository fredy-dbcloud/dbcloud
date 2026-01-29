import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

// Resend helper - using fetch API directly for Deno compatibility
const sendEmail = async (
  apiKey: string,
  payload: {
    from: string;
    to: string[];
    subject: string;
    html: string;
  }
) => {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend API error: ${response.status} - ${errorText}`);
  }

  return response.json();
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ContactLeadRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  interest: string;
  message: string;
  lang: "en" | "es";
}

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
    const { name, email, phone, company, interest, message, lang } = body;

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

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: "Invalid email format" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Sanitize inputs for HTML emails
    const sanitize = (str: string) =>
      str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

    const safeName = sanitize(name);
    const safeEmail = sanitize(email);
    const safePhone = phone ? sanitize(phone) : "Not provided";
    const safeCompany = company ? sanitize(company) : "Not provided";
    const safeInterest = sanitize(interest);
    const safeMessage = sanitize(message);

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
            message: "Thank you for your message!",
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
    let notificationSuccess = true;

    // Send internal notification email
    try {
      await sendEmail(RESEND_API_KEY, {
        from: "DBCloud <support@dbcloud.us>",
        to: ["support@dbcloud.us"],
        subject: "New Contact Lead – DBCloud",
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Phone:</strong> ${safePhone}</p>
          <p><strong>Company:</strong> ${safeCompany}</p>
          <p><strong>Interest:</strong> ${safeInterest}</p>
          <p><strong>Language:</strong> ${lang.toUpperCase()}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p>${safeMessage.replace(/\n/g, "<br>")}</p>
          <hr />
          <p style="color: #666; font-size: 12px;">Lead ID: ${leadId}</p>
        `,
      });
      console.log("Internal notification email sent");
    } catch (emailError) {
      console.error("Error sending internal email:", emailError);
      notificationSuccess = false;
    }

    // Send user confirmation email (language-aware, professionally styled)
    try {
      const isSpanish = lang === "es";
      const emailHtml = isSpanish
        ? `
          <!DOCTYPE html>
          <html lang="es">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f5; line-height: 1.6;">
            <table role="presentation" style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 40px 20px;">
                  <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <!-- Header -->
                    <tr>
                      <td style="background: linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%); padding: 32px 40px; text-align: center;">
                        <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">DBCloud</h1>
                        <p style="margin: 8px 0 0; color: #94a3b8; font-size: 14px;">Cloud & Database Experts</p>
                      </td>
                    </tr>
                    <!-- Content -->
                    <tr>
                      <td style="padding: 40px;">
                        <h2 style="margin: 0 0 24px; color: #1e3a5f; font-size: 24px; font-weight: 600;">Hola ${safeName},</h2>
                        <p style="margin: 0 0 16px; color: #374151; font-size: 16px;">Gracias por contactar a DBCloud. Hemos recibido tu mensaje y queremos confirmarte que está en buenas manos.</p>
                        
                        <!-- What happens next -->
                        <div style="background-color: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 20px; margin: 24px 0; border-radius: 0 8px 8px 0;">
                          <h3 style="margin: 0 0 12px; color: #0369a1; font-size: 16px; font-weight: 600;">📋 ¿Qué sigue?</h3>
                          <ul style="margin: 0; padding-left: 20px; color: #374151; font-size: 15px;">
                            <li style="margin-bottom: 8px;">Nuestro equipo revisará tu solicitud <strong>dentro de las próximas 24-48 horas hábiles</strong></li>
                            <li style="margin-bottom: 8px;">Te contactaremos al correo que proporcionaste</li>
                            <li>Si es urgente, puedes agendar una llamada directamente</li>
                          </ul>
                        </div>

                        <!-- CTA Button -->
                        <div style="text-align: center; margin: 32px 0;">
                          <a href="https://dbcloud.us/es/schedule" style="display: inline-block; background: linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 12px rgba(14, 165, 233, 0.4);">Agendar una Llamada</a>
                        </div>

                        <p style="margin: 24px 0 0; color: #6b7280; font-size: 15px;">Mientras tanto, puedes explorar nuestros servicios en <a href="https://dbcloud.us/es" style="color: #0ea5e9; text-decoration: none; font-weight: 500;">dbcloud.us</a></p>
                      </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                      <td style="background-color: #f8fafc; padding: 24px 40px; border-top: 1px solid #e2e8f0;">
                        <p style="margin: 0 0 8px; color: #1e3a5f; font-size: 14px; font-weight: 600;">El equipo de DBCloud</p>
                        <p style="margin: 0; color: #64748b; font-size: 13px;">Cloud Infrastructure • Managed Databases • AI Solutions</p>
                        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
                        <p style="margin: 0; color: #94a3b8; font-size: 12px; text-align: center;">
                          Este email fue enviado porque solicitaste información a través de nuestro formulario de contacto.
                          <br />© ${new Date().getFullYear()} DBCloud. Todos los derechos reservados.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `
        : `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f5; line-height: 1.6;">
            <table role="presentation" style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 40px 20px;">
                  <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <!-- Header -->
                    <tr>
                      <td style="background: linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%); padding: 32px 40px; text-align: center;">
                        <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">DBCloud</h1>
                        <p style="margin: 8px 0 0; color: #94a3b8; font-size: 14px;">Cloud & Database Experts</p>
                      </td>
                    </tr>
                    <!-- Content -->
                    <tr>
                      <td style="padding: 40px;">
                        <h2 style="margin: 0 0 24px; color: #1e3a5f; font-size: 24px; font-weight: 600;">Hi ${safeName},</h2>
                        <p style="margin: 0 0 16px; color: #374151; font-size: 16px;">Thank you for reaching out to DBCloud. We've received your message and want to confirm it's in good hands.</p>
                        
                        <!-- What happens next -->
                        <div style="background-color: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 20px; margin: 24px 0; border-radius: 0 8px 8px 0;">
                          <h3 style="margin: 0 0 12px; color: #0369a1; font-size: 16px; font-weight: 600;">📋 What happens next?</h3>
                          <ul style="margin: 0; padding-left: 20px; color: #374151; font-size: 15px;">
                            <li style="margin-bottom: 8px;">Our team will review your request <strong>within 24-48 business hours</strong></li>
                            <li style="margin-bottom: 8px;">We'll contact you at the email you provided</li>
                            <li>If it's urgent, you can schedule a call directly</li>
                          </ul>
                        </div>

                        <!-- CTA Button -->
                        <div style="text-align: center; margin: 32px 0;">
                          <a href="https://dbcloud.us/en/schedule" style="display: inline-block; background: linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 12px rgba(14, 165, 233, 0.4);">Schedule a Call</a>
                        </div>

                        <p style="margin: 24px 0 0; color: #6b7280; font-size: 15px;">In the meantime, feel free to explore our services at <a href="https://dbcloud.us/en" style="color: #0ea5e9; text-decoration: none; font-weight: 500;">dbcloud.us</a></p>
                      </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                      <td style="background-color: #f8fafc; padding: 24px 40px; border-top: 1px solid #e2e8f0;">
                        <p style="margin: 0 0 8px; color: #1e3a5f; font-size: 14px; font-weight: 600;">The DBCloud Team</p>
                        <p style="margin: 0; color: #64748b; font-size: 13px;">Cloud Infrastructure • Managed Databases • AI Solutions</p>
                        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
                        <p style="margin: 0; color: #94a3b8; font-size: 12px; text-align: center;">
                          This email was sent because you submitted a request through our contact form.
                          <br />© ${new Date().getFullYear()} DBCloud. All rights reserved.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `;

      await sendEmail(RESEND_API_KEY, {
        from: "DBCloud <support@dbcloud.us>",
        to: [email],
        subject: isSpanish
          ? "Hemos recibido tu solicitud – DBCloud"
          : "We received your request – DBCloud",
        html: emailHtml,
      });
      console.log("User confirmation email sent");
    } catch (emailError) {
      console.error("Error sending user confirmation email:", emailError);
      // Don't fail - user shouldn't see error for confirmation email failure
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
          console.error("Slack webhook failed:", await slackResponse.text());
          notificationSuccess = false;
        } else {
          console.log("Slack notification sent");
        }
      } catch (slackError) {
        console.error("Error sending Slack notification:", slackError);
        notificationSuccess = false;
      }
    }

    // Update lead status to "notified" if notifications succeeded
    if (notificationSuccess && leadId !== "unknown") {
      await supabase
        .from("leads")
        .update({ status: "notified" })
        .eq("id", leadId);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message:
          lang === "es"
            ? "¡Gracias! Nos pondremos en contacto pronto."
            : "Thank you! We'll be in touch soon.",
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
