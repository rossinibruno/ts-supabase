import { ApiError, AuthChangeEvent, Session, User } from '@supabase/supabase-js';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ArrowFunction } from 'typescript';
import { supabase } from '../config/supabase';

interface SigninData {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User | null;
  signout: Function;
  signup: Function;
  signin: Function;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function useAuth() {
  return useContext(AuthContext);
}

type Props = {
  children: React.ReactNode;
};

function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session: Session | null = supabase.auth.session();

    setUser(null);
    setLoading(false);

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event: AuthChangeEvent, session: Session | null) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      listener?.unsubscribe;
    };
  }, []);

  const value: AuthContextData = {
    signup: (data: SigninData) => supabase.auth.signUp(data),
    signin: (data: SigninData) => supabase.auth.signIn(data),
    signout: () => supabase.auth.signOut(),
    user
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

export { useAuth, AuthProvider };
