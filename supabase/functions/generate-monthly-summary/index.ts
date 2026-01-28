import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { timingSafeEqual } from "https://deno.land/std@0.190.0/crypto/timing_safe_equal.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-cron-secret",
};

/**
 * Validates the cron secret using constant-time comparison to prevent timing attacks.
 * Uses uniform error handling to prevent enumeration attacks.
 */
const validateCronSecret = (req: Request): boolean => {
  const cronSecret = req.headers.get("x-cron-secret");
  const expectedSecret = Deno.env.get("CRON_SECRET");
  
  // Don't reveal which value is missing - uniform rejection
  if (!expectedSecret || !cronSecret) {
    return false;
  }
  
  try {
    // Use constant-time comparison to prevent timing attacks
    const secretBuffer = new TextEncoder().encode(cronSecret);
    const expectedBuffer = new TextEncoder().encode(expectedSecret);
    
    // Lengths must match for timingSafeEqual
    if (secretBuffer.length !== expectedBuffer.length) {
      return false;
    }
    
    return timingSafeEqual(secretBuffer, expectedBuffer);
  } catch {
    return false;
  }
};

const logStep = (step: string, details?: Record<string, unknown>) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[GENERATE-SUMMARY] ${step}${detailsStr}`);
};

const PLAN_HOURS: Record<string, number> = {
  starter: 4,
  growth: 10,
  enterprise: 20,
};

const MONTH_NAMES_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const MONTH_NAMES_ES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

interface RequestData {
  id: string;
  request_type: string;
  description: string;
  status: string;
  priority: string;
  estimated_hours: number | null;
  ai_estimated_hours: number | null;
  created_at: string;
}

interface ProfileData {
  id: string;
  plan: string;
  full_name: string | null;
  company: string | null;
}

function generateKeyFindings(requests: RequestData[], plan: string, lang: string): string[] {
  const findings: string[] = [];
  const completedRequests = requests.filter(r => r.status === 'completed');
  
  if (completedRequests.length === 0) {
    return lang === 'es' 
      ? ['No se completaron solicitudes durante este período']
      : ['No requests were completed during this period'];
  }

  // Group by type
  const typeGroups: Record<string, number> = {};
  completedRequests.forEach(r => {
    typeGroups[r.request_type] = (typeGroups[r.request_type] || 0) + 1;
  });

  const topTypes = Object.entries(typeGroups)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  topTypes.forEach(([type, count]) => {
    if (lang === 'es') {
      findings.push(`${count} ${count === 1 ? 'solicitud' : 'solicitudes'} de ${type.replace('_', ' ')} ${count === 1 ? 'completada' : 'completadas'}`);
    } else {
      findings.push(`${count} ${type.replace('_', ' ')} ${count === 1 ? 'request' : 'requests'} completed`);
    }
  });

  // Check for high-value work
  const highPriorityCompleted = completedRequests.filter(r => r.priority === 'high').length;
  if (highPriorityCompleted > 0) {
    findings.push(
      lang === 'es'
        ? `${highPriorityCompleted} ${highPriorityCompleted === 1 ? 'solicitud prioritaria atendida' : 'solicitudes prioritarias atendidas'}`
        : `${highPriorityCompleted} high-priority ${highPriorityCompleted === 1 ? 'request' : 'requests'} addressed`
    );
  }

  return findings.slice(0, 4);
}

function generateRecommendations(
  requests: RequestData[],
  hoursUsed: number,
  hoursIncluded: number,
  plan: string,
  lang: string
): string[] {
  const recommendations: string[] = [];
  const usagePercentage = (hoursUsed / hoursIncluded) * 100;

  // High utilization - consider upgrade or add-on
  if (usagePercentage >= 90 && plan !== 'enterprise') {
    recommendations.push(
      lang === 'es'
        ? 'Uso cercano al límite mensual. Considera un paquete de horas adicionales o evalúa el siguiente nivel de plan.'
        : 'Usage near monthly limit. Consider an additional hours pack or evaluate the next plan tier.'
    );
  } else if (usagePercentage >= 70 && plan !== 'enterprise') {
    recommendations.push(
      lang === 'es'
        ? 'Buen uso del plan actual. Monitorear próximos meses para optimizar asignación.'
        : 'Good utilization of current plan. Monitor upcoming months to optimize allocation.'
    );
  }

  // Low utilization
  if (usagePercentage < 30 && requests.length > 0) {
    recommendations.push(
      lang === 'es'
        ? 'Capacidad disponible para trabajo proactivo como optimizaciones o revisiones de arquitectura.'
        : 'Capacity available for proactive work like optimizations or architecture reviews.'
    );
  }

  // Check for patterns that suggest upgrade
  const pendingRequests = requests.filter(r => r.status === 'pending' || r.status === 'in_progress');
  if (pendingRequests.length >= 3 && plan === 'starter') {
    recommendations.push(
      lang === 'es'
        ? 'Volumen de solicitudes sugiere evaluar Growth para tiempos de respuesta más rápidos.'
        : 'Request volume suggests evaluating Growth for faster response times.'
    );
  }

  // Check for enterprise-level needs
  const hasComplexRequests = requests.some(r => 
    r.description.toLowerCase().includes('compliance') ||
    r.description.toLowerCase().includes('sla') ||
    r.description.toLowerCase().includes('audit') ||
    r.description.toLowerCase().includes('24/7') ||
    r.description.toLowerCase().includes('cumplimiento')
  );

  if (hasComplexRequests && plan !== 'enterprise') {
    recommendations.push(
      lang === 'es'
        ? 'Requisitos detectados que podrían beneficiarse de capacidades Enterprise. Agendar llamada para evaluar.'
        : 'Requirements detected that could benefit from Enterprise capabilities. Schedule a call to evaluate.'
    );
  }

  return recommendations.slice(0, 3);
}

function determineHealthStatus(
  hoursUsed: number,
  hoursIncluded: number,
  requestsCompleted: number,
  totalRequests: number
): string {
  const usagePercentage = (hoursUsed / hoursIncluded) * 100;
  const completionRate = totalRequests > 0 ? (requestsCompleted / totalRequests) * 100 : 100;

  if (usagePercentage >= 25 && usagePercentage <= 100 && completionRate >= 80) {
    return 'healthy';
  }
  
  if (usagePercentage < 10 || completionRate < 50) {
    return 'at_risk';
  }

  return 'healthy';
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Validate cron secret for scheduled invocations
  if (!validateCronSecret(req)) {
    // Uniform error response - don't reveal auth failure details
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      { 
        status: 401, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }

  try {
    logStep("Function started - cron auth passed");

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Get parameters - can generate for specific user or all users
    const { user_id, month, year, send_email = true } = await req.json();
    
    const targetMonth = month || new Date().getMonth(); // 0-indexed, previous month
    const targetYear = year || (targetMonth === 0 ? new Date().getFullYear() - 1 : new Date().getFullYear());
    const actualMonth = month ? month : (new Date().getMonth() === 0 ? 12 : new Date().getMonth());

    logStep("Generating summary for", { month: actualMonth, year: targetYear, user_id: user_id || 'all' });

    // Get profiles to process
    let profilesQuery = supabaseClient
      .from('profiles')
      .select('id, plan, full_name, company');

    if (user_id) {
      profilesQuery = profilesQuery.eq('id', user_id);
    }

    const { data: profiles, error: profilesError } = await profilesQuery;
    if (profilesError) throw profilesError;

    const results: Array<{ user_id: string; success: boolean; error?: string }> = [];

    for (const profile of (profiles || []) as ProfileData[]) {
      try {
        // Get user's email from auth
        const { data: authData } = await supabaseClient.auth.admin.getUserById(profile.id);
        const userEmail = authData?.user?.email;
        
        if (!userEmail) {
          logStep("No email for user", { user_id: profile.id });
          results.push({ user_id: profile.id, success: false, error: 'No email found' });
          continue;
        }

        // Get requests for this user in target month
        const startDate = new Date(targetYear, actualMonth - 1, 1);
        const endDate = new Date(targetYear, actualMonth, 0, 23, 59, 59);

        const { data: requests, error: requestsError } = await supabaseClient
          .from('client_requests')
          .select('id, request_type, description, status, priority, estimated_hours, ai_estimated_hours, created_at')
          .eq('user_id', profile.id)
          .gte('created_at', startDate.toISOString())
          .lte('created_at', endDate.toISOString());

        if (requestsError) throw requestsError;

        const typedRequests = (requests || []) as RequestData[];
        const completedRequests = typedRequests.filter(r => r.status === 'completed');
        
        // Calculate hours used
        const hoursUsed = completedRequests.reduce((sum, r) => {
          return sum + (r.ai_estimated_hours || r.estimated_hours || 0);
        }, 0);

        const plan = profile.plan || 'starter';
        const hoursIncluded = PLAN_HOURS[plan] || 4;

        // Determine language from user's recent requests
        const lang = typedRequests[0]?.description?.match(/[áéíóúñ¿¡]/i) ? 'es' : 'en';

        // Generate summary content
        const keyFindings = generateKeyFindings(typedRequests, plan, lang);
        const recommendations = generateRecommendations(typedRequests, hoursUsed, hoursIncluded, plan, lang);
        const healthStatus = determineHealthStatus(hoursUsed, hoursIncluded, completedRequests.length, typedRequests.length);

        // Check if summary already exists
        const { data: existingSummary } = await supabaseClient
          .from('client_summaries')
          .select('id')
          .eq('user_id', profile.id)
          .eq('month', actualMonth)
          .eq('year', targetYear)
          .maybeSingle();

        if (existingSummary) {
          // Update existing
          await supabaseClient
            .from('client_summaries')
            .update({
              hours_used: hoursUsed,
              hours_included: hoursIncluded,
              requests_completed: completedRequests.length,
              key_findings: keyFindings,
              recommendations,
              health_status: healthStatus,
              plan,
              updated_at: new Date().toISOString(),
            })
            .eq('id', existingSummary.id);

          logStep("Updated existing summary", { user_id: profile.id });
        } else {
          // Insert new
          await supabaseClient
            .from('client_summaries')
            .insert({
              user_id: profile.id,
              email: userEmail,
              month: actualMonth,
              year: targetYear,
              hours_used: hoursUsed,
              hours_included: hoursIncluded,
              requests_completed: completedRequests.length,
              key_findings: keyFindings,
              recommendations,
              health_status: healthStatus,
              plan,
            });

          logStep("Created new summary", { user_id: profile.id });
        }

        // Send email notification if enabled
        if (send_email) {
          const monthName = lang === 'es' ? MONTH_NAMES_ES[actualMonth - 1] : MONTH_NAMES_EN[actualMonth - 1];
          const baseUrl = Deno.env.get("SUPABASE_URL")?.replace('.supabase.co', '') || '';
          const portalUrl = `https://dbcloud.io/${lang}/portal/summary`;

          try {
            const emailResponse = await fetch(
              `${Deno.env.get("SUPABASE_URL")}/functions/v1/send-transactional-email`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${Deno.env.get("SUPABASE_ANON_KEY")}`,
                },
                body: JSON.stringify({
                  type: 'monthly_summary',
                  to: userEmail,
                  lang,
                  data: {
                    month: monthName,
                    year: targetYear,
                    hoursUsed,
                    hoursIncluded,
                    requestsCompleted: completedRequests.length,
                    portalUrl,
                  },
                }),
              }
            );

            if (emailResponse.ok) {
              logStep("Email sent", { user_id: profile.id });
            } else {
              logStep("Email failed", { user_id: profile.id, status: emailResponse.status });
            }
          } catch (emailError) {
            logStep("Email error", { user_id: profile.id, error: String(emailError) });
          }
        }

        results.push({ user_id: profile.id, success: true });
      } catch (userError) {
        logStep("Error processing user", { user_id: profile.id, error: String(userError) });
        results.push({ user_id: profile.id, success: false, error: String(userError) });
      }
    }

    logStep("Completed", { processed: results.length, successful: results.filter(r => r.success).length });

    return new Response(JSON.stringify({ success: true, results }), {
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
});
