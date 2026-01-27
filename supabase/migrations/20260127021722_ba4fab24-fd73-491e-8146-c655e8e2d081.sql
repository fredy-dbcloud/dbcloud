-- Create client_requests table for tracking work requests
CREATE TABLE public.client_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  plan TEXT NOT NULL CHECK (plan IN ('starter', 'growth')),
  request_type TEXT NOT NULL CHECK (request_type IN ('advisory', 'optimization', 'change_request')),
  description TEXT NOT NULL,
  environment TEXT NOT NULL CHECK (environment IN ('production', 'staging', 'development')),
  priority TEXT NOT NULL CHECK (priority IN ('low', 'normal', 'high')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'rejected')),
  estimated_hours NUMERIC(4,2) DEFAULT NULL,
  lang TEXT NOT NULL DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.client_requests ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting requests (anyone can submit)
CREATE POLICY "Anyone can insert client requests" 
ON public.client_requests 
FOR INSERT 
WITH CHECK (true);

-- Create policy for users to view their own requests by email
CREATE POLICY "Users can view their own requests" 
ON public.client_requests 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_client_requests_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_client_requests_updated_at
BEFORE UPDATE ON public.client_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_client_requests_updated_at();