import { supabase } from './supabase';
import { User } from '@supabase/supabase-js';

export async function signIn(email: string, password: string): Promise<{ user: User | null; error: Error | null }> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    
    return { user: data.user, error: null };
  } catch (error) {
    return { user: null, error: error as Error };
  }
}

export async function signUp(email: string, password: string): Promise<{ user: User | null; error: Error | null }> {
  try {
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });
    
    if (signUpError) throw signUpError;
    
    // Login automático após cadastro
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (signInError) throw signInError;
    
    return { user: signInData.user, error: null };
  } catch (error) {
    return { user: null, error: error as Error };
  }
}