import { useState } from 'react';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLang } from '@/hooks/useLang';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Mail, Lock, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const { lang, getLocalizedPath } = useLang();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { signIn, signInWithMagicLink } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  // Get the intended destination
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || 
               getLocalizedPath('/portal');

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
    },
  };

  const c = content[lang];

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signIn(email, password);
      toast.success(lang === 'es' ? '¡Bienvenido!' : 'Welcome back!');
      navigate(from, { replace: true });
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
                      <Label htmlFor="password">{c.passwordLabel}</Label>
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
