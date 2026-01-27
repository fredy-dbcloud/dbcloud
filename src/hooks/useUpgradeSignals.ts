import { useMemo } from 'react';

export type PlanType = 'starter' | 'growth';
export type UpgradeTarget = 'growth' | 'enterprise' | null;

export interface UpgradeSignal {
  type: 'high_usage' | 'execution_requests' | 'extra_hours_addons' | 'sla_request' | 'incident_request' | 'compliance_request' | 'urgent_addon_usage';
  description: {
    en: string;
    es: string;
  };
  priority: 'low' | 'medium' | 'high';
}

export interface UpgradeAnalysis {
  shouldShowUpgrade: boolean;
  upgradeTarget: UpgradeTarget;
  signals: UpgradeSignal[];
  primaryReason: UpgradeSignal | null;
}

interface ClientRequest {
  request_type: string;
  description: string;
  priority: string;
  status: string;
  estimated_hours?: number | null;
}

interface MonthlySummary {
  hoursUsed: number;
  hoursIncluded: number;
  month: number;
  year: number;
}

interface UpgradeSignalsInput {
  currentPlan: PlanType;
  currentUsagePercentage: number;
  requests: ClientRequest[];
  summaries: MonthlySummary[];
  addonPurchases?: { type: string; count: number }[];
}

// Enterprise keywords for detection
const COMPLIANCE_KEYWORDS = ['soc2', 'soc 2', 'hipaa', 'pci', 'gdpr', 'compliance', 'audit'];
const SLA_KEYWORDS = ['sla', 'uptime', 'guaranteed', '99.9', '24/7', '24x7'];
const INCIDENT_KEYWORDS = ['incident', 'emergency', 'outage', 'down', 'critical'];

export function useUpgradeSignals({
  currentPlan,
  currentUsagePercentage,
  requests,
  summaries,
  addonPurchases = []
}: UpgradeSignalsInput): UpgradeAnalysis {
  
  return useMemo(() => {
    const signals: UpgradeSignal[] = [];

    if (currentPlan === 'starter') {
      // Signal: High usage (>80% for current or consecutive months)
      const consecutiveHighUsage = summaries.filter(s => 
        (s.hoursUsed / s.hoursIncluded) * 100 > 80
      ).length >= 2;
      
      if (consecutiveHighUsage || currentUsagePercentage > 80) {
        signals.push({
          type: 'high_usage',
          description: {
            en: 'Your monthly usage has exceeded 80% of allocated hours.',
            es: 'Tu uso mensual ha superado el 80% de las horas asignadas.'
          },
          priority: consecutiveHighUsage ? 'high' : 'medium'
        });
      }

      // Signal: Repeated execution/optimization requests
      const executionRequests = requests.filter(r => 
        r.request_type !== 'advisory' && 
        ['optimization', 'implementation', 'migration', 'setup', 'execution'].some(t => 
          r.request_type.toLowerCase().includes(t) || r.description.toLowerCase().includes(t)
        )
      );
      
      if (executionRequests.length >= 3) {
        signals.push({
          type: 'execution_requests',
          description: {
            en: 'You have submitted multiple execution-related requests.',
            es: 'Has enviado múltiples solicitudes relacionadas con ejecución.'
          },
          priority: 'medium'
        });
      }

      // Signal: Frequent extra hours add-on purchases
      const extraHoursPurchases = addonPurchases.find(p => p.type === 'extra_hours');
      if (extraHoursPurchases && extraHoursPurchases.count >= 2) {
        signals.push({
          type: 'extra_hours_addons',
          description: {
            en: 'You have purchased extra hours multiple times.',
            es: 'Has comprado horas adicionales varias veces.'
          },
          priority: 'high'
        });
      }
    }

    if (currentPlan === 'growth' || currentPlan === 'starter') {
      // Enterprise signals (apply to both plans, but Growth→Enterprise is the focus)
      
      // Signal: SLA or uptime guarantee requests
      const slaRequests = requests.filter(r => 
        SLA_KEYWORDS.some(kw => 
          r.description.toLowerCase().includes(kw) || 
          r.request_type.toLowerCase().includes(kw)
        )
      );
      
      if (slaRequests.length > 0) {
        signals.push({
          type: 'sla_request',
          description: {
            en: 'You have requested SLA or uptime guarantees.',
            es: 'Has solicitado SLAs o garantías de tiempo de actividad.'
          },
          priority: 'high'
        });
      }

      // Signal: Incident/emergency requests
      const incidentRequests = requests.filter(r => 
        INCIDENT_KEYWORDS.some(kw => 
          r.description.toLowerCase().includes(kw) || 
          r.request_type.toLowerCase().includes(kw) ||
          r.priority === 'high'
        )
      );
      
      if (incidentRequests.length >= 2) {
        signals.push({
          type: 'incident_request',
          description: {
            en: 'You have submitted incident or emergency-related requests.',
            es: 'Has enviado solicitudes relacionadas con incidentes o emergencias.'
          },
          priority: 'high'
        });
      }

      // Signal: Compliance-related requests
      const complianceRequests = requests.filter(r => 
        COMPLIANCE_KEYWORDS.some(kw => 
          r.description.toLowerCase().includes(kw) || 
          r.request_type.toLowerCase().includes(kw)
        )
      );
      
      if (complianceRequests.length > 0) {
        signals.push({
          type: 'compliance_request',
          description: {
            en: 'You have requested compliance-related services.',
            es: 'Has solicitado servicios relacionados con cumplimiento normativo.'
          },
          priority: 'high'
        });
      }

      // Signal: Frequent urgent/incident add-on usage
      const urgentAddonPurchases = addonPurchases.find(p => p.type === 'incident');
      if (urgentAddonPurchases && urgentAddonPurchases.count >= 2) {
        signals.push({
          type: 'urgent_addon_usage',
          description: {
            en: 'You have used incident add-ons frequently.',
            es: 'Has usado add-ons de incidentes frecuentemente.'
          },
          priority: 'high'
        });
      }
    }

    // Determine upgrade target based on signals
    let upgradeTarget: UpgradeTarget = null;
    
    if (currentPlan === 'starter') {
      // Check for enterprise-level signals first
      const hasEnterpriseSignals = signals.some(s => 
        ['sla_request', 'compliance_request', 'incident_request', 'urgent_addon_usage'].includes(s.type)
      );
      
      if (hasEnterpriseSignals) {
        upgradeTarget = 'enterprise';
      } else if (signals.length > 0) {
        upgradeTarget = 'growth';
      }
    } else if (currentPlan === 'growth') {
      const hasEnterpriseSignals = signals.some(s => 
        ['sla_request', 'compliance_request', 'incident_request', 'urgent_addon_usage'].includes(s.type)
      );
      
      if (hasEnterpriseSignals) {
        upgradeTarget = 'enterprise';
      }
    }

    // Sort signals by priority
    const sortedSignals = signals.sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    return {
      shouldShowUpgrade: signals.length > 0,
      upgradeTarget,
      signals: sortedSignals,
      primaryReason: sortedSignals[0] || null
    };
  }, [currentPlan, currentUsagePercentage, requests, summaries, addonPurchases]);
}
