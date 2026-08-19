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
      className="min-h-screen flex flex-col items-center justify-center gap-4 bg-black text-white p-6"
    >
      <h1 className="text-2xl font-bold">Admin</h1>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        autoFocus
        className="border border-zinc-700 rounded bg-zinc-900 px-4 py-2 text-center outline-none focus:border-palette-primary"
      />
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button
        type="submit"
        disabled={busy}
        className="border border-palette-primary rounded px-6 py-2 hover:bg-gray-800 transition disabled:opacity-50"
      >
        {busy ? "Checking…" : "Login"}
      </button>
      <Link href={`/${locale}`} className="text-sm text-zinc-500 hover:text-white transition">
        ← Back to site
      </Link>
    </form>
  );
};
