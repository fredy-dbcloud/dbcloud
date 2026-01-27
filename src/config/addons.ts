// Add-on Products Configuration
// One-time purchases for Starter and Growth plans

export const ADDON_PRODUCTS = {
  extraHours: {
    id: 'extra_hours',
    name: 'Additional Hours Pack',
    name_es: 'Paquete de Horas Adicionales',
    description: 'Additional consulting for planned work, optimizations, continuous improvements, or tasks outside the monthly plan scope.',
    description_es: 'Consultoría adicional para trabajo planificado, optimizaciones, mejoras continuas o tareas fuera del alcance mensual del plan.',
    price: 399,
    product_id: 'prod_Trlm2wTqIKAWoL',
    price_id: 'price_1Su2EYBZAcqESBha3bCwnbDa',
    features: [
      'Up to 2 hours of Cloud & AI consulting',
      'Non-urgent work only',
      'Applied to current billing cycle only',
      'Subject to standard availability',
    ],
    features_es: [
      'Hasta 2 horas de consultoría Cloud & AI',
      'Trabajo no urgente',
      'Aplicable solo al ciclo de facturación actual',
      'Sujeto a disponibilidad estándar',
    ],
  },
  incidentPack: {
    id: 'incident_pack',
    name: 'Critical Incident Response (Urgent)',
    name_es: 'Atención de Incidente Crítico (Urgente)',
    description: 'Priority intervention for initial diagnosis and stabilization of a critical production incident.',
    description_es: 'Intervención prioritaria para diagnóstico inicial y estabilización de un incidente crítico en producción.',
    price: 599,
    product_id: 'prod_Trlm76kneL0Mpc',
    price_id: 'price_1Su2F1BZAcqESBhauYP1TRb2',
    features: [
      'Up to 60 minutes of priority intervention',
      'Focus on containment and diagnosis',
      'Does not include full resolution or continuous monitoring',
    ],
    features_es: [
      'Hasta 60 minutos de intervención prioritaria',
      'Enfoque en contención y diagnóstico',
      'No incluye resolución completa ni monitoreo continuo',
    ],
    upsellNote: 'For environments requiring 24/7 SLA and continuous support, we recommend Enterprise.',
    upsellNote_es: 'Para entornos con SLA 24/7 y soporte continuo, recomendamos el plan Enterprise.',
  },
  assessment: {
    id: 'assessment',
    name: 'One-Time Technical Assessment',
    name_es: 'Evaluación Técnica Única',
    description: 'Deep technical analysis for migrations, Cloud architecture, databases, or specific projects with clear deliverables.',
    description_es: 'Análisis técnico profundo para migraciones, arquitectura Cloud, bases de datos o proyectos específicos con entregables claros.',
    price: 799,
    product_id: 'prod_TrlmJWCicSuGWw',
    price_id: 'price_1Su2FLBZAcqESBhaxulNBfVx',
    features: [
      'Pre-defined scope',
      'Documented deliverables',
      'Actionable recommendations',
      'Outcome-based service, not hourly',
    ],
    features_es: [
      'Alcance definido previamente',
      'Entregables documentados',
      'Recomendaciones accionables',
      'Servicio basado en resultados, no en horas',
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
