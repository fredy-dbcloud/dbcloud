import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  FileText, 
  AlertTriangle,
  CheckCircle,
  Loader2,
  Calendar,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { useLang } from '@/hooks/useLang';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { siteConfig } from '@/config/site';
import { toast } from 'sonner';

const requestSchema = z.object({
  request_type: z.enum(['advisory', 'optimization', 'change_request']),
  environment: z.enum(['production', 'staging', 'development']),
  priority: z.enum(['low', 'normal', 'high']),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500, 'Description must be less than 500 characters'),
});

type RequestFormData = z.infer<typeof requestSchema>;

export default function PortalRequestsPage() {
  const { lang, getLocalizedPath } = useLang();
  const { user, profile } = useAuth();
  const [isBlocked, setIsBlocked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const plan = profile?.plan || 'starter';

  const content = {
    en: {
      title: 'Submit a Work Request',
      subtitle: 'Describe what you need and we\'ll prioritize it based on your plan',
      backToPortal: 'Back to Portal',
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
      blockedTitle: 'Production High-Priority Incidents Not Included',
      blockedMessage: 'Production high-priority incidents are not included in Starter/Growth plans. Please schedule a call to discuss Enterprise options.',
      scheduleCall: 'Schedule a Call',
      successTitle: 'Request Submitted!',
      successMessage: 'We have received your request and will review it shortly.',
      submitAnother: 'Submit Another Request',
    },
    es: {
      title: 'Enviar una Solicitud',
      subtitle: 'Describe lo que necesitas y lo priorizaremos según tu plan',
      backToPortal: 'Volver al Portal',
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
      descriptionPlaceholder: 'Describe lo que necesitas...',
      descriptionHint: 'Sé específico en tus requerimientos (máx 500 caracteres)',
      submitButton: 'Enviar Solicitud',
      submitting: 'Enviando...',
      portalNotice: 'Todas las solicitudes deben enviarse por este portal. Las solicitudes por Email/WhatsApp no se rastrean.',
      blockedTitle: 'Incidentes Críticos en Producción No Incluidos',
      blockedMessage: 'Los incidentes críticos en producción no están incluidos en los planes Starter/Growth. Agenda una llamada para discutir opciones Enterprise.',
      scheduleCall: 'Agendar Llamada',
      successTitle: '¡Solicitud Enviada!',
      successMessage: 'Hemos recibido tu solicitud y la revisaremos pronto.',
      submitAnother: 'Enviar Otra Solicitud',
    },
  };

  const c = content[lang];

  const form = useForm<RequestFormData>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      request_type: 'advisory',
      environment: 'development',
      priority: 'normal',
      description: '',
    },
  });

  const watchEnvironment = form.watch('environment');
  const watchPriority = form.watch('priority');

  useEffect(() => {
    const blocked = watchEnvironment === 'production' && watchPriority === 'high' && plan !== 'enterprise';
    setIsBlocked(blocked);
  }, [watchEnvironment, watchPriority, plan]);

  const onSubmit = async (data: RequestFormData) => {
    if (isBlocked || !user) return;

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('client_requests')
        .insert({
          user_id: user.id,
          email: user.email || '',
          plan: plan,
          request_type: data.request_type,
          environment: data.environment,
          priority: data.priority,
          description: data.description,
          lang: lang,
          status: 'pending',
        });

      if (error) throw error;

      setSuccess(true);
      toast.success(c.successTitle);

      // Trigger AI triage in background
      try {
        await supabase.functions.invoke('ai-triage', {
          body: { 
            request_type: data.request_type,
            description: data.description,
            environment: data.environment,
            priority: data.priority,
            plan: plan,
            email: user.email,
          }
        });
      } catch (triageError) {
        console.error('AI triage error:', triageError);
      }
    } catch (error: any) {
      console.error('Submit error:', error);
      toast.error(lang === 'es' ? 'Error al enviar solicitud' : 'Error submitting request');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <Layout>
        <section className="min-h-[60vh] flex items-center justify-center py-12">
          <div className="container max-w-md">
            <Card>
              <CardContent className="pt-8 text-center">
                <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500" />
                <h2 className="text-2xl font-bold mb-2">{c.successTitle}</h2>
                <p className="text-muted-foreground mb-6">{c.successMessage}</p>
                <div className="flex flex-col gap-3">
                  <Button asChild>
                    <Link to={getLocalizedPath('/portal')}>{c.backToPortal}</Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSuccess(false);
                      form.reset();
                    }}
                  >
                    {c.submitAnother}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-2xl mx-auto">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <Button variant="ghost" size="sm" asChild>
              <Link to={getLocalizedPath('/portal')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                {c.backToPortal}
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {c.title}
                </CardTitle>
                <CardDescription>{c.subtitle}</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Portal Notice */}
                <div className="bg-muted/50 border rounded-lg p-4 mb-6">
                  <p className="text-sm text-muted-foreground">{c.portalNotice}</p>
                </div>

                {/* Blocked Warning */}
                {isBlocked && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 mb-6"
                  >
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-destructive">{c.blockedTitle}</h4>
                        <p className="text-sm text-destructive/80 mt-1">{c.blockedMessage}</p>
                        <Button 
                          size="sm" 
                          className="mt-3"
                          asChild
                        >
                          <a href={siteConfig.SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
                            <Calendar className="mr-2 h-4 w-4" />
                            {c.scheduleCall}
                          </a>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="request_type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{c.requestTypeLabel}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="advisory">{c.requestTypes.advisory}</SelectItem>
                              <SelectItem value="optimization">{c.requestTypes.optimization}</SelectItem>
                              <SelectItem value="change_request">{c.requestTypes.change_request}</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="environment"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{c.environmentLabel}</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="development">{c.environments.development}</SelectItem>
                                <SelectItem value="staging">{c.environments.staging}</SelectItem>
                                <SelectItem value="production">{c.environments.production}</SelectItem>
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
                            <FormLabel>{c.priorityLabel}</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="low">{c.priorities.low}</SelectItem>
                                <SelectItem value="normal">{c.priorities.normal}</SelectItem>
                                <SelectItem value="high">{c.priorities.high}</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{c.descriptionLabel}</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={c.descriptionPlaceholder}
                              className="min-h-32 resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>{c.descriptionHint}</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isBlocked || isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {c.submitting}
                        </>
                      ) : (
                        c.submitButton
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
