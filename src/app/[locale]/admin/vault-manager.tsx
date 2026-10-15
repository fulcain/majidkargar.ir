"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { VaultEntry } from "@/src/lib/vault";
import { deleteVaultEntry, saveVaultEntry } from "./vault-actions";
import type { VaultEntryInput } from "./vault-actions";

type VaultManagerProps = {
  entries: VaultEntry[];
};

const inputClass =
  "rounded-xl border border-white/10 bg-black/25 px-3.5 py-2.5 text-sm outline-none transition placeholder:text-zinc-700 focus:border-zinc-400/50 focus:ring-4 focus:ring-white/[0.04]";

const emptyForm = (): VaultEntryInput => ({
  title: "",
  email: "",
  username: "",
  password: "",
  notes: "",
});

export const VaultManager = ({ entries }: VaultManagerProps) => {
  const router = useRouter();
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState<VaultEntry | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const filteredEntries = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entries;
    return entries.filter((entry) =>
      [entry.title, entry.email, entry.username, entry.password, entry.notes].some(
        (value) => value?.toLowerCase().includes(q),
      ),
    );
  }, [entries, query]);

  async function handleDelete(id: string, title: string) {
    if (!window.confirm(`Delete "${title}"?`)) return;
    setError(null);

    const result = await deleteVaultEntry(id);
    if (result.ok) {
      router.refresh();
    } else {
      setError(result.error ?? "Delete failed.");
    }
  }

  async function copyToClipboard(value: string, key: string) {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      return;
    }
    setCopiedKey(key);
    window.setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 1200);
  }

  if (adding || editing) {
    return (
      <VaultForm
        entry={editing ?? undefined}
        onCancel={() => {
          setAdding(false);
          setEditing(null);
        }}
        onSaved={(ok, err) => {
          if (ok) {
            setAdding(false);
            setEditing(null);
            router.refresh();
          } else {
            setError(err ?? "Save failed.");
          }
        }}
      />
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {error && <ErrorBanner message={error} onClose={() => setError(null)} />}

      <div className="flex flex-col gap-4 rounded-2xl border border-white/[0.07] bg-[#101116] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="min-w-0">
          <p className="text-sm font-medium text-zinc-200">Your saved credentials</p>
          <p className="mt-1 text-xs text-zinc-500">{filteredEntries.length} of {entries.length} entries</p>
        </div>
        <div className="flex min-w-0 flex-col gap-2 sm:w-auto sm:flex-row">
          <div className="relative min-w-0 sm:w-64">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600" aria-hidden="true">⌕</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search vault…"
              className={`${inputClass} w-full pl-9`}
              spellCheck={false}
            />
          </div>
          <button
            onClick={() => setAdding(true)}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-zinc-100 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-white"
          >
            <span className="text-lg leading-none">+</span> Add entry
          </button>
        </div>
      </div>
      <p className="flex items-center gap-2 px-1 text-xs text-zinc-600">
        <span aria-hidden="true">▣</span>
        Stored encrypted (AES-256-GCM) in MongoDB.
      </p>

      {filteredEntries.length === 0 && (
        <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.015] px-6 py-14 text-center">
          <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.05] text-xl text-zinc-500" aria-hidden="true">▤</span>
          <p className="font-medium text-zinc-300">{query ? "No matching entries" : "Your vault is empty"}</p>
          <p className="mt-1 text-sm text-zinc-600">{query ? `Try another search for “${query}”.` : "Add an entry to keep your credentials together."}</p>
        </div>
      )}

      <ul className="grid grid-cols-1 gap-3 xl:grid-cols-2">
        {filteredEntries.map((entry) => {
          const showPassword = Boolean(revealed[entry.id] && entry.password);
          const hasPassword = Boolean(entry.password);
          return (
            <li
              key={entry.id}
              className="flex min-w-0 flex-col rounded-2xl border border-white/[0.07] bg-[#101116] p-4 transition hover:border-white/[0.13] sm:p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.04] text-sm font-semibold uppercase text-zinc-300">
                    {entry.title.trim().charAt(0) || "•"}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-medium text-zinc-100">{entry.title}</p>
                    <p className="mt-1 truncate text-xs text-zinc-500">{entry.email || entry.username || "Saved account"}</p>
                  </div>
                </div>
                <div className="flex shrink-0 gap-1">
                  <button onClick={() => setEditing(entry)} className="rounded-lg px-2.5 py-2 text-xs text-zinc-400 transition hover:bg-white/[0.06] hover:text-white">Edit</button>
                  <button onClick={() => handleDelete(entry.id, entry.title)} className="rounded-lg px-2.5 py-2 text-xs text-zinc-500 transition hover:bg-red-400/[0.08] hover:text-red-300">Delete</button>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 border-t border-white/[0.06] pt-4 sm:grid-cols-2">
                {entry.email && <VaultDetail label="Email" value={entry.email} />}
                {entry.username && <VaultDetail label="Username" value={entry.username} />}
              </div>

              {hasPassword && (
                <div className="mt-4 flex items-center gap-2 rounded-xl border border-white/[0.06] bg-black/20 px-3 py-2.5">
                  <span className={`min-w-0 flex-1 truncate text-sm text-zinc-300 ${showPassword ? "font-mono" : "tracking-[0.2em]"}`} title={showPassword ? entry.password : undefined}>
                    {showPassword ? entry.password : "••••••••••••"}
                  </span>
                  <button onClick={() => setRevealed((prev) => ({ ...prev, [entry.id]: !prev[entry.id] }))} className="shrink-0 rounded-lg px-2.5 py-1.5 text-xs text-zinc-400 transition hover:bg-white/[0.07] hover:text-white" title={showPassword ? "Hide password" : "Show password"}>
                    {showPassword ? "Hide" : "Reveal"}
                  </button>
                  <button onClick={() => copyToClipboard(entry.password!, entry.id)} className="shrink-0 rounded-lg border border-white/[0.08] px-2.5 py-1.5 text-xs text-zinc-300 transition hover:bg-white/[0.07]">
                    {copiedKey === entry.id ? "Copied" : "Copy"}
                  </button>
                </div>
              )}

              {entry.notes && <p className="mt-3 whitespace-pre-wrap break-words text-xs leading-relaxed text-zinc-500">{entry.notes}</p>}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

type VaultFormProps = {
  entry?: VaultEntry;
  onCancel: () => void;
  onSaved: (ok: boolean, error?: string) => void;
};

const VaultForm = ({ entry, onCancel, onSaved }: VaultFormProps) => {
  const [form, setForm] = useState<VaultEntryInput>(
    entry
      ? {
          id: entry.id,
          title: entry.title,
          email: entry.email ?? "",
          username: entry.username ?? "",
          password: entry.password ?? "",
          notes: entry.notes ?? "",
        }
      : emptyForm(),
  );
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function setField<K extends keyof VaultEntryInput>(
    key: K,
    value: VaultEntryInput[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.title.trim()) {
      onSaved(false, "Title is required.");
      return;
    }

    setBusy(true);
    const result = await saveVaultEntry(form);
    setBusy(false);
    onSaved(result.ok, result.error);
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-3xl flex-col gap-5 rounded-2xl border border-white/[0.07] bg-[#101116] p-5 sm:p-7">
      <div className="border-b border-white/[0.06] pb-4">
        <p className="mb-1 text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">Password vault</p>
        <h2 className="text-xl font-semibold">{entry ? "Edit entry" : "New entry"}</h2>
        <p className="mt-1 text-sm text-zinc-500">Save the account details you want to keep together.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Title"><input value={form.title} onChange={(e) => setField("title", e.target.value)} placeholder="Steam" className={inputClass} /></Field>
        <Field label="Email"><input type="email" value={form.email ?? ""} onChange={(e) => setField("email", e.target.value)} placeholder="me@example.com" className={inputClass} /></Field>
        <Field label="Username"><input value={form.username ?? ""} onChange={(e) => setField("username", e.target.value)} placeholder="cool_bmk1" className={inputClass} /></Field>
        <Field label="Password">
          <div className="flex gap-2">
            <input type={showPassword ? "text" : "password"} value={form.password ?? ""} onChange={(e) => setField("password", e.target.value)} placeholder="••••••••" className={`${inputClass} min-w-0 flex-1 font-mono`} autoComplete="new-password" />
            <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="shrink-0 rounded-xl border border-white/10 px-3 text-sm text-zinc-300 transition hover:bg-white/[0.06]">{showPassword ? "Hide" : "Show"}</button>
          </div>
        </Field>
      </div>

      <Field label="Notes"><textarea value={form.notes ?? ""} onChange={(e) => setField("notes", e.target.value)} rows={4} className={`${inputClass} resize-y font-mono`} placeholder="Anything else worth remembering…" /></Field>

      <div className="flex flex-wrap gap-2 border-t border-white/[0.06] pt-4">
        <button
          type="submit"
          disabled={busy}
          className="rounded-xl bg-zinc-100 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-white disabled:opacity-50"
        >
          {busy ? "Saving…" : "Save entry"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-white/10 px-5 py-2.5 text-sm text-zinc-300 transition hover:bg-white/[0.06]"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <label className="flex flex-col gap-1.5 text-sm text-zinc-400">
    {label}
    {children}
  </label>
);

const VaultDetail = ({ label, value }: { label: string; value: string }) => (
  <div className="min-w-0">
    <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-600">{label}</p>
    <p className="truncate text-sm text-zinc-400" title={value}>{value}</p>
  </div>
);

const ErrorBanner = ({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) => (
  <div className="flex items-center justify-between gap-4 border border-red-900 bg-red-950/40 rounded px-4 py-2 text-sm text-red-300">
    <span>{message}</span>
    <button onClick={onClose} className="text-red-400 hover:text-white">
      ✕
    </button>
  </div>
);
