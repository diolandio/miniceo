import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Business, Product } from '../types/supabase';

export function useStore(businessId: string | undefined) {
  const [business, setBusiness] = useState<Business | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!businessId) return;

    async function loadStoreData() {
      try {
        const [businessResponse, productsResponse] = await Promise.all([
          supabase
            .from('businesses')
            .select('*')
            .eq('id', businessId)
            .single(),
          supabase
            .from('products')
            .select('*')
            .eq('business_id', businessId)
        ]);

        if (businessResponse.error) throw businessResponse.error;
        if (productsResponse.error) throw productsResponse.error;

        setBusiness(businessResponse.data);
        setProducts(productsResponse.data);
      } catch (error) {
        console.error('Erro ao carregar dados da loja:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadStoreData();
  }, [businessId]);

  return { business, products, isLoading };
}