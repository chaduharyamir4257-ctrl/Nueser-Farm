"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AdminGuard({ children }) {
  const router = useRouter();
  const [status, setStatus] = useState("checking"); // checking | ok | denied

  useEffect(() => {
    if (!supabase) {
      // Supabase not configured yet in .env.local — send back to login
      // with a clear message rather than silently failing.
      setStatus("denied");
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setStatus("ok");
      } else {
        setStatus("denied");
        router.replace("/administration/login");
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setStatus("denied");
        router.replace("/administration/login");
      }
    });

    return () => listener.subscription.unsubscribe();
  }, [router]);

  if (status === "checking") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-ink-soft text-sm">
        Checking admin access…
      </div>
    );
  }

  if (status === "denied") {
    return null; // redirect already triggered
  }

  return children;
}

