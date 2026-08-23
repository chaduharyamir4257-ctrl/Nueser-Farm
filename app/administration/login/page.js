"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!supabase) {
      setError("Supabase isn't connected yet — add your project URL and key to .env.local first.");
      return;
    }

    setLoading(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (signInError) {
      setError("Incorrect email or password.");
      return;
    }
    router.push("/administration");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm bg-cream-card border border-line rounded-[20px] p-8">
        <div className="font-serif text-xl text-forest-dark mb-1">Ghous Ali Nursery Farm</div>
        <h1 className="text-sm text-ink-soft mb-6">Sign in to manage your catalog</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-[13px] font-semibold text-forest-dark">Email</label>
            <input
              id="email" type="email" required value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 rounded-xl border border-line bg-cream text-[14.5px]"
              placeholder="owner@khalilnursery.pk"
            />
          </div>
          <div className="flex flex-col gap-1.5 relative">
            <label htmlFor="password" className="text-[13px] font-semibold text-forest-dark">Password</label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-3 rounded-xl border border-line bg-cream text-[14.5px] pr-11"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-10 text-forest-dark opacity-75 hover:opacity-100"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z" />
                  <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.78 21.78 0 0 1 4.12-5.74" />
                  <path d="M1 1l22 22" />
                  <path d="M9.88 9.88a3 3 0 0 0 4.24 4.24" />
                  <path d="M14.12 14.12A3 3 0 0 1 9.88 9.88" />
                  <path d="M14.87 9.13A10.94 10.94 0 0 1 23 12s-4 7-11 7a10.94 10.94 0 0 1-5.28-1.29" />
                </svg>
              )}
            </button>
          </div>

          {error && <p className="text-sm text-clay-dark">{error}</p>}

          <button
            type="submit" disabled={loading}
            className="w-full py-3.5 rounded-full text-sm font-semibold bg-forest-dark text-cream hover:bg-forest transition disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

