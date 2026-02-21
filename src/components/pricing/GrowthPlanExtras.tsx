import { Shield, Users, Zap, Clock, CheckCircle } from 'lucide-react';

export function GrowthSubtitle() {
  return (
    <div className="mt-1 mb-4">
      <p className="text-sm font-medium text-accent">
        The Right Balance Between Execution and Stability
      </p>
      <p className="text-xs text-muted-foreground/50 mt-0.5">
        El equilibrio ideal entre ejecución y estabilidad
      </p>
    </div>
  );
}

export function GrowthWhoIsFor() {
  const items = [
    { en: 'Businesses with 10–50 employees', es: 'Empresas de 10–50 empleados' },
    { en: '1–2 cloud environments', es: '1–2 entornos cloud' },
    { en: 'Active production workloads', es: 'Cargas de trabajo en producción activa' },
    { en: 'Teams without a full-time cloud engineer', es: 'Equipos sin ingeniero cloud de tiempo completo' },
  ];

  return (
    <div className="bg-muted/40 rounded-xl p-4 mb-5">
      <div className="flex items-center gap-2 mb-3">
        <Users className="h-4 w-4 text-accent" />
        <span className="text-xs font-semibold uppercase tracking-wide text-foreground">Best For</span>
      </div>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.en} className="flex items-start gap-2">
            <CheckCircle className="h-3.5 w-3.5 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-sm text-foreground">{item.en}</span>
              <span className="block text-xs text-muted-foreground/50">{item.es}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function GrowthIncidentExpectation() {
  return (
    <div className="flex items-start gap-2.5 mb-4 px-1">
      <Shield className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Designed to handle ongoing optimization and typical monthly incidents within included hours.
        </p>
        <p className="text-xs text-muted-foreground/40 mt-0.5 leading-relaxed">
          Diseñado para cubrir optimización continua e incidentes mensuales típicos dentro de las horas incluidas.
        </p>
      </div>
    </div>
  );
}

export function GrowthOveragePolicy() {
  return (
    <div className="flex items-start gap-2.5 mb-5 px-1">
      <Clock className="h-4 w-4 text-muted-foreground/60 flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Additional hours available at a fixed hourly rate upon approval. No surprise billing.
        </p>
        <p className="text-xs text-muted-foreground/40 mt-0.5 leading-relaxed">
          Horas adicionales disponibles a tarifa fija previa aprobación. Sin cargos sorpresa.
        </p>
      </div>
    </div>
  );
}

export function GrowthUseCaseExample() {
  const tasks = [
    { en: 'Monthly optimization', es: 'Optimización mensual' },
    { en: 'Monitoring improvements', es: 'Mejoras de monitoreo' },
    { en: 'Minor production fixes', es: 'Correcciones menores de producción' },
    { en: 'Cost reduction actions', es: 'Acciones de reducción de costos' },
  ];

  return (
    <div className="border border-accent/20 bg-accent/5 rounded-xl p-4 mb-5">
      <div className="flex items-center gap-2 mb-2">
        <Zap className="h-4 w-4 text-accent" />
        <span className="text-xs font-semibold uppercase tracking-wide text-foreground">Example Use Case</span>
        <span className="text-xs text-muted-foreground/40 ml-1">/ Ejemplo Real</span>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed mb-3">
        A 20-employee SaaS company with one AWS environment and one production database uses Growth for:
      </p>
      <ul className="space-y-1.5">
        {tasks.map((task) => (
          <li key={task.en} className="flex items-center gap-2 text-xs">
            <span className="text-accent">•</span>
            <span className="text-foreground">{task.en}</span>
            <span className="text-muted-foreground/40">— {task.es}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function GrowthSoftGuarantee() {
  return (
    <div className="mt-4 text-center">
      <p className="text-xs text-muted-foreground/70 leading-relaxed">
        If this plan is not the right fit after 30 days, you can downgrade or cancel. No penalties.
      </p>
      <p className="text-xs text-muted-foreground/40 mt-0.5 leading-relaxed">
        Si este plan no es el adecuado después de 30 días, puedes cambiar o cancelar sin penalidades.
      </p>
    </div>
  );
}
