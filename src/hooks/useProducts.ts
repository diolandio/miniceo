import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Product } from '../types/supabase';

export function useProducts(businessId: string) {
  const [isLoading, setIsLoading] = useState(false);

  const addProduct = async (product: Omit<Product, 'id' | 'business_id' | 'created_at'>) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('products')
        .insert([{ ...product, business_id: businessId }]);

      if (error) throw error;
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProduct = async (
    productId: string,
    updates: Partial<Omit<Product, 'id' | 'business_id' | 'created_at'>>
  ) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', productId)
        .eq('business_id', businessId);

      if (error) throw error;
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProduct = async (productId: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId)
        .eq('business_id', businessId);

      if (error) throw error;
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateStock = async (productId: string, quantity: number) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('products')
        .update({ stock_quantity: quantity })
        .eq('id', productId)
        .eq('business_id', businessId);

      if (error) throw error;
    } catch (error) {
      console.error('Erro ao atualizar estoque:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { addProduct, updateProduct, deleteProduct, updateStock, isLoading };
}