import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Add-on price IDs
const ADDON_PRICES: Record<string, string> = {
  extra_hours: "price_1Su2EYBZAcqESBha3bCwnbDa",
  incident_pack: "price_1Su2F1BZAcqESBhauYP1TRb2",
  assessment: "price_1Su2FLBZAcqESBhaxulNBfVx",
};

const logStep = (step: string, details?: Record<string, unknown>) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-ADDON-PAYMENT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    logStep("Stripe key verified");

    const { addonId, email, plan } = await req.json();
    logStep("Request payload", { addonId, email, plan });

    if (!addonId || !email) {
      throw new Error("Missing required fields: addonId and email");
    }

    const priceId = ADDON_PRICES[addonId];
    if (!priceId) {
      throw new Error(`Invalid addon ID: ${addonId}`);
    }
    logStep("Price ID resolved", { priceId });

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });
    
    // Check if customer already exists
    const customers = await stripe.customers.list({ email, limit: 1 });
    let customerId: string | undefined;
    
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Found existing customer", { customerId });
    } else {
      logStep("Creating new customer", { email });
    }

    const origin = req.headers.get("origin") || "https://dbcloud.us";
    
    // Create one-time payment session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment", // One-time payment, not subscription
      success_url: `${origin}/addon-success?addon=${addonId}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/dashboard?email=${encodeURIComponent(email)}`,
      allow_promotion_codes: true,
      billing_address_collection: "required",
      metadata: {
        email,
        addonId,
        plan: plan || "unknown",
        type: "addon_purchase",
      },
    });

    logStep("Checkout session created", { sessionId: session.id, url: session.url });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
