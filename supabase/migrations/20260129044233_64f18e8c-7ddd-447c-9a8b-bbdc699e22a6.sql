-- Fix: Remove overly permissive SELECT policy on chat_messages
-- Chat messages should only be readable by admins for internal review
-- The chat widget is write-only for public users (pre-sales capture)

DROP POLICY IF EXISTS "Anyone can read their own session messages" ON public.chat_messages;

-- Admins already have SELECT access via existing policy "Admins can view chat messages"
-- No new policy needed - admins can read, public cannot