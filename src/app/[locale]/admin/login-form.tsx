"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { login } from "./actions";

export const LoginForm = ({ locale }: { locale: string }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    const result = await login(password);
    setBusy(false);

    if (result.ok) {
      router.refresh();
    } else {
      setError(result.error ?? "Login failed.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex min-h-screen flex-col items-center justify-center gap-5 overflow-hidden bg-[#08090c] p-6 text-white"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.035] blur-[100px]" />
      <div className="relative w-full max-w-md rounded-3xl border border-white/[0.08] bg-[#101116]/90 p-7 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-9">
        <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.06] text-xl font-bold text-zinc-200 ring-1 ring-white/10">M</div>
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">Private workspace</p>
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="mt-2 text-sm leading-relaxed text-zinc-500">Sign in to manage your portfolio projects, icons, and saved entries.</p>

        <label htmlFor="admin-password" className="mb-2 mt-7 block text-sm text-zinc-300">Password</label>
        <input
          id="admin-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          autoFocus
          className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none transition placeholder:text-zinc-700 focus:border-zinc-400/50 focus:ring-4 focus:ring-white/[0.04]"
        />
        {error && <p role="alert" className="mt-3 text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={busy}
          className="mt-4 w-full rounded-xl bg-zinc-100 px-4 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-white disabled:cursor-wait disabled:opacity-60"
        >
          {busy ? "Checking…" : "Sign in"}
        </button>
        <div className="my-6 h-px bg-white/[0.06]" />
        <Link href={`/${locale}`} className="flex items-center justify-center gap-2 text-sm text-zinc-500 transition hover:text-white">
          <span aria-hidden="true">←</span> Back to site
        </Link>
      </div>
    </form>
  );
};
