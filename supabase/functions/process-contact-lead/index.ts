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

    // Send user confirmation email (language-aware)
    try {
      const isSpanish = lang === "es";
      await sendEmail(RESEND_API_KEY, {
        from: "DBCloud <support@dbcloud.us>",
        to: [email],
        subject: isSpanish
          ? "Hemos recibido tu solicitud – DBCloud"
          : "We received your request – DBCloud",
        html: isSpanish
          ? `
            <h2>Hola ${safeName},</h2>
            <p>Gracias por contactar a DBCloud.</p>
            <p>Hemos recibido tu mensaje y nuestro equipo se comunicará contigo pronto.</p>
            <br />
            <p>Saludos,<br />El equipo de DBCloud</p>
          `
          : `
            <h2>Hi ${safeName},</h2>
            <p>Thanks for contacting DBCloud.</p>
            <p>We've received your message and our team will get back to you shortly.</p>
            <br />
            <p>Best regards,<br />The DBCloud Team</p>
          `,
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
