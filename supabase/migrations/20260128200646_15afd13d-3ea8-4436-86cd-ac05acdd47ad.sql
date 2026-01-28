-- Fix privilege escalation: Prevent users from changing their own plan field
-- Plan changes should only occur via Stripe webhooks or admin actions

-- Drop the current permissive UPDATE policy
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- Create a new UPDATE policy that allows users to update their profile
-- BUT prevents them from changing the plan field
CREATE POLICY "Users can update their own profile except plan"
ON public.profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (
  auth.uid() = id 
  AND (plan IS NOT DISTINCT FROM (SELECT plan FROM public.profiles WHERE id = auth.uid()))
);

-- Add a separate policy for admins to update any profile including plan
CREATE POLICY "Admins can update any profile"
ON public.profiles FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));