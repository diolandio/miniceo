import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { BusinessHours } from '../types/supabase';

export function useBusinessHours(businessId: string) {
  const [businessHours, setBusinessHours] = useState<BusinessHours[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadBusinessHours();
  }, [businessId]);

  const loadBusinessHours = async () => {
    try {
      const { data, error } = await supabase
        .from('business_hours')
        .select('*')
        .eq('business_id', businessId);

      if (error) throw error;
      setBusinessHours(data || []);
    } catch (error) {
      console.error('Error loading business hours:', error);
    }
  };

  const updateHours = async (hours: { day_of_week: number; open_time: string; close_time: string; }[]) => {
    setIsLoading(true);
    try {
      // Delete existing hours
      await supabase
        .from('business_hours')
        .delete()
        .eq('business_id', businessId);

      // Insert new hours
      const { error } = await supabase
        .from('business_hours')
        .insert(hours.map(hour => ({
          business_id: businessId,
          ...hour
        })));

      if (error) throw error;
      await loadBusinessHours();
    } catch (error) {
      console.error('Error updating business hours:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { businessHours, updateHours, isLoading };
}