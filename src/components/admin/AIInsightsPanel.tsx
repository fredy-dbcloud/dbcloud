import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  AlertTriangle, 
  TrendingUp, 
  DollarSign,
  Brain,
  AlertCircle,
} from 'lucide-react';

interface HealthPrediction {
  id: string;
  email: string;
  health_status: string;
  churn_probability: number;
  expansion_probability: number;
  margin_risk_score: number;
  ai_reasoning: string | null;
  updated_at: string;
}

interface RiskSummary {
  at_risk_emails: string[];
  expansion_ready_emails: string[];
  margin_risk_emails: string[];
  risk_flag_distribution: Record<string, number>;
}

interface AIInsightsPanelProps {
  healthPredictions: HealthPrediction[];
  riskSummary: RiskSummary | null;
  lang?: 'en' | 'es';
}

export function AIInsightsPanel({ healthPredictions, riskSummary, lang = 'en' }: AIInsightsPanelProps) {
  const labels = {
    en: {
      title: 'AI Insights',
      description: 'AI-driven client health predictions and actionable insights',
      riskFlagDistribution: 'Risk Flag Distribution',
      topChurnRisks: 'Top Churn Risks',
      risk: 'risk',
      noChurnRisk: 'No clients at churn risk',
      noReasoning: 'No reasoning available',
      topExpansion: 'Top Expansion Opportunities',
      ready: 'ready',
      highUsageSignal: 'High usage and engagement signals',
      noExpansion: 'No expansion opportunities detected',
      marginRisks: 'Margin Risks',
      highEffort: 'High effort requests exceeding plan value',
      noMarginRisk: 'No margin risks detected',
    },
    es: {
      title: 'Insights de IA',
      description: 'Predicciones de salud de clientes impulsadas por IA e insights accionables',
      riskFlagDistribution: 'Distribución de Banderas de Riesgo',
      topChurnRisks: 'Principales Riesgos de Abandono',
      risk: 'riesgo',
      noChurnRisk: 'No hay clientes en riesgo de abandono',
      noReasoning: 'Sin razonamiento disponible',
      topExpansion: 'Principales Oportunidades de Expansión',
      ready: 'listo',
      highUsageSignal: 'Señales de alto uso y engagement',
      noExpansion: 'No se detectaron oportunidades de expansión',
      marginRisks: 'Riesgos de Margen',
      highEffort: 'Solicitudes de alto esfuerzo que exceden el valor del plan',
      noMarginRisk: 'No se detectaron riesgos de margen',
    },
  };

  const t = labels[lang];

  const churnRisks = healthPredictions
    .filter(h => h.health_status === 'churn_risk' || h.health_status === 'at_risk')
    .sort((a, b) => b.churn_probability - a.churn_probability)
    .slice(0, 5);

  const expansionOpportunities = healthPredictions
    .filter(h => h.health_status === 'expansion_ready')
    .sort((a, b) => b.expansion_probability - a.expansion_probability)
    .slice(0, 5);

  const marginRisks = healthPredictions
    .filter(h => h.health_status === 'margin_risk')
    .sort((a, b) => b.margin_risk_score - a.margin_risk_score)
    .slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          {t.title}
        </CardTitle>
        <CardDescription>
          {t.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Risk Flag Distribution */}
        {riskSummary && Object.keys(riskSummary.risk_flag_distribution).length > 0 && (
          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              {t.riskFlagDistribution}
            </h4>
            <div className="flex flex-wrap gap-2">
              {Object.entries(riskSummary.risk_flag_distribution).map(([flag, count]) => (
                <Badge key={flag} variant="outline" className="gap-1">
                  {flag.replace('_', ' ')}
                  <span className="bg-muted px-1.5 rounded-full text-xs">{count}</span>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Top Churn Risks */}
        <div className="border border-red-500/20 rounded-lg p-4 bg-red-500/5">
          <h4 className="font-medium mb-3 flex items-center gap-2 text-red-700 dark:text-red-400">
            <AlertTriangle className="h-4 w-4" />
            {t.topChurnRisks}
          </h4>
          <ScrollArea className="h-[200px]">
            {churnRisks.length > 0 ? (
              <div className="space-y-3">
                {churnRisks.map((client) => (
                  <div key={client.id} className="bg-background rounded-lg p-3 border">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-sm">{client.email}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {client.ai_reasoning || t.noReasoning}
                        </p>
                      </div>
                      <Badge className="bg-red-500/10 text-red-700 border-red-500/20">
                        {(client.churn_probability * 100).toFixed(0)}% {t.risk}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-4">
                {t.noChurnRisk}
              </p>
            )}
          </ScrollArea>
        </div>

        {/* Top Expansion Opportunities */}
        <div className="border border-green-500/20 rounded-lg p-4 bg-green-500/5">
          <h4 className="font-medium mb-3 flex items-center gap-2 text-green-700 dark:text-green-400">
            <TrendingUp className="h-4 w-4" />
            {t.topExpansion}
          </h4>
          <ScrollArea className="h-[200px]">
            {expansionOpportunities.length > 0 ? (
              <div className="space-y-3">
                {expansionOpportunities.map((client) => (
                  <div key={client.id} className="bg-background rounded-lg p-3 border">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-sm">{client.email}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {client.ai_reasoning || t.highUsageSignal}
                        </p>
                      </div>
                      <Badge className="bg-green-500/10 text-green-700 border-green-500/20">
                        {(client.expansion_probability * 100).toFixed(0)}% {t.ready}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-4">
                {t.noExpansion}
              </p>
            )}
          </ScrollArea>
        </div>

        {/* Margin Risks */}
        <div className="border border-orange-500/20 rounded-lg p-4 bg-orange-500/5">
          <h4 className="font-medium mb-3 flex items-center gap-2 text-orange-700 dark:text-orange-400">
            <DollarSign className="h-4 w-4" />
            {t.marginRisks}
          </h4>
          <ScrollArea className="h-[200px]">
            {marginRisks.length > 0 ? (
              <div className="space-y-3">
                {marginRisks.map((client) => (
                  <div key={client.id} className="bg-background rounded-lg p-3 border">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-sm">{client.email}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {client.ai_reasoning || t.highEffort}
                        </p>
                      </div>
                      <Badge className="bg-orange-500/10 text-orange-700 border-orange-500/20">
                        {(client.margin_risk_score * 100).toFixed(0)}% {t.risk}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-4">
                {t.noMarginRisk}
              </p>
            )}
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}
