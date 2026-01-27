import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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

    const contextData = {
      requests: requests || [],
      healthPredictions: healthPredictions || [],
      summaries: summaries || [],
    };

    const systemPrompt = `You are an internal AI operations copilot for a consulting SaaS business. Your role is to provide decision support for internal operations.

IMPORTANT: This is INTERNAL use only. Be direct, analytical, and focused on actionable insights. No marketing language.

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

Provide analysis based on the data. Be specific with client emails and actionable recommendations.`;

    const userPrompt = `Current business data:

REQUESTS (recent 50):
${JSON.stringify(contextData.requests.map(r => ({
  email: r.email,
  plan: r.plan,
  type: r.request_type,
  priority: r.priority,
  ai_classification: r.ai_classification,
  ai_effort_level: r.ai_effort_level,
  ai_estimated_hours: r.ai_estimated_hours,
  ai_risk_flags: r.ai_risk_flags,
  status: r.status,
  created_at: r.created_at,
})), null, 2)}

HEALTH PREDICTIONS:
${JSON.stringify(contextData.healthPredictions.map(h => ({
  email: h.email,
  health_status: h.health_status,
  churn_probability: h.churn_probability,
  expansion_probability: h.expansion_probability,
  margin_risk_score: h.margin_risk_score,
})), null, 2)}

MONTHLY SUMMARIES:
${JSON.stringify(contextData.summaries.map(s => ({
  email: s.email,
  plan: s.plan,
  month: s.month,
  year: s.year,
  hours_used: s.hours_used,
  hours_included: s.hours_included,
  health_status: s.health_status,
})), null, 2)}

USER QUERY: ${query}

Provide a direct, analytical response focused on decision support.`;

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
    const answer = aiResponse.choices?.[0]?.message?.content || "No response generated";

    // Log the conversation
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
