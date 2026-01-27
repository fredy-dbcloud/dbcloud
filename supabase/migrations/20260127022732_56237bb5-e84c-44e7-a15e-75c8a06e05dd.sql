-- Table for monthly client summaries
CREATE TABLE public.client_summaries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  plan TEXT NOT NULL CHECK (plan IN ('starter', 'growth')),
  month INTEGER NOT NULL CHECK (month >= 1 AND month <= 12),
  year INTEGER NOT NULL CHECK (year >= 2024),
  hours_included NUMERIC(4,2) NOT NULL,
  hours_used NUMERIC(4,2) NOT NULL DEFAULT 0,
  requests_completed INTEGER NOT NULL DEFAULT 0,
  key_findings TEXT[] DEFAULT '{}',
  recommendations TEXT[] DEFAULT '{}',
  health_status TEXT NOT NULL DEFAULT 'healthy' CHECK (health_status IN ('healthy', 'at_risk', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (email, month, year)
);

-- Enable Row Level Security
ALTER TABLE public.client_summaries ENABLE ROW LEVEL SECURITY;

-- RLS policies for client summaries
CREATE POLICY "Anyone can insert client summaries"
ON public.client_summaries
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Users can view their own summaries"
ON public.client_summaries
FOR SELECT
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_client_summaries_updated_at
BEFORE UPDATE ON public.client_summaries
FOR EACH ROW
EXECUTE FUNCTION public.update_client_requests_updated_at();