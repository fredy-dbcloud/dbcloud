-- Fix chat_messages SELECT policy - remove public read access
-- The chat widget only needs INSERT for visitors; SELECT should be admin-only

-- Drop the overly permissive SELECT policy
DROP POLICY IF EXISTS "Anyone can read their own session messages" ON public.chat_messages;

-- Add admin-only SELECT policy for reviewing chat conversations
CREATE POLICY "Admins can view chat messages"
ON public.chat_messages FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));