import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useLang } from '@/hooks/useLang';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Language-aware validation messages
const getContactSchema = (lang: 'en' | 'es') => {
  const messages = {
    en: {
      nameMin: 'Name must be at least 2 characters',
      nameMax: 'Name must be less than 100 characters',
      emailInvalid: 'Please enter a valid email address',
      emailMax: 'Email must be less than 255 characters',
      phoneMax: 'Phone must be less than 50 characters',
      companyMax: 'Company must be less than 200 characters',
      interestRequired: 'Please select an area of interest',
      messageMin: 'Message must be at least 10 characters',
      messageMax: 'Message must be less than 2000 characters',
    },
    es: {
      nameMin: 'El nombre debe tener al menos 2 caracteres',
      nameMax: 'El nombre debe tener menos de 100 caracteres',
      emailInvalid: 'Por favor ingresa un correo electrónico válido',
      emailMax: 'El correo debe tener menos de 255 caracteres',
      phoneMax: 'El teléfono debe tener menos de 50 caracteres',
      companyMax: 'La empresa debe tener menos de 200 caracteres',
      interestRequired: 'Por favor selecciona un área de interés',
      messageMin: 'El mensaje debe tener al menos 10 caracteres',
      messageMax: 'El mensaje debe tener menos de 2000 caracteres',
    },
  };

  const m = messages[lang];

  return z.object({
    name: z.string()
      .min(2, { message: m.nameMin })
      .max(100, { message: m.nameMax }),
    email: z.string()
      .email({ message: m.emailInvalid })
      .max(255, { message: m.emailMax }),
    phone: z.string()
      .max(50, { message: m.phoneMax })
      .optional()
      .or(z.literal('')),
    company: z.string()
      .max(200, { message: m.companyMax })
      .optional()
      .or(z.literal('')),
    interest: z.string()
      .min(1, { message: m.interestRequired }),
    message: z.string()
      .min(10, { message: m.messageMin })
      .max(2000, { message: m.messageMax }),
    website: z.string().max(0).optional(), // Honeypot field - should be empty
  });
};

type ContactFormData = z.infer<ReturnType<typeof getContactSchema>>;

// Placeholders and helper text by language
const placeholders = {
  en: {
    name: 'John Doe',
    email: 'john.doe@company.com',
    phone: '+1 929 733 8260',
    company: 'Acme Inc.',
    interest: 'Select an option',
    message: 'Briefly describe your needs (e.g. migrate Oracle to cloud)',
    phoneHelper: 'Include country code if possible',
  },
  es: {
    name: 'Juan Pérez',
    email: 'juan.perez@empresa.com',
    phone: '+1 929 733 8260',
    company: 'Empresa S.A.',
    interest: 'Selecciona una opción',
    message: 'Describe brevemente tu necesidad (ej. migrar Oracle a la nube)',
    phoneHelper: 'Incluye el código del país si es posible',
  },
};

export function ContactForm() {
  const { lang, t } = useLang();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  // Memoize schema based on language
  const contactSchema = useMemo(() => getContactSchema(lang), [lang]);
  const ph = placeholders[lang];

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      interest: '',
      message: '',
      website: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    // Honeypot check - if filled, silently reject (bots fill hidden fields)
    if (honeypot) {
      setIsSuccess(true);
      return;
    }

    setIsSubmitting(true);
    try {
      // Call the edge function for full pipeline processing
      const { data: response, error } = await supabase.functions.invoke('process-contact-lead', {
        body: {
          name: data.name.trim(),
          email: data.email.trim().toLowerCase(),
          phone: data.phone?.trim() || undefined,
          company: data.company?.trim() || undefined,
          interest: data.interest,
          message: data.message.trim(),
          lang,
        },
      });

      if (error) {
        console.error('Error submitting contact form:', error);
        toast.error(lang === 'es' 
          ? 'Algo salió mal. Por favor, intenta de nuevo.' 
          : 'Something went wrong. Please try again.');
        return;
      }

      setIsSuccess(true);
      toast.success(t.contact.success);
    } catch (error) {
      console.error('Failed to submit form:', error);
      toast.error(lang === 'es'
        ? 'Algo salió mal. Por favor, intenta de nuevo.'
        : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-12 text-center"
      >
        <div className="inline-flex p-4 rounded-full bg-success/10 mb-6">
          <CheckCircle className="h-12 w-12 text-success" />
        </div>
        <h3 className="font-display text-2xl font-bold mb-2">{t.contact.success}</h3>
        <p className="text-muted-foreground">
          {lang === 'es' 
            ? 'Nos pondremos en contacto dentro de las próximas 24 horas.'
            : "We'll get back to you within 24 hours."}
        </p>
      </motion.div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.contact.name} *</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={ph.name}
                    className="h-12"
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.contact.email} *</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder={ph.email}
                    className="h-12"
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.contact.phone}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="tel"
                    placeholder={ph.phone}
                    className="h-12"
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormDescription className="text-xs text-muted-foreground">
                  {ph.phoneHelper}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.contact.company}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={ph.company}
                    className="h-12"
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="interest"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.contact.interest} *</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                value={field.value}
                disabled={isSubmitting}
              >
                <FormControl>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder={ph.interest} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="cloud">{t.contact.interests.cloud}</SelectItem>
                  <SelectItem value="databases">{t.contact.interests.databases}</SelectItem>
                  <SelectItem value="ai">{t.contact.interests.ai}</SelectItem>
                  <SelectItem value="migration">{t.contact.interests.migration}</SelectItem>
                  <SelectItem value="other">{t.contact.interests.other}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.contact.message} *</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder={ph.message}
                  rows={5}
                  className="resize-none"
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Honeypot field - hidden from humans, visible to bots */}
        <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          size="lg"
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              {lang === 'es' ? 'Enviando...' : 'Submitting...'}
            </>
          ) : (
            <>
              {t.contact.submit}
              <Send className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
