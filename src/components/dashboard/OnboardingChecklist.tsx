import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, ChevronDown, ChevronUp, Send, Calendar, FileText, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useLang } from '@/hooks/useLang';
import { siteConfig } from '@/config/site';

interface ChecklistItem {
  id: string;
  labelEn: string;
  labelEs: string;
  icon: React.ElementType;
  link?: string;
  externalLink?: string;
}

interface OnboardingChecklistProps {
  userId: string;
  hasSubmittedRequest: boolean;
  hasScheduledCall: boolean;
  hasViewedBilling: boolean;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'profile',
    labelEn: 'Complete your company profile',
    labelEs: 'Completa tu perfil de empresa',
    icon: FileText,
  },
  {
    id: 'first_request',
    labelEn: 'Submit your first request',
    labelEs: 'Envía tu primera solicitud',
    icon: Send,
    link: '/portal/requests',
  },
  {
    id: 'schedule_call',
    labelEn: 'Schedule your kickoff call',
    labelEs: 'Agenda tu llamada de inicio',
    icon: Calendar,
    externalLink: siteConfig.SCHEDULE_URL,
  },
  {
    id: 'billing',
    labelEn: 'Review billing & subscriptions',
    labelEs: 'Revisa facturación y suscripciones',
    icon: CreditCard,
  },
];

export function OnboardingChecklist({ 
  userId, 
  hasSubmittedRequest, 
  hasScheduledCall,
  hasViewedBilling 
}: OnboardingChecklistProps) {
  const { lang, getLocalizedPath } = useLang();
  const [isExpanded, setIsExpanded] = useState(true);
  const [completedItems, setCompletedItems] = useState<string[]>([]);

  // Load completed items from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(`onboarding_checklist_${userId}`);
    if (stored) {
      setCompletedItems(JSON.parse(stored));
    }

    // Check if profile was completed during wizard
    const onboardingComplete = localStorage.getItem(`onboarding_complete_${userId}`);
    if (onboardingComplete) {
      setCompletedItems(prev => {
        if (!prev.includes('profile')) {
          const updated = [...prev, 'profile'];
          localStorage.setItem(`onboarding_checklist_${userId}`, JSON.stringify(updated));
          return updated;
        }
        return prev;
      });
    }
  }, [userId]);

  // Update based on props
  useEffect(() => {
    const updates: string[] = [];
    if (hasSubmittedRequest && !completedItems.includes('first_request')) {
      updates.push('first_request');
    }
    if (hasScheduledCall && !completedItems.includes('schedule_call')) {
      updates.push('schedule_call');
    }
    if (hasViewedBilling && !completedItems.includes('billing')) {
      updates.push('billing');
    }

    if (updates.length > 0) {
      const newCompleted = [...completedItems, ...updates];
      setCompletedItems(newCompleted);
      localStorage.setItem(`onboarding_checklist_${userId}`, JSON.stringify(newCompleted));
    }
  }, [hasSubmittedRequest, hasScheduledCall, hasViewedBilling, userId, completedItems]);

  const markComplete = (itemId: string) => {
    if (!completedItems.includes(itemId)) {
      const updated = [...completedItems, itemId];
      setCompletedItems(updated);
      localStorage.setItem(`onboarding_checklist_${userId}`, JSON.stringify(updated));
    }
  };

  const progress = (completedItems.length / CHECKLIST_ITEMS.length) * 100;
  const allComplete = completedItems.length === CHECKLIST_ITEMS.length;

  // Don't show if all complete and collapsed
  if (allComplete && !isExpanded) {
    return null;
  }

  const content = {
    en: {
      title: 'Getting Started',
      progress: `${completedItems.length} of ${CHECKLIST_ITEMS.length} complete`,
      allDone: 'All set! You\'re ready to go.',
      portalNote: 'Remember: All requests are managed through this portal for proper tracking.',
    },
    es: {
      title: 'Primeros Pasos',
      progress: `${completedItems.length} de ${CHECKLIST_ITEMS.length} completados`,
      allDone: '¡Todo listo! Estás preparado.',
      portalNote: 'Recuerda: Todas las solicitudes se gestionan a través de este portal para un seguimiento adecuado.',
    },
  };

  const c = content[lang];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="border-accent/30 bg-accent/5">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              {allComplete ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <Circle className="h-5 w-5 text-accent" />
              )}
              {c.title}
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground">
              {allComplete ? c.allDone : c.progress}
            </p>
          </div>
        </CardHeader>

        {isExpanded && (
          <CardContent className="pt-0 space-y-3">
            {CHECKLIST_ITEMS.map((item) => {
              const isComplete = completedItems.includes(item.id);
              const Icon = item.icon;
              const label = lang === 'es' ? item.labelEs : item.labelEn;

              return (
                <div
                  key={item.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                    isComplete 
                      ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800' 
                      : 'bg-background border-border hover:bg-muted/50'
                  }`}
                >
                  <div className={`flex-shrink-0 ${isComplete ? 'text-green-500' : 'text-muted-foreground'}`}>
                    {isComplete ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  <span className={`flex-1 text-sm ${isComplete ? 'line-through text-muted-foreground' : ''}`}>
                    {label}
                  </span>
                  {!isComplete && (
                    <>
                      {item.link && (
                        <Button size="sm" variant="outline" asChild>
                          <Link to={getLocalizedPath(item.link)}>
                            {lang === 'es' ? 'Ir' : 'Go'}
                          </Link>
                        </Button>
                      )}
                      {item.externalLink && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          asChild
                          onClick={() => markComplete(item.id)}
                        >
                          <a href={item.externalLink} target="_blank" rel="noopener noreferrer">
                            {lang === 'es' ? 'Agendar' : 'Schedule'}
                          </a>
                        </Button>
                      )}
                      {!item.link && !item.externalLink && (
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => markComplete(item.id)}
                        >
                          {lang === 'es' ? 'Marcar' : 'Mark'}
                        </Button>
                      )}
                    </>
                  )}
                </div>
              );
            })}

            {/* Portal reminder */}
            <div className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/20">
              <p className="text-xs text-muted-foreground">
                {c.portalNote}
              </p>
            </div>
          </CardContent>
        )}
      </Card>
    </motion.div>
  );
}
