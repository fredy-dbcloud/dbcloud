import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { LeadData } from '@/hooks/useAiAdvisor';
interface LeadFormCopy {
  heading: string;
  name: string;
  email: string;
  company: string;
  cloudProvider: string;
  cloudOptions: readonly string[];
  urgency: string;
  urgencyOptions: readonly string[];
  spend: string;
  spendOptions: readonly string[];
  submit: string;
}

interface Props {
  copy: LeadFormCopy;
  onSubmit: (data: LeadData) => void;
  onDismiss: () => void;
}

export function AiAdvisorLeadForm({ copy, onSubmit, onDismiss }: Props) {
  const [form, setForm] = useState<LeadData>({
    name: '',
    email: '',
    company: '',
    cloudProvider: '',
    urgency: '',
    monthlySpend: '',
  });
  const [error, setError] = useState('');

  const set = (key: keyof LeadData, value: string) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    if (!form.name.trim() || !form.email.trim() || !form.company.trim() || !form.cloudProvider || !form.urgency) {
      setError('Please fill all required fields.');
      return;
    }
    if (!/^[\w.+-]+@[\w.-]+\.\w{2,}$/.test(form.email)) {
      setError('Please enter a valid work email.');
      return;
    }
    onSubmit(form);
  };

  const chipClass = (selected: boolean) =>
    `px-3 py-1.5 text-xs rounded-full border transition-colors cursor-pointer ${
      selected
        ? 'bg-primary text-primary-foreground border-primary'
        : 'bg-card text-foreground border-border hover:border-primary/40'
    }`;

  return (
    <div className="bg-muted/50 rounded-xl p-4 space-y-3 border border-border">
      <p className="text-sm font-semibold text-foreground">{copy.heading}</p>

      <Input
        placeholder={copy.name}
        value={form.name}
        onChange={e => set('name', e.target.value)}
        className="h-9 text-sm"
      />
      <Input
        placeholder={copy.email}
        type="email"
        value={form.email}
        onChange={e => set('email', e.target.value)}
        className="h-9 text-sm"
      />
      <Input
        placeholder={copy.company}
        value={form.company}
        onChange={e => set('company', e.target.value)}
        className="h-9 text-sm"
      />

      {/* Cloud provider */}
      <div>
        <p className="text-xs text-muted-foreground mb-1.5">{copy.cloudProvider}</p>
        <div className="flex flex-wrap gap-1.5">
          {copy.cloudOptions.map(opt => (
            <button key={opt} className={chipClass(form.cloudProvider === opt)} onClick={() => set('cloudProvider', opt)}>
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Urgency */}
      <div>
        <p className="text-xs text-muted-foreground mb-1.5">{copy.urgency}</p>
        <div className="flex flex-wrap gap-1.5">
          {copy.urgencyOptions.map(opt => (
            <button key={opt} className={chipClass(form.urgency === opt)} onClick={() => set('urgency', opt)}>
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Spend (optional) */}
      <div>
        <p className="text-xs text-muted-foreground mb-1.5">{copy.spend}</p>
        <div className="flex flex-wrap gap-1.5">
          {copy.spendOptions.map(opt => (
            <button key={opt} className={chipClass(form.monthlySpend === opt)} onClick={() => set('monthlySpend', opt)}>
              {opt}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="text-xs text-destructive">{error}</p>}

      <Button onClick={handleSubmit} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-sm font-semibold">
        {copy.submit}
      </Button>

      <button onClick={onDismiss} className="block mx-auto text-xs text-muted-foreground hover:text-foreground transition-colors">
        ✕
      </button>
    </div>
  );
}
