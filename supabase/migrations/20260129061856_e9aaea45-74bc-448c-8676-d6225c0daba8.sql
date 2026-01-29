-- Add status column to leads table for pipeline tracking
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'new';

-- Add index for status column to optimize queries
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);