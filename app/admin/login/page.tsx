"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RiLockLine, RiMailLine, RiEyeLine, RiEyeOffLine } from "react-icons/ri";

function LoginForm() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();
  };

  const input =
    "w-full pl-9 pr-4 py-2.5 border border-black/20 dark:border-white/20 bg-white dark:bg-black text-sm focus:outline-none focus:border-black dark:focus:border-white transition-colors dark:text-white placeholder:text-black/30 dark:placeholder:text-white/30";

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black px-4">
      <div className="w-full max-w-sm border border-black/10 dark:border-white/10 p-8">
        <h1 className="text-lg font-bold mb-1 tracking-tight">Admin Login</h1>
        <p className="text-xs text-black/50 dark:text-white/50 mb-6">
          Sign in to manage your blog posts.
        </p>

        {error && (
          <div className="mb-4 p-3 border border-red-400 text-sm text-red-500">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <RiMailLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
            <input
              className={input}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="relative">
            <RiLockLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
            <input
              className={`${input} pr-10`}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
            >
              {showPassword ? <RiEyeOffLine size={15} /> : <RiEyeLine size={15} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-black dark:bg-white text-white dark:text-black text-sm font-medium hover:opacity-80 disabled:opacity-40 transition-opacity"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <>
      <LoginForm />
    </>
  );
}
