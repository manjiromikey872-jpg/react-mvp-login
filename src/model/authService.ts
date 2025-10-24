// MODEL - Handles authentication data and API calls
import { supabase } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials extends LoginCredentials {
  confirmPassword?: string;
}

export interface AuthResult {
  user?: User | null;
  session?: Session | null;
  error?: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResult> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) {
      return { error: error.message };
    }

    return { user: data.user, session: data.session };
  },

  async signup(credentials: SignupCredentials): Promise<AuthResult> {
    const { data, error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
      },
    });

    if (error) {
      return { error: error.message };
    }

    return { user: data.user, session: data.session };
  },

  async logout(): Promise<{ error?: string }> {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return { error: error.message };
    }

    return {};
  },

  async getSession(): Promise<Session | null> {
    const { data } = await supabase.auth.getSession();
    return data.session;
  },

  onAuthStateChange(callback: (session: Session | null, user: User | null) => void) {
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(session, session?.user ?? null);
    });
  },
};
