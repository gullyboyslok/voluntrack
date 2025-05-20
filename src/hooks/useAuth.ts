import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface User {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  age: number | null;
  city: string | null;
  interests: string[] | null;
  discovered_through: string | null;
  created_at: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check auth state on mount
    checkUser();

    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const { data: userData } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (userData) {
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
        }
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: userData } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (userData) {
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
        }
      }
    } catch (error) {
      console.error('Error checking user session:', error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (userData: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    age?: number;
    city?: string;
    interests?: string[];
    discovered_through?: string;
  }) => {
    try {
      // First create the auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
      });

      if (authError) throw authError;

      if (!authData.user) throw new Error('No user returned from auth signup');

      // Then create the user profile
      const { data: profileData, error: profileError } = await supabase
        .from('users')
        .insert([{
          id: authData.user.id,
          email: userData.email,
          first_name: userData.first_name,
          last_name: userData.last_name,
          age: userData.age,
          city: userData.city,
          interests: userData.interests,
          discovered_through: userData.discovered_through
        }])
        .select()
        .single();

      if (profileError) throw profileError;

      setUser(profileData);
      localStorage.setItem('user', JSON.stringify(profileData));
      
      return { data: profileData, error: null };
    } catch (error) {
      console.error('Signup error:', error);
      return { 
        data: null, 
        error: error instanceof Error ? error.message : 'An unexpected error occurred'
      };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data: { user: authUser }, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) throw authError;

      if (!authUser) throw new Error('No user returned from auth signin');

      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (userError) throw userError;

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
      return { data: userData, error: null };
    } catch (error) {
      console.error('Signin error:', error);
      return { 
        data: null, 
        error: error instanceof Error ? error.message : 'An unexpected error occurred'
      };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      localStorage.removeItem('user');
      window.dispatchEvent(new Event('authChange'));
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    try {
      if (!user) throw new Error('No user logged in');

      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;

      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      
      return { data, error: null };
    } catch (error) {
      console.error('Profile update error:', error);
      return { 
        data: null, 
        error: error instanceof Error ? error.message : 'An unexpected error occurred'
      };
    }
  };

  return {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile
  };
}