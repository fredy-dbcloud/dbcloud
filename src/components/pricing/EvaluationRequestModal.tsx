import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLang } from '@/hooks/useLang';
import { Loader2, ClipboardCheck, Shield, Calendar } from 'lucide-react';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { siteConfig } from '@/config/site';

interface EvaluationRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  tierName: string;
  price: string;
}

const emailSchema = z.string().trim().email('Please enter a valid email address');

export function EvaluationRequestModal({ isOpen, onClose, tierName, price }: EvaluationRequestModalProps) {
  const { lang } = useLang();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const labels = {
    en: {
      title: 'Request Enrollment in Growth Consulting',
      description: "We'll validate scope with you before activating billing and services.",
      emailLabel: 'Email Address',
      emailPlaceholder: 'you@company.com',
      submit: 'Request Free Scope Review',
      trustText: 'No charges will be made without prior scope validation.',
      successTitle: 'Request Received',
      successMessage: 'A specialist will contact you within 1-2 business days to validate scope and discuss next steps.',
      scheduleNow: 'Schedule a Call Now',
      close: 'Close',
      planSummary: 'Growth Consulting Plan',
    },
    es: {
      title: 'Solicita tu Incorporación al Plan Growth',
      description: 'Validaremos el alcance contigo antes de activar facturación y servicios.',
      emailLabel: 'Correo Electrónico',
      emailPlaceholder: 'tu@empresa.com',
      submit: 'Solicitar Evaluación Gratuita',
      trustText: 'No se realizará ningún cargo sin validación previa del alcance.',
      successTitle: 'Solicitud Recibida',
      successMessage: 'Un especialista te contactará en 1-2 días hábiles para validar el alcance y discutir los siguientes pasos.',
      scheduleNow: 'Agendar Llamada Ahora',
      close: 'Cerrar',
      planSummary: 'Plan Growth Consulting',
    },
  };

  const l = labels[lang];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      emailSchema.parse(email);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
        return;
      }
    }

    setIsLoading(true);

    try {
      const { error: insertError } = await supabase.from('leads').insert({
        email: email.trim(),
        source: 'growth_evaluation_request',
        interest: 'growth',
        lang,
      });

      if (insertError) throw insertError;

      setIsSuccess(true);
      toast.success(lang === 'es' ? 'Solicitud enviada correctamente' : 'Request submitted successfully');
    } catch (error) {
      console.error('Error submitting evaluation request:', error);
      toast.error(lang === 'es' ? 'Error al enviar solicitud' : 'Failed to submit request');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setError('');
    setIsSuccess(false);
    onClose();
  };

  if (isSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-accent">
              <ClipboardCheck className="h-5 w-5" />
              {l.successTitle}
            </DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <div className="bg-accent/10 rounded-lg p-4 mb-6">
              <p className="text-sm text-foreground">
                {l.successMessage}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                asChild
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                size="lg"
              >
                <a href={siteConfig.SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
                  <Calendar className="mr-2 h-4 w-4" />
                  {l.scheduleNow}
                </a>
              </Button>

              <Button
                variant="outline"
                onClick={handleClose}
                className="w-full"
              >
                {l.close}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5 text-primary" />
            {l.title}
          </DialogTitle>
          <DialogDescription>{l.description}</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {/* Plan Summary */}
          <div className="bg-muted/50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-lg">{tierName}</p>
                <p className="text-sm text-muted-foreground">{l.planSummary}</p>
              </div>
              <div className="text-right">
                <p className="font-display text-2xl font-bold">{price}</p>
                <p className="text-sm text-muted-foreground">/month</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="eval-email">{l.emailLabel}</Label>
              <Input
                id="eval-email"
                type="email"
                placeholder={l.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>

            <Button
              type="submit"
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {lang === 'es' ? 'Enviando...' : 'Submitting...'}
                </>
              ) : (
                <>
                  <ClipboardCheck className="mr-2 h-4 w-4" />
                  {l.submit}
                </>
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
              <Shield className="h-3 w-3" />
              {l.trustText}
            </p>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
