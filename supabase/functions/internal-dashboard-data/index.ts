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
    const { internal_key, action } = await req.json();

    // Simple internal access control
    const expectedKey = Deno.env.get("INTERNAL_ADMIN_KEY") || "dbcloud-internal-2026";
    if (internal_key !== expectedKey) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    if (action === "pending_requests") {
      // Get requests pending AI classification
      const { data, error } = await supabase
        .from("client_requests")
        .select("*")
        .is("ai_classification", null)
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) throw error;

      return new Response(
        JSON.stringify({ success: true, data }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "classified_requests") {
      // Get AI-classified requests
      const { data, error } = await supabase
        .from("client_requests")
        .select("*")
        .not("ai_classification", "is", null)
        .order("ai_classified_at", { ascending: false })
        .limit(50);

      if (error) throw error;

      return new Response(
        JSON.stringify({ success: true, data }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "health_predictions") {
      const { data, error } = await supabase
        .from("client_health_predictions")
        .select("*")
        .order("updated_at", { ascending: false });

      if (error) throw error;

      return new Response(
        JSON.stringify({ success: true, data }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "risk_summary") {
      // Get aggregated risk metrics
      const { data: requests } = await supabase
        .from("client_requests")
        .select("ai_risk_flags, ai_classification, ai_effort_level, plan, email")
        .not("ai_classification", "is", null);

      const { data: health } = await supabase
        .from("client_health_predictions")
        .select("*");

      const atRiskClients = health?.filter(h => h.health_status === "at_risk" || h.health_status === "churn_risk") || [];
      const expansionReady = health?.filter(h => h.health_status === "expansion_ready") || [];
      const marginRisk = health?.filter(h => h.health_status === "margin_risk") || [];

      const allRiskFlags = requests?.flatMap(r => r.ai_risk_flags || []) || [];
      const riskFlagCounts = allRiskFlags.reduce((acc: Record<string, number>, flag: string) => {
        acc[flag] = (acc[flag] || 0) + 1;
        return acc;
      }, {});

      return new Response(
        JSON.stringify({
          success: true,
          data: {
            total_classified_requests: requests?.length || 0,
            total_clients_tracked: health?.length || 0,
            at_risk_clients: atRiskClients.length,
            expansion_ready_clients: expansionReady.length,
            margin_risk_clients: marginRisk.length,
            risk_flag_distribution: riskFlagCounts,
            at_risk_emails: atRiskClients.map(c => c.email),
            expansion_ready_emails: expansionReady.map(c => c.email),
            margin_risk_emails: marginRisk.map(c => c.email),
          },
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "client_details") {
      const { email } = await req.json();
      
      const { data: requests } = await supabase
        .from("client_requests")
        .select("*")
        .eq("email", email)
        .order("created_at", { ascending: false });

      const { data: health } = await supabase
        .from("client_health_predictions")
        .select("*")
        .eq("email", email)
        .maybeSingle();

      const { data: summaries } = await supabase
        .from("client_summaries")
        .select("*")
        .eq("email", email)
        .order("year", { ascending: false })
        .order("month", { ascending: false });

      return new Response(
        JSON.stringify({
          success: true,
          data: { requests, health, summaries },
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ error: "Unknown action" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Internal dashboard error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
