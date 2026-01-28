import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLang } from '@/hooks/useLang';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface LeadMagnetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LeadMagnetModal({ isOpen, onClose }: LeadMagnetModalProps) {
  const { lang, t } = useLang();
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [website, setWebsite] = useState(''); // Honeypot field
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // Honeypot check - if filled, silently reject (bots fill hidden fields)
    if (website) {
      toast.success(t.leadMagnet.success);
      onClose();
      return;
    }

    setIsSubmitting(true);
    try {
      await supabase.from('leads').insert([{
        email,
        company: company || null,
        source: 'lead_magnet',
        lang,
        interest: 'resources',
      }]);
      
      toast.success(t.leadMagnet.success);
      onClose();
      setEmail('');
      setCompany('');
    } catch (error) {
      console.error('Failed to save lead:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl bg-card p-8 shadow-2xl border border-border"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-muted transition-colors"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>

            <div className="text-center mb-6">
              <div className="inline-flex p-3 rounded-full bg-accent/10 mb-4">
                <Sparkles className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-2">
                {t.leadMagnet.title}
              </h3>
              <p className="text-muted-foreground">
                {t.leadMagnet.subtitle}
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {t.leadMagnet.resources.map((resource: string, index: number) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                >
                  <Download className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-sm font-medium">{resource}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.leadMagnet.email}
                required
                className="h-12"
              />
              <Input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder={t.leadMagnet.company}
                className="h-12"
              />
              {/* Honeypot field - hidden from humans, visible to bots */}
              <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
                <Input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="Website"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-accent hover:bg-accent/90 text-accent-foreground text-base"
              >
                {isSubmitting ? 'Submitting...' : t.leadMagnet.submit}
              </Button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
