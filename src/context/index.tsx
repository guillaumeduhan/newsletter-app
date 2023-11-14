"use client";

import { User } from "@/types";
import { createClient } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

interface IAppContext {
  user: User | undefined;
  supabase: any;
}

const AppContext = createContext<IAppContext | undefined>(undefined)

export function AppWrapper({ children }: {
  children: React.ReactNode
}) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
  )
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCurrentUser = () => {
      try {
        setLoading(true);

        // supabase fetch current user
      } catch (e) {
        // Handle error
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
    
    fetchCurrentUser();
  }, [])

  if (loading) return <div>Loading...</div>

  return <AppContext.Provider value={{
    user,
    supabase
  }}>
    {children}
  </AppContext.Provider>
}

export function useAppContext() {
  return useContext(AppContext);
};