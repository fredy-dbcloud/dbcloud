import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Create anonymized identifier from email (consistent hash for same email)
function anonymizeEmail(email: string): string {
  // Create a simple hash-like identifier that's consistent but not reversible
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    const char = email.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  const positiveHash = Math.abs(hash);
  return `Client_${positiveHash.toString(36).toUpperCase().slice(0, 6)}`;
}

// Build email-to-alias mapping for internal reference (stays in this function only)
function buildAliasMap(emails: string[]): Map<string, string> {
  const uniqueEmails = [...new Set(emails)];
  const aliasMap = new Map<string, string>();
  uniqueEmails.forEach((email) => {
    aliasMap.set(email, anonymizeEmail(email));
  });
  return aliasMap;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Verify JWT authentication
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Unauthorized - Missing auth token" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create client with user's auth for verification
    const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const token = authHeader.replace("Bearer ", "");
    const { data: claims, error: claimsError } = await supabaseAuth.auth.getClaims(token);
    
    if (claimsError || !claims?.claims) {
      return new Response(
        JSON.stringify({ error: "Unauthorized - Invalid token" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userId = claims.claims.sub;

    // Check if user has admin role using service client
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const { data: roleData, error: roleError } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();

    if (roleError || !roleData) {
      return new Response(
        JSON.stringify({ error: "Forbidden - Admin role required" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { query } = await req.json();

    if (!query) {
      return new Response(
        JSON.stringify({ error: "Query is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Fetch recent requests with AI classification
    const { data: requests } = await supabase
      .from("client_requests")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    // Fetch client health predictions
    const { data: healthPredictions } = await supabase
      .from("client_health_predictions")
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(50);

    // Fetch client summaries
    const { data: summaries } = await supabase
      .from("client_summaries")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20);

    // Collect all emails and build alias map
    const allEmails: string[] = [
      ...(requests || []).map(r => r.email),
      ...(healthPredictions || []).map(h => h.email),
      ...(summaries || []).map(s => s.email),
    ];
    const aliasMap = buildAliasMap(allEmails);

    // Prepare anonymized data for AI - NO PII sent to external service
    const anonymizedRequests = (requests || []).map(r => ({
      client_id: aliasMap.get(r.email) || "Unknown",
      plan: r.plan,
      type: r.request_type,
      priority: r.priority,
      ai_classification: r.ai_classification,
      ai_effort_level: r.ai_effort_level,
      ai_estimated_hours: r.ai_estimated_hours,
      ai_risk_flags: r.ai_risk_flags,
      status: r.status,
      days_ago: Math.floor((Date.now() - new Date(r.created_at).getTime()) / (1000 * 60 * 60 * 24)),
    }));

    const anonymizedHealth = (healthPredictions || []).map(h => ({
      client_id: aliasMap.get(h.email) || "Unknown",
      health_status: h.health_status,
      churn_probability: h.churn_probability,
      expansion_probability: h.expansion_probability,
      margin_risk_score: h.margin_risk_score,
    }));

    const anonymizedSummaries = (summaries || []).map(s => ({
      client_id: aliasMap.get(s.email) || "Unknown",
      plan: s.plan,
      month: s.month,
      year: s.year,
      hours_used: s.hours_used,
      hours_included: s.hours_included,
      health_status: s.health_status,
    }));

    const contextData = {
      requests: anonymizedRequests,
      healthPredictions: anonymizedHealth,
      summaries: anonymizedSummaries,
    };

    const systemPrompt = `You are an internal AI operations copilot for a consulting SaaS business. Your role is to provide decision support for internal operations.

IMPORTANT: This is INTERNAL use only. Be direct, analytical, and focused on actionable insights. No marketing language.

NOTE: Client data is anonymized using consistent identifiers (e.g., Client_ABC123). The same client will have the same identifier across all data sets.

Current data context (as of now):
- ${contextData.requests.length} recent client requests
- ${contextData.healthPredictions.length} client health predictions
- ${contextData.summaries.length} monthly summaries

Client Plans:
- Starter: $499/mo, 4h advisory only
- Growth: $1,499/mo, 10h advisory + execution

Risk Categories:
- scope_creep: Request expands beyond plan limits
- potential_churn: Signs of dissatisfaction
- upgrade_signal: Need for higher tier
- margin_risk: Disproportionate hours vs. value

Health Statuses:
- healthy: Normal engagement
- at_risk: Some warning signs
- churn_risk: High likelihood of cancellation
- expansion_ready: Upgrade opportunity
- margin_risk: Unprofitable engagement

Provide analysis based on the data. Reference clients by their anonymized ID (e.g., Client_ABC123) and provide actionable recommendations.`;

    const userPrompt = `Current business data (anonymized):

REQUESTS (recent ${contextData.requests.length}):
${JSON.stringify(contextData.requests, null, 2)}

HEALTH PREDICTIONS:
${JSON.stringify(contextData.healthPredictions, null, 2)}

MONTHLY SUMMARIES:
${JSON.stringify(contextData.summaries, null, 2)}

USER QUERY: ${query}

Provide a direct, analytical response focused on decision support. Reference clients by their anonymized ID.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded, please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required, please add funds." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const aiResponse = await response.json();
    let answer = aiResponse.choices?.[0]?.message?.content || "No response generated";

    // Replace anonymized IDs with real emails in the response for admin display
    // This keeps PII local and never sent to external AI
    aliasMap.forEach((alias, email) => {
      answer = answer.replaceAll(alias, email);
    });

    // Log the conversation (with real data since it stays in our DB)
    await supabase
      .from("ai_copilot_logs")
      .insert({
        query,
        response: answer,
        context: { 
          requests_count: contextData.requests.length,
          health_count: contextData.healthPredictions.length,
          summaries_count: contextData.summaries.length,
        },
      });

    return new Response(
      JSON.stringify({ 
        success: true, 
        answer,
        context_summary: {
          requests_analyzed: contextData.requests.length,
          health_predictions: contextData.healthPredictions.length,
          summaries: contextData.summaries.length,
        },
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("AI copilot error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
