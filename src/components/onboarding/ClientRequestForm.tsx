import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { AlertTriangle, Send, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useLang } from '@/hooks/useLang';
import { cn } from '@/lib/utils';

type PlanType = 'starter' | 'growth';

interface ClientRequestFormProps {
  plan: PlanType;
}

const requestSchema = z.object({
  email: z.string().email().max(255),
  requestType: z.enum(['advisory', 'optimization', 'change_request']),
  description: z.string().min(10).max(500),
  environment: z.enum(['production', 'staging', 'development']),
  priority: z.enum(['low', 'normal', 'high']),
});

type RequestFormData = z.infer<typeof requestSchema>;

export function ClientRequestForm({ plan }: ClientRequestFormProps) {
  const { t, lang, getLocalizedPath } = useLang();
  const tAny = t as any;
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [pendingData, setPendingData] = useState<RequestFormData | null>(null);

  const form = tAny.clientRequest?.form || {
    title: 'Submit a Work Request',
    emailLabel: 'Email Address',
    emailPlaceholder: 'your@email.com',
    typeLabel: 'Request Type',
    types: {
      advisory: 'Advisory',
      optimization: 'Optimization',
      change_request: 'Change Request',
    },
    descriptionLabel: 'Description',
    descriptionPlaceholder: 'Describe what you need...',
    descriptionHint: 'Max 500 characters',
    environmentLabel: 'Environment',
    environments: {
      production: 'Production',
      staging: 'Staging',
      development: 'Development',
    },
    priorityLabel: 'Priority',
    priorities: {
      low: 'Low',
      normal: 'Normal',
      high: 'High',
    },
    notice: 'All requests consume monthly included hours.',
    emergencyBlock: 'Emergency and incident response are not included in this plan.',
    submit: 'Submit Request',
    confirmation: {
      title: 'Confirm Submission',
      message: 'This request will be reviewed and prioritized based on your plan.',
      cancel: 'Cancel',
      confirm: 'Confirm & Submit',
    },
    warning: {
      title: 'High Priority Production Request',
      message: 'High priority requests on production environments require direct consultation. Please schedule a call or contact us.',
      scheduleCall: 'Schedule a Call',
      contactUs: 'Contact Us',
    },
    success: {
      title: 'Request Submitted',
      message: 'We have received your request. You will receive a confirmation email shortly.',
    },
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<RequestFormData>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      priority: 'normal',
      environment: 'development',
    },
  });

  const watchEnvironment = watch('environment');
  const watchPriority = watch('priority');

  const onSubmit = (data: RequestFormData) => {
    // Check for high priority + production combo
    if (data.environment === 'production' && data.priority === 'high') {
      setShowWarning(true);
      return;
    }

    setPendingData(data);
    setShowConfirmation(true);
  };

  const handleConfirmedSubmit = async () => {
    if (!pendingData) return;

    setIsSubmitting(true);
    setShowConfirmation(false);

    try {
      const { error } = await supabase.from('client_requests').insert({
        email: pendingData.email,
        plan,
        request_type: pendingData.requestType,
        description: pendingData.description,
        environment: pendingData.environment,
        priority: pendingData.priority,
        lang,
      });

      if (error) throw error;

      setIsSuccess(true);
      reset();
    } catch (error) {
      console.error('Error submitting request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-xl p-8 text-center"
      >
        <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
        <h3 className="font-semibold text-lg text-green-800 dark:text-green-400 mb-2">
          {form.success.title}
        </h3>
        <p className="text-green-700 dark:text-green-300">
          {form.success.message}
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setIsSuccess(false)}
        >
          {lang === 'es' ? 'Enviar Otra Solicitud' : 'Submit Another Request'}
        </Button>
      </motion.div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Notice */}
        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-amber-800 dark:text-amber-400">
                {form.notice}
              </p>
              <p className="text-amber-700 dark:text-amber-300 mt-1">
                {form.emergencyBlock}
              </p>
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">{form.emailLabel}</Label>
          <Input
            id="email"
            type="email"
            placeholder={form.emailPlaceholder}
            {...register('email')}
            className={cn(errors.email && 'border-destructive')}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Request Type */}
        <div className="space-y-2">
          <Label>{form.typeLabel}</Label>
          <Select onValueChange={(v) => setValue('requestType', v as any)}>
            <SelectTrigger className={cn(errors.requestType && 'border-destructive')}>
              <SelectValue placeholder={lang === 'es' ? 'Seleccionar tipo' : 'Select type'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="advisory">{form.types.advisory}</SelectItem>
              <SelectItem value="optimization">{form.types.optimization}</SelectItem>
              <SelectItem value="change_request">{form.types.change_request}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">{form.descriptionLabel}</Label>
          <Textarea
            id="description"
            placeholder={form.descriptionPlaceholder}
            maxLength={500}
            rows={4}
            {...register('description')}
            className={cn(errors.description && 'border-destructive')}
          />
          <p className="text-xs text-muted-foreground">{form.descriptionHint}</p>
          {errors.description && (
            <p className="text-sm text-destructive">{errors.description.message}</p>
          )}
        </div>

        {/* Environment & Priority */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>{form.environmentLabel}</Label>
            <Select
              defaultValue="development"
              onValueChange={(v) => setValue('environment', v as any)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="development">{form.environments.development}</SelectItem>
                <SelectItem value="staging">{form.environments.staging}</SelectItem>
                <SelectItem value="production">{form.environments.production}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>{form.priorityLabel}</Label>
            <Select
              defaultValue="normal"
              onValueChange={(v) => setValue('priority', v as any)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">{form.priorities.low}</SelectItem>
                <SelectItem value="normal">{form.priorities.normal}</SelectItem>
                <SelectItem value="high">{form.priorities.high}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Plan Badge */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{lang === 'es' ? 'Plan:' : 'Plan:'}</span>
          <span className={cn(
            "px-2 py-1 rounded-full text-xs font-medium",
            plan === 'starter' 
              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
              : "bg-accent/10 text-accent"
          )}>
            {plan === 'starter' ? 'Starter' : 'Growth'}
          </span>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <Send className="h-4 w-4 mr-2" />
          )}
          {form.submit}
        </Button>
      </form>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{form.confirmation.title}</DialogTitle>
            <DialogDescription>{form.confirmation.message}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmation(false)}>
              {form.confirmation.cancel}
            </Button>
            <Button onClick={handleConfirmedSubmit} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              {form.confirmation.confirm}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Warning Dialog for High Priority + Production */}
      <Dialog open={showWarning} onOpenChange={setShowWarning}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-amber-600">
              <AlertTriangle className="h-5 w-5" />
              {form.warning.title}
            </DialogTitle>
            <DialogDescription>{form.warning.message}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setShowWarning(false)}>
              {lang === 'es' ? 'Volver' : 'Go Back'}
            </Button>
            <Button asChild>
              <a href={getLocalizedPath('/schedule')}>{form.warning.scheduleCall}</a>
            </Button>
            <Button variant="secondary" asChild>
              <a href={getLocalizedPath('/contact')}>{form.warning.contactUs}</a>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
