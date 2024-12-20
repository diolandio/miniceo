import { useState } from 'react';
import { supabase } from '../lib/supabase';

export function useInauguration(businessId: string) {
  const [isLoading, setIsLoading] = useState(false);

  const inaugurateBusiness = async (date: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('business_status')
        .upsert({
          business_id: businessId,
          is_inaugurated: true,
          inauguration_date: date,
          is_open: true
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error inaugurating business:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { inaugurateBusiness, isLoading };
}