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
    name: 'Incident Request Pack',
    name_es: 'Paquete de Solicitud de Incidentes',
    description: 'Limited urgent request handling - best-effort response',
    description_es: 'Manejo limitado de solicitudes urgentes - respuesta de mejor esfuerzo',
    price: 499,
    product_id: 'prod_Trlm76kneL0Mpc',
    price_id: 'price_1Su2F1BZAcqESBhauYP1TRb2',
    features: [
      'Up to 3 urgent requests',
      'Best-effort response (no SLA)',
      'No uptime guarantees',
      'Excludes 24/7 support',
    ],
    features_es: [
      'Hasta 3 solicitudes urgentes',
      'Respuesta de mejor esfuerzo (sin SLA)',
      'Sin garantías de tiempo de actividad',
      'Excluye soporte 24/7',
    ],
    limitations: [
      'No SLA guarantees',
      'Best-effort response only',
      'Excludes 24/7 on-call support',
      'No production ownership',
    ],
    limitations_es: [
      'Sin garantías de SLA',
      'Solo respuesta de mejor esfuerzo',
      'Excluye soporte 24/7',
      'Sin propiedad de producción',
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
