import { useState, useEffect, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  plan: 'starter' | 'growth' | 'enterprise';
  company: string | null;
  full_name: string | null;
  created_at: string;
  updated_at: string;
}

interface AuthState {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  isLoading: boolean;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    profile: null,
    isLoading: true,
  });

  const fetchProfile = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
    return data as Profile | null;
  }, []);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setState(prev => ({ ...prev, session, user: session?.user ?? null }));

        if (session?.user) {
          // Defer profile fetch to avoid Supabase auth deadlock
          setTimeout(async () => {
            const profile = await fetchProfile(session.user.id);
            setState(prev => ({ ...prev, profile, isLoading: false }));
          }, 0);
        } else {
          setState(prev => ({ ...prev, profile: null, isLoading: false }));
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setState(prev => ({ ...prev, session, user: session?.user ?? null }));
      
      if (session?.user) {
        fetchProfile(session.user.id).then(profile => {
          setState(prev => ({ ...prev, profile, isLoading: false }));
        });
      } else {
        setState(prev => ({ ...prev, isLoading: false }));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchProfile]);

  const signUp = async (email: string, password: string, fullName?: string, plan?: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) throw error;

    // Update profile with plan and name if provided
    if (data.user && (plan || fullName)) {
      const updates: Partial<Profile> = {};
      if (plan) updates.plan = plan as Profile['plan'];
      if (fullName) updates.full_name = fullName;
      
      await supabase
        .from('profiles')
        .update(updates)
        .eq('id', data.user.id);
    }

    return data;
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  };

  const signInWithMagicLink = async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) throw error;
  };

  const resendVerificationEmail = async (email: string) => {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const updateProfile = async (updates: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>) => {
    if (!state.user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', state.user.id)
      .select()
      .single();

    if (error) throw error;

    setState(prev => ({ ...prev, profile: data as Profile }));
    return data;
  };

  return {
    user: state.user,
    session: state.session,
    profile: state.profile,
    isLoading: state.isLoading,
    isAuthenticated: !!state.session,
    signUp,
    signIn,
    signInWithMagicLink,
    resendVerificationEmail,
    signOut,
    updateProfile,
  };
}
