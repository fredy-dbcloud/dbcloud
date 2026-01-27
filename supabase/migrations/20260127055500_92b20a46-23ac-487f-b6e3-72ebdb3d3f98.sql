-- Create profiles table linked to auth.users
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  plan TEXT CHECK (plan IN ('starter', 'growth', 'enterprise')) DEFAULT 'starter',
  company TEXT,
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- Trigger to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, plan)
  VALUES (NEW.id, 'starter');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Add user_id column to client_requests (nullable for backward compatibility with existing data)
ALTER TABLE public.client_requests 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- Add user_id column to client_summaries
ALTER TABLE public.client_summaries 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- Drop existing permissive RLS policies on client_requests
DROP POLICY IF EXISTS "Anyone can insert client requests" ON public.client_requests;
DROP POLICY IF EXISTS "Users can view their own requests" ON public.client_requests;

-- Create new secure RLS policies for client_requests
CREATE POLICY "Authenticated users can insert their own requests"
ON public.client_requests
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own requests"
ON public.client_requests
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own requests"
ON public.client_requests
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- Drop existing policies on client_summaries
DROP POLICY IF EXISTS "Anyone can insert client summaries" ON public.client_summaries;
DROP POLICY IF EXISTS "Users can view their own summaries" ON public.client_summaries;

-- Create new secure RLS policies for client_summaries
CREATE POLICY "Users can view their own summaries"
ON public.client_summaries
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Create updated_at trigger for profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_client_requests_updated_at();