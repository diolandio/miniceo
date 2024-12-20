import { useState } from 'react';
import { supabase } from '../lib/supabase';

export function useDeleteStore() {
  const [isLoading, setIsLoading] = useState(false);

  const deleteStore = async (storeId: string) => {
    setIsLoading(true);
    try {
      // Delete all products first
      const { error: productsError } = await supabase
        .from('products')
        .delete()
        .eq('business_id', storeId);

      if (productsError) throw productsError;

      // Then delete the store
      const { error: storeError } = await supabase
        .from('businesses')
        .delete()
        .eq('id', storeId);

      if (storeError) throw storeError;
    } catch (error) {
      console.error('Error deleting store:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteStore, isLoading };
}