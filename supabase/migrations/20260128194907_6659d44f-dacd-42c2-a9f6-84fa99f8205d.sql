-- Fix chat_messages SELECT policy to be more restrictive
-- Drop the overly permissive policy that allows anyone to read all messages
DROP POLICY IF EXISTS "Anyone can read their own session messages" ON public.chat_messages;

-- Create a new restrictive policy - no public SELECT access
-- Messages are only readable via service role for admin review
-- This prevents session hijacking and data exposure

-- Add admin-only SELECT policy for leads table
-- This provides explicit admin access rather than relying on service role only
CREATE POLICY "Admins can view all leads"
ON public.leads FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Add admin-only SELECT policy for ai_copilot_logs table
CREATE POLICY "Admins can view AI logs"
ON public.ai_copilot_logs FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Add admin-only SELECT policy for client_health_predictions table
CREATE POLICY "Admins can view health predictions"
ON public.client_health_predictions FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));