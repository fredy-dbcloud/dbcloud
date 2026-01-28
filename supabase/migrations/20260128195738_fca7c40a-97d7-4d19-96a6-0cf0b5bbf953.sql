-- Add admin-only write policies for client_summaries table
-- This table contains business-critical data and should only be modified by admins/system processes

-- Admin-only INSERT policy (for generate-monthly-summary edge function via service role or admin dashboard)
CREATE POLICY "Admins can insert summaries"
ON public.client_summaries FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Admin-only UPDATE policy
CREATE POLICY "Admins can update summaries"
ON public.client_summaries FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Admin-only DELETE policy
CREATE POLICY "Admins can delete summaries"
ON public.client_summaries FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));