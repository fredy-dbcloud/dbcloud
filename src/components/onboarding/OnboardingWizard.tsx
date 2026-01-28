import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Building2, Cloud, CheckCircle, ArrowRight, ArrowLeft, Send, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLang } from '@/hooks/useLang';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface OnboardingWizardProps {
  userId: string;
  userEmail: string;
  plan: 'starter' | 'growth';
  onComplete: () => void;
}

const CLOUD_PROVIDERS = [
  { value: 'aws', label: 'Amazon Web Services (AWS)' },
  { value: 'azure', label: 'Microsoft Azure' },
  { value: 'gcp', label: 'Google Cloud Platform (GCP)' },
  { value: 'oci', label: 'Oracle Cloud Infrastructure (OCI)' },
  { value: 'multi', label: 'Multi-Cloud' },
  { value: 'other', label: 'Other / On-Premise' },
];

const REGIONS = {
  aws: ['us-east-1', 'us-west-2', 'eu-west-1', 'ap-southeast-1'],
  azure: ['East US', 'West Europe', 'Southeast Asia', 'Australia East'],
  gcp: ['us-central1', 'europe-west1', 'asia-east1', 'australia-southeast1'],
  oci: ['us-ashburn-1', 'us-phoenix-1', 'eu-frankfurt-1', 'ap-tokyo-1'],
  multi: ['Multiple Regions'],
  other: ['N/A'],
};

export function OnboardingWizard({ userId, userEmail, plan, onComplete }: OnboardingWizardProps) {
  const { lang, getLocalizedPath } = useLang();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form data
  const [companyName, setCompanyName] = useState('');
  const [environmentType, setEnvironmentType] = useState<'production' | 'non-production'>('non-production');
  const [cloudProvider, setCloudProvider] = useState('');
  const [region, setRegion] = useState('');

  const content = {
    en: {
      step1Title: 'Company & Environment Setup',
      step1Description: 'Tell us about your infrastructure',
      step2Title: 'How DBCloud Works',
      step2Description: 'Understanding your consulting engagement',
      step3Title: 'You\'re All Set!',
      step3Description: 'Start your first request',
      companyName: 'Company Name',
      companyPlaceholder: 'Enter your company name',
      environmentType: 'Primary Environment Type',
      production: 'Production',
      productionDesc: 'Live systems serving real users',
      nonProduction: 'Non-Production',
      nonProductionDesc: 'Development, staging, or testing environments',
      cloudProvider: 'Primary Cloud Provider',
      selectProvider: 'Select your cloud provider',
      region: 'Primary Region',
      selectRegion: 'Select your region',
      next: 'Continue',
      back: 'Back',
      finish: 'Submit First Request',
      skipRequest: 'Go to Dashboard',
      // Step 2 content
      howItWorks: [
        {
          title: 'Portal-First Operations',
          description: 'All work requests are submitted and tracked through your Client Portal. This ensures proper documentation and response times.',
        },
        {
          title: 'Response Times by Plan',
          description: plan === 'starter' 
            ? 'Starter Plan: 1-2 business day response time during business hours.'
            : 'Growth Plan: Same or next business day response time during business hours.',
        },
        {
          title: 'Add-ons When Needed',
          description: 'Additional hours, incident response, or assessments can be purchased as one-time add-ons when your needs exceed your plan.',
        },
      ],
      // Step 3 content
      readyTitle: 'Your Portal is Ready',
      readyDescription: 'Submit your first request to get started with your consulting engagement.',
      firstRequestHint: 'Common first requests: architecture review, security assessment, migration planning, or optimization analysis.',
    },
    es: {
      step1Title: 'Configuración de Empresa y Entorno',
      step1Description: 'Cuéntanos sobre tu infraestructura',
      step2Title: 'Cómo Funciona DBCloud',
      step2Description: 'Entendiendo tu compromiso de consultoría',
      step3Title: '¡Todo Listo!',
      step3Description: 'Envía tu primera solicitud',
      companyName: 'Nombre de la Empresa',
      companyPlaceholder: 'Ingresa el nombre de tu empresa',
      environmentType: 'Tipo de Entorno Principal',
      production: 'Producción',
      productionDesc: 'Sistemas en vivo sirviendo usuarios reales',
      nonProduction: 'No-Producción',
      nonProductionDesc: 'Entornos de desarrollo, staging o pruebas',
      cloudProvider: 'Proveedor Cloud Principal',
      selectProvider: 'Selecciona tu proveedor cloud',
      region: 'Región Principal',
      selectRegion: 'Selecciona tu región',
      next: 'Continuar',
      back: 'Atrás',
      finish: 'Enviar Primera Solicitud',
      skipRequest: 'Ir al Panel',
      howItWorks: [
        {
          title: 'Operaciones vía Portal',
          description: 'Todas las solicitudes de trabajo se envían y rastrean a través de tu Portal de Cliente. Esto asegura documentación adecuada y tiempos de respuesta.',
        },
        {
          title: 'Tiempos de Respuesta por Plan',
          description: plan === 'starter' 
            ? 'Plan Starter: Respuesta en 1-2 días hábiles en horario de oficina.'
            : 'Plan Growth: Respuesta el mismo día o siguiente día hábil en horario de oficina.',
        },
        {
          title: 'Add-ons Cuando los Necesites',
          description: 'Horas adicionales, respuesta a incidentes o evaluaciones pueden comprarse como add-ons cuando tus necesidades excedan tu plan.',
        },
      ],
      readyTitle: 'Tu Portal Está Listo',
      readyDescription: 'Envía tu primera solicitud para comenzar con tu compromiso de consultoría.',
      firstRequestHint: 'Solicitudes iniciales comunes: revisión de arquitectura, evaluación de seguridad, planificación de migración o análisis de optimización.',
    },
  };

  const c = content[lang];

  const handleSaveProfile = async () => {
    if (!companyName.trim()) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          company: companyName.trim(),
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);

      if (error) throw error;
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleNext = async () => {
    if (step === 1) {
      await handleSaveProfile();
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleFinish = async (goToRequests: boolean) => {
    setIsSubmitting(true);
    
    // Mark onboarding as complete
    localStorage.setItem(`onboarding_complete_${userId}`, 'true');
    localStorage.setItem(`onboarding_data_${userId}`, JSON.stringify({
      companyName,
      environmentType,
      cloudProvider,
      region,
      completedAt: new Date().toISOString()
    }));
    
    toast.success(lang === 'es' ? '¡Onboarding completado!' : 'Onboarding completed!');
    
    onComplete();
    
    if (goToRequests) {
      navigate(getLocalizedPath('/portal/requests'));
    }
    
    setIsSubmitting(false);
  };

  const availableRegions = cloudProvider ? REGIONS[cloudProvider as keyof typeof REGIONS] || [] : [];

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl">
        {/* Progress Steps */}
        <div className="px-6 pt-6">
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors ${
                    s < step
                      ? 'bg-green-500 text-white'
                      : s === step
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {s < step ? <CheckCircle className="h-5 w-5" /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-24 sm:w-32 h-1 mx-2 rounded ${
                      s < step ? 'bg-green-500' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Company & Environment */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-accent" />
                  {c.step1Title}
                </CardTitle>
                <CardDescription>{c.step1Description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Company Name */}
                <div className="space-y-2">
                  <Label htmlFor="company">{c.companyName}</Label>
                  <Input
                    id="company"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder={c.companyPlaceholder}
                  />
                </div>

                {/* Environment Type */}
                <div className="space-y-3">
                  <Label>{c.environmentType}</Label>
                  <RadioGroup value={environmentType} onValueChange={(v) => setEnvironmentType(v as any)}>
                    <div className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value="production" id="production" className="mt-1" />
                      <Label htmlFor="production" className="cursor-pointer flex-1">
                        <div className="font-medium">{c.production}</div>
                        <div className="text-sm text-muted-foreground">{c.productionDesc}</div>
                      </Label>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value="non-production" id="non-production" className="mt-1" />
                      <Label htmlFor="non-production" className="cursor-pointer flex-1">
                        <div className="font-medium">{c.nonProduction}</div>
                        <div className="text-sm text-muted-foreground">{c.nonProductionDesc}</div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Cloud Provider */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{c.cloudProvider}</Label>
                    <Select value={cloudProvider} onValueChange={(v) => { setCloudProvider(v); setRegion(''); }}>
                      <SelectTrigger>
                        <SelectValue placeholder={c.selectProvider} />
                      </SelectTrigger>
                      <SelectContent>
                        {CLOUD_PROVIDERS.map((p) => (
                          <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>{c.region}</Label>
                    <Select value={region} onValueChange={setRegion} disabled={!cloudProvider}>
                      <SelectTrigger>
                        <SelectValue placeholder={c.selectRegion} />
                      </SelectTrigger>
                      <SelectContent>
                        {availableRegions.map((r) => (
                          <SelectItem key={r} value={r}>{r}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={handleNext} disabled={!companyName.trim()}>
                    {c.next}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </motion.div>
          )}

          {/* Step 2: How DBCloud Works */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-accent" />
                  {c.step2Title}
                </CardTitle>
                <CardDescription>{c.step2Description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {c.howItWorks.map((item, index) => (
                  <div 
                    key={index}
                    className="flex gap-4 p-4 rounded-lg bg-muted/50 border"
                  >
                    <div className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center flex-shrink-0 font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={handleBack}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {c.back}
                  </Button>
                  <Button onClick={handleNext}>
                    {c.next}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </motion.div>
          )}

          {/* Step 3: Ready to Start */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <CardHeader className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center"
                >
                  <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                </motion.div>
                <CardTitle>{c.readyTitle}</CardTitle>
                <CardDescription>{c.readyDescription}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 text-center">
                  <Cloud className="h-8 w-8 mx-auto mb-2 text-accent" />
                  <p className="text-sm text-muted-foreground">
                    {c.firstRequestHint}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    onClick={() => handleFinish(true)} 
                    disabled={isSubmitting}
                    className="bg-accent hover:bg-accent/90"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    {c.finish}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleFinish(false)}
                    disabled={isSubmitting}
                  >
                    {c.skipRequest}
                  </Button>
                </div>

                <div className="flex justify-start">
                  <Button variant="ghost" size="sm" onClick={handleBack}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {c.back}
                  </Button>
                </div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  );
}
