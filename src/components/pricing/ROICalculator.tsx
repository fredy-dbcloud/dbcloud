import { useState } from 'react';
import { useLang } from '@/hooks/useLang';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, Clock, Brain } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

const calculatorData = {
  en: {
    title: "Estimate Your Impact",
    subtitle: "See the productivity and operational impact of professional cloud support",
    disclaimer: "Estimates based on typical SMB scenarios. Does not include downtime risk, security incidents, or opportunity cost.",
    inputs: {
      employees: "Number of employees",
      hoursLost: "Hours lost to IT issues per month",
      hourlyCost: "Average hourly cost ($)",
    },
    outputs: {
      currentCost: "Estimated monthly IT inefficiency",
      savings: "Estimated monthly productivity & operational impact",
      nonMonetary: "Plus: Focus, speed, peace of mind",
    },
    defaults: {
      hourlyCost: 50,
    },
    estimate: "Estimate",
    typical: "Typical for SMBs",
  },
  es: {
    title: "Estima Tu Impacto",
    subtitle: "Mira el impacto en productividad y operaciones del soporte cloud profesional",
    disclaimer: "Estimaciones basadas en escenarios típicos de PyMEs. No incluye riesgo de caídas, incidentes de seguridad, o costo de oportunidad.",
    inputs: {
      employees: "Número de empleados",
      hoursLost: "Horas perdidas por problemas de TI al mes",
      hourlyCost: "Costo promedio por hora ($)",
    },
    outputs: {
      currentCost: "Ineficiencia de TI mensual estimada",
      savings: "Impacto mensual estimado en productividad y operaciones",
      nonMonetary: "Además: Enfoque, velocidad, tranquilidad",
    },
    defaults: {
      hourlyCost: 50,
    },
    estimate: "Estimado",
    typical: "Típico para PyMEs",
  },
};

export function ROICalculator() {
  const { lang } = useLang();
  const data = calculatorData[lang];

  const [employees, setEmployees] = useState<number>(15);
  const [hoursLost, setHoursLost] = useState<number>(8);
  const [hourlyCost, setHourlyCost] = useState<number>(data.defaults.hourlyCost);

  // Simple calculation
  const currentCost = hoursLost * hourlyCost;
  const dbcloudCost = 499; // Starter plan
  const potentialSavings = Math.max(0, currentCost - dbcloudCost);

  return (
    <section className="py-16 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-accent mb-3">
              <Calculator className="h-5 w-5" />
              <span className="text-sm font-medium uppercase tracking-wide">{data.estimate}</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">
              {data.title}
            </h2>
            <p className="text-muted-foreground">{data.subtitle}</p>
          </div>

          <Card className="p-6 sm:p-8">
            {/* Inputs */}
            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              <div className="space-y-2">
                <Label htmlFor="employees" className="text-sm font-medium">
                  {data.inputs.employees}
                </Label>
                <Input
                  id="employees"
                  type="number"
                  min={1}
                  max={500}
                  value={employees}
                  onChange={(e) => setEmployees(Number(e.target.value) || 1)}
                  className="text-lg"
                />
                <p className="text-xs text-muted-foreground">{data.typical}: 10–50</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hoursLost" className="text-sm font-medium">
                  {data.inputs.hoursLost}
                </Label>
                <Input
                  id="hoursLost"
                  type="number"
                  min={0}
                  max={100}
                  value={hoursLost}
                  onChange={(e) => setHoursLost(Number(e.target.value) || 0)}
                  className="text-lg"
                />
                <p className="text-xs text-muted-foreground">{data.typical}: 5–15</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hourlyCost" className="text-sm font-medium">
                  {data.inputs.hourlyCost}
                </Label>
                <Input
                  id="hourlyCost"
                  type="number"
                  min={10}
                  max={500}
                  value={hourlyCost}
                  onChange={(e) => setHourlyCost(Number(e.target.value) || 10)}
                  className="text-lg"
                />
                <p className="text-xs text-muted-foreground">{data.typical}: $40–$75</p>
              </div>
            </div>

            {/* Results */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <Clock className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                <p className="text-xs text-muted-foreground mb-1">{data.outputs.currentCost}</p>
                <p className="text-2xl font-bold text-foreground">
                  ${currentCost.toLocaleString()}
                </p>
              </div>

              <div className="bg-accent/10 rounded-lg p-4 text-center border border-accent/20">
                <TrendingUp className="h-5 w-5 mx-auto mb-2 text-accent" />
                <p className="text-xs text-muted-foreground mb-1">{data.outputs.savings}</p>
                <p className="text-2xl font-bold text-accent">
                  ${potentialSavings.toLocaleString()}
                </p>
              </div>

              <div className="bg-primary/5 rounded-lg p-4 text-center">
                <Brain className="h-5 w-5 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground mb-1">{data.outputs.nonMonetary}</p>
                <p className="text-lg font-semibold text-primary">
                  ✓
                </p>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-muted-foreground text-center mt-6 italic">
              {data.disclaimer}
            </p>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
