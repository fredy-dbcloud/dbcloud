import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLang } from '@/hooks/useLang';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(255),
  phone: z.string().max(50).optional(),
  company: z.string().max(200).optional(),
  interest: z.string(),
  message: z.string().min(10).max(2000),
});

export function ContactForm() {
  const { lang, t } = useLang();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    interest: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = contactSchema.safeParse(formData);
    if (!validation.success) {
      toast.error('Please fill in all required fields correctly.');
      return;
    }

    setIsSubmitting(true);
    try {
      await supabase.from('leads').insert([{
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        company: formData.company || null,
        interest: formData.interest,
        message: formData.message,
        source: 'contact_form',
        lang,
      }]);
      
      setIsSuccess(true);
      toast.success(t.contact.success);
    } catch (error) {
      console.error('Failed to submit form:', error);
      toast.error('Something went wrong. Please try again.');
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
        <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">{t.contact.name} *</label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="h-12"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">{t.contact.email} *</label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="h-12"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">{t.contact.phone}</label>
          <Input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="h-12"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">{t.contact.company}</label>
          <Input
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="h-12"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">{t.contact.interest} *</label>
        <Select
          value={formData.interest}
          onValueChange={(value) => setFormData({ ...formData, interest: value })}
          required
        >
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cloud">{t.contact.interests.cloud}</SelectItem>
            <SelectItem value="databases">{t.contact.interests.databases}</SelectItem>
            <SelectItem value="ai">{t.contact.interests.ai}</SelectItem>
            <SelectItem value="migration">{t.contact.interests.migration}</SelectItem>
            <SelectItem value="other">{t.contact.interests.other}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">{t.contact.message} *</label>
        <Textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
          rows={5}
          className="resize-none"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        size="lg"
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
      >
        {isSubmitting ? 'Submitting...' : t.contact.submit}
        <Send className="ml-2 h-5 w-5" />
      </Button>
    </form>
  );
}
