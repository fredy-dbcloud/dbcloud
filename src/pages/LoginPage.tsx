import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLang } from '@/hooks/useLang';
import { useAuth } from '@/hooks/useAuth';
import { useAdminRole } from '@/hooks/useAdminRole';
import { toast } from 'sonner';
import { Mail, Lock, Loader2, ArrowLeft, MailCheck } from 'lucide-react';

export default function LoginPage() {
  const { lang, getLocalizedPath } = useLang();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { signIn, signInWithMagicLink, resetPassword, isAuthenticated, user } = useAuth();
  const { isAdmin, isCheckingRole, checkAdminRole } = useAdminRole();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  // Get the intended destination from state (if any)
  const stateFrom = (location.state as { from?: { pathname: string } })?.from?.pathname;

  // Handle redirect after auth state changes
  useEffect(() => {
    if (!isAuthenticated || isCheckingRole) return;

    // Determine redirect destination based on role
    const handleRedirect = async () => {
      // If user came from a specific page, respect that
      if (stateFrom && !stateFrom.includes('/login')) {
        navigate(stateFrom, { replace: true });
        return;
      }

      // Role-based redirect
      if (isAdmin) {
        navigate(getLocalizedPath('/internal'), { replace: true });
      } else {
        navigate(getLocalizedPath('/portal'), { replace: true });
      }
    };

    handleRedirect();
  }, [isAuthenticated, isCheckingRole, isAdmin, stateFrom, navigate, getLocalizedPath]);

  const content = {
    en: {
      title: 'Client Portal Access',
      subtitle: 'Secure access for existing DBCloud clients to manage requests, track progress, and view monthly summaries.',
      emailLabel: 'Email Address',
      passwordLabel: 'Password',
      signIn: 'Sign In',
      signingIn: 'Signing in...',
      magicLink: 'Magic Link',
      password: 'Password',
      sendMagicLink: 'Send Magic Link',
      sendingLink: 'Sending...',
      magicLinkSent: 'Check your email for the login link!',
      noAccount: 'Need access?',
      signUp: 'Contact us',
      orContinueWith: 'or continue with',
      errorInvalidCredentials: 'Invalid email or password',
      errorGeneric: 'An error occurred. Please try again.',
      forgotPassword: 'Forgot password?',
      forgotPasswordTitle: 'Reset Password',
      forgotPasswordSubtitle: 'Enter your email and we\'ll send you a link to reset your password.',
      sendResetLink: 'Send Reset Link',
      backToLogin: 'Back to login',
      resetEmailSent: 'Password reset email sent!',
      resetEmailSentMessage: 'Check your email for a link to reset your password. If it doesn\'t appear within a few minutes, check your spam folder.',
    },
    es: {
      title: 'Acceso al portal de clientes',
      subtitle: 'Acceso seguro para clientes de DBCloud para gestionar solicitudes, revisar avances y consultar resúmenes mensuales.',
      emailLabel: 'Correo Electrónico',
      passwordLabel: 'Contraseña',
      signIn: 'Iniciar Sesión',
      signingIn: 'Iniciando sesión...',
      magicLink: 'Link Mágico',
      password: 'Contraseña',
      sendMagicLink: 'Enviar Link Mágico',
      sendingLink: 'Enviando...',
      magicLinkSent: '¡Revisa tu correo para el enlace de acceso!',
      noAccount: '¿Necesitas acceso?',
      signUp: 'Contáctanos',
      orContinueWith: 'o continúa con',
      errorInvalidCredentials: 'Email o contraseña inválidos',
      errorGeneric: 'Ocurrió un error. Por favor intenta de nuevo.',
      forgotPassword: '¿Olvidaste tu contraseña?',
      forgotPasswordTitle: 'Restablecer Contraseña',
      forgotPasswordSubtitle: 'Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.',
      sendResetLink: 'Enviar Enlace',
      backToLogin: 'Volver al login',
      resetEmailSent: '¡Correo de restablecimiento enviado!',
      resetEmailSentMessage: 'Revisa tu correo para el enlace de restablecimiento. Si no aparece en unos minutos, revisa tu carpeta de spam.',
    },
  };

  const c = content[lang];

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { user: signedInUser } = await signIn(email, password);
      toast.success(lang === 'es' ? '¡Bienvenido!' : 'Welcome back!');
      
      // Check admin status for the newly logged in user
      if (signedInUser) {
        const adminStatus = await checkAdminRole(signedInUser.id);
        
        // Redirect based on role (unless coming from a specific page)
        if (stateFrom && !stateFrom.includes('/login')) {
          navigate(stateFrom, { replace: true });
        } else if (adminStatus) {
          navigate(getLocalizedPath('/internal'), { replace: true });
        } else {
          navigate(getLocalizedPath('/portal'), { replace: true });
        }
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message?.includes('Invalid') ? c.errorInvalidCredentials : c.errorGeneric);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signInWithMagicLink(email);
      setMagicLinkSent(true);
      toast.success(c.magicLinkSent);
    } catch (error: any) {
      console.error('Magic link error:', error);
      toast.error(c.errorGeneric);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await resetPassword(email);
      setResetEmailSent(true);
      toast.success(c.resetEmailSent);
    } catch (error: any) {
      console.error('Reset password error:', error);
      toast.error(c.errorGeneric);
    } finally {
      setIsLoading(false);
    }
  };

  // Forgot password view
  if (showForgotPassword) {
    return (
      <Layout>
        <section className="min-h-[80vh] flex items-center justify-center py-12">
          <div className="container max-w-md">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-display">{c.forgotPasswordTitle}</CardTitle>
                <CardDescription>{c.forgotPasswordSubtitle}</CardDescription>
              </CardHeader>
              <CardContent>
                {resetEmailSent ? (
                  <div className="text-center py-4">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
                      <MailCheck className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="font-semibold mb-2">{c.resetEmailSent}</h3>
                    <p className="text-sm text-muted-foreground mb-6">{c.resetEmailSentMessage}</p>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        setShowForgotPassword(false);
                        setResetEmailSent(false);
                      }}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      {c.backToLogin}
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleForgotPassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="reset-email">{c.emailLabel}</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="reset-email"
                          type="email"
                          placeholder="you@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {c.sendingLink}
                        </>
                      ) : (
                        c.sendResetLink
                      )}
                    </Button>

                    <Button 
                      type="button"
                      variant="ghost" 
                      className="w-full"
                      onClick={() => setShowForgotPassword(false)}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      {c.backToLogin}
                    </Button>
                  </form>
                )}
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
              <Tabs defaultValue="password" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="password">{c.password}</TabsTrigger>
                  <TabsTrigger value="magic">{c.magicLink}</TabsTrigger>
                </TabsList>

                <TabsContent value="password">
                  <form onSubmit={handlePasswordLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">{c.emailLabel}</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">{c.passwordLabel}</Label>
                        <button
                          type="button"
                          onClick={() => setShowForgotPassword(true)}
                          className="text-xs text-accent hover:underline"
                        >
                          {c.forgotPassword}
                        </button>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {c.signingIn}
                        </>
                      ) : (
                        c.signIn
                      )}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="magic">
                  {magicLinkSent ? (
                    <div className="text-center py-8">
                      <Mail className="h-12 w-12 mx-auto mb-4 text-accent" />
                      <p className="text-muted-foreground">{c.magicLinkSent}</p>
                    </div>
                  ) : (
                    <form onSubmit={handleMagicLink} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="magic-email">{c.emailLabel}</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="magic-email"
                            type="email"
                            placeholder="you@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {c.sendingLink}
                          </>
                        ) : (
                          c.sendMagicLink
                        )}
                      </Button>
                    </form>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="justify-center">
              <p className="text-sm text-muted-foreground">
                {c.noAccount}{' '}
                <Link 
                  to={getLocalizedPath('/contact')} 
                  className="text-accent hover:underline font-medium"
                >
                  {c.signUp}
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
