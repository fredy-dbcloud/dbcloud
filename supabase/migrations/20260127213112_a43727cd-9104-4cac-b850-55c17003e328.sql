-- Add unique constraint to prevent duplicate summaries per user/month
CREATE UNIQUE INDEX IF NOT EXISTS idx_client_summaries_user_month_year 
ON public.client_summaries (user_id, month, year);