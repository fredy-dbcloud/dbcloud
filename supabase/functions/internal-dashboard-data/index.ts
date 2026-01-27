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

    const { action, email } = await req.json();

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

    if (action === "all_requests") {
      // Get all requests for filtering
      const { data, error } = await supabase
        .from("client_requests")
        .select("*")
        .order("created_at", { ascending: false });

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

    if (action === "all_clients") {
      // Get all profiles with their summaries for client management
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (profilesError) throw profilesError;

      // Get all summaries for hours tracking
      const { data: summaries, error: summariesError } = await supabase
        .from("client_summaries")
        .select("*")
        .order("year", { ascending: false })
        .order("month", { ascending: false });

      if (summariesError) throw summariesError;

      // Get all health predictions
      const { data: health, error: healthError } = await supabase
        .from("client_health_predictions")
        .select("*");

      if (healthError) throw healthError;

      // Get user emails from auth (service role can access)
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();

      // Merge data
      const clients = profiles?.map(profile => {
        const authUser = authUsers?.users?.find(u => u.id === profile.id);
        const clientSummaries = summaries?.filter(s => s.user_id === profile.id) || [];
        const latestSummary = clientSummaries[0];
        const clientHealth = health?.find(h => h.email === authUser?.email);
        
        return {
          id: profile.id,
          email: authUser?.email || 'Unknown',
          full_name: profile.full_name,
          company: profile.company,
          plan: profile.plan,
          created_at: profile.created_at,
          updated_at: profile.updated_at,
          hours_used: latestSummary?.hours_used || 0,
          hours_included: latestSummary?.hours_included || (profile.plan === 'starter' ? 4 : profile.plan === 'growth' ? 10 : 20),
          requests_completed: latestSummary?.requests_completed || 0,
          health_status: clientHealth?.health_status || 'healthy',
          churn_probability: clientHealth?.churn_probability || 0,
          expansion_probability: clientHealth?.expansion_probability || 0,
        };
      }) || [];

      return new Response(
        JSON.stringify({ success: true, data: clients }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "revenue_overview") {
      // Get plan distribution
      const { data: profiles } = await supabase
        .from("profiles")
        .select("plan");

      const planCounts = profiles?.reduce((acc: Record<string, number>, p) => {
        const plan = p.plan || 'unknown';
        acc[plan] = (acc[plan] || 0) + 1;
        return acc;
      }, {}) || {};

      // Get requests with upgrade signals
      const { data: requests } = await supabase
        .from("client_requests")
        .select("ai_risk_flags, plan")
        .not("ai_risk_flags", "is", null);

      const upgradeSignals = requests?.filter(r => 
        r.ai_risk_flags?.includes('upgrade_signal')
      ).length || 0;

      // Calculate MRR (simplified)
      const pricing = { starter: 499, growth: 1499, enterprise: 2999 };
      const mrr = Object.entries(planCounts).reduce((total, [plan, count]) => {
        return total + ((pricing[plan as keyof typeof pricing] || 0) * count);
      }, 0);

      return new Response(
        JSON.stringify({
          success: true,
          data: {
            plan_distribution: planCounts,
            upgrade_signals: upgradeSignals,
            total_clients: profiles?.length || 0,
            mrr,
          },
        }),
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

    if (action === "charts_data") {
      // Get data for charts
      const { data: profiles } = await supabase
        .from("profiles")
        .select("plan, created_at");

      const { data: requests } = await supabase
        .from("client_requests")
        .select("plan, created_at, ai_estimated_hours, status");

      const { data: summaries } = await supabase
        .from("client_summaries")
        .select("plan, month, year, hours_used, hours_included, requests_completed");

      // Monthly active clients (by signup month)
      const monthlySignups: Record<string, number> = {};
      profiles?.forEach(p => {
        const date = new Date(p.created_at);
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        monthlySignups[key] = (monthlySignups[key] || 0) + 1;
      });

      // Requests per plan
      const requestsByPlan: Record<string, number> = {};
      requests?.forEach(r => {
        requestsByPlan[r.plan] = (requestsByPlan[r.plan] || 0) + 1;
      });

      // Hours consumed vs included (from summaries)
      const hoursData = summaries?.map(s => ({
        month: `${s.year}-${String(s.month).padStart(2, '0')}`,
        plan: s.plan,
        hours_used: s.hours_used,
        hours_included: s.hours_included,
      })) || [];

      return new Response(
        JSON.stringify({
          success: true,
          data: {
            monthly_signups: monthlySignups,
            requests_by_plan: requestsByPlan,
            hours_data: hoursData,
          },
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "client_details") {
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
