// Add-on Products Configuration
// One-time purchases for Starter and Growth plans

export const ADDON_PRODUCTS = {
  extraHours: {
    id: 'extra_hours',
    name: 'Extra Hours Pack',
    name_es: 'Paquete de Horas Extra',
    description: '4 additional consulting hours - one-time use, non-rollover',
    description_es: '4 horas adicionales de consultoría - uso único, no acumulable',
    price: 299,
    product_id: 'prod_Trlm2wTqIKAWoL',
    price_id: 'price_1Su2EYBZAcqESBha3bCwnbDa',
    features: [
      '4 additional consulting hours',
      'Applied to current billing cycle only',
      'Non-rollover - use it or lose it',
      'Same scope as your current plan',
    ],
    features_es: [
      '4 horas adicionales de consultoría',
      'Aplica solo al ciclo de facturación actual',
      'No acumulable - úsalas o piérdelas',
      'Mismo alcance que tu plan actual',
    ],
  },
  incidentPack: {
    id: 'incident_pack',
    name: 'Emergency Incident Triage',
    name_es: 'Triage de Incidentes de Emergencia',
    description: 'Initial diagnosis and stabilization for a single production incident. No SLA or 24/7 coverage included.',
    description_es: 'Diagnóstico inicial y estabilización para un incidente de producción puntual. No incluye SLA ni cobertura 24/7.',
    price: 499,
    product_id: 'prod_Trlm76kneL0Mpc',
    price_id: 'price_1Su2F1BZAcqESBhauYP1TRb2',
    features: [
      'Initial diagnosis for 1 production incident',
      'Best-effort stabilization response',
      'Escalation guidance if needed',
      'Post-incident summary report',
    ],
    features_es: [
      'Diagnóstico inicial para 1 incidente de producción',
      'Respuesta de estabilización de mejor esfuerzo',
      'Orientación de escalación si es necesario',
      'Reporte resumen post-incidente',
    ],
    limitations: [
      'Single incident scope only',
      'Best-effort response (no SLA)',
      'Excludes 24/7 on-call support',
      'Workloads requiring SLA typically migrate to Enterprise',
    ],
    limitations_es: [
      'Alcance de un solo incidente',
      'Respuesta de mejor esfuerzo (sin SLA)',
      'Excluye soporte 24/7',
      'Cargas de trabajo con requisitos SLA generalmente migran a Enterprise',
    ],
  },
  assessment: {
    id: 'assessment',
    name: 'One-Time Assessment',
    name_es: 'Evaluación Única',
    description: 'Fixed-scope Cloud or AI assessment with clear deliverables',
    description_es: 'Evaluación Cloud o AI de alcance fijo con entregables claros',
    price: 799,
    product_id: 'prod_TrlmJWCicSuGWw',
    price_id: 'price_1Su2FLBZAcqESBhaxulNBfVx',
    features: [
      'Fixed-scope Cloud or AI assessment',
      'Clear deliverables document',
      'Delivery within 2-3 weeks',
      'Actionable recommendations',
    ],
    features_es: [
      'Evaluación Cloud o AI de alcance fijo',
      'Documento de entregables claros',
      'Entrega en 2-3 semanas',
      'Recomendaciones accionables',
    ],
    deliverables: [
      'Executive summary',
      'Technical assessment report',
      'Prioritized action plan',
      'Cost optimization recommendations',
    ],
    deliverables_es: [
      'Resumen ejecutivo',
      'Informe de evaluación técnica',
      'Plan de acción priorizado',
      'Recomendaciones de optimización de costos',
    ],
  },
} as const;

export type AddonKey = keyof typeof ADDON_PRODUCTS;

// Trigger conditions for showing add-on prompts
export const ADDON_TRIGGERS = {
  hoursExhausted: {
    threshold: 0.9, // Show when 90% of hours used
    suggestedAddon: 'extraHours',
  },
  urgentRequest: {
    requestTypes: ['incident', 'emergency', 'urgent'],
    suggestedAddon: 'incidentPack',
  },
  outOfScope: {
    requestTypes: ['sla', 'compliance', '24x7', 'production_incident'],
    suggestedAddon: 'enterprise', // Suggest contacting sales
  },
} as const;
