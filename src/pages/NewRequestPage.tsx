import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Layout } from '@/components/layout/Layout';
import { useLang } from '@/hooks/useLang';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { AlertTriangle, CheckCircle2, Info, ExternalLink, FileText } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { siteConfig } from '@/config/site';
import { toast } from '@/hooks/use-toast';

const translations = {
  en: {
    title: 'Submit a Work Request',
    subtitle: 'All requests are tracked and prioritized based on your plan',
    emailLabel: 'Email Address',
    emailPlaceholder: 'your@company.com',
    planLabel: 'Plan',
    plans: {
      starter: 'Starter Consulting',
      growth: 'Growth Consulting',
    },
    requestTypeLabel: 'Request Type',
    requestTypes: {
      advisory: 'Advisory',
      optimization: 'Optimization',
      change_request: 'Change Request',
    },
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
    descriptionLabel: 'Description',
    descriptionPlaceholder: 'Describe what you need help with...',
    descriptionHint: 'Be specific about your requirements (max 500 characters)',
    submitButton: 'Submit Request',
    submitting: 'Submitting...',
    portalNotice: 'All work requests must be submitted via this portal. Email/WhatsApp requests are not tracked.',
    blockedTitle: 'Production High-Priority Not Included',
    blockedMessage: 'Production high-priority incidents are not included in Starter/Growth. Please schedule a call.',
    scheduleCall: 'Schedule a Call',
    successTitle: 'Request Submitted',
    successMessage: 'Your request has been received. You will receive a confirmation email shortly.',
    viewSummary: 'View Summary',
    submitAnother: 'Submit Another Request',
    validation: {
      emailRequired: 'Email is required',
      emailInvalid: 'Please enter a valid email address',
      descriptionRequired: 'Description is required',
      descriptionMax: 'Description must be less than 500 characters',
    },
  },
  es: {
    title: 'Enviar Solicitud de Trabajo',
    subtitle: 'Todas las solicitudes son rastreadas y priorizadas según tu plan',
    emailLabel: 'Correo Electrónico',
    emailPlaceholder: 'tu@empresa.com',
    planLabel: 'Plan',
    plans: {
      starter: 'Consultoría Starter',
      growth: 'Consultoría Growth',
    },
    requestTypeLabel: 'Tipo de Solicitud',
    requestTypes: {
      advisory: 'Asesoría',
      optimization: 'Optimización',
      change_request: 'Solicitud de Cambio',
    },
    environmentLabel: 'Entorno',
    environments: {
      production: 'Producción',
      staging: 'Staging',
      development: 'Desarrollo',
    },
    priorityLabel: 'Prioridad',
    priorities: {
      low: 'Baja',
      normal: 'Normal',
      high: 'Alta',
    },
    descriptionLabel: 'Descripción',
    descriptionPlaceholder: 'Describe con qué necesitas ayuda...',
    descriptionHint: 'Sé específico sobre tus requerimientos (máx 500 caracteres)',
    submitButton: 'Enviar Solicitud',
    submitting: 'Enviando...',
    portalNotice: 'Todas las solicitudes de trabajo deben enviarse a través de este portal. Las solicitudes por email/WhatsApp no son rastreadas.',
    blockedTitle: 'Producción Alta Prioridad No Incluida',
    blockedMessage: 'Incidentes críticos en producción no están incluidos en Starter/Growth. Agenda una llamada.',
    scheduleCall: 'Agendar Llamada',
    successTitle: 'Solicitud Enviada',
    successMessage: 'Tu solicitud ha sido recibida. Recibirás un email de confirmación en breve.',
    viewSummary: 'Ver Resumen',
    submitAnother: 'Enviar Otra Solicitud',
    validation: {
      emailRequired: 'El email es requerido',
      emailInvalid: 'Por favor ingresa un email válido',
      descriptionRequired: 'La descripción es requerida',
      descriptionMax: 'La descripción debe tener menos de 500 caracteres',
    },
  },
};

export default function NewRequestPage() {
  const { lang, getLocalizedPath } = useLang();
  const [searchParams] = useSearchParams();
  const planParam = searchParams.get('plan') || 'starter';
  const defaultPlan = planParam === 'growth' ? 'growth' : 'starter';
  
  const t = translations[lang as keyof typeof translations] || translations.en;
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  const formSchema = z.object({
    email: z.string().trim().min(1, t.validation.emailRequired).email(t.validation.emailInvalid),
    plan: z.enum(['starter', 'growth']),
    request_type: z.enum(['advisory', 'optimization', 'change_request']),
    environment: z.enum(['production', 'staging', 'development']),
    priority: z.enum(['low', 'normal', 'high']),
    description: z.string().trim().min(1, t.validation.descriptionRequired).max(500, t.validation.descriptionMax),
  });

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      plan: defaultPlan,
      request_type: 'advisory',
      environment: 'development',
      priority: 'normal',
      description: '',
    },
  });

  const watchEnvironment = form.watch('environment');
  const watchPriority = form.watch('priority');

  // Check if blocked (production + high priority)
  const checkBlocked = () => {
    const blocked = watchEnvironment === 'production' && watchPriority === 'high';
    setIsBlocked(blocked);
    return blocked;
  };

  const onSubmit = async (data: FormData) => {
    if (checkBlocked()) return;
    
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('client_requests').insert({
        email: data.email,
        plan: data.plan,
        request_type: data.request_type,
        environment: data.environment,
        priority: data.priority,
        description: data.description,
        lang: lang,
        status: 'pending',
      });

      if (error) throw error;

      setIsSuccess(true);
      toast({
        title: t.successTitle,
        description: t.successMessage,
      });
    } catch (error) {
      console.error('Error submitting request:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit request. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state
  if (isSuccess) {
    return (
      <Layout>
        <div className="min-h-screen bg-background py-12">
          <div className="container max-w-lg mx-auto px-4">
            <Card className="border-green-200 bg-green-50/50 dark:bg-green-950/20">
              <CardContent className="pt-6 text-center">
                <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-foreground mb-2">{t.successTitle}</h2>
                <p className="text-muted-foreground mb-6">{t.successMessage}</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button asChild>
                    <Link to={getLocalizedPath('/summary')}>
                      {t.viewSummary}
                    </Link>
                  </Button>
                  <Button variant="outline" onClick={() => {
                    setIsSuccess(false);
                    form.reset();
                  }}>
                    {t.submitAnother}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-background py-12">
        <div className="container max-w-2xl mx-auto px-4">
          {/* Header */}
          <div className="mb-6 text-center">
            <FileText className="h-12 w-12 text-primary mx-auto mb-3" />
            <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
            <p className="text-muted-foreground mt-1">{t.subtitle}</p>
          </div>

          {/* Portal Notice */}
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertDescription>{t.portalNotice}</AlertDescription>
          </Alert>

          {/* Blocked Warning */}
          {isBlocked && (
            <Alert variant="destructive" className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>{t.blockedTitle}</AlertTitle>
              <AlertDescription className="mt-2">
                {t.blockedMessage}
                <Button asChild variant="outline" size="sm" className="mt-3 ml-0 block w-fit">
                  <a href={siteConfig.SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
                    {t.scheduleCall}
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </a>
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Request Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.emailLabel}</FormLabel>
                        <FormControl>
                          <Input placeholder={t.emailPlaceholder} type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Plan & Request Type */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="plan"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.planLabel}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="starter">{t.plans.starter}</SelectItem>
                              <SelectItem value="growth">{t.plans.growth}</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="request_type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.requestTypeLabel}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="advisory">{t.requestTypes.advisory}</SelectItem>
                              <SelectItem value="optimization">{t.requestTypes.optimization}</SelectItem>
                              <SelectItem value="change_request">{t.requestTypes.change_request}</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Environment & Priority */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="environment"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.environmentLabel}</FormLabel>
                          <Select 
                            onValueChange={(val) => {
                              field.onChange(val);
                              setTimeout(checkBlocked, 0);
                            }} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="development">{t.environments.development}</SelectItem>
                              <SelectItem value="staging">{t.environments.staging}</SelectItem>
                              <SelectItem value="production">{t.environments.production}</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="priority"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.priorityLabel}</FormLabel>
                          <Select 
                            onValueChange={(val) => {
                              field.onChange(val);
                              setTimeout(checkBlocked, 0);
                            }} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="low">{t.priorities.low}</SelectItem>
                              <SelectItem value="normal">{t.priorities.normal}</SelectItem>
                              <SelectItem value="high">{t.priorities.high}</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Description */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.descriptionLabel}</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder={t.descriptionPlaceholder} 
                            className="min-h-[120px]"
                            maxLength={500}
                            {...field} 
                          />
                        </FormControl>
                        <p className="text-xs text-muted-foreground">
                          {t.descriptionHint} ({field.value?.length || 0}/500)
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Submit */}
                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    disabled={isSubmitting || isBlocked}
                  >
                    {isSubmitting ? t.submitting : t.submitButton}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
