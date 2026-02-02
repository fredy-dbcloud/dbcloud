import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cloud, Building2, AlertTriangle, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useLang } from '@/hooks/useLang';
import { siteConfig } from '@/config/site';

interface CloudCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const content = {
  en: {
    title: "Free Cloud Check",
    subtitle: "Answer 3 quick questions to personalize your call",
    step: "Step",
    of: "of",
    questions: [
      {
        icon: Cloud,
        question: "What's your current cloud setup?",
        options: [
          { value: "aws", label: "AWS" },
          { value: "azure", label: "Azure" },
          { value: "gcp", label: "Google Cloud" },
          { value: "oracle", label: "Oracle Cloud" },
          { value: "multi", label: "Multi-cloud" },
          { value: "none", label: "No cloud yet" },
        ],
      },
      {
        icon: Building2,
        question: "How big is your team?",
        options: [
          { value: "1-10", label: "1-10 employees" },
          { value: "11-50", label: "11-50 employees" },
          { value: "51-200", label: "51-200 employees" },
          { value: "200+", label: "200+ employees" },
        ],
      },
      {
        icon: AlertTriangle,
        question: "What's your biggest pain point?",
        options: [
          { value: "cost", label: "Cloud costs are too high" },
          { value: "performance", label: "Performance issues" },
          { value: "security", label: "Security concerns" },
          { value: "no-team", label: "No IT team to manage it" },
          { value: "migration", label: "Need to migrate" },
        ],
      },
    ],
    next: "Next",
    back: "Back",
    scheduleNow: "Schedule Your Free Call",
    ready: "You're all set!",
    readySubtitle: "Based on your answers, we'll prepare a personalized agenda for your call.",
  },
  es: {
    title: "Revisión Cloud Gratis",
    subtitle: "Responde 3 preguntas rápidas para personalizar tu llamada",
    step: "Paso",
    of: "de",
    questions: [
      {
        icon: Cloud,
        question: "¿Cuál es tu configuración cloud actual?",
        options: [
          { value: "aws", label: "AWS" },
          { value: "azure", label: "Azure" },
          { value: "gcp", label: "Google Cloud" },
          { value: "oracle", label: "Oracle Cloud" },
          { value: "multi", label: "Multi-cloud" },
          { value: "none", label: "Sin cloud aún" },
        ],
      },
      {
        icon: Building2,
        question: "¿Qué tamaño tiene tu equipo?",
        options: [
          { value: "1-10", label: "1-10 empleados" },
          { value: "11-50", label: "11-50 empleados" },
          { value: "51-200", label: "51-200 empleados" },
          { value: "200+", label: "200+ empleados" },
        ],
      },
      {
        icon: AlertTriangle,
        question: "¿Cuál es tu mayor dolor de cabeza?",
        options: [
          { value: "cost", label: "Costos cloud muy altos" },
          { value: "performance", label: "Problemas de rendimiento" },
          { value: "security", label: "Preocupaciones de seguridad" },
          { value: "no-team", label: "Sin equipo IT para gestionarlo" },
          { value: "migration", label: "Necesito migrar" },
        ],
      },
    ],
    next: "Siguiente",
    back: "Atrás",
    scheduleNow: "Agenda Tu Llamada Gratis",
    ready: "¡Todo listo!",
    readySubtitle: "Basándonos en tus respuestas, prepararemos una agenda personalizada para tu llamada.",
  },
};

export function CloudCheckModal({ isOpen, onClose }: CloudCheckModalProps) {
  const { lang } = useLang();
  const t = content[lang];
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(['', '', '']);

  const totalSteps = t.questions.length;
  const isComplete = step >= totalSteps;
  const currentQuestion = t.questions[step];

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSelect = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[step] = value;
    setAnswers(newAnswers);
  };

  const handleClose = () => {
    setStep(0);
    setAnswers(['', '', '']);
    onClose();
  };

  // Build UTM params from answers for tracking
  const buildScheduleUrl = () => {
    const params = new URLSearchParams({
      cloud: answers[0] || 'unknown',
      size: answers[1] || 'unknown',
      pain: answers[2] || 'unknown',
    });
    return `${siteConfig.SCHEDULE_URL}?${params.toString()}`;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-card rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border"
        >
          {/* Header */}
          <div className="bg-hero-gradient p-6 text-white">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/20 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="font-display text-xl font-bold">{t.title}</h2>
            <p className="text-white/80 text-sm mt-1">{t.subtitle}</p>
          </div>

          {/* Progress */}
          <div className="px-6 pt-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span>{t.step} {Math.min(step + 1, totalSteps)} {t.of} {totalSteps}</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-accent"
                initial={{ width: 0 }}
                animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-6 min-h-[280px]">
            <AnimatePresence mode="wait">
              {!isComplete ? (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <currentQuestion.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">{currentQuestion.question}</h3>
                  </div>

                  <RadioGroup
                    value={answers[step]}
                    onValueChange={handleSelect}
                    className="space-y-2"
                  >
                    {currentQuestion.options.map((option) => (
                      <div
                        key={option.value}
                        className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors cursor-pointer ${
                          answers[step] === option.value
                            ? 'border-accent bg-accent/5'
                            : 'border-border hover:border-muted-foreground/30'
                        }`}
                        onClick={() => handleSelect(option.value)}
                      >
                        <RadioGroupItem value={option.value} id={option.value} />
                        <Label htmlFor={option.value} className="cursor-pointer flex-1">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </motion.div>
              ) : (
                <motion.div
                  key="complete"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6"
                >
                  <div className="mx-auto w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <CheckCircle className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2">{t.ready}</h3>
                  <p className="text-muted-foreground text-sm mb-6">{t.readySubtitle}</p>
                  <Button
                    size="lg"
                    className="bg-accent text-accent-foreground hover:bg-accent/90 w-full"
                    asChild
                  >
                    <a href={buildScheduleUrl()} target="_blank" rel="noopener noreferrer">
                      {t.scheduleNow}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          {!isComplete && (
            <div className="px-6 pb-6 flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={step === 0}
                className="text-muted-foreground"
              >
                {t.back}
              </Button>
              <Button
                onClick={handleNext}
                disabled={!answers[step]}
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                {t.next}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
