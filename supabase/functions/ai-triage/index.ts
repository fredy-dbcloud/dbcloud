import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface RequestClassification {
  classification: "advisory" | "execution" | "incident" | "out_of_scope";
  effort_level: "low" | "medium" | "high";
  estimated_hours: number;
  risk_flags: string[];
  reasoning: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authenticate the request
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Unauthorized - missing auth token" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    
    // Create client with user's auth context
    const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    // Verify the user is authenticated
    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await supabaseAuth.auth.getClaims(token);
    
    if (claimsError || !claimsData?.claims?.sub) {
      return new Response(
        JSON.stringify({ error: "Unauthorized - invalid token" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userId = claimsData.claims.sub;
    const body = await req.json();
    const { request_id, request_type, description, environment, priority, plan, email } = body;

    // Server-side input validation
    if (!request_id || typeof request_id !== "string") {
      return new Response(
        JSON.stringify({ error: "request_id is required and must be a string" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!description || typeof description !== "string") {
      return new Response(
        JSON.stringify({ error: "description is required and must be a string" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate description length to prevent token exhaustion (max 2000 chars for AI processing)
    const MAX_DESCRIPTION_LENGTH = 2000;
    if (description.length > MAX_DESCRIPTION_LENGTH) {
      return new Response(
        JSON.stringify({ error: `description must not exceed ${MAX_DESCRIPTION_LENGTH} characters` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate request_type against allowed enum values
    const VALID_REQUEST_TYPES = ["advisory", "optimization", "change_request"];
    if (request_type && !VALID_REQUEST_TYPES.includes(request_type)) {
      return new Response(
        JSON.stringify({ error: `request_type must be one of: ${VALID_REQUEST_TYPES.join(", ")}` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate plan against allowed values
    const VALID_PLANS = ["starter", "growth", "enterprise"];
    if (plan && !VALID_PLANS.includes(plan)) {
      return new Response(
        JSON.stringify({ error: `plan must be one of: ${VALID_PLANS.join(", ")}` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate priority
    const VALID_PRIORITIES = ["low", "medium", "high", "critical"];
    if (priority && !VALID_PRIORITIES.includes(priority)) {
      return new Response(
        JSON.stringify({ error: `priority must be one of: ${VALID_PRIORITIES.join(", ")}` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate environment
    const VALID_ENVIRONMENTS = ["development", "staging", "production"];
    if (environment && !VALID_ENVIRONMENTS.includes(environment)) {
      return new Response(
        JSON.stringify({ error: `environment must be one of: ${VALID_ENVIRONMENTS.join(", ")}` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Sanitize description for AI processing - remove potential prompt injection patterns
    const sanitizedDescription = description
      .replace(/```/g, "'''")  // Replace code blocks that might confuse AI
      .replace(/\n{3,}/g, "\n\n")  // Limit consecutive newlines
      .trim();

    // Verify the request belongs to the authenticated user using service role
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabaseService = createClient(supabaseUrl, supabaseServiceKey);
    
    const { data: requestData, error: requestError } = await supabaseService
      .from("client_requests")
      .select("user_id, email")
      .eq("id", request_id)
      .single();

    if (requestError || !requestData) {
      return new Response(
        JSON.stringify({ error: "Request not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Verify ownership - user_id must match the authenticated user
    if (requestData.user_id !== userId) {
      return new Response(
        JSON.stringify({ error: "Unauthorized - request does not belong to user" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an internal AI operations assistant for a consulting SaaS. Your role is to classify client requests, estimate effort, and flag risks.

Context:
- Plan types: Starter (4h/month advisory only), Growth (10h/month advisory + execution)
- Request types in system: advisory, optimization, change_request
- Out of scope for Starter/Growth: 24/7 support, SLAs, incident response, compliance (SOC2/HIPAA/PCI)

Classification rules:
- "advisory": Strategic guidance, planning, recommendations (no hands-on work)
- "execution": Hands-on implementation, configuration, optimization
- "incident": Emergency, outage, critical issues requiring immediate attention
- "out_of_scope": Requests for enterprise features (SLAs, 24/7, compliance) on non-enterprise plans

Effort estimation:
- Low: < 1 hour
- Medium: 1-3 hours  
- High: > 3 hours

Risk flags to detect:
- "scope_creep": Request expands beyond original intent or plan limits
- "potential_churn": Signs of dissatisfaction, frustration, or plan mismatch
- "upgrade_signal": Request indicates need for higher tier
- "margin_risk": Request may consume disproportionate hours relative to value`;

    const userPrompt = `Analyze this client request and provide classification:

Plan: ${plan}
Request Type: ${request_type}
Environment: ${environment}
Priority: ${priority}
Description: ${sanitizedDescription}

Respond using the classify_request function.`;

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
        tools: [
          {
            type: "function",
            function: {
              name: "classify_request",
              description: "Classify a client request with effort estimation and risk flags",
              parameters: {
                type: "object",
                properties: {
                  classification: {
                    type: "string",
                    enum: ["advisory", "execution", "incident", "out_of_scope"],
                    description: "The type of work this request represents",
                  },
                  effort_level: {
                    type: "string",
                    enum: ["low", "medium", "high"],
                    description: "Estimated effort level",
                  },
                  estimated_hours: {
                    type: "number",
                    description: "Estimated hours to complete (0.5 to 10)",
                  },
                  risk_flags: {
                    type: "array",
                    items: {
                      type: "string",
                      enum: ["scope_creep", "potential_churn", "upgrade_signal", "margin_risk"],
                    },
                    description: "Risk flags detected in the request",
                  },
                  reasoning: {
                    type: "string",
                    description: "Brief explanation of the classification decision",
                  },
                },
                required: ["classification", "effort_level", "estimated_hours", "risk_flags", "reasoning"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "classify_request" } },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const aiResponse = await response.json();
    const toolCall = aiResponse.choices?.[0]?.message?.tool_calls?.[0];
    
    if (!toolCall?.function?.arguments) {
      throw new Error("No tool call response from AI");
    }

    const classification: RequestClassification = JSON.parse(toolCall.function.arguments);

    // Update the request with AI classification using service role (already created above)
    const { error: updateError } = await supabaseService
      .from("client_requests")
      .update({
        ai_classification: classification.classification,
        ai_effort_level: classification.effort_level,
        ai_estimated_hours: classification.estimated_hours,
        ai_risk_flags: classification.risk_flags,
        ai_reasoning: classification.reasoning,
        ai_classified_at: new Date().toISOString(),
      })
      .eq("id", request_id);

    if (updateError) {
      console.error("Failed to update request:", updateError);
      throw new Error("Failed to save classification");
    }

    // Also update client health prediction based on this request (use service client)
    await updateClientHealth(supabaseService, requestData.email, classification);

    return new Response(
      JSON.stringify({ 
        success: true, 
        classification,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("AI triage error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

async function updateClientHealth(supabase: any, email: string, classification: RequestClassification) {
  try {
    // Get existing health prediction or create new
    const { data: existing } = await supabase
      .from("client_health_predictions")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    const currentSignals = existing?.signals || { risk_flags_history: [], classifications: [] };
    
    // Append new data to signals
    currentSignals.risk_flags_history = [
      ...(currentSignals.risk_flags_history || []).slice(-9),
      { flags: classification.risk_flags, timestamp: new Date().toISOString() },
    ];
    currentSignals.classifications = [
      ...(currentSignals.classifications || []).slice(-9),
      { type: classification.classification, timestamp: new Date().toISOString() },
    ];

    // Calculate health metrics based on signals
    const recentFlags = currentSignals.risk_flags_history.flatMap((h: any) => h.flags);
    const churnSignals = recentFlags.filter((f: string) => f === "potential_churn").length;
    const upgradeSignals = recentFlags.filter((f: string) => f === "upgrade_signal").length;
    const marginSignals = recentFlags.filter((f: string) => f === "margin_risk").length;

    const churnProbability = Math.min(churnSignals * 0.2, 0.99);
    const expansionProbability = Math.min(upgradeSignals * 0.25, 0.99);
    const marginRiskScore = Math.min(marginSignals * 0.2, 0.99);

    let healthStatus: string = "healthy";
    if (churnProbability > 0.5) healthStatus = "churn_risk";
    else if (marginRiskScore > 0.5) healthStatus = "margin_risk";
    else if (expansionProbability > 0.5) healthStatus = "expansion_ready";
    else if (churnProbability > 0.2 || marginRiskScore > 0.2) healthStatus = "at_risk";

    if (existing) {
      await supabase
        .from("client_health_predictions")
        .update({
          health_status: healthStatus,
          churn_probability: churnProbability,
          expansion_probability: expansionProbability,
          margin_risk_score: marginRiskScore,
          signals: currentSignals,
          ai_reasoning: `Updated based on ${classification.classification} request with flags: ${classification.risk_flags.join(", ") || "none"}`,
        })
        .eq("email", email);
    } else {
      await supabase
        .from("client_health_predictions")
        .insert({
          email,
          health_status: healthStatus,
          churn_probability: churnProbability,
          expansion_probability: expansionProbability,
          margin_risk_score: marginRiskScore,
          signals: currentSignals,
          ai_reasoning: `Initial assessment from ${classification.classification} request`,
        });
    }
  } catch (error) {
    console.error("Failed to update client health:", error);
  }
}
