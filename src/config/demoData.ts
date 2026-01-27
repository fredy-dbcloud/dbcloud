// Demo Data Configuration
// Sample data for interactive plan demonstrations

import { subDays, subMonths, format } from 'date-fns';

export type DemoPlan = 'starter' | 'growth' | 'enterprise';

// Generate realistic dates
const now = new Date();
const generateDate = (daysAgo: number) => subDays(now, daysAgo).toISOString();
const generateMonthDate = (monthsAgo: number) => subMonths(now, monthsAgo);

// =====================
// STARTER PLAN DEMO DATA
// =====================
export const starterDemoData = {
  plan: 'starter' as DemoPlan,
  planName: 'Starter',
  planName_es: 'Inicial',
  hoursIncluded: 4,
  hoursUsed: 3.5,
  healthStatus: 'healthy' as const,
  lastActivityDate: generateDate(3),
  
  requests: [
    {
      id: 'demo-req-s1',
      request_type: 'advisory',
      description: 'Review of AWS cost structure and recommendations for optimization',
      status: 'completed',
      priority: 'normal',
      environment: 'production',
      created_at: generateDate(5),
      ai_classification: 'advisory',
      ai_effort_level: 'low',
      ai_estimated_hours: 1,
    },
    {
      id: 'demo-req-s2',
      request_type: 'advisory',
      description: 'Guidance on implementing CI/CD pipeline best practices',
      status: 'completed',
      priority: 'normal',
      environment: 'development',
      created_at: generateDate(12),
      ai_classification: 'advisory',
      ai_effort_level: 'medium',
      ai_estimated_hours: 1.5,
    },
    {
      id: 'demo-req-s3',
      request_type: 'advisory',
      description: 'Architecture review for new microservices design',
      status: 'in_progress',
      priority: 'normal',
      environment: 'development',
      created_at: generateDate(2),
      ai_classification: 'advisory',
      ai_effort_level: 'low',
      ai_estimated_hours: 1,
    },
    {
      id: 'demo-req-s4',
      request_type: 'advisory',
      description: 'Security best practices consultation for API endpoints',
      status: 'pending',
      priority: 'low',
      environment: 'staging',
      created_at: generateDate(1),
      ai_classification: 'advisory',
      ai_effort_level: 'low',
      ai_estimated_hours: 0.5,
    },
  ],

  summaries: [
    {
      month: generateMonthDate(0).getMonth() + 1,
      year: generateMonthDate(0).getFullYear(),
      hoursIncluded: 4,
      hoursUsed: 3.5,
      requestsCompleted: 2,
      keyFindings: [
        'AWS costs reduced by 18% through Reserved Instance recommendations',
        'CI/CD pipeline documentation improved development velocity',
        'Security posture strengthened with API endpoint hardening',
      ],
      recommendations: [
        'Consider implementing automated cost monitoring',
        'Expand CI/CD to include staging environment',
        'Schedule quarterly security reviews',
      ],
    },
    {
      month: generateMonthDate(1).getMonth() + 1,
      year: generateMonthDate(1).getFullYear(),
      hoursIncluded: 4,
      hoursUsed: 4,
      requestsCompleted: 3,
      keyFindings: [
        'Database query optimization identified 40% performance improvement potential',
        'Backup strategy reviewed and enhanced',
        'Logging infrastructure recommendations provided',
      ],
      recommendations: [
        'Implement recommended query indexes',
        'Test backup restoration procedures',
        'Consider log aggregation solution',
      ],
    },
    {
      month: generateMonthDate(2).getMonth() + 1,
      year: generateMonthDate(2).getFullYear(),
      hoursIncluded: 4,
      hoursUsed: 3,
      requestsCompleted: 2,
      keyFindings: [
        'Initial cloud infrastructure assessment completed',
        'Cost optimization opportunities identified',
        'Documentation gaps highlighted',
      ],
      recommendations: [
        'Prioritize cost optimization quick wins',
        'Establish infrastructure documentation standards',
        'Consider automated monitoring setup',
      ],
    },
  ],

  aiInsights: {
    upgradeReadiness: 'moderate',
    churnRisk: 'low',
    usageTrend: 'consistent',
    signals: [
      'High utilization (87%) suggests potential need for more hours',
      'Consistent monthly engagement indicates strong fit',
      'Advisory requests well-aligned with plan scope',
    ],
  },

  limitations: [
    'Advisory guidance only - no direct execution',
    '4 hours monthly allocation',
    '1-2 business day response time',
    'No production incident support',
  ],
  limitations_es: [
    'Solo asesoría - sin ejecución directa',
    '4 horas mensuales asignadas',
    'Tiempo de respuesta 1-2 días hábiles',
    'Sin soporte de incidentes de producción',
  ],
};

// =====================
// GROWTH PLAN DEMO DATA
// =====================
export const growthDemoData = {
  plan: 'growth' as DemoPlan,
  planName: 'Growth',
  planName_es: 'Crecimiento',
  hoursIncluded: 10,
  hoursUsed: 8.5,
  healthStatus: 'healthy' as const,
  lastActivityDate: generateDate(1),

  requests: [
    {
      id: 'demo-req-g1',
      request_type: 'optimization',
      description: 'Implement Kubernetes autoscaling configuration for production workloads',
      status: 'completed',
      priority: 'high',
      environment: 'production',
      created_at: generateDate(3),
      ai_classification: 'execution',
      ai_effort_level: 'high',
      ai_estimated_hours: 3,
    },
    {
      id: 'demo-req-g2',
      request_type: 'advisory',
      description: 'Database migration strategy review for PostgreSQL to Aurora',
      status: 'completed',
      priority: 'normal',
      environment: 'staging',
      created_at: generateDate(8),
      ai_classification: 'advisory',
      ai_effort_level: 'medium',
      ai_estimated_hours: 2,
    },
    {
      id: 'demo-req-g3',
      request_type: 'change_request',
      description: 'Implement CloudWatch dashboards and alerting for critical services',
      status: 'in_progress',
      priority: 'normal',
      environment: 'production',
      created_at: generateDate(2),
      ai_classification: 'execution',
      ai_effort_level: 'medium',
      ai_estimated_hours: 2,
    },
    {
      id: 'demo-req-g4',
      request_type: 'optimization',
      description: 'Terraform module refactoring for improved reusability',
      status: 'completed',
      priority: 'normal',
      environment: 'development',
      created_at: generateDate(15),
      ai_classification: 'execution',
      ai_effort_level: 'low',
      ai_estimated_hours: 1.5,
    },
    {
      id: 'demo-req-g5',
      request_type: 'advisory',
      description: 'Cost optimization review for RDS and EC2 instances',
      status: 'pending',
      priority: 'low',
      environment: 'production',
      created_at: generateDate(1),
      ai_classification: 'advisory',
      ai_effort_level: 'low',
      ai_estimated_hours: 1,
    },
  ],

  summaries: [
    {
      month: generateMonthDate(0).getMonth() + 1,
      year: generateMonthDate(0).getFullYear(),
      hoursIncluded: 10,
      hoursUsed: 8.5,
      requestsCompleted: 3,
      keyFindings: [
        'Kubernetes autoscaling reduced compute costs by 35%',
        'Database migration plan validated and ready for execution',
        'Monitoring coverage increased from 40% to 85%',
      ],
      recommendations: [
        'Proceed with Aurora migration during next maintenance window',
        'Add custom CloudWatch metrics for business KPIs',
        'Consider implementing cost anomaly detection',
      ],
    },
    {
      month: generateMonthDate(1).getMonth() + 1,
      year: generateMonthDate(1).getFullYear(),
      hoursIncluded: 10,
      hoursUsed: 9.5,
      requestsCompleted: 4,
      keyFindings: [
        'Infrastructure as Code coverage reached 90%',
        'CI/CD pipeline execution time reduced by 50%',
        'Security scanning integrated into deployment workflow',
      ],
      recommendations: [
        'Implement GitOps workflow for production deployments',
        'Add automated rollback capabilities',
        'Consider chaos engineering practices',
      ],
    },
    {
      month: generateMonthDate(2).getMonth() + 1,
      year: generateMonthDate(2).getFullYear(),
      hoursIncluded: 10,
      hoursUsed: 10,
      requestsCompleted: 5,
      keyFindings: [
        'Initial Terraform modules created for core infrastructure',
        'Staging environment fully automated',
        'Documentation portal established',
      ],
      recommendations: [
        'Extend IaC to remaining legacy components',
        'Implement infrastructure testing',
        'Add drift detection mechanisms',
      ],
    },
  ],

  aiInsights: {
    upgradeReadiness: 'high',
    churnRisk: 'low',
    usageTrend: 'increasing',
    signals: [
      'Consistent high utilization (85%+) over 3 months',
      'Increasing execution-focused requests',
      'Growing complexity suggests Enterprise benefits',
      'No SLA requirements detected yet',
    ],
  },

  limitations: [
    'Advisory + Limited Execution',
    '10 hours monthly allocation',
    'Same/next business day response',
    'No SLA guarantees',
    'Best-effort incident response only',
  ],
  limitations_es: [
    'Asesoría + Ejecución Limitada',
    '10 horas mensuales asignadas',
    'Respuesta mismo/siguiente día hábil',
    'Sin garantías de SLA',
    'Solo respuesta a incidentes de mejor esfuerzo',
  ],
};

// =====================
// ENTERPRISE PLAN DEMO DATA
// =====================
export const enterpriseDemoData = {
  plan: 'enterprise' as DemoPlan,
  planName: 'Enterprise',
  planName_es: 'Empresarial',
  hoursIncluded: 40,
  hoursUsed: 32,
  healthStatus: 'healthy' as const,
  lastActivityDate: generateDate(0),

  requests: [
    {
      id: 'demo-req-e1',
      request_type: 'optimization',
      description: 'Emergency response: Production database connection pool exhaustion',
      status: 'completed',
      priority: 'critical',
      environment: 'production',
      created_at: generateDate(1),
      ai_classification: 'incident',
      ai_effort_level: 'high',
      ai_estimated_hours: 4,
    },
    {
      id: 'demo-req-e2',
      request_type: 'change_request',
      description: 'Implement SOC 2 compliance controls for infrastructure',
      status: 'in_progress',
      priority: 'high',
      environment: 'production',
      created_at: generateDate(5),
      ai_classification: 'execution',
      ai_effort_level: 'high',
      ai_estimated_hours: 8,
    },
    {
      id: 'demo-req-e3',
      request_type: 'optimization',
      description: 'Multi-region disaster recovery implementation',
      status: 'completed',
      priority: 'high',
      environment: 'production',
      created_at: generateDate(12),
      ai_classification: 'execution',
      ai_effort_level: 'high',
      ai_estimated_hours: 10,
    },
    {
      id: 'demo-req-e4',
      request_type: 'advisory',
      description: 'Quarterly infrastructure security assessment',
      status: 'completed',
      priority: 'normal',
      environment: 'production',
      created_at: generateDate(20),
      ai_classification: 'advisory',
      ai_effort_level: 'medium',
      ai_estimated_hours: 4,
    },
    {
      id: 'demo-req-e5',
      request_type: 'change_request',
      description: 'Implement automated incident response runbooks',
      status: 'in_progress',
      priority: 'normal',
      environment: 'staging',
      created_at: generateDate(3),
      ai_classification: 'execution',
      ai_effort_level: 'medium',
      ai_estimated_hours: 6,
    },
  ],

  summaries: [
    {
      month: generateMonthDate(0).getMonth() + 1,
      year: generateMonthDate(0).getFullYear(),
      hoursIncluded: 40,
      hoursUsed: 32,
      requestsCompleted: 3,
      keyFindings: [
        'Production incident resolved with 15-minute MTTR',
        'SOC 2 compliance controls 70% implemented',
        'DR failover tested successfully with 5-minute RTO achieved',
      ],
      recommendations: [
        'Complete remaining SOC 2 controls by end of quarter',
        'Schedule quarterly DR drills',
        'Implement proactive alerting for connection pool metrics',
      ],
    },
    {
      month: generateMonthDate(1).getMonth() + 1,
      year: generateMonthDate(1).getFullYear(),
      hoursIncluded: 40,
      hoursUsed: 38,
      requestsCompleted: 5,
      keyFindings: [
        'Multi-region architecture fully operational',
        'Achieved 99.99% uptime SLA compliance',
        'Automated 80% of incident response procedures',
      ],
      recommendations: [
        'Consider adding third region for enhanced resilience',
        'Implement chaos engineering program',
        'Expand security monitoring coverage',
      ],
    },
    {
      month: generateMonthDate(2).getMonth() + 1,
      year: generateMonthDate(2).getFullYear(),
      hoursIncluded: 40,
      hoursUsed: 35,
      requestsCompleted: 4,
      keyFindings: [
        'Enterprise engagement initiated with full infrastructure assessment',
        'Critical security vulnerabilities remediated',
        'SLA framework established and documented',
      ],
      recommendations: [
        'Begin SOC 2 compliance preparation',
        'Implement DR infrastructure',
        'Establish incident response procedures',
      ],
    },
  ],

  aiInsights: {
    upgradeReadiness: 'n/a',
    churnRisk: 'low',
    usageTrend: 'stable',
    signals: [
      'Full utilization of Enterprise benefits',
      'Active incident response demonstrates high engagement',
      'Compliance initiatives on track',
      'Consider expanding to additional business units',
    ],
  },

  limitations: [
    'Full Advisory + Execution',
    'Custom hours allocation',
    'SLA-backed response times',
    '24/7 incident support included',
    'Compliance support (SOC 2, HIPAA, PCI)',
    'Dedicated account management',
  ],
  limitations_es: [
    'Asesoría + Ejecución Completa',
    'Asignación de horas personalizada',
    'Tiempos de respuesta respaldados por SLA',
    'Soporte de incidentes 24/7 incluido',
    'Soporte de cumplimiento (SOC 2, HIPAA, PCI)',
    'Gestión de cuenta dedicada',
  ],
};

// Helper to get demo data by plan
export function getDemoData(plan: DemoPlan) {
  switch (plan) {
    case 'starter':
      return starterDemoData;
    case 'growth':
      return growthDemoData;
    case 'enterprise':
      return enterpriseDemoData;
  }
}

// Month names for display
export const monthNames = {
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  es: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
};
