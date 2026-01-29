-- Tighten policies to ensure anonymous users have no read access, and add explicit anon-deny policies.

-- client_summaries: restrict existing SELECT policy to authenticated only
ALTER POLICY "Users can view their own summaries"
ON public.client_summaries
TO authenticated;

-- Explicitly deny anonymous SELECT
CREATE POLICY "Deny anonymous access"
ON public.client_summaries
FOR SELECT
TO anon
USING (false);


-- client_health_predictions: restrict existing admin SELECT policy to authenticated only
ALTER POLICY "Admins can view health predictions"
ON public.client_health_predictions
TO authenticated;

-- Explicitly deny anonymous SELECT
CREATE POLICY "Deny anonymous access"
ON public.client_health_predictions
FOR SELECT
TO anon
USING (false);


-- user_roles: restrict role-related policies to authenticated only
ALTER POLICY "Admins can manage all roles"
ON public.user_roles
TO authenticated;

ALTER POLICY "Users can view their own roles"
ON public.user_roles
TO authenticated;

-- Explicitly deny anonymous SELECT
CREATE POLICY "Deny anonymous access"
ON public.user_roles
FOR SELECT
TO anon
USING (false);
