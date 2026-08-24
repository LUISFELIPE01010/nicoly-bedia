import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export type AppRole = 'owner' | 'admin' | 'atendente';

interface Profile {
  id: string;
  company_id: string;
  full_name: string;
  phone: string | null;
  avatar_url: string | null;
}

interface Company {
  id: string;
  name: string;
  document: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
}

interface AuthContextValue {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  company: Company | null;
  roles: AppRole[];
  loading: boolean;
  refresh: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string, fullName: string, companyName: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [loading, setLoading] = useState(true);

  const loadContext = async (uid: string) => {
    const { data: prof } = await supabase
      .from('profiles')
      .select('id, company_id, full_name, phone, avatar_url')
      .eq('id', uid)
      .maybeSingle();

    setProfile((prof as Profile) ?? null);

    if (prof?.company_id) {
      const [{ data: comp }, { data: roleRows }] = await Promise.all([
        supabase.from('companies').select('id, name, document, phone, email, address').eq('id', prof.company_id).maybeSingle(),
        supabase.from('user_roles').select('role').eq('user_id', uid),
      ]);
      setCompany((comp as Company) ?? null);
      setRoles(((roleRows ?? []) as { role: AppRole }[]).map((r) => r.role));
    } else {
      setCompany(null);
      setRoles([]);
    }
  };

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
      if (newSession?.user) {
        setTimeout(() => {
          loadContext(newSession.user.id).finally(() => setLoading(false));
        }, 0);
      } else {
        setProfile(null);
        setCompany(null);
        setRoles([]);
        setLoading(false);
      }
    });

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      if (data.session?.user) {
        loadContext(data.session.user.id).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const refresh = async () => {
    if (user) await loadContext(user.id);
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error ? error.message : null };
  };

  const signUp = async (email: string, password: string, fullName: string, companyName: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/admin`,
        data: { full_name: fullName, company_name: companyName },
      },
    });
    return { error: error ? error.message : null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
    setCompany(null);
    setRoles([]);
  };

  return (
    <AuthContext.Provider value={{ session, user, profile, company, roles, loading, refresh, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return ctx;
};
