import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Business } from '../types/supabase';

export function useStores() {
  const [stores, setStores] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStores() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
          .from('businesses')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setStores(data || []);
      } catch (error) {
        console.error('Erro ao carregar lojas:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadStores();
  }, []);

  return { stores, isLoading };
}