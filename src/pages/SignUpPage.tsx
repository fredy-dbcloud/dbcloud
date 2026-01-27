import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLang } from '@/hooks/useLang';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Mail, Lock, User, Building, Loader2, MailCheck, RefreshCw } from 'lucide-react';

export default function SignUpPage() {
  const { lang, getLocalizedPath } = useLang();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signUp, resendVerificationEmail } = useAuth();

  // Get plan from URL if passed from checkout
  const planFromUrl = searchParams.get('plan') as 'starter' | 'growth' | null;

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    company: '',
    plan: planFromUrl || 'starter',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [success, setSuccess] = useState(false);

  const content = {
    en: {
      title: 'Create Your Account',
      subtitle: 'Set up your client portal to manage requests and track progress',
      emailLabel: 'Email Address',
      passwordLabel: 'Password',
      confirmPasswordLabel: 'Confirm Password',
      fullNameLabel: 'Full Name',
      companyLabel: 'Company Name (optional)',
      planLabel: 'Your Plan',
      plans: {
        starter: 'Starter Consulting',
        growth: 'Growth Consulting',
      },
      signUp: 'Create Account',
      signingUp: 'Creating account...',
      hasAccount: 'Already have an account?',
      signIn: 'Sign In',
      successTitle: 'Check Your Email',
      successMessage: 'We\'ve sent a verification link to',
      successInstruction: 'Click the link in your email to activate your account and access the Client Portal.',
      resendLink: 'Didn\'t receive the email?',
      resendButton: 'Resend verification email',
      resending: 'Sending...',
      resendSuccess: 'Verification email sent!',
      checkSpam: 'Check your spam folder if you don\'t see it.',
      goToLogin: 'Already verified? Sign In',
      errorPasswordMismatch: 'Passwords do not match',
      errorPasswordLength: 'Password must be at least 6 characters',
      errorGeneric: 'An error occurred. Please try again.',
    },
    es: {
      title: 'Crea Tu Cuenta',
      subtitle: 'Configura tu portal de cliente para gestionar solicitudes y seguir el progreso',
      emailLabel: 'Correo Electrónico',
      passwordLabel: 'Contraseña',
      confirmPasswordLabel: 'Confirmar Contraseña',
      fullNameLabel: 'Nombre Completo',
      companyLabel: 'Nombre de Empresa (opcional)',
      planLabel: 'Tu Plan',
      plans: {
        starter: 'Consultoría Starter',
        growth: 'Consultoría Growth',
      },
      signUp: 'Crear Cuenta',
      signingUp: 'Creando cuenta...',
      hasAccount: '¿Ya tienes una cuenta?',
      signIn: 'Iniciar Sesión',
      successTitle: 'Revisa Tu Correo',
      successMessage: 'Hemos enviado un enlace de verificación a',
      successInstruction: 'Haz clic en el enlace de tu correo para activar tu cuenta y acceder al Portal de Clientes.',
      resendLink: '¿No recibiste el correo?',
      resendButton: 'Reenviar correo de verificación',
      resending: 'Enviando...',
      resendSuccess: '¡Correo de verificación enviado!',
      checkSpam: 'Revisa tu carpeta de spam si no lo ves.',
      goToLogin: '¿Ya verificaste? Inicia Sesión',
      errorPasswordMismatch: 'Las contraseñas no coinciden',
      errorPasswordLength: 'La contraseña debe tener al menos 6 caracteres',
      errorGeneric: 'Ocurrió un error. Por favor intenta de nuevo.',
    },
  };

  const c = content[lang];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error(c.errorPasswordMismatch);
      return;
    }

    if (formData.password.length < 6) {
      toast.error(c.errorPasswordLength);
      return;
    }

    setIsLoading(true);

    try {
      await signUp(formData.email, formData.password, formData.fullName, formData.plan);
      setSuccess(true);
    } catch (error: any) {
      console.error('Signup error:', error);
      toast.error(error.message || c.errorGeneric);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setIsResending(true);
    try {
      await resendVerificationEmail(formData.email);
      toast.success(c.resendSuccess);
    } catch (error: any) {
      console.error('Resend error:', error);
      toast.error(c.errorGeneric);
    } finally {
      setIsResending(false);
    }
  };

  if (success) {
    return (
      <Layout>
        <section className="min-h-[80vh] flex items-center justify-center py-12">
          <div className="container max-w-md">
            <Card>
              <CardContent className="pt-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
                  <MailCheck className="h-8 w-8 text-accent" />
                </div>
                <h2 className="text-2xl font-display font-bold mb-2">{c.successTitle}</h2>
                <p className="text-muted-foreground mb-2">
                  {c.successMessage}
                </p>
                <p className="font-medium text-foreground mb-4">{formData.email}</p>
                <p className="text-sm text-muted-foreground mb-6">
                  {c.successInstruction}
                </p>
                
                <div className="border-t border-border pt-6 space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {c.resendLink}
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={handleResendEmail} 
                    disabled={isResending}
                    className="w-full"
                  >
                    {isResending ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        {c.resending}
                      </>
                    ) : (
                      <>
                        <Mail className="mr-2 h-4 w-4" />
                        {c.resendButton}
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    {c.checkSpam}
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <Button asChild variant="ghost" className="w-full">
                    <Link to={getLocalizedPath('/login')}>{c.goToLogin}</Link>
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
      <section className="min-h-[80vh] flex items-center justify-center py-12">
        <div className="container max-w-md">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-display">{c.title}</CardTitle>
              <CardDescription>{c.subtitle}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">{c.fullNameLabel}</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{c.emailLabel}</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">{c.companyLabel}</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="company"
                      type="text"
                      placeholder="Acme Inc."
                      value={formData.company}
                      onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="plan">{c.planLabel}</Label>
                  <Select 
                    value={formData.plan} 
                    onValueChange={(value: 'starter' | 'growth') => setFormData(prev => ({ ...prev, plan: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="starter">{c.plans.starter}</SelectItem>
                      <SelectItem value="growth">{c.plans.growth}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">{c.passwordLabel}</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      className="pl-10"
                      required
                      minLength={6}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">{c.confirmPasswordLabel}</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {c.signingUp}
                    </>
                  ) : (
                    c.signUp
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="justify-center">
              <p className="text-sm text-muted-foreground">
                {c.hasAccount}{' '}
                <Link 
                  to={getLocalizedPath('/login')} 
                  className="text-accent hover:underline font-medium"
                >
                  {c.signIn}
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
