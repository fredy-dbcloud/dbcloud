-- Add rate limiting function for leads table
CREATE OR REPLACE FUNCTION public.check_leads_rate_limit(check_email TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Allow max 3 leads from same email per hour
  RETURN (
    SELECT COUNT(*) FROM public.leads 
    WHERE email = check_email 
    AND created_at > NOW() - INTERVAL '1 hour'
  ) < 3;
END;
$$;

-- Add rate limiting function for chat messages
CREATE OR REPLACE FUNCTION public.check_chat_rate_limit(check_session TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Allow max 20 messages per session per minute
  RETURN (
    SELECT COUNT(*) FROM public.chat_messages 
    WHERE session_id = check_session 
    AND created_at > NOW() - INTERVAL '1 minute'
  ) < 20;
END;
$$;

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Anyone can insert leads" ON public.leads;
DROP POLICY IF EXISTS "Anyone can insert chat messages" ON public.chat_messages;

-- Create rate-limited policies for leads
CREATE POLICY "Rate limited lead insertion"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (
  check_leads_rate_limit(email) 
  AND char_length(email) <= 255
  AND (message IS NULL OR char_length(message) <= 2000)
  AND (name IS NULL OR char_length(name) <= 100)
  AND (company IS NULL OR char_length(company) <= 200)
  AND (phone IS NULL OR char_length(phone) <= 50)
);

-- Create rate-limited policy for chat messages
CREATE POLICY "Rate limited chat message insertion"
ON public.chat_messages
FOR INSERT
TO anon, authenticated
WITH CHECK (
  check_chat_rate_limit(session_id)
  AND char_length(content) <= 2000
  AND char_length(session_id) <= 100
);