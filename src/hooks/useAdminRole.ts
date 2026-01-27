import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export function useAdminRole() {
  const { user, isLoading: authLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isCheckingRole, setIsCheckingRole] = useState(true);

  const checkAdminRole = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('role', 'admin')
        .maybeSingle();

      if (error) {
        console.error('Error checking admin role:', error);
        return false;
      }
      return !!data;
    } catch (err) {
      console.error('Failed to check admin role:', err);
      return false;
    }
  }, []);

  useEffect(() => {
    async function verifyRole() {
      if (authLoading) return;

      if (!user) {
        setIsAdmin(false);
        setIsCheckingRole(false);
        return;
      }

      const adminStatus = await checkAdminRole(user.id);
      setIsAdmin(adminStatus);
      setIsCheckingRole(false);
    }

    verifyRole();
  }, [user, authLoading, checkAdminRole]);

  return {
    isAdmin,
    isCheckingRole: authLoading || isCheckingRole,
    checkAdminRole,
  };
}
