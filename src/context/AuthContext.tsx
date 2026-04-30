"use client";

import { createContext, useContext, useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { User, Session } from "@supabase/supabase-js";

interface Profile {
  id: string;
  full_name: string;
  role: "admin" | "buyer";
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const initializedRef = useRef(false);

  useEffect(() => {
    // Safety timeout: never let loading hang more than 5 seconds
    const timeout = setTimeout(() => {
      if (loading) {
        console.warn("Auth loading timed out after 5s, forcing ready state");
        setLoading(false);
      }
    }, 5000);

    // 1. Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(session.user.id);
      }
      // Always mark as done after initial session check
      initializedRef.current = true;
      setLoading(false);
    }).catch((err) => {
      console.error("Failed to get session:", err);
      initializedRef.current = true;
      setLoading(false);
    });

    // 2. Listen for auth changes (only fires AFTER initial load)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => {
      clearTimeout(timeout);
      subscription.unsubscribe();
    };
  }, []);

  async function fetchProfile(userId: string) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return;

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);

      const res = await fetch(
        `${url}/rest/v1/profiles?id=eq.${userId}&select=*`,
        {
          headers: {
            apikey: key,
            Authorization: `Bearer ${key}`,
          },
          signal: controller.signal,
        }
      );
      clearTimeout(timeout);

      if (!res.ok) {
        console.error("Profile fetch error:", res.statusText);
        return;
      }

      const data = await res.json();
      if (data && data.length > 0) {
        setProfile(data[0]);
        console.log("Profile loaded:", data[0]);
      } else {
        console.warn("No profile found for user:", userId);
      }
    } catch (error: any) {
      if (error.name === "AbortError") {
        console.error("Profile fetch timed out");
      } else {
        console.error("Error fetching profile:", error);
      }
    }
  }

  const signOut = async () => {
    // Force clear React state immediately (don't wait for supabase)
    setSession(null);
    setUser(null);
    setProfile(null);

    // Manually nuke supabase auth tokens from localStorage
    // supabase stores tokens with keys containing "supabase" or "sb-"
    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.includes("supabase") || key.startsWith("sb-"))) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((key) => localStorage.removeItem(key));
    } catch (e) {
      console.error("Error clearing localStorage:", e);
    }

    // Fire-and-forget the library call (don't await it — it hangs)
    supabase.auth.signOut().catch(() => {});
  };

  return (
    <AuthContext.Provider value={{ user, profile, session, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
