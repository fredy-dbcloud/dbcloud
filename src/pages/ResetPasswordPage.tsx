import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLang } from '@/hooks/useLang';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Lock, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export default function ResetPasswordPage() {
  const { lang, getLocalizedPath } = useLang();
  const navigate = useNavigate();
  const { updatePassword, session } = useAuth();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const content = {
    en: {
      title: 'Set New Password',
      subtitle: 'Enter your new password below',
      passwordLabel: 'New Password',
      confirmPasswordLabel: 'Confirm New Password',
      submit: 'Update Password',
      submitting: 'Updating...',
      successTitle: 'Password Updated',
      successMessage: 'Your password has been updated successfully. You can now sign in with your new password.',
      goToLogin: 'Go to Login',
      errorTitle: 'Invalid Reset Link',
      errorMessage: 'This password reset link is invalid or has expired. Please request a new one.',
      requestNewLink: 'Request New Link',
      errorPasswordMismatch: 'Passwords do not match',
      errorPasswordLength: 'Password must be at least 6 characters',
      errorGeneric: 'An error occurred. Please try again.',
    },
    es: {
      title: 'Establecer Nueva Contraseña',
      subtitle: 'Ingresa tu nueva contraseña a continuación',
      passwordLabel: 'Nueva Contraseña',
      confirmPasswordLabel: 'Confirmar Nueva Contraseña',
      submit: 'Actualizar Contraseña',
      submitting: 'Actualizando...',
      successTitle: 'Contraseña Actualizada',
      successMessage: 'Tu contraseña ha sido actualizada exitosamente. Ahora puedes iniciar sesión con tu nueva contraseña.',
      goToLogin: 'Ir al Login',
      errorTitle: 'Enlace Inválido',
      errorMessage: 'Este enlace de restablecimiento es inválido o ha expirado. Por favor solicita uno nuevo.',
      requestNewLink: 'Solicitar Nuevo Enlace',
      errorPasswordMismatch: 'Las contraseñas no coinciden',
      errorPasswordLength: 'La contraseña debe tener al menos 6 caracteres',
      errorGeneric: 'Ocurrió un error. Por favor intenta de nuevo.',
    },
  };

  const c = content[lang];

  // Check if user has a valid session (from email link)
  useEffect(() => {
    // Give a moment for the session to be established from the URL hash
    const timer = setTimeout(() => {
      if (!session) {
        setError(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error(c.errorPasswordMismatch);
      return;
    }

    if (password.length < 6) {
      toast.error(c.errorPasswordLength);
      return;
    }

    setIsLoading(true);

    try {
      await updatePassword(password);
      setSuccess(true);
      toast.success(c.successTitle);
    } catch (err: any) {
      console.error('Password update error:', err);
      toast.error(err.message || c.errorGeneric);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <Layout>
        <section className="min-h-[80vh] flex items-center justify-center py-12">
          <div className="container max-w-md">
            <Card>
              <CardContent className="pt-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-destructive/10 flex items-center justify-center">
                  <AlertCircle className="h-8 w-8 text-destructive" />
                </div>
                <h2 className="text-2xl font-display font-bold mb-2">{c.errorTitle}</h2>
                <p className="text-muted-foreground mb-6">{c.errorMessage}</p>
                <Button asChild className="w-full">
                  <Link to={getLocalizedPath('/login')}>{c.requestNewLink}</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </Layout>
    );
  }

  if (success) {
    return (
      <Layout>
        <section className="min-h-[80vh] flex items-center justify-center py-12">
          <div className="container max-w-md">
            <Card>
              <CardContent className="pt-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                <h2 className="text-2xl font-display font-bold mb-2">{c.successTitle}</h2>
                <p className="text-muted-foreground mb-6">{c.successMessage}</p>
                <Button asChild className="w-full">
                  <Link to={getLocalizedPath('/login')}>{c.goToLogin}</Link>
                </Button>
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
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {c.submitting}
                    </>
                  ) : (
                    c.submit
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
