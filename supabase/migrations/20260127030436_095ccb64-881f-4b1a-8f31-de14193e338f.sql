-- Create enum for AI classification types
CREATE TYPE public.ai_request_classification AS ENUM ('advisory', 'execution', 'incident', 'out_of_scope');
CREATE TYPE public.ai_effort_level AS ENUM ('low', 'medium', 'high');
CREATE TYPE public.ai_risk_flag AS ENUM ('scope_creep', 'potential_churn', 'upgrade_signal', 'margin_risk');
CREATE TYPE public.ai_health_status AS ENUM ('healthy', 'at_risk', 'churn_risk', 'expansion_ready', 'margin_risk');

-- Add AI classification columns to client_requests
ALTER TABLE public.client_requests 
ADD COLUMN IF NOT EXISTS ai_classification public.ai_request_classification,
ADD COLUMN IF NOT EXISTS ai_effort_level public.ai_effort_level,
ADD COLUMN IF NOT EXISTS ai_risk_flags public.ai_risk_flag[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS ai_estimated_hours NUMERIC(4,2),
ADD COLUMN IF NOT EXISTS ai_reasoning TEXT,
ADD COLUMN IF NOT EXISTS ai_classified_at TIMESTAMP WITH TIME ZONE;

-- Create internal client health predictions table
CREATE TABLE public.client_health_predictions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  health_status public.ai_health_status NOT NULL DEFAULT 'healthy',
  churn_probability NUMERIC(3,2) DEFAULT 0,
  expansion_probability NUMERIC(3,2) DEFAULT 0,
  margin_risk_score NUMERIC(3,2) DEFAULT 0,
  signals JSONB DEFAULT '{}',
  ai_reasoning TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on health predictions (internal only - no public access)
ALTER TABLE public.client_health_predictions ENABLE ROW LEVEL SECURITY;

-- No public policies - internal use only via service role

-- Create internal AI copilot conversation logs
CREATE TABLE public.ai_copilot_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  query TEXT NOT NULL,
  response TEXT NOT NULL,
  context JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.ai_copilot_logs ENABLE ROW LEVEL SECURITY;

-- Create function to update health predictions timestamp
CREATE OR REPLACE FUNCTION public.update_health_predictions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_health_predictions_updated_at
BEFORE UPDATE ON public.client_health_predictions
FOR EACH ROW
EXECUTE FUNCTION public.update_health_predictions_updated_at();